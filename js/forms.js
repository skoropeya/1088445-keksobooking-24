
const formNotice = document.querySelector('.ad-form');
const formFilters = document.querySelector('.map__filters');

const findInteractiveElements = (form) => {
  const allInput = form.querySelectorAll('input');
  const allSelect = form.querySelectorAll('select');
  const allTextarea = form.querySelectorAll('textarea');
  const allButton = form.querySelectorAll('button');
  const allInteractiveElements = [];

  allInput.forEach((element) => {
    allInteractiveElements.push(element);
  });
  allSelect.forEach((element) => {
    allInteractiveElements.push(element);
  });
  allTextarea.forEach((element) => {
    allInteractiveElements.push(element);
  });
  allButton.forEach((element) => {
    allInteractiveElements.push(element);
  });

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
