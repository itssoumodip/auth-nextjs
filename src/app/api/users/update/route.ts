import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connectDB();

export async function PUT(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const reqBody = await request.json();
    const { username, email } = reqBody;

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json({ error: "Email already in use" }, { status: 400 });
      }
      user.email = email;
    }

    if (username) {
      user.username = username;
    }

    await user.save();

    return NextResponse.json({
      message: "Profile updated successfully",
      success: true,
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
      }
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}