<script setup lang="ts">
const props = defineProps<{
  dialogVisible: boolean;
  dialogTitle: string;
}>();

const emit = defineEmits(["update:dialogVisible"]);

const localDialogVisible = ref(props.dialogVisible);
const handleCloseDialog = () => {
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
  <VDialog v-model="localDialogVisible" max-width="840px" persistent>
    <VCard class="pa-4">
      <VCardTitle class="d-flex justify-space-between align-center">
        <div class="text-h4 font-weight-bold">
          {{ props.dialogTitle }}
        </div>
        <VIcon @click="handleCloseDialog" size="large"> mdi-close-thick </VIcon>
      </VCardTitle>
      <slot />
    </VCard>
  </VDialog>
</template>
