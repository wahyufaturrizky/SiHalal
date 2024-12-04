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
    prepend-icon="mdi-check-all"
    @click="openDialog"
    block
    class="text-left"
    style="width: 100%; justify-content: flex-start;"
  >
    konfirmasi Pembayaran
  </VBtn>
  <VDialog v-model="isVisible" :max-width="dialogMaxWidth">
    KONFIRMASI PEMBAYARAN
  </VDialog>
</template>

<style scoped></style>
