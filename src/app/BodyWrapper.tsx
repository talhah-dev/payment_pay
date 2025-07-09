"use client";
import { ReactNode, Suspense } from "react";
import Loader from "@/components/Loader";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

interface BodyWrapperProps {
    children: ReactNode;
    className: string
}

const BodyWrapper = ({ children, className }: BodyWrapperProps) => {

    return (
        <>
            <Loader />
            <Suspense fallback={<div />}>
                <div className="bg-[#e5e5e6]">
                    <SidebarProvider>
                        <AppSidebar />
                        <main className="w-full overflow-x-hidden">
                            <SidebarTrigger />
                            <div className={`${className}`}>
                                {children}
                            </div>
                        </main>
                    </SidebarProvider>
                </div>
            </Suspense>
        </>
    );
};

export default BodyWrapper;