import { getIdentificator } from '../../utils.js';

const resDungeon = async (resStr) => {
  let response = await fetch(resStr, {
    method: "GET",
  });

  let responseInnerData = null;

  if (response.ok) {
    responseInnerData = await response.text()
  } else {
    alert("Ошибка HTTP: " + response.status);
  }

  // console.log(responseInnerData)

  return responseInnerData;

  // const tempDom = document.createElement('div');
  // tempDom.innerHTML = responseInnerData;
}

const handleMoveGame = async (action) => {
  const identificator = getIdentificator();
  if ( !identificator ) return false;

  return await resDungeon(`https://avalon.endlesswar.ru/dungeon_xml.php?cmd=moveXML&direction=${action}&nd=${identificator}&${Math.random()}`);
};

export const handleUpGame = async () => {
  return await handleMoveGame('up')
};

export const handleRightGame = async () => {
  return await handleMoveGame('R')
};

export const handleLeftGame = async () => {
  return await handleMoveGame('L')
};

export const handleReverseGame = async () => {
  return await handleMoveGame('B')
};

export const handlerAttackGame = async (enemyId) => {
  const identificator = getIdentificator();
  if ( !identificator ) return false;

  const getMonstersArray = localStorage.monstersInDungeon.split(',');
  getMonstersArray.push(enemyId)
  localStorage.monstersInDungeon = getMonstersArray

  return await resDungeon(`https://avalon.endlesswar.ru/dungeon_xml.php?cmd=attack&objectId=${enemyId}&nd=${identificator}&${Math.random()}&nd=${identificator}`)
};

export const handlerRefreshGame = async () => {
  return await resDungeon(`https://avalon.endlesswar.ru/dungeon_xml.php?cmd=updateXML&${Math.random()}`);
};

export const handlerHealGame = async (objId) => {
  const identificator = getIdentificator();
  if ( !identificator ) return false;

  return await resDungeon(`https://avalon.endlesswar.ru/dungeon_xml.php?cmd=restoreHPPW&objectId=${objId}&nd=${identificator}&${Math.random()}`)
};

export const handlerOpenChestGame = async (objId) => {
  const identificator = getIdentificator();
  if ( !identificator ) return false;

  const getChestsArray = localStorage.chestsInDungeon.split(',');
  getChestsArray.push(objId)
  localStorage.chestsInDungeon = getChestsArray

  return await resDungeon(`https://avalon.endlesswar.ru/dungeon_xml.php?cmd=activateChest&objectId=${objId}&nd=${identificator}&${Math.random()}&nd=${identificator}`)
};

export const handlerOpenDoorGame = async (objId) => {
  const identificator = getIdentificator();
  if ( !identificator ) return false;

  const getDoorsArray = localStorage.doorsInDungeon.split(',');
  getDoorsArray.push(objId)
  localStorage.doorsInDungeon = getDoorsArray

  return await resDungeon(`https://avalon.endlesswar.ru/dungeon_xml.php?cmd=activateDungeonAccess&objectId=${objId}&nd=${identificator}&${Math.random()}&nd=${identificator}`)
};

export const handlerUseTeleportGame = async (objId) => {
  const identificator = getIdentificator();
  if ( !identificator ) return false;

  return await resDungeon(`https://avalon.endlesswar.ru/dungeon_xml.php?cmd=teleport&objectId=${objId}&nd=${identificator}&${Math.random}&nd=${identificator}`)
};