import { pb } from '@/lib/pocketbase';
import { parsePocketBaseCookie } from '@/lib/pocketbase/helper';
import { NextRequest, NextResponse } from 'next/server';

type LoginBody = {
    email: string;
    password: string;
}

export async function POST(request: NextRequest) {
    const { email, password }: LoginBody = await request.json();

    if (!email || !password) return NextResponse.json({ error: "Email or password is empty" }, { status: 400 });

    let cookie = "";

    // get cookie from authStore
    try {
        // try to login
        await pb.collection("users").authWithPassword(email, password);
        cookie = pb.authStore.exportToCookie();
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }

    // if cookie is empty, return error
    if (!cookie) return NextResponse.json({ error: "Could not interpret cookie from AuthStore" }, { status: 500 });

    const { name, value, expires, path, httpOnly, secure, sameSite } = parsePocketBaseCookie(cookie);

    // create response
    const response = NextResponse.json({ message: "Login successful" }, { status: 200 });
    response.cookies.set(name, value, {
        expires: expires,
        path: path,
        httpOnly: httpOnly,
        secure: secure,
        sameSite: "strict"
    });

    return response;
}