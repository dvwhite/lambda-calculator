import {operators} from "./data";
import * as math from 'mathjs';

/*
* Calculate the result of a computation in a calculator
* @param {number} number: The number to insert
* returns: none
*/
const handleClick = (event, cb, state) => {
   /* We need to validate number before updating state
      in order to prevent append or eval issues */
   const value = event.target.textContent;

   switch (isNaN(value)) {
   // If number is a special operator, it is NaN
    case true:
    /* If the last char is not Nan, then append the
       period, special or operator.
       _Note_: the numbers read from right to left in
       the display panel of the calculator!*/
      const lastChar = state.split('')[state.length - 1];
      const operatorChars = operators.map(operator => operator.char);
      const operatorValues = operators.map(operator => operator.value);
      const operatorObj = {};
      operatorChars.forEach((key, i) => operatorObj[key] = operatorValues[i]);
  
      if (value.toUpperCase() === 'C') {
        cb('0');
      } else if (value === '=') {
        // TODO: computation function here
        if (!isNaN(lastChar)) {
          const result = math.evaluate(state);
          cb(result.toString());
        }
      } else if (value === '.') {
        const decimals = (state.match(/\./g) || []).length;
        if (!isNaN(lastChar) && !decimals) {
            cb(state + value);
        }
      // Prevent consecutive operators
      } else if (operatorValues.includes(operatorObj[value])) {
        if (!operatorValues.includes(lastChar)) {
          cb(state + operatorObj[value]);
        } else {
          cb(state.substring(0, state.length - 1) + operatorObj[value]);
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