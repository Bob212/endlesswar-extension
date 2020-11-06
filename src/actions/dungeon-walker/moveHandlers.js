export const handleLeftPlugin = (myPosition) => {
  let persDirection = myPosition.direction;

  if (persDirection === 3) {
    persDirection = 0;
  } else {
    persDirection++;
  }

  myPosition.direction = persDirection;
};

export const handleRightPlugin = (myPosition) => {
  let persDirection = myPosition.direction;

  if (persDirection === 0) {
    persDirection = 3;
  } else {
    persDirection--;
  }

  myPosition.direction = persDirection;
};

export const handleUpPlugin = (myPosition, mapArray) => {
  let possibleX = myPosition.x;
  let possibleY = myPosition.y;

  switch(myPosition.direction) {
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

  if (mapArray[possibleY][possibleX] !== '#' && mapArray[possibleY][possibleX] !== '*') return;

  myPosition.x = possibleX;
  myPosition.y = possibleY;
};