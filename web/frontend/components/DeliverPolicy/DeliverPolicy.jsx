import React, { useEffect, useState } from "react";
import "./DeliverPolicy.css";
import LinkedInput from "../LinkedInput/LinkedInput";
import ReturnPolicyIcon from "../../assets/Icons/ReturnPolicyIcon.png"

const DeliverPolicy = ({ updateData, delivery_description }) => {
    const [state, setState] = useState({
        delivery_description:delivery_description
    });

    useEffect(() => {
        updateData("delivery_description", state.delivery_description);
    }, [state.delivery_description]); 

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
                <img src={ReturnPolicyIcon} alt="" className="block-container__title-img"/>
                <h2 className="block-container__title-text">
                    Deliver Policy 
                </h2>
            </div>
            <div className="block-container__settings">
                <LinkedInput
                    linkedValue={delivery_description}
                    onValueChange={handleChange}
                    inputType="textarea"

                    name="delivery_description" 
                    id="" 
                    className="block-container__settings-field--tall block-container__settings-field" 
                    placeholder={delivery_description === undefined ? "Enter Delivery Policy" : ""}
                />
            </div>
        </div>
    );
};

export default DeliverPolicy;
