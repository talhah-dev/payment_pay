"use client";

import { useEffect, useState } from "react";
const Loader = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handlePageLoad = () => {
            setIsLoading(false);
        };

        if (document.readyState === "complete") {
            handlePageLoad();
        } else {
            window.addEventListener("load", handlePageLoad);
            return () => window.removeEventListener("load", handlePageLoad);
        }
    }, []);

    return (
        <div className={`bg-black w-full h-screen fixed top-0 left-0 z-50 flex items-center justify-center ${isLoading ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
            <div className="flex-col gap-4 w-full flex items-center justify-center">
                <div
                    className="w-20 h-20 border-4 border-transparent text-[#fff] text-4xl animate-spin flex items-center justify-center border-t-[#fff] rounded-full"
                >
                    <div
                        className="w-16 h-16 border-4 border-transparent text-[#fff] text-2xl animate-spin flex items-center justify-center border-t-[#fff] rounded-full"
                    ></div>
                </div>
            </div>
        </div>
    )
}

export default Loader