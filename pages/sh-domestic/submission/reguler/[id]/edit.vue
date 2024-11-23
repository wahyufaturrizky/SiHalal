<script setup lang="ts">
const tabs = ref(0);
onMounted(() => {
  tabs.value = 0;
});
</script>
<template>
  <KembaliButton />
  <p class="text-h2 font-weight-bold mb-4">Ubah Pengajuan Reguler</p>
  <VTabs v-model="tabs" align-tabs="start" class="mb-4">
    <VTab value="1">Data Pengajuan</VTab>
    <VTab value="2">Komitmen dan Tanggung Jawab </VTab>
    <VTab value="3">Bahan</VTab>
    <VTab value="4">Proses</VTab>
    <VTab value="5">Produk</VTab>
    <VTab value="6">Pemantauan dan Evaluasi</VTab>
    <VTab value="7">Dokumen</VTab>
  </VTabs>
  <VTabsWindow v-model="tabs">
    <br />
    <VTabsWindowItem value="1">
      <EditDataPengajuanReguler />
    </VTabsWindowItem>

    <VTabsWindowItem value="2">
      <EditKomitmenDanTanggungJawabReguler />
    </VTabsWindowItem>

    <VTabsWindowItem value="3">
      <EditBahanReguler />
    </VTabsWindowItem>

    <VTabsWindowItem value="4">
      <EditProsesReguler />
    </VTabsWindowItem>

    <VTabsWindowItem value="5">
      <EditProdukReguler />
    </VTabsWindowItem>

    <VTabsWindowItem value="6">
      <EditPemantauanDanEvaluasiReguler />
    </VTabsWindowItem>

    <VTabsWindowItem value="7">
      <EditDokumenReguler />
    </VTabsWindowItem>
  </VTabsWindow>
</template>
