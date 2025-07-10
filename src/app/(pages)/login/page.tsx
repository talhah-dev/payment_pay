"use client"
import axios from "axios";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa"
import { toast } from "react-toastify";
import img from "../../../Assets/login.jpg"
import Image from "next/image";

const Page = () => {

    const router = useRouter()

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const loginHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        const { email, password } = formData;

        if (!email.trim() || !password.trim()) {
            return toast.error("All fields are required!");
        }

        try {
            const res = await axios.post("/api/auth/login", formData, {
                withCredentials: true, // Important for cookies
            });

            toast.success(res.data.message);
            router.push("/dashboard");
        } catch {
            toast.error("Login failed");
        }
    };


    return (
        <div>
            <div className="w-full flex ">
                <div className="max-w-1/2 bg-[url(/login.jpg)] lg:block hidden min-h-screen bg-no-repeat bg-center bg-cover relative bg-[#18181b] w-full">
                <Image src={img} alt="img" className="absolute w-full h-hull top-0 left-0 h-screen object-cover"/>
                    <div className="min-h-screen relative z-20 hidden w-full p-5 lg:flex flex-col justify-between">
                        <Link href={"/"} className="text-white font-medium">
                            Payment Pay
                        </Link>
                        <p className="text-zinc-300">Our goal is to give businesses peace of mind and allow them to concentrate on their primary business operations by offering continuous support and maintenance.
                        </p>
                    </div>
                </div>
                <div onSubmit={loginHandler} className="lg:max-w-1/2 relative w-full bg-[#e5e5e6] min-h-screen flex items-center justify-center p-5">
                    <Link href={"/signup"} className=" text-zinc-800 absolute md:top-8 top-5 md:right-8 right-5">Sign up</Link>
                    <form className="text-center max-w-sm w-full">
                        <h2 className="text-zinc-800 font-medium text-2xl capitalize">Login</h2>
                        <p className="text-zinc-800 mt-1">Enter your detail below to login your account</p>
                        <input value={formData.email} name="email" onChange={handleChange} type="email" placeholder="name@gmail.com" className="border placeholder:text-sm outline-zinc-500 mt-2 rounded-lg border-zinc-400 w-full px-3 py-2" />
                        <input value={formData.password} name="password" onChange={handleChange} type="password" placeholder="password" className="border placeholder:text-sm outline-zinc-500 mt-2 rounded-lg border-zinc-400 w-full px-3 py-2" />
                        <button className="bg-[#18181b] w-full p-2.5 mt-2 transition-all duration-500 hover:opacity-80 cursor-pointer text-center text-zinc-100 rounded-lg ">
                            Login
                        </button>

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

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Page