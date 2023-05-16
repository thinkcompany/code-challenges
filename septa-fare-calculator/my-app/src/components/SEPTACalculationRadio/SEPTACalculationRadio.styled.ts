import styled from 'styled-components';

import { secondaryColors, pxToRem } from '../../assets/styles/theme';

export const SEPTACalculationRadio = styled.div`
  width: fit-content;
  margin: 20px auto 0;

  label {
    display: block;
    color: ${secondaryColors.darkGray};
	  font-size: ${pxToRem(20)};
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  }
`;

export const Radio = styled.input`
  border-color: ${secondaryColors.gray};
  margin: 0 10px 0 0;
  width: 19px;
  height: 19px;
`;

