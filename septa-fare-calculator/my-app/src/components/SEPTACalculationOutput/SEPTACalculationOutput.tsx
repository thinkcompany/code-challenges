import * as S from './SEPTACalculationOutput.styled';

export const SEPTACalculationOutput = ({
  calculatedPrice,
}: {
  calculatedPrice: string;
}) => {
  return (
    <S.SEPTACalculationOutput>
      <S.SEPTACalculationOutputLabel>
        Your fair will cost
      </S.SEPTACalculationOutputLabel>
      <S.SEPTACalculationOutputPrice>
        ${calculatedPrice}
      </S.SEPTACalculationOutputPrice>
    </S.SEPTACalculationOutput>
  );
};
