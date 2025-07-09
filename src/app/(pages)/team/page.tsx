import BodyWrapper from '@/app/BodyWrapper'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { User } from 'lucide-react'
import React from 'react'

const Page = () => {
    return (
        <BodyWrapper className='p-5'>
            <div className=''>
                <div className="flex items-center w-full justify-between">
                    <div className="">
                        <h2 className='text-xl font-semibold text-zinc-800'>Team Members</h2>
                    </div>
                    <Button> <User /> Add Member</Button>
                </div>

                <Card className="w-full mt-10">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Avatar className="h-12 w-12 rounded-lg">
                                {/* <AvatarImage src={"user.avatar"} alt={"user.name"} /> */}
                                <AvatarFallback className="rounded-lg">MT</AvatarFallback>
                            </Avatar>
                            <div className="">
                                <CardTitle>M Talha</CardTitle>
                                <CardDescription className='mt-1'>
                                    Full stack developer
                                </CardDescription>
                            </div>
                        </div>
                        <CardAction>
                            <Badge variant="outline">
                                <User />
                                Admin
                            </Badge>
                        </CardAction>
                    </CardHeader>
                </Card>

            </div>

        </BodyWrapper >
    )
}

export default Page