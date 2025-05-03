import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(req: NextRequest) {
    try {
        const userId = await getDataFromToken(req);
        const user = await User.findOne({_id: userId}).select("-password");
        
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        
        return NextResponse.json({
            message: "User found",
            data: user
        });
    }
    catch (error: any) {   
        console.error("Error getting user data", error);
        return NextResponse.json({error: error.message }, {status: 500});   
    }
}