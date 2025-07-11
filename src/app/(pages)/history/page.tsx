"use client";
import BodyWrapper from '@/app/BodyWrapper';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MdCheckCircle } from "react-icons/md";
import axios from 'axios';
import { Share } from 'lucide-react';
import React, { useEffect, useState } from 'react';
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

    const allProjectsFetch = async () => {
        try {
            const response = await axios.get("/api/project");
            const projects = response.data.projects;
            setPayload(projects);
        } catch {
            console.error("Error fetching projects:");
        }
    };

    const handleExportPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("Paid Projects Report", 14, 22);

        const tableData = payload
            .filter((item) => item.paymentStatus === 'paid')
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

        doc.save(`paid-projects-${new Date().toISOString().split('T')[0]}.pdf`);
    };

    useEffect(() => {
        allProjectsFetch();
    }, []);

    return (
        <BodyWrapper className='p-5'>
            <div className=''>
                <div className="flex items-center w-full justify-between">
                    <div className="">
                        <h2 className='text-xl font-semibold text-zinc-800'>History</h2>
                        <p className='text-sm mt-1 text-zinc-600'>Track and manage all project history</p>
                    </div>
                    <Button onClick={handleExportPDF}>
                        <Share className="mr-2 h-4 w-4" /> Export
                    </Button>
                </div>

                <div className="overflow-auto mt-8 w-full">
                    <Table className='rounded-t-xl overflow-hidden'>
                        <TableCaption>A list of payment status is completed.</TableCaption>
                        <TableHeader className='bg-white'>
                            <TableRow>
                                <TableHead className='px-5 py-4'>Title</TableHead>
                                <TableHead className='px-5 py-4'>Date</TableHead>
                                <TableHead className='px-5 py-4'>Status</TableHead>
                                <TableHead className="text-right px-5 py-4">Amount</TableHead>
                                <TableHead className="text-right px-5 py-4">Payment Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className='bg-zinc-300'>
                            {payload.filter((item) => item.paymentStatus === 'paid').map((item, index) => (
                                <TableRow key={index}>
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
                                        <MdCheckCircle className='text-green-600' /> {item.status}
                                    </TableCell>
                                    <TableCell className="px-5 py-4 text-right">{item.amount}</TableCell>
                                    <TableCell className="px-5 py-4 text-right text-green-600 text-xs">{item.paymentStatus}</TableCell>
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