import mongoDB from "@/lib/mongooseDB";
import postModel from "@/Models/Project";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await mongoDB();
        const { title, description, deadline, time, amount } = await req.json();

        if (!title || !description || !deadline || !time || !amount) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ message: "Missing token" }, { status: 401 });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { _id: string };
        const userId = decoded._id;

        const project = await postModel.create({
            title,
            description,
            deadline,
            time,
            amount,
            user: userId,
        });

        return NextResponse.json({ message: "Project created successfully", project }, { status: 201 });
    } catch {
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

interface ProjectUpdateData {
    title?: string;
    description?: string;
    deadline?: string; // Or Date, depending on how you store it
    time?: string; // Or Date, or number
    amount?: number;
    status?: string;
    paymentStatus?: string;
}

export async function PUT(req: NextRequest) {
    try {
        await mongoDB();
        const { id, title, description, deadline, time, amount, status, paymentStatus } = await req.json();

        if (!id) {
            return NextResponse.json({ message: "Project ID is required" }, { status: 400 });
        }

        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ message: "Missing token" }, { status: 401 });
        }

        // Make sure to assert the type of the decoded token if you're sure of its structure
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { _id: string };
        const userId = decoded._id;

        // Use the defined interface for updateData
        const updateData: ProjectUpdateData = {};

        // Conditionally add properties to updateData
        if (title) updateData.title = title;
        if (description) updateData.description = description;
        if (deadline) updateData.deadline = deadline;
        if (time) updateData.time = time;
        if (amount) updateData.amount = amount;
        if (status) updateData.status = status;
        if (paymentStatus) updateData.paymentStatus = paymentStatus;

        const project = await postModel.findOneAndUpdate(
            { _id: id, user: userId },
            updateData,
            { new: true } // Returns the modified document rather than the original
        );

        if (!project) {
            return NextResponse.json({ message: "Project not found or unauthorized" }, { status: 404 });
        }

        return NextResponse.json({ message: "Project updated successfully", project }, { status: 200 });
    } catch (error) {
        // It's good practice to log the error for debugging purposes
        console.error("Error updating project:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}


export async function DELETE(req: NextRequest) {
    try {
        await mongoDB();
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json({ message: "Project ID is required" }, { status: 400 });
        }

        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ message: "Missing token" }, { status: 401 });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { _id: string };
        const userId = decoded._id;

        const project = await postModel.findOneAndDelete({ _id: id, user: userId });

        if (!project) {
            return NextResponse.json({ message: "Project not found or unauthorized" }, { status: 404 });
        }

        return NextResponse.json({ message: "Project deleted successfully" }, { status: 200 });
    } catch {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}