let way = ['up','up','up']

let currentStep = 0;
let isLoading = false;


let identificator = '1641462067';


let sendResInDungeon = async (resStr, isFight = false) => {
  let response = await fetch(resStr, {
    method: "GET",
  });

  let responseInnerData = '';

  if (response.ok) { // если HTTP-статус в диапазоне 200-299
    responseInnerData = await response.text()
  } else {
    alert("Ошибка HTTP: " + response.status);
  }

  let tempDom = document.createElement('div');
  tempDom.innerHTML = responseInnerData;
  let enemyObject = tempDom.querySelector('objects').querySelector('subjects').querySelector('object');

  if (enemyObject && !isFight) {
    let objectName = enemyObject.querySelector('id').getAttribute('value')
    console.log('Enemy: ', objectName)
    sendResInDungeon(`https://avalon.endlesswar.ru/dungeon_xml.php?cmd=attack&objectId=${objectName}&nd=${identificator}&${Math.random()}&nd=${identificator}`, true)
  } else if (isFight) {
    // do nothing
  } else {
    isLoading = false;
  }
}

let dungeon_interval = setInterval(() => {
  if (!way[currentStep]) return;

  if (isLoading) return;
  isLoading = true;

  switch (way[currentStep]) {
    case 'up':
      sendResInDungeon(`https://avalon.endlesswar.ru/dungeon_xml.php?cmd=moveXML&direction=up&nd=${identificator}&${Math.random()}`);
      currentStep++;
      console.log('up');
      break;

    case 'left':
      sendResInDungeon(`https://avalon.endlesswar.ru/dungeon_xml.php?cmd=turnXML&direction=L&nd=${identificator}&${Math.random()}`);
      currentStep++;
      console.log('left');
      break;

    case 'right':
      sendResInDungeon(`https://avalon.endlesswar.ru/dungeon_xml.php?cmd=turnXML&direction=R&nd=${identificator}&${Math.random()}`);
      currentStep++;
      console.log('right');
      break;
  }
},1000);


// <name value="Повелитель Катакомб" /> - не нападать (на одном уровне с <id>)




// up
// let resStr = `https://avalon.endlesswar.ru/dungeon_xml.php?cmd=moveXML&direction=up&nd=${identificator}&${Math.random()}`

// Right
// let resStr = `https://avalon.endlesswar.ru/dungeon_xml.php?cmd=turnXML&direction=R&nd=${identificator}&${Math.random()}`

// Left
// let resStr = `https://avalon.endlesswar.ru/dungeon_xml.php?cmd=turnXML&direction=L&nd=${identificator}&${Math.random()}`

// Attack
// let resStr = `https://avalon.endlesswar.ru/dungeon_xml.php?cmd=attack&objectId=${objectName}&nd=${identificator}&${Math.random()}&nd=${identificator}`

// Update
// let resStr = `https://avalon.endlesswar.ru/dungeon_xml.php?cmd=updateXML&${Math.random()}`

// Use Teleport 
// `https://avalon.endlesswar.ru/dungeon_xml.php?cmd=teleport&objectId=sub222349782&nd=${identificator}&${Math.random}&nd=${identificator}`



// Open chest
// `https://avalon.endlesswar.ru/dungeon_xml.php?cmd=activateChest&objectId=sub249151140&nd=1641462067&0.8172703883610666&nd=1641462067`

// Open the door
// `https://avalon.endlesswar.ru/dungeon_xml.php?cmd=activateDungeonAccess&objectId=sub244198855&nd=1641462067&0.9118282306008041&nd=1641462067`

// HEAL
// `https://avalon.endlesswar.ru/dungeon_xml.php?cmd=restoreHPPW&objectId=sub251133945&nd=1641462067&${Math.random()}`