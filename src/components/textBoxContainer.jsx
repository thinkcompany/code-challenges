import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TextBoxWrapper = styled.div`
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

const StyledInput = styled.input`
    font-size: 2em;
    border: 2px solid #3f3f3d;
    border-radius: 5px;
    width: 100px;
    color: #3f3f3d;
    text-align: center;
`;


class TextBoxContainer extends Component {
    
    //I left the help text in here just in case I wanted to revisit it
    render(){
        return (
        <TextBoxWrapper>
            <StyledSubheader>{this.props.title}</StyledSubheader>
            <StyledInput type="text" pattern="[0-9]*" value={this.props.defaultValue} onChange={this.props.handleChange} />
            <h3>{this.props.helpText}</h3>
        </TextBoxWrapper>  
        )
    }
}

TextBoxContainer.propTypes = {
    title: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    defaultValue: PropTypes.string.isRequired,
    helpText: PropTypes.string,
  }

export default TextBoxContainer;