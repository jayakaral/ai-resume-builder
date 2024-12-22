"use client";
import { SessionValidationResult } from "@/lib/auth";
import React from "react";

const SessionContext = React.createContext<SessionValidationResult | undefined>(undefined);

interface SessionProviderProps {
    session: SessionValidationResult;
    children: React.ReactNode;
}

export const SessionProvider: React.FC<SessionProviderProps> = ({ session, children }) => {
    return (
        <SessionContext.Provider value={session}>
            {children}
        </SessionContext.Provider>
    )
};

export const useSession = () => {
    const context = React.useContext(SessionContext);
    if (context === undefined) {
        throw new Error("useSession must be used within a SessionProvider");
    }
    return context;
}   
