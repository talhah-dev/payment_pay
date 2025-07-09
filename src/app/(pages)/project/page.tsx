"use client"
import BodyWrapper from '@/app/BodyWrapper'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Progress } from '@/components/ui/progress'
import { Calendar, PlusCircleIcon, Wallet } from 'lucide-react'
import React, { useEffect, useState } from 'react'

type Status = {
    value: string
    label: string
}
const statuses: Status[] = [
    {
        value: "pending",
        label: "Pending",
    },
    {
        value: "in progress",
        label: "In Progress",
    },
    {
        value: "done",
        label: "Done",
    },
    {
        value: "canceled",
        label: "Canceled",
    },
]

const Page = () => {

    const [open, setOpen] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState<Status | null>(
        null
    )

    const [progress, setProgress] = useState(50)

    useEffect(() => {
        setProgress(50)
    }, [])


    return (
        <BodyWrapper className='p-5'>
            <div className=''>

                <div className="flex items-center w-full justify-between">
                    <div className="">
                        <h2 className='text-xl font-medium text-zinc-800'>Project Dashboard</h2>
                        <p className='text-sm mt-1 text-zinc-600'>Manage your collaborative projects and payments</p>
                    </div>
                    <Button> <PlusCircleIcon /> New Project</Button>
                </div>

                <Command className="rounded-lg mt-10 border shadow-md max-w-xs">
                    <CommandInput placeholder="Type a command or search..." />
                </Command>

                <div className="grid mt-3 md:grid-cols-2 gap-3 grid-cols-1">
                    <Card className="@container/card">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold ">
                                E-commerce Website
                            </CardTitle>
                            <CardDescription className='line-clamp-2'>Full-stack e-commerce platform with payment integration and admin dashboard</CardDescription>
                            <CardAction>
                                <Badge variant="outline">
                                    Pending
                                </Badge>
                            </CardAction>
                        </CardHeader>
                        <CardFooter className="flex items-center justify-between">
                            <div className="flex-col items-start gap-1.5 text-sm w-full">
                                <div className="flex gap-2 font-medium">
                                    <Wallet className="size-4" /> 2000 PKR
                                </div>
                                <div className="line-clamp-1 mt-2 flex gap-2 font-medium">
                                    <Calendar className="size-4" /> 12 feb
                                </div>
                                <Progress value={progress} className="mt-1.5 w-[60%]" />
                            </div>
                            <div className="flex items-center space-x-4">
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" className="w-[150px] justify-start">
                                            {selectedStatus ? <>{selectedStatus.label}</> : <>+ Set status</>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="p-0" side="right" align="start">
                                        <Command>
                                            <CommandInput placeholder="Change status..." />
                                            <CommandList>
                                                <CommandEmpty>No results found.</CommandEmpty>
                                                <CommandGroup>
                                                    {statuses.map((status) => (
                                                        <CommandItem
                                                            className='text-center'
                                                            key={status.value}
                                                            value={status.value}
                                                            onSelect={(value) => {
                                                                setSelectedStatus(
                                                                    statuses.find((priority) => priority.value === value) ||
                                                                    null
                                                                )
                                                                setOpen(false)
                                                            }}
                                                        >
                                                            {status.label}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>

                        </CardFooter>
                    </Card>

                </div>

            </div>

        </BodyWrapper >
    )
}

export default Page