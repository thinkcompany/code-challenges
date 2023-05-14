import React, { useEffect } from "react";
import styled from "styled-components";

// default flex styles
const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RadioGroup = styled(Flex)`
  flex-direction: column;
  min-height: 130px;
  border-bottom: 2px solid #e6e6e6;
  padding: 15px;
`;

const Fieldset = styled.fieldset`
  border: none;
`;

const Legend = styled.legend`
  text-align: center;
  font-size: 20px;
  color: #4d4d4d;
  margin-bottom: 16px;
`;

const InputContainer = styled(Flex)`
  flex-direction: column;
`;

const InputSetContainer = styled(Flex)`
  width: 200px;
  justify-content: flex-end;
  flex-direction: row-reverse;
  ${(props) => props.marginBottom && `margin-bottom: 16px`};
`;

const Label = styled.label`
  font-size: 18px;
  color: #4d4d4d;
  margin-left: 10px;
`;

const Input = styled.input`
  width: 20px;
  height: 20px;
`;

// used in other inputs
export const HelperMesage = styled.p`
  color: #6d6d6d;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
  padding: 0 10px;
`;

const RadioInputWithLabel = ({
  label,
  inputOptions,
  currentPurchasedLocation,
  setPurchaseLocation,
  daytimeSelected,
  // includeHelperText
}) => {
  // set the state in parent component to equal the value changed.
  const handleValueChange = (e) => {
    setPurchaseLocation(e.target.value);
  };

  /**
   * change the purchase location to "advance_purchase" whenever "Anytime"
   * is selected. As only advance purchases are allowed for "Anytimes" rides.
   * This is done to prevent the user from selecting "onboard" as the daytime for the ride.
   */
  useEffect(() => {
    if (daytimeSelected === "Anytime") setPurchaseLocation("advance_purchase");
  }, [daytimeSelected, setPurchaseLocation]);

  return (
    <RadioGroup role="radiogroup">
      <Fieldset>
        <Legend>{label}</Legend>
        <InputContainer>
          {inputOptions &&
            inputOptions.map((option, idx) => (
              <InputSetContainer
                key={option.id}
                marginBottom={idx !== inputOptions.length - 1}
              >
                <Label htmlFor={option.id}>{option.label}</Label>
                {daytimeSelected === "Anytime" && (
                  <Input
                    type="radio"
                    id={option.id}
                    name={option.name}
                    value="advance_purchase"
                    onChange={handleValueChange}
                    checked={option.value === "advance_purchase"} // auto select advance_purchase when ride is "Anytime"
                  />
                )}
                {daytimeSelected !== "Anytime" && (
                  <Input
                    type="radio"
                    id={option.id}
                    name={option.name}
                    value={option.value}
                    checked={currentPurchasedLocation === option.value}
                    onChange={handleValueChange}
                  />
                )}
              </InputSetContainer>
            ))}
          {daytimeSelected === "Anytime" && (
            <HelperMesage aria-labelledby={label}>
              Anytime rides must be purchased at Station Kiosk
            </HelperMesage>
          )}
        </InputContainer>
      </Fieldset>
    </RadioGroup>
  );
};

export default RadioInputWithLabel;
