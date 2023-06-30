const buttons = document.querySelectorAll('button');
const page = document.querySelector('*');


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

