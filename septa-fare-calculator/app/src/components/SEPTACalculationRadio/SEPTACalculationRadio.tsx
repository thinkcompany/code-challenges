import * as S from './SEPTACalculationRadio.styled';

import { SEPTACalculationRadioProps } from './interfaces';

export const SEPTACalculationRadio = ({
  onChange,
}: SEPTACalculationRadioProps) => {
  return (
    <S.SEPTACalculationRadio>
      <label>
        <S.Radio
          type="radio"
          name="purchase"
          value="advance_purchase"
          onChange={(event) => onChange(event.target.value)}
        />
        Station kiosk
      </label>

      <label>
        <S.Radio
          type="radio"
          name="purchase"
          value="onboard_purchase"
          onChange={(event) => onChange(event.target.value)}
        />
        Onboard
      </label>
    </S.SEPTACalculationRadio>
  );
};
