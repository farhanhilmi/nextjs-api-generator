export default function TextArea({
    label,
    name,
    rows,
    placeholder,
    span = 'col-span-full',
    required = false,
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
                <textarea
                    required={required}
                    id={name}
                    name={name}
                    rows={rows}
                    className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                    defaultValue={''}
                    placeholder={placeholder}
                />
            </div>
            {/* <p className="mt-3 text-sm leading-6 text-gray-600">
                Write a few sentences about yourself.
            </p> */}
        </div>
    );
}
