
const formNotice = document.querySelector('.ad-form');
const formFilters = document.querySelector('.map__filters');

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
  form.classList.toggle(`${baseClass}--disabled`);

  const allInteractiveElements = findInteractiveElements(form);

  allInteractiveElements.forEach((element) => {
    element.removeAttribute('disabled');
  });
};

const makeFormDisabled = (form) => {
  const baseClass = form.classList[0];
  form.classList.toggle(`${baseClass}--disabled`);

  const allInteractiveElements = findInteractiveElements(form);

  allInteractiveElements.forEach((element) => {
    element.setAttribute('disabled', true);
  });
};

makeFormDisabled(formNotice);
makeFormDisabled(formFilters);
makeFormActive(formNotice);
makeFormActive(formFilters);
