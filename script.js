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
  return num1 + num2;
}

function substract(num1, num2){
  return num1 - num2;
}

function multiply(num1, num2){
  return num1 * num2;
}

function divide(num1, num2){
  return num1 / num2;
}

const calculatorScreen = document.querySelector(".screen");

//judge wether the input of digits in calculation is start
let inputStart = false;

//judge wether the calculation is finished
let calculateResult = true;

//judge wether the new perand in calculation is asigned
let asignNewOperand = false;

let result = 0, newOperand = 0, operator='+';

const numberButtons = document.querySelectorAll(".num");
const dotButtons = document.querySelector("#number-dot");
const symbolButtons = document.querySelector("#number-symbol");
const binaryOpButtons = document.querySelectorAll(".binary");
const equalOpButtons = document.querySelector("#operator-equal");
const clearOpButtons = document.querySelector("#operator-clear");

function Calculation(){

  numberButtons.forEach((number) => {
    number.addEventListener('click', event => {
      let displayStringNum = calculatorScreen.textContent;
      let inputStringNum = number.textContent;

      // there is no previously input number or the number displayed is calculation result
      // the newly input number should substitued the number displayed
      if (inputStart == false || calculateResult == true) {

        // if the newly input number is 0, the input is still invalid
        if(inputStringNum != '0' ){
          inputStart = true;
          calculateResult = false;
        }

        // clear previous calculation result, maybe fault
        if(calculateResult == true){
          result = 0;
        }

        displayStringNum = inputStringNum;
      }
      // the newly input number should concatenated on the previously input number
      else{
        displayStringNum += inputStringNum;
      }

      newOperand = Number(displayStringNum);
      asignNewOperand = true;
      calculatorScreen.textContent = displayStringNum;
    })
  })

  dotButtons.addEventListener('click', event => {
    let displayStringNum = calculatorScreen.textContent;

    // there is no previously input number or the number displayed is calculation result
    // the newly input number should substitued the number displayed
    if(!displayStringNum.includes('.')){
      if(inputStart == false){
        inputStart = true;
      }
      displayStringNum += '.';
    }

    if(calculateResult == true){
      displayStringNum = '0.';
      // clear previous calculation result, maybe fault
      result = 0;
      calculateResult = false;
    }

    newOperand = Number(displayStringNum);
    asignNewOperand = true;
    calculatorScreen.textContent = displayStringNum;
  })

  symbolButtons.addEventListener('click', event => {
    let displayStringNum = calculatorScreen.textContent;
    let oldResult;
    // if number displayed is NaN, the symbol of number won't be modified
    if(displayStringNum != 'NaN'){
      let displayNumber = Number(displayStringNum);
      oldResult = displayNumber;
      displayNumber = -displayNumber;
      displayStringNum = String(displayNumber);
    }

    newOperand = Number(displayStringNum);

    // the situation of clicking binary operator before symbol operator
    // keep previous calculation result
    if(inputStart == false){
      result = oldResult;
    }
    // the situation of clicking equal operator before symbol operator
    // clear previous calculation result
    if(calculateResult == true){
      result = 0;
    }
    operator = '+';
    asignNewOperand = true;
    calculatorScreen.textContent = displayStringNum;
  })

  binaryOpButtons.forEach((operatorButton) => {
    operatorButton.addEventListener('click', event => {
      let displayStringNum = calculatorScreen.textContent;
      let oldOperator = operator;
      let newOperator = operatorButton.textContent;

      if(asignNewOperand){
        if(result != 'NaN'){
          if(oldOperator == '÷' && newOperand == 0){
            result = 'NaN';
            displayStringNum = 'NaN';
          }
          else{
            result = operate(result, newOperand, oldOperator);
            asignNewOperand = false;
            displayStringNum = String(result);
          }
        }
        else{
          displayStringNum = 'NaN';
        }
      }

      inputStart = false;
      operator = newOperator;
      calculatorScreen.textContent = displayStringNum;
    })
  })

  equalOpButtons.addEventListener('click', event => {
    let displayStringNum = calculatorScreen.textContent;
    
    if(result != 'NaN'){
      if(operator == '÷' && newOperand == 0){
        result = 'NaN';
        displayStringNum = 'NaN';
      }
      else{
        result = operate(result, newOperand, operator);
        asignNewOperand = false;
        displayStringNum = String(result);
      }
    }
    else{
      displayStringNum = 'NaN';
    }

    calculateResult = true;
    calculatorScreen.textContent = displayStringNum;
  })

  clearOpButtons.addEventListener('click', event => {
    let displayStringNum = calculatorScreen.textContent;
    inputStart = false;
    calculateResult = true;
    asignNewOperand = false;
    displayStringNum = '0';
    newOperand = 0;
    result = 0;
    operator = '+';
    calculatorScreen.textContent = displayStringNum;
  })
}

Calculation()
