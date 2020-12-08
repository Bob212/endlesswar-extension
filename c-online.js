// Setting new stats

let oldStr = +frames[2].document.querySelector('#str').innerText;
let oldLovk = +frames[2].document.querySelector('#dex').innerText;
let oldInta = +frames[2].document.querySelector('#suc').innerText;
let oldVinos = +frames[2].document.querySelector('#end').innerText;
let oldIntel = +frames[2].document.querySelector('#int').innerText;

let strDifference = 20000; // Сила
let lovkDifference = 300000; // Ловкость
let intaDifference = 100000; // Инстинкт
let vinosDifference = 2000;
let intelDifference = 50;

let formData  = new FormData();

let data = {
  cmd: 'learning.save',
  sila: oldStr + strDifference,
  lovk: oldLovk + lovkDifference,
  inta: oldInta + intaDifference,
  vinos: oldVinos + vinosDifference,
  intel: oldIntel + intelDifference,
  mudra: '0',
  stats: -1 * (strDifference + lovkDifference + intaDifference + vinosDifference + intelDifference),
}

for(let name in data) {
  formData.append(name, data[name]);
}

let response = await fetch(`http://ankor.carnage.online/inventory.php`, {
method: 'POST',
body: formData
});

let res = await response.json()
console.log(res)







// Reset my stats

let formData  = new FormData();

let data = {
  cmd: 'learning.save',
  sila: oldStr,
  lovk: oldLovk,
  inta: oldInta,
  vinos: oldVinos,
  intel: oldIntel,
  mudra: '0',
  stats: '0',
}

for(let name in data) {
  formData.append(name, data[name]);
}

let response = await fetch(`http://ankor.carnage.online/inventory.php`, {
method: 'POST',
body: formData
});

let res = await response.json()
console.log(res)