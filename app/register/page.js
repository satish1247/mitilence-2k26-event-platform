"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";

export default function RegisterPage() {
    const { register, user } = useAuth();
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        college: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            router.push("/dashboard");
        }
    }, [user, router]);

    if (user) {
        return null;
    }

    const updateField = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const { name, email, phone, college, password, confirmPassword } = formData;

        if (!name || !email || !password) {
            setError("Missing required parameters.");
            return;
        }

        if (password.length < 6) {
            setError("Security key must be at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Security keys do not match.");
            return;
        }

        setLoading(true);
        try {
            await register(email, password, name, phone, college);
            router.push("/dashboard");
        } catch (err) {
            setError(err.message || "Initialization failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center px-4 py-32 bg-[#0A0A14] text-white relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#4FD1C5]/10 blur-[150px] pointer-events-none rounded-full"></div>
            <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-[#7B61FF]/10 blur-[120px] pointer-events-none rounded-full"></div>

            <div className="w-full max-w-[450px] relative z-10">
                <div className="mb-10 text-center">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-[1rem] border border-[#4FD1C5]/30 bg-[#4FD1C5]/10 font-bold text-[#4FD1C5] text-3xl shadow-[0_0_30px_rgba(79,209,197,0.2)] font-mono">
                        M
                    </div>
                    <h1 className="text-3xl font-bold mb-3 tracking-tight font-sans">Establish <span className="text-[#4FD1C5]">Entity Identifier</span></h1>
                    <p className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#E8E8EB]/50">Register to connect with MITILENCE 2K26 network</p>
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-[#111118]/80 backdrop-blur-md p-8 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#7B61FF]/5 blur-[40px] pointer-events-none rounded-full"></div>

                    {error && (
                        <div className="mb-8 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-[10px] font-bold text-red-400 uppercase tracking-widest font-mono text-center shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                            ERR: {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <div className="space-y-5">
                            <div className="space-y-3">
                                <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#4FD1C5] font-mono">Full Designation *</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => updateField("name", e.target.value)}
                                    placeholder="Entity Name"
                                    className="w-full rounded-2xl border border-white/10 bg-[#0A0A14] px-5 py-3.5 text-sm text-white focus:border-[#4FD1C5] focus:outline-none focus:shadow-[0_0_15px_rgba(79,209,197,0.2)] transition-all font-mono placeholder:text-white/20"
                                    required
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#4FD1C5] font-mono">Comms Address *</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => updateField("email", e.target.value)}
                                    placeholder="entity@node.com"
                                    className="w-full rounded-2xl border border-white/10 bg-[#0A0A14] px-5 py-3.5 text-sm text-white focus:border-[#4FD1C5] focus:outline-none focus:shadow-[0_0_15px_rgba(79,209,197,0.2)] transition-all font-mono placeholder:text-white/20"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#E8E8EB]/70 font-mono">Signal Link</label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => updateField("phone", e.target.value)}
                                        placeholder="+91..."
                                        className="w-full rounded-[1.25rem] border border-white/10 bg-[#0A0A14] px-4 py-3 text-sm text-white focus:border-[#4FD1C5] focus:outline-none focus:shadow-[0_0_15px_rgba(79,209,197,0.2)] transition-all font-mono placeholder:text-white/20"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#E8E8EB]/70 font-mono">Affiliation</label>
                                    <input
                                        type="text"
                                        value={formData.college}
                                        onChange={(e) => updateField("college", e.target.value)}
                                        placeholder="Institution Details"
                                        className="w-full rounded-[1.25rem] border border-white/10 bg-[#0A0A14] px-4 py-3 text-sm text-white focus:border-[#4FD1C5] focus:outline-none focus:shadow-[0_0_15px_rgba(79,209,197,0.2)] transition-all font-mono placeholder:text-white/20"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#7B61FF] font-mono">Security Key *</label>
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => updateField("password", e.target.value)}
                                    placeholder="Minimum 6 characters"
                                    className="w-full rounded-2xl border border-white/10 bg-[#0A0A14] px-5 py-3.5 text-sm text-white focus:border-[#7B61FF] focus:outline-none focus:shadow-[0_0_15px_rgba(123,97,255,0.2)] transition-all font-mono placeholder:text-white/20"
                                    required
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#7B61FF] font-mono">Verify Key *</label>
                                <input
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={(e) => updateField("confirmPassword", e.target.value)}
                                    placeholder="Match security key"
                                    className="w-full rounded-2xl border border-white/10 bg-[#0A0A14] px-5 py-3.5 text-sm text-white focus:border-[#7B61FF] focus:outline-none focus:shadow-[0_0_15px_rgba(123,97,255,0.2)] transition-all font-mono placeholder:text-white/20"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full group relative overflow-hidden rounded-[1.5rem] mt-4 bg-[#4FD1C5] px-6 py-4 text-[10px] font-bold text-[#0A0A14] transition-transform duration-300 hover:scale-[1.02] uppercase tracking-[0.2em] font-mono block text-center shadow-[0_0_20px_rgba(79,209,197,0.3)] outline-none disabled:opacity-50 disabled:hover:scale-100"
                        >
                            <span className="relative z-10">{loading ? "Establishing Entity..." : "Initialize Registry Sequence"}</span>
                            <span className="absolute inset-0 z-0 bg-white/30 translate-y-full transition-transform duration-300 group-hover:translate-y-0"></span>
                        </button>
                    </form>

                    <div className="mt-10 text-center text-sm border-t border-white/5 pt-8 relative z-10">
                        <p className="text-[10px] text-[#E8E8EB]/40 font-mono uppercase tracking-widest">
                            Existing Network Member?{" "}
                            <Link href="/login" className="font-bold text-[#7B61FF] hover:text-white transition-colors border-b border-transparent hover:border-white pb-0.5 ml-2">
                                Authenticate Here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
