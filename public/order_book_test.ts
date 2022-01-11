import { anyArray, anyNumber, expect, test } from "../dev_deps.ts";
import { fetchOrderBook } from "./order_book.ts";
import { ALL_BITSTAMP_PAIRS } from "./constants.ts";
import type { BitstampPair } from "./types.ts";

export const equality = {
  high: anyNumber(),
  last: anyNumber(),
  timestamp: anyNumber(),
  bid: anyNumber(),
  vwap: anyNumber(),
  volume: anyNumber(),
  low: anyNumber(),
  ask: anyNumber(),
  open: anyNumber(),
};
test("fetchOrderBook", async () => {
  const testCase = async (pair: BitstampPair) => {
    await expect(fetchOrderBook({ pair, group: 1 })).resolves.toEqual({
      timestamp: anyNumber(),
      microtimestamp: anyNumber(),
      bids: anyArray([anyNumber(), anyNumber()]),
      asks: anyArray([anyNumber(), anyNumber()]),
    });
  };

  await Promise.all(ALL_BITSTAMP_PAIRS.map(testCase));

  await expect(fetchOrderBook({ pair: "adaeur", group: 2 })).resolves.toEqual({
    timestamp: anyNumber(),
    microtimestamp: anyNumber(),
    bids: anyArray([anyNumber(), anyNumber(), anyNumber()]),
    asks: anyArray([anyNumber(), anyNumber(), anyNumber()]),
  });
});
