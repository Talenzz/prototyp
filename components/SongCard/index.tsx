import { ITrack } from "@/types/spotify";
import { createStyles, Card, Text, Group } from "@mantine/core";
import Image from "next/image";

const useStyles = createStyles((theme) => ({
    card: {
        maxWidth: 320,
        ":hover": {
            boxShadow: theme.shadows.lg,
            border: `1px solid ${theme.colors.blue[5]}`,
            cursor: "pointer",
        },
        ":focus": {
            boxShadow: theme.shadows.sm,
            border: `1px solid ${theme.colors.blue[5]}`,
        },
    },
    links: {
        ":hover": {
            textDecoration: "underline",
        },
    },
    activeCard: {
        boxShadow: theme.shadows.lg,
        border: `1px solid ${theme.colors.blue[5]} !important`,
    },
}));

type SongProps = {
    track: ITrack;
    onclick: (track: ITrack) => void;
};

export function SongCard({ track, onclick }: SongProps) {
    const { classes } = useStyles();

    return (
        <Card
            className={classes.card}
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            onClick={() => {
                onclick(track);
            }}
        >
            <Card.Section>
                <Image src={track.album.images[0].url} width="400" height="400" alt={track.name} />
            </Card.Section>

            <Group position="apart" mt="md">
                <Text
                    component="a"
                    className={classes.links}
                    href={track.external_urls.spotify}
                    weight={500}
                >
                    {track.name}
                </Text>
            </Group>

            {track.artists.map((artist, index) => (
                <Text
                    className={classes.links}
                    component="a"
                    fz="sm"
                    href={artist.external_urls.spotify}
                    key={artist.name}
                    sx={
                        index >= track.artists.length - 1
                            ? {}
                            : { marginRight: "0.5rem" }
                    }
                >
                    {index >= track.artists.length - 1
                        ? artist.name
                        : `${artist.name},`}
                </Text>
            ))}
        </Card>
    );
}
