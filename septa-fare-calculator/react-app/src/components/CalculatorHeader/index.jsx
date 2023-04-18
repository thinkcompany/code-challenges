
export default function CalculatorHeader({ title }) {
    return (
        <div className="header">
            <img className="header-logo" src="../../../../static/640px-SEPTA.png"></img>
            <h2>{title}</h2>
        </div>
    );
}