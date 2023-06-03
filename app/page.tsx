import { HomePage } from "@/components/pages/Home";
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Talenzz - Home',
};

export default async function Home() {
    return (
        <>
            <HomePage />
        </>
    );
}

