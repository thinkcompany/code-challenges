import styled from 'styled-components';

import { secondaryColors, pxToRem } from '../../assets/styles/theme';

export const SEPTACalculationInput = styled.div`
  width: 100%;
  padding: 0 30px;
`;

export const Input = styled.input`
  border-color: ${secondaryColors.gray};
	color: ${secondaryColors.darkGray};
	font-size: ${pxToRem(28)};
  width: 140px;
  border-radius: 5px;
  padding: 8px;
  margin: auto;
  display: block;
  text-align: center;
`;
