"use client"
import BodyWrapper from '@/app/BodyWrapper'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Share } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { SlGraph } from 'react-icons/sl'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { LuLoader } from "react-icons/lu";
import axios from 'axios';

type Project = {
    title: string;
    time: string;
    status: string;
    amount: number;
    paymentStatus: string;
    createdAt: string;
};

const Page = () => {
    const [payload, setPayload] = useState<Project[]>([]);
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
        <BodyWrapper className='p-5'>
            <div className=''>
                <div className="flex items-center w-full justify-between">
                    <div className="">
                        <h2 className='text-xl font-semibold text-zinc-800'>Payment Tracking</h2>
                        <p className='text-sm mt-1 text-zinc-600'>Track and manage all project payments</p>
                    </div>
                    <Button> <Share /> Export</Button>
                </div>

                <div className="grid mt-10 md:grid-cols-2 gap-3 grid-cols-1">
                    <Card className="@container/card">
                        <CardHeader>
                            <CardDescription>Total Revenue</CardDescription>
                            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                PKR 1,250.00
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
                                {payload.length}
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
                    <Table className='rounded-t-xl overflow-hidden  '>
                        <TableCaption>A list of payment status in progress.</TableCaption>
                        <TableHeader className='bg-white'>
                            <TableRow>
                                <TableHead className='px-5 py-4'>Title</TableHead>
                                <TableHead className='px-5 py-4'>Date</TableHead>
                                <TableHead className='px-5 py-4'>Status</TableHead>
                                <TableHead className="text-right px-5 py-4">Amount</TableHead>
                                <TableHead className="text-right px-5 py-4"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className='bg-zinc-300'>
                            {
                                payload.filter((item) => item.paymentStatus === 'unpaid').map((item, index) => (
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
                                            {/* <MdCheckCircle className='text-green-600' /> */}
                                            <LuLoader className='text-zinc-500' /> {item.status}</TableCell>
                                        <TableCell className="px-5 py-4 text-right">{item.amount}</TableCell>
                                        <TableCell className="px-5 py-4 text-right text-red-600 text-xs">{item.paymentStatus}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </div>
            </div>

        </BodyWrapper >
    )
}

export default Page