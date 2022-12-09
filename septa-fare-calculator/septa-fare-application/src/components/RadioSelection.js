import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import uuid4 from 'uuid4';

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
	// const constrainedOptions = travelTime === 'anytime' ? options.filter(option => option.label === options[1].label) : options;


	console.log("options", options)

	// useEffect(() => {
	// 	// if (travelTime === "anytime") {
	// 	// 	console.log("condition triggered");
	// 	// 	onRadioChange(previousState => ({
	// 	// 		...previousState,
	// 	// 		purchaseLocation: options[1].value,
	// 	// 	}));
	// 	// }
	// 		if (!options){onRadioChange(previousState => ({
	// 			...previousState,
	// 			purchaseLocation: options[0].value,
	// 		}))}

	// 	// Whenever teh prop time changes and is equal to anytime,
	// 	// we immediately want to update the state using the radioonchange on radio change function
	// 	// change teh state to advance_purchase
	// }, []);
	

	const OptionList = () =>
		options.map(option => (
			<Option key={uuid4()}>
				<label class='location-button'>
					<input
						type='radio'
						name='purchase-location-button'
						defaultValue={option.value}
						checked={options.length === 1 ? option.value : purchaseLocation === option.value}
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
