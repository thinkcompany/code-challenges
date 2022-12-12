import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledHeader = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	background-color: #5a5a5a;
	color: white;
	font-size: 2rem;
	font-weight: 500;
	padding: 0.25rem 0;
`;

const StyledLogo = styled.img`
	width: 1.5rem;
	height: 1.5rem;
	margin: auto 0;
	padding-right: 0.5rem;
`;

const Header = ({header}) => {
	// Shortened url to the SEPTA logo
	const src = 'https://tinyurl.com/2zcdk35r';

	return (
		<>
			<StyledHeader>
				<StyledLogo
					src={src}
					alt="Red, white, and blue stylized 'S' representing SEPTA regional rail transport"
				/>
				{header}
			</StyledHeader>
		</>
	);
};

Header.propTypes = {
	header: PropTypes.string,
};

Header.defaultProps = {
	header: 'Regional Rail Fares',
};

export default Header;
