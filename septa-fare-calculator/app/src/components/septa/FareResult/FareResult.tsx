import React from "react";
import "./styles.css";

interface FareResultProps {
	fareCost: number | string;
}

const FareResult: React.FC<FareResultProps> = ({ fareCost }) => {
	return (
		<div className="septa-fare-result">
			<div className="fare-label">Your fare will cost</div>
			<div className="fare-value">${fareCost || ""}</div>
		</div>
	);
};

export default FareResult;
