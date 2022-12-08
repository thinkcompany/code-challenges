import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';
import uuid4 from 'uuid4';

const StyledDropdown = styled.div`
  margin-bottom: 1rem;
`;

const StyledSelect = styled.select`
  width: 90%;
  border-radius: .25rem;
  font-size: 1.5rem;
  border: 2px solid #D3D3D3;
`;

const DropdownSelection = ({options, type}) => {
  const optionsList = type ? options.map(option => <option key={uuid4} value={option}>Zone {option}</option>) : options.map(option => <option key={uuid4} value={option}>{option}</option>);

  return (
    <StyledDropdown>
      <StyledSelect id="zone-input" name="zone-input"true>
        {optionsList}
      </StyledSelect>
    </StyledDropdown>
  )
}

DropdownSelection.propTypes = {
  type: PropTypes.string,
  options: PropTypes.array,
};

DropdownSelection.defaultProps = {
  type: "",
  options: [],
};



export default DropdownSelection