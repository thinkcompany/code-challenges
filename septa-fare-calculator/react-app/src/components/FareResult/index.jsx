
export default function FareResult({ fare }) {
    return (
        <div className="result-container">
            <p>Your fare will cost</p>
            <p>{fare.toString().includes(".") ? `$${fare}` : `$${fare}.00`}</p>
        </div>
    );
}