import { describe, it, expect } from "vitest";
import { validate, isValid } from "./validation";

describe("validate", () => {
  it("vrátí chybu když uuid chybí", () => {
    const errors = validate({ uuid: "", battery_percent: "50" });
    expect(errors.uuid).toBeDefined();
  });

  it("vrátí chybu když battery_percent chybí", () => {
    const errors = validate({ uuid: "abc", battery_percent: "" });
    expect(errors.battery_percent).toBeDefined();
  });

  it("vrátí chybu když battery_percent není číslo", () => {
    const errors = validate({ uuid: "abc", battery_percent: "x" });
    expect(errors.battery_percent).toBeDefined();
  });

  it("vrátí chybu když je battery_percent mimo rozsah 0-100", () => {
    expect(validate({ uuid: "abc", battery_percent: "-1" }).battery_percent).toBeDefined();
    expect(validate({ uuid: "abc", battery_percent: "101" }).battery_percent).toBeDefined();
  });

  it("projde při platných hodnotách", () => {
    const errors = validate({ uuid: "abc", battery_percent: "85" });
    expect(isValid(errors)).toBe(true);
  });

  it("akceptuje hranice 0 a 100", () => {
    expect(isValid(validate({ uuid: "abc", battery_percent: "0" }))).toBe(true);
    expect(isValid(validate({ uuid: "abc", battery_percent: "100" }))).toBe(true);
  });
});
