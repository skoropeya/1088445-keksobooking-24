import {createOffer} from './utils/create-offer.js';

const OFFERS_COUNT = 10;
const offers = Array.from({length: OFFERS_COUNT}, createOffer);

const canvas = document.querySelector('#map-canvas');
canvas.style.height = 'auto';

const templateCard = document.querySelector('#card').content;
const offerFragment = document.createDocumentFragment();

const TYPES = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
  'hotel': 'Отель',
};

offers.forEach((offerItem) => {
  const offerElement = templateCard.cloneNode(true);

  offerElement.querySelector('.popup__avatar').src = offerItem.author.avatar;
  offerElement.querySelector('.popup__title').textContent = offerItem.offer.title;
  offerElement.querySelector('.popup__text--address').textContent = offerItem.offer.address;
  offerElement.querySelector('.popup__text--price').textContent = `${offerItem.offer.price  } ₽/ночь`;
  offerElement.querySelector('.popup__type').textContent = TYPES[offerItem.offer.type];
  offerElement.querySelector('.popup__text--capacity').textContent = `${offerItem.offer.rooms} комнаты для ${offerItem.offer.guests} гостей`;
  offerElement.querySelector('.popup__text--time').textContent = `Заезд после ${offerItem.offer.checkin}, выезд до ${offerItem.offer.checkout}`;
  offerElement.querySelector('.popup__description').textContent = offerItem.offer.description;

  const featuresArray = offerItem.offer.features;
  const featuresList = offerElement.querySelector('.popup__features');
  const futuresFragment = document.createDocumentFragment();

  featuresArray.forEach((future) => {
    const futureItem = featuresList.querySelector(`.popup__feature--${  future}`);
    if (futureItem) {
      futuresFragment.appendChild(futureItem);
    }
  });
  featuresList.innerHTML = '';
  featuresList.appendChild(futuresFragment);

  const photosArray = offerItem.offer.photos;
  const photosList = offerElement.querySelector('.popup__photos');
  const photoTemplate = photosList.querySelector('.popup__photo');
  photosList.innerHTML = '';
  photosArray.forEach((photo) => {
    const photoItem = photoTemplate.cloneNode(false);
    photoItem.src = photo;
    photosList.appendChild(photoItem);
  });

  offerFragment.appendChild(offerElement);
});

canvas.appendChild(offerFragment);
