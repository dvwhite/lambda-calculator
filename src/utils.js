/*
* Calculate the result of a computation in a calculator
* @param {number} number: The number to insert
* returns: none
*/
const handleNumbers = function(value, cb, state) {
   /* We need to validate number before updating state
   *  in order to prevent append or eval issues */
   switch (isNaN(value)) {
   // If number is a special operator, it is NaN
    case true:
    /* If the last char is not Nan, then append the
    *  special operator.
    *  _Note_: the numbers read from right to left in
    *  the display panel of the calculator! */
        const lastChar = state.split('')[0];
        const decimals = (state.match(/\./g) || []).length;
        if (!isNaN(lastChar) && !decimals) {
            cb(state + value);
        }
        break;
    // Otherwise, it is a number
    case false:
    // If state is 0, return number, else append number
        if (state < 1) {
            cb(value);
        } else {
            cb(state + value);
        }
        break;
    }
}

// Clears the calculator
const clear = cb => cb(0);

export {handleNumbers, clear};