import {
  SEPTACalculatorWidgetSection,
  SEPTACalculationOutput,
  SEPTACalculationSelect,
  SEPTACalculationInput,
  SEPTACalculationRadio,
} from '../../components';
import Logo from '../../assets/images/SEPTA-logo.png';

import * as S from './SEPTACalculatorWidgetContainer.styled';

export const SEPTACalculatorWidgetContainer = () => {
  return (
    <S.SEPTACalculatorWidgetContainer>
      <header>
        <img src={Logo} alt="Southeastern Pennsylvania Transportation Authority Logo" />
        <h1>Regional Rail Fares</h1>
      </header>

      <main>
        <SEPTACalculatorWidgetSection label="Where are you going?">
          <SEPTACalculationSelect  options={[]} />
        </SEPTACalculatorWidgetSection>

        <SEPTACalculatorWidgetSection label="When are you ridding?">
          <SEPTACalculationSelect
            info="Tickets available for purchase at all SEPTA offices."
            options={[]}
          />
        </SEPTACalculatorWidgetSection>

        <SEPTACalculatorWidgetSection label="Where will you purchase the fare?">
          <SEPTACalculationRadio value="advance_purchase" selectedOption={"advance_purchase"} />
        </SEPTACalculatorWidgetSection>

        <SEPTACalculatorWidgetSection label="How many rides will you need?">
          <SEPTACalculationInput />
        </SEPTACalculatorWidgetSection>
      </main>

      <SEPTACalculationOutput />
    </S.SEPTACalculatorWidgetContainer>
  );
};
