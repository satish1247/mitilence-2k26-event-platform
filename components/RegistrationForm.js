"use client";

import { useState, useEffect } from "react";
import { createRegistration } from "@/lib/firestore";
import { useAuth } from "@/lib/AuthContext";


export default function RegistrationForm({ event, initialData = null, onSuccess, onClose }) {
    const { user } = useAuth();
    const isTechnical = event.category === "Technical";
    const isSoloEvent = event.teamSizeMax === 1;

    // Registration Lock: Block editing if already approved/verified
    const isLocked = initialData && initialData.approvalStatus !== "Pending Approval";

    // State for Team Leader
    const [leader, setLeader] = useState({
        name: initialData?.leader?.name || user?.displayName || "",
        email: initialData?.leader?.email || user?.email || "",
        college: initialData?.leader?.college || user?.college || "",
        department: initialData?.leader?.department || "",
        year: initialData?.leader?.year || "1st",
        phone: initialData?.leader?.phone || user?.phone || "",
    });

    const [members, setMembers] = useState(initialData?.members || []);
    const [teamName, setTeamName] = useState(initialData?.teamName || "");
    const [extraInfo, setExtraInfo] = useState({
        projectTitle: initialData?.projectTitle || "",
        robotName: initialData?.robotName || "",
    });
    const [paperUrl, setPaperUrl] = useState(initialData?.paperUrl || "");
    const [agreed, setAgreed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleAddMember = () => {
        if (members.length + 1 < event.teamSizeMax) {
            setMembers([...members, {
                name: "",
                college: "",
                department: "",
                year: "1st",
                phone: "",
                email: "",
                sameCollege: false
            }]);
        }
    };

    const handleRemoveMember = (index) => {
        setMembers(members.filter((_, i) => i !== index));
    };

    const updateMember = (index, field, value) => {
        const newMembers = [...members];
        newMembers[index][field] = value;

        // Auto-fill college if "Same college" is checked
        if (field === "sameCollege" && value === true) {
            newMembers[index].college = leader.college;
        }

        setMembers(newMembers);
    };

    const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);

    const handleFinalSubmit = async (e) => {
        if (e) e.preventDefault();
        setError("");

        if (isLocked) {
            setError("This registration is locked and cannot be edited.");
            return;
        }

        if (!leader.name || !leader.college || !leader.phone || !leader.department) {
            setError("Please fill all Team Leader required fields.");
            return;
        }

        if (!validatePhone(leader.phone)) {
            setError("Team Leader phone must be 10 digits.");
            return;
        }

        if (!teamName.trim()) {
            setError("Team name is required.");
            return;
        }

        if (!agreed) {
            setError("Please agree to the rules and guidelines.");
            return;
        }

        if (event.id === "paper-presentation" && !paperUrl.trim()) {
            setError("Please provide your Google Drive paper link.");
            return;
        }

        if (event.id === "paper-presentation" && !paperUrl.includes("drive.google.com")) {
            setError("Please provide a valid Google Drive link.");
            return;
        }

        setLoading(true);
        try {
            const regData = {
                teamName: teamName.trim(),
                projectTitle: extraInfo.projectTitle,
                robotName: extraInfo.robotName,
                paperUrl: paperUrl.trim(),
                leader: { ...leader },
                members: members.map(m => ({
                    name: m.name,
                    college: m.college,
                    department: m.department,
                    year: m.year,
                    phone: m.phone,
                    email: m.email
                })),
                approvalStatus: "Pending Approval",
                userId: user.uid,
                eventId: event.id,
                eventName: event.name,
                createdAt: new Date().toISOString()
            };

            if (initialData) {
                const { updateRegistration } = await import("@/lib/firestore");
                await updateRegistration(initialData.id, regData);
            } else {
                await createRegistration(regData);
            }

            onSuccess();
        } catch (err) {
            console.error("Submission Error:", err);
            setError(err.message || "Failed to submit registration.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0A0A14]/80 backdrop-blur-md">
            <div className="w-full max-w-3xl bg-[#111118] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden animate-fade-in-up flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="border-b border-white/5 bg-[#0A0A14] p-8 flex items-center justify-between shrink-0">
                    <div>
                        <h2 className="text-2xl font-bold text-white font-sans tracking-tight">Registration Terminal</h2>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#7B61FF] bg-[#7B61FF]/10 px-3 py-1 rounded-full font-mono">
                                {event.name} • {event.category}
                            </span>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 text-[#E8E8EB]/50 hover:text-white transition-colors bg-white/5 rounded-full hover:bg-white/10">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-8 space-y-12 overflow-y-auto no-scrollbar flex-1">
                    {/* Registration Summary Section (Requested UI) */}
                    <div className="rounded-[1.5rem] border border-[#7B61FF]/20 bg-[#7B61FF]/5 p-6 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-[#E8E8EB]/50 font-mono">Entry Protocol</p>
                                <p className="text-xl font-bold text-white font-sans mt-1">
                                    {event.fee > 0 ? `₹${event.fee} per unit` : "Free Access"}
                                </p>
                            </div>
                            <div className="sm:text-right">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-[#E8E8EB]/50 font-mono">Transaction Mode</p>
                                <p className="text-sm font-bold text-[#7B61FF] font-sans mt-1">Physical Node (Event Desk)</p>
                            </div>
                        </div>
                        {event.fee > 0 && (
                            <p className="text-[10px] text-[#E8E8EB]/70 font-light uppercase tracking-widest leading-relaxed font-mono">
                                <span className="text-[#7B61FF] font-bold">»</span> Physical transaction required at nexus coordinates on 14 March 2026.
                            </p>
                        )}
                    </div>

                    {error && (
                        <div className="rounded-[1rem] border border-red-500/20 bg-red-500/10 p-4 text-xs font-bold text-red-500">
                            ⚠ {error}
                        </div>
                    )}

                    <form id="registration-form" onSubmit={handleFinalSubmit} className="space-y-12">
                        {/* Section 1: Team Leader */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="h-px flex-1 bg-white/5" />
                                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#E8E8EB]/50 font-mono whitespace-nowrap">
                                    Primary Node Operator
                                </h3>
                                <div className="h-px flex-1 bg-white/5" />
                            </div>

                            <div className="grid gap-6 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#E8E8EB]/50 font-mono">Full Designation *</label>
                                    <input
                                        type="text"
                                        value={leader.name}
                                        onChange={(e) => setLeader({ ...leader, name: e.target.value })}
                                        className="w-full rounded-[1rem] border border-white/10 bg-[#0A0A14] px-4 py-3 text-sm text-white focus:border-[#7B61FF] focus:ring-1 focus:ring-[#7B61FF]/50 outline-none transition-all font-sans"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#E8E8EB]/50 font-mono">Network ID (Readonly)</label>
                                    <input
                                        type="email"
                                        value={leader.email}
                                        readOnly
                                        className="w-full rounded-[1rem] border border-white/5 bg-[#0A0A14]/50 px-4 py-3 text-sm text-[#E8E8EB]/50 outline-none cursor-not-allowed font-sans"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#E8E8EB]/50 font-mono">Institution *</label>
                                    <input
                                        type="text"
                                        value={leader.college}
                                        onChange={(e) => setLeader({ ...leader, college: e.target.value })}
                                        className="w-full rounded-[1rem] border border-white/10 bg-[#0A0A14] px-4 py-3 text-sm text-white focus:border-[#7B61FF] outline-none transition-all"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#E8E8EB]/50 font-mono">Department *</label>
                                    <input
                                        type="text"
                                        value={leader.department}
                                        onChange={(e) => setLeader({ ...leader, department: e.target.value })}
                                        placeholder="e.g. Robotics"
                                        className="w-full rounded-[1rem] border border-white/10 bg-[#0A0A14] px-4 py-3 text-sm text-white focus:border-[#7B61FF] outline-none transition-all"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#E8E8EB]/50 font-mono">Cohort *</label>
                                    <select
                                        value={leader.year}
                                        onChange={(e) => setLeader({ ...leader, year: e.target.value })}
                                        className="w-full rounded-[1rem] border border-white/10 bg-[#0A0A14] px-4 py-3 text-sm text-white focus:border-[#7B61FF] outline-none transition-all appearance-none"
                                    >
                                        <option value="1st">1st Year Array</option>
                                        <option value="2nd">2nd Year Array</option>
                                        <option value="3rd">3rd Year Array</option>
                                        <option value="4th">4th Year Array</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#E8E8EB]/50 font-mono">Comm Link *</label>
                                    <input
                                        type="tel"
                                        value={leader.phone}
                                        onChange={(e) => setLeader({ ...leader, phone: e.target.value })}
                                        placeholder="10-digit primary channel"
                                        className="w-full rounded-[1rem] border border-white/10 bg-[#0A0A14] px-4 py-3 text-sm text-white focus:border-[#7B61FF] outline-none transition-all font-mono"
                                        required
                                    />
                                </div>
                                {event.id === "paper-presentation" && (
                                    <div className="space-y-6 sm:col-span-2 pt-4">
                                        <div className="rounded-[1.5rem] border border-orange-500/20 bg-orange-500/5 p-6 space-y-4">
                                            <div className="flex items-center gap-2">
                                                <h4 className="text-[11px] font-bold uppercase tracking-widest text-orange-400 font-mono">Data Upload Sequence</h4>
                                            </div>
                                            <ul className="space-y-2">
                                                {[
                                                    "Upload research protocol to Google Drive.",
                                                    "Configuration: 'Anyone with the link' → Viewer.",
                                                    "Input URL into data port below."
                                                ].map((step, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-[10px] text-[#E8E8EB]/70 font-medium font-mono uppercase tracking-widest">
                                                        <span className="text-orange-400">»</span>
                                                        {step}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-[#E8E8EB]/50 font-mono">File URL Array *</label>
                                            <input
                                                type="url"
                                                value={paperUrl}
                                                onChange={(e) => setPaperUrl(e.target.value)}
                                                placeholder="https://drive.google.com/..."
                                                className="w-full rounded-[1rem] border border-white/10 bg-[#0A0A14] px-4 py-3 text-sm text-white focus:border-[#7B61FF] outline-none transition-all font-mono text-xs"
                                                required
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Section 2: Team Details */}
                        <section className="space-y-6 pt-4">
                            <div className="flex items-center gap-4">
                                <div className="h-px flex-1 bg-white/5" />
                                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#E8E8EB]/50 font-mono whitespace-nowrap">
                                    Unit Configuration
                                </h3>
                                <div className="h-px flex-1 bg-white/5" />
                            </div>

                            <div className="grid gap-6 sm:grid-cols-2">
                                <div className="col-span-full space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#E8E8EB]/50 font-mono">Unit Designation *</label>
                                    <input
                                        type="text"
                                        value={teamName}
                                        onChange={(e) => setTeamName(e.target.value)}
                                        placeholder="e.g. Cyber Squad"
                                        className="w-full rounded-[1rem] border border-white/10 bg-[#0A0A14] px-4 py-3 text-sm text-white focus:border-[#7B61FF] outline-none transition-all font-sans"
                                        required
                                    />
                                </div>
                                {isTechnical && (
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#E8E8EB]/50 font-mono">Prototype Title (Optional)</label>
                                        <input
                                            type="text"
                                            value={extraInfo.projectTitle}
                                            onChange={(e) => setExtraInfo({ ...extraInfo, projectTitle: e.target.value })}
                                            className="w-full rounded-[1rem] border border-white/10 bg-[#0A0A14] px-4 py-3 text-sm text-white focus:border-[#7B61FF] outline-none transition-all"
                                        />
                                    </div>
                                )}
                                {event.id.includes("robo") && (
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#E8E8EB]/50 font-mono">Hardware Designation (Optional)</label>
                                        <input
                                            type="text"
                                            value={extraInfo.robotName}
                                            onChange={(e) => setExtraInfo({ ...extraInfo, robotName: e.target.value })}
                                            className="w-full rounded-[1rem] border border-white/10 bg-[#0A0A14] px-4 py-3 text-sm text-white focus:border-[#7B61FF] outline-none transition-all"
                                        />
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Section 3: Team Members */}
                        <section className="space-y-6 pt-4">
                            <div className="flex items-center gap-4">
                                <div className="h-px flex-1 bg-white/5" />
                                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#E8E8EB]/50 font-mono whitespace-nowrap flex items-center gap-4">
                                    <span>Secondary Nodes</span>
                                    <span className="text-[9px] text-[#7B61FF] bg-[#7B61FF]/10 px-2 py-0.5 rounded-full">
                                        {isSoloEvent ? "Individual Event" : `Max ${event.teamSizeMax - 1}`}
                                    </span>
                                </h3>
                                <div className="h-px flex-1 bg-white/5" />
                            </div>

                            <div className="space-y-6">
                                {members.map((member, index) => (
                                    <div key={index} className="relative rounded-[1.5rem] border border-white/10 bg-[#18181B] p-6 sm:p-8 space-y-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#7B61FF] font-mono">Node / {index + 1}</span>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveMember(index)}
                                                className="text-[10px] font-bold text-red-500 hover:text-red-400 bg-red-500/10 px-3 py-1.5 rounded-full transition-colors uppercase tracking-widest font-mono"
                                            >
                                                Disconnect
                                            </button>
                                        </div>

                                        <div className="grid gap-6 sm:grid-cols-2">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-[#E8E8EB]/50 font-mono">Full Designation *</label>
                                                <input
                                                    type="text"
                                                    value={member.name}
                                                    onChange={(e) => updateMember(index, "name", e.target.value)}
                                                    className="w-full rounded-[1rem] border border-white/10 bg-[#0A0A14] px-4 py-3 text-sm text-white focus:border-[#7B61FF] outline-none transition-all"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between mb-2">
                                                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#E8E8EB]/50 font-mono">Institution *</label>
                                                    <label className="flex items-center gap-2 cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={member.sameCollege}
                                                            onChange={(e) => updateMember(index, "sameCollege", e.target.checked)}
                                                            className="accent-[#7B61FF]"
                                                        />
                                                        <span className="text-[10px] text-[#7B61FF] uppercase font-bold tracking-widest font-mono">Clone Primary</span>
                                                    </label>
                                                </div>
                                                <input
                                                    type="text"
                                                    value={member.college}
                                                    onChange={(e) => updateMember(index, "college", e.target.value)}
                                                    className="w-full rounded-[1rem] border border-white/10 bg-[#0A0A14] px-4 py-3 text-sm text-white focus:border-[#7B61FF] outline-none transition-all disabled:opacity-50"
                                                    required
                                                    disabled={member.sameCollege}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-[#E8E8EB]/50 font-mono">Comm Link (Optional)</label>
                                                <input
                                                    type="tel"
                                                    value={member.phone}
                                                    onChange={(e) => updateMember(index, "phone", e.target.value)}
                                                    className="w-full rounded-[1rem] border border-white/10 bg-[#0A0A14] px-4 py-3 text-sm text-white focus:border-[#7B61FF] outline-none transition-all font-mono"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-[#E8E8EB]/50 font-mono">Network ID (Optional)</label>
                                                <input
                                                    type="email"
                                                    value={member.email}
                                                    onChange={(e) => updateMember(index, "email", e.target.value)}
                                                    className="w-full rounded-[1rem] border border-white/10 bg-[#0A0A14] px-4 py-3 text-sm text-white focus:border-[#7B61FF] outline-none transition-all font-sans"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {!isSoloEvent && members.length + 1 < event.teamSizeMax && (
                                <button
                                    type="button"
                                    onClick={handleAddMember}
                                    className="flex w-full items-center justify-center gap-2 rounded-[1.5rem] border border-white/10 bg-[#18181B] py-6 text-xs font-bold uppercase tracking-widest text-[#E8E8EB]/50 hover:border-[#7B61FF]/50 hover:text-[#7B61FF] hover:bg-[#7B61FF]/5 transition-all font-mono"
                                >
                                    <span className="text-xl leading-none -mt-1">+</span> Initialize New Node
                                </button>
                            )}
                        </section>

                        {/* Guidelines & Agreement */}
                        <div className="space-y-4 pt-8 border-t border-white/10">
                            <label className="flex items-start gap-4 cursor-pointer group rounded-[1.5rem] border border-white/5 bg-[#18181B] p-6 hover:border-[#7B61FF]/30 transition-all">
                                <input
                                    type="checkbox"
                                    checked={agreed}
                                    onChange={(e) => setAgreed(e.target.checked)}
                                    className="mt-1 w-4 h-4 accent-[#7B61FF] shrink-0"
                                />
                                <span className="text-sm text-[#E8E8EB]/70 group-hover:text-white transition-colors leading-relaxed font-light">
                                    I verify all transmitted data. Our unit will comply with symposium directives. I acknowledge that the transaction protocol requires physical presence at the nexus.
                                </span>
                            </label>
                        </div>
                    </form>
                </div>

                <div className="border-t border-white/10 bg-[#0A0A14] p-8 flex flex-col sm:flex-row gap-4 shrink-0 justify-end">
                    <button
                        onClick={onClose}
                        className="rounded-full border border-white/20 px-8 py-4 text-xs font-bold text-white transition-all hover:bg-white/5 hover:border-white/40 uppercase tracking-widest font-mono"
                        type="button"
                    >
                        Abort
                    </button>
                    <button
                        form="registration-form"
                        type="submit"
                        disabled={loading}
                        className="group relative overflow-hidden rounded-full bg-[#7B61FF] px-10 py-4 text-xs font-bold text-white transition-transform duration-300 hover:scale-[1.03] uppercase tracking-widest font-mono disabled:opacity-50 disabled:hover:scale-100"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            {loading ? "Transmitting..." : "Execute Sequence"}
                        </span>
                        {!loading && <span className="absolute inset-0 z-0 bg-white/20 translate-y-full transition-transform duration-300 group-hover:translate-y-0"></span>}
                    </button>
                </div>
            </div>
        </div>
    );
}
