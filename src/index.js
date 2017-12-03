/* ДЗ 3 - работа с массивами и объеектами */

/*
 Задача 1:
 Напишите аналог встроенного метода forEach для работы с массивами
 */
function forEach(array, fn) {
    for (var i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задача 2:
 Напишите аналог встроенного метода map для работы с массивами
 */
function map(array, fn) {
    var arrCopy = [];

    for (var i = 0; i < array.length; i++) {
        arrCopy[i] = fn(array[i], i, array);
    }

    return arrCopy;
}

/*
 Задача 3:
 Напишите аналог встроенного метода reduce для работы с массивами
 */
function reduce(array, fn, initial) {
    var previousValue = initial || array[0];

    if (!initial) {
        i = 1;
    } else {
        i = 0;
    }

    for (var i; i < array.length; i++) {
        previousValue = fn(previousValue, array[i], i, array);
    }

    return previousValue;
}

/*
 Задача 4:
 Функция принимает объект и имя свойства, которое необходиом удалить из объекта
 Функция должна удалить указанное свойство из указанного объекта
 */
function deleteProperty(obj, prop) {
    delete obj[prop];
}

/*
 Задача 5:
 Функция принимает объект и имя свойства и возвращает true или false
 Функция должна проверить существует ли укзаанное свойство в указанном объекте
 */
function hasProperty(obj, prop) {
    return obj.hasOwnProperty(prop);
}

/*
 Задача 6:
 Функция должна получить все перечисляемые свойства объекта и вернуть их в виде массива
 */
function getEnumProps(obj) {
    return Object.keys(obj);
}

/*
 Задача 7:
 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистра и вернуть в виде массива
 */
function upperProps(obj) {
    var arr = [];

    for (var prop in obj) {
        if (obj.hasOwnProperty) {
            arr.push(prop.toUpperCase());
        }
    }

    return arr;
}

/*
 Задача 8 *:
 Напишите аналог встроенного метода slice для работы с массивами
 */

function slice(array, from, to) {
    var arr = [];
    var begin = from || 0;
    var end = typeof to !== 'undefined' ? to : array.length;

    if (begin < array.length && Math.abs(begin) > array.length ) {
        begin = 0;
    }

    if (begin < 0 && begin) {
        begin = array.length + from;
    }

    if (end < 0) {
        end = array.length + to;
    }

    if (end > array.length) {
        end = array.length;
    }

    for (var i = begin; i < end; i += 1) {
        arr.push(array[i]);
    }

    return arr;
}

/*
 Задача 9 *:
 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    var proxy = new Proxy(obj, {
        set(target, prop, value) {
            target[prop] = value * value;

            return true;
        }
    });

    return proxy;
}

export {
    forEach,
    map,
    reduce,
    deleteProperty,
    hasProperty,
    getEnumProps,
    upperProps,
    slice,
    createProxy
};
