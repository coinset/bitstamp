import { jsonFetch, Reviver } from "./_utils.ts";
import { isString } from "../deps.ts";
import type { BitstampPair } from "./types.ts";
import { BASE_URL } from "./constants.ts";

export type TransactionOptions = {
  pair: BitstampPair;
  time?: "minute" | "hour" | "day";
};

export type TransactionResponse = {
  date: number;
  tid: string;
  amount: number;
  type: "0" | "1";
  price: number;
}[];

const reviver: Reviver = (key, value) => {
  if (["date", "amount", "price"].includes(key) && isString(value)) {
    return Number(value);
  }
  return value;
};

export function fetchTransaction(
  { pair, time }: TransactionOptions,
  init?: RequestInit,
): Promise<TransactionResponse> {
  const url = new URL(`transactions/${pair}`, BASE_URL);

  if (isString(time)) {
    url.searchParams.set("time", time);
  }

  return jsonFetch(url, init, {
    parseJson: reviver,
  });
}
