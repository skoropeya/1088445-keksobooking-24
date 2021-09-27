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

function changeNumbers(min, max) {
  return {
    minNumber: max,
    maxNumber: min,
  };
}

function getRandom(min, max) {
  return min + Math.random() * (max - min);
}

function getIntNumber(min, max) {
  if (!checkPositive(min) || !checkPositive(max)) {
    return ERROR_MESSAGE;
  }

  if (checkEquality(min, max)) {
    return min;
  }

  if (min > max) {
    const SWAP = changeNumbers(min, max);
    min = SWAP.minNumber;
    max = SWAP.maxNumber;
  }

  return Math.floor(getRandom(min, max+1));
}

function getFloatNumber(min, max, decimalPlaces = 0) {

  if (!checkPositive(min) || !checkPositive(max) || !checkPositive(decimalPlaces)) {
    return ERROR_MESSAGE;
  }

  if (checkEquality(min, max)) {
    return min.toFixed(decimalPlaces);
  }

  if (min > max) {
    const SWAP = changeNumbers(min, max);
    min = SWAP.minNumber;
    max = SWAP.maxNumber;
  }

  return (getRandom(min, max)).toFixed(decimalPlaces);
}

getIntNumber();
getFloatNumber();
