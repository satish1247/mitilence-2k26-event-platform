"use client";

import { useEffect, useState } from "react";
import { getAuditLogs, getUserProfile } from "@/lib/firestore";

export default function AuditLogsTab() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchLogs() {
            try {
                const data = await getAuditLogs();
                // We could fetch admin names here for better readability
                setLogs(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchLogs();
    }, []);

    if (loading) return <div className="py-20 text-center animate-pulse text-xs font-bold uppercase tracking-widest text-text-muted">Fetching Audit Logs...</div>;

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-xl font-bold text-text-main">System Audit Logs</h2>
                <p className="text-xs text-text-muted mt-1 uppercase tracking-widest font-bold font-mono">Tracking every administrative action</p>
            </div>

            <div className="rounded-2xl border border-border bg-background overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                        <thead className="bg-surface/50 text-[10px] font-black uppercase tracking-widest text-text-muted border-b border-border">
                            <tr>
                                <th className="px-6 py-4">Timestamp</th>
                                <th className="px-6 py-4">Admin ID</th>
                                <th className="px-6 py-4">Action</th>
                                <th className="px-6 py-4">Target ID</th>
                                <th className="px-6 py-4">Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {logs.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-10 text-center text-xs text-text-muted font-bold uppercase tracking-widest">No activities logged yet.</td>
                                </tr>
                            ) : logs.map((log) => (
                                <tr key={log.id} className="text-xs hover:bg-surface/20 transition-colors">
                                    <td className="px-6 py-4 font-mono text-text-muted">
                                        {log.timestamp?.toDate ? log.timestamp.toDate().toLocaleString() : 'Just now'}
                                    </td>
                                    <td className="px-6 py-4 text-text-main font-bold">
                                        {log.adminUid.substring(0, 8)}...
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase border ${log.action === 'disqualify' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                                log.action === 'status_update' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                                    log.action === 'soft_delete' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                                                        'bg-elevated text-text-muted border-border'
                                            }`}>
                                            {log.action.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-[10px] text-text-muted">
                                        {log.targetId}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="max-w-xs truncate text-[10px] text-text-muted">
                                            {JSON.stringify(log.details)}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
