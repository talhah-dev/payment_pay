"use client";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FaGoogle } from "react-icons/fa";

const Page = () => {
    const router = useRouter();

    const [step, setStep] = useState<"form" | "otp">("form");
    const [otpCode, setOtpCode] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSendEmail = async () => {

        if (/[^a-zA-Z0-9]/.test(formData.name)) {
            return toast.error("Name cannot contain spaces or special characters.");
        }

        if (formData.password !== formData.confirmPassword) {
            return toast.error("Password doesn't match")
        }

        const role = "user";
        const profileImage = "https://res.cloudinary.com/deo5ex1zo/image/upload/v1752111133/man_cv8qdh.jpg";

        const payload = {
            ...formData,
            profileImage,
            role
        };


        try {
            const res = await axios.post("/api/auth/signup", payload);
            toast.success(res.data.message);
            setStep("otp");
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to register");
        }
    };

    const handleVerifyOTP = async () => {
        try {
            const res = await axios.post("/api/auth/verify", {
                code: otpCode,
            }, { withCredentials: true });
            toast.success(res.data.message);
            router.push("/login");
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Invalid Code");
        }
    };

    return (
        <div className="w-full flex">
            <div className="max-w-1/2 bg-[url(/login.jpg)] lg:block hidden min-h-screen bg-no-repeat bg-center bg-cover relative bg-[#18181b] w-full">
                <div className="min-h-screen hidden w-full p-5 lg:flex flex-col justify-between">
                    <Link href={"/"} className="text-white font-medium">
                        Payment Pay
                    </Link>
                    <p className="text-zinc-300">Our goal is to give businesses peace of mind and allow them to concentrate on their primary business operations by offering continuous support and maintenance.
                    </p>
                </div>
            </div>
            <div className="lg:max-w-1/2 relative w-full bg-[#e5e5e6] min-h-screen flex items-center justify-center p-5">
                <Link
                    href={"/login"}
                    className="text-zinc-800 absolute md:top-8 top-5 md:right-8 right-5"
                >
                    Log In
                </Link>

                <div className="text-center max-w-sm w-full">
                    <h2 className="text-zinc-800 font-medium text-2xl capitalize">
                        {step === "form" ? "Create an account" : "Verify your email"}
                    </h2>
                    <p className="text-zinc-800 mt-1">
                        {step === "form"
                            ? "Enter your detail below to create your account"
                            : "We sent a 6-digit code to your email"}
                    </p>

                    {step === "form" ? (
                        <>
                            <input
                                type="text"
                                name="name"
                                placeholder="Username"
                                value={formData.name}
                                onChange={handleChange}
                                className="border placeholder:text-sm outline-zinc-500 mt-5 rounded-lg border-zinc-400 w-full px-3 py-2"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="name@gmail.com"
                                value={formData.email}
                                onChange={handleChange}
                                className="border placeholder:text-sm outline-zinc-500 mt-2 rounded-lg border-zinc-400 w-full px-3 py-2"
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="border placeholder:text-sm outline-zinc-500 mt-2 rounded-lg border-zinc-400 w-full px-3 py-2"
                            />
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="border placeholder:text-sm outline-zinc-500 mt-2 rounded-lg border-zinc-400 w-full px-3 py-2"
                            />
                            <button
                                onClick={handleSendEmail}
                                className="bg-[#18181b] w-full p-2.5 mt-2 transition-all duration-500 hover:opacity-80 cursor-pointer text-center text-zinc-100 rounded-lg"
                            >
                                Send Email
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="flex justify-center mt-6 mb-4">
                                <InputOTP
                                    maxLength={6}
                                    value={otpCode}
                                    onChange={(value) => setOtpCode(value)}
                                >
                                    <InputOTPGroup className="">
                                        <InputOTPSlot className="border border-zinc-400" index={0} />
                                        <InputOTPSlot className="border border-zinc-400" index={1} />
                                        <InputOTPSlot className="border border-zinc-400" index={2} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot className="border border-zinc-400" index={3} />
                                        <InputOTPSlot className="border border-zinc-400" index={4} />
                                        <InputOTPSlot className="border border-zinc-400" index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </div>
                            <button
                                onClick={handleVerifyOTP}
                                className="bg-[#18181b] w-full p-2.5 mt-2 transition-all duration-500 hover:opacity-80 cursor-pointer text-center text-zinc-100 rounded-lg"
                            >
                                Verify
                            </button>
                        </>
                    )}
                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-grow h-px bg-gray-300" />
                        <span className="text-[#71717a] text-sm">OR CONTINUE WITH</span>
                        <div className="flex-grow h-px bg-gray-300" />
                    </div>

                    <button className=" w-full p-2.5 flex items-center gap-2 justify-center transition-all duration-500 hover:opacity-70 cursor-pointer text-center font-medium text-zinc-700 border border-zinc-300 rounded-lg ">
                        <FaGoogle />
                        Google
                    </button>
                    <p className="text-sm text-zinc-500 mt-3">By clicking continue, you agree to our <Link href={"#"} className="underline">Terms of Service</Link> and <Link href={"#"} className="underline">Privacy Policy</Link> .</p>
                </div>
            </div>
        </div>
    );
};

export default Page;
