import React from "react";
import "./styles.css";

interface SelectDropdownProps {
	value: string;
	placeholder?: string;
	options: string[];
	onSelect: React.ChangeEventHandler<HTMLSelectElement>;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({
	value,
	placeholder,
	options,
	onSelect,
}) => (
	<select className="select-dropdown" name={value} value={value} onChange={onSelect}>
		{placeholder && <option value="">{placeholder}</option>}
		{options.map((option) => (
			<option key={option} value={option}>
				{option}
			</option>
		))}
	</select>
);

export default SelectDropdown;
