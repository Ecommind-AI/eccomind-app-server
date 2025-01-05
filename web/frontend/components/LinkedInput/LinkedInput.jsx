import React, { useState, useEffect } from 'react';

const INPUTS_TYPES = {
    textareaType: "textarea",
    defType: "default"
};

const LinkedInput = ({ linkedValue, onValueChange, name, inputType = INPUTS_TYPES.defType, ...props }) => {
    const [value, setValue] = useState(linkedValue);

    useEffect(() => {
        setValue(linkedValue);
    }, [linkedValue]);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
        if (onValueChange) {
            onValueChange(newValue);
        }
    };

    return (
        inputType === INPUTS_TYPES.textareaType ? (
            <textarea
                {...props}
                value={value}
                onChange={handleChange}
            />
        ) : (
            <input
                {...props}
                value={value}
                onChange={handleChange}
            />
        )
    );
};

export default LinkedInput;
