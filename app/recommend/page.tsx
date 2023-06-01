import { SpotifyToken } from "../api/spotify/token/route";
import { RecommendComponent } from "@/components/pages/recommend";

export const dynamic = 'force-dynamic';

async function getToken() {
    // need the functionality of refreshing the token, when its expired!
    // maybe use a store or something
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/spotify/token`, {
        cache: "no-cache",
    });
    return (await res.json()) as SpotifyToken;
}

export default async function Recommend() {
    const data = await getToken();
    if(!data) {
        // reload page
        return <></>;
    }
    console.log({"initial page token": data});

    return <RecommendComponent token={data} />;
}