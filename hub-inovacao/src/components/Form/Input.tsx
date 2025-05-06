type Props = {
    label?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isRequired?: boolean
    isBig?: boolean,

};

export const Input = ({ label, value, onChange, isRequired, isBig }: Props) => {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">{label} 
                {isRequired &&
                    <span className="text-red-600 ml-2 text-sm">*</span>
                }
            </label>
            <input 
                type="text"
                className={`outline-none border border-gray-200 px-2 py-2 ${isBig ? 'pb-12' : 'py-3'} rounded-md focus:border-blue-500`}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};
