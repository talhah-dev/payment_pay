"use client";
import BodyWrapper from "@/app/BodyWrapper";
import { useGetTeamMembersQuery } from "@/app/store/api/teamApi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";
import React from "react";

const Page = () => {

    const { data: members, isLoading } = useGetTeamMembersQuery()

    return (
        <BodyWrapper className="p-5">
            <div>
                <div className="flex items-center mb-10 w-full justify-between">
                    <div>
                        <h2 className="text-xl font-semibold text-zinc-800">Team Members</h2>
                    </div>
                    <Button>
                        <User /> Add Member
                    </Button>
                </div>

                {isLoading ? (
                    <div className="mt-10 text-center">Loading...</div>
                ) : members?.length === 0 ? (
                    <div className="mt-10 text-center">No team members found</div>
                ) : (
                    members?.map((item, index) => (
                        <Card key={index} className="w-full mt-2">
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-12 w-12 rounded-lg">
                                        <AvatarImage className="object-cover" src={item.profileImage} alt={item.name} />
                                        <AvatarFallback className="rounded-lg">MT</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <CardTitle>{item.name}</CardTitle>
                                        <CardDescription className="mt-1">{item.email}</CardDescription>
                                    </div>
                                </div>
                                <CardAction>
                                    <Badge variant="outline">
                                        <User />
                                        {item.role}
                                    </Badge>
                                </CardAction>
                            </CardHeader>
                        </Card>
                    ))
                )}
            </div>
        </BodyWrapper>
    );
};

export default Page;