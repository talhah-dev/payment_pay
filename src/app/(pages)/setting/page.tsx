"use client";
import BodyWrapper from "@/app/BodyWrapper";
import { useLogoutMutation } from "@/app/store/api/authApi";
import { useGetProfileQuery, useUpdateProfileMutation } from "@/app/store/api/userApi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { Camera } from "lucide-react"; // Import an icon for the upload button

const Page = () => {
  const router = useRouter();
  const { data: payload, isLoading: isProfileLoading } = useGetProfileQuery();
  const [logout, { isLoading: isLogoutLoading }] = useLogoutMutation();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Trigger file input click
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Handle image upload
  const handleImageUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (data.secure_url) {
        // Update profile with new image URL
        await updateProfile({ profileImage: data.secure_url }).unwrap();
        setFile(null); // Reset file input
      }
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isProfileLoading) {
    return <BodyWrapper className="p-5">Loading profile...</BodyWrapper>;
  }

  if (!payload) {
    return <BodyWrapper className="p-5">Error loading profile</BodyWrapper>;
  }

  return (
    <BodyWrapper className="p-5">
      <div className="flex w-full max-w-2xl flex-col gap-6">
        <Tabs defaultValue="account">   
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
            </TabsList>
            <Button
              onClick={handleLogout}
              disabled={isLogoutLoading}
              variant="destructive"
              className="cursor-pointer"
            >
              Logout
            </Button>
          </div>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>Make changes to your account here.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="relative">
                  <Avatar className="md:h-40 h-20 md:w-40 w-20">
                    <AvatarImage
                      className="md:h-40 object-cover h-20 md:w-40 w-20"
                      src={payload.profileImage}
                      alt={payload.name || "User Profile"}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute bottom-0 right-0 rounded-full"
                    onClick={handleButtonClick}
                    disabled={isUpdating}
                  >
                    <Camera className="h-5 w-5" />
                  </Button>
                  <Input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
                {file && (
                  <Button
                    onClick={handleImageUpload}
                    disabled={isUpdating}
                    className="w-fit"
                  >
                    {isUpdating ? "Uploading..." : "Upload Image"}
                  </Button>
                )}
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-username">Username</Label>
                  <Input id="tabs-demo-username" readOnly defaultValue={payload.name} />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-email">Email</Label>
                  <Input id="tabs-demo-email" readOnly defaultValue={payload.email} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </BodyWrapper>
  );
};

export default Page;