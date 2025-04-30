import { connectDB } from "@/dbConfig/dbConfig"; 
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

connectDB();
export async function POST(req: NextRequest) { 
    try {
        const reqBody = await req.json();
        const {email, password} = reqBody;
        
    } catch (error: any) {
        console.error("Login error details:", error);
        return NextResponse.json({
            error: error.message || "Something went wrong during login"
        }, {status: 500});
        
    }
}