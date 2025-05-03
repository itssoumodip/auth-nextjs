import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

connect();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { token } = reqBody;
        console.log(token);
        
        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() }})

        if (!user) {
            return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
        }

        console.log("user", user);

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;    
        await user.save();

        return NextResponse.json({
            message: "Email verified successfully",
            success: true,
        })

    } catch (error: any) {
        console.error("Error verifying email", error);
        return NextResponse.json({error: error.message }, {status: 500});
    }
}
