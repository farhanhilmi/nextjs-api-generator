const people = [
    { value: 1, name: 'Wade Cooper' },
    { value: 2, name: 'Arlene Mccoy' },
    { value: 3, name: 'Devon Webb' },
    { value: 4, name: 'Tom Cook' },
    { value: 5, name: 'Tanya Fox' },
    { value: 6, name: 'Hellen Schmidt' },
];

export default function ComboBox({
    label,
    name,
    options,
    required = false,
    span = 'col-span-full',
}) {
    return (
        <div className={span}>
            <label
                htmlFor={name}
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                {label}
            </label>
            <div className="mt-2">
                <select
                    required={required}
                    id={name}
                    name={name}
                    // autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                    {options.map((item) => {
                        return (
                            <option key={item.value} value={item.value}>
                                {item.label}
                            </option>
                        );
                    })}
                </select>
            </div>
        </div>
    );
}
