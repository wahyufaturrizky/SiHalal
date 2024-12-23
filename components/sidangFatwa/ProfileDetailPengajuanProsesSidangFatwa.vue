<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  profil: {
    type: Array,
  },
  jenisusaha: {
    type: String,
  },
});

const { profil, jenisusaha } = props || {};

const panelOpen = ref(0);
const businessScale = ref("Mikro");

const updateScale = () => {
  console.log(`Skala Usaha diubah menjadi: ${businessScale.value}`);
};
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
              {{ item.label }}
            </p>
          </VCol>
          <VCol cols="1">
            <p class="mb-0">:</p>
          </VCol>
          <VCol cols="7">
            <p class="mb-0">
              {{ item.value }}
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
            <div class="d-flex align-center justify-end">
              <VSelect
                v-model="businessScale"
                density="compact"
                :items="['Mikro']"
              />
              <VBtn class="ms-4" variant="outlined" @click="updateScale">
                Update
              </VBtn>
            </div>
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
