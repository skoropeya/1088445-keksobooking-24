
const formNotice = document.querySelector('.ad-form');
const formFilters = document.querySelector('.map__filters');
const type = formNotice.querySelector('#type');
const price = formNotice.querySelector('#price');
const roomNumber = formNotice.querySelector('#room_number');
const capacityValues = formNotice.querySelectorAll('#capacity option');

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

const onRoomsChange = () => {
  const allowableCapacity = ROOM_CAPACITY[roomNumber.value];
  capacityValues.forEach((element) => {
    element.setAttribute('disabled', true);
    element.removeAttribute('selected');
  });

  capacityValues.forEach((element) => {
    allowableCapacity.forEach((rooms) => {
      if (+element.value === rooms) {
        element.removeAttribute('disabled');
        element.setAttribute('selected', true);
      }
    });
  });
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
    roomNumber.addEventListener('change', onRoomsChange);
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
    roomNumber.removeEventListener('change', onRoomsChange);
  }
};

makeFormDisabled(formNotice);
makeFormDisabled(formFilters);
makeFormActive(formNotice);
makeFormActive(formFilters);
