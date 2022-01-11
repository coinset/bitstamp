import { anyArray, anyNumber, anyString, expect, test } from "../dev_deps.ts";
import { fetchOhlc } from "./ohlc.ts";

test("fetchOhlc", async () => {
  await expect(fetchOhlc({ "pair": "btcusd", step: 60, limit: 1 })).resolves
    .toEqual({
      data: {
        pair: anyString(),
        ohlc: anyArray({
          high: anyNumber(),
          timestamp: anyNumber(),
          volume: anyNumber(),
          low: anyNumber(),
          close: anyNumber(),
          open: anyNumber(),
        }),
      },
    });
});
