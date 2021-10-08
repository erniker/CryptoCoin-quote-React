import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import useCoin from "../hooks/useCoin";
import useCryptocoin from "../hooks/useCryptocoin";
import axios from "axios";
import Error from "./Error";

const Button = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;

const Form = ({ setCoin, setCryptoCoin }) => {
  // State of CryptoCoin list
  const [CryptoList, getCryptoCoin] = useState([]);

  // Error State
  const [error, getError] = useState(false);

  const COINS = [
    { code: "USD", name: "Dollar" },
    { code: "EUR", name: "Euro" },
    { code: "GBP", name: "Libra" },
    { code: "MXN", name: "Peso" },
  ];

  // Using useCoin
  const [coin, SelectCoin] = useCoin("Elige tu Moneda", "", COINS);

  // Using useCryptocoin
  const [cryptocoin, SelectCrypto] = useCryptocoin(
    "Elige tu Cryptomoneda",
    "",
    CryptoList
  );

  // Call to API
  useEffect(() => {
    const apiResponse = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
      const result = await axios.get(url);
      getCryptoCoin(result.data.Data);
    };
    apiResponse();
  }, []);

  // Submit action
  const quoteCoin = (e) => {
    e.preventDefault();

    // Validate if form fields all empty
    if (coin === "" || cryptocoin === "") {
      getError(true);
      return;
    }

    // Pass data to main component
    getError(false);
    setCoin(coin);
    setCryptoCoin(cryptocoin);
  };

  return (
    <form onSubmit={quoteCoin}>
      {error ? <Error message="Todos los campos son obligatorios" /> : null}
      <SelectCoin />
      <SelectCrypto />
      <Button data-testid="submit" type="submit" value="Calcular" />{" "}
    </form>
  );
};

export default Form;
