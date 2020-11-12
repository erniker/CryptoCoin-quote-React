import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import image from "./cryptomonedas.png";
import Form from "./components/Form";
import axios from "axios";
import Quote from "./components/Quote";
import Spinner from "./components/Spinner";

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Image = styled.img`
  max-width: 100%;
  margin-top: 2rem;
`;

const Heading = styled.h1`
  font-family: "Bebas Neue", cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`;

function App() {
  const [coin, setCoin] = useState("");
  const [cryptoCoin, setCryptoCoin] = useState("");
  const [result, setResult] = useState({});
  const [charging, setCharging] = useState(false);

  useEffect(() => {
    const cryptoCoinQuote = async () => {
      // Avoid fist-time ejecution
      if (coin === "") return;
      // Consult api for get quote
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoCoin}&tsyms=${coin}`;
      const result = await axios.get(url);

      //show spinner
      setCharging(true);

      // Hide spinner and show results
      setTimeout(() => {
        setCharging(false);

        // Save quote
        setResult(result.data.DISPLAY[cryptoCoin][coin]);
      }, 3000);
    };
    cryptoCoinQuote();
  }, [coin, cryptoCoin]);

  // Show spinner or result
  const component = charging ? <Spinner /> : <Quote result={result} />;
  return (
    <Container>
      <div>
        <Image src={image} alt="Imagen Crypto" />
      </div>
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Form setCoin={setCoin} setCryptoCoin={setCryptoCoin} />
        {component}
      </div>
    </Container>
  );
}

export default App;
