import Footer from '@/components/footer';
import Contact from '@/components/home/contact';
import Features from '@/components/home/feature';
import Hero from '@/components/home/hero';

export default function Home() {
    return (
        <div className="min-h-screen">
            <Hero />
            <Features />
            <Contact />
            <Footer />
        </div>
    );
}
