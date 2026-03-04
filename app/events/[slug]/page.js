import { EVENTS } from "@/lib/constants";
import EventDetailClient from "@/components/EventDetailClient";
import Link from "next/link";

export const dynamicParams = false;

export async function generateStaticParams() {
    return EVENTS.map((event) => ({
        slug: event.slug,
    }));
}

export default async function EventDetailPage({ params }) {
    const { slug } = await params;

    // SAFE MATCHING: Case-insensitive and trimmed
    const event = EVENTS.find(
        (e) => e.slug.toLowerCase().trim() === slug.toLowerCase().trim()
    );

    if (!event) {
        return (
            <div className="flex min-h-screen items-center justify-center p-4">
                <div className="text-center bg-surface border border-border p-12 rounded-2xl shadow-2xl">
                    <h1 className="text-3xl font-black text-text-main mb-4 uppercase tracking-tighter">Event Not Found</h1>
                    <p className="text-text-muted mb-8 text-sm uppercase tracking-widest font-bold">This event doesn&apos;t exist or has been removed.</p>
                    <Link href="/events" className="btn-primary text-xs font-black uppercase tracking-[0.2em] px-8 py-3.5 inline-block">
                        ← Back to Events
                    </Link>
                </div>
            </div>
        );
    }

    return <EventDetailClient event={event} />;
}
