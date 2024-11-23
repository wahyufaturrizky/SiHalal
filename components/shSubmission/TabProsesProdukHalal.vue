<script setup lang="ts">
const props = defineProps({
  userRoles: {
    type: Array<string> || null,
  },
});
</script>

<template>
  <VCard class="pb-5">
    <VCardTitle class="mb-5">
      <div class="font-weight-bold text-h4">Proses Produk Halal</div>
    </VCardTitle>
    <VCardText>
      <VItemGroup v-if="!props.userRoles?.includes('Verifikator')">
        <VLabel>Proses</VLabel>
        <VTextField placeholder="Masukkan Proses" density="compact">
          <template #append>
            <VBtn variant="outlined">Tambah</VBtn>
          </template>
        </VTextField>
        <br />
      </VItemGroup>
      <VItemGroup>
        <VLabel>Proses Produksi</VLabel>
        <VTextarea placeholder="Masukkan Proses Produksi" density="compact" />
      </VItemGroup>
    </VCardText>
    <VCardActions class="pe-5">
      <VSpacer />
      <VBtn variant="flat" text="Simpan Hasil Verifikasi PPh" class="px-4" />
    </VCardActions>
  </VCard>
</template>

<style scoped></style>
