import { anyNumber, expect, test } from "../dev_deps.ts";
import { fetchEURUSD } from "./eur_usd.ts";

test("fetchEURUSD", async () => {
  await expect(fetchEURUSD()).resolves.toEqual({
    buy: anyNumber(),
    sell: anyNumber(),
  });
});
