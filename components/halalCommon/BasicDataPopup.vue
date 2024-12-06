<script setup lang="ts">
import { computed } from "vue";
import { useDisplay } from "vuetify";

const props = defineProps({
  parentBtnLabel: String,
  // cardItem: Object,
  variant: {
    default: "outlined",
  },
  density: {
    default: "default",
  },
  prependIcon: {
    type: String,
    default: "",
  },
  appendIcon: {
    type: String,
    default: "",
  },
  maxWidth: {
    type: [String, Number],
    default: 700,
  },

  closePopUp: {
    type: Function,
    default: () => {},
    required: false,
  },
});

const { mdAndUp } = useDisplay();

// Define responsive font size
const buttonFontSize = computed(() => {
  return mdAndUp.value ? "16px" : "12px";
});

const dialogMaxWidth = computed(() => {
  return typeof props.maxWidth === "number" ? props.maxWidth : props.maxWidth;
});
</script>

<template>
  <VBtn
    :variant="variant"
    :density="density"
    block
    :prepend-icon="prependIcon"
    :append-icon="appendIcon"
    :style="{ fontSize: buttonFontSize }"
  >
    {{ parentBtnLabel }}
    <VDialog activator="parent" :max-width="dialogMaxWidth">
      <slot name="content" />
    </VDialog>
  </VBtn>
</template>
