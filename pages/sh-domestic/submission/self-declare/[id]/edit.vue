<script setup lang="ts">
const route = useRoute();

const tabs = ref("1");
onMounted(() => {
  tabs.value = route.query?.tab ? String(route.query.tab) : "1";
});
</script>

<template>
  <VContainer>
    <KembaliButton />
    <VRow align="center">
      <VCol>
        <div class="text-h3 font-weight-bold">Ubah Pengajuan Self Declare</div>
      </VCol>
      <VCol class="d-flex justify-end">
        <VBtn color="primary" variant="flat" text="Simpan Perubahan" />
      </VCol>
    </VRow>

    <VRow>
      <VCol>
        <VTabs v-model="tabs" class="mb-10">
          <VTab value="1">Pelaku Usaha</VTab>
          <VTab value="2">Pengajuan</VTab>
          <VTab value="3">Pabrik & Outlet</VTab>
          <VTab value="4">Bahan</VTab>
          <VTab value="5">Produk</VTab>
          <VTab value="6">Proses Produk Halal</VTab>
          <VTab value="7">Pernyataan</VTab>
        </VTabs>

        <VTabsWindow v-model="tabs">
          <VTabsWindowItem value="1">
            <PelakuUsahaMain />
          </VTabsWindowItem>
          <VTabsWindowItem value="2">
            <PengajuanMain />
          </VTabsWindowItem>
          <VTabsWindowItem value="3">
            <PabrikOutletMain />
          </VTabsWindowItem>
          <VTabsWindowItem value="4">
            <BahanMain />
          </VTabsWindowItem>
          <VTabsWindowItem value="5">
            <ProdukMain />
          </VTabsWindowItem>
          <VTabsWindowItem value="6">
            <EditProsesProdukHalalSelfDeclareSubmission />
          </VTabsWindowItem>
          <VTabsWindowItem value="7">
            <EditPernyataanSelfDeclareSubmision />
          </VTabsWindowItem>
        </VTabsWindow>
      </VCol>
    </VRow>
  </VContainer>
</template>
