import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledInput = styled.input`
	display: flex;
	width: 4%;
	margin: 0 auto;
	padding: 0.5rem 2rem;
	border-radius: 0.25rem;
	font-size: 1.5rem;
	border: 2px solid #d3d3d3;
`;

const NumberSelection = ({data, onInputChange}) => {
	const {ticketQuantity} = data;

	return (
		<StyledInput
			type="text"
			name="ride-quantity"
			placeholder="1"
			min={1}
			max={10}
			defaultValue={ticketQuantity}
			required
			onChange={(e) =>
				onInputChange((previousState) => ({
					...previousState,
					ticketQuantity: Number(e.target.value),
				}))
			}
		/>
	);
};

NumberSelection.propTypes = {
	data: PropTypes.shape({
		zone: PropTypes.string,
		travelTime: PropTypes.string,
		purchaseLocation: PropTypes.string,
		ticketQuantity: PropTypes.number,
	}),
	onInputChange: PropTypes.func,
};

NumberSelection.defaultProps = {
	data: {
		zone: '',
		travelTime: '',
		purchaseLocation: '',
		ticketQuantity: null,
	},
	onInputChange() {},
};

export default NumberSelection;
