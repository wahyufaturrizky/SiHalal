<script setup lang="ts">
const props = defineProps({
  title: String,
  parentBtnLabel: String,
  cardItem: Object,
  cardWidth: Number,
})
</script>

<template>
  <div>
    <VBtn>
      {{ props.parentBtnLabel }}
      <VDialog
        activator="parent"
        :max-width="props.cardWidth"
      >
        <VCard :title="props.title">
          <VCardItem>
            <slot name="content" />
          </VCardItem>
        </VCard>
      </VDialog>
    </VBtn>
  </div>
</template>
