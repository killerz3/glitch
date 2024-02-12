"use client";
import React from "react";
import { Button } from "@/components/Button";
import { signIn, useSession } from "next-auth/react";
import Timer from "./Timer";
import Timer2  from "../components/Timer"
import { useRouter } from "next/navigation";
import SignInButton from "./signinButton";
import { motion } from "framer-motion";

function Page() {
  const { data: session } = useSession();
  const router = useRouter();
  if (session?.user) router.replace("/Home");

  return (
    
    <div className="flex min-h-full min-w-full flex-col-reverse items-center justify-between md:flex-row">
      <motion.div
        className=" mx-20 mt-[10%] p-3 px-20 md:ml-20 md:mr-60"
        initial={{ opacity: 0, x: -120 }}
        animate={{ opacity: 100, x: 0 }}
        transition={{ duration: 1.5 }}
      >
        <div className="p-2 text-7xl font-bold text-slate-300 ">Welcome</div>

        <div className="mr-10 p-2">
        Hey there Llama user! Are you ready to tackle the day and make the most of your time with Llama by your side? Remember, Llama is here to help you stay on top of your tasks and make productivity a breeze.Just take it one step at a time, and before you know it, you'll have accomplished more than you thought possible Keep pushing forward and stay motivated together, you and Llama are capable of achieving amazing things!

        </div>

        <div className="p-2">
          <SignInButton />
        </div>
      </motion.div>
      <motion.div
        className=" mx-24 mr-36 mt-20 p-5"
        initial={{ opacity: 0, x: 120 }}
        animate={{ opacity: 100, x: 0 }}
        transition={{ duration: 1.5 }}
      >
        <Timer />
        {/* <Timer2/> */}
      </motion.div>
    </div>
  );
}

export default Page;
