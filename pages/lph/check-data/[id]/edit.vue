<script setup lang="ts">
import EditKomitmenDanTanggungJawabLph from "@/components/lphComponent/EditKomitmenDanTanggungJawabLph.vue";
import EditProsesLph from "@/components/lphComponent/EditProsesLph.vue";

const tabs = ref(0);
onMounted(() => {
  tabs.value = 0;
});

const props = defineProps({
  tabPengajuanEditable: {
    type: Boolean,
    default: true,
  },
  tabKomitmenEditable: {
    type: Boolean,
    default: true,
  },
  tabBahanEditable: {
    type: Boolean,
    default: true,
  },
  tabProsesEditable: {
    type: Boolean,
    default: true,
  },
  tabProdukEditable: {
    type: Boolean,
    default: true,
  },
  tabPemantauanEditable: {
    type: Boolean,
    default: true,
  },
  tabDokumenEditable: {
    type: Boolean,
    default: true,
  },
  headingEditPage: {
    type: String,
    required: true,
    default: "Update Data LPH",
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
      <!-- <EditDataPengajuanLph :is-editable="props.tabPengajuanEditable" /> -->
      <LazyEditDataPengajuanLph
        :is-editable="props.tabPengajuanEditable"
      ></LazyEditDataPengajuanLph>
    </VTabsWindowItem>

    <VTabsWindowItem value="2">
      <!-- TODO: need to know about the logic, how it can be disabled -->
      <EditKomitmenDanTanggungJawabLph />
    </VTabsWindowItem>

    <VTabsWindowItem value="3">
      <LazyEditBahanLph
        :is-editable="props.tabBahanEditable"
      ></LazyEditBahanLph>
    </VTabsWindowItem>

    <VTabsWindowItem value="4">
      <EditProsesLph />
    </VTabsWindowItem>

    <VTabsWindowItem value="5">
      <LazyEditProdukLph
        :is-editable="props.tabProdukEditable"
      ></LazyEditProdukLph>
    </VTabsWindowItem>

    <VTabsWindowItem value="6">
      <LazyEditPemantauanDanEvaluasiLph
        :is-editable="props.tabPemantauanEditable"
      ></LazyEditPemantauanDanEvaluasiLph>
    </VTabsWindowItem>

    <VTabsWindowItem value="7">
      <LazyEditDokumenLph></LazyEditDokumenLph>
    </VTabsWindowItem>
  </VTabsWindow>
</template>
