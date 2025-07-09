import BodyWrapper from '@/app/BodyWrapper'
import { DataTable } from '@/components/DataTable'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Share } from 'lucide-react'
import React from 'react'
import { SlGraph } from 'react-icons/sl'
import data from "./data.json"

const Page = () => {
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
                                $1,250.00
                            </CardTitle>
                            <CardAction>
                                <Badge variant="outline">
                                    <SlGraph />
                                    +12.5%
                                </Badge>
                            </CardAction>
                        </CardHeader>
                        <CardFooter className="flex-col items-start gap-1.5 text-sm">
                            <div className="line-clamp-1 flex gap-2 font-medium">
                                Trending up this month <SlGraph className="size-4" />
                            </div>
                            <div className="text-muted-foreground">
                                Visitors for the last 6 months
                            </div>
                        </CardFooter>
                    </Card>
                    <Card className="@container/card">
                        <CardHeader>
                            <CardDescription>This Month</CardDescription>
                            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                $1,250.00
                            </CardTitle>
                            <CardAction>
                                <Badge variant="outline">
                                    <SlGraph />
                                    +12.5%
                                </Badge>
                            </CardAction>
                        </CardHeader>
                        <CardFooter className="flex-col items-start gap-1.5 text-sm">
                            <div className="line-clamp-1 flex gap-2 font-medium">
                                Trending up this month <SlGraph className="size-4" />
                            </div>
                            <div className="text-muted-foreground">
                                Visitors for the last 6 months
                            </div>
                        </CardFooter>
                    </Card>

                </div>

                <div className="overflow-auto mt-8 w-full">
                     <DataTable data={data} />
                </div>
            </div>

        </BodyWrapper >
    )
}

export default Page