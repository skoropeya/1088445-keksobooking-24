import {showPopup} from './utils.js';
import {sendData} from './api.js';
import {setMainPinMarker, setStartAddress} from './map.js';

const formNotice = document.querySelector('.ad-form');
const type = formNotice.querySelector('#type');
const price = formNotice.querySelector('#price');
const roomNumber = formNotice.querySelector('#room_number');
const capacity = formNotice.querySelector('#capacity');
const timeIn = formNotice.querySelector('#timein');
const timeOut = formNotice.querySelector('#timeout');
const clearButton = formNotice.querySelector('.ad-form__reset');

const MIN_PRICE = {
  'palace': 10000,
  'flat': 1000,
  'house': 5000,
  'bungalow': 0,
  'hotel': 3000,
};

const ROOM_CAPACITY = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const onTypeChange = () => {
  const minPrice = MIN_PRICE[type.value];
  price.min = minPrice;
  price.placeholder = minPrice;
};

const onTimeInChange = () => {
  timeOut.value = timeIn.value;
};

const onTimeOutChange = () => {
  timeIn.value = timeOut.value;
};

const checkRoomsCapacity = (rooms, capacities) => {
  const allowedCapacity = ROOM_CAPACITY[rooms];
  const isValidFields = allowedCapacity.includes(capacities);
  let message = '';
  if (!isValidFields) {
    switch (rooms) {
      case 1:
        message = '1 комната предназначена только для 1 гостя';
        break;
      case 2:
        message = '2 комнаты предназначены для 2 гостей или для 1 гостя';
        break;
      case 3:
        message = '3 комнаты предназначены для 3 гостей, для 2 гостей или для 1 гостя';
        break;
      case 100:
        message = '100 комнат не для гостей';
        break;
      default:
        message = 'Произошла ошибка';
    }
  }
  return {isValidFields, message};
};

const onRoomsCapacityChange = () => {
  const roomValue = +roomNumber.value;
  const capacityValue = +capacity.value;
  const {isValidFields, message} = checkRoomsCapacity(roomValue, capacityValue);
  roomNumber.setCustomValidity(message);

  return isValidFields;
};

const onClearForm = () => {
  formNotice.reset();
  setStartAddress();
  setMainPinMarker();
};

const onclearButtonClick = (evt) => {
  evt.preventDefault();
  onClearForm();
};

const onFormSubmit = (evt) => {
  evt.preventDefault();

  sendData(
    () => {
      showPopup('success');
      onClearForm();
    },

    () => showPopup('error'),

    new FormData(evt.target),
  );
};

const findInteractiveElements = (form) => {
  const allInputs = form.querySelectorAll('input');
  const allSelects = form.querySelectorAll('select');
  const allTextareas = form.querySelectorAll('textarea');
  const allButtons = form.querySelectorAll('button');
  const allInteractiveElements = [...allInputs, ...allSelects, ...allTextareas, ...allButtons];

  return allInteractiveElements;
};

const makeFormActive = (form) => {
  const baseClass = form.classList[0];
  form.classList.remove(`${baseClass}--disabled`);

  const allInteractiveElements = findInteractiveElements(form);

  allInteractiveElements.forEach((element) => {
    element.removeAttribute('disabled');
  });

  if (form.classList.contains('ad-form')) {
    type.addEventListener('change', onTypeChange);
    formNotice.addEventListener('submit', onFormSubmit);
    timeIn.addEventListener('change', onTimeInChange);
    timeOut.addEventListener('change', onTimeOutChange);
    roomNumber.addEventListener('change', onRoomsCapacityChange);
    capacity.addEventListener('change', onRoomsCapacityChange);
    clearButton.addEventListener('click', onclearButtonClick);
  }
};

const makeFormDisabled = (form) => {
  const baseClass = form.classList[0];
  form.classList.add(`${baseClass}--disabled`);

  const allInteractiveElements = findInteractiveElements(form);

  allInteractiveElements.forEach((element) => {
    element.setAttribute('disabled', true);
  });

  if (form.classList.contains('ad-form')) {
    type.removeEventListener('change', onTypeChange);
    formNotice.removeEventListener('submit', onFormSubmit);
    timeIn.removeEventListener('change', onTimeInChange);
    timeOut.removeEventListener('change', onTimeOutChange);
    roomNumber.removeEventListener('change', onRoomsCapacityChange);
    capacity.removeEventListener('change', onRoomsCapacityChange);
    clearButton.removeEventListener('click', onclearButtonClick);
  }
};

export {formNotice, makeFormActive, makeFormDisabled};
