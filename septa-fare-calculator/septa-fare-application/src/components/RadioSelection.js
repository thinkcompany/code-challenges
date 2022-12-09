import React from 'react';
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
	const {purchaseLocation} = data;

	const OptionList = () =>
		options.map(option => (
			<Option key={uuid4()}>
				<label className='location-button'>
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
