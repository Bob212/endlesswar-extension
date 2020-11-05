const url = 'https://avalon.endlesswar.ru/';

selectCheckboxBeforeOpen = (cookieName, domIdentificator) => {
  chrome.cookies.get({
    url,
    'name': cookieName,
  }, (res) => {
    if (res && res.value == 'true') {
      document.querySelector(domIdentificator).click();
    }
  });
};

setInputBeforeOpen = (cookieName, domIdentificator) => {
  chrome.cookies.get({
    url,
    'name': cookieName,
  }, (res) => {
    if (res && res.value) {
      document.querySelector(domIdentificator).value = +res.value;
    }
  });
};

addListenerToCheckbox = (cookieName, domElement) => {
  domElement.addEventListener('change', (e) => {
    chrome.cookies.set({
        url,
        'name': cookieName,
        'value': `${e.target.checked}`,
    });
  });
};

addListenerToInput = (cookieName, domElement) => {
  domElement.addEventListener('change', (e) => {
    chrome.cookies.set({
        url,
        'name': cookieName,
        'value': `${e.target.value}`,
    });
  });
};

addListenerToButton = (cookieName, domIdentificator) => {
  document.querySelector(domIdentificator).addEventListener('click', (e) => {
    chrome.cookies.set({
        url,
        'name': cookieName,
        'value': 'true',
    });
  });
};

const cookieDomMatch = [
  { cookie: 'ext-carnage-spin-wheel', domElement: '#spin-wheel', isButton: true },
  { cookie: 'ext-carnage-shadow-fight', domElement: '#shadow-fight', isButton: true },
  { cookie: 'ext-carnage-haot-fight-create', domElement: '#haot-fight-create', isButton: true },
  { cookie: 'ext-carnage-hospital-cure', domElement: '#hospital-cure', isButton: true },
  { cookie: 'ext-carnage-clear-chat', domElement: '#clear-chat', isButton: true },

  { cookie: 'ext-carnage-autofight-animals', domElement: '#autofight-animals', isInput: true },
  { cookie: 'ext-carnage-autofight-mana', domElement: '#autofight-mana', isInput: true },
  { cookie: 'ext-carnage-autofight-delay', domElement: '#autofight-delay', isInput: true },
  { cookie: 'ext-carnage-mymaxhp', domElement: '#mymaxhp', isInput: true },
  { cookie: 'ext-carnage-autoheal-num', domElement: '#autofight-autoheal-num', isInput: true },
  { cookie: 'ext-carnage-autoheal-minhp', domElement: '#autofight-autoheal-min-hp', isInput: true },

  { cookie: 'ext-carnage-autofight', domElement: '#autofight-check' },
  { cookie: 'ext-carnage-auto-create-haot-fight', domElement: '#auto-create-fight-haot' },
  { cookie: 'ext-carnage-auto-reload-page', domElement: '#auto-reload-page' },
  { cookie: 'ext-carnage-auto-regeneration-in-hospital', domElement: '#auto-regeneration-in-hospital' },
  { cookie: 'ext-carnage-autofight-autoheal', domElement: '#autofight-autoheal' },
  // { cookie: 'ext-carnage-autocreate-fight-with-shadow', domElement: "#auto-create-fight-with-bot" },
];

cookieDomMatch.forEach((el) => {
  if (el.isButton) {
    addListenerToButton(el.cookie, el.domElement);
  } else if (el.isInput) {
    // for input
    setInputBeforeOpen(el.cookie, el.domElement);
    const inputNode = document.querySelector(el.domElement);
    addListenerToInput(el.cookie, inputNode);
  } else {
    // for checkbox
    selectCheckboxBeforeOpen(el.cookie, el.domElement);
    const inputNode = document.querySelector(el.domElement);
    addListenerToCheckbox(el.cookie, inputNode);
  }
});
