import { NextResponse } from 'next/server';

export type SpotifyToken = {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
}

export async function GET() {
    const url = "https://accounts.spotify.com/api/token";
    const headers = new Headers();
    headers.set("Content-Type", "application/x-www-form-urlencoded");
    // headers.set("Authorization", "Basic " + btoa(process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET));

    // const body = new URLSearchParams();
    // body.append("grant_type", "client_credentials");

    const res = await fetch(url, {
        method: "POST",
        headers,
        body: `grant_type=client_credentials&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`,
        next: { revalidate: 3600 }
    });

    const data: SpotifyToken = await res.json();

    return NextResponse.json(data)
}
