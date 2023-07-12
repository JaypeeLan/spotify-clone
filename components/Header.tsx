"use client";
import React from "react";

import { HeaderProps } from "@/types";
import { useRouter } from "next/navigation";

import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/Bi";
import { FaUserAlt } from "react-icons/fa";

import { useUser } from "@/hooks/useUser";
import { twMerge } from "tailwind-merge";
import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "react-hot-toast";

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const AuthModal = useAuthModal();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    //reset any playing song
    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out");
    }
  };
  return (
    <div
      className={twMerge(
        `h-fit bg-gradient-to-b from-emerald-800 p-6`,
        className
      )}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        {/* hides on small screens */}
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={() => router.back()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretLeft size={35} className="text-white" />
          </button>

          <button
            onClick={() => router.forward()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretRight size={35} className="text-white" />
          </button>
        </div>
        {/* show on only smaller screens */}
        <div className="flex md:hidden gap-x-2 items-center">
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <HiHome size={20} className="text-black" />
          </button>
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <BiSearch size={20} className="text-black" />
          </button>
        </div>
        {/* ---------------------------- */}

        {/* sign in  and log in buttons */}
        <div className="flex justify-between items-center gap-x-4">
          {user ? (
            <div className="flex gap-x-4 items-center">
              <Button onClick={handleLogout} className="bg-white px-6 py-2">
                Log out
              </Button>
              <div>
                <Button
                  onClick={() => router.push("/account")}
                  className="bg-white"
                >
                  <FaUserAlt />
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={AuthModal.onOpen}
                  className="bg-transparent text-neutral-300 font-medium"
                >
                  {" "}
                  Sign Up{" "}
                </Button>
              </div>
              <div>
                <Button
                  onClick={AuthModal.onOpen}
                  className="bg-white px-6 py-2 "
                >
                  {" "}
                  Log In{" "}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
