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

function preciseRound(number, decimalPlaces) {
  const factor = 10 ** decimalPlaces;
  return Number(Math.round((number + Number.EPSILON) * factor) / factor);
}

function modifyInputStringNum(StringNum) {
  let displayStringNum = StringNum;

  if(displayStringNum.includes('.')){
    if(displayStringNum.length >= 14){
      if(displayStringNum.indexOf('.') < 13){
        displayStringNum = displayStringNum.substring(0, 14);
      }
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

  console.log(StringNum);
  console.log(displayStringNum);

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
let indexOfTen = 0, StringNum = '0';

const numberButtons = document.querySelectorAll(".num");
const dotButtons = document.querySelector("#number-dot");
const symbolButtons = document.querySelector("#number-symbol");
const binaryOpButtons = document.querySelectorAll(".binary");
const equalOpButtons = document.querySelector("#operator-equal");
const clearOpButtons = document.querySelector("#operator-clear");

function Calculation(){

  numberButtons.forEach((number) => {
    number.addEventListener('click', event => {
      let inputStringNum = number.textContent;

      // there is no previously input number or the number displayed is calculation result
      // the newly input number should substitued the number displayed
      if (inputStart == false || calculateResult == true) {

        // clear previous calculation result, maybe fault
        if(calculateResult == true){
          result = 0;
          newOperand = 0;
          operator = '+';
        }

        // if the newly input number is 0, the input is still invalid
        if(inputStringNum != '0' ){
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
        //update number on screen
        StringNum += inputStringNum;

        //update number in operand
        if(indexOfTen < 0){
          if(newOperand >= 0){
            newOperand = newOperand + Number(inputStringNum) * (10 ** indexOfTen);
          }
          else{
            newOperand = newOperand - Number(inputStringNum) * (10 ** indexOfTen);
          }
          indexOfTen -= 1;
        }
        else{
          if(newOperand >= 0){
            newOperand = newOperand * 10 + Number(inputStringNum);
          }
          else{
            newOperand = newOperand * 10 - Number(inputStringNum);
          }
        }
      }

      asignNewOperand = true;
      calculatorScreen.textContent = modifyInputStringNum(StringNum);
    })
  })

  dotButtons.addEventListener('click', event => {
    // there is no previously input number or the number displayed is calculation result
    // the newly input number should substitued the number displayed
    if(!StringNum.includes('.') && !String(newOperand).includes('.')){
      StringNum += '.';

      indexOfTen = -1;
    }

    if(calculateResult == true){
      StringNum = '0.';
      // clear previous calculation result, maybe fault
      result = 0;
      newOperand = 0;
      operator = '+';
      calculateResult = false;

      indexOfTen = -1;
      console.clear()
    }

    if(inputStart == false){
      inputStart = true;
    }

    asignNewOperand = true;
    calculatorScreen.textContent = modifyInputStringNum(StringNum);
  })

  symbolButtons.addEventListener('click', event => {
    let oldResult;

    // if number displayed is NaN, the symbol of number won't be modified
    if(StringNum != 'NaN'){
      if(newOperand == 0){
        StringNum = '0';
      }
      else if(newOperand > 0){
        StringNum = '-' + StringNum;
      }
      else{
        StringNum = StringNum.replace('-', '');
      }

      newOperand = -newOperand;
    }
    
    // the situation of clicking equal operator before symbol operator,
    // or the situation of clicking digit buttons before symbol operator
    // clear previous calculation result
    if(calculateResult == true){
      // clear previous calculation result, maybe fault
      result = 0;
      operator = '+';
      calculateResult = false;
    }

    asignNewOperand = true;
    calculatorScreen.textContent = modifyInputStringNum(StringNum);
  })

  binaryOpButtons.forEach((operatorButton) => {
    operatorButton.addEventListener('click', event => {
      let oldOperator = operator;
      let newOperator = operatorButton.textContent;

      if(asignNewOperand){
        if(result != 'NaN'){
          if(oldOperator == '÷' && newOperand == 0){
            result = 'NaN';
            StringNum = 'NaN';
          }
          else{
            result = operate(result, newOperand, oldOperator);
            newOperand = result;

            ///processing format of calculation result
            displayNum = result;
            displayStringNum = String(result);

            /*
            if(displayStringNum.include('.')){

            }
            else{
              if(displayStringNum.length > 13)
              displayStringNum = displayStringNum.substr(0, 13);
            }
              */
            ///
            
            StringNum = displayStringNum
          }
        }
        else{
          StringNum = 'NaN';
        }
      }
      
      indexOfTen = 0;
      asignNewOperand = false;
      inputStart = false;
      calculateResult = false;
      operator = newOperator;
      calculatorScreen.textContent = StringNum;
    })
  })

  equalOpButtons.addEventListener('click', event => {
    if(asignNewOperand){
      if(result != 'NaN'){
        if(operator == '÷' && newOperand == 0){
          result = 'NaN';
          StringNum = 'NaN';
        }
        else{
          result = operate(result, newOperand, operator);
          newOperand = result;

          ///processing format of calculation result
          displayNum = result;
          displayStringNum = String(result);
          ///

          StringNum = displayStringNum
        }
      }
      else{
        StringNum = 'NaN';
      }
    }

    indexOfTen = 0;
    asignNewOperand = false;
    inputStart = false;
    calculateResult = true;
    calculatorScreen.textContent = StringNum;
  })

  clearOpButtons.addEventListener('click', event => {
    let displayStringNum = calculatorScreen.textContent;
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
