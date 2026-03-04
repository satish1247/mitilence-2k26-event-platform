import {
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

// ─── Events ──────────────────────────────────────────────────────────
export async function getEvents() {
    const snapshot = await getDocs(collection(db, "events"));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getEvent(eventId) {
    const docRef = doc(db, "events", eventId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
}

export async function seedEvents(events) {
    for (const event of events) {
        await setEventDoc(event.id, event);
    }
}

async function setEventDoc(id, data) {
    const { id: _, ...rest } = data;
    const docRef = doc(db, "events", id);
    const { setDoc } = await import("firebase/firestore");
    // Overwrite existing or create new
    await setDoc(docRef, {
        ...rest,
        updatedAt: serverTimestamp()
    }, { merge: true });
}

export async function deleteEvent(eventId, adminUid) {
    const docRef = doc(db, "events", eventId);
    await deleteDoc(docRef);
    if (adminUid) {
        await logAdminAction(adminUid, eventId, "delete_event");
    }
}

// ─── Registrations ───────────────────────────────────────────────────
export async function createRegistration(data) {
    // Check for duplicate
    const q = query(
        collection(db, "registrations"),
        where("userId", "==", data.userId),
        where("eventId", "==", data.eventId)
    );
    const existing = await getDocs(q);
    if (!existing.empty) {
        throw new Error("You have already registered for this event.");
    }

    const docRef = await addDoc(collection(db, "registrations"), {
        ...data,
        approvalStatus: "Pending Approval",
        checkedIn: false,
        createdAt: serverTimestamp(),
    });
    return docRef.id;
}

export async function getUserRegistrations(userId) {
    const q = query(
        collection(db, "registrations"),
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getAllRegistrations() {
    const q = query(
        collection(db, "registrations"),
        orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function updateRegistration(regId, updates) {
    const docRef = doc(db, "registrations", regId);
    await updateDoc(docRef, { ...updates, updatedAt: serverTimestamp() });
}

export async function deleteRegistration(regId) {
    const docRef = doc(db, "registrations", regId);
    await deleteDoc(docRef);
}

export async function getRegistrationsByEvent(eventId) {
    const q = query(
        collection(db, "registrations"),
        where("eventId", "==", eventId),
        orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// ─── Users ───────────────────────────────────────────────────────────
export async function getUserProfile(userId) {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
}

export async function getAllUsers() {
    const snapshot = await getDocs(collection(db, "users"));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// ─── Gallery ─────────────────────────────────────────────────────────
export async function getGalleryItems(year) {
    const q = query(
        collection(db, "gallery"),
        where("year", "==", parseInt(year)),
        orderBy("uploadedAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            // Normalize field names (support both imageUrl and imageURL)
            imageUrl: data.imageUrl || data.imageURL || ""
        };
    });
}

export async function addGalleryItem(data, adminUid) {
    const docRef = await addDoc(collection(db, "gallery"), {
        ...data,
        year: parseInt(data.year),
        uploadedAt: serverTimestamp(),
        uploadedBy: adminUid
    });

    await logAdminAction(adminUid, docRef.id, "add_gallery_item", data);
    return docRef.id;
}

export async function deleteGalleryItem(itemId, adminUid) {
    const docRef = doc(db, "gallery", itemId);
    await deleteDoc(docRef);

    await logAdminAction(adminUid, itemId, "delete_gallery_item");
}

// ─── Admin Services ──────────────────────────────────────────────────
export async function updateRegistrationStatus(regId, status, adminUid) {
    const docRef = doc(db, "registrations", regId);
    await updateDoc(docRef, {
        approvalStatus: status,
        updatedAt: serverTimestamp()
    });

    await logAdminAction(adminUid, regId, "status_update", { newStatus: status });
}

export async function disqualifyRegistration(regId, reason, adminUid) {
    const docRef = doc(db, "registrations", regId);
    await updateDoc(docRef, {
        approvalStatus: "Disqualified",
        disqualified: true,
        disqualifiedReason: reason,
        disqualifiedBy: adminUid,
        disqualifiedAt: serverTimestamp(),
        updatedAt: serverTimestamp()
    });

    await logAdminAction(adminUid, regId, "disqualify", { reason });
}

export async function softDeleteRegistration(regId, adminUid) {
    const docRef = doc(db, "registrations", regId);
    await updateDoc(docRef, {
        isDeleted: true,
        updatedAt: serverTimestamp()
    });

    await logAdminAction(adminUid, regId, "soft_delete");
}

export async function logAdminAction(adminUid, targetId, action, details = {}) {
    await addDoc(collection(db, "audit_logs"), {
        adminUid,
        targetId,
        action,
        details,
        timestamp: serverTimestamp()
    });
}

export async function getAuditLogs() {
    const q = query(
        collection(db, "audit_logs"),
        orderBy("timestamp", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function toggleEventStatus(eventId, status, adminUid) {
    const docRef = doc(db, "events", eventId);
    await updateDoc(docRef, {
        status: status,
        updatedAt: serverTimestamp()
    });

    await logAdminAction(adminUid, eventId, "event_status_toggle", { newStatus: status });
}
