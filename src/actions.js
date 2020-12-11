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
  frames[3].frames[1].document.querySelector('#chat-channels').children[1].innerHTML = ``;
  localStorage.avalonMessages = '';
};

export const hospitalCure = () => {
  let identificator = getIdentificator();
  if (!identificator) return;

  console.log('Hospital Cure');
  frames[2].document.location.href = `https://avalon.endlesswar.ru/hospital.php?cmd=hospital.show&set=recovery&nd=${identificator}&${Math.random()}`
};


export const shadowFight = () => {
  console.log('Fighting with Shadow!');
  frames[2].document.location.href = `https://avalon.endlesswar.ru/zayavka.php?level=duel&duel_shadow=1`;
};

export const haotFightCreate = () => {
  let identificator = getIdentificator();

  if (!identificator) return false;

  console.log('Creating haot fight');
  // frames[2].document.location.href = `https://avalon.endlesswar.ru/zayavka.php?nd=${identificator}&cmd=haot.create&gradesmembers=3&startime2=3&timeout=3&cmt=&open=1`
  frames[2].document.location.href = `https://avalon.endlesswar.ru/zayavka.php?nd=${identificator}&cmd=haot.create&gradesmembers=3&startime2=3&timeout=3&blood=1&cmt=&open=1`

  // frames[2].document.location.href = `https://avalon.endlesswar.ru/map.php?cmd=hell`;

  return true;
};
