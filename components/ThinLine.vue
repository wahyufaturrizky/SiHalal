<template>
  <div
    class="thin-line"
    :style="{
      height: `${props.thickness}px`,
      backgroundColor: '#ccc',
      opacity: 0.5
    }"
  ></div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  thickness: {
    type: Number,
    required: true,
    default: 1, // Ketebalan default
  },
});
</script>

<style scoped>
.thin-line {
  width: 100%; /* Lebar penuh */
  margin: 10px 0; /* Margin atas dan bawah */
}
</style>
