import { getClient } from '@/utils/redis';
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export type SpotifyToken = {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
}

const spotifiyRedisKey = 'spotifyToken';

export async function GET() {
    try {
        const client = getClient();

        if (!client.isOpen || !client) return NextResponse.json({ error: 'redis connection failed' }, { status: 500 });

        const tokenString = await client.get(spotifiyRedisKey);

        if (tokenString) {
            client.quit();

            const token: SpotifyToken = JSON.parse(tokenString);
            return NextResponse.json(token);
        }

        const url = "https://accounts.spotify.com/api/token";
        const headers = new Headers();
        headers.set("Content-Type", "application/x-www-form-urlencoded");

        const res = await fetch(url, {
            method: "POST",
            headers,
            body: `grant_type=client_credentials&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`,
            cache: "no-cache"
        });

        const data: SpotifyToken = await res.json();

        await client.set(spotifiyRedisKey, JSON.stringify(data), {
            EX: data.expires_in / 2
        });
        client.quit();

        return NextResponse.json({ token: data });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
