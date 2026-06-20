import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updatePassword,
    sendPasswordResetEmail,
} from "firebase/auth";
import {
    getFirestore,
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    getDoc,
    setDoc,
    orderBy,
    onSnapshot,
    serverTimestamp,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDxD0uNffgIlLQiB1IV8iuXuapVNR5ZBQI",
    authDomain: "themusicclubmuj-e310f.firebaseapp.com",
    projectId: "themusicclubmuj-e310f",
    storageBucket: "themusicclubmuj-e310f.firebasestorage.app",
    messagingSenderId: "865032421163",
    appId: "1:865032421163:web:f1c228a7e3b09f5f740f6e",
    measurementId: "G-9GSPX8L64C"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export function loginCoreMember(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

export function logoutCoreMember() {
    return signOut(auth);
}

export function watchAuth(callback) {
    return onAuthStateChanged(auth, callback);
}

export function resetCorePassword(email) {
    return sendPasswordResetEmail(auth, email);
}

export function subscribeCalendarTasks(callback) {
    const calendarQuery = query(
        collection(db, "calendarTasks"),
        orderBy("date", "asc")
    );

    return onSnapshot(calendarQuery, (snapshot) => {
        const tasks = snapshot.docs.map((document) => ({
            id: document.id,
            ...document.data(),
        }));

        callback(tasks);
    });
}

export function createCalendarTask(task, userProfile) {
    return addDoc(collection(db, "calendarTasks"), {
        ...task,
        editedByName: userProfile.name,
        editedByEmail: userProfile.email,
        editedByRole: userProfile.role,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });
}

export function updateCalendarTask(taskId, task, userProfile) {
    return updateDoc(doc(db, "calendarTasks", taskId), {
        ...task,
        editedByName: userProfile.name,
        editedByEmail: userProfile.email,
        editedByRole: userProfile.role,
        updatedAt: serverTimestamp(),
    });
}

export function deleteCalendarTask(taskId) {
    return deleteDoc(doc(db, "calendarTasks", taskId));
}
export async function getCoreUserSettings(email) {
    const userRef = doc(db, "coreMembers", email);
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
        return {
            mustChangePassword: true,
        };
    }

    return snapshot.data();
}

export function markCorePasswordChanged(email) {
    return setDoc(
        doc(db, "coreMembers", email),
        {
            mustChangePassword: false,
            passwordChangedAt: serverTimestamp(),
        },
        { merge: true }
    );
}

export function changeCurrentUserPassword(newPassword) {
    if (!auth.currentUser) {
        throw new Error("No logged-in user found.");
    }

    return updatePassword(auth.currentUser, newPassword);
}