"use client";
import BodyWrapper from "@/app/BodyWrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface ProfileProps {
    name: string;
    email: string;
    profileImage: string;
}

const Page = () => {
    const [payload, setPayload] = useState<ProfileProps | null>(null);
    const [loading, setLoading] = useState(true); // Add loading state

    const profileApi = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/user/profile");
            setPayload(response.data.profile);
        } catch (error) {
            console.error("Error fetching profile:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        profileApi();
    }, []);

    if (loading) {
        return <BodyWrapper className="p-5">Loading...</BodyWrapper>; // Show loading state
    }

    if (!payload) {
        return <BodyWrapper className="p-5">Error loading profile</BodyWrapper>; // Handle error case
    }

    return (
        <BodyWrapper className="p-5">
            <div>
                <div className="flex w-full max-w-s flex-col gap-6">
                    <Tabs defaultValue="account">
                        <TabsList>
                            <TabsTrigger value="account">Account</TabsTrigger>
                            <TabsTrigger value="password">Password</TabsTrigger>
                        </TabsList>
                        <TabsContent value="account">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Account</CardTitle>
                                    <CardDescription>
                                        Make changes to your account here. Click save when you're done.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="grid gap-6">
                                    <Avatar className="md:h-40 h-20 md:w-40 w-20">
                                        <AvatarImage
                                            className="md:h-40 h-20 md:w-40 w-20"
                                            src={payload.profileImage}
                                            alt={payload.name || "User Profile"}
                                        />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div className="grid gap-3">
                                        <Label htmlFor="tabs-demo-username">Username</Label>
                                        <Input
                                            id="tabs-demo-username"
                                            readOnly
                                            defaultValue={payload.name}
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="tabs-demo-email">Email</Label>
                                        <Input
                                            id="tabs-demo-email"
                                            readOnly
                                            defaultValue={payload.email}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="password">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Password</CardTitle>
                                    <CardDescription>
                                        Change your password here. After saving, you'll be logged out.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="grid gap-6">
                                    <div className="grid gap-3">
                                        <Label htmlFor="tabs-demo-current">Current password</Label>
                                        <Input id="tabs-demo-current" type="password" />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="tabs-demo-new">New password</Label>
                                        <Input id="tabs-demo-new" type="password" />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button>Change password</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </BodyWrapper>
    );
};

export default Page;