<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <VApp>
    <section>
      <VAppBar>
        <VAppBarTitle> Vintage Story Utils </VAppBarTitle>
        <VBtn :as="RouterLink" to="/"> Smelting Calculator </VBtn>
        <VBtn :as="RouterLink" to="/about"> About </VBtn>
      </VAppBar>
    </section>

    <section id="main">
      <RouterView />
    </section>
  </VApp>
</template>
