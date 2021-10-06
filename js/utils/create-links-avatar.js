// формирует массив со ссылками на аватары пользователей
const QUANTITY_AUTHORS = 10;
const createLinksAvatar = () => {
  const avatars = [];
  for (let i = 1; i <= QUANTITY_AUTHORS; i++) {
    if (i < 10) {
      avatars.push(`img/avatars/user0${  i  }.png`);
    } else {
      avatars.push(`img/avatars/user${  i  }.png`);
    }
  }
  return avatars;
};

const authorAvatars = createLinksAvatar();

export {authorAvatars};
