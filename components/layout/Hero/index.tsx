"use client";

import {
    createStyles,
    Container,
    Text,
    Button,
    Group,
    rem,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
    wrapper: {
        position: "relative",
        boxSizing: "border-box",
        backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    },

    inner: {
        position: "relative",
        paddingTop: rem(200),
        paddingBottom: rem(120),

        [theme.fn.smallerThan("sm")]: {
            paddingBottom: rem(80),
            paddingTop: rem(80),
        },
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: rem(62),
        fontWeight: 900,
        lineHeight: 1.1,
        margin: 0,
        padding: 0,
        color: theme.colorScheme === "dark" ? theme.white : theme.black,

        [theme.fn.smallerThan("sm")]: {
            fontSize: rem(42),
            lineHeight: 1.2,
        },
    },

    description: {
        marginTop: theme.spacing.xl,
        fontSize: rem(24),

        [theme.fn.smallerThan("sm")]: {
            fontSize: rem(18),
        },
    },
}));

export function HeroTitle() {
    const { classes } = useStyles();

    return (
        <>
            <div className={classes.wrapper}>
                <Container size={700} className={classes.inner}>
                    <h1 className={classes.title}>
                        <Text
                            component="span"
                            variant="gradient"
                            gradient={{ from: "blue", to: "cyan" }}
                            inherit
                        >
                            Empfehlen und Entdecken:
                        </Text>{" "}
                        Wie funktioniert`&apos;`s?
                    </h1>

                    <Text className={classes.description} color="dimmed">
                        Du kannst der Community einmal täglich ein Lied
                        empfehlen. Dieser tauch dann bei den anderen Usern auf.
                        Je öfter der Song von anderen Usern geliked wird, desto
                        höher die Chance, dass der Artist bei uns aufgenommen
                        wird.
                    </Text>
                </Container>
            </div>
            <Container size={700}>
                <Text className={classes.description} color="dimmed">
                    Ab einer bestimmten Anzahl an Likes werden die KünstlerInnen
                    von uns angeschrieben. Diese entscheiden dann, ob sie Teil
                    der ersten Community Labels werden wollen und Teile ihrer
                    Rechte anbieten, um Ihr nächstes Projekt zu verwirklichen.
                </Text>

                <Text className={classes.description} color="dimmed">
                    Nach 30 Tagen fällt der Song dann wieder aus dem
                    Entdeckungspool heraus.
                </Text>

                <Text className={classes.description} color="dimmed">
                    Die Empfehlungen der Community kannst Du Dir als Samples
                    anhören. Wenn dir die Musik gefällt, kannst Du sie liken.
                    Diese wird dann in deinem Profil gespeichert, was auch dazu
                    beiträgt, dass der/die KünstlerIn von anderen Usern entdeckt
                    wird.
                </Text>
            </Container>
        </>
    );
}
