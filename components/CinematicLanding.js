"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Terminal, Database, Shield, MoveRight, ChevronRight, Activity, Smartphone, MousePointer2, ArrowRight, Focus, Zap } from 'lucide-react';
import { EVENTS } from '@/lib/constants';

import CountdownTimer from '@/components/CountdownTimer';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// -------------------------------------------------------------------------------- //
// PRESET D — VAPOR CLINIC: DESIGN SYSTEM TOKENS
// -------------------------------------------------------------------------------- //
const THEME = {
    primary: '#0A0A14', // Deep Void
    accent: '#7B61FF',  // Plasma
    background: '#F0EFF4', // Ghost (Light variant)
    textDark: '#18181B', // Graphite
    textLight: '#E8E8EB',

    fontHeading: '"Sora", sans-serif',
    fontDrama: '"Instrument Serif", serif',
    fontData: '"Fira Code", monospace',
};

// SVG Noise Filter Overlay
const NoiseOverlay = () => (
    <svg className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03] mix-blend-overlay">
        <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
);

// -------------------------------------------------------------------------------- //
// 1. FLOATING CINEMATIC NAVBAR
// -------------------------------------------------------------------------------- //
const CinematicNavbar = () => {
    const navRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(navRef.current, {
                scrollTrigger: {
                    trigger: "body",
                    start: "top -50px",
                    end: "top -50px",
                    onEnter: () => navRef.current.classList.add('bg-[#0A0A14]/80', 'backdrop-blur-xl', 'border-white/10'),
                    onLeaveBack: () => navRef.current.classList.remove('bg-[#0A0A14]/80', 'backdrop-blur-xl', 'border-white/10'),
                }
            });
        });
        return () => ctx.revert();
    }, []);

    return (
        <nav ref={navRef} className="fixed top-4 left-1/2 -translate-x-1/2 z-40 flex w-[95%] max-w-5xl items-center justify-between rounded-full border border-transparent px-6 py-3 transition-all duration-500">
            <div className="flex items-center gap-2 text-white" style={{ fontFamily: THEME.fontHeading }}>
                <Link href="/" className="flex items-center gap-2">
                    <span className="font-extrabold tracking-tight text-lg">MITILENCE</span>
                    <span className="text-xs font-medium text-[#7B61FF] bg-[#7B61FF]/10 px-2 py-0.5 rounded-full font-mono">2K26</span>
                </Link>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#E8E8EB]/70 font-sans">
                <Link href="/" className="hover:text-white transition-colors duration-300 transform hover:-translate-y-[1px]">Home</Link>
                <Link href="/events" className="hover:text-white transition-colors duration-300 transform hover:-translate-y-[1px]">Events</Link>
                <Link href="/gallery" className="hover:text-white transition-colors duration-300 transform hover:-translate-y-[1px]">Gallery</Link>
                <Link href="/contact" className="hover:text-white transition-colors duration-300 transform hover:-translate-y-[1px]">Contact</Link>
            </div>
            <Link href="/register" className="group relative overflow-hidden rounded-full bg-[#7B61FF] px-6 py-2.5 text-sm font-bold text-white transition-transform duration-300 hover:scale-[1.03]" style={{ fontFamily: THEME.fontHeading }}>
                <span className="relative z-10 flex items-center gap-2">
                    Register
                    <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 z-0 bg-white/20 translate-y-full transition-transform duration-300 group-hover:translate-y-0"></span>
            </Link>
        </nav>
    );
};

