import './Quantity.css';

const Quantity = ({ quantity, setQuantity }) => {
  return (
    <div className="quantity-section">
      <div>How many rides will you need?</div>
      <input
        className="quantity-section-input"
        name="Quantity of tickets"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
    </div>
  );
}

export default Quantity;