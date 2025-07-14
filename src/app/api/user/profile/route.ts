import mongoDB from "@/lib/mongooseDB";
import signUpModel from "@/Models/Signup";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

interface ProfilePayload {
    name: string;
    email: string;
    role: "user" | "admin";
    profileImage: string;
}

export async function GET(req: NextRequest) {
    try {
        await mongoDB();
        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ message: "Missing token" }, { status: 400 });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as ProfilePayload;
        const user = await signUpModel.findOne({ email: decoded.email }).select("-password");

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "verified user", profile: user });

    } catch {
        return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
    }
}