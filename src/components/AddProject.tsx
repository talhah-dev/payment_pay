"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import { ChevronDownIcon, PlusCircleIcon } from 'lucide-react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Calendar } from './ui/calendar'

const AddProject = () => {
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState<Date | undefined>(undefined)


    return (
        <div>
            <div className="flex items-center w-full justify-between">
                <div className="">
                    <h2 className='text-xl font-semibold text-zinc-800'>Project Dashboard</h2>
                    <p className='text-sm mt-1 text-zinc-600'>Manage your collaborative projects and payments</p>
                </div>
                <Dialog>
                    <form>
                        <DialogTrigger asChild>
                            <Button><PlusCircleIcon /> Add Project</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Add Project</DialogTitle>
                                <DialogDescription>
                                    Create and manage new projects with essential details
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4">
                                <div className="grid gap-3">
                                    <Label htmlFor="name-1">Title</Label>
                                    <Input id="name-1" name="name" defaultValue="figma" />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="desc">Description</Label>
                                    <Input id="desc" name="username" defaultValue="Create using Next.tsx" />
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <div className="flex flex-col gap-3">
                                    <Label htmlFor="date-picker" className="px-1">
                                        Date
                                    </Label>
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                id="date-picker"
                                                className="w-32 justify-between font-normal"
                                            >
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
                                                    setDate(date)
                                                    setOpen(false)
                                                }}
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
                                        step="1"
                                        defaultValue="10:30:00"
                                        className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="amount">Amount</Label>
                                    <Input id="amount" name="username" defaultValue="3500" />
                                </div>
                            </div>

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit">Add</Button>
                            </DialogFooter>
                        </DialogContent>
                    </form>
                </Dialog>
            </div>

        </div>
    )
}

export default AddProject