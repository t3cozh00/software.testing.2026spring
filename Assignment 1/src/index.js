import { add } from "./calculator.js";
import { divide } from "./calculator.js";

const addResult = add(2, 3);
console.log(`2 + 3 = ${addResult}`);

let divideResult = divide(2, 1);
console.log(divideResult);

console.log(typeof NaN);
