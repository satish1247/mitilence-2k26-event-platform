"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
    RecaptchaVerifier,
    signInWithPhoneNumber,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
    // Debug: Check if Firebase config is loaded
    const isConfigMissing = !process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
        process.env.NEXT_PUBLIC_FIREBASE_API_KEY === "YOUR_API_KEY_HERE";

    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // Get user profile from Firestore
                try {
                    const userRef = doc(db, "users", firebaseUser.uid);
                    const userDoc = await getDoc(userRef);

                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setUser({ ...firebaseUser, ...userData });
                        setUserRole(userData.role || "participant");
                    } else {
                        // For Google/Phone/Existing users without docs
                        const newUserData = {
                            uid: firebaseUser.uid,
                            name: firebaseUser.displayName || "User",
                            email: firebaseUser.email || "",
                            phone: firebaseUser.phoneNumber || "",
                            role: "participant",
                            createdAt: serverTimestamp(),
                        };
                        await setDoc(userRef, newUserData);
                        setUser({ ...firebaseUser, ...newUserData });
                        setUserRole("participant");
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    setUser(firebaseUser);
                    setUserRole("participant");
                }
            } else {
                setUser(null);
                setUserRole(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const register = async (email, password, name, phone, college) => {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(result.user, { displayName: name });

        // Create user document in Firestore
        await setDoc(doc(db, "users", result.user.uid), {
            uid: result.user.uid,
            name,
            email,
            phone: phone || "",
            college: college || "",
            role: "participant",
            createdAt: serverTimestamp(),
        });

        return result;
    };

    const login = async (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const loginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    };

    const setupRecaptcha = (containerId) => {
        if (window.recaptchaVerifier) {
            window.recaptchaVerifier.clear();
        }
        window.recaptchaVerifier = new RecaptchaVerifier(containerId, {
            size: "invisible",
            callback: (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
            }
        }, auth);
    };

    const sendOtp = async (phoneNumber, containerId) => {
        setupRecaptcha(containerId);
        const appVerifier = window.recaptchaVerifier;
        return signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    };

    const logout = async () => {
        return signOut(auth);
    };

    const isAdmin = userRole === "admin" || userRole === "super_admin";
    const isSuperAdmin = userRole === "super_admin";

    return (
        <AuthContext.Provider
            value={{
                user,
                userRole,
                loading,
                register,
                login,
                loginWithGoogle,
                sendOtp,
                logout,
                isAdmin,
                isSuperAdmin
            }}
        >
            {isConfigMissing && (
                <div className="fixed top-0 left-0 right-0 z-[9999] bg-red-600/90 py-1.5 text-center text-[10px] font-black uppercase tracking-widest text-white backdrop-blur-sm">
                    ⚠️ Configuration Error: Firebase keys missing in .env.local
                </div>
            )}
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
