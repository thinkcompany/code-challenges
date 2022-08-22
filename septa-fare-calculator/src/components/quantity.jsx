import '../stylesheets/quantity.css';

const Quantity = ({quantity, setQuantity, timeInfo}) => {
  return (
    <div className="quantity-containter">
        How many rides will you need?
        <input type="number" className="quantity-dropdown" onChange={(e) => setQuantity(e.target.value)}></input>
    </div>
  )
}

export default Quantity;