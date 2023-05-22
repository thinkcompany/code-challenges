import React from "react";
import SeptaFareCalculator from "./container/SeptaFareCalculator/SeptaFareCalculator";
import SeptaHeader from "./components/septa/SeptaHeader/SeptaHeader";
import useFetchData from "./hooks/useFetchData";
import "./styles/global.css";

const App = () => {
	const { data, loading, error } = useFetchData();
	return (
		<div className="septa-container">
			<SeptaHeader />
			{loading ? (
				<div>Page Loading...</div>
			) : error ? (
				<div>Page Error</div>
			) : (
				<SeptaFareCalculator />
			)}
		</div>
	);
};

export default App;
