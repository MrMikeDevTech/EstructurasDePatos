import { API_KEY, API_URL, TOKEN_KEY } from "../data";

export const headers = {
    "Content-Type": "application/json",
    "X-API-KEY": API_KEY
};

const getSessionToken = (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
};

export const register = async ({
    username,
    email,
    password,
    confirmPassword
}: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}): Promise<{
    message: null | string;
    error: null | string;
}> => {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers,
            body: JSON.stringify({ username, email, password, confirm_password: confirmPassword })
        });

        if (!response.ok) {
            const errorData = (await response.json()) as {
                error: string;
            };
            throw errorData;
        }

        const data = (await response.json()) as { message: string };
        return { message: data.message, error: null };
    } catch (error: any) {
        throw error || { error: "Error desconocido" };
    }
};

export const login = async ({
    username,
    password
}: {
    username: string;
    password: string;
}): Promise<{ token: null | string; error: null | string }> => {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers,
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            return await response.json();
        }

        return await response.json();
    } catch (error: any) {
        throw error || { error: "Error desconocido" };
    }
};

export const logout = async () => {
    try {
        const token = getSessionToken();
        if (!token) {
            throw { error: "No se encontró token de sesión" };
        }
        const response = await fetch(`${API_URL}/auth/logout`, {
            method: "POST",
            headers: {
                ...headers,
                Authorization: `${token}`
            },
            body: JSON.stringify({})
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw errorData;
        }

        localStorage.removeItem(TOKEN_KEY);
        window.location.reload();
        return await response.json();
    } catch (error: any) {
        throw error || { error: "Error desconocido" };
    }
};
