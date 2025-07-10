import mongoDB from "@/lib/mongooseDB";
import signUpModel from "@/Models/Signup";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await mongoDB();

        const users = await signUpModel.find({});
        // Don't send password to client
        return NextResponse.json({ message: "verified users", users });

    } catch (error) {
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}