import {createOffer} from './utils/create-offer.js';

const OFFERS_COUNT = 10;
const offers = Array.from({length: OFFERS_COUNT}, createOffer);

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

  const avatar = offerElement.querySelector('.popup__avatar');
  const title = offerElement.querySelector('.popup__title');
  const address = offerElement.querySelector('.popup__text--address');
  const price = offerElement.querySelector('.popup__text--price');
  const type = offerElement.querySelector('.popup__type');
  const capacity = offerElement.querySelector('.popup__text--capacity');
  const time = offerElement.querySelector('.popup__text--time');
  const description = offerElement.querySelector('.popup__description');
  const featuresList = offerElement.querySelector('.popup__features');
  const photosList = offerElement.querySelector('.popup__photos');

  offerItem.author.avatar ? avatar.src = offerItem.author.avatar : avatar.classList.add('hidden');
  offerItem.offer.title ? title.textContent =  offerItem.offer.title : title.classList.add('hidden');
  offerItem.offer.address ? address.textContent =  offerItem.offer.address : address.classList.add('hidden');
  offerItem.offer.price ? price.textContent =  `${offerItem.offer.price  } ₽/ночь` : price.classList.add('hidden');
  offerItem.offer.type ? type.textContent =  TYPES[offerItem.offer.type] : type.classList.add('hidden');
  offerItem.offer.description ? description.textContent = offerItem.offer.description : description.classList.add('hidden');
  (offerItem.offer.rooms & offerItem.offer.guests) ? capacity.textContent = `${offerItem.offer.rooms} комнаты для ${offerItem.offer.guests} гостей` : capacity.classList.add('hidden');
  (offerItem.offer.checkin & offerItem.offer.checkout) ? time.textContent = `${offerItem.offer.checkin} комнаты для ${offerItem.offer.checkout} гостей` : time.classList.add('hidden');

  const featuresArray = offerItem.offer.features;
  if (featuresArray.length === 0) {
    featuresList.classList.add('hidden');
  } else {
    const futuresFragment = document.createDocumentFragment();

    featuresArray.forEach((future) => {
      const futureItem = featuresList.querySelector(`.popup__feature--${future}`);
      if (futureItem) {
        futuresFragment.appendChild(futureItem);
      }
    });
    featuresList.innerHTML = '';
    featuresList.appendChild(futuresFragment);
  }

  const photosArray = offerItem.offer.photos;
  if (photosArray.length === 0) {
    photosList.classList.add('hidden');
  } else {
    const photoTemplate = photosList.querySelector('.popup__photo');
    photosList.innerHTML = '';
    photosArray.forEach((photo) => {
      const photoItem = photoTemplate.cloneNode(false);
      photoItem.src = photo;
      photosList.appendChild(photoItem);
    });
  }

  offerFragment.appendChild(offerElement);
});


const canvas = document.querySelector('#map-canvas');
// canvas.style.height = 'auto';
// canvas.appendChild(offerFragment);
canvas.appendChild(offerFragment.children[0]);
