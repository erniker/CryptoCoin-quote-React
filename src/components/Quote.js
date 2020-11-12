import React from "react";
import styled from "@emotion/styled";

const ResultDiv = styled.div`
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
`;

const Info = styled.p`
  font-size: 18px;
  span {
    font-weight: bold;
  }
`;

const Prize = styled.p`
  font-size: 30px;
  span {
    font-weight: bold;
  }
`;

const Quote = ({ result }) => {
  if (Object.keys(result).length === 0) return null;

  return (
    <ResultDiv>
      <Prize>
        {" "}
        El precio es: <span>{result.PRICE}</span>{" "}
      </Prize>
      <Info>
        {" "}
        El precio mas alto del día es: <span>{result.HIGHDAY}</span>{" "}
      </Info>
      <Info>
        {" "}
        El precio mas bajo del día es: <span>{result.LOWDAY}</span>{" "}
      </Info>
      <Info>
        {" "}
        Variación últimas 24 horas: <span>{result.CHANGEPCT24HOUR}</span>{" "}
      </Info>
      <Info>
        {" "}
        Última actualización <span>{result.LASTUPDATE}</span>{" "}
      </Info>
    </ResultDiv>
  );
};

export default Quote;
