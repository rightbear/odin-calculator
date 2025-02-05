//calculation algorthm of operator
function operate(num1, num2, operator) {
  switch (operator) {
    case '+':
      return add(num1, num2);
    case '-':
      return substract(num1, num2);
    case '×':
      return multiply(num1, num2);
    case '÷':
      return divide(num1, num2);
    default:
      return 'Invalid operator';
  }
}

function add(num1, num2){
  return (num1 * (10**13) + num2 * (10**13)) / (10**13);
}

function substract(num1, num2){
  return (num1 * (10**13) - num2 * (10**13)) / (10**13);
}

function multiply(num1, num2){
  return ((num1 * (10**13)) * (num2 * (10**13))) / (10**26);
}

function divide(num1, num2){
  return ((num1 * (10**13)) / (num2 * (10**13)));
}

// Round the resut of operation
function preciseRound(number, decimalPlaces) {
  const factor = 10 ** decimalPlaces;
  return Number(Math.round((number + Number.EPSILON) * factor) / factor);
}

//process input format of digits on screen before start calculation
function modifyInputStringNum(StringNum) {
  let displayStringNum = StringNum;

  if(displayStringNum.includes('.')){
    if(displayStringNum.length >= 14){
      // if the float dot in StringNum is in the middle of screen, keep it
      // the length of digit on screen will be 14
      if(displayStringNum.indexOf('.') < 13){
        displayStringNum = displayStringNum.substring(0, 14);
      }
      // if the float dot in StringNum is in the tail of screen, discard it
      // the length of digit on screen will be 13
      else{
        displayStringNum = displayStringNum.substring(0, 13);
      }
    }
  }
  else{
    if(displayStringNum.length >= 13){
      displayStringNum = displayStringNum.substring(0, 13);
    }
  }

  return displayStringNum;
}

//process output format of digits on screen after receive calculation result
function modifyOutputStringNum(result) {
  displayNum = result;
  displayStringNum = String(result);

  if(displayStringNum.includes('.')){
    // if the float dot in reslt is in the middle of screen, keep it
    // the length of digit on screen will be 14
    if(displayStringNum.length >= 14){
      displayNum = preciseRound(displayNum, 14);
      displayStringNum = String(displayNum);
      displayStringNum = displayStringNum.substring(0, 14);
    }
    // if the float dot in result is in the tail of screen, discard it
    // the length of digit on screen will be 13
    else{
      displayNum = preciseRound(displayNum, displayStringNum.length);
      displayStringNum = String(displayNum);
    }
  }
  else{
    if(displayStringNum.length >= 13){
      displayStringNum = displayStringNum.substring(0, 13);
    }
  }

  return displayStringNum;
}

const calculatorScreen = document.querySelector(".screen");

// judge wether the input of digits in new calculation is start
let inputStart = false;

// judge wether the previous calculation is finished
let calculateResult = true;

// judge wether the new operand in new calculation is asigned
let asignNewOperand = false;

let result = 0, newOperand = 0, operator='+';
let indexOfTen = 0, StringNum = '0', displayStringNum='0';

const numberButtons = document.querySelectorAll(".num");
const dotButtons = document.querySelector("#number-dot");
const symbolButtons = document.querySelector("#number-symbol");
const binaryOpButtons = document.querySelectorAll(".binary");
const equalOpButtons = document.querySelector("#operator-equal");
const clearOpButtons = document.querySelector("#operator-clear");

