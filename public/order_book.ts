import { jsonFetch, Reviver } from "./_utils.ts";
import { BASE_URL } from "./constants.ts";
import { isNumber, isString } from "../deps.ts";
import type { BitstampPair } from "./types.ts";

type Group = 0 | 1 | 2;
export type OrderBookOptions<G extends Group = 1> = {
  // deno-lint-ignore ban-types
  pair: BitstampPair | ({} & string);
  group?: G;
};

export type OrderBookResponse<G extends Group = 1> = {
  timestamp: number;
  microtimestamp: number;
  bids: G extends 0 | 1 ? [number, number][] : [number, number, number][];
  asks: G extends 0 | 1 ? [number, number][] : [number, number, number][];
};

const reviver: Reviver = (key, value) => {
  if (
    ["asks", "bids"]
      .includes(key) && Array.isArray(value)
  ) {
    return value.map((v) => {
      if (Array.isArray(v)) {
        return v.map((val) => isString(val) ? Number(val) : val);
      }
      return v;
    });
  }

  if (["timestamp", "microtimestamp"].includes(key) && isString(value)) {
    return Number(value);
  }
  return value;
};

export function fetchOrderBook<G extends Group = 1>(
  { pair, group }: OrderBookOptions<G>,
  init?: RequestInit,
): Promise<OrderBookResponse<G>> {
  const url = new URL(`order_book/${pair}/`, BASE_URL);

  if (isNumber(group)) {
    url.searchParams.set("group", String(group));
  }

  return jsonFetch(url, init, {
    parseJson: reviver,
  });
}
