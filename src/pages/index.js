import Footer from '@/components/footer';
import Contact from '@/components/home/contact';
import Features from '@/components/home/feature';
import Hero from '@/components/home/hero';
import Head from 'next/head';

export default function Home() {
    return (
        <>
            <Head>
                <title>API Generator</title>
            </Head>
            <div className="min-h-screen">
                <Hero />
                <Features />
                <Contact />
                <Footer />
            </div>
        </>
    );
}
