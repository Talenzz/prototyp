"use client";

import {
    createStyles
} from "@mantine/core";

export const useStyles = createStyles((theme) => ({
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