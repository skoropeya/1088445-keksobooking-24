import {drawMap} from './map.js';
import {formNotice, formFilters, makeFormDisabled} from './forms.js';
import './avatar.js';

document.addEventListener('DOMContentLoaded', () => {
  makeFormDisabled(formNotice);
  makeFormDisabled(formFilters);
  drawMap();
});
