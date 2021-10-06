import './map.js';
import './form-notice.js';
import {createOffer} from './utils/create-offer.js';

const OFFERS_COUNT = 10;

const offers = Array.from({length: OFFERS_COUNT}, createOffer);
offers;
