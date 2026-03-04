"use client";

import { useEffect, useState } from "react";
import { getAllRegistrations } from "@/lib/firestore";
import { EVENTS } from "@/lib/constants";

export default function StatsTab() {
    const [stats, setStats] = useState({
        total: 0,
        paid: 0,
        approved: 0,
        disqualified: 0,
        deleted: 0,
        eventBreakdown: {}
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const data = await getAllRegistrations();
                const s = {
                    total: data.filter(r => !r.isDeleted).length,
                    pendingApproval: data.filter(r => r.approvalStatus === "Pending Approval" && !r.isDeleted).length,
                    approved: data.filter(r => r.approvalStatus === "Approved" && !r.isDeleted).length,
                    checkedIn: data.filter(r => r.approvalStatus === "Checked-In" && !r.isDeleted).length,
                    disqualified: data.filter(r => r.approvalStatus === "Disqualified" && !r.isDeleted).length,
                    deleted: data.filter(r => r.isDeleted).length,
                    eventBreakdown: {}
                };

                EVENTS.forEach(ev => {
                    s.eventBreakdown[ev.id] = {
                        name: ev.name,
                        count: data.filter(r => r.eventId === ev.id && !r.isDeleted).length,
                        approved: data.filter(r => r.eventId === ev.id && r.approvalStatus === "Approved" && !r.isDeleted).length
                    };
                });

                setStats(s);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    if (loading) return <div className="py-20 text-center animate-pulse text-xs font-bold uppercase tracking-widest text-text-muted">Calculating Stats...</div>;

    return (
        <div className="space-y-10">
            {/* Overview Cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[
                    { label: "Total Registered", value: stats.total, color: "text-text-main" },
                    { label: "Pending Approval", value: stats.pendingApproval, color: "text-blue-400" },
                    { label: "Approved Teams", value: stats.approved, color: "text-green-400" },
                    { label: "Checked-In", value: stats.checkedIn, color: "text-emerald-400" },
                    { label: "Disqualified", value: stats.disqualified, color: "text-red-400" },
                ].map((stat, idx) => (
                    <div key={idx} className="card-surface p-6 border-l-4 border-l-accent">
                        <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-1">{stat.label}</p>
                        <p className={`text-3xl font-black ${stat.color} tabular-nums`}>{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Event Breakdown */}
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-bold text-text-main">Event-wise Distribution</h3>
                    <p className="text-xs text-text-muted mt-1 uppercase tracking-widest font-bold font-mono">Real-time Registration Data</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {Object.values(stats.eventBreakdown).map((ev, idx) => (
                        <div key={idx} className="bg-surface/30 border border-border rounded-2xl p-6 hover:border-accent/50 transition-colors">
                            <div className="flex justify-between items-start mb-4">
                                <h4 className="text-sm font-bold text-text-main">{ev.name}</h4>
                                <span className="text-[10px] font-black text-accent bg-accent/10 px-2 py-0.5 rounded uppercase tracking-tighter">
                                    {Math.round((ev.count / stats.total) * 100 || 0)}%
                                </span>
                            </div>
                            <div className="flex items-end justify-between">
                                <p className="text-2xl font-black text-text-main">{ev.count} <span className="text-[10px] text-text-muted font-bold uppercase">Teams</span></p>
                                <div className="text-right">
                                    <p className="text-[10px] font-bold text-green-400 uppercase tracking-widest">{ev.approved} Approved</p>
                                    <div className="w-24 h-1 bg-elevated rounded-full mt-1 overflow-hidden">
                                        <div
                                            className="h-full bg-green-500 transition-all duration-1000"
                                            style={{ width: `${(ev.approved / ev.count) * 100 || 0}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Audit Preview Link Placeholder */}
            {stats.deleted > 0 && (
                <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-bold text-red-400">Archived Registrations</p>
                        <p className="text-xs text-red-400/60 font-medium">There are {stats.deleted} registrations that have been soft-deleted.</p>
                    </div>
                    <button className="text-[10px] font-black uppercase tracking-widest text-red-400 underline hover:text-red-300">
                        View Trash
                    </button>
                </div>
            )}
        </div>
    );
}
