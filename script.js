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

buttons.forEach(onHover);
console.log(buttons);

