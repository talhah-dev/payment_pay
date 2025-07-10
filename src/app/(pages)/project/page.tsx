"use client";
import BodyWrapper from "@/app/BodyWrapper";
import AddProject from "@/components/AddProject";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Command,
    CommandInput,
} from "@/components/ui/command";
import { Progress } from "@/components/ui/progress";
import axios from "axios";
import { Calendar, Wallet } from "lucide-react";
import React, { useEffect, useState } from "react";

type Project = {
    title: string;
    description: string;
    deadline: string;
    time: string;
    status: string;
    amount: number;
    createdDate: string; // Added createdDate to the Project type
};

const Page = () => {
    const [payload, setPayload] = useState<Project[]>([]);

    // Function to calculate progress based on createdDate, deadline, and current date
    const calculateProgress = (createdDate: string, deadline: string): number => {
        const created = new Date(createdDate).getTime();
        const deadlineDate = new Date(deadline).getTime();
        const now = new Date().getTime();

        // Ensure dates are valid
        if (isNaN(created) || isNaN(deadlineDate)) return 0;

        // Calculate total duration and elapsed time
        const totalDuration = deadlineDate - created;
        const elapsed = now - created;

        // Calculate progress percentage
        if (totalDuration <= 0) return 100; // If deadline is in the past or invalid
        const progress = Math.min((elapsed / totalDuration) * 100, 100);
        return Math.max(progress, 0); // Ensure progress is between 0 and 100
    };

    const allProjectsfetch = async () => {
        try {
            const response = await axios.get("/api/project");
            const projects = response.data.projects;
            setPayload(projects);
        } catch {
            console.error("Error fetching projects:");
        }
    };

    useEffect(() => {
        allProjectsfetch();
    }, []);

    return (
        <BodyWrapper className="p-5">
            <div>
                <AddProject />
                <Command className="rounded-lg mt-10 border shadow-md max-w-xs">
                    <CommandInput placeholder="Type a command or search..." />
                </Command>
                <div className="grid mt-3 md:grid-cols-2 gap-3 grid-cols-1">
                    {payload.filter((item) => item.status === 'pending').map((project, index) => (
                        <Card className="@container/card" key={index}>
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold">
                                    {project.title}
                                </CardTitle>
                                <CardDescription className="line-clamp-2">
                                    {project.description}
                                </CardDescription>
                                <CardAction>
                                    <Badge variant="outline">{project.status}</Badge>
                                </CardAction>
                            </CardHeader>
                            <CardFooter className="flex items-center justify-between">
                                <div className="flex-col items-start gap-1.5 text-sm w-full">
                                    <div className="flex gap-2 font-medium">
                                        <Wallet className="size-4" /> {project.amount} PKR
                                    </div>
                                    <div className="line-clamp-1 mt-2 flex gap-2 font-medium">
                                        <Calendar className="size-4" /> {project.deadline} -{" "}
                                        {project.time}
                                    </div>
                                    <Progress
                                        value={calculateProgress(project.createdDate, project.deadline)}
                                        className="mt-1.5 w-[60%]"
                                    />
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </BodyWrapper>
    );
};

export default Page;