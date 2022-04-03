import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebaseService/firebase";

export const UserContext = createContext();

export default function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    auth.onAuthStateChanged((user) => {
        setUser(user);
    });

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}