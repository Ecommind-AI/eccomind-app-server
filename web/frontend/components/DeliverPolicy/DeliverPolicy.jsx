import React, { useEffect, useState } from "react";
import "./DeliverPolicy.css";
import LinkedInput from "../LinkedInput/LinkedInput";

const DeliverPolicy = ({ updateData }) => {
    const [state, setState] = useState({
        deliverPolicy:''
    });

    useEffect(() => {
        updateData("deliverPolicy", state);
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
                    Deliver Policy 
                </h2>
            </div>
            <div className="block-container__settings">
                <LinkedInput
                    linkedValue={state.deliverPolicy}
                    onValueChange={handleChange}
                    inputType="textarea"

                    name="deliverPolicy" 
                    id="" 
                    className="block-container__settings-field--tall block-container__settings-field" 
                    placeholder="Enter Deliver Policy "
                />
            </div>
        </div>
    );
};

export default DeliverPolicy;
