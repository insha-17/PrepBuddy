function Input({
    label,
    type,
    placeholder,
    value,
    onChange,
    name,
}) {
    return (
        <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
                {label}
            </label>

            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
}

export default Input;