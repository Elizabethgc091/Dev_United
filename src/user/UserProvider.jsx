import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebaseService/firebase";
import { onAuthStateChanged } from "firebase/auth";


export const UserContext = createContext();

export default function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log(user);
            setUser(user);
        }
    });
    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}