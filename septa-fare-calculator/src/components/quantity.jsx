const Quantity = ({quantity, setQuantity, timeInfo}) => {
  return (
    <div className="quantity-containter">
      {/* {console.log(quantity)} */}
        How many rides will you need?
        <input type="number" onChange={(e) => setQuantity(e.target.value)}></input>
    </div>
  )
}

export default Quantity;