import { ISong } from "@/models/Song";
import { Grid, Stack, Title } from "@mantine/core";
import Image from "next/image";

interface DiscoverSongInformationProps {
    songs: ISong[];
    currentIndex: number;
}
export function DiscoverSongInformationComponent({
    songs,
    currentIndex,
}: DiscoverSongInformationProps) {
    console.log(currentIndex);
    // map through max. 5 songs
    const nextSongs = songs
        .slice(currentIndex + 1, currentIndex + 5)
        .map((song) => {
            return (
                <Grid key={song.spotify.song.id} p="md">
                    <Grid.Col span={3}>
                        <Image
                            src={song.spotify.song.image}
                            alt={song.name}
                            height={85}
                            width={85}
                        />
                    </Grid.Col>
                    <Grid.Col span="auto">
                        <Title order={3}>{song.name}</Title>
                        <Title order={4}>{song.spotify.artist[0].name}</Title>
                    </Grid.Col>
                </Grid>
            );
        });

    return (
        <>
            <Grid>
                <Grid.Col span={6}>
                    <Title order={2}>Als nächstes:</Title>
                    <Stack>{nextSongs}</Stack>
                </Grid.Col>
            </Grid>
        </>
    );
}
