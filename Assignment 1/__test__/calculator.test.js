import { add } from "../src/calculator.js";
import { divide } from "../src/calculator.js";

describe("add", () => {
  it("adds two positive numbers", () => {
    expect(add(2, 3)).toBe(5);
  });

  it("adds two negative numbers", () => {
    expect(add(-2, -3)).toBe(-5);
  });

  it("throws when inputs are not numbers", () => {
    expect(() => add("2", 3)).toThrow("add expects two numbers");
  });
});

describe("divide", () => {
  it("divides two positive numbers", () => {
    expect(divide(6, 3)).toBe(2);
  });

  it("throws TypeError when an argument is missing (undefined)", () => {
    expect(() => divide(6)).toThrow(TypeError);
  });

  it("throws TypeError when inputs are not numbers", () => {
    expect(() => divide("6", 3)).toThrow(TypeError);
  });

  it("throws TypeError when inputs are NaN", () => {
    expect(() => divide(NaN, 3)).toThrow(TypeError);
  });

  it("throws RangeError when dividing by zero", () => {
    expect(() => divide(6, 0)).toThrow(RangeError);
  });
});
