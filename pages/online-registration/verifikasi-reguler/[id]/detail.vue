<script setup lang="ts">
const tabs = ref(0);
onMounted(() => {
  tabs.value = 0;
});

const props = defineProps({
  tabPengajuanEditable: {
    type: Boolean,
    default: false,
  },
  tabKomitmenEditable: {
    type: Boolean,
    default: false,
  },
  tabBahanEditable: {
    type: Boolean,
    default: false,
  },
  tabProsesEditable: {
    type: Boolean,
    default: false,
  },
  tabProdukEditable: {
    type: Boolean,
    default: false,
  },
  tabPemantauanEditable: {
    type: Boolean,
    default: false,
  },
  tabDokumenEditable: {
    type: Boolean,
    default: false,
  },
  headingEditPage: {
    type: String,
    required: false,
    default: "Ubah Pengajuan Reguler",
  },
});
</script>
<template>
  <KembaliButton />
  <p class="text-h2 font-weight-bold mb-4">{{ props.headingEditPage }}</p>
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
      <EditDataPengajuanReguler :is-editable="props.tabPengajuanEditable" />
    </VTabsWindowItem>

    <VTabsWindowItem value="2">
      <EditKomitmenDanTanggungJawabReguler :is-editable="props.tabKomitmenEditable"/>
    </VTabsWindowItem>

    <VTabsWindowItem value="3">
      <EditBahanReguler :is-editable="props.tabBahanEditable"/>
    </VTabsWindowItem>

    <VTabsWindowItem value="4">
      <EditProsesReguler :is-editable="props.tabProsesEditable"/>
    </VTabsWindowItem>

    <VTabsWindowItem value="5">
      <EditProdukReguler :is-editable="props.tabProdukEditable"/>
    </VTabsWindowItem>

    <VTabsWindowItem value="6">
      <EditPemantauanDanEvaluasiReguler :is-editable="props.tabPemantauanEditable"/>
    </VTabsWindowItem>

    <VTabsWindowItem value="7">
      <EditDokumenReguler :is-editable="props.tabDokumenEditable"/>
    </VTabsWindowItem>
  </VTabsWindow>
</template>
