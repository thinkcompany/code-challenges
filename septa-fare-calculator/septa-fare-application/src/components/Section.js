import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SubHeading from './SubHeading.js';
import RadioSelection from './RadioSelection.js';
import DropdownSelection from './DropdownSelection.js';
import NumberSelection from './NumberSelection.js';
import SubInfoText from './SubInfoText.js';
import Text from './Text.js';

const StyledContainer = styled.div`
	width: auto;
	height: auto;
	border-bottom: 1px solid #d3d3d3;
	padding: 1rem 0;
	background-color: ${props => (props.dark ? '#5A5A5A' : 'white')};
`;

const Section = ({
	inputType,
	subheading,
	subtext,
	text,
	dark,
	options,
	type,
	data,
	setData,
}) => {
	const renderContent = () => {
		switch (true) {
			case inputType === 'radio': {
				return (
					<RadioSelection
						onRadioChange={setData}
						data={data}
						options={options}
					/>
				);
			}

			case inputType === 'dropdown': {
				return (
					<DropdownSelection
						onDropdownChange={setData}
						data={data}
						type={type}
						options={options}
					/>
				);
			}

			case inputType === 'number': {
				return <NumberSelection onInputChange={setData} data={data} />;
			}

			case inputType === '': {
				return <Text text={text} dark={dark} />;
			}

			default: {
				return null;
			}
		}
	};

	return (
		<StyledContainer dark={dark}>
			<SubHeading dark={dark} subheading={subheading} />
			{renderContent()}
			<SubInfoText subtext={subtext} />
		</StyledContainer>
	);
};

Section.propTypes = {
	inputType: PropTypes.string,
	subheading: PropTypes.string,
	subtext: PropTypes.string,
	text: PropTypes.string,
	type: PropTypes.string,
	dark: PropTypes.bool,
	fares: PropTypes.shape({
		info: PropTypes.object,
		zones: PropTypes.array,
	}),
	data: PropTypes.shape({
		zone: PropTypes.string,
		travelTime: PropTypes.string,
		purchaseLocation: PropTypes.string,
		ticketQuantity: PropTypes.number,
	}),
	setData: PropTypes.func,
};

Section.defaultProps = {
	inputType: '',
	subheading: '',
	subtext: '',
	text: '',
	type: '',
	dark: false,
	data: {
		zone: '',
		travelTime: '',
		purchaseLocation: '',
		ticketQuantity: null,
	},
	setData() {},
};

export default Section;
