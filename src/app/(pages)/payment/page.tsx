"use client";
import BodyWrapper from '@/app/BodyWrapper';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Share, MoreVertical } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { SlGraph } from 'react-icons/sl';
import { LuLoader } from "react-icons/lu";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

type Project = {
    _id: string;
    title: string;
    time: string;
    status: string;
    amount: number;
    paymentStatus: string;
    createdAt: string;
};

const Page = () => {
    const [payload, setPayload] = useState<Project[]>([]);
    const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
    const [totalUnpaidAmount, setTotalUnpaidAmount] = useState<number>(0);
    const [totalProjects, setTotalProjects] = useState<number>(0);

    const allProjectsFetch = async () => {
        try {
            const response = await axios.get("/api/project");
            const projects = response.data.projects;
            setPayload(projects);
            setSelectedProjects([]); // Reset selected projects on refresh

            // Calculate total amount and count of unpaid projects
            const unpaidProjects = projects.filter((item: Project) => item.paymentStatus === 'unpaid');
            const totalUnpaid = unpaidProjects.reduce((sum: number, project: Project) => sum + Number(project.amount), 0);
            const unpaidProjectsCount = unpaidProjects.length;
            setTotalUnpaidAmount(totalUnpaid);
            setTotalProjects(unpaidProjectsCount);
        } catch {
            console.error("Error fetching projects:");
        }
    };

    const handleSelectProject = (projectId: string, checked: boolean) => {
        setSelectedProjects((prev) =>
            checked ? [...prev, projectId] : prev.filter((id) => id !== projectId)
        );
    };

    const handleMarkAsPaid = async () => {
        try {
            const updatePromises = selectedProjects.map((id) =>
                axios.put("/api/project", {
                    id,
                    paymentStatus: "paid",
                }, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
            );
            await Promise.all(updatePromises);
            await allProjectsFetch(); // Refresh project list
            alert("Selected projects marked as paid.");
        } catch (error) {
            console.error("Error updating payment status:", error);
            alert("Failed to update payment status. Please try again.");
        }
    };

    const handleDeleteProject = async (projectId: string) => {
        try {
            const response = await axios.delete("/api/project", {
                data: { id: projectId },
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.status === 200) {
                await allProjectsFetch(); // Refresh project list
                alert("Project deleted successfully.");
            }
        } catch (error) {
            console.error("Error deleting project:", error);
            alert("Failed to delete project. Please try again.");
        }
    };

    const handleExportPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("Unpaid Projects Report", 14, 22);

        const tableData = payload
            .filter((item) => item.paymentStatus === 'unpaid')
            .map((item) => [
                item.title,
                item.createdAt
                    ? new Date(item.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                    })
                    : 'N/A',
                item.status,
                item.amount.toString(),
                item.paymentStatus,
            ]);

        autoTable(doc, {
            head: [['Title', 'Date', 'Status', 'Amount', 'Payment Status']],
            body: tableData,
            startY: 30,
            theme: 'striped',
            headStyles: { fillColor: [100, 100, 100] },
            styles: { fontSize: 10 },
        });

        doc.save(`unpaid-projects-${new Date().toISOString().split('T')[0]}.pdf`);
    };

    useEffect(() => {
        allProjectsFetch();
    }, []);

    return (
        <BodyWrapper className='p-5'>
            <div className=''>
                <div className="flex items-center w-full justify-between">
                    <div className="">
                        <h2 className='text-xl font-semibold text-zinc-800'>Payment Tracking</h2>
                        <p className='text-sm mt-1 text-zinc-600'>Track and manage all project payments</p>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            onClick={handleMarkAsPaid}
                            disabled={selectedProjects.length === 0}
                        >
                            Mark as Paid
                        </Button>
                        <Button onClick={handleExportPDF}>
                            <Share className="mr-2 h-4 w-4" /> Export
                        </Button>
                    </div>
                </div>

                <div className="grid mt-10 md:grid-cols-2 gap-3 grid-cols-1">
                    <Card className="@container/card">
                        <CardHeader>
                            <CardDescription>Total Revenue</CardDescription>
                            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                PKR {totalUnpaidAmount}
                            </CardTitle>
                            <CardAction>
                                <Badge variant="outline">
                                    <SlGraph />
                                    Profit
                                </Badge>
                            </CardAction>
                        </CardHeader>
                        <CardFooter className="flex-col items-start gap-1.5 text-sm">
                            <div className="line-clamp-1 flex gap-2 font-medium">
                                Total Payment <SlGraph className="size-4" />
                            </div>
                            <div className="text-muted-foreground">
                                Earn for the last 6 months
                            </div>
                        </CardFooter>
                    </Card>
                    <Card className="@container/card">
                        <CardHeader>
                            <CardDescription>Total Projects</CardDescription>
                            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                {totalProjects}
                            </CardTitle>
                            <CardAction>
                                <Badge variant="outline">
                                    <SlGraph />
                                    Work
                                </Badge>
                            </CardAction>
                        </CardHeader>
                        <CardFooter className="flex-col items-start gap-1.5 text-sm">
                            <div className="line-clamp-1 flex gap-2 font-medium">
                                Total Projects Completed <SlGraph className="size-4" />
                            </div>
                            <div className="text-muted-foreground">
                                Start for the last 6 months
                            </div>
                        </CardFooter>
                    </Card>
                </div>

                <div className="overflow-auto mt-8 w-full">
                    <Table className='rounded-t-xl overflow-hidden'>
                        <TableCaption>A list of payment status in progress.</TableCaption>
                        <TableHeader className='bg-white'>
                            <TableRow>
                                <TableHead className='px-5 py-4'>
                                    <Checkbox
                                        checked={selectedProjects.length === payload.filter((item) => item.paymentStatus === 'unpaid').length && payload.length > 0}
                                        onCheckedChange={(checked) => {
                                            if (checked) {
                                                setSelectedProjects(payload.filter((item) => item.paymentStatus === 'unpaid').map((item) => item._id));
                                            } else {
                                                setSelectedProjects([]);
                                            }
                                        }}
                                    />
                                </TableHead>
                                <TableHead className='px-5 py-4'>Title</TableHead>
                                <TableHead className='px-5 py-4'>Date</TableHead>
                                <TableHead className='px-5 py-4'>Status</TableHead>
                                <TableHead className="text-right px-5 py-4">Amount</TableHead>
                                <TableHead className="text-right px-5 py-4">Payment Status</TableHead>
                                <TableHead className="text-right px-5 py-4"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className='bg-zinc-300'>
                            {payload.filter((item) => item.paymentStatus === 'unpaid').map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell className='px-5 py-4'>
                                        <Checkbox
                                            checked={selectedProjects.includes(item._id)}
                                            onCheckedChange={(checked) => handleSelectProject(item._id, checked as boolean)}
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium px-5 py-4">{item.title}</TableCell>
                                    <TableCell className='px-5 py-4'>
                                        {item.createdAt
                                            ? new Date(item.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                            })
                                            : 'N/A'}
                                    </TableCell>
                                    <TableCell className='px-5 py-4 flex items-center gap-1'>
                                        <LuLoader className='text-zinc-500' /> {item.status}
                                    </TableCell>
                                    <TableCell className="px-5 py-4 text-right">{item.amount}</TableCell>
                                    <TableCell className="px-5 py-4 text-right text-red-600 text-xs">{item.paymentStatus}</TableCell>
                                    <TableCell className="px-5 py-4 text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => handleDeleteProject(item._id)}>
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </BodyWrapper>
    );
};

export default Page;