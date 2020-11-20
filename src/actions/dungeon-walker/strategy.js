export const gribnicaStrategy = [
  {
    coords: { y: 36, x: 8 },
    action: 'usePortal',
  },
  {
    coords: { y: 30, x: 13 },
    action: 'openChest',
  },

  {
    coords: { y: 32, x: 16 },
    action: 'openTheDoor',

    opening: [{ y: 8, x: 19 }],
  },

  {
    coords: { y: 28, x: 15 },
    action: 'usePortal',
  },

  {
    coords: { y: 3, x: 16 },
    action: 'useHeal',
  },

  {
    coords: { y: 1, x: 13 },
    action: 'openChest',
  },

  {
    coords: { y: 2, x: 16 },
    action: 'openTheDoor',

    opening: [{ y: 15, x: 2 }],
  },

  {
    coords: { y: 2, x: 18 },
    action: 'openTheDoor',

    opening: [{ y: 15, x: 4 }],
  },

  {
    coords: { y: 10, x: 26 },
    action: 'openTheDoor',

    opening: [{ y: 7, x: 28 }],
  },

  {
    coords: { y: 7, x: 35 },
    action: 'useHeal',
  },

  {
    coords: { y: 3, x: 32 },
    action: 'openTheDoor',

    opening: [{ y: 11, x: 29 }, { y: 11, x: 35 }],
  },

  {
    coords: { y: 11, x: 32 },
    action: 'openTheDoor',

    opening: [{ y: 3, x: 29 }, { y: 3, x: 35 }],
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
    action: 'openTheDoor', 

    opening: [{ y: 8, x: 9 }, { y: 19, x: 27 }],
    // ?????? // { y: 8, x: 9 } - is opened, { y: 19, x: 27 } - is opened
  },

  {
    coords: { y: 19, x: 35 },
    action: 'openTheDoor',

    opening: [{ y: 18, x: 32 }],
  },

  {
    coords: { y: 18, x: 32 },
    action: 'openTheDoor',

    opening: [{ y: 23, x: 32 }],
  },

  {
    coords: { y: 23, x: 35 },
    action: 'openTheDoor',

    opening: [{ y: 16, x: 30 }],
  },

  {
    coords: { y: 23, x: 29 },
    action: 'openTheDoor',

    opening: [{ y: 16, x: 34 }],
  },

  // TODO: обыскать два сундука

  {
    coords: { y: 3, x: 18 },
    action: 'useHeal',
  },

  {
    coords: { y: 2, x: 1 },
    action: 'openTheDoor',

    opening: [{ y: 28, x: 25 }],
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
    action: 'openTheDoor',

    opening: [{ y: 36, x: 25 } , { y: 33, x: 20 }],
  },

  {
    coords: { y: 34, x: 30 },
    action: 'openTheDoor',

    opening: [{ y: 37, x: 22 }],
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
];
