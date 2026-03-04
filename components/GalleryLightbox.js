"use client";

import { useEffect } from "react";

export default function GalleryLightbox({ image, onClose }) {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };

        if (image) {
            document.body.style.overflow = "hidden";
            document.addEventListener("keydown", handleEsc);
        }

        return () => {
            document.body.style.overflow = "unset";
            document.removeEventListener("keydown", handleEsc);
        };
    }, [image, onClose]);

    if (!image) return null;

    return (
        <div
            className="fixed inset-0 bg-black/95 flex items-center justify-center z-[100] animate-fadeIn p-4 sm:p-8"
            onClick={onClose}
        >
            <div
                className="relative max-w-7xl w-full max-h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Transparent Click Area for closing */}
                <div className="absolute inset-0 -z-10" onClick={onClose} />

                {/* Action Bar (Top) */}
                <div className="absolute top-0 inset-x-0 flex items-center justify-between p-4 sm:p-6 z-10 pointer-events-none">
                    <a
                        href={`${image}?fl_attachment`}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="pointer-events-auto bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all border border-white/10 flex items-center gap-2 group"
                    >
                        <span className="group-hover:translate-y-0.5 transition-transform duration-300">📥</span>
                        Download
                    </a>

                    <button
                        onClick={onClose}
                        className="pointer-events-auto bg-white/10 hover:bg-white/20 backdrop-blur-md text-white h-11 w-11 rounded-xl text-lg flex items-center justify-center transition-all border border-white/10 group"
                    >
                        <span className="group-hover:rotate-90 transition-transform duration-300">✕</span>
                    </button>
                </div>

                {/* Main Image Viewport */}
                <div className="relative group/img max-w-full max-h-[85vh] sm:max-h-[90vh] rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
                    <img
                        src={image}
                        alt="Gallery High Res View"
                        className="w-full h-full object-contain pointer-events-none"
                    />
                </div>

                {/* Branding/Info Overlay (Bottom) */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none opacity-50">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">MITILENCE 2K26</p>
                </div>
            </div>
        </div>
    );
}
