if ( frames[2].document.querySelector('input[name="security"]') ) {
  if ( frames[2].document.querySelector('input[name="security"]').value ) {
    // клик работать
    frames[2].document.querySelector('input[value="Работать"]').click();
    console.log(111);
  }
} else if ( frames[2].document.querySelector('img[alt="Работать в локации"]') ) {
  // иконка работы
  frames[2].document.querySelector('img[alt="Работать в локации"]').click();
  console.log(222);
} else if ( frames[2].document.querySelector('a[href="quarry.php?job=stop"]') ) {
  // закончить работу
  frames[2].document.querySelector('a[href="quarry.php?job=stop"]').click()
  console.log(333);
}
