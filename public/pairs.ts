import { jsonFetch } from "./_utils.ts";
import { BASE_URL } from "./constants.ts";

export type PairsResponse = {
  url_symbol: string;
  trading: "Enabled" | "Disabled";
  base_decimals: number;
  name: string;
  instant_and_market_orders: "Enabled" | "Disabled";
  minimum_order: string;
  counter_decimals: number;
  description: string;
};

export function fetchPairs(
  init?: RequestInit,
): Promise<PairsResponse> {
  const url = new URL("trading-pairs-info", BASE_URL);

  return jsonFetch(url, init);
}
