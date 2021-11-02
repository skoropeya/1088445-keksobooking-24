import {drawMap} from './map.js';
import {formNotice, formFilters, makeFormDisabled} from './forms.js';

document.addEventListener('DOMContentLoaded', () => {
  makeFormDisabled(formNotice);
  makeFormDisabled(formFilters);
  drawMap();
});
