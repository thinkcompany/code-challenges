import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import styled from 'styled-components'

const FooterWrapper = styled.div`
    display: flex;
    flex-flow: column wrap;
    background-color: #3f3f3d;
    text-align: center;  
    `;

const StyledHeader = styled.h1`
    font-size: 2.5em;
    color: white;
    padding-bottom: 10px
    `;

const StyledCurrency = styled(NumberFormat)`
    font-size: 3em;
    font-weight: bold;
    background-color: #3f3f3d;
    color: white;
    padding-bottom: 20px;
    `;

class FooterBar extends Component {
    
    render(){
        return (
        <FooterWrapper>
            <StyledHeader>Your fare will cost:</StyledHeader> 
            <StyledCurrency thousandSeparator={true} 
            prefix={'$'} 
            value={this.props.value}
            decimalScale={2}
            fixedDecimalScale= {true}
            displayType={'text'}
            />
        </FooterWrapper>
        )
    }
}

FooterBar.propTypes = {
    value: PropTypes.number,
  }

export default FooterBar;