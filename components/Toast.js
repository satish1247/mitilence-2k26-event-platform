"use client";

import { useEffect } from "react";

export default function Toast({ message, type = "success", onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 4000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const styles = {
        success: "border-green-500/50 text-green-400 bg-surface",
        error: "border-red-500/50 text-red-400 bg-surface",
        info: "border-accent/50 text-accent bg-surface",
    };

    const icons = {
        success: "✓",
        error: "✕",
        info: "ℹ",
    };

    return (
        <div className="fixed bottom-6 right-6 z-[200] animate-fade-in-up">
            <div className={`flex items-center gap-3 rounded-lg border-l-4 px-5 py-3 shadow-2xl ${styles[type]} border shadow-black/50`}>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/5 text-[10px] font-bold">
                    {icons[type]}
                </span>
                <p className="text-sm font-medium">{message}</p>
                <button onClick={onClose} className="ml-2 text-text-muted hover:text-text-main">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
