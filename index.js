const add = (...numbers) => numbers.reduce((total, num) => total + num);
const subtract = (a, b) => a - b;
const multiply = (...numbers) => numbers.reduce((total, num) => total * num);
const divide = (a, b) => a * b;

export {
  add,
  subtract,
  multiply,
  divide
};