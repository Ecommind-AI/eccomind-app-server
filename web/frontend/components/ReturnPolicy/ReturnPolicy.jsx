import React, { useEffect, useState } from "react";
import "./ReturnPolicy.css";
import LinkedInput from "../LinkedInput/LinkedInput";

const ReturnPolicy = ({ updateData, returns_policy }) => {
    const [state, setState] = useState({
        returns_policy:returns_policy
    });

    useEffect(() => {
        updateData("returns_policy", state.returns_policy);
    }, [state.returns_policy]); 

    const handleChange = (name, value) => {
        setState((prevState) => {
            const updatedState = {
                ...prevState,
                [name]: value
            };
            updateData(name, value); 
            return updatedState;
        });
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
                    linkedValue={returns_policy}
                    onValueChange={handleChange}
                    inputType="textarea"

                    name="returns_policy" 
                    id="" 
                    className="block-container__settings-field--tall block-container__settings-field" 
                    placeholder={returns_policy === undefined ? "Enter Return Policy" : ""}
                />
            </div>
        </div>
    );
};

export default ReturnPolicy;
