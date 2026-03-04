"use client";

import { useState } from "react";

export default function DisqualificationModal({ registration, onConfirm, onClose }) {
    const [reason, setReason] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!reason.trim()) return;

        setLoading(true);
        try {
            await onConfirm(reason);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-background/60 backdrop-blur-sm">
            <div className="w-full max-w-md bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
                <div className="p-6 border-b border-border bg-red-500/10">
                    <h3 className="text-sm font-black uppercase tracking-widest text-red-500">🚨 Disqualify Team</h3>
                    <p className="text-[10px] text-red-400/80 uppercase font-bold mt-1">
                        Team: {registration.teamName} • Event: {registration.eventName}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Reason for Disqualification *</label>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="e.g. Use of hacks or modded clients"
                            className="w-full h-32 rounded-lg border border-border bg-background px-4 py-3 text-sm text-text-main focus:border-red-500 outline-none resize-none"
                            required
                        />
                    </div>

                    <div className="bg-elevated/20 rounded-xl p-4 border border-border">
                        <p className="text-[10px] text-text-muted leading-relaxed italic">
                            A disqualification is permanent and will be logged with your admin ID. This action cannot be easily undone.
                        </p>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn-secondary flex-1 py-3 text-xs font-bold uppercase tracking-widest"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading || !reason.trim()}
                            className="btn-primary flex-1 py-3 bg-red-600 hover:bg-red-700 border-red-600 text-xs font-black uppercase tracking-widest disabled:opacity-50"
                        >
                            {loading ? "Processing..." : "Confirm"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
