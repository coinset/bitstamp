import { anyNumber, expect, test } from "../dev_deps.ts";
import { fetchTicker } from "./ticker.ts";
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
test("fetchTicker", async () => {
  const testCase = async (pair: BitstampPair) => {
    await expect(fetchTicker({ pair })).resolves.toEqual(equality);
  };

  await Promise.all(ALL_BITSTAMP_PAIRS.map(testCase));
});
