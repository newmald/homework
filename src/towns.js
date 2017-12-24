/**
 * ДЗ 6.2 - Создать страницу с текстовым полем для фильтрации городов
 *
 * Страница должна предварительно загрузить список городов из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * и отсортировать в алфавитном порядке.
 *
 * При вводе в текстовое поле, под ним должен появляться список тех городов,
 * в названии которых, хотя бы частично, есть введенное значение.
 * Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.
 *
 * Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 * После окончания загрузки городов, надпись исчезает и появляется текстовое поле.
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 *
 * *** Часть со звездочкой ***
 * Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 * то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 * При клике на кнопку, процесс загруки повторяется заново
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');

/**
 * Функция должна загружать список городов из https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * И возвращать Promise, которой должен разрешиться массивом загруженных городов
 *
 * @return {Promise<Array<{name: string}>>}
 */
function loadTowns() {
    return new Promise(function(resolve, reject) {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
        xhr.addEventListener('load', function() {
            var towns = JSON.parse(xhr.response);

            towns.sort(function(a, b) {
                if (a.name < b.name) {
                    return -1;
                } else if (a.name > b.name) {
                    return 1;
                }
            });

            if (xhr.status === 200) {
                resolve(towns);
            } else {
                reject();
            }
        });
        xhr.send();
    });
}

/**
 * Функция должна проверять встречается ли подстрока chunk в строке full
 * Проверка должна происходить без учета регистра символов
 *
 * @example
 * isMatching('Moscow', 'moscow') // true
 * isMatching('Moscow', 'mosc') // true
 * isMatching('Moscow', 'cow') // true
 * isMatching('Moscow', 'SCO') // true
 * isMatching('Moscow', 'Moscov') // false
 *
 * @return {boolean}
 */

function isMatching(full, chunk) {
    if (~full.toLowerCase().indexOf(chunk.toLowerCase())) {
        return true;
    }

    return false;
}

let loadingBlock = homeworkContainer.querySelector('#loading-block');
let filterBlock = homeworkContainer.querySelector('#filter-block');
let filterInput = homeworkContainer.querySelector('#filter-input');
let filterResult = homeworkContainer.querySelector('#filter-result');
let findTown = [];

let loadPage = (towns) => {
    loadingBlock.style.display = 'none';
    filterBlock.style.display = 'block';
    findTown = towns;
};

let loadError = () => {
    let resetButton = document.createElement('button');

    loadingBlock.style.display = 'block';
    loadingBlock.innerHTML = 'Не удалось загрузить города';
    resetButton.innerHTML = 'Повторить';
    loadingBlock.appendChild(resetButton);
    filterBlock.style.display = 'none';
    resetButton.addEventListener('click', function() {
        loadingBlock.innerHTML = 'Загрузка...';
        loadTowns().then(loadPage, loadError);
    });
};

loadTowns().then(loadPage, loadError);

filterInput.addEventListener('keyup', function() {
    let customText = filterInput.value.trim();

    filterResult.innerHTML = '';

    for (let i = 0; i < findTown.length; i++) {
        let nameTown = document.createElement('div');

        if (isMatching(findTown[i].name, customText)) {
            nameTown.innerHTML = findTown[i].name;
            filterResult.appendChild(nameTown);
        }
        if (customText === '') {
            filterResult.innerHTML = '';
        }
    }
});

export {
    loadTowns,
    isMatching
};
