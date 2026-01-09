export function add(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("add expects two numbers");
  }
  return a + b;
}

export function divide(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new TypeError("Both arguments must be numbers");
  }
  if (Number.isNaN(a) || Number.isNaN(b)) {
    throw new TypeError("Arguments cannot be NaN");
  }
  if (b === 0) {
    throw new RangeError("Division by zero is not allowed");
  }
  return a / b;
}
