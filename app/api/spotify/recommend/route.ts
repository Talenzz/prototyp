import { connect } from '@/utils/mongo';
import { NextResponse } from 'next/server';

export async function POST() {
    // establish connection to MongoDB
    // await connect();

    // const url = "https://accounts.spotify.com/api/token";
    // const headers = new Headers();
    // headers.set("Content-Type", "application/x-www-form-urlencoded");
    // // headers.set("Authorization", "Basic " + btoa(process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET));

    // // const body = new URLSearchParams();
    // // body.append("grant_type", "client_credentials");

    // const res = await fetch(url, {
    //     method: "POST",
    //     headers,
    //     body: `grant_type=client_credentials&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`,
    //     next: { revalidate: 3600 }
    // });

    // const data = await res.json();

    return NextResponse.json({})
}