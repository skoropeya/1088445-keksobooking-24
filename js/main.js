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

const ALPHABET = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя ';
const TYPES_LIST = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECK_TIME = ['12:00', '13:00', '14:00'];
const FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS_LIST = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const OFFERS_COUNT = 10;

// формирует массив со ссылками на аватары пользователей
const createAvatar = () => {
  const avatars = [];
  for (let i = 1; i <= 10; i++) {
    if (i < 10) {
      avatars.push(`img/avatars/user0${  i  }.png`);
    } else {
      avatars.push(`img/avatars/user${  i  }.png`);
    }
  }
  return avatars;
};

const authorPhotos = createAvatar();

// формирует случайную строку заданной длины из случайных символов алфавита
// взято отсюда: https://question-it.com/questions/1521255/generatsija-sluchajnoj-stroki-simvolov-v-javascript
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


// создает объект с данными объявления
const createOffer = () => {
  const lat = getRandomFloat(35.65, 35.7, 5);
  const lng = getRandomFloat(139.7, 139.8, 5);

  return {
    author: {
      avatar: getRandomArrayElement(authorPhotos),
    },
    offer: {
      title: getRandomString(30, 100),
      address: `${lat  }, ${  lng}`,
      price: getRandomInteger(0, 1000000),
      type: getRandomArrayElement(TYPES_LIST),
      rooms: getRandomInteger(0, 10),
      guests: getRandomInteger(0, 10),
      checkin: getRandomArrayElement(CHECK_TIME),
      checkout: getRandomArrayElement(CHECK_TIME),
      features: getRandomArray(FEATURES_LIST),
      description: getRandomString(30, 100),
      photos: getRandomArray(PHOTOS_LIST),
    },
    location: {
      lat: lat,
      lng: lng,
    },
  };
};

const offers = Array.from({length: OFFERS_COUNT}, createOffer);
offers;
