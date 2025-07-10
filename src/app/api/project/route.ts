import mongoDB from "@/lib/mongooseDB";
import postModel from "@/Models/Project";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        // Ensure MongoDB connection
        await mongoDB();

        // Parse request body
        const { title, description, deadline, time, amount } = await req.json();

        // Validate input fields
        if (!title || !description || !deadline || !time || !amount) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        // Validate token
        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ message: "Missing token" }, { status: 401 });
        }

        // Verify JWT token
        // let decoded: { _id: string };
        // try {
        let decoded = jwt.verify(token, process.env.JWT_SECRET!) as { _id: string };

        // } catch (error) {
        //     console.error("JWT verification error:", error);
        //     return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
        // }

        // Ensure user ID is valid
        const userId = decoded._id;
        // if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        //     return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
        // }

        // Create project
        const project = await postModel.create({
            title,
            description,
            deadline,
            time,
            amount,
            user: userId,
        });

        return NextResponse.json({ message: "Project created successfully", project }, { status: 201 });
    } catch (error: any) {
        console.error("Error creating project:", {
            message: error.message,
            stack: error.stack,
            code: error.code,
        });
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function GET() {
    try {
        await mongoDB();
        const projects = await postModel.find({});
        return NextResponse.json({ projects }, { status: 200 });
    } catch {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}