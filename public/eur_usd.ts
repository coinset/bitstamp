import { jsonFetch, Reviver } from "./_utils.ts";
import { isString } from "../deps.ts";
import { BASE_URL } from "./constants.ts";

export type EURUSDRespnse = {
  buy: number;
  sell: number;
};

const reviver: Reviver = (key, value) => {
  if (["buy", "sell"].includes(key) && isString(value)) {
    return Number(value);
  }
  return value;
};

export function fetchEURUSD(
  init?: RequestInit,
): Promise<EURUSDRespnse> {
  const url = new URL("eur_usd", BASE_URL);

  return jsonFetch(url, init, {
    parseJson: reviver,
  });
}
