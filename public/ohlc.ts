import { jsonFetch, Reviver } from "./_utils.ts";
import { BASE_URL } from "./constants.ts";
import { isNumber, isString } from "../deps.ts";
import type { BitstampPair } from "./types.ts";

export type OhlcOptions = {
  pair: BitstampPair;
  step:
    | 60
    | 180
    | 300
    | 900
    | 1800
    | 3600
    | 7200
    | 14400
    | 21600
    | 43200
    | 86400
    | 259200;
  limit: number;
  start?: number;
  end?: number;
};

export type OhlcResponse = {
  data: {
    pair: string;
    ohlc: {
      high: number;
      timestamp: number;
      volume: number;
      low: number;
      close: number;
      open: number;
    }[];
  };
};

const reviver: Reviver = (key, value) => {
  if (
    ["high", "timestamp", "volume", "low", "close", "open"].includes(key) &&
    isString(value)
  ) {
    return Number(value);
  }
  return value;
};

export function fetchOhlc(
  { pair, step, limit, start, end }: OhlcOptions,
  init?: RequestInit,
): Promise<OhlcResponse> {
  const url = new URL(`ohlc/${pair}/`, BASE_URL);

  url.searchParams.set("step", String(step));
  url.searchParams.set("limit", String(limit));

  if (isNumber(start)) {
    url.searchParams.set("start", String(start));
  }

  if (isNumber(end)) {
    url.searchParams.set("end", String(end));
  }

  return jsonFetch(url, init, {
    parseJson: reviver,
  });
}
