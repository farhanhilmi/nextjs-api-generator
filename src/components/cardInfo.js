import { PaperClipIcon } from '@heroicons/react/20/solid';
import DialogModal from './dialogModal';
import { useState } from 'react';

export default function CardInfo({
    props,
    title = 'Generated API',
    description = 'This is the API you generated. You can download the API archieve and use it in your project.',
}) {
    const isExpired = props.expiredAt > new Date().toLocaleString();
    const [linkClicked, setLinkClicked] = useState(false);
    return (
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                    {title}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    {description}
                </p>
            </div>
            <div className="border-t border-gray-200">
                <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Service Name
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            {props.serviceName}
                        </dd>
                    </div>
                    {description !==
                    'This is the API you generated. You can download the API archieve and use it in your project.' ? (
                        ''
                    ) : (
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Description
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {props.description}
                            </dd>
                        </div>
                    )}

                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Database Type
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            {props.databaseType}
                        </dd>
                    </div>
                    {/* <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Properties
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            {props.properties}
                        </dd>
                    </div> */}
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Expired At
                        </dt>
                        {isExpired ? (
                            <dd className="mt-1 text-sm text-red-400 sm:col-span-2 sm:mt-0">
                                {new Date(props.expiredAt).toLocaleString()}{' '}
                                (Expired)
                            </dd>
                        ) : (
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {new Date(props.expiredAt).toLocaleString()}
                            </dd>
                        )}
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Attachments
                        </dt>
                        {isExpired ? (
                            <dd className="mt-1 text-sm text-gray-400 sm:col-span-2 sm:mt-0">
                                <ul
                                    role="list"
                                    className="divide-y divide-gray-200 rounded-md border border-gray-200"
                                >
                                    <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                                        <div className="flex w-0 flex-1 items-center">
                                            <PaperClipIcon
                                                className="h-5 w-5 flex-shrink-0 text-gray-400"
                                                aria-hidden="true"
                                            />
                                            <span className="ml-2 w-0 flex-1 truncate">
                                                {props.id}.zip
                                            </span>
                                        </div>
                                        <div className="ml-4 flex-shrink-0">
                                            <a
                                                href="#"
                                                className="font-medium text-gray-400 hover:cursor-none"
                                            >
                                                Download
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                            </dd>
                        ) : (
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                <ul
                                    role="list"
                                    className="divide-y divide-gray-200 rounded-md border border-gray-200"
                                >
                                    <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                                        <div className="flex w-0 flex-1 items-center">
                                            <PaperClipIcon
                                                className="h-5 w-5 flex-shrink-0 text-gray-400"
                                                aria-hidden="true"
                                            />
                                            <span className="ml-2 w-0 flex-1 truncate">
                                                {props.id}.zip
                                            </span>
                                        </div>
                                        <div className="ml-4 flex-shrink-0">
                                            <a
                                                href={props.archieve.file}
                                                onClick={() =>
                                                    setLinkClicked(true)
                                                }
                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                            >
                                                Download
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                            </dd>
                        )}
                    </div>
                </dl>
            </div>
            <DialogModal
                linkClicked={linkClicked}
                setLinkClicked={setLinkClicked}
            />
        </div>
    );
}
