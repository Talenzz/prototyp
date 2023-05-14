"use client";

import { Spotify } from "@/components/SpotifyPlayer";
import { genres, tags } from "@/utils/genres";
import {
    ActionIcon,
    Button,
    Center,
    Container,
    Divider,
    Grid,
    Group,
    Modal,
    MultiSelect,
    Select,
    Space,
    Stack,
    Text,
    Title,
    Tooltip,
    createStyles,
    rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
    HiAdjustmentsVertical,
    HiOutlineHeart,
    HiHeart,
} from "react-icons/hi2";
import { MdArrowForwardIos, MdRefresh } from "react-icons/md";
import { ISong } from "@/models/Song";
import { DiscoverSongInformationComponent } from "@/components/DiscoverSongInformation";

const useStyles = createStyles((theme) => ({
    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: rem(62),
        fontWeight: 900,
        textAlign: "center",
        lineHeight: 1.1,
        margin: 0,
        padding: 0,
        color: theme.colorScheme === "dark" ? theme.white : theme.black,

        [theme.fn.smallerThan("sm")]: {
            fontSize: rem(42),
            lineHeight: 1.2,
        },
    },
}));

type SortingOptions = "newest" | "popular" | "random";
interface FilterFormSchema {
    genres: string[];
    tags: string[];
    sorting: SortingOptions;
}

interface MusicComponentProps {
    // add latest 50 songs as initial value
    songs: ISong[];
}

