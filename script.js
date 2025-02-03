function operate(num1, num2, operator) {
  switch (operator) {
    case '+':
      return add(num1, num2);
    case '-':
      return substract(num1, num2);
    case '*':
      return multiply(num1, num2);
    case '/':
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

//judge wether the input of digits is start
let inputStart = false;

//judge wether the calculation is finished
let calculateResult = false;

let operand1 = 0, operand2 = 0, operator='';

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
        }
        calculateResult = false;

        displayStringNum = inputStringNum;
      }
      // the newly input number should concatenated on the previously input number
      else{
        displayStringNum += inputStringNum;
      }

      calculatorScreen.textContent = displayStringNum;
    })
  })

  dotButtons.addEventListener('click', event => {
    let displayStringNum = calculatorScreen.textContent;

    // there is no previously input number or the number displayed is calculation result
    // the newly input number should substitued the number displayed
    if(!inputStart){
      inputStart = true;
    }
    if(calculateResult){
      displayStringNum = '0.';
      calculateResult = false;
    }

    if(!displayStringNum.includes('.')){
      displayStringNum += '.';
    }

    calculatorScreen.textContent = displayStringNum;
  })

  symbolButtons.addEventListener('click', event => {
    let displayStringNum = calculatorScreen.textContent;

    // if number displayed is NaN, the symbol of number won't be modified
    if(displayStringNum != NaN){
      let displayNumber = Number(displayStringNum);
      displayNumber = -displayNumber;
      displayStringNum = String(displayNumber);
      
      if(displayNumber == 0){
        inputStart = false;
        calculateResult = false;
      }
    }
    calculatorScreen.textContent = displayStringNum;
  })

  clearOpButtons.addEventListener('click', event => {
    let displayStringNum = calculatorScreen.textContent;
    inputStart = false;
    calculateResult = false;
    displayStringNum = '0';
    calculatorScreen.textContent = displayStringNum;
  })
}

Calculation()
