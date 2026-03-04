"use client";

export default function Loader({ text = "Loading..." }) {
    return (
        <div className="flex min-h-[400px] w-full flex-col items-center justify-center gap-4">
            <div className="relative h-10 w-10">
                <div className="absolute inset-0 rounded-full border-2 border-border" />
                <div className="absolute inset-0 rounded-full border-t-2 border-accent animate-spin" />
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-text-muted animate-pulse">
                {text}
            </p>
        </div>
    );
}
