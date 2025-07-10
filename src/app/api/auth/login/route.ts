import mongoDB from "@/lib/mongooseDB";
import signUpModel from "@/Models/Signup";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await mongoDB();

        const { email, password } = await req.json();

        const existingUser = await signUpModel.findOne({ email });

        if (!existingUser) {
            return NextResponse.json({ message: "Email not found" }, { status: 400 });
        }

        // Compare raw password with hashed password
        const isMatch = await bcrypt.compare(password, existingUser.password);

        if (!isMatch) {
            return NextResponse.json({ message: "Invalid password" }, { status: 400 });
        }

        // Create JWT token
        const token = jwt.sign(
            {
                _id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                role: existingUser.role,
                profileImage: existingUser.profileImage,
            },
            process.env.JWT_SECRET!,
            { expiresIn: "90d" } // Change as needed
        );

        // Create response & set cookie
        const response = NextResponse.json({ message: `Welcome ${existingUser.name}` });


        response.cookies.set("token", token, {
            httpOnly: true,
            maxAge: 90 * 24 * 60 * 60,
            path: "/",
        });

        return response;

    } catch (err) {
        console.error("Login error:", err);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
