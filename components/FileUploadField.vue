<script setup lang="ts">
import type { VFileInput } from "vuetify/components";

const emits = defineEmits(["onSelect", "onRemove", "validationIsValid"]);
const props = defineProps<{
  fileData: File | null;
  fileName: string | null;
  validationList?: Array<any> | null;
  initialFileName: String | null;
}>();

const fileInputRef = ref<VFileInput>();

const fileValidationMessage = ref();
const fileIsValid = ref(false);
const evaluatedFile = ref(false);

const updatedFileData = computed(() => props.fileData);
const updatedFileName = computed(() => props.fileName);
const initialFileName = computed(() => props.initialFileName);

const fileValidationRulesList = ref([]);

const validateFile = async () => {
  if (!fileInputRef.value) {
    // console.warn("fileInputRef is not defined");
    return;
  }

  try {
    const result = await fileInputRef.value.validate();
    console.log("Validation result:", result[0]);
    console.log("initial name = ", props.initialFileName);

    if (result?.length === parseInt("0")) {
      // console.log("emited true");
      fileIsValid.value = true;
      evaluatedFile.value = false;

      emits("validationIsValid", true);
    } else {
      if (initialFileName.value === "") {
        console.log("filename false");
        evaluatedFile.value = true;
      } else {
        console.log("filename true");
        evaluatedFile.value = false;
      }
      fileIsValid.value = false;
      fileValidationMessage.value = result[0];

      emits("validationIsValid", false, result[0]);
    }
  } catch (error) {
    console.error("Validation error:", error);
    emits("validationIsValid", false, "Error validation");
  }
};

const prependFileName = ref();

watch(
  () => props.validationList,
  (newData) => {
    if (updatedFileName.value === "") {
      fileValidationRulesList.value = [requiredValidator];
    }
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

const setPrependFileName = (value: string | null) => {
  prependFileName.value = value;
};

watch(
  () => props.fileName,
  async (newData1, newData2) => {
    prependFileName.value = newData1;
    await validateFile();
  },
  { immediate: true }
);

defineExpose({ validateFile, setPrependFileName });
</script>

<template>
  <!-- <div v-if="updatedFileData || updatedFileName"> -->
  <!-- <VTextField
      :rules="[
        requiredValidator,
        regexValidator(
          updatedFileName,
          /^[a-zA-Z0-9\s\(\)-_]+(.jpg|.png|.pdf|.jpeg)$/,
          'File extension not allowed'
        ),
      ]"
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
    </VTextField> -->
  <!-- <div class="v-input__details" v-if="evaluatedFile">
      <div
        class="v-messages"
        role="alert"
        aria-live="polite"
        id="input-698-messages"
        style="color: rgb(var(--v-theme-error)); padding-inline: 16px"
      >
        {{ fileValidationMessage }} 
        {{ initialFileName }}
      </div>
    </div> -->
  <!-- </div> -->
  <VFileInput
    ref="fileInputRef"
    :model-value="updatedFileData"
    :rules="fileValidationRulesList"
    class="custom-file-input"
    density="compact"
    rounded="xl"
    :label="prependFileName ? '' : 'No file choosen'"
    prepend-icon=""
    @change="(e: any) => emits('onSelect', e)"
    accept="image/*"
  >
    <template #append-inner>
      <VBtn rounded="s-0 e-xl" text="Choose File" />
    </template>
    <template #prepend-inner>
      <span
        style="white-space: nowrap"
        v-if="initialFileName && prependFileName"
      >
        {{ prependFileName?.substring(0, 20) + "..." }}
      </span>
      <!-- <VTextField
        style="white-space: nowrap; text-overflow: ellipsis"
        v-if="initialFileName"
        variant="plain"
      ></VTextField> -->
    </template>
  </VFileInput>
</template>

<style scoped></style>
