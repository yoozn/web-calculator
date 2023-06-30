const buttons = document.querySelectorAll('button');
const outputText = document.querySelector('.output-text');
let firstArg = true;
let firstNum = "";
let operator = "";
let operatorCount = 0;
let operatorJustPressed = false;
let secondNum = "";

function onHover(element) {
    element.addEventListener('mouseover', (e)=> {
        element.classList.add('hover-effect');
        element.style.cursor = 'url("cursorHighlight.png"), default';
    });
    element.addEventListener('mouseleave',(e)=> {
        element.classList.remove('hover-effect');
        element.style.cursor = 'url("cursor.png"), default';
    });
}

function onClick(element) {
    element.addEventListener('mousedown', () => {
        element.classList.add('click-effect');
    });
    element.addEventListener('mouseup', () => {
        element.classList.remove('click-effect');
        inputButton(element);
    });
    element.addEventListener('mouseleave', () => {
        element.classList.remove('click-effect');
    })
}

function initializeButtons(buttons) {
    buttons.forEach(onHover);
    buttons.forEach(onClick);
}

initializeButtons(buttons);

function inputButton(element) {
    if (outputText.textContent.length < 10) {
        if (element.classList.contains('AC')) {
            outputText.textContent = "0";
            firstNum = "";
            secondNum = "";
            operator = "";
            operatorCount = 0;
            operatorJustPressed = false;
        } else if (element.classList.contains('equals')) {
            if (operatorCount == 1) {
                firstNum = operate(firstNum, operator, secondNum);
                outputText.textContent = firstNum;
                operatorJustPressed = false;
                secondNum = "";
                operatorCount = 0;
                operator = "";
            }
        } else if (element.classList.contains('delete')) {
            if (!operatorJustPressed){
                if (operatorCount == 1) {
                    secondNum = secondNum.slice(0, secondNum.length-1);
                    secondNum = (secondNum) ? secondNum : "";
                    outputText.textContent = secondNum;
                } else if (operatorCount == 0) {
                    firstNum = `${firstNum}`;
                    firstNum = firstNum.slice(0, firstNum.length-1);
                    firstNum = firstNum ? firstNum : "";
                    outputText.textContent = firstNum;
                }
            }
        }
        else if (!element.classList.contains('operator')) {
            if (operatorJustPressed) {
                outputText.textContent = "";
                operatorJustPressed = false;
            } 
            if (outputText.textContent == "0") {
                outputText.textContent = "";
            }
            if (operatorCount == 1) {
                secondNum += element.textContent;
            } else firstNum += element.textContent;
            outputText.textContent += element.textContent;
        } else {
            if (!operatorJustPressed) operatorCount++;
            if (operatorCount == 1) {
                operator = element.textContent;
            }
            else if (!operatorJustPressed){
                operatorCount = 1;
                firstNum = operate(firstNum, operator, secondNum);
                outputText.textContent = firstNum;
                operator = element.textContent;
                secondNum = "";
            }
            operatorJustPressed = true;
        }
        console.table(firstNum, operator, secondNum, operatorCount, operatorJustPressed);
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a,b) {
    return a - b;
}

function multiply(a,b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, operator, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a,b);
        case "*":
            return multiply(a,b);
        case "/":
            return divide(a,b);
    }
}

