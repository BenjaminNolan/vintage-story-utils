<script setup lang="ts">
import { ref } from 'vue';

interface Fuel {
  name: string;
  maxBurnTemp: number;
  burnTime: number;
}

const fuels: { [key: string]: Fuel } = {
  wood: {
    name: 'Wood',
    maxBurnTemp: 800,
    burnTime: 72,
  },
  firewood: {
    name: 'Firewood',
    maxBurnTemp: 700,
    burnTime: 24,
  },
  peat: {
    name: 'Peat',
    maxBurnTemp: 900,
    burnTime: 25,
  },
  'brown-coal': {
    name: 'Brown Coal',
    maxBurnTemp: 1100,
    burnTime: 77,
  },
  'black-coal': {
    name: 'Black Coal',
    maxBurnTemp: 1200,
    burnTime: 84,
  },
  'anthracite-coal': {
    name: 'Anthracite Coal',
    maxBurnTemp: 1200,
    burnTime: 196,
  },
  charcoal: {
    name: 'Charcoal',
    maxBurnTemp: 1300,
    burnTime: 40,
  },
  coke: {
    name: 'Coke',
    maxBurnTemp: 1350,
    burnTime: 40,
  },
};

interface SelectItem {
  title: string;
  value: string;
}

const fuelOptions: SelectItem[] = Object.entries(fuels).map((data) => {
  return {
    title: data[1].name,
    value: data[0],
  };
});

const calculateNumFuelItems = (fuel: Fuel, numIngots: number): number => {
  if (!Number.isInteger(numIngots)) {
    numIngots = 5;
  }

  return 0;
};

const calculateTime = (fuel: Fuel, numIngots: number): number => {
  if (!Number.isInteger(numIngots)) {
    numIngots = 5;
  }

  return 0;
};

const selectedFuel = ref('charcoal');
const numIngots = ref(1);
</script>

<template>
  <VSelect
    label="Fuel"
    variant="outlined"
    placeholder="Pick a fuel"
    v-model="selectedFuel"
    :items="fuelOptions"
  ></VSelect>
  <p>{{ calculateTime(fuels[selectedFuel], numIngots) }}</p>
  <p>{{ calculateNumFuelItems(fuels[selectedFuel], numIngots) }}</p>
</template>
