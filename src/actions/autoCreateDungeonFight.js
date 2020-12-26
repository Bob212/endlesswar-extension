let autofightCreateWait = false;
let needToWearCostume = true;

import { getCookie, currentHp, maxHp, currentMana, maxMana } from '../utils.js';
import { fetchFood, putOnWear } from '../actions.js';
import { handleAttackFromStack } from './dungeon-walker/index.js';

export const autoCreateDungeonFight = () => {
  if (autofightCreateWait) return;

  const autocreate_with_bot = getCookie('ext-carnage-auto-create-dungeon-fight') == 'true';
  if (!autocreate_with_bot) return;
  if (!frames[2] || !frames[2].document) return;

  let locationStr = frames[2].document.location.href;

  if (locationStr.includes('https://avalon.endlesswar.ru/fbattle.php')) return
  if ( maxHp() != +getCookie('ext-carnage-mymaxhp') ) return;
  if (localStorage.dungeonMonstersStack === '') return;

  if (needToWearCostume) {
    needToWearCostume = false;

    putOnWear()

    setTimer(7)
    return;
  }

  if (
      (
        ( currentHp() <= (maxHp() / 1.5) ) ||
        ( currentMana() <= (maxMana() / 1.5) )
      )
    ) {

    console.log('Need to USE Food');

    fetchFood();

    setTimer(10)

    return;
  }

  handleAttackFromStack()
  needToWearCostume = true;

  console.log('Идем в бой');

  setTimer(30)
};


const setTimer = (secNum) => {
  autofightCreateWait = true;

  setTimeout(() => {
    autofightCreateWait = false;
  }, 1000 * secNum);
}