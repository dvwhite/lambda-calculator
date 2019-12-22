import { operators } from "./data";

/*
* Calculate the result of a computation in a calculator
* @param {number} number: The number to insert
* returns: none
*/
const handleClick = (event, cb, state) => {
   /* We need to validate number before updating state
   *  in order to prevent append or eval issues */
   const value = event.target.textContent;

   switch (isNaN(value)) {
   // If number is a special operator, it is NaN
    case true:
    /* If the last char is not Nan, then append the
    *  period, special or operator.
    *  _Note_: the numbers read from right to left in
    *  the display panel of the calculator! */
      const lastChar = state.split('')[0];
      const operatorChars = operators.map(operator => operator.char);
      if (value === 'C') {
        cb('0');
      } else if (value === '.') {
        const decimals = (state.match(/\./g) || []).length;
        if (!isNaN(lastChar) && !decimals) {
            cb(state + value);
        }
      // Prevent consecutive operators
      } else if (operatorChars.includes(value)) {

        if (!operators.includes(lastChar)) {
          cb(state + value);
        }
      }
      break;
    // Otherwise, it is a number
    case false:
    // If state is 0, return number, else append number
      if (state === '0') {
          cb(value);
      } else {
          cb(state + value);
      }
      break;
    default:
        // Do nothing
    }
}

export default handleClick;