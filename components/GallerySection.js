"use client";

import { useState, useEffect } from "react";
import { getGalleryItems } from "@/lib/firestore";
import GalleryLightbox from "./GalleryLightbox";
import { Play } from "lucide-react";

export default function GallerySection() {
    const years = [2026, 2025, 2024];
    const [selectedYear, setSelectedYear] = useState(2026);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        async function fetchGallery() {
            setLoading(true);
            try {
                const data = await getGalleryItems(selectedYear);
                setItems(data);
            } catch (error) {
                console.error("Error fetching gallery:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchGallery();
    }, [selectedYear]);

    const photos = items.filter(item => item.type === "photo");
    const videos = items.filter(item => item.type === "video");

    return (
        <section className="py-32 bg-[#0A0A14] text-white">
            <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-24">
                {/* Header */}
                <div className="text-center mb-20 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#7B61FF]/10 blur-[80px] rounded-full pointer-events-none"></div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 font-sans relative z-10">
                        Visual <span className="text-[#7B61FF]">Archives</span>
                    </h2>
                    <p className="text-[#E8E8EB]/60 max-w-2xl mx-auto text-lg font-light leading-relaxed relative z-10">
                        Access historical data logs and visual records from previous symposium iterations.
                    </p>
                </div>

                {/* Year Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-20 relative z-10">
                    {years.map(year => (
                        <button
                            key={year}
                            onClick={() => setSelectedYear(year)}
                            className={`px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all font-mono ${selectedYear === year
                                ? "bg-[#7B61FF] text-white shadow-[0_0_20px_rgba(123,97,255,0.3)] scale-105"
                                : "bg-[#111118] border border-white/10 text-[#E8E8EB]/50 hover:border-[#7B61FF]/50 hover:text-white"
                                }`}
                        >
                            Log {year}
                        </button>
                    ))}
                </div>

                {/* Section Content */}
                <div className="space-y-24 relative z-10">
                    <div>
                        <div className="mb-12 flex flex-col items-center sm:items-start text-center sm:text-left">
                            <h3 className="text-2xl font-bold text-white flex items-center gap-3 font-sans w-max">
                                <span className={`text-[10px] font-mono px-3 py-1 rounded-full border bg-opacity-10 ${selectedYear === 2026 ? "text-[#7B61FF] border-[#7B61FF]/20 bg-[#7B61FF]" : "text-emerald-400 border-emerald-500/20 bg-emerald-500"}`}>
                                    {selectedYear === 2026 ? "ACTIVE" : "ARCHIVED"}
                                </span>
                                MITILENCE {selectedYear}
                            </h3>
                            <p className="text-sm text-[#E8E8EB]/50 mt-4 font-mono uppercase tracking-widest">
                                {selectedYear === 2026
                                    ? "// Current cycle media assets."
                                    : "// Retrieved from cold storage."}
                            </p>
                        </div>

                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="aspect-video rounded-[2rem] bg-[#111118] border border-white/5 animate-pulse" />
                                ))}
                            </div>
                        ) : items.length === 0 ? (
                            <div className="text-center py-32 rounded-[3rem] border border-dashed border-white/20 bg-[#111118]/50">
                                <p className="text-[#E8E8EB]/50 font-mono uppercase tracking-[0.2em] text-xs">ERR: No visual records found for {selectedYear} cycle.</p>
                            </div>
                        ) : (
                            <div className="space-y-24">
                                {/* Photos Grid */}
                                {photos.length > 0 && (
                                    <div className="space-y-10">
                                        <div className="flex items-center gap-4">
                                            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#7B61FF] font-mono">Image Protocols</h4>
                                            <div className="h-px flex-1 bg-gradient-to-r from-[#7B61FF]/30 to-transparent"></div>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                            {photos.map(item => (
                                                <div
                                                    key={item.id}
                                                    className="group relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/10 bg-[#111118] cursor-pointer hover:border-[#7B61FF]/50 transition-colors"
                                                    onClick={() => setSelectedImage(item.imageUrl || item.imageURL)}
                                                >
                                                    <img
                                                        src={item.imageUrl || item.imageURL || "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&auto=format&fit=crop&q=60"}
                                                        alt={item.caption}
                                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:opacity-60"
                                                        onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&auto=format&fit=crop&q=60"; }}
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A14] via-[#0A0A14]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                                                        <p className="text-xs font-bold text-[#7B61FF] uppercase tracking-widest font-mono mb-2">{item.eventName}</p>
                                                        <p className="text-sm text-white font-sans leading-relaxed">{item.caption}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Videos Grid */}
                                {videos.length > 0 && (
                                    <div className="space-y-10">
                                        <div className="flex items-center gap-4">
                                            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-400 font-mono">Motion Records</h4>
                                            <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/30 to-transparent"></div>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                                            {videos.map(item => (
                                                <div key={item.id} className="group space-y-5">
                                                    <div className="relative aspect-video overflow-hidden rounded-[2rem] border border-white/10 bg-[#111118] hover:border-emerald-500/50 transition-colors">
                                                        <img
                                                            src={item.imageUrl || item.imageURL || "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&auto=format&fit=crop&q=60"}
                                                            alt={item.caption}
                                                            className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-50 blur-0 group-hover:blur-sm"
                                                            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&auto=format&fit=crop&q=60"; }}
                                                        />
                                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-transparent transition-all">
                                                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-[#0A0A14] shadow-[0_0_30px_rgba(16,185,129,0.3)] scale-100 group-hover:scale-110 transition-transform">
                                                                <Play className="h-6 w-6 ml-1 fill-current" />
                                                            </div>
                                                        </div>
                                                        <a
                                                            href={item.videoUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="absolute inset-0 z-10"
                                                        />
                                                    </div>
                                                    <div className="px-4">
                                                        <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest font-mono mb-2">{item.eventName}</p>
                                                        <p className="text-sm text-[#E8E8EB]/70 font-sans leading-relaxed">{item.caption}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <GalleryLightbox
                image={selectedImage}
                onClose={() => setSelectedImage(null)}
            />
        </section>
    );
}
