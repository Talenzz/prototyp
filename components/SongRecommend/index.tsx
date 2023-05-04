import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { IAlbum, IArtist, ITrack } from "@/types/spotify";
import { SpotifyToken } from "@/app/api/spotify/token/route";
import { Button, Container, Grid, Group, MultiSelect, Space } from "@mantine/core";
import { genres } from "@/utils/genres";

type SongRecommendProps = {
    track: ITrack;
    token: SpotifyToken;
    close: () => void;
};

export function SongRecommend({ track, token, close }: SongRecommendProps) {
    // fetch data
    const [fetchedGenres, setFetchedGenres] = useState<string[]>([]);

    useEffect(() => {
        fetchGenre();
    }, []);

    const genresCategories = Object.keys(genres);

    const fetchGenre = async () => {
        const albumFetch = await axios.get(
            `https://api.spotify.com/v1/albums/${track.album.id}`,
            {
                headers: {
                    Authorization: `Bearer ${token.access_token}`,
                },
            }
        );

        const album: IAlbum = albumFetch.data;

        if (album.genres && album.genres.length > 0) {
            // check if genres and genresCategories have any common elements
            // if so, set fetchedGenres to the common elements
            // else, set fetchedGenres to the first element of genres

            const commonGenres = album.genres.filter((genre) =>
                genresCategories.includes(genre)
            );

            if (commonGenres.length > 0) {
                setFetchedGenres(commonGenres);
                console.log(commonGenres);
                return;
            }
        }

        const artistFetch = await axios.get(
            `https://api.spotify.com/v1/artists/${track.artists[0].id}`,
            {
                headers: {
                    Authorization: `Bearer ${token.access_token}`,
                },
            }
        );

        const artist: IArtist = artistFetch.data;

        if (artist.genres && artist.genres.length > 0) {
            const commonGenres = artist.genres.filter((genre) =>
                genresCategories.includes(genre)
            );

            if (commonGenres.length > 0) {
                setFetchedGenres(commonGenres);
                console.log(commonGenres);
                return;
            }
        }
    };

    const onSave = async () => {
        // implement saving

        close();
    };

    return (
        <Container>
            <Container>
                <Grid>
                    <Grid.Col span={5}>
                        <Image src={track.album.images[1].url} alt={track.name} />
                    </Grid.Col>
                    <Grid.Col span={7}>
                        <h1>{track.name}</h1>
                        <h2>{track.artists[0].name}</h2>
                        <h3>{fetchedGenres[0]}</h3>
                        {fetchedGenres.length > 1 ? (
                            <MultiSelect data={fetchedGenres} readOnly />
                        ) : (
                            <MultiSelect data={genresCategories} />
                        )}
                        <Space h="xl" />
                        {fetchedGenres.length > 1 ? (
                            <MultiSelect data={fetchedGenres} readOnly />
                        ) : (
                            <MultiSelect data={genresCategories} />
                        )}
                    </Grid.Col>
                </Grid>
            </Container>
            <Group position="center" pt="xl">
                <Button variant="light" color="blue" onClick={onSave}>
                    Submit
                </Button>
                <Button variant="light" color="red" onClick={close}>
                    Cancel
                </Button>
            </Group>
        </Container>
    );
}
