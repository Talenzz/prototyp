import { createStyles, Card, Image, Text, Group } from "@mantine/core";

type SongProps = {
    title: string;
    link: string;
    artists: { url: string; name: string }[];
    album: { url: string; name: string };
    image: { url: string; width: number; height: number; alt?: string };
    onclick?: (song: string) => void;
};

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

export function SongCard({
    title,
    link,
    artists,
    album,
    image,
    onclick,
}: SongProps) {
    const { classes } = useStyles();

    return (
        <Card
            className={classes.card}
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            onClick={() => {
                onclick && onclick(link);
            }}
        >
            <Card.Section>
                <Image src={image.url} alt={image.alt} />
            </Card.Section>

            <Group position="apart" mt="md">
                <Text
                    component="a"
                    className={classes.links}
                    href={link}
                    weight={500}
                >
                    {title}
                </Text>
            </Group>

            {artists.map((artist, index) => (
                <Text
                    className={classes.links}
                    component="a"
                    fz="sm"
                    href={artist.url}
                    key={artist.name}
                    sx={
                        index >= artists.length - 1
                            ? {}
                            : { marginRight: "0.5rem" }
                    }
                >
                    {index >= artists.length - 1
                        ? artist.name
                        : `${artist.name},`}
                </Text>
            ))}
        </Card>
    );
}
