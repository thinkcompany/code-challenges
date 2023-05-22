import React from "react";

interface RadioButtonProps {
	checked: boolean;
	value: string;
	label?: string;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const RadioButton: React.FC<RadioButtonProps> = ({ checked, value, label, onChange }) => (
	<div>
		<input name={label} type="radio" value={value} checked={checked} onChange={onChange} />
		<label>{label}</label>
	</div>
);

export default RadioButton;
