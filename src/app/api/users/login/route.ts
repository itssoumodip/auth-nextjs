import { connectDB } from "@/dbConfig/dbConfig"; 
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

connectDB();
export async function POST(req: NextRequest) { 
    try {
        const reqBody = await req.json();
        const {email, password} = reqBody;

        // check if user exists
        const user = await User.findOne({email});
        if (!user) {
            return NextResponse.json({error: "User not found"}, {status: 400});
        }
        // check if password is correct
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({error: "Invalid password"}, {status: 400});
        }
        // create token data
        const tokenData = {
            id: user._id,
            email: user.email,
            username: user.username
        };
        // create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"});

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })

        response.cookies.set("token", token, {
            httpOnly: true,
        })
        return response;

    } catch (error: any) {
        console.error("Login error details:", error);
        return NextResponse.json({
            error: error.message || "Something went wrong during login"
        }, {status: 500});
        
    }
}