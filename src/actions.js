import { getIdentificator, setCookie, getCookie } from './utils.js';

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
  // frames[2].document.location.href = `https://avalon.endlesswar.ru/zayavka.php?nd=${identificator}&cmd=haot.create&gradesmembers=3&startime2=3&timeout=3&cmt=&open=1` // не кровавый
  frames[2].document.location.href = `https://avalon.endlesswar.ru/zayavka.php?nd=${identificator}&cmd=haot.create&gradesmembers=3&startime2=3&timeout=3&blood=1&cmt=&open=1` // кровавый только мой уровень
  // frames[2].document.location.href = `https://avalon.endlesswar.ru/zayavka.php?nd=${identificator}&cmd=haot.create&gradesmembers=6&startime2=3&timeout=3&blood=1&cmt=&open=1` // кровавый +-1 уровень

  // frames[2].document.location.href = `https://avalon.endlesswar.ru/map.php?cmd=hell`;

  return true;
};

export const setCurrentStatsToCookie = () => {
  const str = +frames[2].document.querySelector('#str').innerText; // сила
  const dex = +frames[2].document.querySelector('#dex').innerText; // ловкоть
  const suc = +frames[2].document.querySelector('#suc').innerText; // инстинкт
  const end = +frames[2].document.querySelector('#end').innerText; // жизни
  const int = +frames[2].document.querySelector('#int').innerText; // интеллект

  setCookie('ext-carnage-getstats-str', str)
  setCookie('ext-carnage-getstats-dex', dex)
  setCookie('ext-carnage-getstats-suc', suc)
  setCookie('ext-carnage-getstats-end', end)
  setCookie('ext-carnage-getstats-int', int)

  console.log('Stats get from the game')
};

export const fetchStats = async () => {
  let formData  = new FormData();

  let data = {
    cmd: 'learning.save',
    sila: getCookie('ext-carnage-getstats-str'),
    lovk: getCookie('ext-carnage-getstats-dex'),
    inta: getCookie('ext-carnage-getstats-suc'),
    vinos: getCookie('ext-carnage-getstats-end'),
    intel: getCookie('ext-carnage-getstats-int'),
    mudra: 0,
    stats: getCookie('ext-carnage-getstats-sta'),
  }

  for(let name in data) {
    formData.append(name, data[name]);
  }

  let response = await fetch(`https://avalon.endlesswar.ru/inventory.php`, {
  method: 'POST',
  body: formData
  });

  let res = await response.json()
  console.log(res)
};

export const fetchFood = async () => {
  let formData = new FormData();

  let data = {
    back: 'foods',
    is_ajax: '1',
    nd: getCookie('nd'),
  }

  for (let name in data) {
    formData.append(name, data[name]);
  }

  let response = await fetch(`https://avalon.endlesswar.ru/inventory.php`, {
    method: 'POST',
    body: formData
  });

  let res = await response.text()

  let container = document.createElement('div');
  container.innerHTML = res;

  // foodId === 'qwe-xxxxx'
  let foodId = container.querySelector('img[title="Бутерброд с отбивной"], img[title="Бутерброд с колбасой"]').parentElement.parentElement.parentElement.getAttribute('id');

  if (!foodId) {
    console.log('Нет еды');
    return
  }

  foodId = foodId.slice(4)

  await fetch(`https://avalon.endlesswar.ru/inventory.php?cmd=stack.rune_use&back=runes&entry=${foodId}`)

  console.log(`Использовал еду: ${foodId}`)
}

export const putOnWear = async () => {
  frames[0].document.querySelector(`img[title="Надеть комплект 'Dungeon'"]`).parentElement.click()
}
