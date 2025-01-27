<script setup lang="ts">
const emits = defineEmits(["onSelect", "onRemove"]);
const props = defineProps<{
  fileData: File | null;
  fileName: string | null;
}>();

const updatedFileData = computed(() => props.fileData);
const updatedFileName = computed(() => props.fileName);
</script>

<template>
  <VTextField
    v-if="updatedFileData || updatedFileName"
    :model-value="updatedFileName"
    density="compact"
    placeholder="No file choosen"
    rounded="xl"
  >
    <template #append-inner>
      <VIcon
        icon="fa-trash"
        color="error"
        class="cursor-pointer"
        @click="() => emits('onRemove')"
      />
    </template>
  </VTextField>
  <VFileInput
    v-else
    :model-value="updatedFileData"
    class="custom-file-input"
    density="compact"
    rounded="xl"
    label="No file choosen"
    prepend-icon=""
    @change="(e: any) => emits('onSelect', e)"
    accept="image/*"
  >
    <template #append-inner>
      <VBtn rounded="s-0 e-xl" text="Choose File" />
    </template>
  </VFileInput>
</template>

<style scoped></style>
