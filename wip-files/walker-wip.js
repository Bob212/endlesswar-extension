const currentLocation = "Центральный зал"
const neededLocation = "Тренировочный зал"

// const currentLocation = "Подвал"
// const neededLocation = "Магазин"

const carnageMap = [{
  name: "Мост торговцев",
  inner: [{
    name: "Магазин Чудесных Вещей"
  }, {
    name: "Ломбард"
  }, {
    name: "Ратуша"
  }, {
    name: "Лотерея"
  }, {
    name: "Аукцион"
  }, {
    name: "Игорный дом"
  }, {
    name: "Оптовый магазин"
  }, {
    name: "Больница"
  }, {
    name: "Банк"
  }, {
    name: "Биржа"
  }, {
    name: "Окраины города (Мост Торговцев)"
  }, {
    name: "Клуб Адам"
  }]
}, {
  name: "Центральная площадь",
  inner: [{
    name: "Ремонтная мастерская"
  }, {
    name: "Таверна 'Вечный зов'"
  }, {
    name: "Магазин"
  }, {
    name: "Постоялый двор"
  }, {
    name: "Почта"
  }, {
    name: "Глас народа"
  }, {
    name: "Камень Войны"
  }, {
    name: "Храм"
  }, {
    name: "Дорога к Дремучему Лесу"
  }, {
    name: "Комнатка для Двоих"
  }, {
    name: "Сугроб"
  }, {
    name: "Черный рынок"
  }, {
    name: "Сеть тоннелей"
  }, {
    name: "Клановая биржа"
  }, {
    name: "Замок",
    inner: [{
      name: "Подвал"
    }, {
      name: "Сокровищница"
    }, {
      name: "Центральный Зал"
    }, {
      name: "Тренировочный Зал"
    }, {
      name: "Казарма Новобранцев"
    }, {
      name: "Казарма Рекрутов"
    }, {
      name: "Башня Воинов"
    }, {
      name: "Башня Ветеранов"
    }, {
      name: "Рыцарская Башня"
    }]
  }]
}, {
  name: "Улица утраченных надежд",
  inner: [{
    name: "Тюрьма"
  }, {
    name: "Телепорт"
  }, {
    name: "Кузница"
  }, {
    name: "Алхимическая лаборатория"
  }, {
    name: "на Окраины города (Улица Утраченных Надежд)"
  }, {
    name: "Клуб Ева"
  }]
}, {
  name: "Улица Пепельного Ветра",
  inner: [{
    name: "Тайная комната асура"
  }]
}, {
  name: "Улица павших"
}]

function getWayToPlace(placeName, mapArray, prevArray = []) {
  let finalArray = []

  function findFinal(placeName, mapArray, prevArray) {
    mapArray.forEach(el => {
      let wayArray = [...prevArray]

      if (el.name.toLowerCase() === placeName) {
        wayArray.push(el.name.toLowerCase())
        finalArray = wayArray
      } else if (el.inner) {
        wayArray.push(el.name.toLowerCase())
        findFinal(placeName, el.inner, wayArray)
      }
    })
  }
  findFinal(placeName, mapArray, prevArray)

  return finalArray
}

let wayToCurrent = getWayToPlace(currentLocation.toLowerCase(), carnageMap)
let wayToNeeded = getWayToPlace(neededLocation.toLowerCase(), carnageMap)
let finalWay = []

finalWay = sumTwoWays(wayToNeeded, wayToCurrent)
console.log(finalWay)


function sumTwoWays(wayTo, wayFrom) {
  let fromIndex = carnageMap.findIndex(el => {
    return el.name.toLowerCase() === wayFrom[0]
  })
  let toIndex = carnageMap.findIndex(el => {
    return el.name.toLowerCase() === wayTo[0]
  })
  let inBetweenPlaces = []
  if (fromIndex > toIndex) {
    let IndexDifference = fromIndex - toIndex
    for(let i = fromIndex+1; i<IndexDifference+fromIndex; i++) {
      inBetweenPlaces.push(carnageMap[IndexDifference+fromIndex-i].name.toLowerCase())
    }
  } else {
    let IndexDifference = toIndex - fromIndex
    for(let i = fromIndex+1; i<IndexDifference+fromIndex; i++) {
      inBetweenPlaces.push(carnageMap[i].name.toLowerCase())
    }
  }
  wayFrom.reverse().shift()
  return [...wayFrom, ...inBetweenPlaces, ...wayTo]
}