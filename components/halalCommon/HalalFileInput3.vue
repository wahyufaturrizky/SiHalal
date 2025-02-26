<script setup>
import { useDisplay } from "vuetify";

const props = defineProps({
  modelValue: {
    type: [Object, null],
    default: null,
  },
  label: {
    type: String,
    default: "No File Chosen",
  },
  rules: {
    type: [Object, null],
    default: [],
  },
  onChange: Function,
});

const emit = defineEmits(["update:modelValue", "change"]);

const file = ref(props.modelValue);
const fileInput = ref(null);

const { mdAndUp } = useDisplay();

const width = computed(() => {
  return mdAndUp.value ? "360px" : "90%";
});

const truncateFileName = (fileName) => {
  const maxLength = 10;

  if (fileName.length > maxLength) {
    const firstPart = fileName.slice(0, 5);
    const lastPart = fileName.slice(-3);
    return `${firstPart}...${lastPart}`;
  }
  return fileName;
};

watch(file, (newFile) => {
  emit("update:modelValue", newFile);
  emit("change", newFile);
  if (props.onChange) {
    props.onChange(newFile);
  }
});
</script>

<template>
  <div class="d-flex" :style="{ maxWidth: width }">
    <VFileInput
        ref="fileInput"
        v-model="file"
        accept=".pdf,image/*"
        prepend-icon=""
        clearable
        :rules="rules"
        density="compact"
        single-line
    >
      <template #label>
        <span v-if="file === null">
          {{ label }}
        </span>
      </template>
      <template #selection="{ fileNames }">
        <span v-for="(name, index) in fileNames" :key="index">
          {{ truncateFileName(name) }}
        </span>
      </template>
      <template #append-inner="{}">
        <VBtn
            v-if="file === null"
            style="height: 100%"
            class="border rounded-ts-0 rounded-bs-0 rounded-te-xl rounded-be-xl px-4"
            color="primary"
            append-icon="mdi-upload"
        >
        </VBtn>
      </template>
    </VFileInput>
  </div>
</template>

<style scoped>
::v-deep(.v-field--appended) {
  padding-inline-end: 0;
}
</style>
