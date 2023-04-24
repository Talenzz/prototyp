import { SpotifyToken } from "@/app/api/spotify/token/route";
import { SongSearch } from "@/components/SongSearch";
import { HeroTitle } from "@/components/layout/Hero";

type HomeComponentProps = {
    token: SpotifyToken;
};

export function HomeComponent({ token }: HomeComponentProps) {
    return (
        <>
            <HeroTitle />
            <SongSearch token={token} />
        </>
    );
}
