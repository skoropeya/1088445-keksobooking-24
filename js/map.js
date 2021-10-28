import {makeFormActive} from './forms.js';
import {offers, createOfferElement} from './generate-elements.js';

const formNotice = document.querySelector('.ad-form');
const address = formNotice.querySelector('#address');

// Начальная точка
const START_LAT = 35.67;
const START_LNG = 139.75;

const SCALE = 12;

const drawMap = () => {
  address.value = `${START_LAT.toFixed(5)}, ${START_LNG.toFixed(5)}`;

  const map = L.map('map-canvas')
    .on('load', () => {
      makeFormActive(formNotice);
    })
    .setView({
      lat: START_LAT,
      lng: START_LNG,
    }, SCALE);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

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
    },
  );

  mainPinMarker.addTo(map);

  mainPinMarker.on('move', (evt) => {
    const {lat, lng} = evt.target.getLatLng();
    address.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  });

  offers.forEach((offerItem) => {
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
    pinMarker.addTo(map).bindPopup(createOfferElement(offerItem));
  });
};

export {drawMap};
