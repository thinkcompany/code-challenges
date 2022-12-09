import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledSubText = styled.div`
	font-size: 0.75rem;
	color: #5a5a5a;
	margin-bottom: 1rem;
`;

const SubInfoText = ({subtext}) => <StyledSubText>{subtext}</StyledSubText>;

SubInfoText.propTypes = {
	subtext: PropTypes.string,
};

SubInfoText.defaultProps = {
	subtext: '',
};

export default SubInfoText;
