import { connectDB } from "@/dbConfig/dbConfig"; 
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
    try {
        // Connect to the database first
        await connectDB();
        
        const reqBody = await req.json();
        const {username, email, password} = reqBody

        console.log("reqBody", reqBody);
        
        if (!username || !email || !password) {
            return NextResponse.json({error: "Missing required fields"}, {status: 400});
        }
        
        // Check if user already exists
        const existingUser = await User.findOne({email})
        if (existingUser) {
            return NextResponse.json({error: "User already exists"}, {status: 400});
        } 
        
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        
        const savedUser = await newUser.save();
        console.log("savedUser", savedUser);

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