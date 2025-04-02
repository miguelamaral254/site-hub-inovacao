type Props = {
    label?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errors?: any,
    isBig?: boolean
};

export const Input = ({ label, value, onChange, errors, isBig }: Props) => {
    return (
        <div className="flex flex-col gap-2">
            <label>{label}</label>
            <input 
                type="text"
                className={`outline-none border border-gray-200 p-2  ${isBig ? 'pb-12' : 'py-2'} rounded-md focus:border-blue-500`}
                value={value}
                onChange={onChange}
                style={{ borderColor: errors ? 'red' : '' }}
            />
        </div>
    );
};
