/*
* Calculate the result of a computation in a calculator
* @param {number} number: The number to insert
* returns: none
*/
const calc = function(number, cb, state) {
    if (state < 1) {
      cb(number);
    } else {
      cb(state + number);
    }
  }

  export default calc;