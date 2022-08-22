const Cost = ({cost, timeInfo}) => {
  if (timeInfo === 'Valid anytime') cost = cost * 10;

  if (!cost) {
    return (
    <div className="cost-container">
        You fare will cost ___
    </div>
  )} else {
    return (
      <div className="cost-container">
          You fare will cost ${cost.toFixed(2)}
      </div>
    )
  }
}

export default Cost;