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
  // Buttons
  { cookie: 'ext-carnage-spin-wheel', domElement: '#spin-wheel', isButton: true },
  { cookie: 'ext-carnage-shadow-fight', domElement: '#shadow-fight', isButton: true },
  { cookie: 'ext-carnage-haot-fight-create', domElement: '#haot-fight-create', isButton: true },
  { cookie: 'ext-carnage-hospital-cure', domElement: '#hospital-cure', isButton: true },
  { cookie: 'ext-carnage-clear-chat', domElement: '#clear-chat', isButton: true },
  { cookie: 'ext-carnage-create-dungeon-map', domElement: '#insert-map', isButton: true },
  { cookie: 'ext-carnage-get-stats', domElement: '#get-stats', isButton: true },
  { cookie: 'ext-carnage-save-stats', domElement: '#save-stats', isButton: true },
  { cookie: 'ext-carnage-use-food', domElement: '#use-food', isButton: true },

  // Inputs
  { cookie: 'ext-carnage-autofight-animals', domElement: '#autofight-animals', isInput: true },
  { cookie: 'ext-carnage-autofight-mana', domElement: '#autofight-mana', isInput: true },
  { cookie: 'ext-carnage-autofight-delay', domElement: '#autofight-delay', isInput: true },
  { cookie: 'ext-carnage-mymaxhp', domElement: '#mymaxhp', isInput: true },
  { cookie: 'ext-carnage-autoheal-num', domElement: '#autofight-autoheal-num', isInput: true },
  { cookie: 'ext-carnage-autoheal-minhp', domElement: '#autofight-autoheal-min-hp', isInput: true },

  // Stats
  { cookie: 'ext-carnage-getstats-str', domElement: '#stats-sila', isInput: true },
  { cookie: 'ext-carnage-getstats-dex', domElement: '#stats-lovk', isInput: true },
  { cookie: 'ext-carnage-getstats-suc', domElement: '#stats-inta', isInput: true },
  { cookie: 'ext-carnage-getstats-end', domElement: '#stats-vinos', isInput: true },
  { cookie: 'ext-carnage-getstats-int', domElement: '#stats-intel', isInput: true },
  { cookie: 'ext-carnage-getstats-sta', domElement: '#stats-stats', isInput: true },

  // Checkboxes
  { cookie: 'ext-carnage-autofight', domElement: '#autofight-check' },
  { cookie: 'ext-carnage-auto-create-haot-fight', domElement: '#auto-create-fight-haot' },
  { cookie: 'ext-carnage-auto-create-dungeon-fight', domElement: '#auto-create-fight-dungeon' },
  { cookie: 'ext-carnage-auto-reload-page', domElement: '#auto-reload-page' },
  { cookie: 'ext-carnage-auto-regeneration-in-hospital', domElement: '#auto-regeneration-in-hospital' },
  { cookie: 'ext-carnage-autofight-autoheal', domElement: '#autofight-autoheal' },
  { cookie: 'ext-carnage-auto-gold-digger', domElement: '#auto-gold-digger' },
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

document.querySelector('#get-stats').addEventListener('click', () => {
  setTimeout(() => {
    chrome.cookies.getAll({
        url,
    }, (el) => {
      let str = el.find((oneEl) => oneEl.name === 'ext-carnage-getstats-str')
      let dex = el.find((oneEl) => oneEl.name === 'ext-carnage-getstats-dex')
      let suc = el.find((oneEl) => oneEl.name === 'ext-carnage-getstats-suc')
      let end = el.find((oneEl) => oneEl.name === 'ext-carnage-getstats-end')
      let int = el.find((oneEl) => oneEl.name === 'ext-carnage-getstats-int')

      document.querySelector('#stats-sila').value = str.value
      document.querySelector('#stats-lovk').value = dex.value
      document.querySelector('#stats-inta').value = suc.value
      document.querySelector('#stats-vinos').value = end.value
      document.querySelector('#stats-intel').value = int.value
    });
  }, 500)
});


document.querySelector('#collapseThree').addEventListener('click', (el) => {
  console.log(el.target)
})