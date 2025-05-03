import { connect } from "@/dbConfig/dbConfig"; 
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { sendEmail } from "@/helpers/mailer";

export async function POST(req: NextRequest) {
    try {
        await connect();
        
        const reqBody = await req.json();
        const {username, email, password} = reqBody

        console.log("reqBody", reqBody);
        
        if (!username || !email || !password) {
            return NextResponse.json({error: "Missing required fields"}, {status: 400});
        }
        
        const existingEmail = await User.findOne({email});
        if (existingEmail) {
            return NextResponse.json({error: "Email already in use"}, {status: 400});
        } 
        
        const existingUsername = await User.findOne({username});
        if (existingUsername) {
            return NextResponse.json({error: "Username already taken"}, {status: 400});
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        
        const savedUser = await newUser.save();
        console.log("savedUser", savedUser);

        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id});

        return NextResponse.json({
            message: "User created successfully", 
            success: true, 
            user: {
                id: savedUser._id,
                username: savedUser.username,
                email: savedUser.email
            }
        });
    }
    catch (error: any) { 
        console.error("Signup error details:", error);
        return NextResponse.json({
            error: error.message || "Something went wrong during signup"
        }, {status: 500});   
    }
}