export const html = `
<div id="map">
  <!-- <img src="./gribnica.jpg" alt=""> -->
  <div class="map__inner"></div>
</div>

<div class="controllers">
  <div class="inner">

    <div class="row">
      <button id="button-load-monsters-dungeon1">Load monsters from Dungeon 1</button>
      <button id="button-load-monsters-dungeon2">Load monsters from Dungeon 2</button>
      <button id="button-load-monsters-dungeon-labyrinth">Load monsters from Dungeon Labyrinth</button>
    </div>

    <div class="row">
      <button id="button-attack-next-monster">Attack Next</button>
    </div>

    <br><br>
    <div class="row">
      <button id="button-open-next-chest">Open next chest</button>
    </div>
    <div class="row">
      <button id="button-clear-chests-local">Clear chests array</button>
    </div>

    <br><br>
    <div class="row">
      <button id="button-enter-dungeon">Enter Dungeon</button>
    </div>
    <div class="row">
      <button id="button-exit-dungeon">Exit Dungeon</button>
    </div>
  </div>
</div>
`;

export const renderHTMLIntoDom = (mainNode) => {
  mainNode.innerHTML = html;
};
