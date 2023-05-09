import React from "react";
import "./App.css";
import { Fares } from "./fares";
import Widget from "./components/Widget/Widget";

function api<T>(): Promise<T> {
  return fetch("/fares.json", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((response) => {
    if (!response.ok) {
      const errorMessage = "Error loading data from";
      return Promise.reject(errorMessage);
    }
    return response.json().then((data) => data as T);
  });
}

const App = () => {
  React.useEffect(() => {
    api<Fares>().then((data) => {
      console.log(data);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">SEPTA Rails Fare Calculator</header>
      <Widget />
    </div>
  );
};

export default App;
