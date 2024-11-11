"use client";

import { Button, Center, Container, Grid, Space, Text, Title } from "@mantine/core";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function HomePage() {
    const router = useRouter();

    return (
        <>
            <Container size="xl" mt="xl" mb="xl">
                <Grid>
                    <Grid.Col span={6}>
                        <Title>Das Community Label</Title>
                        <Space h="xl" />
                        <Text fw={700}>
                            Talenzz demokratisiert die Musiklandschaft.
                        </Text>
                        <Space h="xl" />
                        <Text fw={700}>
                            Werde vom Fan zum Schlüsselpartner - 1000 echte Fans
                            machen den Unterschied.
                        </Text>
                        <Space h="xl" />
                        <Text fw={700}>
                            Entdecke neue Musik, empfehle Deine Topsongs der
                            Community und unterstütze Deine neuen
                            Lieblingsartists.
                        </Text>
                        <Space h="xl" />
                        <Text fw={700}>
                            Talenzz revolutioniert die Beziehung zwischen
                            Musikschaffenden und Fans.
                        </Text>
                        <Center mt="xl">
                            <Button
                                variant="default"
                                onClick={() => router.push("/recommend")}
                            >
                                Empfehle deinen Song
                            </Button>
                        </Center>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                            <Image src="/images/home/1.jpg" fill={true} alt="" style={{ borderRadius: "10px" }} />
                        </div>
                    </Grid.Col>
                </Grid>
                <Space my="xl" />
                <Grid my="2.5rem">
                    <Grid.Col span={6}>
                        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                            <Image src="/images/home/2.jpg" fill={true} alt="" style={{ borderRadius: "10px" }} />
                        </div>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Text fw={700}>Der Algorithmic Disconnect:</Text>
                        <Text>
                            Große Plattformen wie YouTube, Instagram und Spotify haben einen Paradigmenwechsel vollzogen - von follow-basierten Feeds zu algorithmischen Ranking-Systemen. Die Konsequenzen sind weitreichend:
                            Content wird für Algorithmen statt für Menschen optimiert
                                1. Fans verpassen Inhalte von Kreativen, denen sie folgen
                                2. Die direkte Verbindung zwischen Artists und Publikum erodiert
                                3. Kreativität wird zugunsten von Performance-Metriken wie Watchtime unterdrückt
                                4. Ein unsichtbarer Krieg zwischen Inhalten entbrennt, basierend auf undurchsichtigen Kriterien
                                5. Spam und KI-generierte Inhalte überfluten die Plattformen
                                6. Selbst auf Spotify tauchen &quot;Ghost Artists&quot; auf, deren Songs für Algorithmen optimiert sind                                                   
                           
                        </Text>
                        <Space h="xl" />
                        <Text fw={700}>Talenzz: Ein Paradigmenwechsel für die Musikbranche</Text>
                        <Text>
                            In dieser herausfordernden Landschaft positioniert sich Talenzz als sicherer Hafen für Artists und Fans. Unser Ziel ist die Wiederherstellung authentischer Verbindungen in der digitalen Welt.
                            Unser innovativer Ansatz:
                                1. Fokus auf direkte Fan-Artist-Beziehungen
                                2. Revolutionäre Musikentdeckung und -empfehlung
                                3. Crowdfunding-Modell zur nachhaltigen Unterstützung von Musikschaffenden
                        </Text>
                        <Space h="xl" />                        
                    </Grid.Col>
                </Grid>
                <Space my="xl" />
                <Space my="xl" />
                <Grid>
                    <Grid.Col span={6}>
                        <Text fw={700}>Empfehlen und Entdecken</Text>
                        <Text>
                            Du kannst der Community einmal täglich ein Lied empfehlen. Dieser taucht dann bei den anderen Usern auf. Je öfter der Song von anderen Usern geliked wird, desto höher ist er in den Charts.
                        </Text>
                        <Space h="md" />
                        <Text>
                            Ab einer bestimmten Reichweite werden die Artists von uns angeschrieben. Diese entscheiden dann, ob sie Teil von Talenzz/unseren Partnern werden wollen und Teile ihrer Rechte anbieten, um Ihr nächstes Projekt zu verwirklichen.
                        </Text>
                        <Space h="md" />
                        <Text>
                            Nach 14 Tagen fällt der Song dann wieder aus dem Entdeckungspool heraus.
                        </Text>
                        <Space h="md" />
                        <Text>
                            Die Empfehlungen der Community kannst Du Dir als Samples anhören. Wenn dir die Musik gefällt, kannst du sie liken. Diese wird dann in deinem Profil gespeichert, was auch dazu beiträgt, dass der/die Künstlerin von anderen Usern entdeckt wird.
                        </Text>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                            <Image src="/images/home/3.jpg" fill={true} alt="" style={{ borderRadius: "10px" }} />
                        </div>
                    </Grid.Col>
                </Grid>
            </Container>
        </>
    );
}
