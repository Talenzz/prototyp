"use client";

import { useState } from "react";
import {
    createStyles,
    Header,
    Container,
    Image,
    Burger,
    rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";

const useStyles = createStyles((theme) => ({
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
    },

    links: {
        [theme.fn.smallerThan("xs")]: {
            display: "none",
        },
    },

    burger: {
        [theme.fn.largerThan("xs")]: {
            display: "none",
        },
    },

    link: {
        display: "block",
        lineHeight: 1,
        padding: `${rem(8)} ${rem(12)}`,
        borderRadius: theme.radius.sm,
        textDecoration: "none",
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[0]
                : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        "&:hover": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
        },
    },

    linkActive: {
        "&, &:hover": {
            backgroundColor: theme.fn.variant({
                variant: "light",
                color: theme.primaryColor,
            }).background,
            color: theme.fn.variant({
                variant: "light",
                color: theme.primaryColor,
            }).color,
        },
    },

    inactiveLink: {
        cursor: "not-allowed",
    },
}));

interface HeaderSimpleProps {
    links: { link: string; label: string; activeLink?: boolean }[];
}

export function HeaderSimple({ links }: HeaderSimpleProps) {
    const path = usePathname();
    const [opened, { toggle }] = useDisclosure(false);
    const [active, setActive] = useState<string | null>(path);
    const { classes, cx } = useStyles();

    const items = links.map((link) => (
        <Link
            key={link.label}
            href={link.link}
            className={cx(classes.link, {
                [classes.linkActive]: active === link.link,
                [classes.inactiveLink]: link.activeLink === false,
            })}
            onClick={(e) => {
                if (link.activeLink === false) {
                    e.preventDefault();
                    return;
                }
                setActive(link.link);
            }}
        >
            {link.label}
        </Link>
    ));

    return (
        <Header height={60}>
            <Container className={classes.header}>
                <Link href="/" onClick={(e) => setActive(null)}>
                    <Image
                        src="/images/Talenzz_logo.png"
                        width={128}
                        alt={""}
                    />
                </Link>
                {items}

                <Burger
                    opened={opened}
                    onClick={toggle}
                    className={classes.burger}
                    size="sm"
                />
            </Container>
        </Header>
    );
}
