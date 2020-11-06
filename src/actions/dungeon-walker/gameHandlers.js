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


// https://avalon.endlesswar.ru/dungeon_xml.php?cmd=turnXML&direction=B&nd=1990302350&0.7850366216152906 - reverse