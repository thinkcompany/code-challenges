import RadioButton from "../../../common/RadioButton/RadioButton";
import Section from "../../../common/Section/Section";
import './styles.css';

interface PurchaseLocationInputProps {
	location: string;
	setLocation: (value: string) => void;
	info?: string;
}

const PurchaseLocationSelect = ({ location, setLocation, info }: PurchaseLocationInputProps) => (
	<Section label="Where will you purchase the fare?" info={info}>
		<div className="radio-buttons-container">
			<RadioButton
				label="Station Kiosk"
				value="advance_purchase"
				checked={location === "advance_purchase"}
				onChange={(e) => setLocation(e.target.value)}
			/>
			<RadioButton
				label="Onboard"
				value="onboard_purchase"
				checked={location === "onboard_purchase"}
				onChange={(e) => setLocation(e.target.value)}
			/>
		</div>
	</Section>
);

export default PurchaseLocationSelect;
