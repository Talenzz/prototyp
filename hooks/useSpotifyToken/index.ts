import { useEffect, useState } from "react";
import axios from "axios";
import { SpotifyToken } from "@/app/api/spotify/token/route";

/**
 * This hook fetches the Spotify token from the backend. It also provides a function to refetch the token.
 */
export function useSpotifyToken(): [SpotifyToken | null, () => Promise<void>, () => Promise<boolean>] {
    const [token, setToken] = useState<SpotifyToken | null>(null);

    const fetchToken = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/spotify/token`);
        const data = res.data;
        setToken(data);
    };

    useEffect(() => {
        fetchToken();
    }, []);

    const refetchToken = async () => {
        console.log("Fetching new token...");
        await fetchToken();
    };

    // validate token
    const validateToken = async () => {
        if (!token) return false;
        if (token.expires_at < Date.now()) {
            console.log("Token expired. Fetching new token...");
            await refetchToken();
        }
        return true;
    };

    return [token, refetchToken, validateToken];
}
