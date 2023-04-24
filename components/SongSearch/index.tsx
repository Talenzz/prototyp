"use client";

import {
    createStyles,
    Text,
    Title,
    TextInput,
    Button,
    rem,
    Container,
    Flex,
    Center,
} from "@mantine/core";
import axios from "axios";
import { SongCard } from "../SongCard";
import { useEffect, useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import { SpotifyToken } from "@/app/api/spotify/token/route";

const useStyles = createStyles((theme) => ({
    wrapper: {
        display: "flex",
        alignItems: "center",
        padding: `calc(${theme.spacing.xl} * 2)`,
        [theme.fn.smallerThan("sm")]: {
            flexDirection: "column-reverse",
            padding: theme.spacing.xl,
        },
    },

    image: {
        maxWidth: "40%",

        [theme.fn.smallerThan("sm")]: {
            maxWidth: "100%",
        },
    },

    body: {
        paddingRight: `calc(${theme.spacing.xl} * 4)`,
        paddingLeft: `calc(${theme.spacing.xl} * 4)`,
        [theme.fn.smallerThan("sm")]: {
            paddingRight: 0,
            marginTop: theme.spacing.xl,
        },
    },

    title: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        lineHeight: 1,
        marginBottom: theme.spacing.md,
    },

    controls: {
        display: "flex",
        marginTop: theme.spacing.xl,
    },

    inputWrapper: {
        width: "100%",
        flex: "1",
    },

    control: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
    },
}));

type SongSearchProps = {
    token: SpotifyToken;
};

export function SongSearch({ token }: SongSearchProps) {
    const { classes } = useStyles();

    const [accessToken, setAccessToken] = useState(token.access_token);

    const [value, setValue] = useState("");
    const [debounced] = useDebouncedValue(value, 350);

    const [songs, setSongs] = useState<any[]>([]);
    const [cards, setCards] = useState<JSX.Element[]>([]);

    // search on debounced value change
    useEffect(() => {
        search();
    }, [debounced]);

    const onCardClick = (link: string) => {
        console.log(link);
    };

    async function search() {
        if (!value) return;

        const res = await axios.get(
            `https://api.spotify.com/v1/search?q=${value}&type=track`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    limit: 9,
                },
            }
        );

        setSongs(res.data.tracks.items);

        const c = songs.map((song: any) => {
            const artists = song.artists.map((artist: any) => ({
                url: artist.external_urls.spotify,
                name: artist.name,
            }));

            const image = song.album.images[0];

            return (
                <SongCard
                    key={song.id}
                    title={song.name}
                    link={song.external_urls.spotify}
                    artists={artists}
                    album={{
                        url: song.album.external_urls.spotify,
                        name: song.album.name,
                    }}
                    image={{
                        url: image.url,
                        width: image.width,
                        height: image.height,
                        alt: song.name,
                    }}
                    onclick={onCardClick}
                />
            );
        });

        setCards(c);
    }

    return (
        <>
            <Container>
                <div className={classes.wrapper}>
                    <div className={classes.body}>
                        <Title className={classes.title}>
                            Empfehle der Community deinen Song-Tipp des Tages!
                        </Title>
                        {/* <Text fw={500} fz="lg" mb={5}>
                            Subscribe to our newsletter!
                        </Text>
                        <Text fz="sm" c="dimmed">
                            You will never miss important product updates,
                            latest news and community QA sessions. Our
                            newsletter is once a week, every Sunday.
                        </Text> */}

                        <div className={classes.controls}>
                            <TextInput
                                value={value}
                                placeholder="Song name"
                                classNames={{
                                    root: classes.inputWrapper,
                                }}
                                onChange={(event) =>
                                    setValue(event.currentTarget.value)
                                }
                            />
                        </div>
                    </div>
                </div>
            </Container>
            <Container size="xl">
                <Center>
                    <Flex
                        mih={50}
                        gap="xl"
                        justify="center"
                        align="flex-start"
                        direction="row"
                        wrap="wrap"
                    >
                        {cards}
                    </Flex>
                </Center>
            </Container>
        </>
    );
}
