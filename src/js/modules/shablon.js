// ���������� ����������
let allCity = document.querySelector('.allCity');
const startPeopleCount = 5;
let countPeople = startPeopleCount;
let startCity = 1;
let nameCity = ["������", "������", "��������"];
let nameClass = ["moskow", "rostov", "novgorod"];
let city = {};

// ������� ��������� �����
function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let randomColor = '#';

    for (let i = 0; i < 6; i++) {
        randomColor += letters[Math.floor(Math.random() * 16)];
    }

    return randomColor;
}

// ������� ��������� �����
function generateName() {
    let name = "";
    let possible = "01";

    for (let i = 0; i < 5; i++)
        name += possible.charAt(Math.floor(Math.random() * possible.length));

    return name;
}

// ���� �� ���������
function clickedByPeople (e) {
    e.target.setAttribute('style', 'color:' + getRandomColor());
}

//���������� ��������� � ������
function addPeople (arrayCity, arrayCityId, peopleId) {
    arrayCity[arrayCityId].peoples[peopleId] = {
        countPioples: countPeople + 1,
        name: generateName(),
        color: getRandomColor()
    };
}

//���������� ��������� � HTML
function peopleDomOne (arrayCity, idCity, countPeoples, allPeoplesConteiner) {
    let peopleConteiner = document.createElement('i');//�������� ���� 'i' ��� ���� ����������
    peopleConteiner.className = 'fas fa-male';
    peopleConteiner.setAttribute('data-name', arrayCity[idCity].peoples[countPeoples].name);
    peopleConteiner.setAttribute('style', 'color: ' + arrayCity[idCity].peoples[countPeoples].color);

    peopleConteiner.addEventListener('click', clickedByPeople);//����� ���� �� ����������
    arrayCity[idCity].peoples[countPeoples].htmlPeople = peopleConteiner;
    allPeoplesConteiner.appendChild(peopleConteiner);
}

//���������� ������
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
                alert('� ������ �� ����� ���� ������ ������ ��������');
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
                alert('� ������ �� ����� ���� ������ 8 �������, ���� ������� ����� �����');
            }
            else {
                alert('� ������ �� ����� ���� ������ 8 �������, ���� ������� ����� �����');
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

// �������� ���������� ������� ������� � ���������� �� � ���������� ����������
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

//�������� ������� ���� ����������
    for (let i = 1; i <= countPeople; i++) {
        city[startCity].peoples[i] = {
            countPioples: countPeople,
            name: generateName(),
            color: getRandomColor()
        }
    }

//���������� �������� �������
    startCity += 1;
}

// �������� ������ ���������� ������
function createButtonCity() {
    city[startCity - 1].buttons[4] = {
        name: 'city'
    }
}

function createHtmlCity (arrayCity) {
    let divForCity = document.createElement('div');//�������� div ����� ������
    divForCity.className = 'city-container';
    let allPeoplesConteiner = document.createElement('div');//�������� div ��� ���� ����������
    allPeoplesConteiner.className = 'peoples-container';

    for ( let i = 1; i <= startPeopleCount; i++ ) {
        let peopleConteiner = document.createElement('i');//�������� ���� 'i' ��� ���� ����������
        peopleConteiner.className = 'fas fa-male';
        peopleConteiner.setAttribute('data-name', arrayCity.peoples[i].name);
        peopleConteiner.setAttribute('style', 'color: ' + arrayCity.peoples[i].color);

        peopleConteiner.addEventListener('click', clickedByPeople);//����� ���� �� ����������
        allPeoplesConteiner.appendChild(peopleConteiner);
        arrayCity.peoples[i].htmlPeople = peopleConteiner;
    }

    let divForButton = document.createElement('div');//�������� div ���� ������
    divForButton.className = 'button-container';

    for (let indexButton in arrayCity.buttons) {
        let buttonDiv = document.createElement('div');//div �������
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

// ���������� ������� ����� �� �������� � ���������� �� DOM �������� � ����������
function buttonDomCity(arrayCityButton, divForButton) {
    let buttonDiv = document.createElement('div');//div �������
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

// ���������� ������ �� �������� � ���������� �� DOM �������� � ����������
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

// �������� ������ ���������� ������
createButtonCity = () => {
    buttons[4] = {
        name: 'city'
    }
};

// ���������� ������� ����� �� �������� � ���������� �� DOM �������� � ����������
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



// �������, ������� ����������� ��� �������� ��������� ��������� (����� ��������
// DOM ��������
domContentLoaded = () => {
    createPeoples(startPeopleCount);
    displayPeoples(peoples, wrapperPeoples);
    buttonDOM(buttons, wrapperPeoples);
};

document.addEventListener('DOMContentLoaded', domContentLoaded);

*/