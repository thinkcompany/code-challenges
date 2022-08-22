import '../stylesheets/cost.css'

const Cost = ({cost, timeInfo}) => {
  if (timeInfo === 'Valid anytime') cost = cost * 10;

  if (!cost) {
    return (
    <div className="cost-container">
    </div>
  )} else {
    return (
      <div className="cost-container">
        <p>
          You fare will cost
        </p>
        <div className="total-cost">
          ${cost.toFixed(2)}
        </div>
      </div>
    )
  }
}

export default Cost;