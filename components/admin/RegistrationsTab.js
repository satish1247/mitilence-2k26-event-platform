"use client";

import { useState, useEffect } from "react";
import {
    getAllRegistrations,
    updateRegistrationStatus,
    disqualifyRegistration,
    softDeleteRegistration,
    updateRegistration
} from "@/lib/firestore";
import { EVENTS, STATUS_COLORS } from "@/lib/constants";
import { useAuth } from "@/lib/AuthContext";
import DisqualificationModal from "./DisqualificationModal";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function RegistrationsTab() {
    const { user } = useAuth();
    const [registrations, setRegistrations] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filterEvent, setFilterEvent] = useState("all");
    const [filterStatus, setFilterStatus] = useState("all");

    const [selectedReg, setSelectedReg] = useState(null); // For DQ modal
    const [showDQModal, setShowDQModal] = useState(false);

    useEffect(() => {
        fetchRegistrations();
    }, []);

    useEffect(() => {
        let result = registrations.filter(reg => !reg.isDeleted);

        if (search) {
            const s = search.toLowerCase();
            result = result.filter(reg =>
                reg.teamName?.toLowerCase().includes(s) ||
                reg.leader?.name?.toLowerCase().includes(s) ||
                reg.leader?.college?.toLowerCase().includes(s)
            );
        }

        if (filterEvent !== "all") {
            result = result.filter(reg => reg.eventId === filterEvent);
        }

        if (filterStatus !== "all") {
            result = result.filter(reg => reg.approvalStatus === filterStatus);
        }

        setFiltered(result);
    }, [search, filterEvent, filterStatus, registrations]);

    async function fetchRegistrations() {
        setLoading(true);
        try {
            const data = await getAllRegistrations();
            setRegistrations(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleAction = async (regId, action, extra = null) => {
        if (!window.confirm(`Are you sure you want to ${action} this registration?`)) return;

        try {
            if (action === "Approve") {
                await updateRegistrationStatus(regId, "Approved", user.uid);
            } else if (action === "Reject") {
                await updateRegistrationStatus(regId, "Rejected", user.uid);
            } else if (action === "CheckIn") {
                const reg = filtered.find(r => r.id === regId);
                const newStatus = reg.approvalStatus === "Checked-In" ? "Approved" : "Checked-In";
                await updateRegistrationStatus(regId, newStatus, user.uid);
            } else if (action === "Delete") {
                await softDeleteRegistration(regId, user.uid);
            }
            await fetchRegistrations();
        } catch (error) {
            alert(error.message);
        }
    };

    const handleDisqualify = async (reason) => {
        try {
            await disqualifyRegistration(selectedReg.id, reason, user.uid);
            setShowDQModal(false);
            setSelectedReg(null);
            await fetchRegistrations();
        } catch (error) {
            alert(error.message);
        }
    };

    const exportToExcel = () => {
        const headers = ["Team Name", "Event", "Leader Name", "College", "Phone", "Status", "Members", "Paper URL", "Created At"];
        const rows = filtered.map(reg => [
            reg.teamName,
            reg.eventName,
            reg.leader?.name || "N/A",
            reg.leader?.college || "N/A",
            reg.leader?.phone || "N/A",
            reg.approvalStatus,
            (reg.members || []).map(m => m.name).join("; "),
            reg.paperUrl || "N/A",
            reg.createdAt
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map(row => row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `MITILENCE_Registrations_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const exportToPDF = () => {
        const doc = new jsPDF();

        // Title
        doc.setFontSize(20);
        doc.setTextColor(0, 0, 0);
        doc.text("MITILENCE 2K26 - REGISTRATION REPORT", 14, 20);

        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 28);
        doc.text(`Total Records: ${filtered.length}`, 14, 34);

        // Table columns
        const tableColumn = [
            "Team Name",
            "Event",
            "Leader Name",
            "College",
            "Phone",
            "Status",
            "Paper",
        ];

        // Table rows
        const tableRows = filtered.map((reg) => [
            reg.teamName,
            reg.eventName,
            reg.leader?.name || "N/A",
            reg.leader?.college || "N/A",
            reg.leader?.phone || "N/A",
            reg.approvalStatus,
            reg.paperUrl ? "Yes" : "No",
        ]);

        autoTable(doc, {
            startY: 40,
            head: [tableColumn],
            body: tableRows,
            theme: "grid",
            styles: {
                fontSize: 8,
                cellPadding: 3,
            },
            headStyles: {
                fillColor: [37, 99, 235], // Blue-600
                textColor: [255, 255, 255],
                fontStyle: 'bold',
            },
            alternateRowStyles: {
                fillColor: [245, 247, 250],
            },
            columnStyles: {
                0: { fontStyle: 'bold' },
            }
        });

        doc.save(`MITILENCE_Registrations_${new Date().toISOString().split('T')[0]}.pdf`);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-text-main">Registrations Management</h2>
                    <p className="text-xs text-text-muted mt-1 uppercase tracking-widest font-bold">
                        {filtered.length} Teams Matching Filters
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={exportToExcel}
                        className="btn-secondary text-[10px] font-black uppercase tracking-widest py-2 px-6 border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white"
                    >
                        📊 Export Excel
                    </button>
                    <button
                        onClick={exportToPDF}
                        className="btn-secondary text-[10px] font-black uppercase tracking-widest py-2 px-6 border-accent text-accent hover:bg-accent hover:text-white"
                    >
                        📥 Export PDF
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="grid gap-4 sm:grid-cols-3 bg-surface/50 p-4 rounded-2xl border border-border">
                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Search Team/College</label>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search..."
                        className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs focus:border-accent outline-none"
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Filter Event</label>
                    <select
                        value={filterEvent}
                        onChange={(e) => setFilterEvent(e.target.value)}
                        className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs focus:border-accent outline-none"
                    >
                        <option value="all">All Events</option>
                        {EVENTS.map(ev => <option key={ev.id} value={ev.id}>{ev.name}</option>)}
                    </select>
                </div>
                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Filter Status</label>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs focus:border-accent outline-none"
                    >
                        <option value="all">All Statuses</option>
                        <option value="Pending Approval">Pending Approval</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Checked-In">Checked-In</option>
                        <option value="Disqualified">Disqualified</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-2xl border border-border bg-background">
                <table className="w-full border-collapse text-left">
                    <thead className="bg-surface/50 text-[10px] font-black uppercase tracking-widest text-text-muted border-b border-border">
                        <tr>
                            <th className="px-6 py-4">Team & Event</th>
                            <th className="px-6 py-4">Leader & College</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {loading ? (
                            <tr>
                                <td colSpan="4" className="px-6 py-20 text-center animate-pulse">
                                    <p className="text-xs font-bold text-text-muted uppercase tracking-widest">Loading registrations...</p>
                                </td>
                            </tr>
                        ) : filtered.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="px-6 py-20 text-center">
                                    <p className="text-xs font-bold text-text-muted uppercase tracking-widest">No registrations found.</p>
                                </td>
                            </tr>
                        ) : filtered.map((reg) => (
                            <tr key={reg.id} className="hover:bg-surface/30 transition-colors group">
                                <td className="px-6 py-5">
                                    <p className="text-sm font-bold text-text-main">{reg.teamName}</p>
                                    <p className="text-[10px] text-accent font-black uppercase tracking-tighter">{reg.eventName}</p>
                                    {reg.robotName && <p className="text-[9px] text-text-muted mt-0.5">🤖 {reg.robotName}</p>}
                                </td>
                                <td className="px-6 py-5">
                                    <p className="text-sm font-medium text-text-main">{reg.leader?.name}</p>
                                    <p className="text-[10px] text-text-muted truncate max-w-[150px] uppercase font-bold">{reg.leader?.college}</p>
                                    <p className="text-[9px] text-text-muted/60">{reg.leader?.phone}</p>
                                    {reg.paperUrl && (
                                        <div className="flex flex-col gap-1 mt-1">
                                            {reg.paperUrl.includes("drive.google.com") ? (
                                                <>
                                                    <a
                                                        href={reg.paperUrl.replace("/view?usp=sharing", "/preview").replace("/view", "/preview")}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 text-[9px] font-black uppercase text-accent hover:underline"
                                                    >
                                                        📄 View Paper
                                                    </a>
                                                    <a
                                                        href={reg.paperUrl.replace("/file/d/", "/uc?export=download&id=").split("/view")[0]}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 text-[9px] font-black uppercase text-text-muted hover:text-accent transition-colors"
                                                    >
                                                        📥 Download
                                                    </a>
                                                </>
                                            ) : (
                                                <>
                                                    <a
                                                        href={`https://docs.google.com/gview?embedded=1&url=${encodeURIComponent(reg.paperUrl.replace("/image/upload/", "/raw/upload/"))}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 text-[9px] font-black uppercase text-accent hover:underline"
                                                    >
                                                        📄 View Paper
                                                    </a>
                                                    <a
                                                        href={reg.paperUrl.replace("/image/upload/", "/raw/upload/")}
                                                        download
                                                        className="inline-flex items-center gap-1 text-[9px] font-black uppercase text-text-muted hover:text-accent transition-colors"
                                                    >
                                                        📥 Download
                                                    </a>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-5">
                                    <span className={`badge ${STATUS_COLORS[reg.approvalStatus]?.bg} ${STATUS_COLORS[reg.approvalStatus]?.text} ${STATUS_COLORS[reg.approvalStatus]?.border}`}>
                                        {reg.approvalStatus}
                                    </span>
                                </td>
                                <td className="px-6 py-5 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {reg.approvalStatus !== 'Approved' && reg.approvalStatus !== 'Checked-In' && (
                                            <button
                                                onClick={() => handleAction(reg.id, "Approve")}
                                                className="p-1 px-2 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-black uppercase hover:bg-emerald-500 hover:text-white transition-all"
                                            >
                                                Approve
                                            </button>
                                        )}
                                        {reg.approvalStatus !== 'Rejected' && reg.approvalStatus !== 'Disqualified' && (
                                            <button
                                                onClick={() => handleAction(reg.id, "Reject")}
                                                className="p-1 px-2 rounded-md bg-red-500/10 text-red-400 border border-red-500/20 text-[9px] font-black uppercase hover:bg-red-500 hover:text-white transition-all"
                                            >
                                                Reject
                                            </button>
                                        )}
                                        <button
                                            onClick={() => {
                                                setSelectedReg(reg);
                                                setShowDQModal(true);
                                            }}
                                            className="p-1 px-2 rounded-md bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-[9px] font-black uppercase hover:bg-yellow-500 hover:text-white transition-all"
                                        >
                                            DQ
                                        </button>
                                        <button
                                            onClick={() => handleAction(reg.id, "CheckIn")}
                                            className={`p-1 px-2 rounded-md border text-[9px] font-black uppercase transition-all ${reg.approvalStatus === "Checked-In"
                                                ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                                : "bg-elevated text-text-muted border-border hover:bg-blue-500 hover:text-white"
                                                }`}
                                        >
                                            {reg.approvalStatus === "Checked-In" ? "Checked In" : "Check In"}
                                        </button>
                                        <button
                                            onClick={() => handleAction(reg.id, "Delete")}
                                            className="p-2 text-text-muted hover:text-red-400 transition-colors"
                                        >
                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showDQModal && (
                <DisqualificationModal
                    registration={selectedReg}
                    onConfirm={handleDisqualify}
                    onClose={() => {
                        setShowDQModal(false);
                        setSelectedReg(null);
                    }}
                />
            )}
        </div>
    );
}
