export const handleLeftPlugin = (myPosition, divNode) => {
  const persNode = divNode.querySelector('hero direction');
  if (!persNode) return;

  const val = persNode.getAttribute('value');

  if (val === 'w') myPosition.direction = 0;
  if (val === 's') myPosition.direction = 1;
  if (val === 'e') myPosition.direction = 2;
  if (val === 'n') myPosition.direction = 3;

  // let persDirection = myPosition.direction;

  // if (persDirection === 3) {
    // persDirection = 0;
  // } else {
    // persDirection++;
  // }

  // myPosition.direction = persDirection;
};

export const handleRightPlugin = (myPosition, divNode) => {
  let persDirection = myPosition.direction;

  if (persDirection === 0) {
    persDirection = 3;
  } else {
    persDirection--;
  }

  myPosition.direction = persDirection;
};

export const handleUpPlugin = (myPosition, mapArray, divNode) => {
  const persNode = divNode.querySelector('hero position');

  if (!persNode) return;
  
  let possibleX = +persNode.getAttribute('x') - 1;
  let possibleY = +persNode.getAttribute('y') - 1;

  // let possibleX = myPosition.x;
  // let possibleY = myPosition.y;

  // switch(myPosition.direction) {
  //   case 0:
  //     possibleX--;
  //     break;
  //   case 1:
  //     possibleY++;
  //     break;
  //   case 2:
  //     possibleX++;
  //     break;
  //   case 3:
  //     possibleY--;
  //     break;
  // }

  // if (mapArray[possibleY][possibleX] !== '#' && mapArray[possibleY][possibleX] !== '*') return;

  myPosition.x = possibleX;
  myPosition.y = possibleY;
};

export const handlePosPlugin = (myPosition, divNode) => {
  const dirNode = divNode.querySelector('hero direction');
  const posNode = divNode.querySelector('hero position');

  if (!dirNode || !posNode) return;

  const val = dirNode.getAttribute('value');

  if (val === 'w') myPosition.direction = 0;
  if (val === 's') myPosition.direction = 1;
  if (val === 'e') myPosition.direction = 2;
  if (val === 'n') myPosition.direction = 3;

  myPosition.x = +posNode.getAttribute('x') - 1;
  myPosition.y = +posNode.getAttribute('y') - 1;
};
