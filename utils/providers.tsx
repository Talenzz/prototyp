"use client";

import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
            <Notifications />
            {children}
        </MantineProvider>
    );
}
