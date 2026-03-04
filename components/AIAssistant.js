"use client";

import { useState, useRef, useEffect } from "react";

export default function AIAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: "assistant", content: "Hi! I'm the MITILENCE AI Assistant. How can I help you today?" }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async (e) => {
        if (e) e.preventDefault();
        if (!input.trim() || loading) return;

        const userMessage = input.trim();
        setInput("");
        setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
        setLoading(true);

        try {
            const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;

            if (!apiKey) {
                throw new Error("API Key missing");
            }

            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`,
                    "HTTP-Referer": "https://mtience-2k26.web.app",
                    "X-Title": "MITILENCE 2K26 Assistant"
                },
                body: JSON.stringify({
                    model: "openai/gpt-3.5-turbo",
                    messages: [
                        {
                            role: "system",
                            content: `You are the official AI Assistant for MITILENCE 2K26 - a national level technical symposium organized by the Department of Robotics & Automation at MIT.
                            
                            Official Information:
                            - Date: 14 March 2026.
                            - Location: Department of Robotics & Automation, MIT.
                            - Registration Fee: ₹200 (for all events).
                            - Payment: Offline - Pay at the Registration Desk on event day.
                            
                            Technical Events:
                            1. Robo Race: Fast-paced robot racing obstacle course.
                            2. Tug of Bot: Robot vs. Robot strength challenge.
                            3. Roboatics: Design and autonomy focused robotics challenges.
                            4. Robo Soccer: Robots playing football.
                            5. Paper Presentation: Research paper submission.
                               - Requirement: Upload to Google Drive, share as 'Anyone with the link' (Viewer), and paste the link in the registration form.
                            
                            Non-Technical Events:
                            1. IPL Auction: Strategic bidding simulation.
                            2. Stumble Guys: Fun gaming tournament.
                            
                            Instructions for Users:
                            - To register: Click the 'Register' button on any event card or go to the Events page.
                            - To track status: Login and check your 'Dashboard'.
                            - For Paper Presentation: Don't forget to provide the Google Drive link.
                            
                            Style: Keep responses concise, supportive, and professional. Mention the department (Robotics & Automation, MIT) if asked about organizers.`
                        },
                        ...messages.map(m => ({ role: m.role, content: m.content })),
                        { role: "user", content: userMessage }
                    ]
                })
            });

            if (!response.ok) throw new Error("Failed to get response");
            const data = await response.json();
            setMessages((prev) => [...prev, { role: "assistant", content: data.choices[0].message.content }]);
        } catch (error) {
            console.error("Chat Error:", error);
            setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I'm having trouble connecting to the AI. Please try again later or contact our coordinators." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 w-[320px] h-[450px] flex flex-col overflow-hidden rounded-2xl border border-border bg-[#0f172a] shadow-2xl animate-fade-in-up">
                    {/* Header */}
                    <div className="bg-accent p-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="text-xl">🤖</span>
                            <span className="text-[11px] font-black uppercase tracking-widest text-white">MITILENCE AI Assistant</span>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white/80 hover:text-white transition-colors"
                        >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-accent/20">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs font-medium ${msg.role === "user"
                                    ? "bg-accent text-white rounded-br-none"
                                    : "bg-surface border border-border text-text-main rounded-bl-none"
                                    }`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-surface border border-border text-text-main rounded-2xl rounded-bl-none px-4 py-2.5 text-xs font-medium flex gap-1">
                                    <span className="w-1 h-1 bg-accent rounded-full animate-bounce"></span>
                                    <span className="w-1 h-1 bg-accent rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                    <span className="w-1 h-1 bg-accent rounded-full animate-bounce [animation-delay:0.4s]"></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form onSubmit={sendMessage} className="p-4 border-t border-border bg-surface/50">
                        <div className="flex gap-2">
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about events..."
                                className="flex-1 bg-background border border-border rounded-xl px-4 py-2 text-xs text-text-main outline-none focus:border-accent transition-colors"
                            />
                            <button
                                type="submit"
                                disabled={loading || !input.trim()}
                                className="bg-accent text-white p-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all"
                            >
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex h-14 w-14 items-center justify-center rounded-full shadow-xl transition-all hover:scale-110 active:scale-95 ${isOpen ? "bg-accent text-white rotate-45" : "bg-accent text-white"
                    }`}
            >
                {isOpen ? (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <div className="relative">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                    </div>
                )}
            </button>
        </div>
    );
}