// -------------------------------------------------------------------------------- //
// 2. HERO SECTION
// -------------------------------------------------------------------------------- //
const HeroSection = () => {
    const heroRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.hero-element', {
                y: 40,
                opacity: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: 'power3.out',
                delay: 0.2
            });
        }, heroRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0A0A14] py-32 px-6">
            {/* Background Image with Gradient Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop"
                    alt="Bioluminescence lab"
                    className="h-full w-full object-cover opacity-50 mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A14] via-[#0A0A14]/90 to-[#0A0A14]/80"></div>
                <div className="absolute inset-0 bg-[#7B61FF]/10 mix-blend-color"></div>
            </div>

            <div className="relative z-10 w-full max-w-5xl text-center">
                <div className="hero-element mb-10">
                    <p className="text-sm md:text-lg font-bold uppercase tracking-[0.4em] text-[#E8E8EB]/70 font-sans" style={{ letterSpacing: '0.5em' }}>
                        Manakula Vinayagar Institute of Technology
                    </p>
                </div>

                <div className="hero-element mb-6">
                    <h1 className="flex flex-col items-center leading-[0.85]">
                        <span className="text-6xl md:text-9xl lg:text-[12rem] font-bold tracking-tighter text-white" style={{ fontFamily: THEME.fontHeading }}>
                            MITILENCE
                        </span>
                        <span className="text-7xl md:text-[10rem] lg:text-[13rem] text-[#7B61FF] lowercase tracking-tight -mt-4" style={{ fontFamily: THEME.fontDrama }}>
                            2k26.
                        </span>
                    </h1>
                </div>

                <div className="hero-element mb-8">
                    <h2 className="text-3xl md:text-5xl font-bold text-[#4FD1C5] tracking-tight mb-2 uppercase" style={{ fontFamily: THEME.fontHeading }}>
                        ROBOZEN
                    </h2>
                    <h3 className="text-lg md:text-2xl text-[#E8E8EB]/80 font-sans tracking-wide">
                        Department of Robotics & Automation
                    </h3>
                    <p className="text-sm md:text-lg text-[#E8E8EB]/50 font-sans tracking-[0.2em] uppercase mt-2">
                        National Level Technical Symposium
                    </p>
                </div>

                <div className="hero-element flex flex-col items-center gap-8 mb-12">
                    <div className="flex items-center gap-4 text-xs md:text-sm font-mono tracking-widest text-[#E8E8EB] uppercase border-y border-white/10 py-3 px-6">
                        <span>14 March 2026</span>
                        <span className="text-white/20">|</span>
                        <span>Puducherry</span>
                    </div>
                </div>

                <div className="hero-element max-w-2xl mx-auto mb-16 scale-90 md:scale-100">
                    <CountdownTimer targetDate="2026-03-14T09:00:00" />
                </div>

                <div className="hero-element flex flex-wrap justify-center gap-6">
                    <Link href="#events" className="group relative overflow-hidden rounded-[2rem] bg-white px-10 py-5 text-sm font-bold text-[#0A0A14] transition-transform duration-300 hover:scale-[1.03] shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                        <span className="relative z-10">View Events</span>
                        <span className="absolute inset-0 z-0 bg-[#F0EFF4] translate-y-full transition-transform duration-300 group-hover:translate-y-0"></span>
                    </Link>
                    <Link href="/register" className="group relative overflow-hidden rounded-[2rem] bg-[#7B61FF] px-10 py-5 text-sm font-bold text-white transition-all duration-300 hover:scale-[1.03] shadow-[0_0_30px_rgba(123,97,255,0.25)]">
                        <span className="relative z-10 flex items-center gap-2">
                            Register Now <MoveRight className="w-5 h-5" />
                        </span>
                        <span className="absolute inset-0 z-0 bg-white/20 translate-y-full transition-transform duration-300 group-hover:translate-y-0"></span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

// -------------------------------------------------------------------------------- //
// 3. FEATURES (INTERACTIVE ARTIFACTS)
// -------------------------------------------------------------------------------- //
const FeaturesSection = () => {
    const sectionRef = useRef(null);

    // Telemetry Typewriter State
    const [typedText, setTypedText] = useState("");
    const message = "IDENTIFYING INNOVATION PATTERNS... ANALYZING ROBOTICS PROTOTYPES... OPTIMIZING MECHANISMS...";

    useEffect(() => {
        let currentString = "";
        let i = 0;
        const interval = setInterval(() => {
            currentString += message.charAt(i);
            setTypedText(currentString);
            i++;
            if (i >= message.length) {
                i = 0;
                currentString = "";
            }
        }, 100);
        return () => clearInterval(interval);
    }, []);

    // Diagnostic Shuffler State
    const [cards, setCards] = useState(["Robo Race", "Tug of Bot", "Robo Soccer"]);
    useEffect(() => {
        const interval = setInterval(() => {
            setCards(prev => {
                const newCards = [...prev];
                const last = newCards.pop();
                newCards.unshift(last);
                return newCards;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // GSAP Animation
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".feature-card", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                },
                y: 50,
                opacity: 0,
                stagger: 0.15,
                duration: 1,
                ease: "power3.out"
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="bg-[#0A0A14] py-32 px-6 md:px-12 lg:px-24">
            <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Card 1: Diagnostic Shuffler */}
                <div className="feature-card group relative h-[400px] rounded-[2.5rem] bg-[#111118] border border-white/5 p-8 overflow-hidden shadow-2xl transition-all duration-500 hover:border-[#7B61FF]/30 hover:shadow-[#7B61FF]/10">
                    <div className="absolute top-8 left-8 text-[#7B61FF]">
                        <Database className="w-6 h-6" />
                    </div>
                    <div className="mt-16 relative h-[150px] w-full flex flex-col items-center justify-center perspective-1000">
                        {cards.map((c, i) => (
                            <div
                                key={c}
                                className={`absolute w-4/5 rounded-2xl border border-white/10 bg-[#18181B] p-4 text-center text-sm font-medium text-white transition-all duration-700 ease-in-out`}
                                style={{
                                    transform: `translateY(${i * 15}px) scale(${1 - i * 0.05})`,
                                    zIndex: 10 - i,
                                    opacity: 1 - i * 0.3,
                                    fontFamily: THEME.fontData
                                }}
                            >
                                / competition / {c.toLowerCase()}
                            </div>
                        ))}
                    </div>
                    <div className="absolute bottom-8 left-8 right-8">
                        <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: THEME.fontHeading }}>Robotics Competitions</h3>
                        <p className="text-sm text-[#E8E8EB]/60">National-level technical events for engineering students.</p>
                    </div>
                </div>

                {/* Card 2: Telemetry Typewriter */}
                <div className="feature-card group relative h-[400px] rounded-[2.5rem] bg-[#111118] border border-white/5 p-8 overflow-hidden shadow-2xl transition-all duration-500 hover:border-[#7B61FF]/30 hover:shadow-[#7B61FF]/10">
                    <div className="absolute top-8 left-8 right-8 flex justify-between items-center text-[#7B61FF]">
                        <Terminal className="w-6 h-6" />
                        <div className="flex items-center gap-2">
                            <span className="animate-pulse h-2 w-2 rounded-full bg-[#7B61FF]"></span>
                            <span className="text-[10px] uppercase font-bold tracking-widest text-[#7B61FF]" style={{ fontFamily: THEME.fontData }}>Live Feed</span>
                        </div>
                    </div>
                    <div className="mt-16 h-[150px] w-full rounded-2xl bg-[#0A0A14] p-4 font-mono text-xs text-[#7B61FF] font-medium border border-white/5 shadow-inner overflow-hidden flex items-start" style={{ fontFamily: THEME.fontData }}>
                        <p>{typedText}<span className="animate-pulse">_</span></p>
                    </div>
                    <div className="absolute bottom-8 left-8 right-8">
                        <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: THEME.fontHeading }}>Innovation Challenges</h3>
                        <p className="text-sm text-[#E8E8EB]/60">Hands-on problems involving racing, combat, and research.</p>
                    </div>
                </div>

                {/* Card 3: Cursor Protocol Scheduler */}
                <div className="feature-card group relative h-[400px] rounded-[2.5rem] bg-[#111118] border border-white/5 p-8 overflow-hidden shadow-2xl transition-all duration-500 hover:border-[#7B61FF]/30 hover:shadow-[#7B61FF]/10">
                    <div className="absolute top-8 left-8 text-[#7B61FF]">
                        <Shield className="w-6 h-6" />
                    </div>
                    <div className="mt-16 h-[150px] w-full grid grid-cols-4 grid-rows-3 gap-2 relative">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className={`rounded-xl border border-white/5 transition-colors duration-500 ${i === 5 ? 'bg-[#7B61FF]/20 border-[#7B61FF]/50 animate-pulse' : 'bg-[#0A0A14]'}`}></div>
                        ))}
                        <MousePointer2 className="absolute text-white w-5 h-5 drop-shadow-lg z-10 transition-all duration-1000 ease-in-out" style={{
                            top: '40%', left: '40%', transform: 'translate(-50%, -50%)',
                            animation: 'cursorMove 4s infinite cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                        }} />
                        <style>{`
                            @keyframes cursorMove {
                                0% { top: 80%; left: 80%; }
                                20% { top: 40%; left: 40%; }
                                30% { top: 40%; left: 40%; transform: scale(0.9); }
                                40% { top: 40%; left: 40%; transform: scale(1); }
                                70% { top: 10%; left: 10%; }
                                100% { top: 80%; left: 80%; }
                            }
                        `}</style>
                    </div>
                    <div className="absolute bottom-8 left-8 right-8">
                        <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: THEME.fontHeading }}>Technology Collaboration</h3>
                        <p className="text-sm text-[#E8E8EB]/60">Connecting enthusiasts, researchers, and innovators seamlessly.</p>
                    </div>
                </div>

            </div>
        </section>
    );
};

