import RailCalculator from "./components/RailCalculator";
const url = "fares.json"

function App() {
  return (
    <RailCalculator url={url} />
  );
}

export default App;
