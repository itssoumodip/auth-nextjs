import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    console.log(`Processing forgot password request for email: ${email}`);

    const user = await User.findOne({ email });
    
    if (!user) {
      console.log(`User not found for email: ${email}`);
      return NextResponse.json(
        { error: "User with this email does not exist" },
        { status: 400 }
      );
    }

    console.log(`User found, sending reset email to: ${email}`);

    try {
      const result = await sendEmail({
        email: user.email,
        emailType: "RESET",
        userId: user._id
      });

      console.log(`Reset email processing completed for: ${email}`);
      
      if (result && result.devMode) {
        console.log("Running in development mode - email not actually sent");
        return NextResponse.json({
          message: "Password reset link generated (check server console)",
          success: true,
          devMode: true
        });
      }
      
      return NextResponse.json({
        message: "Password reset email sent successfully",
        success: true
      });
    } catch (emailError: any) {
      console.error(`Email sending failed for ${email}:`, emailError);
      
      return NextResponse.json(
        { error: "Failed to send reset email. Please try again later." },
        { status: 500 }
      );
    }
    
  } catch (error: any) {
    console.error("Error in forgot-password API route:", error);
    return NextResponse.json(
      { error: "Something went wrong on our end. Please try again later." },
      { status: 500 }
    );
  }
}