// -------------------------------------------------------------------------------- //
// 4. EVENTS SECTION (FUTURISTIC UI)
// -------------------------------------------------------------------------------- //
const EventCardComponent = ({ event }) => (
    <div className="group relative overflow-hidden rounded-[2.5rem] bg-[#111118] border border-white/5 transition-all duration-500 hover:border-[#7B61FF]/30 hover:-translate-y-2">
        <div className="p-8 h-full flex flex-col justify-between relative z-10">
            <div>
                <div className="flex justify-between items-start mb-6">
                    <span className={`px-3 py-1 text-[10px] uppercase font-bold tracking-widest rounded-full ${event.category === 'Technical' ? 'bg-[#7B61FF]/10 text-[#7B61FF] border border-[#7B61FF]/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`} style={{ fontFamily: THEME.fontData }}>
                        {event.category}
                    </span>
                    <span className="text-2xl opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all">{event.icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: THEME.fontHeading }}>{event.name}</h3>
                <p className="text-sm text-[#E8E8EB]/60 line-clamp-3 mb-6 font-light leading-relaxed">{event.description}</p>
            </div>

            <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                <div className="flex flex-col gap-1 text-xs text-[#E8E8EB]/50" style={{ fontFamily: THEME.fontData }}>
                    <span>TEAM: {event.teamSizeMin}-{event.teamSizeMax}</span>
                    <span className={event.fee === 0 ? "text-emerald-400 font-bold" : "text-[#7B61FF] font-bold"}>
                        {event.fee === 0 ? "FEE: FREE ENTRY" : `FEE: ₹${event.fee}`}
                    </span>
                </div>
                <Link href={`/events/${event.id}`} className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 text-white transition-all duration-300 group-hover:bg-[#7B61FF] group-hover:text-white">
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>

        {/* Hover Gradient Effect */}
        <div className="absolute -inset-0 bg-gradient-to-br from-[#7B61FF]/0 via-transparent to-[#7B61FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-0"></div>
    </div>
);

