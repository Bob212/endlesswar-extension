let autofightCreateWait = false;
import { getCookie, currentHp, maxHp, currentMana, maxMana } from '../utils.js';
import { haotFightCreate, hospitalCure } from '../actions.js';

export const autoCreateFight = () => {
  if (autofightCreateWait) return;

  const autocreate_with_bot = getCookie('ext-carnage-auto-create-haot-fight') == 'true';
  if (!autocreate_with_bot) return;
  if (!frames[2] || !frames[2].document) return;

  let locationStr = frames[2].document.location.href;

  if (locationStr.includes('https://avalon.endlesswar.ru/fbattle.php')) return
  if ( maxHp() != +getCookie('ext-carnage-mymaxhp') ) return;

  // if (
  //     ( currentHp() + 150 <= maxHp() ) ||
  //     ( currentMana() + 150 <= maxMana() )
  //   ) {

    if (
        (
          ( currentHp() <= (maxHp() / 1.3) ) ||
          ( currentMana() <= (maxMana() / 1.3) )
        ) && getCookie('ext-carnage-auto-regeneration-in-hospital') === 'true'
      ) {
      console.log('Need to USE hospital');

      hospitalCure();

      autofightCreateWait = true;

      setTimeout(() => {
        autofightCreateWait = false;
      }, 1000 * 5); // 5 sec

      return;
    }

    // console.log('Regeneration...');
    // return;

  // }

  if ( !haotFightCreate() ) return

  console.log('Создаем заявку на бой');
  autofightCreateWait = true;

  setTimeout(() => {
    autofightCreateWait = false;
  }, 60 * 1000 * 1.5); // 1.5 mins

};
