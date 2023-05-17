import styled from 'styled-components';

import { secondaryColors, pxToRem } from '../../assets/styles/theme';


export const SEPTACalculatorWidgetSection = styled.div`
  border-bottom: 1px solid ${secondaryColors.gray};
  padding: 25px 0 25px;
`;

export const Label = styled.h2`
	color: ${secondaryColors.darkGray};
	font-size: ${pxToRem(22)};
	text-align: center;
	font-weight: 500;
  margin: 0 0 15px;
`;

