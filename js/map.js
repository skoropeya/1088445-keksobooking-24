import {makeFormActive} from './forms.js';
import {
  applyFilters,
  setFilterTypeChange,
  setFilterPriceChange,
  setFilterRoomsChange,
  setFilterGuestsChange,
  setFilterFeaturesChange
} from './filter.js';
import {createOfferElement} from './generate-elements.js';
import {getData} from './api.js';
import {showAlert} from './utils.js';

const START_LAT = 35.67;
const START_LNG = 139.75;
const SCALE = 12;
const OFFER_COUNT = 10;

const formNotice = document.querySelector('.ad-form');
const formFilters = document.querySelector('.map__filters');
const address = formNotice.querySelector('#address');

let firstOffers;

const map = L.map('map-canvas');

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const pinIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainPinMarker = L.marker(
  {
    lat: START_LAT,
    lng: START_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  })
  .on('move', (evt) => {
    const {lat, lng} = evt.target.getLatLng();
    address.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  });

const markerGroup = L.layerGroup().addTo(map);

const setStartAddress = () => {
  address.value = `${START_LAT.toFixed(5)}, ${START_LNG.toFixed(5)}`;

  map.setView({
    lat: START_LAT,
    lng: START_LNG,
  }, SCALE);
};

const setMainPinMarker = () => {
  mainPinMarker.setLatLng({
    lat: START_LAT,
    lng: START_LNG,
  });
};

const drawMap = () => {
  map.setView({
    lat: START_LAT,
    lng: START_LNG,
  }, SCALE);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  setStartAddress();

  mainPinMarker.addTo(map);
};

const drawOffers = (offers = firstOffers) => {
  markerGroup.clearLayers();

  offers.slice(0, OFFER_COUNT).forEach((offerItem) => {
    const offerLat = offerItem.location.lat;
    const offerLng = offerItem.location.lng;

    const pinMarker = L.marker(
      {
        lat: offerLat,
        lng: offerLng,
      },
      {
        icon: pinIcon,
      },
    );
    pinMarker.addTo(markerGroup).bindPopup(createOfferElement(offerItem));
  });
};

map.on('load', () => {
  makeFormActive(formNotice);

  getData( (offers) => {

    firstOffers = offers.slice(0, OFFER_COUNT);

    drawOffers(offers);
    makeFormActive(formFilters);

    setFilterTypeChange( () => drawOffers(applyFilters(offers)));
    setFilterPriceChange( () => drawOffers(applyFilters(offers)));
    setFilterRoomsChange( () => drawOffers(applyFilters(offers)));
    setFilterGuestsChange( () => drawOffers(applyFilters(offers)));
    setFilterFeaturesChange( () => drawOffers(applyFilters(offers)));

  },  showAlert);
});

export {drawMap, drawOffers, setMainPinMarker, setStartAddress};
