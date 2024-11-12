<template>
  <div>
    <!-- Custom button to activate file input -->
    <v-btn :color="buttonColor" @click="triggerFileInput" variant="outlined">
      {{ buttonText }}
      <v-icon icon="fa-upload" end />
    </v-btn>

    <!-- Display selected file name -->
    <div v-if="fileName" class="mt-2">Selected file: {{ fileName }}</div>

    <!-- Hidden file input -->
    <input
      ref="fileInput"
      type="file"
      class="d-none"
      @change="handleFileChange"
    />
  </div>
</template>

<script lang="ts" setup>
// Define component props
const props = defineProps<{
  buttonText?: string;
  buttonColor?: string;
}>();

// Define component emits
const emit = defineEmits<{
  (e: "fileSelected", file: File | null): void;
}>();

const fileInput = ref<HTMLInputElement | null>(null);
const fileName = ref<string | null>(null);

// Function to trigger the hidden file input
function triggerFileInput() {
  fileInput.value?.click();
}

// Function to handle file selection
function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files ? target.files[0] : null;
  fileName.value = file ? file.name : null;
  emit("fileSelected", file); // Emit the selected file
}
</script>

<style></style>
