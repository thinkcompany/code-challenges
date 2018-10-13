import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'react-dropdown';
import styled from 'styled-components';

const DropdownWrapper = styled.div`
    display: flex;
    flex-flow: column wrap;
    border-bottom-style: solid;
    border-width: 2px;
    border-color: #3f3f3d;
    align-items: center;
    text-align: center;    
    `;

 
const StyledSubheader = styled.h2`
    font-size: 1.5em;
    color: #3f3f3d;
`;   

const StyledHelpText = styled.h3`
    font-size: 1em;
    color: grey;
`;  

const StyledDropdown = styled(Dropdown)`
    font-size: 2em;
    border: 2px solid #3f3f3d;
    border-radius: 5px;
    padding: 5px;
    width: 300px;
    color: #3f3f3d;

    .menuDropdownClass{
        border-top-style: solid;
        border-width: 1px;
        border-color: #3f3f3d;
    }

`;  
class DropdownContainer extends Component {
    
    render(){
        return (
        <DropdownWrapper>
            <StyledSubheader>{this.props.title}</StyledSubheader>
            <StyledDropdown 
                options= {this.props.options} 
                onChange={this.props.onSelect} 
                value={this.props.value} 
                placeholder="Select an option"
                controlClassName= "controlDropdownClass"
                menuClassName="menuDropdownClass"
                arrowClassName="arrowDropdownClass"></StyledDropdown>
            <StyledHelpText>{this.props.helpText}</StyledHelpText>
        </DropdownWrapper>  
        )
    }
}

DropdownContainer.propTypes = {
    title: PropTypes.string,
    options: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    helpText: PropTypes.string,
  }

export default DropdownContainer;