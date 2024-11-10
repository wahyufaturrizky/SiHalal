<script setup lang="ts">
import { computed } from "vue"
import { useDisplay } from "vuetify"

const props = defineProps({
  parentBtnLabel: String,
  cardItem: Object,
})

const { mdAndUp } = useDisplay()

const dialogMaxWidth = computed(() => {
  return mdAndUp.value ? 700 : '90%'
})

</script>

<template>
  <VBtn variant="outlined" block>
    {{ props.parentBtnLabel }}
    <VDialog activator="parent" :max-width="dialogMaxWidth">
      <slot name="content" />
    </VDialog>
  </VBtn>
</template>
