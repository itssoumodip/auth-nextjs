import User from '@/models/userModel';
import bcrypt from 'bcryptjs';
import { Resend } from 'resend';

// Initialize Resend with API key from environment variable
const resendApiKey = process.env.RESEND_API_KEY;
const resend = new Resend(resendApiKey);

// Development mode check
const isDevelopment = process.env.NODE_ENV === 'development';

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        // Log for debugging
        console.log(`[Email Service] Preparing to send ${emailType} email to: ${email}`);
        
        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        // Store the token in the database
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000 
            });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000 
            });
        }

        // Check if DOMAIN is set
        const domain = process.env.DOMAIN || 'http://localhost:3000';

        // Create link URL based on email type
        const url = emailType === "VERIFY" 
            ? `${domain}/verifyemail?token=${hashedToken}`
            : `${domain}/reset-password?token=${hashedToken}`;

        const subject = emailType === "VERIFY" ? "Verify your email" : "Reset your password";
        const actionText = emailType === "VERIFY" ? "verify your email" : "reset your password";

        const htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>${subject}</h2>
                <p>Click <a href="${url}">here</a> to ${actionText} or copy and paste the link below in your browser.</p>
                <p>${url}</p>
                <p>This link will expire in 1 hour.</p>
                <p>If you did not request this, please ignore this email.</p>
                <br>
                <p>Thank you!</p>
                <p>Regards,<br>Your App Team</p>
            </div>
        `;

        // IMPORTANT: Always log the reset URL during development for testing purposes
        if (isDevelopment) {
            console.log("\n======= DEVELOPMENT MODE =======");
            console.log(`Token: ${hashedToken}`);
            console.log(`Reset URL: ${url}`);
            console.log("=================================\n");
            
            // In development, we can skip actual email sending if needed
            // and just return the token info for testing
            if (!resendApiKey || process.env.SKIP_EMAIL === 'true') {
                return {
                    success: true,
                    devMode: true,
                    message: "Email skipped in development mode",
                    url,
                    token: hashedToken
                };
            }
        }

        // Try to send the email with Resend
        try {
            console.log(`Attempting to send email via Resend to: ${email}`);
            
            const { data, error } = await resend.emails.send({
                from: 'Auth App <onboarding@resend.dev>', // This is Resend's verified testing domain
                to: [email],
                subject: subject,
                html: htmlContent,
            });

            if (error) {
                console.error("Resend API error:", error);
                throw new Error(`Email sending failed: ${error.message}`);
            }

            console.log("Email sent successfully!");
            return { success: true, data };
            
        } catch (emailError: any) {
            console.error("Failed to send email via Resend:", emailError);
            
            // If we're in development, return the token even if email sending fails
            if (isDevelopment) {
                return {
                    success: false,
                    devMode: true,
                    message: "Email failed but in development mode",
                    url,
                    token: hashedToken
                };
            }
            
            // For production, we need to throw the error
            throw emailError;
        }

    } catch (error: any) {
        console.error("Error in sendEmail function:", error);
        throw error;
    }
}