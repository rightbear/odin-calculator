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

let calculateStart = true;
let calculateResult = false;
const numberButtons = document.querySelectorAll(".num");
const calculatorScreen = document.querySelector(".screen");

function displayNumber(numberButtons){
  
  numberButtons.forEach((number) => {
    number.addEventListener('click', function displayNumber(event){

      // if there is old squares in container of grid, remove all squares.
      if (calculateStart || calculateResult) {
        calculateStart = false;
        calculatorScreen.textContent = number.textContent;
      }
      else{
        calculatorScreen.textContent += number.textContent;
      }
    })
  })
}
