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
  const calcIncludesAddOrSubtract = calcState.includes("-") || calcState.includes("+");
  const operatorObj = {};
  const isOperator = operatorChars.includes(value);
  const lastOpIndex = Math.max(...operatorValues.map(char => calcState.lastIndexOf(char)));
  const lastNumAdded = (calcState.substring(lastOpIndex + 1, calcState.length));
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
              let negValue;
              let pos;
              if (displayState < 0) {
                negValue = lastNumAdded.toString();
                pos = lastOpIndex;
              } else {
                negValue = (-lastNumAdded).toString();
                pos = lastOpIndex + 1;
              }
              setCalcState(calcState.substring(0, pos) + negValue);
              setDisplayState(negValue);
            } else {
              setNewNumberInputReady(true)
            }
          }
          break;
          // The percentage function
        case '%':
          if (displayState !== '0') {
            if (!isNaN(lastCalcChar)) {
              let percentValue;
              let percentPos;
              if (displayState < 0) {
                percentValue = (-lastNumAdded * 0.01).toString();
                percentPos = lastOpIndex;
              } else {
                percentValue = (lastNumAdded * 0.01).toString();
                percentPos = lastOpIndex + 1;
              }
              setDisplayState(percentValue);
              setCalcState(calcState.substring(0, percentPos) + percentValue);
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
        // Else it's an operator
        // We are actively preventing consecutive operators
        default:
          if (calcState !== '' && lastCalcChar !== '.') {
            // Put current expression in parenthesis if current operator is * or /
            // We DON'T want to follow order of operations
            let newCalcState;
            if (!operatorValues.includes(lastCalcChar)) {
              const calcStateBeforeLastOp = calcState.substring(0, calcState.length);
              switch (operatorObj[value]) {
                case '*': case '/':
                  newCalcState = calcIncludesAddOrSubtract ? `(${calcStateBeforeLastOp})` : calcState;
                  break
                default:
                  newCalcState = calcState;
              }
            } else {
              newCalcState = calcState;
            }

            // If the last char is already an operator, replace it with current clicked button's value
            if (!operatorValues.includes(lastCalcChar)) {
              setCalcState(newCalcState + operatorObj[value]);
            } else {
              setCalcState(newCalcState.substring(0, newCalcState.length - 1) + operatorObj[value]);
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