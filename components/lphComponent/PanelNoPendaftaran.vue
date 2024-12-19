<script setup lang="ts">
const props = defineProps<{
  data: object
}>()

const detail = ref(props?.data)
</script>

<template>
  <div class="d-flex flex-column ga-2">
    <div class="semi-bold">
      {{ detail?.no_daftar }}
    </div>
    <div class="text-h6" v-if="detail?.tanggal_daftar">
      {{ formatDateIntl(new Date(detail?.tanggal_daftar)) }}
    </div>
    <div class="text-h6">
      {{ detail?.provinsi }}
    </div>
  </div>
</template>

<style scoped>
.semi-bold {
  font-size: 16px;
  font-weight: 600;
}
</style>
