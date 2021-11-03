import {showPopup} from './utils/show-popup.js';
import {sendData} from './api.js';
import {setMainPinMarker, setStartAddress, drawOffers} from './map.js';
import {setHandlers, removeHandlers} from './validate-form.js';

const formNotice = document.querySelector('.ad-form');
const formFilters = document.querySelector('.map__filters');
const clearButton = formNotice.querySelector('.ad-form__reset');

const onClearForm = () => {
  formNotice.reset();
  formFilters.reset();
  setStartAddress();
  setMainPinMarker();
  drawOffers();
};

const onClearButtonClick = (evt) => {
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
    formNotice.addEventListener('submit', onFormSubmit);
    clearButton.addEventListener('click', onClearButtonClick);
    setHandlers();
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
    formNotice.removeEventListener('submit', onFormSubmit);
    clearButton.removeEventListener('click', onClearButtonClick);
    removeHandlers();
  }
};

export {makeFormActive, makeFormDisabled};
