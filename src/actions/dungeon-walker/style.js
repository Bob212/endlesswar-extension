export const style = `
  #map {
    width: 570px;
    height: 597px;
    /*width: 165px;*/
    /*height: 165px;*/
    overflow: hidden;

    margin: 0;
    padding: 0;
    font-size: 0;
    line-height: 0;
    display: inline-block;
    position: relative;

    transition: .3s;
  }

  #map img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
  }

  #map .map__inner {
    display: block;
    /*width: 100%;*/
    /*height: 100%;*/
    width: 570px;
    height: 597px;
    position: absolute;
    /*top: -3px;*/
    top: 0;
    left: 0;

    transition: .3s;
  }

  .map-block, .personage, .info-block, .route-block {
    width: 14px;
    height: 14px;

    border-right: 1px solid #000;
    border-bottom: 1px solid #000;
  }

  .map-block {
    background: #ab9971;
    display: inline-block;
    display: inline-block;
    cursor: pointer;
    font-size: 0;
    line-height: 0;
  }

  .road {
    background: #d1bf97;
  }

  .portal {
    background: #d1bf97 url("${chrome.extension.getURL('map-creator/icons/portal.jpg')}") center center no-repeat;
  }

  .key {
    background: #d1bf97 url("${chrome.extension.getURL('map-creator/icons/key.jpg')}") center center no-repeat;
  }

  .chest {
    background: #d1bf97 url("${chrome.extension.getURL('map-creator/icons/chest.jpg')}") center center no-repeat;
  }

  .heal {
    background: #d1bf97 url("${chrome.extension.getURL('map-creator/icons/heal.jpg')}") center center no-repeat;
  }

  .door {
    background: #d1bf97 url("${chrome.extension.getURL('map-creator/icons/door.jpg')}") center center no-repeat;
  }

  .enemy {
    background: #d1bf97;
    position: relative;
  }

  .enemy::after {
    content: '';
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;

    width: 70%;
    height: 70%;
    border-radius: 50%;
    background: red;

    transform: translate(-50%, -50%);
  }

  .door-opened {
    background: #d1bf97;
    position: relative;
  }

  .door-opened::after {
    display: block;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 30%;
    background: #607d8b;
  }

  .personage {
    background: red;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    color: #000;
    font-size: 20px;
    line-height: 8px;

    transition: .2s;
  }

  .info-block {
    background: #ffff0078;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #000;
    font-size: 8px;
    line-height: 8px;
  }

  .route-block {
    background: #ff252580;
    position: absolute;
  }

  .controllers {
    display: inline-block;
  }

  .controllers .row {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 5px;
  }

`;

export const renderStyleIntoDom = () => {
  const body  = frames[1].document.querySelector('body');
  const link  = document.createElement('style');
  
  link.innerHTML = style; 
  body.appendChild(link);
};
