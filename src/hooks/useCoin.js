import React, { useState } from "react";
import styled from "@emotion/styled";

const Label = styled.label`
  font-family: "Bebas Neue", cursive;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 2.4rem;
  margin-top: 2rem;
  display: block;
`;

const Select = styled.select`
  width: 100%;
  display: block;
  padding: 1rem;
  -webkit-appearance: none;
  border-radius: 10px;
  border: none;
  font-size: 1.2rem;
`;

const useCoin = (label, initState, options) => {
  // Custom hook state
  const [state, updateState] = useState(initState);

  const SelectCoin = () => (
    <>
      <Label>{label}</Label>
      <Select
        onChange={(e) => updateState(e.target.value)}
        value={state}
        data-testid="select-monedas"
      >
        <option value="">-- Seleccione --</option>
        {options.map((option) => (
          <option key={option.code} value={option.code}>
            {option.name}
          </option>
        ))}
      </Select>
    </>
  );
  // Return state, interface and fn which modificate the state
  return [state, SelectCoin, updateState];
};

export default useCoin;
