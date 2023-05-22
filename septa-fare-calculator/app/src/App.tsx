import React from "react";
import SeptaFareCalculator from "./container/SeptaFareCalculator/SeptaFareCalculator";
import logo from "./logo.svg";
import "./App.css";
import useFetchData from "./hooks/useFetchData";

const App = () => {
	const { data, loading, error } = useFetchData();
	if (loading) return <>Page Loading...</>;
	if (error) return <>Page Error</>;
	return <SeptaFareCalculator />;
};

export default App;
