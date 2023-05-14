import React from "react";
import styled from "styled-components";

import { daytimeHelperText } from "../../data/inputData";
import { HelperMesage } from "./RadioInputWithLabel";

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 130px;
  border-bottom: 2px solid #e6e6e6;
  padding: 15px 30px;
`;

const Label = styled.label`
  font-size: 20px;
  color: #4d4d4d;
  margin-bottom: 10px;
`;

const SelectInput = styled.select`
  // downloaded the first downArrow image I found to not spend too much time on this.
  background: #fff url(./static/downArrow.png) no-repeat 96% 50%;
  background-size: 10%;
  position: relative;
  /* width: 100%; */
  width: 300px;
  height: 30px;
  padding: 0px 20px;
  font-size: 18px;
  font-weight: 400;
  color: #4d4d4d;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 2px solid #cfcfcf;
  border-radius: 6px;
`;

const Option = styled.option``;

const SelectInputWithLabel = ({
  label,
  inputName,
  inputOptions,
  includeHelperText,
  daytimeSelected,
  setValue,
}) => {
  // generate daytime select helper text
  let helperText = "";
  if (includeHelperText) {
    helperText = daytimeHelperText.filter(
      (item) => item.type === daytimeSelected
    )[0];
  }

  // update state to the changed value
  const handleSelectChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <InputContainer>
      <Label htmlFor={inputName}>{label}</Label>
      <SelectInput
        id={inputName}
        name={inputName}
        required
        onChange={handleSelectChange}
      >
        {inputOptions &&
          inputOptions.map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
      </SelectInput>
      {includeHelperText && (
        <HelperMesage aria-labelledby={inputName} lang="en">
          {helperText.text}
        </HelperMesage>
      )}
    </InputContainer>
  );
};

export default SelectInputWithLabel;
