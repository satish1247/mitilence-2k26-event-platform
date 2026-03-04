"use client";

import { useState, useEffect } from "react";
import { getGalleryItems, addGalleryItem, deleteGalleryItem } from "@/lib/firestore";
import { useAuth } from "@/lib/AuthContext";

export default function GalleryTab() {
    const { user } = useAuth();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedYear, setSelectedYear] = useState(2026);
    const [uploading, setUploading] = useState(false);

    const [showAddForm, setShowAddForm] = useState(false);
    const [formData, setFormData] = useState({
        year: 2026,
        type: "photo",
        imageUrl: "",
        videoUrl: "",
        eventName: "",
        caption: ""
    });
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        fetchGallery();
    }, [selectedYear]);

    async function fetchGallery() {
        setLoading(true);
        try {
            const data = await getGalleryItems(selectedYear);
            setItems(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFile && formData.type === "photo") {
            alert("Please select an image file.");
            return;
        }

        setUploading(true);
        try {
            let finalImageUrl = formData.imageUrl;

            if (selectedFile) {
                // Cloudinary Unsigned Upload
                const cloudName = "ds4gtcvnx";
                const uploadPreset = "gallery";

                const cloudFormData = new FormData();
                cloudFormData.append("file", selectedFile);
                cloudFormData.append("upload_preset", uploadPreset);

                const res = await fetch(
                    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                    {
                        method: "POST",
                        body: cloudFormData,
                    }
                );

                if (!res.ok) throw new Error("Cloudinary upload failed");
                const cloudData = await res.json();
                finalImageUrl = cloudData.secure_url;
            }

            await addGalleryItem({ ...formData, imageUrl: finalImageUrl }, user.uid);

            setShowAddForm(false);
            setFormData({
                year: 2026,
                type: "photo",
                imageUrl: "",
                videoUrl: "",
                eventName: "",
                caption: ""
            });
            setSelectedFile(null);
            await fetchGallery();
        } catch (error) {
            alert(error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (itemId) => {
        if (!window.confirm("Delete this gallery item?")) return;
        try {
            await deleteGalleryItem(itemId, user.uid);
            await fetchGallery();
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-text-main">Gallery Management</h2>
                    <p className="text-xs text-text-muted mt-1 uppercase tracking-widest font-bold">Manage highlights and archives</p>
                </div>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="btn-primary py-2.5 px-6 text-[10px] font-black uppercase tracking-widest"
                >
                    {showAddForm ? "Cancel" : "Add New Item"}
                </button>
            </div>

            {showAddForm && (
                <form onSubmit={handleSubmit} className="bg-surface/50 border border-border rounded-2xl p-8 space-y-6 animate-fade-in-down">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Item Year</label>
                            <select
                                value={formData.year}
                                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-xs outline-none focus:border-accent"
                            >
                                <option value={2026}>2026 (Live)</option>
                                <option value={2025}>2025 (Archive)</option>
                                <option value={2024}>2024 (Archive)</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Media Type</label>
                            <div className="flex gap-2 p-1 bg-background border border-border rounded-xl">
                                {["photo", "video"].map(t => (
                                    <button
                                        key={t}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, type: t })}
                                        className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${formData.type === t ? "bg-accent text-white shadow-md shadow-accent/20" : "text-text-muted"
                                            }`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Event Name</label>
                            <input
                                type="text"
                                value={formData.eventName}
                                onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                                placeholder="e.g. Robo Race"
                                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-xs outline-none focus:border-accent"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">
                                {formData.type === "video" ? "Thumbnail Image" : "Select Image"}
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs outline-none focus:border-accent file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-accent/10 file:text-accent hover:file:bg-accent/20 cursor-pointer"
                                required={formData.type === "photo"}
                            />
                            {selectedFile && (
                                <p className="text-[9px] text-accent font-bold uppercase mt-1">✓ {selectedFile.name}</p>
                            )}
                        </div>
                        {formData.type === "video" && (
                            <div className="space-y-1.5 animate-fade-in-up">
                                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Video URL (YouTube/Drive)</label>
                                <input
                                    type="url"
                                    value={formData.videoUrl}
                                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                                    placeholder="https://..."
                                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-xs outline-none focus:border-accent"
                                    required
                                />
                            </div>
                        )}
                        <div className={`space-y-1.5 ${formData.type === 'photo' ? 'sm:col-span-2' : ''}`}>
                            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Caption</label>
                            <input
                                type="text"
                                value={formData.caption}
                                onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                                placeholder="e.g. Finals Heat 1"
                                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-xs outline-none focus:border-accent"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={uploading}
                        className={`btn-primary w-full py-4 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-3 ${uploading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {uploading ? (
                            <>
                                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                🛰️ Uploading to Space...
                            </>
                        ) : (
                            "🚀 Publish to Website"
                        )}
                    </button>
                </form>
            )}

            <div className="space-y-6">
                <div className="flex gap-4">
                    {[2026, 2025, 2024].map(y => (
                        <button
                            key={y}
                            onClick={() => setSelectedYear(y)}
                            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${selectedYear === y ? "bg-accent text-white border-accent shadow-lg shadow-accent/20" : "bg-surface border-border text-text-muted"
                                }`}
                        >
                            {y}
                        </button>
                    ))}
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {loading ? (
                        [1, 2, 3].map(i => <div key={i} className="aspect-video rounded-2xl bg-surface animate-pulse" />)
                    ) : items.length === 0 ? (
                        <div className="col-span-full py-20 text-center border-2 border-dashed border-border rounded-3xl">
                            <p className="text-xs font-bold uppercase tracking-widest text-text-muted">No items found for {selectedYear}</p>
                        </div>
                    ) : items.map((item) => (
                        <div key={item.id} className="group relative aspect-video rounded-2xl border border-border bg-surface overflow-hidden">
                            <img
                                src={item.imageUrl || item.imageURL || "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&auto=format&fit=crop&q=60"}
                                alt={item.caption}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&auto=format&fit=crop&q=60"; }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-5">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] font-black text-accent uppercase tracking-tighter">{item.eventName}</p>
                                        <p className="text-xs font-bold text-white truncate max-w-[200px]">{item.caption}</p>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="h-8 w-8 rounded-lg bg-red-600/20 text-red-500 border border-red-500/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 hover:text-white"
                                    >
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <span className="absolute top-3 left-3 px-2 py-1 rounded bg-black/60 backdrop-blur-md text-[8px] font-black uppercase text-white tracking-[0.2em]">
                                {item.type}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
