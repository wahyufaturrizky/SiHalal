<script setup lang="ts">
const props = defineProps({
  data: {
    type: Array,
    required: false,
  },
})

const getChipColor = (status: string) => {
  if (status === 'Pengajuan')
    return 'success'

  return 'primary'
}
</script>

<template>
  <InfoRow
    v-for="(item, index) in props.data"
    :key="index"
    cols-name="5"
    cols-separator="1"
    cols-value="6"
    :name="item.label"
  >
    <div v-if="index === 0">
      <VChip
        :key="item.id"
        :color="getChipColor(item.status)"
        label
        class=""
      >
        Pengajuan
      </VChip>
    </div>
    <div v-else>
      {{ item.value }}
    </div>
  </InfoRow>
</template>
