import { useState } from "react";

import CalculatorHeader from "../CalculatorHeader";
import RailForm from "../RailForm";
import FareResult from "../FareResult";

import "../../styles/calculator.css"

export default function CalculatorWidget() {
    const [farePrice, setFarePrice] = useState(0);
    
    return (
        <div className="calculator">
            <CalculatorHeader title="Regional Rail Fares" />
            <RailForm setFarePrice={setFarePrice} />
            <FareResult fare={farePrice} />
        </div>
    )
}