"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function EventCard({ event }) {
    const isTechnical = event.category === "Technical";

    return (
        <Link
            href={`/events/${event.id}`}
            className="group relative overflow-hidden rounded-[2.5rem] bg-[#111118] border border-white/5 transition-all duration-500 hover:border-[#7B61FF]/30 hover:-translate-y-2 block h-full"
        >
            <div className="p-8 h-full flex flex-col justify-between relative z-10">
                <div>
                    <div className="flex justify-between items-start mb-6">
                        <span className={`px-3 py-1 text-[10px] uppercase font-bold tracking-widest rounded-full font-mono ${isTechnical ? 'bg-[#7B61FF]/10 text-[#7B61FF] border border-[#7B61FF]/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                            {event.category}
                        </span>
                        <span className="text-2xl opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                            {event.icon || "🏆"}
                        </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 font-sans group-hover:text-[#7B61FF] transition-colors">{event.name}</h3>
                    <p className="text-sm text-[#E8E8EB]/60 line-clamp-3 mb-6 font-light leading-relaxed">{event.description}</p>
                </div>

                <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                    <div className="flex flex-col gap-1 text-xs text-[#E8E8EB]/50 font-mono">
                        <span>TEAM: {event.teamSizeMin}-{event.teamSizeMax}</span>
                        <span className={event.fee === 0 ? "text-emerald-400 font-bold" : "text-[#7B61FF] font-bold"}>
                            {event.fee === 0 ? "FEE: FREE ENTRY" : `FEE: ₹${event.fee}`}
                        </span>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <span className={`px-2 py-0.5 text-[10px] uppercase font-bold tracking-widest rounded-full font-mono ${event.status === "Open" ? "text-emerald-400 bg-emerald-500/10" : "text-red-400 bg-red-500/10"}`}>
                            {event.status}
                        </span>
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 text-white transition-all duration-300 group-hover:bg-[#7B61FF] group-hover:text-white">
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Hover Gradient Effect */}
            <div className="absolute -inset-0 bg-gradient-to-br from-[#7B61FF]/0 via-transparent to-[#7B61FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-0 pointer-events-none"></div>
        </Link>
    );
}
