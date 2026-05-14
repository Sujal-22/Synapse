import { useEffect, useState } from "react";

export default function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        try {
            const saved = localStorage.getItem(key);

            if (saved !== null) {
                return JSON.parse(saved);
            }

            return initialValue;
        } catch {
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch {
            // Ignore localStorage write errors.
        }
    }, [key, value]);

    return [value, setValue];
}