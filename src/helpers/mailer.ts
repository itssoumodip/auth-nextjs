import User from '@/models/userModel';
import bcrypt from 'bcryptjs';
import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = new Resend(resendApiKey);

const isDevelopment = process.env.NODE_ENV === 'development';
// Your verified email that works with Resend
const VERIFIED_EMAIL = 'soumodipddas@gmail.com';

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        console.log(`[Email Service] Preparing to send ${emailType} email to: ${email}`);
        
        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000,
                // If the email is not your verified email, auto-verify them in production
                ...((process.env.NODE_ENV === 'production' && email !== VERIFIED_EMAIL) && { isVerified: true })
            });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000 
            });
        }

        let domain;
        
        if (process.env.VERCEL_URL) {
            domain = `https://${process.env.VERCEL_URL}`;
        } else if (process.env.DOMAIN) {
            domain = process.env.DOMAIN;
        } else if (isDevelopment) {
            domain = 'http://localhost:3000';
        } else {
            domain = 'http://localhost:3000';
        }

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

        // In production mode with a non-verified email, return the special handling
        if (process.env.NODE_ENV === 'production' && email !== VERIFIED_EMAIL && (emailType === "VERIFY" || emailType === "RESET")) {
            console.log(`Production mode: Handling ${emailType} email specially for non-verified email: ${email}`);
            
            return {
                success: true,
                productionMode: true,
                message: `Email skipped in production. ${emailType === "VERIFY" ? "User auto-verified." : "Password reset token generated."}`,
                url,
                token: hashedToken
            };
        }

        if (isDevelopment) {
            console.log("\n======= DEVELOPMENT MODE =======");
            console.log(`Token: ${hashedToken}`);
            console.log(`Reset URL: ${url}`);
            console.log("=================================\n");
    
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

        try {
            console.log(`Attempting to send email via Resend to: ${email}`);
            
            // Always attempt to send email in development or if it's your verified email
            const { data, error } = await resend.emails.send({
                from: 'Auth App <onboarding@resend.dev>',
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
            
            if (isDevelopment) {
                return {
                    success: false,
                    devMode: true,
                    message: "Email failed but in development mode",
                    url,
                    token: hashedToken
                };
            }
            
            // In production, if email fails but we're creating an account or resetting a password, don't throw
            if (emailType === "VERIFY" || emailType === "RESET") {
                console.log(`Production mode: Email failed but continuing with ${emailType === "VERIFY" ? "account creation" : "password reset"}`);
                return {
                    success: false,
                    productionMode: true,
                    message: `Email failed in production but ${emailType === "VERIFY" ? "user created and auto-verified" : "password reset token generated"}`,
                    url,
                    token: hashedToken
                };
            }
            
            throw emailError;
        }

    } catch (error: any) {
        console.error("Error in sendEmail function:", error);
        throw error;
    }
}