"use client";

import { Spotify } from "@/components/SpotifyPlayer";
import {
    ActionIcon,
    Button,
    Container,
    Grid,
    Stack,
    Tooltip,
} from "@mantine/core";
import { useState } from "react";
import {
    HiAdjustmentsVertical,
    HiOutlineHeart,
    HiHeart,
} from "react-icons/hi2";
import { MdArrowForwardIos } from "react-icons/md";

// async function getInitialTracks() {
//     const res = await fetch("http://localhost:3000/api/spotify/tracks");
//     return (await res.json()) as ISong;
// }

export function MusicComponent() {
    const [liked, setLiked] = useState(false);

    return (
        <Container>
            <Stack spacing="xl">
                <Spotify id="0tzWCL2uhb2xQDWgG259nU" />
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
                    <Grid.Col span={3}>
                        <Tooltip
                            label="Nächstes Lied aus aktueller Playlist abspielen"
                            withArrow
                            position="bottom"
                            arrowPosition="center"
                        >
                            <Button
                                rightIcon={<MdArrowForwardIos size={16} />}
                                variant="default"
                            >
                                Nächstes Lied
                            </Button>
                        </Tooltip>
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
                            >
                                <HiAdjustmentsVertical size={32} />
                            </ActionIcon>
                        </Tooltip>
                    </Grid.Col>
                </Grid>
            </Stack>
        </Container>
    );
}
