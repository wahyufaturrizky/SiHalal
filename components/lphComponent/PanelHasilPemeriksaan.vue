<script setup lang="ts">
const props = defineProps<{
  type?: 'READ' | 'EDIT'
  data: object
  from: string
}>()

const detail = props?.data
</script>

<template>
  <div class="d-flex flex-column ga-4">
    <VRow no-gutters>
      <VCol cols="5">
        <div class="d-flex justify-space-between">
          <div class="text-h6">Tanggal Selesai LPH</div>
          <div class="me-2">:</div>
        </div>
      </VCol>
      <VCol cols="7" v-if="detail?.tanggal_selesai">
        {{ formatDateIntl(new Date(detail?.tanggal_selesai)) }}
      </VCol>
    </VRow>
    <VRow no-gutters>
      <VCol cols="5">
        <div class="d-flex justify-space-between">
          <div class="text-h6">Hasil</div>
          <div class="me-2">:</div>
        </div>
      </VCol>
      <VCol cols="7">
        {{ detail?.hasil }}
      </VCol>
    </VRow>
    <VRow
      v-if="props.from !== 'post-audit'"
      no-gutters
    >
      <VCol cols="5">
        <div class="d-flex justify-space-between">
          <div class="text-h6">Dokumen</div>
          <div class="me-2">:</div>
        </div>
      </VCol>
      <VCol cols="7">
        {{ detail?.dokumen }}
      </VCol>
    </VRow>
  </div>
</template>

<style scoped></style>
