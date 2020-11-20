export const html = `
<div id="map">
  <!-- <img src="./gribnica.jpg" alt=""> -->
  <div class="map__inner"></div>
</div>

<div class="controllers">
  <div class="inner">
    <div class="row">
      <button id="button-up">up</button>
    </div>

    <div class="row">
      <button id="button-left">left</button>
      <button id="button-right">right</button>
    </div>
    
    <div class="row">
      <button id="button-reverse">reverse</button>
    </div>

    <br><br>
    <div class="row">
      <button id="button-minify">Minify / Maximify</button>
    </div>

    <br><br>
    <div class="row">
      <button id="button-go-to-nearest-heal">Nearest Heal</button>
    </div>

    <br><br>
    <div class="row">
      <button id="button-go-after-heal">After Heal go Back</button>
    </div>

    <br><br>
    <div class="row">
      <button id="button-stop-automove">Stop Automove</button>
    </div>
    <div class="row">
      <button id="button-attack-next-monster">Attack Next</button>
    </div>
    <div class="row">
      <button id="button-clear-monsters-local">Clear monsters array</button>
    </div>
  </div>
</div>
`;

export const renderHTMLIntoDom = (mainNode) => {
  mainNode.innerHTML = html;
};
