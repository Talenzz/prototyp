import { SpotifyToken } from "@/app/api/spotify/token/route";
import { SongSearch } from "@/components/SongSearch";
import { HeroTitle } from "@/components/layout/Hero";

type RecommendComponentProps = {
    token: SpotifyToken;
};

export function RecommendComponent({ token }: RecommendComponentProps) {
    return (
        <>
            <HeroTitle />
            <SongSearch token={token} />
        </>
    );
}
