import * as S from './SEPTACalculationRadio.styled';

import { SEPTACalculationRadioProps } from './interfaces';

export const SEPTACalculationRadio = ({
  value,
  selectedOption,
}: SEPTACalculationRadioProps) => {
  return (
    <S.SEPTACalculationRadio>
      <label>
        <S.Radio
          type="radio"
          value={value}
          checked={selectedOption === 'onboard_purchase'}
        />
        Station kiosk
      </label>
      
      <label>
        <S.Radio
          type="radio"
          value={value}
          checked={selectedOption === 'advance_purchase'}
        />
        Onboard
      </label>
    </S.SEPTACalculationRadio>
  );
};
