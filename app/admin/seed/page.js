"use client";

import { useState } from "react";
import { EVENTS } from "@/lib/constants";
import { seedEvents } from "@/lib/firestore";
import { useAuth } from "@/lib/AuthContext";
import { AdminRoute } from "@/components/ProtectedRoute";
import Toast from "@/components/Toast";

function SeedContent() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);

    const handleSeed = async () => {
        setLoading(true);
        try {
            await seedEvents(EVENTS);
            setToast({ message: "Events synced successfully!", type: "success" });
        } catch (err) {
            setToast({ message: "Failed to sync: " + err.message, type: "error" });
        } finally {
            setLoading(false);
        }
    };

    const handleCleanup = async () => {
        if (!confirm("This will remove 'roboatics' and sync all other events. Continue?")) return;
        setLoading(true);
        try {
            const { deleteEvent } = await import("@/lib/firestore");
            await deleteEvent("roboatics", user?.uid);
            await seedEvents(EVENTS);
            setToast({ message: "Cleanup and Re-Sync successful!", type: "success" });
        } catch (err) {
            setToast({ message: "Cleanup failed: " + err.message, type: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12">
            <div className="max-w-2xl w-full mx-auto px-4">
                <div className="rounded-2xl border border-white/5 bg-[#141414] p-10 text-center shadow-2xl">
                    <span className="text-6xl mb-6 block font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                        MITILENCE 2K26
                    </span>
                    <h1 className="text-2xl font-black text-white mb-4 tracking-tight uppercase">System Management</h1>
                    <p className="text-sm text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
                        Update the event database and clean up removed content. This will synchronize Firestore with the latest code-defined events.
                    </p>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <button
                            onClick={handleSeed}
                            disabled={loading}
                            className="rounded-xl border border-white/10 bg-white/5 py-4 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-white/10 disabled:opacity-50"
                        >
                            {loading ? "Syncing..." : "Sync Events"}
                        </button>
                        <button
                            onClick={handleCleanup}
                            disabled={loading}
                            className="rounded-xl bg-gradient-to-r from-red-500 to-orange-600 py-4 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-red-500/20 transition-all hover:shadow-red-500/40 disabled:opacity-50"
                        >
                            {loading ? "Cleaning..." : "Cleanup & Re-Sync"}
                        </button>
                    </div>
                </div>
            </div>
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        </div>
    );
}

export default function SeedPage() {
    return (
        <AdminRoute>
            <SeedContent />
        </AdminRoute>
    );
}
