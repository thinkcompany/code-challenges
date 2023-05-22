import React from "react";
import Section from "../../../common/Section/Section";
import SelectDropdown from "../../../common/SelectDropDown/SelectDropDown";
import { IZone } from "../../../../types/types";

interface ZoneSelectProps {
	zone: string;
	setZone: (value: string) => void;
	options: IZone[];
}

const ZoneSelect: React.FC<ZoneSelectProps> = ({ zone, setZone, options }) => {
	return (
		<Section label="Where are you going?">
			<SelectDropdown
				value={zone}
				placeholder="Select Zone"
				options={options.map((zone) => zone.name)}
				onSelect={(e) => setZone(e.target.value)}
			/>
		</Section>
	);
};

export default ZoneSelect;
