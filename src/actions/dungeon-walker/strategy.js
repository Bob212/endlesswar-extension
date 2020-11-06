export const gribnicaStrategy = [
  {
    whereIAm: { y: 38, x: 8, direction: 0 },
    coords: { y: 36, x: 8 },
    action: 'usePortal',
    // <object>
    //     <position x="10" y="37" />
    //     <id value="sub222349782" />
    //     <type value="obj_teleport" />
    // </object>
  },
  {
    whereIAm: { y: 31, x: 1, direction: 2 },
    coords: { y: 30, x: 13 },
    action: 'openChest',
    // <object>
    //     <position x="14" y="32" />
    //     <id value="sub249151140" />
    //     <type value="obj_chest" />
    // </object>
  },

  {
    coords: { y: 32, x: 16 },
    action: 'openTheDoor', // { y: 8, x: 19 }
    // <object>
    //     <position x="16" y="33" />
    //     <id value="sub244198855" />
    //     <type value="obj_switch" />
    //     <!-- или мб obj_switched -->
    // </object>
  },

  {
    coords: { y: 28, x: 15 },
    action: 'usePortal',
  },

  {
    whereIAm: { y: 9, x: 12, direction: 3 },
    coords: { y: 3, x: 16 },
    action: 'useHeal',
  },

  {
    coords: { y: 1, x: 13 },
    action: 'openChest',
  },

  {
    coords: { y: 2, x: 16 },
    action: 'openTheDoor', // ????????????
  },

  {
    coords: { y: 2, x: 18 },
    action: 'openTheDoor', // ????????????
  },

  {
    coords: { y: 10, x: 26 },
    action: 'openTheDoor', // { y: 7, x: 28 }
  },

  {
    coords: { y: 7, x: 35 },
    action: 'useHeal',
  },

  {
    coords: { y: 3, x: 32 },
    action: 'openTheDoor', // { y: 11, x: 29 }, { y: 11, x: 35 }
  },

  {
    coords: { y: 11, x: 32 },
    action: 'openTheDoor', // { y: 3, x: 29 }, { y: 3, x: 35 }
  },
  // TODO обыскать 4 сундука

  {
    coords: { y: 3, x: 18 },
    action: 'useHeal',
  },

  {
    coords: { y: 16, x: 19 },
    action: 'openTheDoor', // ??????
  },

  {
    coords: { y: 15, x: 22 },
    action: 'useHeal',
  },

  // { y: 15, x: 4 } - is opened, { y: 15, x: 2 } - opened

  {
    coords: { y: 17, x: 5 },
    action: 'openChest',
  },

  {
    coords: { y: 26, x: 25 },
    action: 'openChest',
  },

  {
    coords: { y: 21, x: 27 },
    action: 'openTheDoor', // ??????
  },

  {
    coords: { y: 25, x: 14 },
    action: 'openTheDoor', // ??????
  },

  // { y: 8, x: 9 } - is opened, { y: 19, x: 27 } - is opened

  {
    coords: { y: 19, x: 35 },
    action: 'openTheDoor', // { y: 18, x: 32 }  },
  },

  {
    coords: { y: 18, x: 32 },
    action: 'openTheDoor', // { y: 23, x: 32 }  },
  },

  {
    coords: { y: 23, x: 35 },
    action: 'openTheDoor', // { y: 16, x: 30 }  },
  },

  {
    coords: { y: 23, x: 29 },
    action: 'openTheDoor', // { y: 16, x: 34 }  },
  },

  // TODO: обыскать два сундука

  {
    coords: { y: 3, x: 18 },
    action: 'useHeal',
  },

  {
    coords: { y: 2, x: 1 },
    action: 'openTheDoor', // { y: 28, x: 25 }  },
  },

  {
    coords: { y: 17, x: 2 },
    action: 'openChest',
  },

  {
    coords: { y: 15, x: 22 },
    action: 'useHeal',
  },

  {
    coords: { y: 33, x: 10 },
    action: 'openTheDoor', // { y: 33, x: 20 }, { y: 37, x: 22 }, { y: 36, x: 25 } 
  },

  {
    coords: { y: 36, x: 22 },
    action: 'openChest',
  },

  {
    coords: { y: 34, x: 22 },
    action: 'openChest',
  },

  {
    coords: { y: 32, x: 22 },
    action: 'openChest',
  },

  {
    coords: { y: 34, x: 30 },
    action: 'openTheDoor',
  },
];
