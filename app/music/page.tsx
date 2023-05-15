import { MusicComponent } from "@/components/pages/music";
import { ISong } from "@/models/Song";

export const dynamic = 'force-dynamic';

async function getInitialTracks() {
    const res = await fetch("http://localhost:3000/api/spotify/tracks");
    return (await res.json()) as ISong[];
}

export default async function Music() {
    const tracks = await getInitialTracks();

    return (
        <>
            <MusicComponent songs={tracks} />
        </>
    );
}
