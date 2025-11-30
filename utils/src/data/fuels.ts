export interface Fuel {
  name: string;
  burnTemp: number;
  burnTime: number;
}

export const fuels: { [key: string]: Fuel } = {
  wood: {
    name: 'Wood',
    burnTemp: 800,
    burnTime: 72,
  },
  firewood: {
    name: 'Firewood',
    burnTemp: 700,
    burnTime: 24,
  },
  peat: {
    name: 'Peat',
    burnTemp: 900,
    burnTime: 25,
  },
  'brown-coal': {
    name: 'Brown Coal',
    burnTemp: 1100,
    burnTime: 77,
  },
  'black-coal': {
    name: 'Black Coal',
    burnTemp: 1200,
    burnTime: 84,
  },
  'anthracite-coal': {
    name: 'Anthracite Coal',
    burnTemp: 1200,
    burnTime: 196,
  },
  charcoal: {
    name: 'Charcoal',
    burnTemp: 1300,
    burnTime: 40,
  },
  coke: {
    name: 'Coke',
    burnTemp: 1350,
    burnTime: 40,
  },
};
