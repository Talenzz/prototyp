import { HeaderSimple } from "@/components/layout/Header";
import { getUserFromCookie } from "@/lib/pocketbase/helper";
import { Providers } from "@/utils/providers";
import { cookies } from "next/dist/client/components/headers";
import { redirect } from "next/navigation";
import { Inter } from "next/font/google";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
    icons: {
        icon: "/favicon.ico",
    }
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // const headersList = headers();
    // const header_url = headersList.get("x-url") || "";

    // if (!header_url.includes("auth")) {
    //     const user = getUserFromCookie(cookies());
    //     if (!user) {
    //         redirect("/auth/login");
    //     }
    // }

    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <HeaderSimple
                        links={[
                            { link: "/marketplace", label: "Marktplatz", activeLink: false },
                            { link: "/recommend", label: "Empfehlen" },
                            { link: "/music", label: "Musik" },
                            { link: "/portfolio", label: "Portfolio", activeLink: false },
                        ]}
                    />
                    {children}
                </Providers>
            </body>
        </html>
    );
}

