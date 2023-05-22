import React from "react";
import Section from "../../../common/Section/Section";
import SelectDropdown from "../../../common/SelectDropDown/SelectDropDown";

interface TimeTravelSelectProps {
	timeTravel: string;
	setTimeTravel: (val: string) => void;
	options: string[];
	info?: string;
}

const TimeTravelSelect: React.FC<TimeTravelSelectProps> = ({
	timeTravel,
	setTimeTravel,
	options,
	info,
}) => (
	<Section label="Where are you riding?" info={info}>
		<SelectDropdown
			value={timeTravel}
			placeholder="Select Time Travel"
			options={options}
			onSelect={(e) => setTimeTravel(e.target.value)}
		/>
	</Section>
);

export default TimeTravelSelect;
