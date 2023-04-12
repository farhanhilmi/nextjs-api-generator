import CardInfo from '@/components/cardInfo';
import DialogModal from '@/components/dialogModal';
import Footer from '@/components/footer';
import Form from '@/components/generate/form';
import Properties from '@/components/generate/properties';
import Header from '@/components/header';
import config from '@/config';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Result() {
    const [state, setState] = useState(false);
    const [linkClicked, setLinkClicked] = useState(false);
    const router = useRouter();

    // get archieve from local storage
    useEffect(() => {
        (async function () {
            if (router.isReady) {
                if (JSON.parse(localStorage.getItem('api_archieve'))) {
                    const { id } = router.query;
                    const archieve = await getData(id);
                    setState(archieve);
                }
            } else {
                console.log('NOT READY');
            }
        })();
    }, [router.isReady]);

    // fetching data from local storage
    const getData = async (id) => {
        const data = JSON.parse(localStorage.getItem('api_archieve'));
        return await data.filter(
            (archieve) => archieve.id.toLowerCase() === id.toLowerCase(),
        )[0];
    };

    const handleLinkClick = (e, url) => {
        e.preventDefault();
        router.push(`${config.NEXT_PUBLIC_API_URL}${url}`);
        setLinkClicked(true);
    };

    return (
        <div className="min-h-screen">
            <Header />
            <div className="bg-white">
                <div className="relative isolate px-6 pt-14 lg:px-8">
                    {/* Background */}
                    <div
                        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                        aria-hidden="true"
                    >
                        <div
                            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                        />
                    </div>
                    {/* END BG */}
                    <div className="grid justify-center py-20">
                        {/* <Tabs /> */}
                        {router.isReady && state ? (
                            <CardInfo
                                handleLinkClick={handleLinkClick}
                                props={state}
                            />
                        ) : (
                            'No Record Found'
                        )}
                        <DialogModal
                            linkClicked={linkClicked}
                            setLinkClicked={setLinkClicked}
                        />
                    </div>
                    {/* <div
                        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                        aria-hidden="true"
                    >
                        <div
                            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                        />
                    </div> */}
                </div>
            </div>
            <Footer />
        </div>
    );
}
