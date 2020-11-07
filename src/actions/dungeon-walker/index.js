import { renderStyleIntoDom } from './style.js';
import { renderHTMLIntoDom } from './html.js';
import { gribnicaMap } from './maps.js';
import { gribnicaStrategy } from './strategy.js';

import { handlePosPlugin } from './moveHandlers.js';
import { handleUpGame, handleRightGame, handleLeftGame, handleReverseGame, handlerAttackGame, handlerRefreshGame, handlerHealGame } from './gameHandlers.js';

export const createDungeonMap = async () => {
  console.log('Map created!'); 

  const mainNode = frames[1].document.querySelector('.ui-block.ui-tabs-panel.ui-widget-content.ui-corner-bottom');
  // const mainNode = frames[1].document.querySelector('table');

  renderStyleIntoDom();

  renderHTMLIntoDom(mainNode);

  const mapArray = gribnicaMap;
  const strategy = gribnicaStrategy;
  let way = '';

  let minifyMap = false;

  const oneBlockWidth = 15;

  const myPosition = {
    direction: 0,
    y: 13,
    x: 16,
  };

  const possibleDirections = [
    '←',
    '↓',
    '→',
    '↑'
  ];

  const mapMatchers = [
    { symbol: '#', className: 'road' },
    { symbol: '@', className: 'portal' },
    { symbol: '$', className: 'key' },
    { symbol: '%', className: 'chest' },
    { symbol: '^', className: 'heal' },
    { symbol: '|', className: 'door' },
    { symbol: '*', className: 'door-opened' },
    { symbol: 'E', className: 'enemy' },
  ];

  let enemiesOnMapArray = [];
  let routeToTarget = [];
  let visibleObjOnMap = []; // obj_switch || obj_switched

  const mapWrapperNode = mainNode.querySelector('#map');
  const nodeMap = mapWrapperNode.querySelector(".map__inner");
  const controllersNode = mainNode.querySelector('.controllers');

  const changeSomethingOnmap = (coords, symbol) => {
    mapArray[coords.y][coords.x] = symbol;

    return mapArray
  };

  const handlerClickOnMap = (element) => {

    // console.log(element.target);
    // nodeMap.innerHTML = '';

    const row = element.target.getAttribute('data-row');
    const col = element.target.getAttribute('data-col');

    console.log('Row: ', row);
    console.log('Col: ', col);

    // Func for drawing START

    // changeSomethingOnmap({x: col, y: row}, '#')
    // renderArray()
    // return

    // Func for drawing END

    // Open the door
    if (mapArray[row][col] === '|') {
      mapArray[row][col] = '*';
      renderArray();
      return;
    }

    // Close the door
    if (mapArray[row][col] === '*') {
      mapArray[row][col] = '|';
      
      renderArray();
      return;
    }

    if (element.ctrlKey) {
      // Put the personage on this coords
      myPosition.x = +col;
      myPosition.y = +row;
      renderPersonage();
    } else {
      // Render route to this coords
      way = findRouteToTarget({ y: +row, x: +col }, myPosition);
      console.log(way)

      automaticMove(way);
    }

    console.log('')

    // if (!row || !col) return;

    // mapArray[row][col] = mapArray[row][col] === '#' ? '|' : '.';

    // renderArray()
  }; 

  const chasingToPers = () => {
    if (!minifyMap) {
      nodeMap.style.top = null;
      nodeMap.style.left = null;
      return
    }

    nodeMap.style.top = `-${oneBlockWidth * (myPosition.y - 5)}px`;
    nodeMap.style.left = `-${oneBlockWidth * (myPosition.x - 5)}px`;
  };

  const setMapSize = () => {
    if (!minifyMap) {
      mapWrapperNode.style.width = null;
      mapWrapperNode.style.height = null;
    } else {
      mapWrapperNode.style.width = '165px';
      mapWrapperNode.style.height = '165px';
    }
  };

  const renderArray = () => {
    // Clear previous state
    nodeMap.innerHTML = '';

    mapArray.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        const div = document.createElement('div');

        div.classList.add('map-block');

        const whatTypeOfSymbol = mapMatchers.find(el => el.symbol === col);

        if (whatTypeOfSymbol) {
          div.classList.add(whatTypeOfSymbol.className);
        }

        div.setAttribute('data-row', rowIndex)
        div.setAttribute('data-col', colIndex)

        div.addEventListener('click', handlerClickOnMap);

        nodeMap.appendChild(div);
      })
    });

    renderInfoBlocks('info-block', strategy);

    renderInfoBlocks('enemy', enemiesOnMapArray);

    if (routeToTarget) {
      renderInfoBlocks('route-block', routeToTarget);
    }

    renderPersonage();
  };

  const renderPersonage = () => {
    // if rerender
    let persNode = nodeMap.querySelector('.personage');
    const isRerender = persNode ? true : false;

    if (!isRerender) {
      persNode = document.createElement('div');
      persNode.classList.add('personage');
    }

    persNode.innerText = possibleDirections[myPosition.direction];
    persNode.style.left = `${oneBlockWidth*myPosition.x}px`
    persNode.style.top = `${oneBlockWidth*myPosition.y}px`

    if (!isRerender) {
      nodeMap.appendChild(persNode);
    }

    chasingToPers()
  };

  const renderInfoBlocks = (className, coordsArray) => {
    [...nodeMap.querySelectorAll(className)].forEach(el => {
      el.remove();
    });

    coordsArray.forEach(step => {
      const div = document.createElement('div');
      div.classList.add(className);

      const x = step.x || step.coords.x;
      const y = step.y || step.coords.y;

      if (className === 'info-block') {
        div.innerHTML = `${y}<br>${x}`;
      }

      div.style.left = `${x * oneBlockWidth}px`;
      div.style.top = `${y * oneBlockWidth}px`;

      div.setAttribute('data-row', y)
      div.setAttribute('data-col', x)

      if (step.enemyId) {
        div.setAttribute('title', `${step.name} [${step.lvl}]`);

        div.addEventListener('click', async () => {
          await handlerAttackGame(step.enemyId);
          frames[1].location.reload()
        })
      } else {
        div.addEventListener('click', handlerClickOnMap);
      }

      nodeMap.appendChild(div);
    });
  };

  renderArray();

  const handleLeft = async () => {
    const res = await handleLeftGame();
    if ( !res ) return;

    const div = document.createElement('div');
    div.innerHTML = res;

    drawEnemies(div);

    handlePosPlugin(myPosition, div);

    div.remove();

    renderPersonage();
  };

  const handleRight = async () => {
    const res = await handleRightGame();
    if ( !res ) return;

    const div = document.createElement('div');
    div.innerHTML = res;

    drawEnemies(div);

    handlePosPlugin(myPosition, div);

    div.remove();

    renderPersonage();
  };

  const handleReverse = async () => {
    const res = await handleReverseGame();
    if ( !res ) return;

    const div = document.createElement('div');
    div.innerHTML = res;

    drawEnemies(div);

    handlePosPlugin(myPosition, div);

    div.remove();

    renderPersonage();
  };

  const handleUp = async () => {
    const res = await handleUpGame();
    if ( !res ) return;

    const div = document.createElement('div');
    div.innerHTML = res;

    drawEnemies(div);

    handlePosPlugin(myPosition, div);

    div.remove();

    renderPersonage();
  };

  const handleRefresh = async () => {
    const res = await handlerRefreshGame();
    if ( !res ) return;

    const div = document.createElement('div');
    div.innerHTML = res;

    drawEnemies(div);

    handlePosPlugin(myPosition, div);

    div.remove();

    renderPersonage();
  };

  const drawEnemies = (div) => {
    enemiesOnMapArray = [];

    const allEnemiesObjects = [...div.querySelectorAll('objects subjects object')];

    allEnemiesObjects.forEach((enemyNode) => {
      const pos = enemyNode.querySelector('position');
      const id = enemyNode.querySelector('id');
      const name = enemyNode.querySelector('name').getAttribute('value');
      const lvl = enemyNode.querySelector('level') && enemyNode.querySelector('level').getAttribute('value');

      enemiesOnMapArray.push({
        x: +pos.getAttribute('x') - 1,
        y: +pos.getAttribute('y') - 1,
        enemyId: id.getAttribute('value'),
        name,
        lvl,
      });
    });

    //////////// TODO

    visibleObjOnMap = [];

    const allMapsObjects = [...div.querySelectorAll('interactive object')];

    allMapsObjects.forEach((enemyNode) => {
      const pos = enemyNode.querySelector('position');
      const id = enemyNode.querySelector('id').getAttribute('value');
      const type = enemyNode.querySelector('type').getAttribute('value');

      visibleObjOnMap.push({
        x: +pos.getAttribute('x') - 1,
        y: +pos.getAttribute('y') - 1,
        id,
        type,
      });
    });

    //////////// TODO END

    renderArray();
  };

  const handleMinify = () => {
    minifyMap = !minifyMap;

    renderPersonage();
    setMapSize();
  }

  const handleActionNearby = () => {
    let isHealNearBy = false;

    visibleObjOnMap.forEach(healObj => {
      if ( isObjNearMe(healObj) ) {
        isHealNearBy = healObj;
      }
    });

    if (isHealNearBy) {
      console.log('Heal');
      handlerHealGame(isHealNearBy.id);
      // frames[1].location.reload();
      return
    }

    let isEnemyNear = false;

    enemiesOnMapArray.forEach(enemy => {
      if ( isObjNearMe(enemy) ) {
        isEnemyNear = enemy;
      }
    });

    if (isEnemyNear) {
      console.log('attack');
      handlerAttackGame(isEnemyNear.enemyId);
      frames[1].location.reload();
      return
    }
  };

  const isObjNearMe = (obj) => {
    if (
      ( obj.x + 1 === myPosition.x && obj.y === myPosition.y ) ||
      ( obj.x - 1 === myPosition.x && obj.y === myPosition.y ) ||
      ( obj.y + 1 === myPosition.y && obj.x === myPosition.x ) ||
      ( obj.y - 1 === myPosition.y && obj.x === myPosition.x )
    ) {
      return true
    } else {
      return false;
    }
  };

  const findRouteToTarget = (neededTarget, currentPosition) => {
    const currPosition = { ...currentPosition };

     routeToTarget = generateRouteArray(neededTarget, currPosition);

    if (routeToTarget) {
      routeToTarget.push(neededTarget)
      routeToTarget.shift()
    }

    renderArray();

    // Cant find the way
    if (!routeToTarget) return;

    return howShouldIMove(routeToTarget);
  };

  const isBlank = (position, already_was) => {
    const wasHereBefore = already_was.find(el => el.x === position.x && el.y === position.y)
    if (
        (mapArray[position.y][position.x] !== '#' && mapArray[position.y][position.x] !== '*') ||
        wasHereBefore
      ) return true

    return false;
  };

  const generateRouteArray = (neededTarget, currentPosition, already_was = []) => {
    if (
        neededTarget.x === currentPosition.x &&
        neededTarget.y === currentPosition.y
      ) return already_was;

    let k = 0;

    if ( isBlank( { y: currentPosition.y + 1, x: currentPosition.x }, already_was) ) k++;
    if ( isBlank( { y: currentPosition.y - 1, x: currentPosition.x }, already_was) ) k++;
    if ( isBlank( { y: currentPosition.y, x: currentPosition.x + 1 }, already_was) ) k++;
    if ( isBlank( { y: currentPosition.y, x: currentPosition.x - 1 }, already_was) ) k++;

    if (k === 4) return false;

    already_was.push({ x: currentPosition.x, y: currentPosition.y });

    let resFromUp = null;
    let resFromDown = null;
    let resFromRight = null;
    let resFromLeft = null;

    if ( !isBlank( { y: currentPosition.y + 1, x: currentPosition.x }, already_was) ) {
      resFromUp = generateRouteArray(neededTarget, { y: currentPosition.y + 1, x: currentPosition.x}, [...already_was]);
    }
    if ( !isBlank( { y: currentPosition.y - 1, x: currentPosition.x }, already_was) ) {
      resFromDown = generateRouteArray(neededTarget, { y: currentPosition.y - 1, x: currentPosition.x}, [...already_was]);
    }

    if ( !isBlank( { y: currentPosition.y, x: currentPosition.x + 1 }, already_was) ) {
      resFromRight = generateRouteArray(neededTarget, { y: currentPosition.y, x: currentPosition.x + 1}, [...already_was]);
    }
    if ( !isBlank( { y: currentPosition.y, x: currentPosition.x - 1 }, already_was) ) {
      resFromLeft = generateRouteArray(neededTarget, { y: currentPosition.y, x: currentPosition.x - 1}, [...already_was]);
    }

    // Finding the smallest possible way
    let smallestArray = new Array(999);

    if (resFromUp && resFromUp.length < smallestArray.length) smallestArray = resFromUp;
    if (resFromDown && resFromDown.length < smallestArray.length) smallestArray = resFromDown;
    if (resFromRight && resFromRight.length < smallestArray.length) smallestArray = resFromRight;
    if (resFromLeft && resFromLeft.length < smallestArray.length) smallestArray = resFromLeft;

    if (smallestArray.length < 999) return smallestArray;

    // Cant find the way
    return false
  };

  const howShouldIMove = (routeArray) => {
    const clicks = [];
    let currentPosition = { ...myPosition };

    const possibleForward = (currentPosition) => {
      let possibleX = currentPosition.x;
      let possibleY = currentPosition.y;

      switch(currentPosition.direction) {
        case 0:
          possibleX--;
          break;
        case 1:
          possibleY++;
          break;
        case 2:
          possibleX++;
          break;
        case 3:
          possibleY--;
          break;
      }

      return {x: possibleX, y: possibleY}
    }

    const comparePositions = (pos1, pos2) => {
      return pos1.x === pos2.x && pos1.y === pos2.y
    } 

    // console.log(routeArray)

    routeArray.forEach(nextPosition => {
      while (true) {
        if ( comparePositions(possibleForward(currentPosition), nextPosition)  ) {
          clicks.push({
            target: 'up',
            coords: nextPosition,
          });

          currentPosition.x = nextPosition.x;
          currentPosition.y = nextPosition.y;

          break;
        }

        if (currentPosition.direction === 3) {
          currentPosition.direction = 0;
        } else {
          currentPosition.direction += 1;
        }

        clicks.push({
          target: 'left',
          coords: nextPosition,
        });
      }
    })

    // changing ['left', 'left', 'left'] to ['right']
    let i = 0;
    while(true) {
      if (!clicks[i]) break;

      if (clicks[i].target === 'left' && clicks[i].target === clicks[i + 1].target && clicks[i].target === clicks[i + 2].target) {
        let coords = clicks[i].coords;
        clicks.splice(i, 3, {
          target: 'right',
          coords,
        });
        i = 0;
      }

      i++
    }

    return clicks;
  };

  let automaticInterval = null;

  const automaticMove = (way) => {
    if (automaticInterval) clearInterval(automaticInterval);

    let automaticWait = false;
    let automaticCurrentStep = 0;

    automaticInterval = setInterval(async () => {
      if (automaticWait) return;

      if (!way || !way[automaticCurrentStep]) {
        clearInterval(automaticInterval);
        return;
      }

      // way[automaticCurrentStep].coords

      const i = enemiesOnMapArray.find(enemy => {
        return (
          enemy.x === way[automaticCurrentStep].coords.x &&
          enemy.y === way[automaticCurrentStep].coords.y
        )
      })

      if (i) {
        console.log('Enemy is near ...');
        clearInterval(automaticInterval)
        return;
      }

      automaticWait = true;

      if (way[automaticCurrentStep].target === 'up') await handleUp();
      if (way[automaticCurrentStep].target === 'left') await handleLeft();
      if (way[automaticCurrentStep].target === 'right') await handleRight();

      automaticWait = false;
      automaticCurrentStep++;

    }, 500);
  };

  const stopAutomove = () => {
    clearInterval(automaticInterval);
  };

  await handleRefresh();
  handleMinify();


// Listeners

const logKey = (e) => {
  switch(e.code) {
    case 'KeyW':
      handleUp();
      break;
    case 'KeyA':
      handleLeft();
      break;
    case 'KeyD':
      handleRight();
      break;
    case 'KeyS':
      handleReverse();
      break;
    case 'KeyZ':
      handleMinify();
      break;
    case 'KeyF':
      handleActionNearby();
      break;
  }
}

frames[1].document.body.addEventListener('keyup', logKey);
// document.body.addEventListener('keyup', logKey);

controllersNode.querySelector('#button-left').addEventListener('click', handleLeft);
controllersNode.querySelector('#button-right').addEventListener('click', handleRight);
controllersNode.querySelector('#button-reverse').addEventListener('click', handleReverse);
controllersNode.querySelector('#button-up').addEventListener('click', handleUp);
controllersNode.querySelector('#button-minify').addEventListener('click', handleMinify);
controllersNode.querySelector('#button-stop-automove').addEventListener('click', stopAutomove);

};
