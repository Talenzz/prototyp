import { SpotifyToken } from "./api/spotify/token/route";
import { HomeComponent } from "@/components/pages/Home";

async function getToken() {
    const res = await fetch("http://localhost:3000/api/spotify/token");
    return (await res.json()) as SpotifyToken;
}

export default async function Home() {
    const data = await getToken();

    return <HomeComponent token={data} />;
}

