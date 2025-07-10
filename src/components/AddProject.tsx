"use client";
import React, { useState, useRef } from "react";
import { Button } from "./ui/button";
import { ChevronDownIcon, PlusCircleIcon } from "lucide-react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import axios from "axios";
import { toast } from "react-toastify";

const AddProject = () => {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date | undefined>(undefined);
    const dialogCloseRef = useRef<HTMLButtonElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const projectHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const amount = formData.get("amount") as string;
        const time = formData.get("time") as string;
        const deadline = date ? date.toLocaleDateString() : "";

        if (!title || !description || !amount || !time || !deadline) {
            return toast.error("All fields are required");
        }

        const payload = {
            title,
            description,
            amount,
            deadline,
            time,
        };

        try {
            await axios.post("/api/project/", payload, { withCredentials: true });
            toast.success("Project created successfully");
            // Reset form fields
            formRef.current?.reset();
            setDate(undefined);
            // Close the modal
            dialogCloseRef.current?.click();
        } catch (error) {
            console.error("Error creating project:", error);
            toast.error("Failed to create project");
        }
    };

    return (
        <div>
            <div className="flex items-center w-full justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-zinc-800">Project Dashboard</h2>
                    <p className="text-sm mt-1 text-zinc-600">Manage your collaborative projects and payments</p>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircleIcon /> Add Project
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <form ref={formRef} onSubmit={projectHandler}>
                            <DialogHeader>
                                <DialogTitle>Add Project</DialogTitle>
                                <DialogDescription>Create and manage new projects with essential details</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 mt-5">
                                <div className="grid gap-3">
                                    <Label htmlFor="title">Title</Label>
                                    <Input id="title" name="title" defaultValue="figma" />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="description">Description</Label>
                                    <Input id="description" name="description" defaultValue="Create using Next.tsx" />
                                </div>
                            </div>

                            <div className="flex gap-2 my-5">
                                <div className="flex flex-col gap-3">
                                    <Label htmlFor="date-picker" className="px-1">
                                        Deadline
                                    </Label>
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" id="date-picker" className="w-32 justify-between font-normal">
                                                {date ? date.toLocaleDateString() : "Select date"}
                                                <ChevronDownIcon />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={date}
                                                captionLayout="dropdown"
                                                onSelect={(date) => {
                                                    setDate(date);
                                                    setOpen(false);
                                                }}
                                                fromDate={new Date(new Date().setDate(new Date().getDate() + 1))} // Restrict to tomorrow and beyond
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
                                        defaultValue={"12:00"}
                                        className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="amount">Amount</Label>
                                    <Input id="amount" name="amount" defaultValue="5000" />
                                </div>
                            </div>

                            <DialogFooter>
                                <DialogClose ref={dialogCloseRef} asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit">Add</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default AddProject;