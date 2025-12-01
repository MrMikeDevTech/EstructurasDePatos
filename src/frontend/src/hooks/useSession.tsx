import { useState, useEffect } from "react";
import { TOKEN_KEY } from "../data";

export const useSession = () => {
    const [session, setSession] = useState<string | null>(() => {
        return localStorage.getItem(TOKEN_KEY);
    });

    useEffect(() => {
        if (session) localStorage.setItem(TOKEN_KEY, session);
        else localStorage.removeItem(TOKEN_KEY);
    }, [session]);

    useEffect(() => {
        const handler = () => {
            const token = localStorage.getItem(TOKEN_KEY);
            setSession(token);
        };
        window.addEventListener("storage", handler);
        return () => window.removeEventListener("storage", handler);
    }, []);

    const clearSession = () => setSession(null);

    return {
        session,
        setSession,
        clearSession,
        hasSession: Boolean(session)
    };
};
