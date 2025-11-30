<script setup lang="ts">
import { ref } from 'vue';
import { alloys } from '@/data/alloys';
import { fuels, type Fuel } from '@/data/fuels';
import type { Alloy, AlloyMaterial } from '@/data/alloys';

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

interface SelectItem {
  title: string;
  value: string;
}

const calculateNumFuelItems = (selAl: Alloy, selFuel: Fuel, numIngots: number): number => {
  if (!Number.isInteger(numIngots)) {
    numIngots = 5;
  }

  return Math.ceil(calculateTotalTime(selAl, selFuel, numIngots) / selFuel.burnTime);
};

const calculateSmeltingTime = (fuel: Fuel, numIngots: number): number => {
  if (!Number.isInteger(numIngots)) {
    numIngots = 5;
  }

  return 30 * numIngots;
};

const calculateWarmUpTime = (selAl: Alloy, fuel: Fuel, numIngots: number): number => {
  if (!Number.isInteger(numIngots)) {
    numIngots = 5;
  }

  if (selAl.smeltingTemp <= 950) {
    return 45;
  }

  if (selAl.smeltingTemp <= 980) {
    return 50;
  }

  if (selAl.smeltingTemp <= 1015) {
    return 55;
  }

  if (selAl.smeltingTemp <= 1030) {
    return 60;
  }

  if (selAl.smeltingTemp <= 1070) {
    return 60;
  }

  if (selAl.smeltingTemp <= 1100) {
    return 60;
  }

  if (selAl.smeltingTemp <= 1200) {
    return 75;
  }

  return 90;
};

const calculateTotalTime = (selAl: Alloy, selFuel: Fuel, numIngots: number): number => {
  return calculateWarmUpTime(selAl, selFuel, numIngots) + calculateSmeltingTime(selFuel, numIngots);
};

const selectedFuel = ref('charcoal');
const selectedAlloy = ref('tin-bronze');
const numIngots = ref(1);

const availableFuelOptions = (selAl: keyof typeof alloys): SelectItem[] => {
  return Object.entries(fuels).map((data) => {
    const isDisabled = data[1].burnTemp < (alloys[selAl]?.smeltingTemp || 10000);
    return {
      title: `${data[1].name} (${data[1].burnTemp}°C)${isDisabled ? ' (too cold)' : ''}`,
      value: data[0],
      props: { disabled: isDisabled },
    };
  });
};
</script>

<template>
  <main>
    <VContainer fluid>
      <VRow>
        <VCol cols="12">
          <h2>Smelting Calculator</h2>
          <p>
            Select the alloy you want to make on the left, enter the number of ingots you want to
            make, and then select the fuel you want to use on the right, and this tool will tell you
            how many nuggets of each material you need, and how many items of fuel you need to
            efficiently smelt it. :)
          </p>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" :md="6">
          <VSelect
            label="Alloy"
            variant="outlined"
            placeholder="Pick an alloy"
            v-model="selectedAlloy"
            :items="alloyOptions"
          ></VSelect>
          <p class="pl-2 pb-4">
            {{ alloys[selectedAlloy]?.name }} smelts at {{ alloys[selectedAlloy]?.smeltingTemp }}°C.
          </p>
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
        </VCol>
        <VCol cols="12" :md="6">
          <VSelect
            label="Fuel"
            variant="outlined"
            placeholder="Pick a fuel"
            v-model="selectedFuel"
            :items="availableFuelOptions(selectedAlloy)"
          ></VSelect>
          <p>
            Burn time of {{ fuels[selectedFuel]?.name }} is
            {{ fuels[selectedFuel]?.burnTime }} seconds per item.
          </p>
          <p>
            {{ calculateWarmUpTime(alloys[selectedAlloy], fuels[selectedFuel], numIngots) }}
            second(s) warm-up time
          </p>
          <p>
            {{ calculateSmeltingTime(fuels[selectedFuel], numIngots) }} second(s) active smelting
            time
          </p>
          <p>
            {{ calculateTotalTime(alloys[selectedAlloy], fuels[selectedFuel], numIngots) }}
            second(s) total time
          </p>
          <p>
            {{ calculateNumFuelItems(alloys[selectedAlloy], fuels[selectedFuel], numIngots) }} items
            of fuel to smelt
          </p>
        </VCol>
      </VRow>
    </VContainer>
  </main>
</template>
