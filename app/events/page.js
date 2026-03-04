"use client";

import { useState } from "react";
import EventCard from "@/components/EventCard";
import { EVENTS } from "@/lib/constants";

export default function EventsListingPage() {
    const [filter, setFilter] = useState("All");

    const filteredEvents = EVENTS.filter(
        (event) => filter === "All" || event.category === filter
    );

    return (
        <div className="min-h-screen py-32 bg-[#0A0A14] text-white">
            <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-24">
                {/* Header */}
                <div className="mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-sans">
                        Symposium <span className="text-[#7B61FF]">Events</span>
                    </h1>
                    <p className="text-[#E8E8EB]/60 max-w-2xl text-lg font-light leading-relaxed">
                        A comprehensive list of all 7 events. Test your engineering skills in our technical challenges or strategy in non-technical events. Ensure you review the guidelines before registration.
                    </p>
                </div>

                {/* Filter Controls */}
                <div className="mb-12 flex items-center gap-4 overflow-x-auto pb-4 sm:pb-0 border-b border-white/10 no-scrollbar">
                    {["All", "Technical", "Non-Technical"].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`relative px-6 py-4 text-sm font-bold uppercase tracking-widest transition-colors font-mono whitespace-nowrap ${filter === cat ? "text-[#7B61FF]" : "text-[#E8E8EB]/50 hover:text-white"
                                }`}
                        >
                            {cat}
                            {filter === cat && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7B61FF] shadow-[0_0_10px_rgba(123,97,255,0.5)]" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Results Info */}
                <div className="mb-8">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#E8E8EB]/50 font-mono">
                        // Showing {filteredEvents.length} Active Records
                    </p>
                </div>

                {/* Grid */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredEvents.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>

                {/* Empty State */}
                {filteredEvents.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-32 text-center rounded-[3rem] border border-white/5 bg-[#111118]">
                        <span className="text-5xl mb-6 opacity-50 grayscale animate-pulse">📡</span>
                        <h3 className="text-2xl font-bold text-white mb-3 font-sans">No signal found.</h3>
                        <p className="text-[#E8E8EB]/50 text-sm max-w-md font-light">Adjust your filters parameters to locate symposium events.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
