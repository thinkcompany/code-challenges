import styled from 'styled-components';

import { secondaryColors, primaryColors, pxToRem } from '../../assets/styles/theme';

export const SEPTACalculationOutput = styled.footer`
  background-color: ${secondaryColors.darkGray};
	text-align: center;
  padding: 15px 5px;
`;

export const SEPTACalculationOutputLabel = styled.p`
 	color: ${primaryColors.white};
	font-size: ${pxToRem(22)};
`;

export const SEPTACalculationOutputPrice = styled.h2`
	color: ${primaryColors.white};
	font-size: ${pxToRem(55)};
`;
