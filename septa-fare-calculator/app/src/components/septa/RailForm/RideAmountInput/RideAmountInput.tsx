import Section from "../../../common/Section/Section";
import "./styles.css";

interface RideAmountProps {
	amount: number;
	setAmount: (value: number) => void;
}

const RideAmountInput: React.FC<RideAmountProps> = ({ amount, setAmount }) => (
	<Section label="How many rides will you need?">
		<input
			className="ride-amount-input"
			name="Ride Amount"
			type="number"
			value={amount}
			onChange={(e) => setAmount(Number(e.target.value))}
		/>
	</Section>
);

export default RideAmountInput;
