"use client";

import { useState, useEffect } from "react";
import { getEvents, toggleEventStatus } from "@/lib/firestore";
import { useAuth } from "@/lib/AuthContext";

export default function EventsTab() {
    const { user } = useAuth();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEvents();
    }, []);

    async function fetchEvents() {
        setLoading(true);
        try {
            const data = await getEvents();
            setEvents(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleToggleStatus = async (eventId, currentStatus) => {
        const newStatus = currentStatus === "Open" ? "Closed" : "Open";
        if (!window.confirm(`Turn ${newStatus.toUpperCase()} registrations for this event?`)) return;

        try {
            await toggleEventStatus(eventId, newStatus, user.uid);
            await fetchEvents();
        } catch (error) {
            alert(error.message);
        }
    };

    if (loading) return <div className="py-20 text-center animate-pulse text-xs font-bold uppercase tracking-widest text-text-muted">Loading Events...</div>;

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-xl font-bold text-text-main">Event Controls</h2>
                <p className="text-xs text-text-muted mt-1 uppercase tracking-widest font-bold font-mono">Manage registration availability</p>
            </div>

            <div className="grid gap-6">
                {events.map((event) => (
                    <div key={event.id} className="bg-surface border border-border rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-accent/40 transition-all">
                        <div className="flex items-center gap-6">
                            <div className="h-16 w-16 rounded-2xl bg-elevated/50 flex items-center justify-center text-3xl border border-border shadow-inner">
                                {event.icon || "🎯"}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-text-main">{event.name}</h3>
                                <p className="text-xs text-text-muted uppercase font-bold tracking-widest">{event.category}</p>
                                <p className="text-[10px] text-text-muted/60 mt-1 max-w-md line-clamp-1">{event.description}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 w-full sm:w-auto">
                            <div className={`px-4 py-2 rounded-xl border flex items-center gap-2 ${event.status === "Open"
                                    ? "bg-green-500/10 text-green-400 border-green-500/20"
                                    : "bg-red-500/10 text-red-400 border-red-500/20"
                                }`}>
                                <span className={`h-2 w-2 rounded-full animate-pulse ${event.status === 'Open' ? 'bg-green-500' : 'bg-red-500'}`} />
                                <span className="text-[10px] font-black uppercase tracking-widest">{event.status === 'Open' ? 'Registrations Open' : 'Registrations Closed'}</span>
                            </div>

                            <button
                                onClick={() => handleToggleStatus(event.id, event.status)}
                                className={`btn-primary flex-1 sm:flex-none border-none px-6 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all ${event.status === 'Open'
                                        ? "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/20"
                                        : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-900/20"
                                    }`}
                            >
                                {event.status === 'Open' ? "Close Event" : "Open Event"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
