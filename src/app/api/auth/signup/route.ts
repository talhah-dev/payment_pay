import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import signUpModel from "@/Models/Signup";
import mongoDB from "@/lib/mongooseDB";
import jwt from "jsonwebtoken";

// Helper: Generate 6-digit code
const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

// Helper: Send email
const sendVerificationEmail = async (email: string, code: string) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER!,
            pass: process.env.EMAIL_PASS!,
        },
    });

    await transporter.sendMail({
        from: `"Verify Your Email" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Email Verification Code",
        html: `<p>Your verification code is: <strong>${code}</strong></p>`,
    });
};

export async function POST(req: NextRequest) {
    try {
        await mongoDB();
        const { name, email, password, role, profileImage, confirmPassword } = await req.json();

        if (!name || !email || !password || !confirmPassword || !role || !profileImage)
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });

        if (password !== confirmPassword)
            return NextResponse.json({ message: "Passwords do not match" }, { status: 400 });

        const existingUser = await signUpModel.findOne({ email });
        if (existingUser)
            return NextResponse.json({ message: "Email already registered" }, { status: 400 });

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationCode = generateCode();

        const token = jwt.sign(
            { name, email, role, profileImage, password: hashedPassword, otp: verificationCode },
            process.env.JWT_SECRET!,
            { expiresIn: "10m" }
        );

        // Send email
        await sendVerificationEmail(email, verificationCode);

        // Now set cookie in response
        const response = NextResponse.json(
            { message: "Verification code sent to email." },
            { status: 201 }
        );

        response.cookies.set("verify_token", token, {
            httpOnly: true,
            maxAge: 600,
            path: "/", // Optional but good practice
        });

        return response;
    }
    catch {
        return NextResponse.json({ message: "Invalid" }, { status: 400 });
    }
}