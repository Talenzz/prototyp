"use client";

import { Container, Divider, Grid, Space, Text, Title } from "@mantine/core";

export function HomePage() {
    return (
        <>
            <Container size="xl">
                <Grid>
                    <Grid.Col span={6}>
                        <Title>Das erste Community Label</Title>
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
                            LieblingskünstlerInnen.
                        </Text>
                        <Space h="xl" />
                        <Text fw={700}>
                            Talenzz revolutioniert die Beziehung zwischen
                            Musikschaffenden und Fans.
                        </Text>
                    </Grid.Col>
                    <Grid.Col span={6}>{/* Image 1 */}</Grid.Col>
                </Grid>
                <Divider my="xl" />
                <Grid>
                    <Grid.Col span={6}>{/* Image 2 */}</Grid.Col>
                    <Grid.Col span={6}>
                        <Text fw={700}>Investieren:</Text>
                        <Text>
                            Du kannst hier ganz unkompliziert Deine
                            LieblingskünstlerIn supporten in dem Du mit Deinem
                            Guthaben in die Rechte investierst. In Deinem
                            Dashboard kannst du Geld ein- und auszahlen und hast
                            all Deine Käufe im Überblick.
                        </Text>
                        <Space h="xl" />
                        <Text fw={700}>Was sind Rechte?</Text>
                        <Text>
                            Durch die Rechte am Werk erhält der/die KünstlerIn
                            seinen/ihren Anteil an z.B. den Streaming Einnahmen
                            eines Songs. Auf Talenzz kann ein Artist einen Teil
                            seiner/ihrer Rechte in vorher festgelegter Höhe und
                            Zeitraum für Fans freigeben. Hast Du investiert,
                            erhältst Du somit Deinen Anteil an den Streaming
                            Einnahmen des Liedes.
                        </Text>
                        <Space h="xl" />
                        <Text fw={700}>Was sind NFTs?</Text>
                        <Text>
                            NFTs sind einzigartige digitale Besitznachweise.
                            Diesen erhälst Du wenn Du in die Rechte eines Songs
                            investierst. Der Inhaber des NFTs ist gleichzeitig
                            der/die EmpfängerIn der Royalties. Du kannst später
                            Deine NFTs auch weiterverkaufen, wenn Du das
                            möchtest.
                        </Text>
                    </Grid.Col>
                </Grid>
                <Divider my="xl" />
                <Grid>
                    <Grid.Col span={6}>
                        <Text fw={700}>Empfehlen und Entdecken</Text>
                        <Text>
                            Du kannst der Community einmal täglich ein Lied
                            empfehlen. Dieser taucht dann bei den anderen Usern
                            auf. Je öfter der Song von anderen Usern geliked
                            wird, desto höher die Chance, dass der Artist bei
                            uns aufgenommen wird.
                        </Text>
                        <Space h="md" />
                        <Text>
                            Ab einer bestimmten Anzahl an Likes werden die
                            KünstlerInnen von uns angeschrieben. Diese
                            entscheiden dann, ob sie Teil des ersten Community
                            Labels werden wollen und Teile ihrer Rechte
                            anbieten, um Ihr nächstes Projekt zu verwirklichen.
                        </Text>
                        <Space h="md" />
                        <Text>
                            Nach 30 Tagen fällt der Song dann wieder aus dem
                            Entdeckungspool heraus.
                        </Text>
                        <Space h="md" />
                        <Text>
                            Die Empfehlungen der Community kannst Du Dir als
                            Samples anhören. Wenn dir die Musik gefällt, kannst
                            du sie liken. Diese wird dann in deinem Profil
                            gespeichert, was auch dazu beiträgt, dass der/die
                            KünstlerIn von anderen Usern entdeckt wird.
                        </Text>
                    </Grid.Col>
                    <Grid.Col span={6}>{/* Image 3 */}</Grid.Col>
                </Grid>
            </Container>
        </>
    );
}
