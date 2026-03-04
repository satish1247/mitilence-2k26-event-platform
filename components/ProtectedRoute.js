"use client";

import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loader from "./Loader";

export function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    if (loading) return <Loader text="Checking authentication..." />;
    if (!user) return null;

    return children;
}

export function AdminRoute({ children }) {
    const { user, isAdmin, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push("/login");
            } else if (!isAdmin) {
                router.push("/dashboard");
            }
        }
    }, [user, isAdmin, loading, router]);

    if (loading) return <Loader text="Verifying access..." />;
    if (!user || !isAdmin) return null;

    return children;
}
