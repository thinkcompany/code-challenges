import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';

const StyledDropdown = styled.div`
  margin-bottom: 1rem;
`;

const StyledSelect = styled.select`
  width: 90%;
  border-radius: .25rem;
  font-size: 1.5rem;
  border: 2px solid #D3D3D3;
`;

// TODO: Usfrome Array.() to create the dropdowns instead of the hardcoded values
const DropdownSelection = props => {
  return (
    <StyledDropdown>
      <StyledSelect id="zone-input" name="zone-input"true>
        <option value="1">Zone 1</option>
        <option value="2">Zone 2</option>
        <option value="3">Zone 3</option>
        <option value="4">Zone 4</option>
        <option value="5">Zone 5</option>
      </StyledSelect>
    </StyledDropdown>
  )
}

DropdownSelection.propTypes = {}

export default DropdownSelection