export interface AlloyMaterial {
  materialOptions: string[];
  minPercentage: number;
  maxPercentage: number;
  optimumPercentage: number;
  nuggets: number[];
}

export interface Alloy {
  name: string;
  maxIngots: number;
  smeltingTemp: number;
  materials: AlloyMaterial[];
}

export const alloys: { [key: string]: Alloy } = {
  'tin-bronze': {
    name: 'Tin Bronze',
    maxIngots: 20,
    smeltingTemp: 950,
    materials: [
      {
        materialOptions: ['Tin'],
        minPercentage: 8,
        maxPercentage: 12,
        optimumPercentage: 8,
        nuggets: [2, 4, 5, 7, 8],
      },
      {
        materialOptions: ['Malachite', 'Native Copper'],
        optimumPercentage: 92,
        minPercentage: 88,
        maxPercentage: 92,
        nuggets: [18, 36, 55, 73, 92],
      },
    ],
  },
  'bismuth-bronze': {
    name: 'Bismuth Bronze',
    maxIngots: 18,
    smeltingTemp: 850,
    materials: [
      {
        materialOptions: ['Bismuth'],
        minPercentage: 10,
        maxPercentage: 20,
        optimumPercentage: 10,
        nuggets: [2],
      },
      {
        materialOptions: ['Zinc'],
        minPercentage: 20,
        maxPercentage: 30,
        optimumPercentage: 20,
        nuggets: [4],
      },
      {
        materialOptions: ['Malachite', 'Native Copper'],
        minPercentage: 50,
        maxPercentage: 70,
        optimumPercentage: 70,
        nuggets: [14],
      },
    ],
  },
  'black-bronze': {
    name: 'Black Bronze',
    maxIngots: 15,
    smeltingTemp: 1020,
    materials: [
      {
        materialOptions: ['Gold'],
        minPercentage: 8,
        maxPercentage: 16,
        optimumPercentage: 8,
        nuggets: [2, 4, 5, 7, 8],
      },
      {
        materialOptions: ['Silver'],
        minPercentage: 8,
        maxPercentage: 16,
        optimumPercentage: 8,
        nuggets: [2, 4, 5, 7, 8],
      },
      {
        materialOptions: ['Malachite', 'Native Copper'],
        minPercentage: 68,
        maxPercentage: 84,
        optimumPercentage: 84,
        nuggets: [16, 32, 50, 66, 84],
      },
    ],
  },
  brass: {
    name: 'Brass',
    maxIngots: 21,
    smeltingTemp: 920,
    materials: [
      {
        materialOptions: ['Zinc'],
        minPercentage: 30,
        maxPercentage: 40,
        optimumPercentage: 30,
        nuggets: [6],
      },
      {
        materialOptions: ['Malachite', 'Native Copper'],
        minPercentage: 60,
        maxPercentage: 70,
        optimumPercentage: 70,
        nuggets: [14],
      },
    ],
  },
  // molybdochalkos: {
  //   name: 'Molybdochalkos',
  //   maxIngots: 21,
  //   materials: [
  //     {
  //       materialOptions: ['Lead'],
  //       minPercentage: 88,
  //       maxPercentage: 92,
  //       optimumPercentage: 88,
  //       nuggets: [18, 36, 53, 71, 88],
  //     },
  //     {
  //       materialOptions: ['Malachite', 'Native Copper'],
  //       minPercentage: 8,
  //       maxPercentage: 12,
  //       optimumPercentage: 12,
  //       nuggets: [2, 4, 7, 9, 12],
  //     },
  //   ],
  // },
};
