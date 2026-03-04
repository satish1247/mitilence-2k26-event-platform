"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import RegistrationForm from "@/components/RegistrationForm";
import Toast from "@/components/Toast";
import Link from "next/link";
import { MoveLeft, MoveRight, Trophy, AlertTriangle } from "lucide-react";

export default function EventDetailClient({ event }) {
    const router = useRouter();
    const { user } = useAuth();
    const [showForm, setShowForm] = useState(false);
    const [toast, setToast] = useState(null);

    const handleRegister = () => {
        if (!user) {
            router.push("/login?redirect=/events/" + event.id);
            return;
        }
        setShowForm(true);
    };

    const handleRegistrationSuccess = () => {
        setShowForm(false);
        setToast({
            message: "Registration successful! Registration fee must be paid offline at the event venue on 14 March 2026.",
            type: "success",
        });
    };

    const isTechnical = event.category === "Technical";

    return (
        <div className="min-h-screen py-32 bg-[#0A0A14] text-white">
            <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-24">

                {/* Breadcrumb */}
                <nav className="mb-12 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E8E8EB]/50 font-mono">
                    <Link href="/events" className="hover:text-white transition-colors flex items-center gap-2">
                        <MoveLeft className="w-4 h-4" /> Events
                    </Link>
                    <span>/</span>
                    <span className="text-white">{event.name}</span>
                </nav>

                <div className="grid gap-16 lg:grid-cols-3">
                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-16">
                        <div className="space-y-6">
                            <span className={`inline-block px-3 py-1 text-[10px] uppercase font-bold tracking-widest rounded-full font-mono ${isTechnical ? 'bg-[#7B61FF]/10 text-[#7B61FF] border border-[#7B61FF]/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                                {event.category}
                            </span>
                            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-white font-sans">{event.name}</h1>
                            <p className="text-xl text-[#E8E8EB]/60 leading-relaxed font-light">
                                {event.description}
                            </p>
                        </div>

                        {/* Structured Sections */}
                        {event.sections && (
                            <div className="space-y-16 pt-12 border-t border-white/10">
                                {event.sections.map((section, idx) => (
                                    <div key={idx} className="space-y-6">
                                        <div className="flex items-center gap-4">
                                            <div className="h-px flex-1 bg-white/5" />
                                            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#7B61FF] font-mono whitespace-nowrap">
                                                // {section.title}
                                            </h3>
                                            <div className="h-px flex-1 bg-white/5" />
                                        </div>
                                        <ul className="grid gap-x-12 gap-y-4 sm:grid-cols-2">
                                            {section.items.map((item, i) => (
                                                <li key={i} className="flex gap-3 text-sm text-[#E8E8EB]/70 leading-relaxed font-light">
                                                    <span className="text-[#7B61FF] mt-1">▰</span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}

                                {/* Prizes Section */}
                                <div className="space-y-6 pt-12">
                                    <div className="flex items-center gap-4">
                                        <Trophy className="w-5 h-5 text-yellow-500" />
                                        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-500 font-mono">
                                            Reward Parameters
                                        </h3>
                                        <div className="h-px flex-1 bg-yellow-500/20" />
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="rounded-[1.5rem] border border-yellow-500/20 bg-yellow-500/5 p-6 text-center">
                                            <span className="text-3xl block mb-2 opacity-80">🥇</span>
                                            <span className="text-xs font-bold uppercase tracking-widest text-yellow-500">Tier 1</span>
                                        </div>
                                        <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 text-center">
                                            <span className="text-3xl block mb-2 opacity-80">🥈</span>
                                            <span className="text-xs font-bold uppercase tracking-widest text-[#E8E8EB]/70">Tier 2</span>
                                        </div>
                                        <div className="rounded-[1.5rem] border border-orange-500/20 bg-orange-500/5 p-6 text-center">
                                            <span className="text-3xl block mb-2 opacity-80">🥉</span>
                                            <span className="text-xs font-bold uppercase tracking-widest text-orange-400">Tier 3</span>
                                        </div>
                                    </div>
                                </div>

                                {/* General Instructions */}
                                <div className="space-y-6 pt-12">
                                    <div className="flex items-center gap-4">
                                        <AlertTriangle className="w-5 h-5 text-red-500" />
                                        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-red-500 font-mono">
                                            Strict Directives
                                        </h3>
                                        <div className="h-px flex-1 bg-red-500/20" />
                                    </div>
                                    <ul className="grid gap-x-12 gap-y-4 sm:grid-cols-2">
                                        <li className="flex gap-3 text-sm text-[#E8E8EB]/70 leading-relaxed font-light">
                                            <span className="text-red-500 mt-1">×</span>
                                            Valid institution ID required for entry check.
                                        </li>
                                        <li className="flex gap-3 text-sm text-[#E8E8EB]/70 leading-relaxed font-light">
                                            <span className="text-red-500 mt-1">×</span>
                                            T-minus 15 minutes reporting protocol.
                                        </li>
                                        <li className="flex gap-3 text-sm text-[#E8E8EB]/70 leading-relaxed font-light">
                                            <span className="text-red-500 mt-1">×</span>
                                            Unsportsmanlike actions trigger instant ban.
                                        </li>
                                        <li className="flex gap-3 text-sm text-[#E8E8EB]/70 leading-relaxed font-light">
                                            <span className="text-[#7B61FF] mt-1">▰</span>
                                            Adjudicator telemetry is absolute.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sticky Sidebar */}
                    <div className="space-y-6">
                        <div className="sticky top-32 rounded-[2.5rem] border border-white/10 bg-[#111118] p-8 md:p-10 shadow-2xl relative overflow-hidden">
                            {/* Glow */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#7B61FF]/10 blur-[50px] rounded-full pointer-events-none"></div>

                            <div className="space-y-8 relative z-10">
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#E8E8EB]/50 mb-2 font-mono">Entry Protocol</p>
                                    <div className="flex items-center gap-3 mb-1">
                                        <p className="text-5xl font-bold text-white font-sans tracking-tighter">
                                            {event.fee > 0 ? `₹${event.fee}` : "Free"}
                                        </p>
                                    </div>
                                    {event.fee > 0 && (
                                        <p className="text-xs text-[#E8E8EB]/50 font-light mt-2">Physical transaction required at nexus coordinates.</p>
                                    )}
                                </div>

                                <div className="space-y-4 border-y border-white/10 py-6">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-[#E8E8EB]/50 font-mono text-xs">TEAM CAPACITY</span>
                                        <span className="text-white font-bold font-sans tracking-wide">
                                            {event.teamSizeMin === event.teamSizeMax
                                                ? `Solo Unit`
                                                : `${event.teamSizeMin}–${event.teamSizeMax} Units`}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-[#E8E8EB]/50 font-mono text-xs">COORDINATES</span>
                                        <span className="text-white font-bold font-sans tracking-wide">{event.location}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-[#E8E8EB]/50 font-mono text-xs">SYSTEM CLOCK</span>
                                        <span className="text-white font-bold font-sans tracking-wide">14 Mar 2026</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-[#E8E8EB]/50 font-mono text-xs">PORT STATUS</span>
                                        <span className={`px-2 py-0.5 text-[10px] uppercase font-bold tracking-widest rounded-full font-mono ${event.status === "Open" ? "text-emerald-400 bg-emerald-500/10" : "text-red-400 bg-red-500/10"}`}>
                                            {event.status}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleRegister}
                                    className="group relative overflow-hidden w-full rounded-[1.5rem] bg-[#7B61FF] py-5 text-sm font-bold text-white transition-transform duration-300 hover:scale-[1.03] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
                                    disabled={event.status !== "Open"}
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2 font-sans tracking-wide">
                                        {event.status === "Open" ? (
                                            <>Initialize Registration <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></>
                                        ) : (
                                            "Port Closed"
                                        )}
                                    </span>
                                </button>

                                <div className="space-y-4 pt-4">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#E8E8EB]/50 mb-4 font-mono">System Administrators</p>
                                    <div className="space-y-4 bg-[#0A0A14] rounded-[1.5rem] border border-white/5 p-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-2 h-2 rounded-full bg-[#7B61FF]"></div>
                                            <div>
                                                <p className="text-sm font-bold text-white font-sans">{event.staffCoordinator}</p>
                                                <p className="text-[10px] text-[#E8E8EB]/50 uppercase font-bold tracking-wider font-mono">Staff Node</p>
                                            </div>
                                        </div>
                                        <div className="h-px w-full bg-white/5"></div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-2 h-2 rounded-full bg-[#4FD1C5]"></div>
                                            <div>
                                                <p className="text-sm font-bold text-white font-sans">{event.studentCoordinator}</p>
                                                <p className="text-[10px] text-[#E8E8EB]/50 uppercase font-bold tracking-wider font-mono">Student Node</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showForm && (
                <RegistrationForm
                    event={event}
                    onSuccess={handleRegistrationSuccess}
                    onClose={() => setShowForm(false)}
                />
            )}

            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
}
