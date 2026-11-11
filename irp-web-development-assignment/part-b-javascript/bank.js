"use strict"; // Strict mode turns silent mistakes (like undeclared variables) into errors.

// =====================================================
// PART 1: Types & Coercion
// =====================================================

// "5" + 2 gives "52": with +, if either side is a string, JS concatenates
// instead of adding, so the number 2 is converted to "2".
// "5" - 2 gives 3: there is no string version of -, so JS converts "5" to a number.
// typeof null === "object" is a historical bug in JS that was never fixed for
// compatibility reasons; null is a primitive, not an object.

function parseAmount(input) {
  // null/undefined must be rejected first, because Number(null) is 0.
  if (input === null || input === undefined) {
    throw new Error("Amount is required.");
  }

  // Only strings and numbers are acceptable input types.
  if (typeof input !== "string" && typeof input !== "number") {
    throw new Error("Invalid type: amount must be a string or a number, got " + typeof input + ".");
  }

  let value = input;

  if (typeof value === "string") {
    // trim() removes outer spaces so " 250 " becomes "250".
    value = value.trim();

    // Number("") is 0, so an empty string must be caught before converting.
    if (value === "") {
      throw new Error("Amount cannot be empty.");
    }
  }

  // Explicit conversion; invalid text like "abc" or "12.5.3" becomes NaN.
  const amount = Number(value);

  // NaN is never equal to itself, so Number.isNaN is the reliable check.
  if (Number.isNaN(amount)) {
    throw new Error("Amount is not a valid number: " + JSON.stringify(input));
  }

  // A deposit must be greater than zero.
  if (amount <= 0) {
    throw new Error("Amount must be greater than zero.");
  }

  return amount;
}

// Tests: parseAmount never logs; the try/catch decides what to print.
console.log("--- PART 1 TESTS: parseAmount ---");
const testInputs = ["500", " 250 ", "", "abc", null, undefined, "12.5.3"];

for (const input of testInputs) {
  try {
    const result = parseAmount(input);
    console.log("Input " + JSON.stringify(input) + " -> returned " + result);
  } catch (error) {
    console.log("Input " + String(input === undefined ? "undefined" : JSON.stringify(input)) + " -> Error: " + error.message);
  }
}

// =====================================================
// PART 2: Scoping & Hoisting
// =====================================================

// ---- Step 1: Main Declarations ----
// const for the bank name: it never changes, and const blocks accidental reassignment.
// let for the counter: its value must change as transactions happen.
const BANK_NAME = "JS National Bank";
let transactionCounter = 0;
transactionCounter++; // allowed with let
console.log("\n--- PART 2: Declarations ---");
console.log(BANK_NAME + " | transactions: " + transactionCounter);
try {
  BANK_NAME = "Hacked Bank"; // const cannot be reassigned
} catch (error) {
  console.log("Reassigning const failed: " + error.name + " - " + error.message);
}

// ---- Step 2: HOISTING DEMO ----
// JS first creates the execution context (memory phase): var gets undefined,
// let/const are reserved but uninitialised, function declarations are stored fully.
// Then the execution phase runs the code line by line.
console.log("\n--- HOISTING DEMO ---");

// var: hoisted and initialised to undefined.
console.log("var before declaration:", hoistedVar);
var hoistedVar = "I am var";

// let: hoisted but in the Temporal Dead Zone until its declaration line runs.
try {
  console.log(hoistedLet);
} catch (error) {
  console.log("let before declaration -> " + error.name + ": " + error.message);
}
let hoistedLet = "I am let";

// Function declaration: fully hoisted, so calling it early works.
announce();
function announce() {
  console.log("Function declaration: announce() works before its definition.");
}

// Function expression stored in var: only the variable name is hoisted (as undefined),
// so calling it early fails with a TypeError.
try {
  notify();
} catch (error) {
  console.log("Function expression before definition -> " + error.name + ": " + error.message);
}
var notify = function () {
  console.log("notify() called");
};

// ---- Step 3: The Asynchronous Loop Bug ----
// var is function/global scoped, so all callbacks share one i. By the time the
// timers fire the loop has finished and i is 3. let creates a new binding per
// iteration, so each callback keeps its own i (0, 1, 2).
console.log("\n--- ASYNC LOOP BUG (output appears after timers) ---");

for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log("var loop:", i); // prints 3, 3, 3
  }, 0);
}

for (let j = 0; j < 3; j++) {
  setTimeout(function () {
    console.log("let loop:", j); // prints 0, 1, 2
  }, 0);
}
