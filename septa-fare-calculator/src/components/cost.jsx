import '../stylesheets/cost.css'

const Cost = ({cost, timeInfo}) => {

  //if "anytime" is clicked, the cost should be multiplied by 10, as it only caclulates for one ticket at the moment
  if (timeInfo === "Valid anytime") cost = cost * 10;

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