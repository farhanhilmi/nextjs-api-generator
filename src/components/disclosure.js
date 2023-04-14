import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon, TrashIcon } from '@heroicons/react/20/solid';
import CardInfo from './cardInfo';
import { useEffect, useState } from 'react';
import moment from 'moment/moment';

export default function DisclosureView() {
    // const [linkClicked, setLinkClicked] = useState(false);

    // const props = {
    //     id: 'test',
    //     serviceName: 'test',
    //     description: 'test',
    //     databaseType: 'test',
    //     properties: {},
    //     expiredAt: 'test',
    //     archieve: {
    //         name: 'test',
    //         file: 'test',
    //     },
    // };
    const [state, setState] = useState(false);
    // get data from local storage and set it to state
    useEffect(() => {
        (async () => {
            if (JSON.parse(localStorage.getItem('api_archieve'))) {
                const archieve = await getData();
                archieve.sort((a, b) =>
                    a.createdAt > b.createdAt
                        ? -1
                        : b.createdAt > a.createdAt
                        ? 1
                        : 0,
                );
                setState(archieve);
            }
        })();
    }, []);

    // fetching data from local storage
    const getData = async () => {
        return await JSON.parse(localStorage.getItem('api_archieve'));
    };

    const clearHandler = async () => {
        if (JSON.parse(localStorage.getItem('api_archieve'))) {
            localStorage.removeItem('api_archieve');
            setState(false);
        }
    };

    // const handleLinkClick = (e) => {
    //     e.preventDefault();
    //     // router.push(url);
    //     setLinkClicked(true);
    // };

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
                        <div className="py-2 pb-4">
                            <h2 className="text-center font-bold text-gray-600">
                                History of your generated APIs
                            </h2>
                            <div className="text-white flex justify-end">
                                <button
                                    onClick={clearHandler}
                                    className="flex items-center justify-center rounded-lg bg-red-100 px-2 py-1 text-center text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring focus-visible:ring-red-500 focus-visible:ring-opacity-75"
                                >
                                    <TrashIcon className="h-3 w-3 inline-block me-1" />
                                    <p className="text-sm font-semibold me-2">
                                        Clear history
                                    </p>
                                </button>
                            </div>
                        </div>
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
                                                // handleLinkClick={
                                                //     handleLinkClick
                                                // }
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
