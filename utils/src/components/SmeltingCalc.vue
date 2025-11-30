<script setup lang="ts">
import { ref } from 'vue';

interface AlloyMaterial {
  materialOptions: string[];
  minPercentage: number;
  maxPercentage: number;
  optimumPercentage: number;
  nuggets: number[];
}

interface Alloy {
  name: string;
  maxIngots: number;
  materials: AlloyMaterial[];
}

const alloys: { [key: string]: Alloy } = {
  'tin-bronze': {
    name: 'Tin Bronze',
    maxIngots: 20,
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

interface SelectItem {
  title: string;
  value: string;
}

const alloyOptions: SelectItem[] = Object.entries(alloys).map((data) => {
  return {
    title: data[1].name,
    value: data[0],
  };
});

const calculateNuggets = (material: AlloyMaterial, numIngots: number): number => {
  if (!Number.isInteger(numIngots)) {
    numIngots = 5;
  }

  console.log(
    numIngots,
    material.nuggets.length,
    numIngots / material.nuggets.length,
    numIngots % material.nuggets.length,
  );

  let totalNuggets = 0;
  if (numIngots >= material.nuggets.length) {
    console.log(
      'adding',
      Math.floor(numIngots / material.nuggets.length) * material.nuggets.length,
      'nuggets',
    );
    totalNuggets +=
      material.nuggets[material.nuggets.length - 1] *
      Math.floor(numIngots / material.nuggets.length);
  }
  if (numIngots % material.nuggets.length > 0) {
    totalNuggets += material.nuggets[(numIngots - 1) % material.nuggets.length];
  }

  return totalNuggets;
};

const calculatePercentage = (material: AlloyMaterial, numIngots: number): number => {
  if (!Number.isInteger(numIngots)) {
    numIngots = 5;
  }

  const numNuggets = calculateNuggets(material, numIngots);
  return (numNuggets / (numIngots * 20)) * 100;
};

const selectedAlloy = ref('tin-bronze');
const numIngots = ref(1);
</script>

<template>
  <VSelect
    label="Alloy"
    variant="outlined"
    placeholder="Pick an alloy"
    v-model="selectedAlloy"
    :items="alloyOptions"
  ></VSelect>
  <VSlider
    step="1"
    min="1"
    :max="alloys[selectedAlloy]?.maxIngots || 20"
    label="Number of ingots"
    v-model="numIngots"
  />
  <VTable>
    <thead>
      <tr>
        <th>Materials for {{ numIngots }} ingot{{ numIngots > 1 ? 's' : '' }}</th>
        <th>Nuggets</th>
        <th>Actual%</th>
        <th>Optimum%</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(c, idx) in alloys[selectedAlloy]?.materials"
        :key="`${selectedAlloy}-component-${idx}`"
      >
        <td>
          {{ c.materialOptions.join(', ') }} ({{ c.minPercentage
          }}<template v-if="c.maxPercentage != c.minPercentage"
            >&#x2013;{{ c.maxPercentage }}</template
          >%)
        </td>
        <td>{{ calculateNuggets(c, numIngots) }}</td>
        <td>{{ calculatePercentage(c, numIngots).toFixed(1).replace(/\.0$/, '') }}%</td>
        <td>{{ c.optimumPercentage }}%</td>
      </tr>
    </tbody>
  </VTable>
</template>
