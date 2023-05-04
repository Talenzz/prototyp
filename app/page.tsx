import { SpotifyToken } from "./api/spotify/token/route";
import { HomeComponent } from "@/components/pages/Home";

async function getToken() {
    // need the functionality of refreshing the token, when its expired!
    // maybe use a store or something
    const res = await fetch("http://localhost:3000/api/spotify/token", {
        cache: "no-cache",
    });
    return (await res.json()) as SpotifyToken;
}

export default async function Home() {
    const data = await getToken();

    return <HomeComponent token={data} />;
}

