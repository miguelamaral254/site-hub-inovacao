type Props = {
    label?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isRequired?: boolean
    isBig?: boolean,

};

export const Input = ({ label, value, onChange, isRequired, isBig }: Props) => {
    return (
        <div className="flex flex-col gap-2">
            <label>{label} 
                {isRequired &&
                    <span className="text-red-600 ml-2 text-lg">*</span>
                }
            </label>
            <input 
                type="text"
                className={`outline-none border border-gray-200 p-2  ${isBig ? 'pb-12' : 'py-2'} rounded-md focus:border-blue-500`}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};
