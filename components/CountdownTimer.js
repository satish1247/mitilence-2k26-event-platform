"use client";

import { useEffect, useState } from "react";

export default function CountdownTimer({ targetDate }) {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const timer = setInterval(() => {
            const distance = new Date(targetDate) - new Date();

            if (distance < 0) {
                clearInterval(timer);
                return;
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000),
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    const TimeBlock = ({ value, label }) => (
        <div className="flex flex-col items-center">
            <div className="mb-1 text-3xl font-extrabold text-text-main tabular-nums sm:text-4xl">
                {value.toString().padStart(2, "0")}
            </div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                {label}
            </div>
        </div>
    );

    return (
        <div className="flex items-center justify-center gap-6 sm:gap-12 py-4 border-y border-border">
            <TimeBlock value={timeLeft.days} label="Days" />
            <div className="h-8 w-[1px] bg-border" />
            <TimeBlock value={timeLeft.hours} label="Hours" />
            <div className="h-8 w-[1px] bg-border" />
            <TimeBlock value={timeLeft.minutes} label="Mins" />
            <div className="h-8 w-[1px] bg-border" />
            <TimeBlock value={timeLeft.seconds} label="Secs" />
        </div>
    );
}
