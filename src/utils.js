import {operators} from "./data";
import * as math from 'mathjs';

/*
* Calculate the result of a computation in a calculator
* @param {number} number: The number to insert
* returns: none
*/
const handleClick = (event, setCalcState, calcState, setDisplayState, displayState) => {
   /* We need to validate number before updating calcState
      in order to prevent append or eval issues */
   const value = event.target.textContent;
   const lastChar = calcState.split('')[calcState.length - 1];
   const operatorChars = operators.map(operator => operator.char);
   const operatorValues = operators.map(operator => operator.value);
   const operatorObj = {};
   operatorChars.forEach((key, i) => operatorObj[key] = operatorValues[i]);
   // const numbersIncalcState = calcState.split('').filter(char => numbers.includes(char))
   // const operatorsIncalcState = calcState.split('').filter(char => operators.includes(char))

   switch (isNaN(value)) {
   // If number is a special operator, it is NaN
    case true:
    /* If the last char is not NaN, then append the
       period, special or operator.*/
  
      // The clear function
      if (value.toUpperCase() === 'C') {
        setCalcState('');
        setDisplayState('0');
        // The change sign function
      } else if (value === '+/-') {
        const match = (/(\d+)(?!.*\d)/.exec(calcState));
        const lastNum = match[0];
        const lastNumPos = match.index;
        const negResult = (-lastNum).toString();
        if (!isNaN(negResult)) {
          const newString = calcState.substring(0, lastNumPos) + negResult;
          setCalcState(newString);
          if (displayState !== '0') {
            const result = math.evaluate(newString);
            setDisplayState(result.toString());
          }
        }
        // The equals function
      } else if (value === '=') {
        if (!isNaN(lastChar)) {
          const result = math.evaluate(calcState);
          setDisplayState(result.toString());
          setCalcState(result.toString());
        }
        // Prevent multiple decimal points
      } else if (value === '.') {
        const decimals = (calcState.match(/\./g) || []).length;
        if (!isNaN(lastChar) && !decimals) {
            setCalcState(calcState + value);
        }
      // Prevent consecutive operators
      } else if (operatorValues.includes(operatorObj[value])) {
        if (!operatorValues.includes(lastChar)) {
          setCalcState(calcState + operatorObj[value]);
        } else {
          setCalcState(calcState.substring(0, calcState.length - 1) + operatorObj[value]);
        }
      }
      break;
    // Otherwise, it is a number
    case false:
    // If calcState is 0, return number, else append number
      if (calcState === '0') {
          setCalcState(value);
          const result = math.evaluate(value);
          setDisplayState(result.toString());
      } else {
          setCalcState(calcState + value);
          const result = math.evaluate(calcState + value);
          setDisplayState(result.toString());
      }
      break;
    default:
        // Do nothing
    }
}

export default handleClick;