import { NextResponse } from "next/server";


export async function GET() {
    try {
        const response = NextResponse.json({
            message: "Logout successful",
            success: true,
        });
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0), // Set the expiration date to the past to delete the cookie
        });
        return response;
    } catch (error: any) {
        console.error("Logout error details:", error);
        return NextResponse.json({error: error.message}, 
        {status: 500});  
    }
}