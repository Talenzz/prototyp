"use client";

import {
    Title,
    TextInput,
    Container,
    Flex,
    Center,
    Modal,
    Space,
} from "@mantine/core";
import { SongCard } from "../SongCard";
import { useEffect, useState } from "react";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import { ITrack, ITrackSearchResult } from "@/types/spotify";
import { SongRecommend } from "../SongRecommend";
import { useStyles } from "./styles";
import { retryFetch } from "@/utils/helper";
import { useSpotifyToken } from "@/hooks/useSpotifyToken";
import axios from "axios";


export function SongSearch() {
    const [token, refetchToken, validateToken] = useSpotifyToken();
    console.log({ token });

    const { classes } = useStyles();

    // song input states
    const [value, setValue] = useState("");
    const [debounced] = useDebouncedValue(value, 350);

    // song cards
    const [cards, setCards] = useState<JSX.Element[]>([]);

    // modal
    const [opened, { open, close }] = useDisclosure(false);
    const [activeTrack, setActiveTrack] = useState<ITrack | null>(null);

    // search on debounced value change
    useEffect(() => {
        search();
    }, [debounced]);

    const onCardClick = (track: ITrack) => {
        setActiveTrack(track);
        // opens modal
        open();
    };

    async function search() {
        if (!value) {
            setCards([]);
            return;
        }

        if (!validateToken()) {
            refetchToken();
        }

        const fetchFn = async () => {
            const res = await axios.get(
                `https://api.spotify.com/v1/search?q=${value}&type=track`,
                {
                    headers: {
                        Authorization: `Bearer ${token?.access_token}`,
                    },
                    params: {
                        limit: 9,
                    },
                }
            );
            return res.data as ITrackSearchResult;
        };

        const searchResult = await retryFetch<ITrackSearchResult>(fetchFn, refetchToken);

        if (!searchResult) {
            // send user message
            return;
        }
        const tmpCards = searchResult.tracks.items.map((song) => {
            return <SongCard key={song.id} track={song} onclick={onCardClick} />;
        });

        setCards(tmpCards);
    }

    return (
        <>
            <Container size="md">
                <Center>
                    <Title order={1}>
                        Empfehle der Community deinen Song-Tipp des Tages!
                    </Title>
                </Center>
                {/* <Text fw={500} fz="lg" mb={5}>
                            Subscribe to our newsletter!
                        </Text>
                        <Text fz="sm" c="dimmed">
                            You will never miss important product updates,
                            latest news and community QA sessions. Our
                            newsletter is once a week, every Sunday.
                        </Text> */}
                <Center>
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
                </Center>
            </Container>
            <Container size="xl" my="xl">
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
            <Modal
                opened={opened}
                onClose={close}
                // title={`Recommend Song: ${activeTrack?.name}`}
                size="65%"
                centered
            >
                {activeTrack && token && (
                    <SongRecommend
                        track={activeTrack}
                        close={close}
                    />
                )}
            </Modal>
        </>
    );
}
