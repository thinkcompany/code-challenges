import {
  SEPTACalculatorWidgetSection,
  SEPTACalculationOutput,
  SEPTACalculationSelect,
  SEPTACalculationInput,
  SEPTACalculationRadio,
} from '../../components';

import { useFetchAPI } from '../../hooks/useFetchAPI';
import { useFormHandler } from '../../hooks/useFormHandler';

import Logo from '../../assets/images/SEPTA-logo.png';

import * as S from './SEPTACalculatorWidgetContainer.styled';

export const SEPTACalculatorWidgetContainer = () => {
  const { responseData, loading, error } = useFetchAPI();

  //TODO: Need to show a right info message below the selects and input for the all possible cases. 

  const {
    purchaseOptions,
    calculatedPrice,
    setSelectedZoneValue,
    setSelectedTravelTime,
    setLocationValue,
    setCalculationValue,
  } = useFormHandler(responseData);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <S.SEPTACalculatorWidgetContainer>
      <header>
        <img
          src={Logo}
          alt="Southeastern Pennsylvania Transportation Authority Logo"
        />
        <h1>Regional Rail Fares</h1>
      </header>

      <main>
        <SEPTACalculatorWidgetSection label="Where are you going?">
          <SEPTACalculationSelect
            options={responseData?.zones}
            onChange={setSelectedZoneValue}
          />
        </SEPTACalculatorWidgetSection>

        <SEPTACalculatorWidgetSection label="When are you ridding?">
          <SEPTACalculationSelect
            info="Tickets available for purchase at all SEPTA offices."
            options={purchaseOptions}
            onChange={setSelectedTravelTime}
          />
        </SEPTACalculatorWidgetSection>

        <SEPTACalculatorWidgetSection label="Where will you purchase the fare?">
          <SEPTACalculationRadio onChange={setLocationValue} />
        </SEPTACalculatorWidgetSection>

        <SEPTACalculatorWidgetSection label="How many rides will you need?">
          <SEPTACalculationInput setCalculationValue={setCalculationValue} />
        </SEPTACalculatorWidgetSection>
      </main>

      <SEPTACalculationOutput calculatedPrice={calculatedPrice} />
    </S.SEPTACalculatorWidgetContainer>
  );
};
