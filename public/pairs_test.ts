import {
  anyArray,
  anyNumber,
  anyOf,
  anyString,
  expect,
  test,
} from "../dev_deps.ts";
import { fetchPairs } from "./pairs.ts";

test("fetchPairs", async () => {
  await expect(fetchPairs()).resolves.toEqual(anyArray({
    url_symbol: anyString(),
    trading: anyOf(["Enabled", "Disabled"]),
    base_decimals: anyNumber(),
    name: anyString(),
    instant_and_market_orders: anyOf(["Enabled", "Disabled"]),
    minimum_order: anyString(),
    counter_decimals: anyNumber(),
    description: anyString(),
  }));
});
