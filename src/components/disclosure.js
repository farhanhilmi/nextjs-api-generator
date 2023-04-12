import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import CardInfo from './cardInfo';
import { useEffect, useState } from 'react';
import moment from 'moment/moment';
import DialogModal from './dialogModal';
import { useRouter } from 'next/router';
import config from '@/config';

export default function DisclosureView() {
    const [linkClicked, setLinkClicked] = useState(false);
    const router = useRouter();

    const props = {
        id: 'test',
        serviceName: 'test',
        description: 'test',
        databaseType: 'test',
        properties: {},
        expiredAt: 'test',
        archieve: {
            name: 'test',
            file: 'test',
        },
    };
    const [state, setState] = useState(false);
    // get data from local storage and set it to state
    useEffect(() => {
        (async () => {
            if (JSON.parse(localStorage.getItem('api_archieve'))) {
                const archieve = await getData();
                setState(archieve);
            }
        })();
    }, []);

    // fetching data from local storage
    const getData = async () => {
        return await JSON.parse(localStorage.getItem('api_archieve'));
    };

    const handleLinkClick = (e, url) => {
        e.preventDefault();
        router.push(`${config.NEXT_PUBLIC_API_URL}${url}`);
        setLinkClicked(true);
    };

    return (
        <div className="w-full px-4 pt-16">
            <div className="mx-auto w-full max-w-2xl shadow rounded-2xl bg-white p-2 ">
                {!state ? (
                    <p className="text-center py-4 text-gray-600 text-xl">
                        At the moment, you have no generated APIs. Please
                        generate one.
                    </p>
                ) : (
                    <div>
                        <h2 className="py-2 pb-8 text-center font-bold text-gray-600">
                            History of your generated APIs
                        </h2>
                        {state.map((item) => (
                            <Disclosure key={item.id} as="div" className="mb-2">
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                            <span>
                                                {item.serviceName} ~ generated{' '}
                                                {moment(
                                                    new Date(item.createdAt),
                                                ).fromNow()}
                                                {/* {timeSince(
                                                    new Date(item.createdAt),
                                                )}{' '}
                                                ago */}
                                            </span>
                                            <ChevronUpIcon
                                                className={`${
                                                    open
                                                        ? 'rotate-180 transform'
                                                        : ''
                                                } h-5 w-5 text-purple-500`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                            <CardInfo
                                                props={item}
                                                title={item.serviceName}
                                                description={item.description}
                                                handleLinkClick={
                                                    handleLinkClick
                                                }
                                            />
                                            <DialogModal
                                                linkClicked={linkClicked}
                                                setLinkClicked={setLinkClicked}
                                            />
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
