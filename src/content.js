console.log('Endlesswar extension is now working');
// const myNickName = 'SICKO MODE';
// const avatar_url = 'http://img.carnage.ru/i/obraz/0_IND0012M.jpg';
let needToReloadWindow = false;

// #################### HELPERS


import { getCookie, setCookie, deleteCookie, checkCookie, getIdentificator, currentHp, maxHp, currentMana, maxMana } from './utils.js';
import { reloadPage, pasteChat } from './helpers.js';
import { spinDemiurgsWheel, clearChat, hospitalCure, shadowFight, haotFightCreate } from './actions.js';

import { autoCreateFight } from './actions/autoCreateFight.js';
import { autofight } from './actions/autofight/index.js';


// #################### MAIN functions

const main_interval = setInterval(() => {
  autofight();
  autoCreateFight(needToReloadWindow);
}, 1500);

setTimeout(() => {
  needToReloadWindow = true;
}, 60000 * 10) // 10 minutes

pasteChat();

// #################### COOKIE button setters | must be placed in the bottom

window.setInterval(checkCookie, 100); // run every 100 ms
