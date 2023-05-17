import styled from 'styled-components';

import { secondaryColors, primaryColors } from '../../assets/styles/theme';

export const SEPTACalculatorWidgetContainer = styled.div`
  border: 4px solid ${secondaryColors.gray};
  max-width: 410px;
  margin: auto;

  header {
    background-color: ${secondaryColors.darkGray};
    color: ${primaryColors.white};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px 20px;

    img {
      width: 45px;
    }

    h1 {
      margin: 0 0 0 15px;
    }
  }
`;

