import React from 'react';

type InputProps = {
    label?: string;
};

const Input: React.FC<InputProps & React.HTMLProps<HTMLInputElement>> = ({ label, ...restProps }) => {
    if (label) {
        return (
            <label className="input-label">
                <span>{label}</span>
                <input {...restProps} />
            </label>
        );
    }

    return <input {...restProps} />;
};

export default Input;
