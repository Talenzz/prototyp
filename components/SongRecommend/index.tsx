import { useEffect, useState } from "react";
import axios from "axios";
import { IAlbum, IArtist, ITrack } from "@/types/spotify";
import {
    Button,
    Center,
    Container,
    Group,
    Image,
    MultiSelect,
    Select,
    Space,
    Title,
} from "@mantine/core";
import { notifications } from '@mantine/notifications';
import { tags, genres } from "@/utils/genres";
import { ISong } from "@/models/Song";
import { useSpotifyToken } from "@/hooks/useSpotifyToken";
import { retryFetch } from "@/utils/helper";
import { MdCheck, MdClose } from "react-icons/md";

type SongRecommendProps = {
    track: ITrack;
    close: () => void;
};

export function SongRecommend({ track, close }: SongRecommendProps) {
    const [token, refetchToken, validateToken] = useSpotifyToken();

    // fetch data
    const [fetchedGenres, setFetchedGenres] = useState<string[]>([]);

    // input state
    const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
    const [selectedSubGenre, setSelectedSubGenre] = useState<string[]>([]);

    useEffect(() => {
        fetchGenre();
    }, []);

    const fetchGenre = async () => {
        if (!token) return;

        if (!validateToken()) {
            refetchToken();
        }

        const artistFetch = async () => {
            const artistFetch = await axios.get(
                `https://api.spotify.com/v1/artists/${track.artists[0].id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token.access_token}`,
                    },
                }
            );

            return artistFetch.data as IArtist;
        }

        const artist = await retryFetch<IArtist>(artistFetch, refetchToken);
        if (!artist) return;

        if (artist.genres && artist.genres.length > 0) {
            const commonGenres = genres.filter((genre) =>
                artist.genres?.includes(genre.toLowerCase())
            );

            console.log("artist:", commonGenres);

            if (commonGenres.length > 0) {
                setFetchedGenres(commonGenres);
                return;
            }
        }

        const albumFetch = async () => {
            const res = await axios.get(
                `https://api.spotify.com/v1/albums/${track.album.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token.access_token}`,
                    },
                }
            );
            return res.data as IAlbum;
        }

        const album = await retryFetch<IAlbum>(albumFetch, refetchToken);
        if (!album) return;

        if (album.genres && album.genres.length > 0) {
            // check if genres and genresCategories have any common elements
            // if so, set fetchedGenres to the common elements
            // else, set fetchedGenres to the first element of genres

            const commonGenres = genres.filter((genre) =>
                album.genres?.includes(genre.toLowerCase())
            );

            if (commonGenres.length > 0) {
                setFetchedGenres(commonGenres);
                return;
            }
        }
    };

    const onSave = async () => {
        notifications.show({
            id: 'recommend-song',
            loading: true,
            title: 'Song wird gespeichert',
            message: 'Es wird versucht, den Song zu speichern. Bitte warten...',
            autoClose: false,
            withCloseButton: false,
        });

        // make post requst to "http://localhost:3000/api/spotify/recommend" with data in body as json
        const artists = track.artists.map((artist) => {
            return {
                name: artist.name,
                id: artist.id,
                uri: artist.uri,
            };
        });

        const data: ISong = {
            name: track.name,
            spotify: {
                song: {
                    name: track.name,
                    id: track.id,
                    uri: track.uri,
                    image: track.album.images[0].url,
                },
                artist: artists,
                album: {
                    name: track.album.name,
                    id: track.album.id,
                    uri: track.album.uri,
                },
            },
            genres: [selectedGenre!],
            tags: selectedSubGenre,
            total_recommendations: 1,
            total_likes: 0,
        };
        // use fetch
        var res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/spotify/recommend`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (res.status !== 200) {
            notifications.update({
                id: 'recommend-song',
                loading: false,
                title: 'Song konnte nicht gespeichert werden',
                message: 'Es ist ein Fehler aufgetreten. Bitte versuche es erneut.',
                autoClose: 2000,
                withCloseButton: true,
                icon: <MdClose />,
                color: 'red'
            });
            return;
        }

        notifications.update({
            id: 'recommend-song',
            loading: false,
            title: 'Song wurde gespeichert',
            message: 'Der Song wurde erfolgreich gespeichert.',
            autoClose: 2000,
            withCloseButton: true,
            icon: <MdCheck />,
            color: 'green'
        });

        close();
    };

    return (
        <Container>
            <Container sx={{ textAlign: "center" }}>
                <Title order={1}>Empfehle deinen Song!</Title>
                <Space h="xl" />
                <Center>
                    <Image
                        src={track.album.images[0].url}
                        width={300}
                        height={300}
                        alt={track.name}
                    />
                </Center>
                <Space h="xl" />
                <Title order={2}>{track.name}</Title>
                <Title order={3}>{track.artists[0].name}</Title>
                <Space h="xl" />
                <Group position="center">
                    <div>
                        {fetchedGenres.length > 0 ? (
                            <MultiSelect
                                data={fetchedGenres}
                                value={fetchedGenres}
                                label="Spotify Genre"
                                readOnly
                            />
                        ) : (
                            <Select
                                value={selectedGenre}
                                onChange={(selection) => setSelectedGenre(selection)}
                                data={genres}
                                searchable
                                nothingFound="Kein Ergebnis gefunden"
                                label="Wähle ein Genre aus"
                            />
                        )}
                    </div>
                    <MultiSelect
                        data={tags}
                        value={selectedSubGenre}
                        onChange={setSelectedSubGenre}
                        searchable
                        nothingFound="Kein Ergebnis gefunden"
                        label="Wähle ein oder mehrere Subgenres aus"
                    />
                </Group>
            </Container>
            <Group position="center" pt="xl">
                <Button variant="light" onClick={onSave}>
                    Song empfehlen
                </Button>
                <Button variant="light" color="red" onClick={close}>
                    Abbrechen
                </Button>
            </Group>
        </Container>
    );
}
