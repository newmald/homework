/**
 * ДЗ 7.2 - Создать редактор cookie с возможностью фильтрации
 *
 * На странице должна быть таблица со списком имеющихся cookie:
 * - имя
 * - значение
 * - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 *
 * На странице должна быть форма для добавления новой cookie:
 * - имя
 * - значение
 * - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)
 *
 * Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено
 *
 * На странице должно быть текстовое поле для фильтрации cookie
 * В таблице должны быть только те cookie, в имени или значении которых есть введенное значение
 * Если в поле фильтра пусто, то должны выводиться все доступные cookie
 * Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 * Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 * то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 *
 * Для более подробной информации можно изучить код тестов
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');
let filterNameInput = homeworkContainer.querySelector('#filter-name-input');
let addNameInput = homeworkContainer.querySelector('#add-name-input');
let addValueInput = homeworkContainer.querySelector('#add-value-input');
let addButton = homeworkContainer.querySelector('#add-button');
let listTable = homeworkContainer.querySelector('#list-table tbody');

// отрисовка таблицы с cookie
function drawTable() {
    const cookieList = getCookies();
    const value = filterNameInput.value.trim().toLowerCase();
    let html = '';

    for (let i in cookieList) {
        if (cookieList.hasOwnProperty(i)) {
            if (i.toLowerCase().indexOf(value) > -1 || cookieList[i].toLowerCase().indexOf(value) > -1) {
                html += `<tr><td>${ i }</td><td>${ cookieList[i] }</td><td><button>Delete</button></td></tr>`;
            }
        }
    }
    listTable.innerHTML = html;
}

// Рисуем все куки
drawTable();

// существующие куки
function getCookies() {
    return document.cookie
        .split('; ')
        .filter(Boolean)
        .map(cookie => cookie.match(/^([^=]+)=(.+)/))
        .reduce((obj, [, name, value]) => {
            obj[name] = value;

            return obj;
        }, {});
}

// создать куки
function addCookie() {
    let nameCookie = addNameInput.value;
    let valueCookie = addValueInput.value;

    if (nameCookie === '' || valueCookie === '') {
        alert('Поля или одно из полей пустые!!!');

        return;
    }

    document.cookie = `${nameCookie}=${valueCookie}`;
    drawTable();
    addNameInput.value = '';
    addValueInput.value = '';
}

// отфильтровать куки
filterNameInput.addEventListener('keyup', function() {
    drawTable();
});

// добавить куки
addButton.addEventListener('click', () => {
    addCookie();
});

// удалить куки
listTable.addEventListener('click', (e) => {
    let clickTarget = e.target;
    let targetParent = clickTarget.parentNode.parentNode;
    let nameCookie = targetParent.firstChild.textContent;

    if (clickTarget.tagName === 'BUTTON') {
        targetParent.remove();
    }

    document.cookie = `${nameCookie}=;expires=${new Date(0).toUTCString()}`;
    //drawTable();
});
