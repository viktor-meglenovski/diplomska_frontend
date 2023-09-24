import React from "react";
import "./spinner.css"
import spinnerImage from '../spinner.png';

export default function CustomLoadingSpinner() {
    return (
        <img src={spinnerImage} className="loading-spinner-test mt-0"/>

    );
}