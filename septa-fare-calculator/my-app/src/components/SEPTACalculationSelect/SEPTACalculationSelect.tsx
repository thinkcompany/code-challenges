import * as S from './SEPTACalculationSelect.styled';
import { SEPTACalculationSelectProps } from './interfaces';

export const SEPTACalculationSelect = ({
  label,
  options,
  info,
}: SEPTACalculationSelectProps) => {
  return (
    <S.SEPTACalculationSelect>
      <S.Label>{label}</S.Label>

      <S.Select>
        <option value="" hidden>
          Type
        </option>

        {options?.map((option: any) => {
          return <option value="1">Audi</option>;
        })}
      </S.Select>

      <S.Info>{info}</S.Info>
    </S.SEPTACalculationSelect>
  );
};
