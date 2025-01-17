"use client";

import logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import UserButton from "./user-button";

export default function Navbar() {

    return (
        <header className="shadow-sm border-b relative">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 p-3">
                <Link href="/resumes" className="flex items-center gap-2">
                    <Image
                        src={logo}
                        alt="Logo"
                        width={35}
                        height={35}
                        className="rounded-full"
                    />
                    <span className="text-xl font-bold tracking-tight">
                        AI Resume Builder
                    </span>
                </Link>
                <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <UserButton />
                </div>
            </div>
        </header>
    );
}