function Calculation(){

  // behaviour of number buttons
  numberButtons.forEach((number) => {
    number.addEventListener('click', event => {
      let inputStringNum = number.textContent;

      // there is no previously input number or the number displayed is previous calculation result
      // the newly input number should substitued the number displayed
      if (inputStart == false || calculateResult == true) {

        // clear previous calculation result, maybe fault
        if(calculateResult == true){
          result = 0;
          newOperand = 0;
          operator = '+';
        }

        // if the newly input number is 0, the input is stil invalid
        if(calculateResult == true && inputStringNum != '0' ){
          inputStart = true;
          calculateResult = false;
        }

        //update number on screen
        StringNum = inputStringNum;
        //update number in operand
        newOperand = Number(inputStringNum);
      }
      // the newly input number should concatenated on the previously input number
      else{
        //update number in string format
        StringNum += inputStringNum;

        //update number in operand
        
        // when the number is float number
        if(indexOfTen < 0){
          // the number is positive or 0
          if(!StringNum.includes('-')){
            newOperand = newOperand + Number(inputStringNum) * (10 ** indexOfTen);
          }
          // the number is negative or 0
          else{
            newOperand = newOperand - Number(inputStringNum) * (10 ** indexOfTen);
          }
          indexOfTen -= 1;
        }
        // when the number is int number
        else{
          // the number is positive or 0
          if(!StringNum.includes('-')){
            newOperand = newOperand * 10 + Number(inputStringNum);
          }
          // the number is negative or 0
          else{
            newOperand = newOperand * 10 - Number(inputStringNum);
          }
        }
      }

      // modify format of number in string format, and display the number on screen
      displayStringNum = modifyInputStringNum(StringNum);
      asignNewOperand = true;
      calculatorScreen.textContent = displayStringNum;
    })
  })

  // behaviour of float number dot button
  dotButtons.addEventListener('click', event => {

    // if the input number need a new float dot, then concatenate it
    if(StringNum != 'NaN'){
      if(!StringNum.includes('.')){
        StringNum += '.';
        inputStart = true;
        indexOfTen = -1;
      }
    }

    // if there is no previously input number or the number displayed is previous calculation result
    // click the button will get "0.", and a new calculation will be start
    if(calculateResult == true){
      StringNum = '0.';
      // clear previous calculation result, maybe fault
      result = 0;
      newOperand = 0;
      operator = '+';
      inputStart = true;
      calculateResult = false;

      indexOfTen = -1;
    }

    displayStringNum = modifyInputStringNum(StringNum);
    asignNewOperand = true;
    calculatorScreen.textContent = displayStringNum;
  })

  // behaviour of number symbol button
  symbolButtons.addEventListener('click', event => {
    // if number displayed is NaN, the symbol of number won't be modified
    if(StringNum != 'NaN'){
      if(newOperand > 0){
        StringNum = '-' + StringNum;
      }
      else if(newOperand < 0){
        StringNum = StringNum.replace('-', '');
      }
      //situation when newOperand is 0
      else{
        if(inputStart == true){
          if(!StringNum.includes('-')){
            StringNum = '-' + StringNum;
          }
          else{
            StringNum = StringNum.replace('-', '');
          }
        }
      }

      newOperand = -newOperand;
    }
    
    // the situation of clicking equal operator before symbol operator
    // or the situation of clicking digit buttons before symbol operator.
    // click the button will clear previous calculation result
    // the new operand will be (-1)×(previous calculation result), and a new calculation will be start
    if(calculateResult == true){
      result = 0;
      operator = '+';
      calculateResult = false;
    }

    displayStringNum = modifyInputStringNum(StringNum);
    asignNewOperand = true;
    calculatorScreen.textContent = displayStringNum;
  })

  // behaviour of calculation operator buttons
  binaryOpButtons.forEach((operatorButton) => {
    operatorButton.addEventListener('click', event => {
      let oldOperator = operator;
      let newOperator = operatorButton.textContent;

      if(asignNewOperand){
        if(result != NaN){

          //if devided by zero in calculation, the result will be NaN
          if(oldOperator == '÷' && newOperand == 0){
            result = NaN;
            StringNum = 'NaN';
            displayStringNum= 'NaN';
          }
          else{
            //if no operand is NaN, do the calculation
            result = operate(result, newOperand, oldOperator);
            newOperand = result;
            StringNum = String(result);
            displayStringNum = modifyOutputStringNum(result)
          }
        }
        else{
          StringNum = 'NaN';
          displayStringNum = 'NaN';
        }
      }
      
      indexOfTen = 0;
      asignNewOperand = false;
      inputStart = false;
      // continue the current calculation
      calculateResult = false;
      operator = newOperator;
      calculatorScreen.textContent = displayStringNum;
    })
  })

  // behaviour of calculation equal button
  equalOpButtons.addEventListener('click', event => {
    if(asignNewOperand){
      if(result != NaN){

        //if devided by zero in calculation, the result will be NaN
        if(operator == '÷' && newOperand == 0){
          result = NaN;
          StringNum = 'NaN';
          displayStringNum= 'NaN';
        }
        else{
          //if no operand is NaN, do the calculation
          result = operate(result, newOperand, operator);
          newOperand = result;
          StringNum = String(result);
          displayStringNum = modifyOutputStringNum(result)
        }
      }
      else{
        StringNum = 'NaN';
        displayStringNum = 'NaN';
      }
    }

    indexOfTen = 0;
    asignNewOperand = false;
    inputStart = false;
    // start a new calculation
    calculateResult = true;
    calculatorScreen.textContent = displayStringNum;
  })

  // behaviour of automatically clear button
  clearOpButtons.addEventListener('click', event => {
    let displayStringNum = calculatorScreen.textContent;

    // reset all parameters
    inputStart = false;
    calculateResult = true;
    asignNewOperand = false;
    displayStringNum = '0';
    newOperand = 0;
    StringNum = '0';
    indexOfTen = 0;
    result = 0;
    operator = '+';
    calculatorScreen.textContent = displayStringNum;
  })
}

Calculation()
