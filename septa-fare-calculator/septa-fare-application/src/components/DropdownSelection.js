import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import uuid4 from 'uuid4';

const StyledDropdown = styled.div`
	margin-bottom: 1rem;
`;

const StyledSelect = styled.select`
	width: 90%;
	border-radius: 0.25rem;
	font-size: 1.5rem;
	border: 2px solid #d3d3d3;
`;

const DropdownSelection = ({options, type, data, onDropdownChange}) => {
	// Creates a list of options for the dropdown menu based on whether the dropdown select is zones or times.
	const OptionsList = () => type
		? options.map(option => <option key={uuid4()} value={option}>Zone {option}</option>)
		: options.map(option => (
			<option key={uuid4()} value={option.toLocaleLowerCase().split(' ').join('_')}>
				{option}
			</option>
		));

	// Generates a function that takes in an event and returns a function that takes in the previous state and returns a new state.
	const generateOnChange = e => type
		? onDropdownChange(previousState => ({
			...previousState,
			zone: e.target.value,
			  }))
		: onDropdownChange(previousState => ({
			...previousState,
			travelTime: e.target.value.toLocaleLowerCase().split(' ').join('_'),
		}));

	return (
		<StyledDropdown>
			<StyledSelect
				id='zone-input'
				name='zone-input'
				value={type ? data.zone : data.travelTime}
				autocomplete='off'
				onChange={e => generateOnChange(e)}
			>
				<OptionsList />
			</StyledSelect>
		</StyledDropdown>
	);
};

DropdownSelection.propTypes = {
	type: PropTypes.string,
	options: PropTypes.array,
	data: PropTypes.shape({
		zone: PropTypes.string,
		travelTime: PropTypes.string,
		purchaseLocation: PropTypes.string,
		ticketQuantity: PropTypes.number,
	}),
	onDropdownChange: PropTypes.func,
};

DropdownSelection.defaultProps = {
	type: '',
	options: [],
	data: {
		zone: '',
		travelTime: '',
		purchaseLocation: '',
		ticketQuantity: null,
	},
	onDropdownChange() {},
};

export default DropdownSelection;
