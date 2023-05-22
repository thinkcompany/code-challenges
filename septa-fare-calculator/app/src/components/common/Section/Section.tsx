import React from "react";
import "./styles.css";

interface SectionProps {
	label?: string;
	children?: React.ReactNode;
	info?: string;
}

const Section: React.FC<SectionProps> = ({ label, children, info }) => {
	return (
		<div className="section">
			{label && <div className="section-label">{label}</div>}
			{children}
			{info && <div className="section-info">{info}</div>}
		</div>
	);
};

export default Section;
