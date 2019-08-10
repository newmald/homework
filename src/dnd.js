/** Со звездочкой */
/**
 * Создать страницу с кнопкой
 * При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией
 * Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 * Запрощено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
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
 * Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 * Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 * Функция НЕ должна добавлять элемент на страницу
 *
 * @return {Element}
 */
function createDiv() {
    var div = document.createElement('div');

    div.setAttribute('class', 'draggable-div');

    function randomSize(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function randomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';

        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.round(Math.random() * 15)];
        }

        return color;
    }

    div.style.position = 'absolute';
    div.style.width = randomSize(10, 100) + 'px';
    div.style.height = randomSize(10, 100) + 'px';
    div.style.backgroundColor = randomColor();
    div.style.top = randomSize(0, 1000) + 'px';
    div.style.left = randomSize(0, 1000) + 'px';

    return div;
}

/**
 * Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop
 *
 * @param {Element} target
 */
function addListeners(target) {
    let activeDiv,
        offsetX = 0,
        offsetY = 0,
        mouseDown = (e) => {
            if (e.which === 1) {
                activeDiv = e.target;
                offsetX = e.offsetX;
                offsetY = e.offsetY;
            }
        },
        mouseUp = (e) => activeDiv = null,
        mouseMove = (e) => {
            if (activeDiv) {
                activeDiv.style.top = (e.clientY - offsetY) + 'px';
                activeDiv.style.left = (e.clientX - offsetX) + 'px';
            }
        };

    target.ondragstart = () => false;

    target.addEventListener('mousedown', mouseDown);
    target.addEventListener('mouseup', mouseUp);
    document.addEventListener('mousemove', mouseMove);
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    let div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации d&d
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
