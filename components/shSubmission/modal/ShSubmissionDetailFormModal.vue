<script setup lang="ts">
const props = defineProps({
  dialogVisible: {
    type: Boolean,
    required: true,
  },
  dialogUse: {
    type: String,
  },
  dialogTitle: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:dialogVisible"]);

const localDialogUse = computed(() => props.dialogUse || "CREATE");
const localDialogVisible = ref(props.dialogVisible);
const closeDialog = () => {
  localDialogVisible.value = false;
};

watch(
  () => props.dialogVisible,
  (newVal) => {
    localDialogVisible.value = newVal;
  }
);
watch(localDialogVisible, (newVal) => {
  emit("update:dialogVisible", newVal);
});
</script>

<template>
  <VDialog v-model="localDialogVisible" max-width="840px">
    <VCard class="pa-4">
      <VCardTitle class="d-flex justify-space-between align-center">
        <div class="text-h3 font-weight-bold">
          {{ props.dialogTitle }}
        </div>
        <VIcon @click="closeDialog"> fa-times </VIcon>
      </VCardTitle>
      <slot />
      <VCardActions class="px-4">
        <VBtn variant="outlined" class="px-4 me-3">Batal</VBtn>
        <VBtn variant="flat" class="px-4">
          {{ localDialogUse == "CREATE" ? "Tambah" : "Simpan" }}
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<style scoped></style>
