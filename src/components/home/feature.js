import {
    ArrowPathIcon,
    CloudArrowUpIcon,
    FingerPrintIcon,
    LockClosedIcon,
} from '@heroicons/react/24/outline';

const features = [
    {
        name: 'Ready-to-use APIs',
        description:
            'Generate APIs for your needs in seconds. No coding required. Just connect your database and generate APIs.',
        icon: CloudArrowUpIcon,
    },
    {
        name: 'Choose your database',
        description:
            'Choose from a variety of databases to generate APIs. We support MySQL, MongoDB, and another database coming soon. Stay tuned!',
        icon: LockClosedIcon,
    },
    {
        name: 'Unlimited endpoints',
        description:
            "Generate as many endpoints as you need. We don't limit you. You can generate as many endpoints as you need.",
        icon: ArrowPathIcon,
    },
    {
        name: 'Easy to customize',
        description:
            'You can customize your APIs as you need. We provide you with the source code so you can customize it as you need.',
        icon: FingerPrintIcon,
    },
];

export default function Features() {
    return (
        <div className="bg-white py-24 sm:py-32" id="features">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-indigo-600">
                        Build faster
                    </h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Everything you need to build your API
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Generate APIs for your needs in seconds. No coding
                        required. Ready-to-use APIs in seconds. Unlimited
                        endpoints and easy to customize. Choose from a variety
                        of databases to generate APIs.
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                        {features.map((feature) => (
                            <div key={feature.name} className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-gray-900">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                        <feature.icon
                                            className="h-6 w-6 text-white"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    {feature.name}
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">
                                    {feature.description}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
}
