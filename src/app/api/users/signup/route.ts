import {connect} from "@/dbConfig/dbConfig"; 
import user from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { console } from "inspector";


connect();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const {username, email, password} = reqBody

        console.log("reqBody", reqBody);
        // Check if user already exists
        const User = await user.findOne({email})
        if (User) {
            return NextResponse.json({error: "User already exists"}, {status: 400});
        } 
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

    }
    catch (error: any) { 
        return NextResponse.json({error: error.message}, {status: 500});   
    }
}