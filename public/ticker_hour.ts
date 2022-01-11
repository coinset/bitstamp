import { jsonFetch, Reviver } from "./_utils.ts";
import { BASE_URL } from "./constants.ts";
import { isString } from "../deps.ts";
import type { TickerOptions, TickerResponse } from "./ticker.ts";

const reviver: Reviver = (key, value) => {
  if (
    ["high", "last", "timestamp", "bid", "vwap", "volume", "low", "ask", "open"]
      .includes(key) && isString(value)
  ) {
    return Number(value);
  }
  return value;
};

export function fetchTickerHour(
  { pair }: TickerOptions,
  init?: RequestInit,
): Promise<TickerResponse> {
  const url = new URL(`ticker_hour/${pair}/`, BASE_URL);

  return jsonFetch(url, init, {
    parseJson: reviver,
  });
}
