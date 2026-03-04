"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import StatsTab from "@/components/admin/StatsTab";
import RegistrationsTab from "@/components/admin/RegistrationsTab";
import EventsTab from "@/components/admin/EventsTab";
import AuditLogsTab from "@/components/admin/AuditLogsTab";
import GalleryTab from "@/components/admin/GalleryTab";
import { ShieldAlert, Database, Users, Target, Camera, ScrollText } from "lucide-react";

export default function AdminDashboard() {
    const { user, userRole, isAdmin, isSuperAdmin, loading } = useAuth();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("overview");

    useEffect(() => {
        if (!loading && !isAdmin) {
            router.push("/");
        }
    }, [loading, isAdmin, router]);

    if (loading || !isAdmin) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#0A0A14] overflow-hidden relative">
                <div className="absolute inset-0 bg-[#7B61FF]/5 blur-[100px] pointer-events-none rounded-full"></div>
                <div className="text-center animate-pulse relative z-10 flex flex-col items-center">
                    <ShieldAlert className="w-12 h-12 text-[#7B61FF] mb-4" />
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#7B61FF] font-mono">Security Clearance Check</p>
                    <p className="text-[10px] text-[#E8E8EB]/50 mt-3 font-mono uppercase tracking-widest">Validating Administrator Credentials...</p>
                </div>
            </div>
        );
    }

    const tabs = [
        { id: "overview", label: "Overview", icon: <Database className="w-4 h-4" /> },
        { id: "registrations", label: "Registrations", icon: <Users className="w-4 h-4" /> },
        { id: "events", label: "Events", icon: <Target className="w-4 h-4" /> },
        { id: "gallery", label: "Gallery", icon: <Camera className="w-4 h-4" /> },
        { id: "audit", label: "Audit Logs", icon: <ScrollText className="w-4 h-4" />, protected: true },
    ];

    const filteredTabs = isSuperAdmin ? tabs : tabs.filter(t => !t.protected);

    return (
        <main className="min-h-screen bg-[#0A0A14] text-white">
            <div className="flex flex-col lg:flex-row min-h-[calc(100-64px)] pt-16">
                {/* Sidebar */}
                <aside className="w-full lg:w-80 border-r border-white/5 bg-[#111118]/80 backdrop-blur-md lg:h-[calc(100vh-64px)] lg:sticky lg:top-16 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#4FD1C5]/5 blur-[40px] rounded-full pointer-events-none"></div>
                    <div className="p-8 relative z-10">
                        <div className="mb-12">
                            <h1 className="text-2xl font-bold text-white font-sans tracking-tight flex items-center gap-2">
                                <ShieldAlert className="w-6 h-6 text-[#4FD1C5]" />
                                Admin Terminal
                            </h1>
                            <p className="text-[10px] text-[#4FD1C5] font-bold uppercase tracking-[0.3em] mt-2 font-mono">Management Node v2.0</p>
                        </div>

                        <nav className="space-y-2">
                            {filteredTabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-4 px-5 py-4 rounded-[1rem] text-[10px] font-bold uppercase tracking-widest transition-all font-mono ${activeTab === tab.id
                                        ? "bg-[#7B61FF] text-white shadow-[0_0_20px_rgba(123,97,255,0.2)]"
                                        : "text-[#E8E8EB]/50 hover:bg-white/5 hover:text-white"
                                        }`}
                                >
                                    {tab.icon}
                                    {tab.label}
                                </button>
                            ))}
                        </nav>

                        <div className="mt-24 pt-8 border-t border-white/5">
                            <div className="flex items-center gap-4 px-2">
                                <div className="h-10 w-10 rounded-full bg-[#111118] border border-white/10 flex items-center justify-center text-[#7B61FF] text-xs font-bold font-mono">
                                    {user.displayName?.charAt(0) || "A"}
                                </div>
                                <div className="truncate">
                                    <p className="text-xs font-bold text-white font-sans truncate">{user.displayName}</p>
                                    <p className="text-[9px] text-[#4FD1C5] font-bold uppercase tracking-widest font-mono mt-0.5">{userRole}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <section className="flex-1 p-6 lg:p-12 overflow-y-auto">
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <h2 className="text-3xl font-bold text-white font-sans">
                                    {tabs.find(t => t.id === activeTab)?.label}
                                </h2>
                                <p className="text-[10px] text-[#E8E8EB]/50 mt-2 font-mono uppercase tracking-[0.2em]">
                                    System status: Operational // Protocol: Active
                                </p>
                            </div>
                            <div className="hidden sm:block">
                                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-400 font-mono">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                    </span>
                                    Secure Link Configured
                                </span>
                            </div>
                        </div>

                        {/* Note: The internal components (StatsTab, RegistrationsTab, etc.) will still use standard styles.
                            To ensure they look decent, they rely on CSS globals which have been updated to dark colors by default,
                            but we'll keep the structural changes here and plan to update those components separately if needed. */}

                        <div className="bg-[#111118] border border-white/5 rounded-[2rem] p-6 sm:p-8">
                            {activeTab === "overview" && <StatsTab />}
                            {activeTab === "registrations" && <RegistrationsTab />}
                            {activeTab === "events" && <EventsTab />}
                            {activeTab === "audit" && <AuditLogsTab />}
                            {activeTab === "gallery" && <GalleryTab />}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
