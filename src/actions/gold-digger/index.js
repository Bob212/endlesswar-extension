import { getCookie } from '../../utils.js';

export const goldDigger = () => {
  if (getCookie('ext-carnage-auto-gold-digger') !== 'true') return;

  console.log('Digging gold')

  fetch(`https://avalon.endlesswar.ru/radio.php?cmd=setradiodj&id=999`, {
    method: 'GET'
  });

  // if (cleanDelay > 3) {
  //   cleanDelay = 0;

  //   cleanMail()
  // } else {
  //   cleanDelay++;

  //   fetch(`https://avalon.endlesswar.ru/radio.php?cmd=setradiodj&id=3`, {
  //     method: 'GET'
  //   });
  // }
};

let cleanStep = 0;
let cleanDelay = 0;

const cleanMail = () => {
  if (cleanStep === 0) {
    if (frames[2].document.querySelector('#oSelectAll')) { // select mails
      frames[2].document.querySelector('#oSelectAll').click()
      cleanStep = 1;
    } else { // there were no mails
      frames[2].document.location.href = '/post.php?cmd=show.inbox'
    }
  } else { // delete selected mails
    cleanStep = 0;
    var itemsStr = getItemList('formInbox');
    frames[2].document.forms['formInbox'].elements['cmd'].value = 'inbox.delete';
    frames[2].document.forms['formInbox'].elements['item_list'].value = itemsStr;
    frames[2].document.forms['formInbox'].submit();
  }
};

const getItemList = (formName) => {
  var list = frames[2].document.forms[formName].getElementsByTagName('INPUT');
  var count = list.length;

  var items = new Array();

  for (var i = 0; i < count; i++) {
    if (list[i].checked && list[i].type == 'checkbox') {
      items.push(list[i].value);
    }
  }
  return items.join(', ');
}
