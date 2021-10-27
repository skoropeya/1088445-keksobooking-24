import {drawMap} from './map.js';
import {makeFormDisabled} from './forms.js';

const formNotice = document.querySelector('.ad-form');
const formFilters = document.querySelector('.map__filters');

document.addEventListener('DOMContentLoaded', () => {
  makeFormDisabled(formNotice);
  makeFormDisabled(formFilters);
});

drawMap();
