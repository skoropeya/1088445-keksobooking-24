import {createOffer} from './utils/create-offer.js';

const OFFERS_COUNT = 10;
const RUB_SIGN = '\u20BD';
const TYPES = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
  'hotel': 'Отель',
};

const offers = Array.from({length: OFFERS_COUNT}, createOffer);
const templateCard = document.querySelector('#card').content.querySelector('.popup');

const createOfferElement = (offerItem) => {
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
  offerItem.offer.price ? price.textContent =  `${offerItem.offer.price  } ${RUB_SIGN}/ночь` : price.classList.add('hidden');
  offerItem.offer.type ? type.textContent =  TYPES[offerItem.offer.type] : type.classList.add('hidden');
  offerItem.offer.description ? description.textContent = offerItem.offer.description : description.classList.add('hidden');
  (offerItem.offer.rooms && offerItem.offer.guests) ? capacity.textContent = `${offerItem.offer.rooms} комнаты для ${offerItem.offer.guests} гостей` : capacity.classList.add('hidden');
  (offerItem.offer.checkin && offerItem.offer.checkout) ? time.textContent = `Заезд после ${offerItem.offer.checkin}, выезд до ${offerItem.offer.checkout}` : time.classList.add('hidden');

  const features = offerItem.offer.features;
  if (features.length) {
    const featuresFragment = document.createDocumentFragment();

    features.forEach((feature) => {
      const featureItem = featuresList.querySelector(`.popup__feature--${feature}`);
      if (featureItem) {
        featuresFragment.appendChild(featureItem);
      }
    });
    featuresList.innerHTML = '';
    featuresList.appendChild(featuresFragment);
  } else {
    featuresList.classList.add('hidden');
  }

  const photos = offerItem.offer.photos;
  if (photos.length) {
    const photoTemplate = photosList.querySelector('.popup__photo');
    photosList.innerHTML = '';
    photos.forEach((photo) => {
      const photoItem = photoTemplate.cloneNode(false);
      photoItem.src = photo;
      photosList.appendChild(photoItem);
    });
  } else {
    photosList.classList.add('hidden');
  }

  return offerElement;
};

export {offers, createOfferElement};
