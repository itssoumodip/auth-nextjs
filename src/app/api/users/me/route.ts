import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import mongoose from "mongoose";

connect();

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const requestedUserId = url.searchParams.get("userId");
        
        let userId;
        let user;
        
        if (requestedUserId) {
            if (!mongoose.isValidObjectId(requestedUserId)) {
                return NextResponse.json({ 
                    success: false,
                    error: "Invalid user ID format" 
                }, { status: 400 });
            }
            
            userId = requestedUserId;
            user = await User.findOne({_id: userId}).select("username email profileImage createdAt updatedAt isVerified lastLogin bio");
        } else {
            try {
                userId = await getDataFromToken(req);
                user = await User.findOne({_id: userId}).select("-password");
            } catch (tokenError) {
                return NextResponse.json({ 
                    success: false,
                    error: "Authentication failed" 
                }, { status: 401 });
            }
        }
        
        if (!user) {
            return NextResponse.json({ 
                success: false,
                error: "User not found" 
            }, { status: 404 });
        }
         
        return NextResponse.json({
            success: true,
            message: "User found",
            data: user
        });
    }
    catch (error: any) {   
        console.error("Error getting user data", error);
        return NextResponse.json({
            success: false,
            error: error.message 
        }, { status: 500 });   
    }
}