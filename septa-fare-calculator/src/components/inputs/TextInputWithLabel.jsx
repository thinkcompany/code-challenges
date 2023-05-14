import React from "react";
import styled from "styled-components";

import { HelperMesage } from "./RadioInputWithLabel";

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 130px;
  border-bottom: 2px solid #e6e6e6;
  padding: 15px;
`;

const Label = styled.label`
  font-size: 20px;
  color: #4d4d4d;
  margin-bottom: 24px;
`;

const Input = styled.input`
  width: 80px;
  height: 50px;
  padding: 10px 0px;
  text-align: center;
  border: solid 2px #ccc;
  border-radius: 6px;
  font-size: 28px;
  color: #4d4d4d;
`;

const TextInputWithLabel = ({
  label,
  inputId,
  inputName,
  setRideQuantity,
  rideQuantity,
  daytimeSelected,
}) => {
  // udpate state to the changed value
  const handleChange = (e) => {
    setRideQuantity(e.target.value);
  };

  return (
    <InputContainer>
      <Label htmlFor={inputId}>{label}</Label>
      <Input
        type="text"
        id={inputId}
        name={inputName}
        value={rideQuantity}
        onChange={handleChange}
      />
      {daytimeSelected === "Anytime" && (
        <HelperMesage aria-labelledby={label}>
          Anytime tickets must be purchase as bundles of 10
        </HelperMesage>
      )}
    </InputContainer>
  );
};

export default TextInputWithLabel;