const EventsSection = () => {
    return (
        <section id="events" className="bg-[#0A0A14] py-32 px-6 md:px-12 lg:px-24">
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: THEME.fontHeading }}>Event Roster</h2>
                        <p className="text-lg text-[#E8E8EB]/60 max-w-lg font-light leading-relaxed">Discover a spectrum of challenges designed to test precision, logic, and raw engineering talent.</p>
                    </div>
                    <Link href="/events" className="hidden md:inline-flex items-center gap-2 text-sm font-bold text-[#7B61FF] uppercase tracking-widest hover:text-white transition-colors" style={{ fontFamily: THEME.fontData }}>
                        [ View Full Catalog ] <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {EVENTS.map(event => (
                        <EventCardComponent key={event.id} event={event} />
                    ))}
                </div>
            </div>
        </section>
    );
};

// -------------------------------------------------------------------------------- //
// 5. PHILOSOPHY / MANIFESTO SECTION
// -------------------------------------------------------------------------------- //
const PhilosophySection = () => {
    const philRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".phil-text", {
                scrollTrigger: {
                    trigger: philRef.current,
                    start: "top 60%",
                },
                y: 30,
                opacity: 0,
                stagger: 0.2,
                duration: 1.2,
                ease: "power2.out"
            });
        }, philRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={philRef} className="relative bg-[#0A0A14] py-40 overflow-hidden flex items-center justify-center border-y border-white/5">
            <div className="absolute inset-0 opacity-20">
                <img
                    src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop"
                    alt="Circuit board texture"
                    className="w-full h-full object-cover mix-blend-screen grayscale"
                />
            </div>

            <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
                <p className="phil-text text-lg md:text-2xl text-[#E8E8EB]/60 font-light tracking-wide mb-6" style={{ fontFamily: THEME.fontHeading }}>
                    Most technical events focus on participation.
                </p>
                <div className="phil-text text-5xl md:text-7xl lg:text-[6rem] leading-[1.1] text-white">
                    <span style={{ fontFamily: THEME.fontHeading }} className="font-bold block">We focus on innovation,</span>
                    <span style={{ fontFamily: THEME.fontDrama }} className="italic lowercase block text-transparent bg-clip-text bg-gradient-to-r from-[#7B61FF] to-[#b3a1ff]">robotics excellence</span>
                    <span style={{ fontFamily: THEME.fontHeading }} className="font-bold block">& future technology.</span>
                </div>
            </div>
        </section>
    );
};

