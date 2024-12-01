<script setup lang="ts">
const props = defineProps<{
  dialogVisible: boolean;
  dialogTitle: string;
  dialogUse?: string;
  hideButton?: boolean;
}>();

const emit = defineEmits(["update:dialogVisible", "submit:commitAction"]);

const localDialogVisible = ref(props.dialogVisible);
const localDialogUse = ref(props.dialogUse);

const textSubmitButton = computed(() => {
  switch (localDialogUse.value) {
    case "CREATE":
      return "Tambah";
    case "EDIT":
      return "Simpan";
    default:
      return "Ya, Hapus";
  }
});

const closeDialog = () => {
  localDialogVisible.value = false;
};

watch(
  () => props.dialogUse,
  (newVal) => {
    localDialogUse.value = newVal;
  }
);
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
  <VDialog v-model="localDialogVisible" max-width="840px" persistent>
    <VCard class="pa-4">
      <VCardTitle class="d-flex justify-space-between align-center">
        <div class="text-h3 font-weight-bold">
          {{ props.dialogTitle }}
        </div>
        <VIcon @click="closeDialog"> fa-times </VIcon>
      </VCardTitle>
      <slot />
      <VCardActions class="px-4" v-if="!hideButton">
        <VBtn variant="outlined" class="px-4 me-3" @click="closeDialog"
          >Batal</VBtn
        >
        <VBtn
          variant="flat"
          class="px-4"
          :color="localDialogUse === 'DELETE' ? 'error' : 'primary'"
          @click="[emit('submit:commitAction'), closeDialog()]"
        >
          {{ textSubmitButton }}
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<style scoped></style>
