import {operators} from "./data";
import * as math from 'mathjs';

/*
* Calculate the result of a computation in a calculator
* @param {number} number: The number to insert
* returns: none
*/
const handleClick = (event, setCalcState, calcState, setDisplayState, 
                     displayState, newNumberInputReady, setNewNumberInputReady) => {
   /* We need to validate number before updating calcState
      in order to prevent append or eval issues */
  const value = event.target.textContent;
  const lastCalcChar = calcState.split('')[calcState.length - 1];
  const lastDisplayChar = displayState.split('')[displayState.length - 1];
  const operatorChars = operators.map(operator => operator.char);
  const operatorValues = operators.map(operator => operator.value);
  const operatorObj = {};
  const isOperator = operatorChars.includes(value);
  const lastOpIndex = Math.max(...operatorValues.map(char => calcState.lastIndexOf(char)));
  const lastNumAdded = (calcState.substring(lastOpIndex + 1, calcState.length))
  operatorChars.forEach((key, i) => operatorObj[key] = operatorValues[i]);

  switch (isNaN(value)) {
  // If number is a period, a special character, or an operator, it is NaN
    case true:
    /* If the last char is not NaN, then append the
        period, special or operator.*/
      switch(value) {
        // The clear function
        case 'C': 
          setCalcState('');
          setDisplayState('0');
          setNewNumberInputReady(false)
          break;
          // The change sign function
        case '+/-':
          if (displayState !== '0') {
            if (!isNaN(lastCalcChar)) {
              const negValue = (-lastNumAdded).toString();
              setDisplayState(negValue);
              setCalcState(calcState.substring(0, lastOpIndex + 1) + negValue);
            } else {
              setNewNumberInputReady(true)
            }
          }
          break;
          // The percentage function
        case '%':
          if (displayState !== '0') {
            if (!isNaN(lastCalcChar)) {
              const percentValue = (lastNumAdded * 0.01).toString();
              setDisplayState(percentValue);
              setCalcState(calcState.substring(0, lastOpIndex + 1) + percentValue);
            } else {
              setNewNumberInputReady(true)
            }
          }
          break;
          // The equals function
        case '=':
          if (!isNaN(lastCalcChar)) {
            const result = math.evaluate(calcState);
            setDisplayState(result.toString());
            setCalcState(result.toString());
          }
          break;
          // Prevent multiple decimal points
        case '.':
          const decimals = (displayState.match(/\./g) || []).length;
          if (!isNaN(lastDisplayChar) && !(operatorValues.includes(lastCalcChar)) && !decimals) {
            if (calcState !== '') {
              setCalcState(calcState + value);
              setDisplayState(displayState + value);
            } else {
              setCalcState(displayState + value);
              setDisplayState(displayState + value);
            }
          }
          break;
        // Prevent consecutive operators
        default:
          if (calcState !== '' && lastCalcChar !== '.') {
            if (!operatorValues.includes(lastCalcChar)) {
              setCalcState(calcState + operatorObj[value]);
            } else {
              setCalcState(calcState.substring(0, calcState.length - 1) + operatorObj[value]);
            }
          }
        }
        break;
    // Otherwise, it is a number
    case false:
      // If calcState is 0, return number, else append number
      if (calcState === '0' || calcState === '') {
          setCalcState(value);
      } else {
        setCalcState(calcState + value);
      }
      // If displayState is 0, return number, else append number
      if (displayState === '0') {
        setDisplayState(value);
      } else {
        if (newNumberInputReady) {
          setDisplayState(value);
        } else {
          setDisplayState(displayState + value)
        }
      }
      if (value !== '.') setNewNumberInputReady(false); // otherwise resets to false
      break;
    default:
        // Do nothing
    }

  if (isOperator) {
    setNewNumberInputReady(true); // set this to true every time an operator is clicked
  }
}

export default handleClick;