import {
  anyArray,
  anyNumber,
  anyOf,
  anyString,
  expect,
  test,
} from "../dev_deps.ts";
import { fetchTransaction } from "./transaction.ts";

test("fetchTransaction", async () => {
  await expect(fetchTransaction({ "pair": "btcusd" })).resolves.toEqual(
    anyArray({
      date: anyNumber(),
      tid: anyString(),
      amount: anyNumber(),
      type: anyOf(["0", "1"]),
      price: anyNumber(),
    }),
  );
});
