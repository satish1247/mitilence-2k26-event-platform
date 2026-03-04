"use client";

import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { MoveRight, Menu, X } from "lucide-react";

export default function Navbar() {
    const { user, logout, isAdmin } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const navRef = useRef(null);

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/events", label: "Events" },
        { href: "/gallery", label: "Gallery" },
        { href: "/contact", label: "Contact" },
    ];

    if (user) {
        navLinks.push({ href: "/dashboard", label: "Dashboard" });
        if (isAdmin) {
            navLinks.push({ href: "/admin", label: "Admin" });
        }
    }

    const isActive = (path) => pathname === path;

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                navRef.current?.classList.add("bg-[#0A0A14]/80", "backdrop-blur-xl", "border-white/10");
                navRef.current?.classList.remove("border-transparent");
            } else {
                navRef.current?.classList.remove("bg-[#0A0A14]/80", "backdrop-blur-xl", "border-white/10");
                navRef.current?.classList.add("border-transparent");
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav ref={navRef} className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex w-[95%] max-w-7xl flex-col rounded-[2rem] border border-transparent transition-all duration-500 bg-[#0A0A14]/80 backdrop-blur-xl border-white/10">
            <div className="flex items-center justify-between px-6 py-3 w-full">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 text-white font-sans">
                    <span className="font-extrabold tracking-tight text-lg">MITILENCE</span>
                    <span className="text-xs font-medium text-[#7B61FF] bg-[#7B61FF]/10 px-2 py-0.5 rounded-full font-mono">2K26</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex md:items-center md:gap-8 font-sans">
                    <div className="flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm font-medium transition-colors duration-300 transform hover:-translate-y-[1px] ${isActive(link.href) ? "text-white" : "text-[#E8E8EB]/70 hover:text-white"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="h-4 w-[1px] bg-white/10 mx-2" />

                    <div className="flex items-center gap-4">
                        {user ? (
                            <button
                                onClick={logout}
                                className="text-sm font-bold text-[#E8E8EB]/70 transition-colors hover:text-red-400"
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="text-sm font-bold text-[#E8E8EB]/70 transition-colors hover:text-white"
                                >
                                    Login
                                </Link>
                                <Link href="/register" className="group relative overflow-hidden rounded-full bg-[#7B61FF] px-6 py-2 text-sm font-bold text-white transition-transform hover:scale-[1.03]">
                                    <span className="relative z-10 flex items-center gap-2">
                                        Register
                                    </span>
                                    <span className="absolute inset-0 z-0 bg-white/20 translate-y-full transition-transform duration-300 group-hover:translate-y-0"></span>
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="inline-flex items-center justify-center p-2 text-[#E8E8EB]/70 hover:text-white transition-colors"
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="border-t border-white/10 md:hidden pb-4 px-4 pt-2">
                    <div className="flex flex-col gap-2 font-sans text-sm">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`block rounded-[1rem] px-4 py-3 font-medium transition-colors ${isActive(link.href) ? "bg-[#7B61FF]/10 text-[#7B61FF]" : "text-[#E8E8EB]/70 hover:bg-white/5 hover:text-white"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}

                        <div className="mt-2 pt-2 border-t border-white/10 flex flex-col gap-2">
                            {user ? (
                                <button
                                    onClick={() => {
                                        logout();
                                        setIsOpen(false);
                                    }}
                                    className="block w-full text-left rounded-[1rem] px-4 py-3 font-bold text-red-400 hover:bg-red-500/10 transition-colors"
                                >
                                    Logout
                                </button>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        onClick={() => setIsOpen(false)}
                                        className="block rounded-[1rem] px-4 py-3 font-bold text-[#E8E8EB]/70 hover:bg-white/5 hover:text-white transition-colors"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/register"
                                        onClick={() => setIsOpen(false)}
                                        className="group relative overflow-hidden rounded-[1rem] bg-[#7B61FF] px-4 py-3 text-center font-bold text-white mt-2"
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            Register <MoveRight className="w-4 h-4" />
                                        </span>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
