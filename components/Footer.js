"use client";

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-border bg-background py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="col-span-full lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7B61FF] font-bold text-white text-sm">
                                M
                            </div>
                            <span className="text-xl font-bold tracking-tight text-white">
                                MITILENCE 2K26
                            </span>
                        </Link>
                        <p className="max-w-md text-sm text-[#E8E8EB]/60 leading-relaxed font-sans">
                            A national-level technical symposium organized by the Department of Robotics & Automation,
                            Manakula Vinayagar Institute of Technology.
                        </p>
                    </div>

                    <div>
                        <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-[#7B61FF] font-mono">Navigation</h4>
                        <ul className="space-y-2 text-sm text-[#E8E8EB]/60 font-sans">
                            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link href="/events" className="hover:text-white transition-colors">Events</Link></li>
                            <li><Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                            <li><Link href="/register" className="hover:text-[#7B61FF] transition-colors font-bold">Register Now</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-[#7B61FF] font-mono">Location</h4>
                        <div className="space-y-2 text-sm text-[#E8E8EB]/60 font-sans">
                            <p>Manakula Vinayagar Institute of Technology</p>
                            <p>Puducherry, India</p>
                            <p className="text-[#7B61FF] underline hover:text-white transition-colors font-mono">
                                hodra@vmit.edu.in
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 sm:flex-row">
                    <p className="text-[10px] text-[#E8E8EB]/40 font-mono tracking-widest uppercase">
                        © 2026 MITILENCE 2K26 • Department of Robotics & Automation • All rights reserved
                    </p>
                </div>
            </div>
        </footer>
    );
}
