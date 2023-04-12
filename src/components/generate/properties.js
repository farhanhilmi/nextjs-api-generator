import Input from '../form/input';
import { useState } from 'react';
import { useRouter } from 'next/router';

import config from '@/config';
export default function Properties({ state, setState, setNext, routes }) {
    const router = useRouter();
    const [count, setCount] = useState(1);
    const [propertiesCount, setPropertiesCount] = useState(1);
    // state for the switcher

    // assign the state properties to a variable
    const data = { ...state.properties };

    const SubmitHandler = async (e) => {
        e.preventDefault();

        // iterate through the form elements
        for (let i = 0; i < e.target.closest('form').elements.length - 1; i++) {
            // if the element is odd, it's a property type. e.g. string, number, etc.
            if (i % 2 !== 0) {
                // set the property type to the previous property name (even)
                const property = {
                    [e.target.closest('form').elements[i - 1].value]:
                        e.target.closest('form').elements[i].value,
                };

                data[routes[count - 1]][
                    e.target.closest('form').elements[i - 1].value
                ] = property;
            } else {
                // if the element is even, it's a property name. e.g. name, age, etc.
                const property = {
                    [e.target.closest('form').elements[i].value]: '',
                };
                // set the property name to the current route
                // with object.assign, we can merge the property name with the previous property name
                data[routes[count - 1]] = Object.assign(
                    data[routes[count - 1]],
                    property,
                );
            }
        }

        // set back the properties count to 1 (default)
        setPropertiesCount(1);
        // set the state with the new data
        setState({ ...state, properties: data });
        // reset the form
        e.target.reset();

        // submit form and call api
        if (count === routes.length) {
            const payload = {
                description: state.description,
                serviceName: state.service,
                databaseType: state.database,
                properties: state.properties,
            };
            // "required": "true"
            const JSONdata = JSON.stringify(payload);
            const endpoint = `${config.NEXT_PUBLIC_API_URL}/generate`;
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSONdata,
            };

            const response = await fetch(endpoint, options);
            const result = await response.json();
            setCount(1);
            if (result.error) {
                return alert(result.error);
            }
            // check if there already is an archieve in the local storage
            if (localStorage.getItem('api_archieve')) {
                // update the local storage with the new archieve
                const archieve = JSON.parse(
                    localStorage.getItem('api_archieve'),
                );
                archieve.push({
                    ...result.data,
                    id: result.data.archieve.name,
                });
                localStorage.setItem('api_archieve', JSON.stringify(archieve));
            } else {
                // if there is no archieve in the local storage, create a new one
                const archieve = [
                    { ...result.data, id: result.data.archieve.name },
                ];
                localStorage.setItem('api_archieve', JSON.stringify(archieve));
            }
            router.push({
                pathname: `/generate/result`,
                query: { id: result.data.archieve.name },
            });
            // router.push({
            //     pathname: `/generate/result/${result.data.archieve.name}`,
            //     query: result.data,
            // });
        }

        setCount(count + 1);
    };

    // handle the add properties button by incrementing the properties count
    const addPropertiesHandler = (e) => {
        e.preventDefault();
        setPropertiesCount(propertiesCount + 1);
    };

    // handle the remove properties button by decrementing the properties count
    const removePropertiesHandler = (e) => {
        e.preventDefault();
        setPropertiesCount(propertiesCount - 1);
    };

    return (
        <form onSubmit={SubmitHandler}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <p className="mt-1 mb-10 leading-6 text-gray-600">
                        In this page you can set the properties for your
                        service. This properties will be used to generate the
                        models.
                    </p>

                    {count <= routes.length ? (
                        <>
                            <label className="block text-lg font-medium leading-6 text-gray-900">
                                Properties for{' '}
                                <u>
                                    <b>{routes[count - 1]}</b>
                                </u>
                            </label>
                            {Array.from({
                                length: propertiesCount,
                            }).map((_, i) => {
                                return (
                                    <div
                                        className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
                                        key={i}
                                    >
                                        <div className="sm:col-span-4">
                                            <label
                                                htmlFor="first-name"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Property Name
                                            </label>
                                            <div
                                                className="flex items-center mt-2"
                                                key={i}
                                            >
                                                <Input
                                                    required={true}
                                                    id={'key_' + i}
                                                    name={'property'}
                                                    type={'text'}
                                                    placeholder={
                                                        'Type your property name here. e.g. title'
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label
                                                htmlFor="first-name"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Property Type
                                            </label>
                                            <div
                                                className="flex items-center mt-2"
                                                key={i}
                                            >
                                                <select
                                                    id={'type_' + i}
                                                    name="property"
                                                    required={true}
                                                    // autoComplete="country-name"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                >
                                                    <option value={'String'}>
                                                        String
                                                    </option>
                                                    <option value={'Number'}>
                                                        Number
                                                    </option>
                                                </select>
                                                {i === propertiesCount - 1 &&
                                                i !== 0 ? (
                                                    <span
                                                        className="p-0 ms-3 font-medium text-red-400 hover:text-red-900 cursor-pointer"
                                                        onClick={
                                                            removePropertiesHandler
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
                                        </div>
                                        {/* <div className="sm:col-span-1">
                                            <label
                                                htmlFor="first-name"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Required
                                            </label>
                                            <div
                                                className="flex items-center mt-2 "
                                                key={i}
                                            >
                                                <Switcher
                                                    enabled={enabled}
                                                    setEnabled={setEnabled}
                                                />
                                                {i === propertiesCount - 1 &&
                                                i !== 0 ? (
                                                    <span
                                                        className="p-0 ms-3 font-medium text-red-400 hover:text-red-900 cursor-pointer"
                                                        onClick={
                                                            removePropertiesHandler
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
                                        </div> */}
                                    </div>
                                );
                            })}
                            <p
                                className="mt-1 mb-2 text-sm leading-4 text-gray-500 hover:text-blue-300 cursor-pointer"
                                onClick={addPropertiesHandler}
                            >
                                <b>+</b> Click here to add more properties
                            </p>
                        </>
                    ) : (
                        ''
                    )}
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
                    {count < routes.length
                        ? `Next to ${routes[count]} properties`
                        : 'Generate Now'}
                </button>
            </div>
        </form>
    );
}
