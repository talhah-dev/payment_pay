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
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import axios from "axios";
import { Calendar, ChevronDownIcon, NotebookPen, Wallet } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Project = {
    _id: string;
    title: string;
    description: string;
    deadline: string;
    time: string;
    status: string;
    amount: number;
};

const Page = () => {
    const [payload, setPayload] = useState<Project[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [date, setDate] = useState<Date | undefined>(undefined);

    const allProjectsFetch = async () => {
        try {
            const response = await axios.get("/api/project");
            const projects = response.data.projects;
            setPayload(projects);
        } catch {
            console.error("Error fetching projects:");
        }
    };

    const handleUpdateProject = async (e: React.FormEvent<HTMLFormElement>, projectId: string) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const updatedProject = {
            id: projectId,
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            deadline: date && !isNaN(date.getTime()) ? date.toISOString().split("T")[0] : selectedProject?.deadline,
            time: formData.get("time") as string,
            amount: Number(formData.get("amount")),
            status: formData.get("status") as string,
        };

        try {
            const response = await axios.put("/api/project", updatedProject, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.status === 200) {
                await allProjectsFetch(); // Refresh project list
                setOpen(false); // Close the dialog
                setSelectedProject(null); // Reset selected project
                setDate(undefined); // Reset date
            }
        } catch (error) {
            console.error("Error updating project:", error);
            alert("Failed to update project. Please try again.");
        }
    };

    const handleEditClick = (project: Project) => {
        setSelectedProject(project);
        const parsedDate = new Date(project.deadline);
        setDate(!isNaN(parsedDate.getTime()) ? parsedDate : undefined);
        setOpen(true);
    };

    useEffect(() => {
        allProjectsFetch();
    }, []);

    return (
        <BodyWrapper className="p-5">
            <div>
                <AddProject />
                <Command className="rounded-lg mt-10 border shadow-md max-w-xs">
                    <CommandInput placeholder="Type a command or search..." />
                </Command>
                <div className="grid mt-3 md:grid-cols-2 gap-3 grid-cols-1">
                    {payload.filter((item) => item.status === "pending").map((project, index) => (
                        <Card className="@container/card" key={index}>
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold">
                                    {project.title}
                                </CardTitle>
                                <CardDescription className="line-clamp-2">
                                    {project.description}
                                </CardDescription>
                                <CardAction className="flex gap-2 items-center">
                                    <Badge variant="outline">{project.status}</Badge>
                                    <Dialog open={open && selectedProject?._id === project._id} onOpenChange={(isOpen) => {
                                        if (!isOpen) {
                                            setSelectedProject(null);
                                            setDate(undefined);
                                        }
                                        setOpen(isOpen);
                                    }}>
                                        <DialogTrigger asChild>
                                            <NotebookPen
                                                className="text-zinc-700 cursor-pointer"
                                                size={18}
                                                onClick={() => handleEditClick(project)}
                                            />
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            {selectedProject && (
                                                <form onSubmit={(e) => handleUpdateProject(e, selectedProject._id)}>
                                                    <DialogHeader>
                                                        <DialogTitle>Edit Project</DialogTitle>
                                                        <DialogDescription>Edit the projects with accurate essential details</DialogDescription>
                                                    </DialogHeader>
                                                    <div className="grid gap-4 mt-5">
                                                        <div className="grid gap-3">
                                                            <Label htmlFor="title">Title</Label>
                                                            <Input id="title" name="title" defaultValue={selectedProject.title} />
                                                        </div>
                                                        <div className="grid gap-3">
                                                            <Label htmlFor="description">Description</Label>
                                                            <Input id="description" name="description" defaultValue={selectedProject.description} />
                                                        </div>
                                                        <div className="grid w-full gap-3">
                                                            <Label htmlFor="status">Status</Label>
                                                            <Select name="status" defaultValue={selectedProject.status}>
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="Select status" />
                                                                </SelectTrigger>
                                                                <SelectContent className="w-full">
                                                                    <SelectItem value="pending">Pending</SelectItem>
                                                                    <SelectItem value="completed">Completed</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2 my-5">
                                                        <div className="flex flex-col gap-3">
                                                            <Label htmlFor="date-picker" className="px-1">
                                                                Deadline
                                                            </Label>
                                                            <Popover>
                                                                <PopoverTrigger asChild>
                                                                    <Button
                                                                        variant="outline"
                                                                        id="date-picker"
                                                                        className="w-32 justify-between font-normal"
                                                                    >
                                                                        {date && !isNaN(date.getTime()) ? date.toLocaleDateString() : selectedProject.deadline}
                                                                        <ChevronDownIcon />
                                                                    </Button>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                                                    <CalendarComponent
                                                                        mode="single"
                                                                        selected={date}
                                                                        onSelect={(newDate: Date | undefined) => setDate(newDate)}
                                                                        fromDate={new Date(new Date().setDate(new Date().getDate() + 1))}
                                                                        disabled={false}
                                                                    />
                                                                </PopoverContent>
                                                            </Popover>
                                                        </div>
                                                        <div className="flex flex-col gap-3">
                                                            <Label htmlFor="time-picker" className="px-1">
                                                                Time
                                                            </Label>
                                                            <Input
                                                                type="time"
                                                                id="time-picker"
                                                                name="time"
                                                                step="60"
                                                                defaultValue={selectedProject.time}
                                                                className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                                            />
                                                        </div>
                                                        <div className="grid gap-3">
                                                            <Label htmlFor="amount">Amount</Label>
                                                            <Input id="amount" name="amount" defaultValue={selectedProject.amount} />
                                                        </div>
                                                    </div>
                                                    <DialogFooter>
                                                        <DialogClose asChild>
                                                            <Button variant="outline">Cancel</Button>
                                                        </DialogClose>
                                                        <Button type="submit">Update</Button>
                                                    </DialogFooter>
                                                </form>
                                            )}
                                        </DialogContent>
                                    </Dialog>
                                </CardAction>
                            </CardHeader>
                            <CardFooter className="flex items-center justify-between">
                                <div className="flex-col items-start gap-1.5 text-sm w-full">
                                    <div className="flex gap-2 font-medium">
                                        <Wallet className="size-4" /> {project.amount} PKR
                                    </div>
                                    <div className="line-clamp-1 mt-4 flex gap-2 font-medium">
                                        <Calendar className="size-4" /> {project.deadline} - {project.time}
                                    </div>
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