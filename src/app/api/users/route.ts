import mongoDB from "@/lib/mongooseDB";
import signUpModel from "@/Models/Signup";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await mongoDB();

        const users = await signUpModel.find({});
        // Don't send password to client
        return NextResponse.json({ message: "verified users", users });

    } catch {
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}