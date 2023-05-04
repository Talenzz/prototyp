"use client";

import {
    createStyles,
    Title,
    TextInput,
    Container,
    Flex,
    Center,
    Modal,
} from "@mantine/core";
import axios from "axios";
import { SongCard } from "../SongCard";
import { useEffect, useState } from "react";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import { SpotifyToken } from "@/app/api/spotify/token/route";
import { ITrack, ITrackSearchResult } from "@/types/spotify";
import { SongRecommend } from "../SongRecommend";

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

        const res = await axios.get(
            `https://api.spotify.com/v1/search?q=${value}&type=track`,
            {
                headers: {
                    Authorization: `Bearer ${token.access_token}`,
                },
                params: {
                    limit: 9,
                },
            }
        );

        const searchResult: ITrackSearchResult = res.data;

        const tmpCards = searchResult.tracks.items.map((song) => {
            return (
                <SongCard key={song.id} track={song} onclick={onCardClick} />
            );
        });

        setCards(tmpCards);
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
            <Modal
                opened={opened}
                onClose={close}
                // title={`Recommend Song: ${activeTrack?.name}`}
                size="80%"
                centered
            >
                {activeTrack && (
                    <SongRecommend
                        track={activeTrack}
                        token={token}
                        close={close}
                    />
                )}
            </Modal>
        </>
    );
}
