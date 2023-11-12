import { createClient } from "@libsql/client";

export const createTursoClient = () => {
    return createClient({
        url: import.meta.env.VITE_URL,
        authToken: import.meta.env.VITE_TOKEN,
    });
};
