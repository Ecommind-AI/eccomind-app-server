import React, { useEffect, useState } from "react";
import "./ReturnPolicy.css";
import LinkedInput from "../LinkedInput/LinkedInput";

const ReturnPolicy = ({ updateData }) => {
    const [state, setState] = useState({
        returnPolicy:''
    });

    useEffect(() => {
        updateData("returnPolicy", state);
    }, [state, updateData]);

    
    const handleChange = (name, value) => {
        setState((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="block-container">
            <div className="block-container__title">
                <img src="../../assets/Icons/ReturnPolicyIcon.png" alt="" className="block-container__title-img"/>
                <h2 className="block-container__title-text">
                    Return Policy 
                </h2>
            </div>
            <div className="block-container__settings">
                <LinkedInput
                    linkedValue={state.returnPolicy}
                    onValueChange={handleChange}
                    inputType="textarea"

                    name="returnPolicy" 
                    id="" 
                    className="block-container__settings-field--tall block-container__settings-field" 
                    placeholder="Enter Return Policy "
                />
            </div>
        </div>
    );
};

export default ReturnPolicy;
