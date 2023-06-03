"use client";

import {
    createStyles
} from "@mantine/core";

export const useStyles = createStyles((theme) => ({
    controls: {
        display: "flex",
        marginTop: theme.spacing.xl,
        width: "75%"
    },

    inputWrapper: {
        width: "100%",
        flex: "1",
    },

}));