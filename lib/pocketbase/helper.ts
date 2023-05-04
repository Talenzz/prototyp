import { User } from "@/types/pocketbase";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { pb } from ".";


/**
 * Can be called in page/layout server component.
 * @param cookies ReadonlyRequestCookies
 * @returns User or null
 * @author Arif "poltang" Muslax
 * @see {@link https://github.com/vvo/iron-session/issues/560#issuecomment-1324598048}
 */
export function getUserFromCookie(cookies: ReadonlyRequestCookies): User | null {
    const authCookie = cookies.get("pb_auth");

    if (!authCookie) return null;

    pb.authStore.loadFromCookie(`${authCookie.name}=${authCookie.value}`);
    const user = pb.authStore.model;

    return user as unknown as User;
}

export const parsePocketBaseCookie = (cookie: string) => {
    // exportToCookie() returns the following:
    // 'pb_auth=VALUE; Path=/; Expires=ISODATE; HttpOnly; Secure; SameSite=Strict'  

    const name = cookie.split(";")[0].split("=")[0];

    const value = cookie.split(";")[0].split("=")[1];

    const path = cookie.split(";")[1].split("=")[1];

    const cookieExpires = cookie.split(";")[2].split("=")[1];
    const cookieExpiresDate = new Date(cookieExpires);
    const expires = cookieExpiresDate.getTime();

    const httpOnly = cookie.includes("HttpOnly") ? true : false;

    const secure = cookie.includes("Secure") ? true : false;

    const sameSite = cookie.split(";")[4].split("=")[1];

    return {
        name,
        value,
        expires,
        path,
        httpOnly,
        secure,
        sameSite
    }
};
