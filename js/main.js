import {drawMap, drawOffers} from './map.js';
import {makeFormDisabled} from './forms.js';
import {getData} from './api.js';
import {showAlert} from './utils.js';

const formNotice = document.querySelector('.ad-form');
const formFilters = document.querySelector('.map__filters');

const OFFER_COUNT = 10;

document.addEventListener('DOMContentLoaded', () => {
  makeFormDisabled(formNotice);
  makeFormDisabled(formFilters);
  drawMap();
});

getData( (offers) => {
  drawOffers(offers.slice(0, OFFER_COUNT));
}, showAlert);
