<script setup lang="ts">
const router = useRouter();
</script>

<template>
  <div class="d-flex align-center cursor-pointer" @click="router.go(-1)">
    <VIcon icon="mdi-chevron-left" size="40px" color="primary" />
    <div class="text-primary">Kembali</div>
  </div>
  <VRow no-gutters>
    <VCol>
      <h1>Penyelesaian Data Post Audit</h1>
    </VCol>
  </VRow>
  <VRow>
    <VCol>
      <VCard>
        <VCardTitle class="my-3 d-flex justify-space-between align-center">
          <div class="font-weight-bold text-h4">Data Pemeriksaan Produk</div>
        </VCardTitle>
        <VCardText>
          <VRow class="mb-4">
            <VCol cols="2">
              <TableFilterInputMenu />
            </VCol>
            <VSpacer />
            <VCol cols="9">
              <VTextField
                placeholder="Cari Nama Pengajuan"
                density="compact"
                rounded="xl"
                append-inner-icon="mdi-magnify"
              />
            </VCol>
          </VRow>
          <TablePemeriksaanProduk detail-path="/reguler/post-audit" />
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped lang="scss"></style>
