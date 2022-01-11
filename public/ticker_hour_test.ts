import { expect, test } from "../dev_deps.ts";
import { fetchTickerHour } from "./ticker_hour.ts";
import { ALL_BITSTAMP_PAIRS } from "./constants.ts";
import { equality } from "./ticker_test.ts";
import type { BitstampPair } from "./types.ts";

async function testCase(pair: BitstampPair) {
  await expect(fetchTickerHour({ pair })).resolves.toEqual(equality);
}

test("fetchTickerHour", async () => {
  await Promise.all(ALL_BITSTAMP_PAIRS.map(testCase));
});
