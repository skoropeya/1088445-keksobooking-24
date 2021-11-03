const formNotice = document.querySelector('.ad-form');
const type = formNotice.querySelector('#type');
const price = formNotice.querySelector('#price');
const roomNumber = formNotice.querySelector('#room_number');
const capacity = formNotice.querySelector('#capacity');
const timeIn = formNotice.querySelector('#timein');
const timeOut = formNotice.querySelector('#timeout');

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

const setHandlers = () => {
  type.addEventListener('change', onTypeChange);
  timeIn.addEventListener('change', onTimeInChange);
  timeOut.addEventListener('change', onTimeOutChange);
  roomNumber.addEventListener('change', onRoomsCapacityChange);
  capacity.addEventListener('change', onRoomsCapacityChange);
};

const removeHandlers = () => {
  type.removeEventListener('change', onTypeChange);
  timeIn.removeEventListener('change', onTimeInChange);
  timeOut.removeEventListener('change', onTimeOutChange);
  roomNumber.removeEventListener('change', onRoomsCapacityChange);
  capacity.removeEventListener('change', onRoomsCapacityChange);
};

export {setHandlers, removeHandlers};