export function MusicComponent({ songs }: MusicComponentProps) {
    const { classes } = useStyles();
    const router = useRouter();

    const Form = useForm<FilterFormSchema>({
        initialValues: {
            genres: [],
            tags: [],
            sorting: "newest",
        },
    });

    const [liked, setLiked] = useState(false);
    const [opened, { open, close }] = useDisclosure(false);

    console.log(songs);

    // song state
    const [fetchedSongs, setFetchedSongs] = useState<ISong[]>(songs);
    const [currentSong, setCurrentSong] = useState<ISong>(songs[0]);
    const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);

    const setFilter = async (values: FilterFormSchema) => {
        // make api call with values
        const res = await fetch(
            `http://localhost:3000/api/spotify/tracks?genres=${values.genres.join(
                ","
            )}&tags=${values.tags.join(",")}`
        ); // &sorting=${values.sorting}
        const songs = (await res.json()) as ISong[];
        console.log(songs);

        if (songs.length > 0) {
            setFetchedSongs(songs);
            setCurrentSong(songs[0]);
        }

        close();
    };

    const handleNextSong = (reload: boolean) => {
        if (reload) {
            setCurrentSong(fetchedSongs[0]);
            setCurrentSongIndex(0);
        }

        if (currentSongIndex < fetchedSongs.length - 1) {
            setCurrentSongIndex(currentSongIndex + 1);
            setCurrentSong(fetchedSongs[currentSongIndex + 1]);
        }
    };

    return (
        <>
            <Container size="xl" p="xl">
                <h1 className={classes.title}>
                    <Text
                        component="span"
                        variant="gradient"
                        gradient={{ from: "yellow", to: "cyan" }}
                        inherit
                    >
                        Musik entdecken
                    </Text>{" "}
                    - Wie funktioniert&apos;s?
                </h1>
                <Space h="xl" />
                <Center>
                    <Button
                        variant="default"
                        onClick={() => router.push("/recommend")}
                    >
                        Mehr Informationen
                    </Button>
                </Center>
            </Container>
            <Container>
                <Stack spacing="xl">
                    {fetchedSongs.length > 0 ? (
                        <Spotify id={currentSong?.spotify.song.id!} />
                    ) : (
                        <Center>
                            <Text size="lg" weight={700}>
                                Keine Songs gefunden. Bitte passe die Filter an.
                            </Text>
                        </Center>
                    )}
                    <Grid justify="space-between" align="center">
                        <Grid.Col span={3}>
                            <Tooltip
                                label={
                                    liked
                                        ? "Aus der Playlist entfernen"
                                        : "Zur Playlist hinzufügen"
                                }
                                withArrow
                                position="bottom"
                                arrowPosition="center"
                            >
                                <ActionIcon
                                    size="xl"
                                    onClick={() => setLiked(!liked)}
                                >
                                    {liked ? (
                                        <HiHeart size={32} />
                                    ) : (
                                        <HiOutlineHeart size={32} />
                                    )}
                                </ActionIcon>
                            </Tooltip>
                        </Grid.Col>
                        <Grid.Col span={3} sx={{ textAlign: "center" }}>
                            {currentSongIndex < fetchedSongs.length - 1 ? (
                                <Tooltip
                                    label="Nächstes Lied aus aktueller Playlist abspielen"
                                    withArrow
                                    position="bottom"
                                    arrowPosition="center"
                                >
                                    <Button
                                        rightIcon={
                                            <MdArrowForwardIos size={16} />
                                        }
                                        variant="default"
                                        onClick={() => handleNextSong(false)}
                                    >
                                        Nächstes Lied
                                    </Button>
                                </Tooltip>
                            ) : (
                                <Tooltip
                                    label="Playlist neu laden"
                                    withArrow
                                    position="bottom"
                                    arrowPosition="center"
                                >
                                    <Button
                                        rightIcon={<MdRefresh size={16} />}
                                        variant="default"
                                        onClick={() => handleNextSong(true)}
                                    >
                                        Playlist neu laden
                                    </Button>
                                </Tooltip>
                            )}
                        </Grid.Col>
                        <Grid.Col span={3}>
                            <Tooltip
                                label="Filter anpassen"
                                withArrow
                                position="bottom"
                                arrowPosition="center"
                            >
                                <ActionIcon
                                    size="xl"
                                    variant="outline"
                                    sx={{ float: "right" }}
                                    onClick={() => open()}
                                >
                                    <HiAdjustmentsVertical size={32} />
                                </ActionIcon>
                            </Tooltip>
                        </Grid.Col>
                    </Grid>
                </Stack>
                <Space h="xl" />
                <DiscoverSongInformationComponent songs={songs} currentIndex={currentSongIndex} />
            </Container>
            <Modal opened={opened} onClose={close} size="xl">
                <form onSubmit={Form.onSubmit((values) => setFilter(values))}>
                    <Title order={1}>Filter anpassen</Title>
                    <Space h="xl" />
                    <Grid>
                        <Grid.Col span="auto">
                            <Title order={3}>Genres</Title>
                            <Space h="md" />
                            <MultiSelect
                                {...Form.getInputProps("genres")}
                                data={genres}
                                zIndex={1000}
                                label="Wähle mindestens ein Genre aus"
                                searchable
                                nothingFound="Kein Ergebnis gefunden"
                                required
                            />
                        </Grid.Col>
                        <Grid.Col span="auto">
                            <Title order={3}>Tags</Title>
                            <Space h="md" />
                            <MultiSelect
                                {...Form.getInputProps("tags")}
                                data={tags}
                                zIndex={1000}
                                label="Optional: Wähle gewünschte Tags/Subgenres"
                                searchable
                                nothingFound="Kein Ergebnis gefunden"
                            />
                        </Grid.Col>
                    </Grid>
                    <Divider my="xl" />
                    <Title order={3}>Sortierung</Title>
                    <Space h="md" />
                    <Select
                        {...Form.getInputProps("sorting")}
                        data={[
                            { value: "newest", label: "Neueste zuerst" },
                            { value: "popular", label: "Populärste" },
                            { value: "random", label: "Zufällig" },
                        ]}
                        label="Sortieren nach"
                        required
                    />
                    <Space my="xl" />
                    <Group position="center" pt="xl">
                        <Button variant="default" type="submit">
                            Schließen
                        </Button>
                    </Group>
                </form>
            </Modal>
        </>
    );
}
