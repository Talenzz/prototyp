"use client";

import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    footerIcons: {
        display: "flex",
        justifyContent: "space-between"
    },

    links: {
        [theme.fn.smallerThan('xs')]: {
            marginTop: theme.spacing.md,
        },
    },
}));
