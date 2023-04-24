import { HeaderSimple } from "@/components/layout/Header";
import { Providers } from "@/utils/providers";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <HeaderSimple
                        links={[
                            { link: "", label: "Home" },
                            { link: "/marketplace", label: "Marktplatz" },
                            { link: "/recommend", label: "Empfehlen" },
                            { link: "/music", label: "Musik" },
                            { link: "/portfolio", label: "Portfolio" },
                        ]}
                    />
                    {children}
                </Providers>
            </body>
        </html>
    );
}

