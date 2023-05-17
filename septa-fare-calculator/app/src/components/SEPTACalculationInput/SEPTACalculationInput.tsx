import * as S from './SEPTACalculationInput.styled';

import { SEPTACalculationInputProps } from './interfaces';

export const SEPTACalculationInput = ({
  setCalculationValue,
}: SEPTACalculationInputProps) => {
  return (
    <S.SEPTACalculationInput>
      <S.Input
        type="number"
        pattern="[0-9]*"
        onChange={(event) => setCalculationValue(event.target.value)}
      />
    </S.SEPTACalculationInput>
  );
};
