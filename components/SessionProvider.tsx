"use client";

import { createContext, useContext, useState } from "react";
import { Session } from "better-auth"; // adjust if needed

const SessionContext = createContext<Session | null>(null);

export function useSession() {
    return useContext(SessionContext);
}

export default function SessionProvider({
    session: initialSession,
    children,
}: {
    session: Session | null;
    children: React.ReactNode;
}) {
    const [session] = useState(initialSession);

    return (
        <SessionContext.Provider value={session}>
            {children}
        </SessionContext.Provider>
    );
}
