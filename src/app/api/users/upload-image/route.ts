import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { uploadToCloudinary } from "@/helpers/cloudinary";

connect();

export async function POST(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const user = await User.findById(userId);
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    const reqBody = await request.json();
    const { imageBase64 } = reqBody;
    
    if (!imageBase64) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }
    
    const uploadResult = await uploadToCloudinary(imageBase64);
    
    if (!uploadResult.success) {
      return NextResponse.json(
        { error: "Failed to upload image" },
        { status: 500 }
      );
    }
    
    user.profileImage = uploadResult.url;
    user.cloudinaryId = uploadResult.public_id;
    await user.save();
    
    return NextResponse.json({
      message: "Profile image updated successfully",
      profileImage: uploadResult.url
    });
    
  } catch (error: any) {
    console.error("Error updating profile image:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update profile image" },
      { status: 500 }
    );
  }
}