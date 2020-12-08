// Money digger

setInterval(() => {
  fetch(`https://avalon.endlesswar.ru/radio.php?cmd=setradiodj&id=1`, {
      method: 'GET'
  });
}, 3000)




// Mail cleaner

let step = 0;

function getItemList(formName){
  var list = frames[1].document.forms[formName].getElementsByTagName('INPUT');
  var count = list.length;
  
  var items = new Array();
  
  for (var i = 0; i < count; i++) {
    if (list[i].checked && list[i].type == 'checkbox') {
      items.push(list[i].value);
    }
  }
  return items.join(', ');
}

setInterval( () => {
    if (step === 0) {
        step = 1;
        frames[1].document.querySelector('#oSelectAll').click()
    } else {
        step = 0;
        var itemsStr = getItemList('formInbox');
        frames[1].document.forms['formInbox'].elements['cmd'].value = 'inbox.delete';
    frames[1].document.forms['formInbox'].elements['item_list'].value = itemsStr;
    frames[1].document.forms['formInbox'].submit();
    }
}, 10 * 1000)