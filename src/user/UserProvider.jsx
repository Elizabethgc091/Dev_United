import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebaseService/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const UserContext = createContext();

export default function UserProvider({ children }) {
    const [user, setUser] = useState({
        uid: null,
        photoURL:
            "https://icon-library.com/images/unknown-person-icon/unknown-person-icon-4.jpg",
        color: ""
    });
    useEffect(async () => {
        await onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }
        });
    }, [])

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}