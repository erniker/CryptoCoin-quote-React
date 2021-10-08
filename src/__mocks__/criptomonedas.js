import { readFileSync } from "fs";
import path from "path";

export const criptos = JSON.parse(
  readFileSync(path.join(__dirname, "api.json")).toString()
);

export const monedas = [
  { code: "USD", name: "Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "Libra" },
  { code: "MXN", name: "Peso" },
];
