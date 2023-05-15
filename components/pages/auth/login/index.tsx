"use client";

import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import axios from "axios";

export function LoginComponent() {
    const router = useRouter();

    return (
        <Container size={420} my={40}>
            <Title
                align="center"
                sx={(theme) => ({
                    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                    fontWeight: 900,
                })}
            >
                Welcome back!
            </Title>
            <Text color="dimmed" size="sm" align="center" mt={5}>
                Do not have an account yet?{" "}
                <Anchor size="sm" component="button">
                    Create account
                </Anchor>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <TextInput
                    label="Email"
                    placeholder="you@mantine.dev"
                    required
                />
                <PasswordInput
                    label="Password"
                    placeholder="Your password"
                    required
                    mt="md"
                />
                <Group position="apart" mt="lg">
                    <Checkbox label="Remember me" />
                    <Anchor component="button" size="sm">
                        Forgot password?
                    </Anchor>
                </Group>
                <Button
                    fullWidth
                    mt="xl"
                    onClick={async () => {
                        // Note: add encryption and get data from form
                        // Also add decryption on API route!
                        const res = await axios.post(
                            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
                            {
                                email: "",
                                password: "",
                            }
                        );

                        if (res.status === 200) {
                            router.push("/");
                        }
                    }}
                >
                    Sign in
                </Button>
            </Paper>
        </Container>
    );
}
