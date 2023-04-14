import InputField from '../form/inputField';
import TextArea from '../form/textArea';
import ComboBox from '../form/comboBox';
import Input from '../form/input';
import { useEffect, useState } from 'react';
import config from '@/config';
import { useRouter } from 'next/router';
import LoadingOverlay from '../loading';
export default function Form({ state, setState, setNext, routes, setRoutes }) {
    const [routesCount, setRoutesCount] = useState(1);

    const [isPending, setIsPending] = useState(true);
    const router = useRouter();

    // check if api server is running
    const checkServer = async () => {
        try {
            console.log('API', config.NEXT_PUBLIC_API_URL);
            const response = await fetch(`${config.NEXT_PUBLIC_API_URL}/check`);
            // check if response is not ok
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
        } catch (error) {
            console.log('error', error.message);
            router.push('/maintenance');
        } finally {
            setIsPending(false);
        }
    };

    useEffect(() => {
        (async () => {
            checkServer();
        })();
    }, [isPending]);

    const submitHandler = async (e) => {
        e.preventDefault();

        const property = {};
        // iterate through the routes and assign an empty object to each route
        await routes.forEach((route) => {
            property[route] = {};
        });

        // get the form data
        const data = {
            service: e.target.service.value,
            description: e.target.description.value,
            database: e.target.database.value,
            properties: property,
        };

        // set the state with the new data
        setState({ ...state, ...data });
        setNext(true);
        // console.log('state', state);
    };

    // handle the add routes button by incrementing the routes count
    const addRoutesHandler = (e) => {
        e.preventDefault();
        setRoutesCount(routesCount + 1);
    };

    // handle the remove routes button by decrementing the routes count
    // and remove the last route from the routes array
    const removeRouteHandler = (e) => {
        e.preventDefault();
        // remove the last route
        const route = [...routes];
        route.pop();
        setRoutes(route);
        setRoutesCount(routesCount - 1);
    };

    // handle the change of the routes input by assigning the value to the routes array
    const handleChangeRoute = (e) => {
        const route = [...routes];
        route[e.target.id] = e.target.value;
        setRoutes(route);
    };
    return (
        <>
            {isPending ? (
                <LoadingOverlay />
            ) : (
                <form onSubmit={submitHandler}>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">
                                API Information
                            </h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                This information will be used to generate your
                                API. To help us generate your API, please fill
                                out the form below.
                            </p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <InputField
                                    label={'Service Name'}
                                    required={true}
                                    name={'service'}
                                    type={'text'}
                                    // onchange={handlerChange}
                                    placeholder={
                                        'Type your service name with no spaces. e.g. book'
                                    }
                                />

                                <TextArea
                                    required={true}
                                    label={'Description'}
                                    name={'description'}
                                    rows={3}
                                    placeholder={
                                        'Write your service description here'
                                    }
                                />

                                <ComboBox
                                    required={true}
                                    label={'Database Type'}
                                    name={'database'}
                                    // onchange={handlerChange}
                                    options={[
                                        // { value: 'mysql', label: 'MySQL' },
                                        { value: 'mongodb', label: 'MongoDB' },
                                    ]}
                                    info={
                                        'Currently only MongoDB is supported. More database types will be added soon. Stay tuned!'
                                    }
                                />

                                <div className="col-span-full">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        Routes
                                    </label>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">
                                        This will be the <b>routes</b> and for
                                        your service. e.g. books, users will be{' '}
                                        <b>/books</b> and <b>/users</b>. Also{' '}
                                        <b>models</b> will be created with the
                                        same name.
                                    </p>

                                    {Array.from({ length: routesCount }).map(
                                        (_, i) => {
                                            return (
                                                <div
                                                    className="flex items-center mt-2"
                                                    key={i}
                                                >
                                                    <Input
                                                        required={true}
                                                        onChange={
                                                            handleChangeRoute
                                                        }
                                                        id={i}
                                                        name={'routes'}
                                                        type={'text'}
                                                        placeholder={
                                                            'Type your route here. e.g. books'
                                                        }
                                                    />
                                                    {i === routesCount - 1 &&
                                                    i !== 0 ? (
                                                        <span
                                                            className="p-0 ms-3 font-medium text-red-400 hover:text-red-900 cursor-pointer"
                                                            onClick={
                                                                removeRouteHandler
                                                            }
                                                        >
                                                            x
                                                        </span>
                                                    ) : (
                                                        <span className="p-0 ms-3 font-medium text-transparent disabled">
                                                            x
                                                        </span>
                                                    )}
                                                </div>
                                            );
                                        },
                                    )}
                                    <p
                                        className="mt-1 mb-2 text-sm leading-4 text-gray-500 hover:text-blue-300 cursor-pointer"
                                        onClick={addRoutesHandler}
                                    >
                                        <b>+</b> Click here to add more routes
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <a
                            href="/"
                            className="text-sm font-semibold leading-6 text-gray-900"
                        >
                            Cancel
                        </a>
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Next
                        </button>
                    </div>
                </form>
            )}
        </>
    );
}
