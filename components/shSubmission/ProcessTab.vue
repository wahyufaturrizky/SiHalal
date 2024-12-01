<script setup lang="ts">
const props = defineProps({
  userRoles: {
    type: Array<string> || null,
  },
});

const handleAddData = () => {
  useSnackbar().sendSnackbar("Berhasil menambahkan data", "success");
};
</script>

<template>
  <VCard class="pb-5 pt-3">
    <VCardTitle class="mb-5">
      <div class="font-weight-bold text-h4">Proses Produk Halal</div>
    </VCardTitle>
    <VCardText>
      <VItemGroup v-if="!props?.userRoles?.includes('Verifikator')">
        <div class="font-weight-bold mb-1">Proses</div>
        <VTextField
          placeholder="Masukkan Proses"
          density="compact"
          rounded="xl"
        >
          <template #append>
            <VBtn variant="outlined" @click="handleAddData">Tambah</VBtn>
          </template>
        </VTextField>
        <br />
      </VItemGroup>
      <VItemGroup>
        <div class="font-weight-bold mb-1">Proses Produksi</div>
        <VTextarea
          placeholder="Masukkan Proses Produksi"
          density="compact"
          rounded="xl"
        />
      </VItemGroup>
    </VCardText>
    <VCardActions class="pe-5">
      <VSpacer />
      <VBtn
        variant="flat"
        text="Simpan Hasil Verifikasi PPh"
        class="px-4"
        @click="handleAddData"
      />
    </VCardActions>
  </VCard>
</template>

<style scoped></style>
