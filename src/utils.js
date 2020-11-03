export const getCookie = (name) => {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
};


export const setCookie = (name, value, options = {}) => {
  options = {
    path: '/',
    // при необходимости добавьте другие значения по умолчанию
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
};


export const deleteCookie = (name) => {
  setCookie(name, "", {
    'max-age': -1
  })
}


export const getIdentificator = () => {
  let cookieName = 'identifND';

  if (sessionStorage[cookieName]) {
    return +sessionStorage[cookieName];
  }

  if (!frames[1].document.querySelector('input[name="nd"]')) {
    frames[1].document.location.href = `https://avalon.endlesswar.ru/inventory.php?${Math.random()}`
    console.log('Нужно зайти в инвентарь!');
    return false;
  }

  let identificator = frames[1].document.querySelector('input[name="nd"]').value;

  sessionStorage[cookieName] = `${identificator}`

  return identificator
};

export const currentHp = () => {
  return +frames[0].document.querySelector('#dvhp').innerText;
};

export const maxHp = () => {
  return +frames[0].document.querySelector('#dvmaxhp').innerText;
};

export const currentMana = () => {
  return +frames[0].document.querySelector('#dvmana').innerText;
};

export const maxMana = () => {
  return +frames[0].document.querySelector('#dvmaxmana').innerText;
};
