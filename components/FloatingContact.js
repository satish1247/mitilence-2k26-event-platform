"use client";

import { useState } from "react";
import { CONTACT_INFO } from "@/lib/constants";

export default function FloatingContact() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-[60]">
            {/* Modal */}
            {isOpen && (
                <div className="absolute bottom-16 right-0 w-72 overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl animate-fade-in-up">
                    <div className="bg-accent p-4 text-center">
                        <p className="text-[10px] font-black uppercase tracking-widest text-white">Need Help? Contact Us</p>
                    </div>
                    <div className="p-4 space-y-3">
                        <a
                            href={`tel:${CONTACT_INFO.staff.phone.replace(/\s/g, '')}`}
                            className="flex flex-col rounded-xl border border-border bg-elevated/20 p-3 hover:border-accent transition-colors"
                        >
                            <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest">Call Staff Coordinator</span>
                            <span className="text-xs font-bold text-text-main mt-0.5">{CONTACT_INFO.staff.name}</span>
                        </a>
                        <a
                            href={`tel:${CONTACT_INFO.student.phone}`}
                            className="flex flex-col rounded-xl border border-border bg-elevated/20 p-3 hover:border-accent transition-colors"
                        >
                            <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest">Call Student Coordinator</span>
                            <span className="text-xs font-bold text-text-main mt-0.5">{CONTACT_INFO.student.name}</span>
                        </a>
                        <a
                            href={`mailto:${CONTACT_INFO.webManager.email}`}
                            className="flex flex-col rounded-xl border border-border bg-elevated/20 p-3 hover:border-accent transition-colors"
                        >
                            <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest">Email Web Manager</span>
                            <span className="text-xs font-bold text-text-main mt-0.5">Report Technical Issues</span>
                        </a>
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex h-14 w-14 items-center justify-center rounded-full shadow-xl transition-all hover:scale-110 active:scale-95 ${isOpen ? "bg-accent text-white rotate-45" : "bg-accent text-white"
                    }`}
            >
                {isOpen ? (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <div className="flex flex-col items-center">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    </div>
                )}
            </button>
        </div>
    );
}
