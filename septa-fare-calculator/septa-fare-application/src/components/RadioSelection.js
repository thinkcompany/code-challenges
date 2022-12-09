import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledRadio = styled.div`
	display: flex;
	flex-direction: column;
	align-content: center;
	margin-bottom: 1rem;
	font-size: 1.2rem;
	border-radius: 0.25rem;
`;

const Option = styled.div`
	margin: 0.25rem;
`;

const RadioSelection = ({data, onRadioChange, options}) => {
	const {purchaseLocation, travelTime} = data;
	const constrainedOptions = travelTime === "anytime" ? options.filter(option => option.label !== options[1].label) : options;

	const OptionList = () =>
		constrainedOptions.map(option => (
			<Option>
				<label class='location-button'>
					<input
						type='radio'
						name='purchase-location-button'
						defaultValue={option.value}
						checked={purchaseLocation === option.value}
						onChange={e =>
							onRadioChange(previousState => ({
								...previousState,
								purchaseLocation: e.target.value,
							}))
						}
					/>
					{option.label}
				</label>
			</Option>
		));

	// If name property is equal to purchase location then add check attribute to that jsx element
	return (
		<StyledRadio>
			<OptionList />
		</StyledRadio>
	);
};

RadioSelection.propTypes = {
	options: PropTypes.array,
	data: PropTypes.shape({
		zone: PropTypes.string,
		travelTime: PropTypes.string,
		purchaseLocation: PropTypes.string,
		ticketQuantity: PropTypes.number,
	}),
	onRadioChange: PropTypes.func,
};

RadioSelection.defaultProps = {
	options: {
		onboard_purchase: '',
		advance_purchase: '',
	},
	data: {
		zone: '',
		travelTime: '',
		purchaseLocation: '',
		ticketQuantity: null,
	},
	onRadioChange() {},
};

export default RadioSelection;
