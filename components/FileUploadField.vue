<script setup lang="ts">
import type { VFileInput } from "vuetify/components";

const emits = defineEmits(["onSelect", "onRemove", "validationIsValid"]);
const props = defineProps<{
  fileData: File | null;
  fileName: string | null;
  validationList?: Array<any> | null;
}>();

const fileInputRef = ref<VFileInput>();

const fileValidationMessage = ref();
const fileIsValid = ref(false);

const validateFile = async () => {
  if (!fileInputRef.value) {
    console.warn("fileInputRef is not defined");
    return;
  }

  try {
    const result = await fileInputRef.value.validate();
    // console.log("Validation result:", result[0]);

    if (result?.length === parseInt("0")) {
      console.log("emited true");
      fileIsValid.value = true;
      emits("validationIsValid", true);
    } else {
      fileIsValid.value = false;
      fileValidationMessage.value = result[0];
      emits("validationIsValid", false, result[0]);
    }
  } catch (error) {
    console.error("Validation error:", error);
    emits("validationIsValid", false, "Error validation");
  }
};

const updatedFileData = computed(() => props.fileData);
const updatedFileName = computed(() => props.fileName);

const fileValidationRulesList = ref([requiredValidator]);

watch(
  () => props.validationList,
  (newData) => {
    fileValidationRulesList.value = [requiredValidator];
    if (newData) {
      fileValidationRulesList.value = [
        ...fileValidationRulesList.value,
        ...(newData as unknown as any[]),
      ];
      // console.log("validation list = ", fileValidationRulesList.value);
    }
  },
  { immediate: true }
);

watch(
  () => props.fileData || props.fileName,
  async (newData) => {
    await validateFile();
  },
  { immediate: true }
);

defineExpose({ validateFile });
</script>

<template>
  <div v-if="updatedFileData || updatedFileName">
    <VTextField
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
    <div v-if="!fileIsValid" class="v-input__details">
      <div
        class="v-messages"
        role="alert"
        aria-live="polite"
        id="input-698-messages"
        style="color: rgb(var(--v-theme-error)); padding-inline: 16px"
      >
        {{ fileValidationMessage }}
      </div>
    </div>
  </div>
  <VFileInput
    v-else
    ref="fileInputRef"
    :model-value="updatedFileData"
    :rules="fileValidationRulesList"
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
