<script setup lang="ts">
import { useDisplay } from "vuetify";

const isVisible = ref(false);

const openDialog = () => {
  isVisible.value = true;
};

const closeDialog = () => {
  isVisible.value = false;
};

const { mdAndUp } = useDisplay();

const dialogMaxWidth = computed(() => {
  return mdAndUp.value ? 700 : "90%";
});
</script>

<template>
  <VBtn
    variant="text"
    prepend-icon="mdi-download-box"
    @click="openDialog"
    block
    class="text-left"
    style="width: 100%; justify-content: flex-start;"
  >
    Lihat Invoice
  </VBtn>
  <VDialog v-model="isVisible" :max-width="dialogMaxWidth">
    <VCard class="pa-8">
      TODO - LIHAT INVOICE - PREVIEW PDF
    </VCard>
  </VDialog>
</template>

<style scoped></style>