// -------------------------------------------------------------------------------- //
// 6. PROTOCOL SECTION (STICKY STACKING)
// -------------------------------------------------------------------------------- //
const ProtocolSection = () => {
    const containerRef = useRef(null);
    const steps = [
        { num: '01', title: 'Register your team', desc: 'Secure your spot in the symposium lineup. Gather your best engineers and strategists.', icon: <Activity className="w-12 h-12 text-[#7B61FF]" /> },
        { num: '02', title: 'Build your innovation', desc: 'Design, code, and assemble your robotics prototypes adhering to the strict physics guidelines.', icon: <Database className="w-12 h-12 text-[#7B61FF]" /> },
        { num: '03', title: 'Compete & showcase', desc: 'Enter the arena. Outmaneuver opponents, present research, and claim victory.', icon: <Focus className="w-12 h-12 text-[#7B61FF]" /> },
    ];

    return (
        <section id="protocol" ref={containerRef} className="bg-[#0A0A14] py-32 px-6 md:px-12 lg:px-24">
            <div className="mx-auto max-w-4xl">
                <div className="mb-20 text-center">
                    <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-[#7B61FF] mb-4" style={{ fontFamily: THEME.fontData }}>
                        // The Protocol
                    </h2>
                    <p className="text-3xl md:text-5xl font-bold text-white" style={{ fontFamily: THEME.fontHeading }}>
                        Method of Engagement
                    </p>
                </div>

                <div className="flex flex-col gap-8">
                    {steps.map((step, idx) => (
                        <div key={idx} className="sticky top-24 w-full rounded-[3rem] bg-[#111118] border border-white/10 p-12 md:p-16 shadow-2xl overflow-hidden transition-all duration-500 hover:border-[#7B61FF]/30" style={{ zIndex: idx }}>
                            <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
                                <div className="flex-1">
                                    <span className="text-xs font-bold uppercase tracking-widest text-[#7B61FF]/50 border-b border-[#7B61FF]/20 pb-2 mb-8 inline-block" style={{ fontFamily: THEME.fontData }}>Step {step.num}</span>
                                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: THEME.fontHeading }}>{step.title}</h3>
                                    <p className="text-lg text-[#E8E8EB]/60 leading-relaxed font-light max-w-md">{step.desc}</p>
                                </div>
                                <div className="h-40 w-40 flex items-center justify-center rounded-full border border-white/5 bg-[#0A0A14]">
                                    {step.icon}
                                </div>
                            </div>

                            {/* Decorative Background Element */}
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[15rem] font-bold text-white/[0.02] pointer-events-none" style={{ fontFamily: THEME.fontData }}>
                                {step.num}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// -------------------------------------------------------------------------------- //
// 7. REGISTRATION CTA SECTION
// -------------------------------------------------------------------------------- //
const RegistrationCTA = () => {
    return (
        <section className="bg-[#0A0A14] py-32 px-6 md:px-12">
            <div className="mx-auto max-w-6xl rounded-[3rem] bg-gradient-to-br from-[#111118] to-[#0A0A14] border border-[#7B61FF]/20 p-12 md:p-24 text-center relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-[#7B61FF] to-transparent opacity-50"></div>

                <div className="relative z-10 flex flex-col items-center">
                    <Zap className="w-12 h-12 text-[#7B61FF] mb-8 animate-pulse" />
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: THEME.fontHeading }}>
                        Initialize Registration
                    </h2>
                    <p className="max-w-xl text-lg text-[#E8E8EB]/60 mb-12 font-light leading-relaxed">
                        Join elite engineering talent from across the nation. Secure your place at the most anticipated robotics symposium.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6">
                        <Link href="/register" className="group relative overflow-hidden rounded-[2rem] bg-[#7B61FF] px-10 py-5 text-sm font-bold text-white transition-transform hover:scale-[1.03]" style={{ fontFamily: THEME.fontHeading }}>
                            <span className="relative z-10 flex items-center gap-2">
                                Register Now <ChevronRight className="w-5 h-5" />
                            </span>
                            <span className="absolute inset-0 z-0 bg-white/20 translate-y-full transition-transform duration-300 group-hover:translate-y-0"></span>
                        </Link>
                        <Link href="#events" className="group rounded-[2rem] border border-white/20 px-10 py-5 text-sm font-bold text-white transition-all hover:bg-white/5 hover:border-white/40" style={{ fontFamily: THEME.fontHeading }}>
                            View Events
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

// -------------------------------------------------------------------------------- //
// 8 & 9. FOOTER & CONTACT
// -------------------------------------------------------------------------------- //
const CinematicFooter = () => {
    return (
        <footer id="contact" className="bg-[#111118] rounded-t-[4rem] px-6 md:px-12 lg:px-24 pt-24 pb-12 mt-20 relative overflow-hidden border-t border-white/5 font-sans">
            <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">

                {/* Brand Column */}
                <div className="col-span-1 md:col-span-5 flex flex-col justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-white tracking-tighter mb-4" style={{ fontFamily: THEME.fontHeading }}>MITILENCE 2K26</h2>
                        <p className="text-[#E8E8EB]/60 text-sm max-w-sm leading-relaxed mb-4">
                            Manakula Vinayagar Institute of Technology
                        </p>
                        <p className="text-[#E8E8EB]/40 text-xs leading-relaxed mb-8 font-mono">
                            Department of Robotics & Automation // ROBOZEN
                        </p>
                    </div>

                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 w-max mt-auto">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 font-mono">
                            System Operational
                        </span>
                    </div>
                </div>

                {/* Contact Sub-column */}
                <div className="col-span-1 md:col-span-4">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#7B61FF] mb-8 font-mono">Coordinator Contact</h3>
                    <div className="text-white mb-6">
                        <p className="font-bold text-lg mb-1" style={{ fontFamily: THEME.fontHeading }}>Dr. V. Govindan</p>
                        <p className="text-sm text-[#E8E8EB]/60 mb-1">Associate Professor & Head of Department</p>
                        <p className="text-sm text-[#E8E8EB]/40">Robotics & Automation</p>
                        <a href="mailto:hodra@vmit.edu.in" className="text-[#7B61FF] text-sm mt-4 inline-block hover:underline font-mono">hodra@vmit.edu.in</a>
                    </div>
                    <div className="flex gap-4">
                        <a href="tel:+917904788969" className="flex items-center justify-center p-3 rounded-full border border-white/10 hover:bg-[#7B61FF] hover:border-[#7B61FF] hover:text-white transition-all text-[#E8E8EB]/60">
                            <Smartphone className="w-5 h-5" />
                        </a>
                        <a href="https://wa.me/917904788969" className="flex items-center justify-center px-6 py-3 rounded-full border border-white/10 hover:bg-emerald-500 hover:border-emerald-500 hover:text-white transition-all text-xs font-bold uppercase tracking-widest text-[#E8E8EB]/60">
                            WhatsApp
                        </a>
                    </div>
                </div>

                {/* Nav Column */}
                <div className="col-span-1 md:col-span-3">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#7B61FF] mb-8 font-mono">Nav Nodes</h3>
                    <ul className="flex flex-col gap-4 text-sm text-[#E8E8EB]/60" style={{ fontFamily: THEME.fontHeading }}>
                        <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                        <li><Link href="/events" className="hover:text-white transition-colors">Events</Link></li>
                        <li><Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
                        <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                        <li><Link href="/register" className="hover:text-white transition-colors text-[#7B61FF] font-bold">Register Now</Link></li>
                    </ul>
                </div>

            </div>

            <div className="mx-auto max-w-7xl pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-[10px] text-[#E8E8EB]/40 font-mono tracking-widest uppercase" style={{ fontFamily: THEME.fontData }}>
                <p>© 2026 MANAKULA VINAYAGAR INSTITUTE OF TECHNOLOGY. ALL RIGHTS RESERVED.</p>
                <div className="mt-4 md:mt-0">TRANSMISSION ENCRYPTED</div>
            </div>
        </footer>
    );
};

// -------------------------------------------------------------------------------- //
// MAIN ENTRY
// -------------------------------------------------------------------------------- //
export default function CinematicLanding() {
    return (
        <div className="relative min-h-screen bg-[#0A0A14] text-white selection:bg-[#7B61FF]/30 selection:text-white">
            <NoiseOverlay />
            <CinematicNavbar />

            <main>
                <HeroSection />
                <FeaturesSection />
                <EventsSection />
                <PhilosophySection />
                <ProtocolSection />
                <RegistrationCTA />
            </main>

            <CinematicFooter />
        </div>
    );
}
