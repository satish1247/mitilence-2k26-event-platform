"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ClientLayoutWrapper({ children }) {
    const pathname = usePathname();
    const isHome = pathname === "/";

    if (isHome) {
        return <>{children}</>;
    }

    return (
        <>
            <Navbar />
            <main className="pt-16">{children}</main>
            <Footer />
        </>
    );
}
