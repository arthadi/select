// Глобальные переменные
let allCity = document.querySelector('.allCity');
const startPeopleCount = 5;
let countPeople = startPeopleCount;
let startCity = 1;
let nameCity = ["Москва", "Ростов", "Новгород"];
let nameClass = ["moskow", "rostov", "novgorod"];
let city = {};

// Функция генерации цвета
function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let randomColor = '#';

    for (let i = 0; i < 6; i++) {
        randomColor += letters[Math.floor(Math.random() * 16)];
    }

    return randomColor;
}

// Функция генерации имени
function generateName() {
    let name = "";
    let possible = "01";

    for (let i = 0; i < 5; i++)
        name += possible.charAt(Math.floor(Math.random() * possible.length));

    return name;
}

// Клик на человечка
function clickedByPeople (e) {
    e.target.setAttribute('style', 'color:' + getRandomColor());
}

//Добавление человечка в массив
function addPeople (arrayCity, arrayCityId, peopleId) {
    arrayCity[arrayCityId].peoples[peopleId] = {
        countPioples: countPeople + 1,
        name: generateName(),
        color: getRandomColor()
    };
}

//Добавление человечка в HTML
function peopleDomOne (arrayCity, idCity, countPeoples, allPeoplesConteiner) {
    let peopleConteiner = document.createElement('i');//создание тега 'i' для всех человечков
    peopleConteiner.className = 'fas fa-male';
    peopleConteiner.setAttribute('data-name', arrayCity[idCity].peoples[countPeoples].name);
    peopleConteiner.setAttribute('style', 'color: ' + arrayCity[idCity].peoples[countPeoples].color);

    peopleConteiner.addEventListener('click', clickedByPeople);//евент клик на человечках
    arrayCity[idCity].peoples[countPeoples].htmlPeople = peopleConteiner;
    allPeoplesConteiner.appendChild(peopleConteiner);
}

//Функционал кнопок
function operationsButton (e) {
    let idCity = e.target.dataset.idcity;
    let peopleDiv = city[idCity].htmlDom.firstChild;
    let buttonDiv = city[idCity].htmlDom.lastChild;

    for (let countAllPeople in city[idCity].peoples) {
        countPeople = +countAllPeople;
    }
    console.log(countPeople);

    switch (e.target.dataset.name) {

        case 'delete':

            if (countPeople > 1) {

                peopleDiv.lastChild.remove();
                delete city[idCity].peoples[countPeople];

                countPeople -= 1;
            }
            else {
                alert('в городе не может быть меньше одного человека');
            }

            break;

        case 'add':

            if (countPeople < 8) {

                for (let countAllPeople in city[idCity].peoples) {
                    countPeople = +countAllPeople;
                }

                countPeople += 1;
                addPeople(city, idCity, countPeople);
                peopleDomOne (city, idCity, countPeople, peopleDiv);
            }
            else if (countPeople === 8 && city[idCity].buttons[4] === undefined) {

                for (let countAllPeople in city[idCity].peoples) {
                    countPeople = +countAllPeople;
                }

                createButtonCity();
                buttonDomCity(city[idCity].buttons[4], buttonDiv);
                alert('в городе не может быть больше 8 человек, пора строить новый город');
            }
            else {
                alert('в городе не может быть больше 8 человек, пора строить новый город');
            }

            break;

        case 'color':

            for (let i = 0; i < peopleDiv.children.length; i++) {
                peopleDiv.children[i].setAttribute('style', 'color:' + getRandomColor());
            }

            break;

        case 'city':
            countPeople = startPeopleCount;
            createArrayCity (nameCity, nameClass, startPeopleCount);
            createHtmlCity (city[startCity - 1]);

            break;
    }
}

// Создание дефолтного массива городов и сохранение их в глобальной переменной
function createArrayCity (nameCity, nameClass, countPeople) {
    city[startCity] = {
        name: nameCity[startCity - 1],
        cssClass: nameClass[startCity - 1],
        peoples: {},
        buttons: {
            1: {
                name: 'delete'
            },
            2: {
                name: 'add'
            },
            3: {
                name: 'color'
            }
        }
    };

//создание массива всех человечков
    for (let i = 1; i <= countPeople; i++) {
        city[startCity].peoples[i] = {
            countPioples: countPeople,
            name: generateName(),
            color: getRandomColor()
        }
    }

//увеличение счетчика городов
    startCity += 1;
}

// Создание кнопки добавления города
function createButtonCity() {
    city[startCity - 1].buttons[4] = {
        name: 'city'
    }
}

