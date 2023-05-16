import styled from 'styled-components';

import { secondaryColors, primaryColors } from '../../assets/styles/theme';

export const SEPTACalculatorWidgetContainer = styled.div`
  border: 4px solid ${secondaryColors.gray};
  max-width: 500px;
  margin: 40px auto;

  header {
    background-color: ${secondaryColors.darkGray};
    color: ${primaryColors.white};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 20px;

    h1 {
      margin: 0 0 0 15px;
    }
  }
`;
