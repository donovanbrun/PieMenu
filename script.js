import { MENU } from './menu-editor.js';

const menuDiv = document.getElementById('menu');

const menuPos = {
    x: 0,
    y: 0
};

let menuVisible = false;

let menu = [MENU];

let choice;
let angle = 0;

const exit = document.getElementById('exit');
exit.classList.toggle('visible', true);
const back = document.getElementById('back');

const choicesDiv = menuDiv.querySelector('.choices');
const subChoicesDiv = menuDiv.querySelector('.subchoices');
const circular = menuDiv.querySelector('.circular');

const text = document.getElementById('text');

const openMenu = function (event) {
    event.preventDefault();

    menuDiv.classList.toggle('visible', true);
    menuVisible = true;

    menuPos.x = event.clientX;
    menuPos.y = event.clientY;

    menuDiv.style.left = menuPos.x - (menuDiv.clientWidth / 2) + 'px';
    menuDiv.style.top = menuPos.y - (menuDiv.clientHeight / 2) + 'px';

    generateMenu(menu);
};

const generateMenu = function (menu) {
    choicesDiv.innerHTML = '';
    subChoicesDiv.innerHTML = '';

    let currentMenu = menu[menu.length - 1];

    if (currentMenu?.isSub) {
        generateSubMenu(currentMenu);
        currentMenu = menu[menu.length - 2];
    }
    else {
        subChoicesDiv.classList.toggle('hidden', true);
    }
    if (currentMenu.type == "two") {
        generateMenuTwo(currentMenu);
    }
    if (currentMenu.type == "four") {
        generateMenuFour(currentMenu);
    }
    if (currentMenu.type == "circular") {
        generateMenuFour(menu[menu.length - 2]);
        generateMenuCircular(currentMenu);
    }
    else {
        circular.classList.toggle('hidden', true);
    }
};

const generateMenuTwo = function (menu) {
    choicesDiv.classList.toggle('two', true);

    menu.choices.forEach(function (choice) {
        const choiceDiv = document.createElement('div');
        choiceDiv.classList.toggle('half', true);
        choiceDiv.classList.add('choice');
        choiceDiv.innerHTML = `<p>${choice.name}</p>`;

        if (choice.sub) choiceDiv.classList.toggle('sub', true);
        else choiceDiv.classList.toggle('sub', false);

        choicesDiv.appendChild(choiceDiv);
    });
};

const generateMenuFour = function (menu) {
    choicesDiv.classList.toggle('two', false);

    menu.choices.forEach(function (choice) {
        const choiceDiv = document.createElement('div');
        choiceDiv.classList.toggle('quarter', true);
        choiceDiv.classList.add('choice');
        choiceDiv.innerHTML = `<p>${choice.name}</p>`;

        if (choice.sub) choiceDiv.classList.toggle('sub', true);
        else choiceDiv.classList.toggle('sub', false);

        choicesDiv.appendChild(choiceDiv);
    });
};

const generateSubMenu = function (menu) {
    subChoicesDiv.classList.toggle('hidden', false);

    menu.choices.forEach(function (choice) {
        const subChoiceDiv = document.createElement('div');
        subChoiceDiv.classList.add('subchoice');
        subChoiceDiv.innerHTML = `<p>${choice.name}</p>`;
        subChoicesDiv.appendChild(subChoiceDiv);
    });
};

const generateMenuCircular = function (menu) {
    circular.classList.toggle('hidden', false);
    updateCircular(0);
};

const updateCircular = function (angle) {
    const context = circular.getContext('2d');

    const rayon = 100;
    const xCentre = circular.width / 2;
    const yCentre = circular.height / 2;

    context.clearRect(0, 0, circular.width, circular.height);
    context.beginPath();
    context.moveTo(xCentre, yCentre);
    context.arc(xCentre, yCentre, rayon, 0, angle);
    context.closePath();
    context.fillStyle = '#ff0000';
    context.fill();
}

const handleClick = function (event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    if (!menuVisible) return;

    if (menu[menu.length - 1].type == "circular") {
        let angle_degre = (angle * (180.0 / Math.PI)) % 360;
        if (angle_degre < 0) angle_degre += 360;
        let value = Math.floor((angle_degre / 360) * 100);
        document.getElementById('result').innerHTML = value + "%";
        menu[menu.length - 1].action(text, value);
        choice = null;
    }

    if (choice == null && menu.length > 1) {
        menu.pop();
        generateMenu(menu);
        if (menu.length == 1) {
            exit.classList.toggle('visible', true);
            back.classList.toggle('visible', false);
        }
        return;
    }

    if (choice == null) {
        menuDiv.classList.toggle('visible', false);
        menuVisible = false;
        exit.classList.toggle('visible', true);
        back.classList.toggle('visible', false);
        return;
    }

    if (menu[menu.length - 1].choices[choice].sub) {
        menu.push(menu[menu.length - 1].choices[choice].sub);
        generateMenu(menu);
        exit.classList.toggle('visible', false);
        back.classList.toggle('visible', true);
        return;
    }

    menu[menu.length - 1].choices[choice]?.action(text);

    const res = Array.from(menu).map(m => m.name).join(" -> ") + " -> " + menu[menu.length - 1].choices[choice].name;
    document.getElementById('result').innerHTML = res;
    menu = [MENU];
    exit.classList.toggle('visible', true);
    back.classList.toggle('visible', false);
    menuDiv.classList.toggle('visible', false);
    menuVisible = false;
};

const handleChoice = function (event) {
    if (!menuVisible) return;

    const mousePos = {
        x: event.clientX,
        y: event.clientY
    };

    const choicePos = {
        x: mousePos.x - menuPos.x,
        y: mousePos.y - menuPos.y
    };

    angle = Math.atan2(choicePos.y, choicePos.x);
    const angle_degrees = ((angle * (180.0 / Math.PI)) % 360 + 540) % 360;

    if (menu[menu.length - 1].type == "circular") {
        updateCircular(angle);
        return;
    }

    choice = Math.floor(angle_degrees / (360 / menu[menu.length - 1].choices.length));

    const length = Math.sqrt(choicePos.x * choicePos.x + choicePos.y * choicePos.y);

    if (!menu[menu.length - 1]?.isSub) {
        const choicesDiv = menuDiv.querySelectorAll('.choice');

        for (let i = 0; i < choicesDiv.length; i++) {
            choicesDiv[i].classList.toggle('selected', false);
        }

        if (length >= 25) {
            choicesDiv[choice].classList.toggle('selected', true);
        }
        else {
            choice = null;
        }
    }
    else {
        const choicesDiv = menuDiv.querySelectorAll('.subchoice');

        for (let i = 0; i < choicesDiv.length; i++) {
            choicesDiv[i].classList.toggle('selected', false);
        }

        if (length >= 25) {
            choicesDiv[choice].classList.toggle('selected', true);
        }
        else {
            choice = null;
        }
    }
}

document.addEventListener('contextmenu', openMenu);
document.addEventListener('click', handleClick);
document.addEventListener('mousemove', handleChoice);