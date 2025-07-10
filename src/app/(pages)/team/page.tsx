"use client";
import BodyWrapper from "@/app/BodyWrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { User } from "lucide-react";
import React, { useEffect, useState } from "react";

interface UserProps {
    name: string;
    email: string;
    role: string;
    profileImage: string;
}

const Page = () => {
    const [payload, setPayload] = useState<UserProps[]>([]);
    const [loading, setLoading] = useState(true);

    const profileApi = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/users");
            setPayload(response.data.users);
        } catch (error) {
            console.error("Error fetching profile:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        profileApi();
    }, []);

    return (
        <BodyWrapper className="p-5">
            <div>
                <div className="flex items-center w-full justify-between">
                    <div>
                        <h2 className="text-xl font-semibold text-zinc-800">Team Members</h2>
                    </div>
                    <Button>
                        <User /> Add Member
                    </Button>
                </div>

                {loading ? (
                    <div className="mt-10 text-center">Loading...</div>
                ) : payload.length === 0 ? (
                    <div className="mt-10 text-center">No team members found</div>
                ) : (
                    payload.map((item, index) => (
                        <Card key={index} className="w-full mt-10">
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-12 w-12 rounded-lg">
                                        <AvatarImage src={item.profileImage} alt={item.name} />
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