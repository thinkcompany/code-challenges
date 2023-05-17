import * as S from './SEPTACalculatorWidgetSection.styled';

import { SEPTACalculatorWidgetSectionProps } from './interfaces';

export const SEPTACalculatorWidgetSection = ({ label, children }: SEPTACalculatorWidgetSectionProps) => {
  return (
    <S.SEPTACalculatorWidgetSection>
      <S.Label>{label}</S.Label>

      {children}
    </S.SEPTACalculatorWidgetSection>
  
  )
}
