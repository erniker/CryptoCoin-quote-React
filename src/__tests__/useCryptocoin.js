import React from "react";
import { render, screen } from "@testing-library/react";
import Form from "../components/Form";
import userEvent from "@testing-library/user-event";
import { monedas, criptos } from "../__mocks__/criptomonedas";
import axios from "axios";

const mockAxios = axios;
const setCoin = jest.fn();
const setCryptoCoin = jest.fn();

test("<useCriptomonedas/>", async () => {
  // Consumir datos falsos
  mockAxios.get = jest.fn().mockResolvedValue({
    data: criptos,
  });

  render(<Form setCoin={setCoin} setCryptoCoin={setCryptoCoin} />);

  // Verficar la cantidad de opciones de monedas
  const monedasDropdown = screen.getByTestId("select-monedas");
  expect(monedasDropdown.children.length).toEqual(monedas.length + 1);

  // Verificar la cantidad de opciones de las criptomonedas
  const opciones = screen.findAllByTestId("opcion-cripto");
  expect(await opciones).toHaveLength(10);

  expect(mockAxios.get).toHaveBeenCalledTimes(1);

  // Seleccionar B>itcoin y USD
  userEvent.selectOptions(screen.getByTestId("select-monedas"), "USD");
  userEvent.selectOptions(screen.getByTestId("select-criptos"), "BTC");

  // Submit al formulario
  userEvent.click(screen.getByTestId("submit"));

  // Verificar que las funciones se hayan llamado
  expect(setCoin).toHaveBeenCalled();
  expect(setCoin).toHaveBeenCalledTimes(1);

  expect(setCryptoCoin).toHaveBeenCalled();
  expect(setCryptoCoin).toHaveBeenCalledTimes(1);
});
