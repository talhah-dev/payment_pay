import mongoDB from "@/lib/mongooseDB";
import signUpModel from "@/Models/Signup";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

interface SignupPayload {
    otp: string;
    name: string;
    email: string;
    password: string;
    role: "user" | "admin";
    profileImage: string;
}

export async function POST(req: NextRequest) {
    await mongoDB();
    const { code } = await req.json();

    try {
        const token = req.cookies.get("verify_token")?.value;
        if (!token) {
            return NextResponse.json({ message: "Missing token" }, { status: 400 });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as SignupPayload;
        if (decoded.otp !== code) {
            return NextResponse.json({ message: "Invalid code" }, { status: 400 });
        }

        const { name, email, password, role, profileImage } = decoded;

        const existingUser = await signUpModel.findOne({ email });
        if (existingUser)
            return NextResponse.json({ message: "Email already exists" }, { status: 400 });

        const newUser = new signUpModel({
            name,
            email,
            password,
            role,
            profileImage,
            isVerified: true,
        });
        await newUser.save();

        return NextResponse.json({ message: "Account verified" });
    } catch (err) {
        return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
    }

}
