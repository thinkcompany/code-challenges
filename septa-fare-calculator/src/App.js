import "./App.css";
import { FareCalculator } from "./components/fare-calculator";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <meta charset="UTF-8" />
        <title>SEPTA Regional Rail Fare Calculator</title>
      </header>

      <div className="body-wrapper">
        <FareCalculator />
      </div>
    </div>
  );
}

export default App;
