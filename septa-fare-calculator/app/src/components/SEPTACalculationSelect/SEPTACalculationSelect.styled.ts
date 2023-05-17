import styled from 'styled-components';

import { secondaryColors, pxToRem } from '../../assets/styles/theme';

export const SEPTACalculationSelect = styled.div`
  width: 100%;
  padding: 0 22px;
`;

export const Select = styled.select`
  border-color: ${secondaryColors.gray};
	color: ${secondaryColors.darkGray};
	font-size: ${pxToRem(18)};
  width: 100%;
  border-radius: 5px;
  padding: 13px;
  text-transform: capitalize;
`;

export const Info = styled.p`
	font-size: ${pxToRem(14)};
	color: #837d7d;
	text-align: center;
  margin: 13px 0 0;
`;
