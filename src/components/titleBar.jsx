import React, { Component } from 'react';
import styled from 'styled-components'

const TitleWrapper = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    background-color: #3f3f3d;
    `;

const StyledImg = styled.img`
    padding: 33px 10px 20px 10px;
    width: 50px;
    height: 37px;
    `;

const StyledHeader = styled.h1`
    font-size: 2.5em;
    font-weight: bold;
    color: white;
    `;

class TitleBar extends Component {
    
    render(){
        return (
        <TitleWrapper>
            <StyledImg src='https://upload.wikimedia.org/wikipedia/commons/c/ca/SEPTA.svg' alt="Septa SVG"/>`
            <StyledHeader>Regional Rail Fares</StyledHeader>  
        </TitleWrapper>
        )

    }
}

export default TitleBar;