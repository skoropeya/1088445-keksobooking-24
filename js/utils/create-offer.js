import  {getRandomInteger, getRandomFloat, getRandomString, getRandomArrayElement, getRandomArray} from './get-random.js';
import {authorAvatars} from './create-links-avatar.js';

const TYPES_LIST = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECK_TIME = ['12:00', '13:00', '14:00'];
const FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS_LIST = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

// создает объект с данными объявления
const createOffer = () => {
  const lat = getRandomFloat(35.65, 35.7, 5);
  const lng = getRandomFloat(139.7, 139.8, 5);

  return {
    author: {
      avatar: getRandomArrayElement(authorAvatars),
    },
    offer: {
      title: getRandomString(30, 100),
      address: `${lat}, ${lng}`,
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

export {createOffer};
