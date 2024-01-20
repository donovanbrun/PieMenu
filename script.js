const menuDiv = document.getElementById('menu');

const menuPos = {
    x: 0,
    y: 0
};

let menuVisible = false;

const MENU = {
    type: "four",
    choices: [
        {
            name: "a",
        },
        {
            name: "two",
            sub: {
                type: "two",
                choices: [
                    {
                        name: "1",
                    },
                    {
                        name: "2",
                    },
                ]
            }
        },
        {
            name: "c",
        },
        {
            name: "four",
            sub: {
                type: "four",
                choices: [
                    {
                        name: "e",
                    },
                    {
                        name: "f",
                    },
                    {
                        name: "g",
                    },
                    {
                        name: "h",
                    },
                ]
            }
        },
    ]
};

let menu = MENU;

let choice;

const exit = document.getElementById('exit');
exit.classList.toggle('visible', true);
const back = document.getElementById('back');

document.addEventListener('contextmenu', function (event) {
    event.preventDefault();

    menuDiv.classList.toggle('visible', true);
    menuVisible = true;

    menuPos.x = event.clientX;
    menuPos.y = event.clientY;

    menuDiv.style.left = menuPos.x - 100 + 'px';
    menuDiv.style.top = menuPos.y - 100 + 'px';

    generateMenu(menu);
});

const generateMenu = function (menu) {
    const choicesDiv = menuDiv.querySelector('.choices');
    choicesDiv.innerHTML = '';

    menu.choices.forEach(function (choice) {
        const choiceDiv = document.createElement('div');

        if (menu.type == "two") choiceDiv.classList.add('half');
        else if (menu.type == "four") choiceDiv.classList.add('quarter');

        choiceDiv.classList.add('choice');
        choiceDiv.innerHTML = choice.name;

        if (choice.sub) choiceDiv.classList.toggle('sub', true);
        else choiceDiv.classList.toggle('sub', false);

        choicesDiv.appendChild(choiceDiv);
    });
};

document.addEventListener('click', function (event) {
    if (!menuVisible) return;

    if (choice == null && menu != MENU) {
        menu = MENU;
        generateMenu(menu);
        exit.classList.toggle('visible', true);
        back.classList.toggle('visible', false);
        return;
    }

    if (choice == null) {
        menuDiv.classList.toggle('visible', false);
        menuVisible = false;
        exit.classList.toggle('visible', true);
        back.classList.toggle('visible', false);
        return;
    }

    if (menu.choices[choice].sub) {
        menu = menu.choices[choice].sub;
        generateMenu(menu);
        exit.classList.toggle('visible', false);
        back.classList.toggle('visible', true);
        return;
    }

    document.getElementById('result').innerHTML = menu.choices[choice] ? menu.choices[choice].name : 'none';
    menu = MENU;
    exit.classList.toggle('visible', true);
    back.classList.toggle('visible', false);
    menuDiv.classList.toggle('visible', false);
    menuVisible = false;
});

document.addEventListener('mousemove', function (event) {
    if (!menuVisible) return;

    const mousePos = {
        x: event.clientX,
        y: event.clientY
    };

    const choicePos = {
        x: mousePos.x - menuPos.x,
        y: mousePos.y - menuPos.y
    };

    const angle = Math.atan2(choicePos.y, choicePos.x);
    const angle_degre = ((angle * (180.0 / Math.PI)) % 360 + 540) % 360;

    choice = Math.floor(angle_degre / (360 / menu.choices.length));

    const length = Math.sqrt(choicePos.x * choicePos.x + choicePos.y * choicePos.y);

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
});