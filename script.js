const buttons = document.querySelectorAll('button');


function onHover(element) {
    element.addEventListener('mouseover', (e)=> {
        element.classList.add('hover-effect');
    });
    element.addEventListener('mouseleave',(e)=> {
        element.classList.remove('hover-effect');
    });
}

buttons.forEach(onHover);
console.log(buttons);

