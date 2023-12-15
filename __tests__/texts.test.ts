import { expect, jest, test } from "@jest/globals";
import { validateEmail } from "@/utils/texts";

test("test validateEmail function", () => {
  expect(validateEmail("hola")).toBe(false);
  expect(validateEmail("lucas")).toBe(false);
  expect(validateEmail("5")).toBe(false);
  expect(validateEmail("omar@gmail.")).toBe(false);
  expect(validateEmail("omar@gmail.com")).toBe(true);
});

test("test validateEmail function using boolean values", () => {
  expect(validateEmail("false")).toBe(false);
});

// test("valid text transform", () => {});
