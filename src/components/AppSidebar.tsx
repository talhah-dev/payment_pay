"use client"
import { CreditCardIcon, History, Home, Inbox, Settings, Users } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import axios from "axios"
import { useGetProfileQuery } from "@/app/store/api/userApi"

// Menu items.
const items = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "Projects",
        url: "/project",
        icon: Inbox,
    },
    {
        title: "Payments",
        url: "/payment",
        icon: CreditCardIcon,
    },
    {
        title: "Team",
        url: "/team",
        icon: Users,
    },
    {
        title: "History",
        url: "/history",
        icon: History,
    },
    {
        title: "Settings",
        url: "/setting",
        icon: Settings,
    },
];


export function AppSidebar() {

    const pathname = usePathname()
    const { data: payload } = useGetProfileQuery()

    const visibleItems = items.filter((item) => {
        if (payload?.role === "admin") return true; // show all
        if (payload?.role === "user") {
            return item.title === "Team" || item.title === "Settings"; // only 2
        }
        return false; // in case of unknown role
    });


    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent className="mt-2">
                        <SidebarMenu>
                            {visibleItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link className={`${pathname === item.url && "bg-zinc-200"} px-4 py-5 hover:bg-zinc-200 transition-all duration-500`} href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <div className="flex items-center gap-2 px-4 py-5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={payload?.profileImage} className="object-cover" alt={payload?.name || "User Profile"} />
                    <AvatarFallback className="rounded-lg">MT</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{payload?.name || "Guest"}</span>
                    <span className="text-muted-foreground truncate text-xs">
                        {payload?.email || "No email"}
                    </span>
                </div>
            </div>

        </Sidebar>
    )
}