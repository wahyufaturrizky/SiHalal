<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  profil: {
    type: Array,
  },
  jenisusaha: {
    type: String,
  },
  skalausaha: {
    type: String,
  },
});

const { profil, jenisusaha, skalausaha } = props || {};

const panelOpen = ref(0);
</script>

<template>
  <VExpansionPanels v-model="panelOpen">
    <VExpansionPanel>
      <VExpansionPanelTitle>
        <h2>Profil</h2>
      </VExpansionPanelTitle>
      <VExpansionPanelText>
        <VRow v-for="(item, index) in profil" :key="index" class="mb-2">
          <VCol cols="4">
            <p class="mb-0">
              {{ (item as any).label }}
            </p>
          </VCol>
          <VCol cols="1">
            <p class="mb-0">:</p>
          </VCol>
          <VCol cols="7">
            <p class="mb-0">
              {{ (item as any).value }}
            </p>
          </VCol>
        </VRow>

        <VDivider class="my-4" />

        <VRow class="mb-2">
          <VCol cols="4">
            <p class="mb-0">Jenis Badan Usaha</p>
          </VCol>
          <VCol cols="1">
            <p class="mb-0">:</p>
          </VCol>
          <VCol cols="7">
            <p class="mb-0">{{ jenisusaha }}</p>
          </VCol>
        </VRow>

        <VRow class="mb-2">
          <VCol cols="4">
            <p class="mb-0">Skala Usaha</p>
          </VCol>
          <VCol cols="1">
            <p class="mb-0">:</p>
          </VCol>
          <VCol cols="7">
            <p class="mb-0">{{ skalausaha }}</p>
          </VCol>
        </VRow>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>

<style scoped>
.mb-0 {
  margin-block-end: 0;
}

.ms-4 {
  margin-inline-start: 1rem;
}
</style>
