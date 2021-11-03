const showPopup = (status) => {
  const templatePopup = document.querySelector(`#${status}`).content.querySelector(`.${status}`);
  const popup = templatePopup.cloneNode(true);
  document.body.insertAdjacentElement('beforeend', popup);

  document.addEventListener('click',
    () => popup.remove(),
    {once: true},
  );

  document.addEventListener('keydown',
    (evt) => {
      if (evt.key === 'Escape') {
        popup.remove();
      }
    },
    {once: true},
  );
};

export {showPopup};
