"use client";

import { Container, ActionIcon, Image, Stack, Text, Grid, Divider, Space, TextInput, Button, Box, Center } from '@mantine/core';
import { FaDiscord, FaInstagram, FaTwitter } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { useStyles } from './styles';
import Link from 'next/link';

export function FooterSocial() {
    const { classes } = useStyles();

    return (
        <>
            <Space mt="5rem" />
            <Divider />
            <Container py="xl" size="xl">
                <Grid>
                    <Grid.Col md={6}>
                        <Stack spacing="md">
                            <Image src='/images/Talenzz_logo.png' width={200} alt="logo" />
                            <TextInput label="Bleib auf dem Laufenden und melde Dich zu unserem Newsletter an!" placeholder="Email-Adresse" sx={{ maxWidth: '440px' }}
                                rightSection={<Button variant='default'>Anmelden</Button>} />
                        </Stack>
                    </Grid.Col>
                    <Grid.Col md={6} sx={{ alignSelf: "flex-end" }}>
                        <Box sx={{ width: "65%", marginLeft: "auto" }}>
                            <Stack spacing="md">
                                <Text size="sm" weight={500}>
                                    Vernetze Dich mit uns!
                                </Text>
                                <div className={classes.footerIcons}>
                                    <ActionIcon size="xl">
                                        <FaDiscord size="2rem" />
                                    </ActionIcon>
                                    <ActionIcon size="xl">
                                        <FaInstagram size="2rem" />
                                    </ActionIcon>
                                    <ActionIcon size="xl">
                                        <FaTwitter size="2rem" />
                                    </ActionIcon>
                                    <ActionIcon size="xl">
                                        <MdEmail size="2rem" />
                                    </ActionIcon>
                                </div>
                            </Stack>
                        </Box>
                    </Grid.Col>
                </Grid>
                <Space mt="2rem" />
                <Grid>
                    <Grid.Col md={5}>
                        <Text sx={{ textAlign: "right" }}>&#169; Talenzz GmbH 2023</Text>
                    </Grid.Col>
                    <Grid.Col md={2}></Grid.Col>
                    <Grid.Col md={5}><Link href="">Impressum</Link></Grid.Col>
                </Grid>
            </Container>
        </>
    );
}
