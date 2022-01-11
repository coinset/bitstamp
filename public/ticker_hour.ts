import { jsonFetch } from "./_utils.ts";
import { BASE_URL } from "./constants.ts";
import { reviver, TickerOptions, TickerResponse } from "./ticker.ts";

export function fetchTickerHour(
  { pair }: TickerOptions,
  init?: RequestInit,
): Promise<TickerResponse> {
  const url = new URL(`ticker_hour/${pair}/`, BASE_URL);

  return jsonFetch(url, init, {
    parseJson: reviver,
  });
}
