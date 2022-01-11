import { jsonFetch, Reviver } from "./_utils.ts";
import { BASE_URL } from "./constants.ts";
import { isString } from "../deps.ts";

export type TickerOptions = {
  pair: string;
};

export type TickerResponse = {
  high: number;
  last: number;
  timestamp: number;
  bid: number;
  vwap: number;
  volume: number;
  low: number;
  ask: number;
  open: number;
};

const reviver: Reviver = (key, value) => {
  if (
    ["high", "last", "timestamp", "bid", "vwap", "volume", "low", "ask", "open"]
      .includes(key) && isString(value)
  ) {
    return Number(value);
  }
  return value;
};

export function fetchTicker(
  { pair }: TickerOptions,
  init?: RequestInit,
): Promise<TickerResponse> {
  const url = new URL(`ticker/${pair}/`, BASE_URL);

  return jsonFetch(url, init, {
    parseJson: reviver,
  });
}
