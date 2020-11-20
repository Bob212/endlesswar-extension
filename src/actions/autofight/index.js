import { getCookie, currentMana, currentHp, maxMana } from '../../utils.js';
import { reloadPage } from '../../helpers.js'; 
import { needToReloadWindow } from '../../content.js';

let isFightJustStarted = false;
let needToWaitInFight = false;
let beginningDelay = false;

let callDragonsInFight = false; // TODO
let needToUseMana = false; // TODO
let needToUseHeal = false;

const manaUses = {
  // current: 0,
  max: 0,
};
// now: manaUses.current === localStorage.inThisFightCurrentManaUses

const healUses = {
  current: 0,
  max: 0,
};

const healRunes = [
  'https://img.endlesswar.ru/i/rune/8.gif', // 250 x 2
  'https://img.endlesswar.ru/i/rune/9.gif', // 500 x 1
  'https://img.endlesswar.ru/i/rune/78.gif', // 250 x 5
];

export const autofight = () => {
  const autofight_on = getCookie('ext-carnage-autofight') == 'true';
  if (!autofight_on) return;
  if (!frames[1] || !frames[1].document) return;

  let locationStr = frames[1].document.location.href;

  if (locationStr.includes('https://avalon.endlesswar.ru/fbattle.php')) {
    if (needToWaitInFight || beginningDelay) {
      console.log('Waiting...');
      return;
    }

    const name1Node = frames[1].document.querySelector('.inv-view-col .nickname .name.side-1');
    const name2Node = frames[1].document.querySelector('.inv-view-col .nickname .name.side-2');

    if (
        name1Node && name1Node.innerText === 'Злой Хряк' ||
        name2Node && name2Node.innerText === 'Злой Хряк'
      ) {
      console.log('Хряк!');
      return;
    }

    if (isFightJustStarted) {
      isFightJustStarted = false;
      localStorage.inThisFightCurrentManaUses = 0;
      localStorage.inThisFightCurrentHealUses = 0;

      callDragonsInFight = +getCookie('ext-carnage-autofight-animals');
      if (callDragonsInFight && callDragonsInFight > 0) {
        callDragonsForFight(callDragonsInFight);
      }

      const isSetBeginningDelay = +getCookie('ext-carnage-autofight-delay');
      if (isSetBeginningDelay && isSetBeginningDelay > 0) {
        beginningDelay = true;
        setTimeout(() => {
          beginningDelay = false;
        }, isSetBeginningDelay*1000);
      }

      return;
    }

    needToUseMana = +getCookie('ext-carnage-autofight-mana');
    if (needToUseMana && needToUseMana > 0) {
      manaUses.max = needToUseMana;
      if (useMana()) return;
    }

    needToUseHeal = getCookie('ext-carnage-autofight-autoheal');
    if (needToUseHeal == 'true') {
      if (useHeal()) return;
    }

    console.log('Hit an oppenent');

    if (frames[1].document.forms['bform']) {
        frames[1].document.forms['bform'].submit();
        return;
    } else if (frames[1].document.querySelector('#buttonRefresh')) {
        if (needToReloadWindow) {
          needToReloadWindow = false;
          reloadPage();
        }

        frames[1].document.querySelector('#buttonRefresh').click();
        return;
    }

    exitTheFight();
  } else {
    // console.log('not in a fight');
    isFightJustStarted = true;

    if (needToReloadWindow) {
      needToReloadWindow = false;
      reloadPage();
    }
  }
};

const exitTheFight = () => {
  if (frames[1].document.querySelector('.xbbutton')) {
    frames[1].document.querySelector('.xbbutton').click();

    isFightJustStarted = true;
    // manaUses.current = 0;
    localStorage.inThisFightCurrentManaUses = 0;
    localStorage.inThisFightCurrentHealUses = 0;
  }
};

const callDragonsForFight = (numOfCalls) => {
  needToWaitInFight = true;
  const delay = 3000;

  for(let i =0; i < numOfCalls; i++) {
    setTimeout(() => {
      console.log('Call dragon num: ', i+1);

      frames[1].location.href = 'https://avalon.endlesswar.ru/fbattle.php?cmd=ability.summon_pet';;
    }, (i+1)*delay);
  }

  setTimeout(() => {
    needToWaitInFight = false;
  }, (numOfCalls+1)*delay);
};

const useMana = () => {
  if (+localStorage.inThisFightCurrentManaUses >= manaUses.max) return false;
  const manaGap = 100;

  if (currentMana() + manaGap < maxMana()) {
    console.log('using mana')

    clickOnRuna('https://img.endlesswar.ru/i/rune/37.gif');

    // manaUses.current += 1;
    localStorage.inThisFightCurrentManaUses = +localStorage.inThisFightCurrentManaUses + 1;

    needToWaitInFight = true;

    setTimeout(() => {
      needToWaitInFight = false;
    }, 3000);

    return true;
  } else {
    return false;
  };
};

const useHeal = () => {
  healUses.max = +getCookie('ext-carnage-autoheal-num');
  healUses.current = +localStorage.inThisFightCurrentHealUses;

  if (healUses.current >= healUses.max) return false;

  const hpWhenNeedToHeal = +getCookie('ext-carnage-autoheal-minhp');

  if ( currentHp() > hpWhenNeedToHeal ) return false;

  let foundHealRune = false;

  healRunes.find(runeImg => {
    if ( clickOnRuna(runeImg) ) {
      foundHealRune = true;
      return true;
    } else {
      return false;
    }
  });

  if (foundHealRune) {
    localStorage.inThisFightCurrentHealUses = +localStorage.inThisFightCurrentHealUses + 1;

    needToWaitInFight = true;

    setTimeout(() => {
      needToWaitInFight = false;
    }, 3000);

    return true;
  } else {
    return false;
  }
};

const clickOnRuna = (src) => {
  const runesNodes = [...frames[1].document.querySelectorAll('li[data-slot-name="rune"]')];

  const finder = runesNodes.find(node => {
    const imgNode = node.querySelector('img');

    if (imgNode) {
      if (imgNode.src === src) {
        let str = '' + imgNode.getAttribute('onclick');

        let link = str.match(/window.location=(.*);}/)[1].trim();

        link = link.slice(1, -1);

        frames[1].document.location.href = `https://avalon.endlesswar.ru/${link}`;

        // https://avalon.endlesswar.ru/fbattle.php?use=9219308
        return true;
      }
    }
  });

  if (finder) return true;

  return false;
};
