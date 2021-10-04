//используемый источник: https://learn.javascript.ru/number#tasks

// Если значение «до» равно значению «от», выведем это значение, так как других чисел в таком диапазоне быть не может

// Если значение «до» меньшее, чем значение «от», выведем число, находящееся между этими значениями. Для этого поменяем местами min и max

const ERROR_MESSAGE = 'Введено отрицательное значение, функция не может быть выполнена';

function checkPositive(num) {
  return (num >= 0);
}

function checkEquality(min, max) {
  return (min === max);
}

function swapNumbers(min, max) {
  return [max, min];
}

function getRandom(min, max) {
  return min + Math.random() * (max - min);
}

function getRandomInteger(min, max) {
  if (!checkPositive(min) || !checkPositive(max)) {
    throw ERROR_MESSAGE;
  }

  if (checkEquality(min, max)) {
    return min;
  }

  let [minNumber, maxNumber] = [min, max];

  if (min > max) {
    [minNumber, maxNumber] = swapNumbers(min, max);
  }

  return Math.floor(getRandom(minNumber, maxNumber+1));
}

function getRandomFloat(min, max, decimalPlaces = 0) {

  if (!checkPositive(min) || !checkPositive(max) || !checkPositive(decimalPlaces)) {
    throw ERROR_MESSAGE;
  }

  if (checkEquality(min, max)) {
    return Number(min.toFixed(decimalPlaces));
  }

  let [minNumber, maxNumber] = [min, max];

  if (min > max) {
    [minNumber, maxNumber] = swapNumbers(min, max);
  }

  return parseFloat(getRandom(minNumber, maxNumber).toFixed(decimalPlaces));
}

getRandomInteger();
getRandomFloat();
