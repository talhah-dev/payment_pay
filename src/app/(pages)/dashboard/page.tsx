"use client"
import BodyWrapper from '@/app/BodyWrapper'
import AddProject from '@/components/AddProject'
import { Badge } from '@/components/ui/badge'
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { SlGraph } from 'react-icons/sl'

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
                <AddProject />
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

            </div>

        </BodyWrapper >
    )
}

export default Page