import { getIdentificator } from './utils.js';

export const spinDemiurgsWheel = async () => {
  let identificator = getIdentificator();

  if (!identificator) return;

  console.log('Крутим колесо');

  let rand = Math.random();

  let response = await fetch(`https://avalon.endlesswar.ru/wheel.php?cmd=wheel.turn&nd=${identificator}&${rand}`, {
    method: "GET",
    referrer: "https://avalon.endlesswar.ru/lotery.php",
  });

  let responseInnerData = '';

  if (response.ok) { // если HTTP-статус в диапазоне 200-299
    responseInnerData = await response.text()
  } else {
    alert("Ошибка HTTP: " + response.status);
  }

  let tempDom = document.createElement('p');
  tempDom.innerHTML = responseInnerData;

  console.log('Result: ', tempDom.children[0].children[0].getAttribute('text'))
};

export const clearChat = () => {
  frames[2].frames[1].document.querySelector('#chat-channels').children[1].innerHTML = ``;
  localStorage.avalonMessages = '';
};
