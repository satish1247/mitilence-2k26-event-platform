"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";
import Loader from "@/components/Loader";

function LoginForm() {
    const { login, loginWithGoogle, sendOtp, user } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect") || "/dashboard";

    const [activeTab, setActiveTab] = useState("email"); // email, phone, google
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [confirmationResult, setConfirmationResult] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);

    // Redirect if already logged in
    useEffect(() => {
        if (user) {
            router.push(redirect);
        }
    }, [user, redirect, router]);

    if (user) {
        return null;
    }

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setError("");
        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }
        setLoading(true);
        try {
            await login(email, password);
            router.push(redirect);
        } catch (err) {
            setError("Invalid credentials.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError("");
        setLoading(true);
        try {
            await loginWithGoogle();
            router.push(redirect);
        } catch (err) {
            setError(err.message || "Google auth failed.");
        } finally {
            setLoading(false);
        }
    };

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setError("");
        if (!phone || phone.length < 10) {
            setError("Enter valid mobile ID.");
            return;
        }
        setLoading(true);
        try {
            // Ensure phone has +91 prefix if not present
            const formattedPhone = phone.startsWith("+") ? phone : `+91${phone}`;
            const result = await sendOtp(formattedPhone, "recaptcha-container");
            setConfirmationResult(result);
            setOtpSent(true);
        } catch (err) {
            setError(err.message || "Signal failure.");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError("");
        if (!otp || otp.length < 6) {
            setError("Enter 6-digit key.");
            return;
        }
        setLoading(true);
        try {
            await confirmationResult.confirm(otp);
            router.push(redirect);
        } catch (err) {
            setError("Invalid key.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-12 bg-[#0A0A14] text-white overflow-hidden relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#7B61FF]/10 blur-[100px] pointer-events-none rounded-full"></div>

            <div className="w-full max-w-[420px] relative z-10">
                <div className="mb-10 text-center">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-[1rem] border border-[#7B61FF]/30 bg-[#7B61FF]/10 font-bold text-white text-3xl shadow-[0_0_30px_rgba(123,97,255,0.2)] font-mono">
                        M
                    </div>
                    <h1 className="text-3xl font-bold mb-3 tracking-tight font-sans">Initialize <span className="text-[#7B61FF]">Session</span></h1>
                    <p className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#E8E8EB]/50">Awaiting user authentication protocol</p>
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-[#111118]/80 backdrop-blur-md p-8 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#4FD1C5]/5 blur-[40px] pointer-events-none rounded-full"></div>

                    {error && (
                        <div className="mb-8 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-[10px] font-bold text-red-400 uppercase tracking-widest font-mono text-center shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                            ERR: {error}
                        </div>
                    )}

                    {/* Tab Switcher */}
                    <div className="mb-10 grid grid-cols-3 gap-2 bg-[#0A0A14] p-1.5 rounded-[1rem] border border-white/5 relative z-10">
                        {[
                            { id: "email", label: "Email" },
                            { id: "phone", label: "Signal" },
                            { id: "google", label: "G-Link" },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => { setActiveTab(tab.id); setError(""); }}
                                className={`py-3 text-[9px] font-bold uppercase tracking-[0.15em] rounded-lg transition-all font-mono ${activeTab === tab.id
                                    ? "bg-[#7B61FF] text-white shadow-[0_0_15px_rgba(123,97,255,0.3)]"
                                    : "text-[#E8E8EB]/50 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Email Login Form */}
                    {activeTab === "email" && (
                        <form onSubmit={handleEmailLogin} className="space-y-6 relative z-10">
                            <div className="space-y-3">
                                <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#7B61FF] font-mono">Identify Protocol</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="user@node.com"
                                    className="w-full rounded-2xl border border-white/10 bg-[#0A0A14] px-5 py-4 text-sm text-white focus:border-[#7B61FF] focus:outline-none focus:shadow-[0_0_15px_rgba(123,97,255,0.2)] transition-all font-mono placeholder:text-white/20"
                                />
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-end">
                                    <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#7B61FF] font-mono">Security Key</label>
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full rounded-2xl border border-white/10 bg-[#0A0A14] px-5 py-4 text-sm text-white focus:border-[#7B61FF] focus:outline-none focus:shadow-[0_0_15px_rgba(123,97,255,0.2)] transition-all font-mono placeholder:text-white/20"
                                />
                            </div>
                            <button disabled={loading} className="w-full group relative overflow-hidden rounded-[1.5rem] bg-[#7B61FF] px-6 py-4 text-[10px] font-bold text-white transition-transform duration-300 hover:scale-[1.02] uppercase tracking-[0.2em] font-mono block text-center shadow-[0_0_20px_rgba(123,97,255,0.3)] outline-none disabled:opacity-50 disabled:hover:scale-100">
                                <span className="relative z-10">{loading ? "Establishing Link..." : "Execute Sequence"}</span>
                                <span className="absolute inset-0 z-0 bg-white/20 translate-y-full transition-transform duration-300 group-hover:translate-y-0"></span>
                            </button>
                        </form>
                    )}

                    {/* Phone Login Form */}
                    {activeTab === "phone" && (
                        <div className="space-y-6 relative z-10">
                            {!otpSent ? (
                                <form onSubmit={handleSendOtp} className="space-y-6">
                                    <div className="space-y-3">
                                        <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-400 font-mono">Mobile Uplink</label>
                                        <div className="flex gap-2">
                                            <span className="flex items-center justify-center px-4 rounded-2xl border border-white/10 bg-[#0A0A14] text-sm font-bold text-emerald-500 font-mono">+91</span>
                                            <input
                                                type="tel"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                                placeholder="9876543210"
                                                className="flex-1 rounded-2xl border border-white/10 bg-[#0A0A14] px-5 py-4 text-sm text-white focus:border-emerald-500 focus:outline-none focus:shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all font-mono placeholder:text-white/20"
                                            />
                                        </div>
                                    </div>
                                    <button disabled={loading} className="w-full group relative overflow-hidden rounded-[1.5rem] bg-emerald-500 px-6 py-4 text-[10px] font-bold text-[#0A0A14] transition-transform duration-300 hover:scale-[1.02] uppercase tracking-[0.2em] font-mono block text-center shadow-[0_0_20px_rgba(16,185,129,0.3)] outline-none disabled:opacity-50 disabled:hover:scale-100">
                                        <span className="relative z-10">{loading ? "Transmitting..." : "Send Verification Pulse"}</span>
                                        <span className="absolute inset-0 z-0 bg-white/30 translate-y-full transition-transform duration-300 group-hover:translate-y-0"></span>
                                    </button>
                                </form>
                            ) : (
                                <form onSubmit={handleVerifyOtp} className="space-y-6">
                                    <div className="space-y-3">
                                        <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-400 font-mono text-center block">Enter 6-Digit Verification</label>
                                        <input
                                            type="text"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                            placeholder="••••••"
                                            className="w-full text-center tracking-[1em] rounded-2xl border border-white/10 bg-[#0A0A14] px-5 py-4 text-2xl font-black text-white focus:border-emerald-500 focus:outline-none focus:shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all font-mono placeholder:text-white/10"
                                        />
                                        <p className="text-[8px] text-[#E8E8EB]/40 text-center font-mono uppercase tracking-widest mt-2">Pulse sent to +91 {phone}</p>
                                    </div>
                                    <button disabled={loading} className="w-full group relative overflow-hidden rounded-[1.5rem] bg-emerald-500 px-6 py-4 text-[10px] font-bold text-[#0A0A14] transition-transform duration-300 hover:scale-[1.02] uppercase tracking-[0.2em] font-mono block text-center shadow-[0_0_20px_rgba(16,185,129,0.3)] outline-none disabled:opacity-50 disabled:hover:scale-100">
                                        <span className="relative z-10">{loading ? "Validating..." : "Verify & Complete Link"}</span>
                                        <span className="absolute inset-0 z-0 bg-white/30 translate-y-full transition-transform duration-300 group-hover:translate-y-0"></span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => { setOtpSent(false); setOtp(""); }}
                                        className="w-full text-[9px] font-bold text-[#E8E8EB]/50 uppercase tracking-[0.2em] hover:text-white transition-colors"
                                    >
                                        [ Retarget Uplink ]
                                    </button>
                                </form>
                            )}
                            <div id="recaptcha-container"></div>
                        </div>
                    )}

                    {/* Google Login Section */}
                    {activeTab === "google" && (
                        <div className="space-y-8 text-center py-6 relative z-10">
                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#0A0A14] border border-[#4FD1C5]/30 shadow-[0_0_30px_rgba(79,209,197,0.1)]">
                                <svg className="h-8 w-8" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-xl font-bold font-sans">G-Net Protocol</h3>
                                <p className="text-[10px] text-[#E8E8EB]/50 font-mono uppercase tracking-widest">Utilize Google Matrix for Instant Auth</p>
                            </div>
                            <button
                                onClick={handleGoogleLogin}
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-4 rounded-[1.5rem] border border-[#4FD1C5]/30 bg-[#0A0A14] py-4 px-6 text-[10px] font-bold text-white hover:border-[#4FD1C5] hover:shadow-[0_0_20px_rgba(79,209,197,0.2)] transition-all active:scale-[0.98] uppercase tracking-[0.2em] font-mono"
                            >
                                {loading ? "Handshaking..." : "Connect via G-Net"}
                            </button>
                        </div>
                    )}

                    <div className="mt-10 text-center border-t border-white/5 pt-8 relative z-10">
                        <p className="text-[10px] text-[#E8E8EB]/40 font-mono uppercase tracking-widest">
                            Non-registered Entity?{" "}
                            <Link href="/register" className="font-bold text-[#4FD1C5] hover:text-white transition-colors border-b border-transparent hover:border-white pb-0.5 ml-2">
                                Request Access
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<Loader text="Loading..." />}>
            <LoginForm />
        </Suspense>
    );
}
