<script setup>
import { defineProps, ref } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})

const isOpen = ref(true)
</script>

<template>
  <VCard class="pa-6">
    <VRow justify="end">
      <VCol cols="11">
        <h5 class="text-h5">
          {{ props.title }}
        </h5>
      </VCol>
      <VCol cols="1">
        <VBtn
          color="no-bg"
          elevation="0"
          style="border-radius: 50%; width: 40px; height: 40px; padding: 0;"
          @click="isOpen = !isOpen"
        >
          <VIcon style="font-size: 2.5em">{{ isOpen ? 'mdi-chevron-up' : 'mdi-chevron-left' }}</VIcon>
        </VBtn>
      </VCol>
    </VRow>
    <VExpandTransition>
      <VCard
        v-if="isOpen"
        elevation="0"
      ><slot />
      </VCard>
    </VExpandTransition>
  </VCard>
</template>

<style scoped>
.v-btn:active,
.v-btn:focus {
  background-color: transparent !important;
  color: inherit !important
}
</style>
