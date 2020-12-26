const findElBySlotName = (elementName, slot0Name) => {
  if (slot0Name) {
    return [...container.querySelectorAll('item')].find((el) => {
      return el.querySelector('slot').innerText === elementName && el.querySelector('slot0').innerText === slot0Name
    })
  } else {
    return [...container.querySelectorAll('item')].find((el) => {
      return el.querySelector('slot').innerText === elementName
    })
  }
  
}

const setObjByElementName = (elementName, slot0Name) => {
  const element = findElBySlotName(elementName, slot0Name)

  return {
    type: element && element.querySelector('type').innerText,
    num: element && element.querySelector('num').innerText,
  }
}


let container = document.createElement('div')

container.innerHTML = `
 <xml><body><error><font color="#FF0000">Невозможно загрузить персонажа с полноразмерным образом</font></error><people>right</people><obraz>obraz/goddess_Morrigan.png</obraz><sex>0</sex><level>13</level><strength>7</strength><dexterity>50</dexterity><success>66</success><endurance>45</endurance><intelligence>15</intelligence><wisdom>0</wisdom><bot>0</bot><name>goddess Morrigan</name><item><slot>helmet</slot><slot0></slot0><type>8</type><num>102832</num></item><item><slot>earring</slot><slot0></slot0><type>15</type><num>102887</num></item><item><slot>necklace</slot><slot0></slot0><type>14</type><num>102881</num></item><item><slot>gloves</slot><slot0></slot0><type>11</type><num>102849</num></item><item><slot>weapon</slot><slot0></slot0><type>6</type><num>102698</num></item><item><slot>armor</slot><slot0></slot0><type>10</type><num>102845</num></item><item><slot>ring</slot><slot0>1</slot0><type>13</type><num>102874</num></item><item><slot>ring</slot><slot0>2</slot0><type>13</type><num>102874</num></item><item><slot>ring</slot><slot0>3</slot0><type>13</type><num>102874</num></item><item><slot>ring</slot><slot0>4</slot0><type>13</type><num>102891</num></item><item><slot>shield</slot><slot0></slot0><type>16</type><num>102863</num></item><item><slot>shoes</slot><slot0></slot0><type>9</type><num>102839</num></item><item><slot>bracelet</slot><slot0></slot0><type>17</type><num>102867</num></item><item><slot>belt</slot><slot0></slot0><type>12</type><num>102856</num></item></body></xml>
`

let str = container.querySelector('strength').innerText // сила
let dex = container.querySelector('dexterity').innerText // ловкость
let inst = container.querySelector('success').innerText // инстинкт
let health = container.querySelector('endurance').innerText // жизни
let intellect = container.querySelector('intelligence').innerText // интеллект

let name = container.querySelector('name').innerText
let level = container.querySelector('level').innerText

let helmetElement = setObjByElementName('helmet')
let armorElement = setObjByElementName('armor')
let beltElement = setObjByElementName('belt')
let shoesElement = setObjByElementName('shoes')
let glovesElement = setObjByElementName('gloves')
let weaponElement = setObjByElementName('weapon')
let earringElement = setObjByElementName('earring')
let necklaceElement = setObjByElementName('necklace')
let ringElement = setObjByElementName('ring', '1')
let ringElement2 = setObjByElementName('ring', '2')
let ringElement3 = setObjByElementName('ring', '3')
let ringElement4 = setObjByElementName('ring', '4')
let braceletElement = setObjByElementName('bracelet')

let shieldElement = setObjByElementName('shield')


console.log(`
    l_${level}:p_${str}:d_${dex}:s_${inst}:e_${health}:i_${intellect}:w_0=h_${helmetElement.type}_${helmetElement.num}:a_${armorElement.type}_${armorElement.num}:b_${beltElement.type}_${beltElement.num}:s_${shoesElement.type}_${shoesElement.num}:t_${braceletElement.type}_${braceletElement.num}:g_${glovesElement.type}_${glovesElement.num}:w_${weaponElement.type}_${weaponElement.num}:p_${shieldElement.type}_${shieldElement.num}:e_${earringElement.type}_${earringElement.num}:n_${necklaceElement.type}_${necklaceElement.num}:k1_${ringElement.type}_${ringElement.num}:k2_${ringElement2.type}_${ringElement2.num}:k3_${ringElement3.type}_${ringElement3.num}:k4_${ringElement4.type}_${ringElement4.num}
  `)