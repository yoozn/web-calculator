const buttons = document.querySelectorAll('button');
const body = document.querySelector('body');
const middleMiddle = document.querySelector('.middle-middle');
const outputText = document.querySelector('.output-text');
const historyText = document.querySelector('.history');

let firstArg = true;
let firstNum = "";
let operator = "";
let operatorCount = 0;
let operatorJustPressed = false;
let secondNum = "";
let outputPastText = "";
let shiftPressed = false;

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
    if (element.classList.contains('AC')) {
        outputText.textContent = "0";
        firstNum = "";
        secondNum = "";
        operator = "";
        operatorCount = 0;
        operatorJustPressed = false;
        historyText.textContent = "";
        middleMiddle.classList.add('reset-effect');
        middleMiddle.addEventListener('transitionend', () => middleMiddle.classList.remove('reset-effect'));
    }
    else {
        if (element.classList.contains('equals')) {
            if (operatorCount == 1) {
                firstNum = operate(firstNum, operator, secondNum);
                outputText.textContent = ((Math.floor(firstNum * 10000) / 10000) < 10000) ? firstNum : firstNum.toExponential(4);
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
                    outputText.textContent = ((Math.floor(secondNum* 10000) / 10000) < 10000) ? secondNum : Number(secondNum).toExponential(4);
                } else if (operatorCount == 0) {
                    firstNum = `${firstNum}`;
                    firstNum = firstNum.slice(0, firstNum.length-1);
                    firstNum = firstNum ? firstNum : "";
                    outputText.textContent = ((Math.floor(firstNum * 10000) / 10000) < 10000) ? firstNum : Number(firstNum).toExponential(4);
                }
            }
        }
        else if (!element.classList.contains('operator') && 
                (outputText.textContent.length < 10 || operatorJustPressed)) {
                    if (element.classList.contains('bdec')) {
                        if (operatorJustPressed) return;
                        else  if (operatorCount == 0){
                            if (firstNum == "") return;
                            if (firstNum.includes(".")) return;
                        } else if (operatorCount == 1) {
                            if(secondNum.includes(".")) return;
                        }
                    }
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
        } else if (element.classList.contains('operator')) {
            if (firstNum == "0" || firstNum == "") {
                if (element.classList.contains('bsub')) {
                    firstNum = "-";
                    outputText.textContent = "-";
                }
            }
            else if (firstNum != '') {
                if (!operatorJustPressed) operatorCount++;
                if (operatorCount == 1) {
                    operator = element.textContent;
                }
                else if (!operatorJustPressed){
                    operatorCount = 1;
                    firstNum = operate(firstNum, operator, secondNum);
                    outputText.textContent = (Math.floor(firstNum * 10000) / 10000 < 10000) ? firstNum : firstNum.toExponential(4);
                    operator = element.textContent;
                    secondNum = "";
                }
                operatorJustPressed = true;
            } 
        }
        const buttons = document.querySelectorAll('button');
        buttons.forEach((button)=> button.classList.remove('operator-effect'));
        switch (operator) {
            case "+":
                const badd = document.querySelector('.badd');
                badd.classList.add('operator-effect');
                break;
            case "-":
                const bsub = document.querySelector('.bsub');
                console.log(bsub);
                bsub.classList.add('operator-effect');
                break;
            case "*":
                const bmul = document.querySelector('.bmul');
                bmul.classList.add('operator-effect');
                break;
            case "/":
                const bdiv = document.querySelector('.bdiv');
                bdiv.classList.add('operator-effect');
                break;
        }
        console.table(firstNum, operator, secondNum, operatorCount, operatorJustPressed);
        let outputPastText = `${firstNum < 100000 ? firstNum : Number(firstNum).toExponential(6)} ${operator} ${secondNum}`;
        historyText.textContent = outputPastText;
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
            return Math.floor(add(a, b) * 10000000) / 10000000;
        case "-":
            return Math.floor(subtract(a,b) * 10000000) / 10000000;
        case "*":
            return Math.floor(multiply(a,b) * 10000000) / 10000000;
        case "/":
            return Math.floor(divide(a,b) * 10000000) / 10000000;
    }
}

body.addEventListener('keydown', (e)=> {
    if (e.code.toLowerCase().includes("shift")) {
        shiftPressed = true;
    }
    if (shiftPressed) {
        if(e.code == "Equal") {
            const button = document.querySelector('.badd');
            inputButton(button);
        }
        else if (e.code == "Digit8") inputButton(document.querySelector('.bmul'));
    }
    else {
        if (e.code.includes("Digit")) {
            let num = e.code.slice(-1);
            const button = document.querySelector(`.b${num}`);
            onKeypress(button);
        }
        else if (e.code == "Equal" || e.code == "Enter") {
            const button = document.querySelector('.equals');
            onKeypress(button);
        }
        else if (e.code == "Minus") {
            const button = document.querySelector('.bsub');
            inputButton(button);
        } 
        else if (e.code == "Slash") {
            const button = document.querySelector('.bdiv');
            inputButton(button);
        } 
        else if (e.code == "Period") {
            const button = document.querySelector('.bdec');
            onKeypress(button);
        } 
        else if (e.code == "Backspace") {
            const button = document.querySelector('.delete');
            onKeypress(button);
        } 
        else if (e.code == "Escape") {
            const button = document.querySelector('.AC');
            onKeypress(button);
            middleMiddle.classList.add('reset-effect');
            middleMiddle.addEventListener('transitionend', () => middleMiddle.classList.remove('reset-effect'));
        }
    }
})

function onKeypress(button) {
    inputButton(button);
    button.classList.add('press-effect');
    button.addEventListener('transitionend', ()=> button.classList.remove('press-effect'));
}

body.addEventListener('keyup', (e)=> {
    if (e.code.toLowerCase().includes("shift")) {
        shiftPressed = false;
    }
})

