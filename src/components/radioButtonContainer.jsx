import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {RadioGroup, Radio} from 'react-radio-group';
import styled from 'styled-components';

const RadioWrapper = styled.div`
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
    color: red;
    `;  

const StyledRadioGroup = styled(RadioGroup)`
    display: flex;
    flex-flow: column wrap;
    color: #3f3f3d;
    `;  

class RadioButtonContainer extends Component {
    
    render(){
        return (
        <RadioWrapper>
            <StyledSubheader>{this.props.title}</StyledSubheader>
            <StyledRadioGroup
                name = {this.props.name}
                selectedValue={this.props.selectedOption}
                onChange={this.props.onSelect}>
                {this.props.options.map((option, i) => {
                    return <label key={i}>
                    <Radio value={option} key={i} />
                    {option}
                    </label>;
                })
            }
            </StyledRadioGroup>
            <StyledHelpText>{this.props.helpText}</StyledHelpText>
        </RadioWrapper>  
        )
    }
}


RadioButtonContainer.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    options: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    selectedOption: PropTypes.string.isRequired,
    helpText: PropTypes.string,
  }

export default RadioButtonContainer;