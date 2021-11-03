const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const formNotice = document.querySelector('.ad-form');
const chooserAvatar = formNotice.querySelector('#avatar');
const previewAvatar = formNotice.querySelector('.ad-form-header__preview img');

chooserAvatar.addEventListener('change', () => {
  const file = chooserAvatar.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some( (type) => fileName.endsWith(type));

  if (matches) {
    previewAvatar.src = URL.createObjectURL(file);
  }
});