function createHtmlCity (arrayCity) {
    let divForCity = document.createElement('div');//создание div всего города
    divForCity.className = 'city-container';
    let allPeoplesConteiner = document.createElement('div');//создание div для всех человечков
    allPeoplesConteiner.className = 'peoples-container';

    for ( let i = 1; i <= startPeopleCount; i++ ) {
        let peopleConteiner = document.createElement('i');//создание тега 'i' для всех человечков
        peopleConteiner.className = 'fas fa-male';
        peopleConteiner.setAttribute('data-name', arrayCity.peoples[i].name);
        peopleConteiner.setAttribute('style', 'color: ' + arrayCity.peoples[i].color);

        peopleConteiner.addEventListener('click', clickedByPeople);//евент клик на человечках
        allPeoplesConteiner.appendChild(peopleConteiner);
        arrayCity.peoples[i].htmlPeople = peopleConteiner;
    }

    let divForButton = document.createElement('div');//создание div всех кнопок
    divForButton.className = 'button-container';

    for (let indexButton in arrayCity.buttons) {
        let buttonDiv = document.createElement('div');//div кнопоки
        buttonDiv.className = 'cityPopulation';

        let buttonName = document.createElement('a');
        buttonName.className = 'cityPopulationA';
        buttonName.setAttribute('data-name', arrayCity.buttons[indexButton].name);
        buttonName.setAttribute('data-idcity', startCity - 1);
        buttonName.innerHTML = arrayCity.buttons[indexButton].name;
        buttonDiv.appendChild(buttonName);

        buttonDiv.addEventListener('click', operationsButton);
        divForButton.appendChild(buttonDiv);
        arrayCity.buttons[indexButton].htmlButton = buttonDiv;
    }

    divForCity.appendChild(allPeoplesConteiner);
    divForCity.appendChild(divForButton);
    arrayCity.htmlDom = divForCity;
    allCity.appendChild(divForCity);
}

// Размещение кнопоки город на страницу и сохранение их DOM элемента в переменной
function buttonDomCity(arrayCityButton, divForButton) {
    let buttonDiv = document.createElement('div');//div кнопоки
    buttonDiv.className = 'cityPopulation';

    let buttonName = document.createElement('a');
    buttonName.className = 'cityPopulationA';
    buttonName.setAttribute('data-name', arrayCityButton.name);
    buttonName.setAttribute('data-idcity', startCity - 1);
    buttonName.innerHTML = arrayCityButton.name;
    buttonDiv.appendChild(buttonName);

    buttonDiv.addEventListener('click', operationsButton);
    divForButton.appendChild(buttonDiv);

    arrayCityButton.htmlButton = buttonDiv;
}

function domLoaded() {
    createArrayCity (nameCity, nameClass, startPeopleCount);
    createHtmlCity (city[startCity - 1]);
}

document.addEventListener('DOMContentLoaded', domLoaded);

/*

// Размещение кнопок на страницу и сохранение их DOM элемента в переменной
buttonDOM = (buttonObj, wrapperCity) => {
    let wrapperButtons = document.createElement('div');
    wrapperButtons.className = "button-container";

    for (let button in buttonObj) {
        let buttonsDiv = document.createElement('div');
        let buttonElement = document.createElement('a');

        buttonsDiv.className = "cityPopulation";
        buttonElement.className = buttonObj[button].name;
        buttonElement.innerHTML = buttonObj[button].name;

        buttonsDiv.addEventListener('click', operationsButton);
        buttonsDiv.appendChild(buttonElement);

        wrapperButtons.appendChild(buttonsDiv);
        buttonObj[button].domElement = buttonsDiv;
    }

    wrapperCity.appendChild(wrapperButtons);
};

// Создание кнопки добавления города
createButtonCity = () => {
    buttons[4] = {
        name: 'city'
    }
};

// Размещение кнопоки город на страницу и сохранение их DOM элемента в переменной
buttonDomCity = ( buttonObj ) => {

    let wrapperButtons = document.querySelector('.button-container');
    let buttonsDiv = document.createElement('div');
    let buttonElement = document.createElement('a');

    buttonsDiv.className = "cityPopulation";
    buttonElement.className = buttonObj[4].name;
    buttonElement.innerHTML = buttonObj[4].name;

    buttonsDiv.addEventListener('click', operationsButton);
    buttonsDiv.appendChild(buttonElement);

    wrapperButtons.appendChild(buttonsDiv);
    buttonObj[4].domElement = buttonsDiv;
};



// Функция, которая срабатывает при загрузке структуры документа (когда доступны
// DOM элементы
domContentLoaded = () => {
    createPeoples(startPeopleCount);
    displayPeoples(peoples, wrapperPeoples);
    buttonDOM(buttons, wrapperPeoples);
};

document.addEventListener('DOMContentLoaded', domContentLoaded);

*/