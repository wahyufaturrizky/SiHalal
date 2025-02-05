<script setup lang="ts">
const props = defineProps({
  data: {
    type: Array,
    required: false,
  },
})

const unduhFile = async (link: string) => {
  await downloadDocument(link, 'FILES')
}
</script>

<template>
  <InfoRow
    v-for="(item, index) in props.data"
    :key="index"
    cols-name="6"
    cols-separator="1"
    cols-value="5"
    :name="item.label"
  >
    <div class="d-flex ga-4">
      <VIcon
        v-if="item.label === 'Upload Surat'"
        icon="fa-download"
        color="primary"
        @click="() => unduhFile(item.value)"
      />
      {{ item.value }}
    </div>
  </InfoRow>
</template>
