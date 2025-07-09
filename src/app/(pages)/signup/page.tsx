import Link from "next/link"
import { FaGoogle } from "react-icons/fa"

const Page = () => {
    return (
        <div>
            <div className="w-full flex ">
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
                    <Link href={"/login"} className=" text-zinc-800 absolute md:top-8 top-5 md:right-8 right-5">Log In</Link>
                    <div className="text-center max-w-sm w-full">
                        <h2 className="text-zinc-800 font-medium text-2xl capitalize">Create an account</h2>
                        <p className="text-zinc-800 mt-1">Enter your detail below to create your account</p>
                        <input type="text" placeholder="username" className="border placeholder:text-sm outline-zinc-500 mt-5 rounded-lg border-zinc-400 w-full px-3 py-2" />
                        <input type="email" placeholder="name@gmail.com" className="border placeholder:text-sm outline-zinc-500 mt-2 rounded-lg border-zinc-400 w-full px-3 py-2" />
                        <input type="password" placeholder="Password" className="border placeholder:text-sm outline-zinc-500 mt-2 rounded-lg border-zinc-400 w-full px-3 py-2" />
                        <input type="password" placeholder="Confirm Password" className="border placeholder:text-sm outline-zinc-500 mt-2 rounded-lg border-zinc-400 w-full px-3 py-2" />
                        <button className="bg-[#18181b] w-full p-2.5 mt-2 transition-all duration-500 hover:opacity-80 cursor-pointer text-center text-zinc-100 rounded-lg ">
                            Sign In with Email
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

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page