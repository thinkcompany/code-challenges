import * as S from './SEPTACalculationSelect.styled';

import { SEPTACalculationSelectProps } from './interfaces';

export const SEPTACalculationSelect = ({
  options,
  info,
  onChange,
}: SEPTACalculationSelectProps) => {
  return (
    <S.SEPTACalculationSelect>
      <S.Select onChange={(event) => onChange(event.target.value)}>
        <option value="">Please choose an option</option>
        {options?.map((option: any) => {
          return <option key={option.name} value={option.name}>{option.name.replace("_", " ")}</option>;
        })}
      </S.Select>

      <S.Info>{info}</S.Info>
    </S.SEPTACalculationSelect>
  );
};
