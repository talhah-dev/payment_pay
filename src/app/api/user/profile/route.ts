import mongoDB from "@/lib/mongooseDB";
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
        // Don't send password to client
        const { ...profile } = decoded;
        return NextResponse.json({ message: "verified user", profile });

    } catch {
        return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
    }
}