"use client";

import { CONTACT_INFO, EVENTS } from "@/lib/constants";
import { Phone, MessageSquare, Mail, Terminal } from "lucide-react";

export default function ContactSection() {
    const techEvents = EVENTS.filter(e => e.category === "Technical");
    const nonTechEvents = EVENTS.filter(e => e.category === "Non-Technical");

    const ContactCard = ({ title, staffName, staffPhone, studentName, studentPhone }) => (
        <div className="rounded-[2rem] bg-[#111118] border border-white/5 p-8 flex flex-col justify-between hover:border-[#7B61FF]/30 transition-all duration-300 group relative overflow-hidden">
            {/* Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#7B61FF]/5 blur-[40px] rounded-full pointer-events-none group-hover:bg-[#7B61FF]/10 transition-colors"></div>

            <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-8 font-sans group-hover:text-[#7B61FF] transition-colors">{title}</h3>

                {/* Staff Coordinator */}
                <div className="mb-8">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#E8E8EB]/50 mb-3 font-mono">Staff Node</p>
                    <p className="text-sm font-bold text-white mb-4 font-sans">{staffName}</p>
                    <div className="flex gap-3">
                        <a href={`tel:${staffPhone.replace(/\s/g, '')}`} className="flex-1 py-3 rounded-full bg-[#0A0A14] border border-white/10 text-[10px] font-bold uppercase text-center hover:bg-white/5 hover:border-white/20 transition-all text-[#E8E8EB]/70 hover:text-white flex items-center justify-center gap-2 font-mono tracking-widest">
                            <Phone className="w-3 h-3" /> Voice
                        </a>
                        <a href={`https://wa.me/${staffPhone.replace(/[^\d]/g, '')}`} target="_blank" className="flex-1 py-3 rounded-full bg-[#0A0A14] border border-white/10 text-[10px] font-bold uppercase text-center hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all text-[#E8E8EB]/70 hover:text-emerald-400 flex items-center justify-center gap-2 font-mono tracking-widest">
                            <MessageSquare className="w-3 h-3" /> Text
                        </a>
                    </div>
                </div>

                {/* Student Coordinator */}
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#E8E8EB]/50 mb-3 font-mono">Student Node</p>
                    <p className="text-sm font-bold text-white mb-4 font-sans">{studentName}</p>
                    <div className="flex gap-3">
                        <a href={`tel:${studentPhone.replace(/\s/g, '')}`} className="flex-1 py-3 rounded-full bg-[#0A0A14] border border-white/10 text-[10px] font-bold uppercase text-center hover:bg-white/5 hover:border-white/20 transition-all text-[#E8E8EB]/70 hover:text-white flex items-center justify-center gap-2 font-mono tracking-widest">
                            <Phone className="w-3 h-3" /> Voice
                        </a>
                        <a href={`https://wa.me/${studentPhone.replace(/[^\d]/g, '')}`} target="_blank" className="flex-1 py-3 rounded-full bg-[#0A0A14] border border-white/10 text-[10px] font-bold uppercase text-center hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all text-[#E8E8EB]/70 hover:text-emerald-400 flex items-center justify-center gap-2 font-mono tracking-widest">
                            <MessageSquare className="w-3 h-3" /> Text
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <section className="py-32 bg-[#0A0A14] text-white" id="contact">
            <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-24">
                {/* Header */}
                <div className="mb-24">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 font-sans">
                        Comms <span className="text-[#7B61FF]">Directory</span>
                    </h2>
                    <p className="text-[#E8E8EB]/60 max-w-2xl text-lg font-light leading-relaxed">
                        Department of Robotics & Automation — MITILENCE 2K26. Establish encrypted connections with designated node operators for queries and support.
                    </p>
                </div>

                {/* Overall Coordinator Section */}
                <div className="mb-32">
                    <div className="rounded-[3rem] p-10 md:p-14 border border-[#7B61FF]/20 bg-[#7B61FF]/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12 pointer-events-none">
                            <Terminal className="w-64 h-64 text-[#7B61FF]" />
                        </div>
                        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-12">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#7B61FF] mb-4 block font-mono bg-[#7B61FF]/10 px-3 py-1 w-max rounded-full border border-[#7B61FF]/20">Primary Overseer</span>
                                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 font-sans">{CONTACT_INFO.staff.name}</h3>
                                <p className="text-sm font-bold text-[#E8E8EB]/70 mb-4 uppercase tracking-widest font-mono">Head of Department</p>
                                <p className="text-xs font-light text-[#E8E8EB]/50 mb-8 uppercase tracking-widest leading-loose font-mono">
                                    Department of Robotics & Automation<br />
                                    Manakula Vinayagar Institute of Technology
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center gap-3 text-sm font-mono text-[#E8E8EB]/70">
                                        <Mail className="w-4 h-4 text-[#7B61FF]" /> {CONTACT_INFO.staff.email}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 min-w-[280px]">
                                <a href={`tel:${CONTACT_INFO.staff.phone.replace(/\s/g, '')}`} className="w-full py-5 rounded-full bg-[#7B61FF] text-white text-[10px] font-bold uppercase tracking-widest text-center hover:scale-[1.02] transition-transform shadow-[0_0_30px_rgba(123,97,255,0.3)] font-mono flex items-center justify-center gap-3">
                                    <Phone className="w-4 h-4" /> Open Voice Channel
                                </a>
                                <a href={`https://wa.me/${CONTACT_INFO.staff.phone.replace(/[^\d]/g, '')}`} target="_blank" className="w-full py-5 rounded-full border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 text-[10px] font-bold uppercase tracking-widest text-center hover:bg-emerald-500 hover:text-white transition-all font-mono flex items-center justify-center gap-3">
                                    <MessageSquare className="w-4 h-4" /> Initialize Text Link
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Technical Events */}
                <div className="mb-24">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-px flex-1 bg-white/5"></div>
                        <h3 className="text-sm font-bold text-[#7B61FF] uppercase tracking-[0.2em] font-mono whitespace-nowrap">
                            // Technical Operations
                        </h3>
                        <div className="h-px flex-1 bg-white/5"></div>
                    </div>
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {techEvents.map(event => (
                            <ContactCard
                                key={event.id}
                                title={event.name}
                                staffName={event.staffCoordinator}
                                staffPhone={event.staffPhone}
                                studentName={event.studentCoordinator}
                                studentPhone={event.studentPhone}
                            />
                        ))}
                    </div>
                </div>

                {/* Non-Technical Events */}
                <div className="mb-32">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-px flex-1 bg-white/5"></div>
                        <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-[0.2em] font-mono whitespace-nowrap">
                            // Unregulated Operations
                        </h3>
                        <div className="h-px flex-1 bg-white/5"></div>
                    </div>
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {nonTechEvents.map(event => (
                            <ContactCard
                                key={event.id}
                                title={event.name}
                                staffName={event.staffCoordinator}
                                staffPhone={event.staffPhone}
                                studentName={event.studentCoordinator}
                                studentPhone={event.studentPhone}
                            />
                        ))}
                    </div>
                </div>

                {/* Website Admin Section */}
                <div className="max-w-4xl mx-auto pt-16 border-t border-white/5">
                    <div className="rounded-[2.5rem] p-12 border border-white/5 bg-[#111118] text-center relative overflow-hidden">
                        <div className="relative z-10">
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#E8E8EB]/50 mb-6 block font-mono">System Architect</span>
                            <h3 className="text-2xl font-bold text-white mb-3 font-sans w-max mx-auto bg-gradient-to-r from-white to-white/50 text-transparent bg-clip-text pb-1">{CONTACT_INFO.webManager.name}</h3>
                            <p className="text-xs font-light text-[#E8E8EB]/50 mb-10 max-w-sm mx-auto leading-relaxed">For anomalies in system architecture or transaction ledgers, initiate contact sequence below.</p>

                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <a href={`tel:${CONTACT_INFO.webManager.phone.replace(/\s/g, '')}`} className="px-10 py-5 rounded-full bg-[#0A0A14] border border-white/10 text-[10px] font-bold uppercase tracking-widest hover:border-white/30 hover:bg-white/5 transition-all text-[#E8E8EB]/70 hover:text-white font-mono flex items-center justify-center gap-3">
                                    <Phone className="w-4 h-4" /> System Link
                                </a>
                                <a href={`mailto:${CONTACT_INFO.webManager.email}`} className="px-10 py-5 rounded-full bg-[#0A0A14] border border-white/10 text-[10px] font-bold uppercase tracking-widest hover:border-[#7B61FF]/50 hover:bg-[#7B61FF]/5 hover:text-[#7B61FF] transition-all text-[#E8E8EB]/70 font-mono flex items-center justify-center gap-3">
                                    <Mail className="w-4 h-4" /> Data Packet
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
