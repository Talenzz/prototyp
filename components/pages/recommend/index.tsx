"use client";

import { SpotifyToken } from "@/app/api/spotify/token/route";
import { SongSearch } from "@/components/SongSearch";
import { HeroTitle } from "@/components/layout/Hero";
import { Center, Container, Space, Text, Title } from "@mantine/core";

type RecommendComponentProps = {
    token: SpotifyToken;
};

export function RecommendComponent({ token }: RecommendComponentProps) {
    return (
        <>
            {/* <HeroTitle /> */}
            <Container size="45%" p="md">
                <Center>
                    <Title order={1}>Empfehlen und Entecken: Wie funktioniert's?</Title>
                </Center>
                <Space h="xl" />
                <Text>
                    Du kannst der Community einmal täglich ein Lied empfehlen. Dieser kann dann von anderen Usern entdeckt werden. Je öfter der Song von anderen Usern geliked wird, desto höher die Chance, dass der Artist bei uns aufgenommen wird.
                </Text>
                <Space h="md" />
                <Text>
                    Ab einer bestimmten Anzahl an Likes werden die KünstlerInnen von uns angeschrieben. Diese entscheiden dann, ob sie dem ersten Community Label beitreten wollen und Teile ihrer Rechte ihren Fans anbieten, um ihr nächstes Projekt zu verwirklichen.
                </Text>
                <Space h="md" />
                <Text fw={700}>
                    Nach 14 Tagen fällt der Song dann wieder aus dem Entdeckungspool heraus.
                </Text>
                <Space h="md" />
                <Text>
                    Die Empfehlungen der Community kannst Du Dir als Samples anhören. Wenn dir die Musik gefällt, kannst Du sie liken und auch in eine Playlist auf Spotify abspeichern. Diese wird dann in deinem Profil angezeigt, was auch dazu beiträgt, dass der/ die Künstlerln von anderen Usern entdeckt wird.
                </Text>
            </Container>
            <Space h="xl" />
            <SongSearch />
        </>
    );
}
