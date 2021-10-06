//используемый источник: https://learn.javascript.ru/number#tasks
// Если значение «до» равно значению «от», выведем это значение, так как других чисел в таком диапазоне быть не может
// Если значение «до» меньшее, чем значение «от», выведем число, находящееся между этими значениями. Для этого поменяем местами min и max

const checkEquality = (min, max) => (min === max);

const getRandom = (min, max) => (min + Math.random() * (max - min));

const getRandomInteger = (min, max) => {
  let [minNumber, maxNumber] = [Math.abs(min), Math.abs(max)];

  if (checkEquality(minNumber, maxNumber)) {
    return minNumber;
  }

  if (minNumber > maxNumber) {
    [minNumber, maxNumber] = [maxNumber, minNumber];
  }

  return Math.floor(getRandom(minNumber, maxNumber+1));
};

const getRandomFloat = (min, max, decimalPlaces = 0) => {
  let [minNumber, maxNumber] = [Math.abs(min), Math.abs(max)];
  const decimalPlacesNumber = Math.abs(decimalPlaces);

  if (checkEquality(minNumber, maxNumber)) {
    return Number(minNumber.toFixed(decimalPlacesNumber));
  }

  if (minNumber > maxNumber) {
    [minNumber, maxNumber] = [maxNumber, minNumber];
  }

  return parseFloat(getRandom(minNumber, maxNumber).toFixed(decimalPlacesNumber));
};

// формирует случайную строку заданной длины из случайных символов алфавита
// взято отсюда: https://question-it.com/questions/1521255/generatsija-sluchajnoj-stroki-simvolov-v-javascript
const ALPHABET = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя ';

const getRandomSymbol = () => ALPHABET[Math.floor(Math.random() * ALPHABET.length)];

const getRandomString = (stringMinLength, stringMaxLength) => {
  const stringLength = getRandomInteger(stringMinLength, stringMaxLength);
  return Array.from({ length: stringLength }, getRandomSymbol).join('');
};

// выбирает случаный элемент массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// формирует массив из случайных элементов другого массива
const getRandomArray = (elements) => {
  const quantityElements = getRandomInteger(1, elements.length - 1);
  const newArray = [];
  let newElement;
  while (newArray.length < quantityElements) {
    newElement = getRandomArrayElement(elements);
    if (!newArray.includes(newElement)) {
      newArray.push(newElement);
    }
  }
  return newArray;
};

export {getRandomInteger, getRandomFloat, getRandomString, getRandomArrayElement, getRandomArray};
