const ALERT_SHOW_TIME = 5000;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 410;
  alertContainer.style.position = 'absolute';
  alertContainer.style.width = '1200px';
  alertContainer.style.top = '10%';
  alertContainer.style.bottom = 'auto';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '25px';
  alertContainer.style.fontWeight = 'bold';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'rgba(235, 110, 110, 0.7)';
  alertContainer.style.color = '#353535';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {showAlert};
