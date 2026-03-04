"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { getUserRegistrations, deleteRegistration } from "@/lib/firestore";
import { EVENTS } from "@/lib/constants";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Loader from "@/components/Loader";
import Toast from "@/components/Toast";
import Link from "next/link";
import RegistrationForm from "@/components/RegistrationForm";

function DashboardContent() {
    const { user } = useAuth();
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState(null);
    const [editingReg, setEditingReg] = useState(null);

    const fetchRegistrations = async () => {
        if (!user?.uid) return;
        try {
            const regs = await getUserRegistrations(user.uid);
            setRegistrations(regs);
        } catch (err) {
            console.error("Failed to fetch registrations:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRegistrations();
    }, [user]);

    const handleCancel = async (regId, eventName) => {
        if (!confirm(`Cancel registration for ${eventName}?`)) return;
        try {
            await deleteRegistration(regId);
            setRegistrations((prev) => prev.filter((r) => r.id !== regId));
            setToast({ message: "Registration cancelled.", type: "info" });
        } catch (err) {
            setToast({ message: "Failed to cancel. Try again.", type: "error" });
        }
    };

    const getEvent = (eventId) => EVENTS.find((e) => e.id === eventId) || {};

    const getStatusBadge = (reg) => {
        if (reg.approvalStatus === "Approved") return <span className="inline-flex items-center px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase tracking-widest rounded-full font-mono">Approved</span>;
        if (reg.approvalStatus === "Rejected") return <span className="inline-flex items-center px-3 py-1 bg-red-500/10 border border-red-500/30 text-red-400 text-[10px] font-bold uppercase tracking-widest rounded-full font-mono">Rejected</span>;
        if (reg.approvalStatus === "Disqualified") return <span className="inline-flex items-center px-3 py-1 bg-red-500/10 border border-red-500/30 text-red-500 text-[10px] font-bold uppercase tracking-widest rounded-full font-mono">Disqualified</span>;
        if (reg.paymentStatus === "Paid") return <span className="inline-flex items-center px-3 py-1 bg-[#4FD1C5]/10 border border-[#4FD1C5]/30 text-[#4FD1C5] text-[10px] font-bold uppercase tracking-widest rounded-full font-mono">Paid</span>;
        if (reg.paymentStatus === "Pending Verification") return <span className="inline-flex items-center px-3 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-full font-mono">Verification Pend</span>;
        if (reg.paymentStatus === "Pay on Event Day") return <span className="inline-flex items-center px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase tracking-widest rounded-full font-mono">Pay on Node</span>;
        return <span className="inline-flex items-center px-3 py-1 bg-[#7B61FF]/10 border border-[#7B61FF]/30 text-[#7B61FF] text-[10px] font-bold uppercase tracking-widest rounded-full font-mono">Pending</span>;
    };

    if (loading) return <Loader text="Synchronizing Node..." />;

    return (
        <div className="min-h-screen bg-[#0A0A14] text-white py-32 relative">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#7B61FF]/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-24 relative z-10">
                {/* Header */}
                <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-2 h-2 rounded-full bg-[#4FD1C5] animate-pulse"></span>
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#4FD1C5] font-mono">Active Session</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold font-sans mb-3">Operator <span className="text-[#7B61FF]">Terminal</span></h1>
                        <p className="text-[#E8E8EB]/50 font-mono tracking-widest uppercase text-xs">Node identifier: <span className="text-white font-bold">{user?.displayName || user?.name || user?.email}</span></p>
                    </div>
                    <Link href="/events" className="group relative overflow-hidden rounded-full bg-[#7B61FF] px-8 py-4 text-[10px] font-bold text-white transition-transform duration-300 hover:scale-[1.03] uppercase tracking-[0.2em] font-mono flex-shrink-0 text-center shadow-[0_0_20px_rgba(123,97,255,0.3)] hover:shadow-[0_0_30px_rgba(123,97,255,0.5)] outline-none">
                        <span className="relative z-10">Initialize New Request</span>
                        <span className="absolute inset-0 z-0 bg-white/20 translate-y-full transition-transform duration-300 group-hover:translate-y-0"></span>
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="mb-20 grid grid-cols-1 gap-6 sm:grid-cols-3">
                    {[
                        { label: "Total Operations", value: registrations.length, accent: "border-[#7B61FF]/30 bg-[#7B61FF]/5 text-[#7B61FF]" },
                        { label: "Verified Executions", value: registrations.filter(r => r.approvalStatus === "Approved").length, accent: "border-emerald-500/30 bg-emerald-500/5 text-emerald-400" },
                        { label: "Pending Validations", value: registrations.filter(r => r.approvalStatus === "Pending").length, accent: "border-orange-500/30 bg-orange-500/5 text-orange-400" },
                    ].map((stat) => (
                        <div key={stat.label} className={`rounded-[2rem] border p-8 transition-colors hover:bg-opacity-10 ${stat.accent}`}>
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 font-mono opacity-70">{stat.label}</p>
                            <p className="text-5xl font-black tabular-nums leading-none font-sans drop-shadow-md">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Table Layout */}
                <div className="space-y-6">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-px flex-1 bg-white/10"></div>
                        <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[#E8E8EB]/50 font-mono whitespace-nowrap">
                            Active Operations Log
                        </h3>
                        <div className="h-px flex-1 bg-white/10"></div>
                    </div>

                    <div className="w-full overflow-x-auto border border-white/5 rounded-[2rem] bg-[#111118]">
                        {registrations.length === 0 ? (
                            <div className="py-32 text-center flex flex-col items-center">
                                <div className="w-16 h-16 rounded-full border border-dashed border-white/20 flex items-center justify-center text-2xl mb-6 opacity-30">∅</div>
                                <p className="text-xs text-[#E8E8EB]/50 mb-8 font-mono uppercase tracking-[0.2em]">No operational data found in current ledger.</p>
                                <Link href="/events" className="rounded-full border border-white/20 px-8 py-3 text-[10px] font-bold text-white transition-all hover:bg-white/5 hover:border-white/40 uppercase tracking-[0.2em] font-mono">Browse Protocols</Link>
                            </div>
                        ) : (
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/5 bg-[#0A0A14]">
                                        <th className="py-6 px-8 text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8E8EB]/50 font-mono">Protocol / Details</th>
                                        <th className="py-6 px-8 text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8E8EB]/50 font-mono">Unit Designation</th>
                                        <th className="py-6 px-8 text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8E8EB]/50 font-mono">Status Block</th>
                                        <th className="py-6 px-8 text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8E8EB]/50 font-mono">Timestamp</th>
                                        <th className="py-6 px-8 text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8E8EB]/50 font-mono text-right">Overrides</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {registrations.map((reg, idx) => {
                                        const event = getEvent(reg.eventId);
                                        const canCancel = reg.approvalStatus === "Pending" && reg.paymentStatus !== "Paid";
                                        const isLast = idx === registrations.length - 1;

                                        return (
                                            <tr key={reg.id} className={`group hover:bg-white/[0.02] transition-colors ${!isLast ? 'border-b border-white/5' : ''}`}>
                                                <td className="py-6 px-8">
                                                    <div className="flex items-center gap-4">
                                                        <span className="text-2xl drop-shadow-md">{event.icon || "🤖"}</span>
                                                        <div>
                                                            <span className="font-bold text-white block font-sans tracking-wide">{event.name || "Unknown Asset"}</span>
                                                            {(reg.robotName || reg.projectTitle) && (
                                                                <span className="text-[10px] text-[#7B61FF] font-bold uppercase tracking-widest mt-1 inline-block bg-[#7B61FF]/10 px-2 py-0.5 rounded font-mono">
                                                                    {reg.robotName ? `HW: ${reg.robotName}` : `PRJ: ${reg.projectTitle}`}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-6 px-8">
                                                    <span className="text-white font-bold font-sans tracking-wide block">{reg.teamName}</span>
                                                    <p className="text-[9px] mt-1.5 text-[#E8E8EB]/50 uppercase tracking-widest font-mono">
                                                        {reg.members?.length + 1} Nodes • Op: {reg.leader?.name || "Self"}
                                                    </p>
                                                </td>
                                                <td className="py-6 px-8">{getStatusBadge(reg)}</td>
                                                <td className="py-6 px-8">
                                                    <span className="text-[11px] text-[#E8E8EB]/70 tabular-nums font-mono opacity-80">
                                                        {reg.createdAt && new Date(reg.createdAt?.seconds * 1000).toLocaleDateString()}
                                                    </span>
                                                </td>
                                                <td className="py-6 px-8 text-right">
                                                    <div className="flex items-center justify-end gap-4">
                                                        {reg.approvalStatus === "Pending" && (
                                                            <button
                                                                onClick={() => setEditingReg(reg)}
                                                                className="text-[10px] font-bold text-[#4FD1C5] hover:text-[#4FD1C5]/80 uppercase tracking-widest font-mono px-3 py-1.5 rounded bg-[#4FD1C5]/10 hover:bg-[#4FD1C5]/20 transition-colors"
                                                            >
                                                                Modify
                                                            </button>
                                                        )}
                                                        {canCancel && (
                                                            <button
                                                                onClick={() => handleCancel(reg.id, event.name)}
                                                                className="text-[10px] font-bold text-red-500 hover:text-red-400 uppercase tracking-widest font-mono px-3 py-1.5 rounded bg-red-500/10 hover:bg-red-500/20 transition-colors"
                                                            >
                                                                Abort
                                                            </button>
                                                        )}
                                                        {!canCancel && reg.approvalStatus !== "Pending" && (
                                                            <span className="text-[9px] text-[#E8E8EB]/30 font-bold uppercase tracking-widest font-mono border border-white/5 bg-white/5 px-2 py-1 rounded">Secured</span>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        )}
                    </div>

                    {/* Journey Note */}
                    {registrations.length > 0 && (
                        <p className="mt-12 text-center text-[10px] text-[#7B61FF]/50 uppercase tracking-[0.4em] font-mono">
                            // Transmission secured. Awaiting physical connection on 14.03.2026.
                        </p>
                    )}
                </div>
            </div>

            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            {editingReg && (
                <RegistrationForm
                    event={getEvent(editingReg.eventId)}
                    initialData={editingReg}
                    onClose={() => setEditingReg(null)}
                    onSuccess={() => {
                        setEditingReg(null);
                        setToast({ message: "Registration updated successfully!", type: "success" });
                        fetchRegistrations();
                    }}
                />
            )}
        </div>
    );
}

export default function DashboardPage() {
    return (
        <ProtectedRoute>
            <DashboardContent />
        </ProtectedRoute>
    );
}
