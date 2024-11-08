<script setup lang="ts">
const tabs = ref(0);
onMounted(() => {
  tabs.value = 0;
});
</script>
<template>
  <VContainer>
    <VRow
      ><VCol :cols="12"><KembaliButton></KembaliButton></VCol
    ></VRow>
    <VRow>
      <VCol :cols="6"><h2>Ubah Pengajuan Self Declare</h2></VCol>
      <VCol :cols="6" style="display: inline-flex; justify-content: flex-end">
        <div>
          <VBtn color="error" variant="outlined" style="margin-right: 1svw"
            >Batal</VBtn
          >
        </div>
        <div><VBtn>Simpan Perubahan</VBtn></div>
      </VCol>
    </VRow>
    <VRow>
      <VCol :cols="12">
        <VTabs v-model="tabs" align-tabs="start">
          <VTab value="1">Pelaku Usaha</VTab>
          <VTab value="2">Pengajuan</VTab>
          <VTab value="3">Pabrik & Outlet</VTab>
          <VTab value="4">Bahan</VTab>
          <VTab value="5">Produk</VTab>
          <VTab value="6">Proses Produk Halal</VTab>
          <VTab value="7">Pernyataan</VTab>
        </VTabs>
        <VTabsWindow v-model="tabs">
          <br />
          <VTabsWindowItem value="1"
            ><PelakuUsahaMain></PelakuUsahaMain
          ></VTabsWindowItem>
          <VTabsWindowItem value="2"><PengajuanMain /></VTabsWindowItem>
          <VTabsWindowItem value="3"
            ><PabrikOutletMain></PabrikOutletMain
          ></VTabsWindowItem>
          <VTabsWindowItem value="4">four</VTabsWindowItem>
          <VTabsWindowItem value="5">five</VTabsWindowItem>
          <VTabsWindowItem value="6">six</VTabsWindowItem>
          <VTabsWindowItem value="7">seven</VTabsWindowItem>
        </VTabsWindow>
      </VCol>
    </VRow>
  </VContainer>
</template>
