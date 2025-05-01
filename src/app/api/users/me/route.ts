import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connectDB } from "@/dbConfig/dbConfig";

connectDB();

export async function GET(req: NextRequest) {
    try {
        const userId = await getDataFromToken(req);
        const user = User.findOne({_id: userId}).select("-password");
        return NextResponse.json({
            message: "User fount",
            data: user
        });
    }
    catch (error: any) {   
        console.error("Error getting user data", error);
        return NextResponse.json({error: error.message }, {status: 500});   
    }
}