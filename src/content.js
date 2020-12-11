console.log('Endlesswar extension is now working');
// const myNickName = 'SICKO MODE';
// const avatar_url = 'http://img.carnage.ru/i/obraz/0_IND0012M.jpg';
export let needToReloadWindow = false;

// #################### HELPERS

import { checkCookie } from './utils.js';
import { pasteChat } from './helpers.js';

import { autoCreateFight } from './actions/autoCreateFight.js';
import { autofight } from './actions/autofight/index.js';
import { goldDigger } from './actions/gold-digger/index.js';


// #################### MAIN functions

const main_interval = setInterval(() => {
  autofight();
  autoCreateFight();
  goldDigger();
}, 1500);

setTimeout(() => {
  needToReloadWindow = true;
}, 60000 * 10) // 10 minutes

pasteChat();

// #################### COOKIE button setters | must be placed in the bottom

window.setInterval(checkCookie, 100); // run every 100 ms
