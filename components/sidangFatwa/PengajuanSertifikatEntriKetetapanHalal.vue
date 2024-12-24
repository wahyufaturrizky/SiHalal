<script setup lang="ts">
const props = defineProps({
  detaildata: {
    type: Object,
  },
});

const { detaildata } = props || {};
console.log("@detaildata", detaildata);

const { sertifikat_halal_reguler } = detaildata || {};
const {
  tgl_permohonan,
  no_permohonan,
  jenis_layanan,
  jenis_pengajuan,
  jenis_produk,
  merek_dagang,
  area_pemasaran,
} = sertifikat_halal_reguler || {};

const listData = [
  {
    label: "No dan Tanggal Pemohon",
    value: `${no_permohonan} - ${formatDate(tgl_permohonan)}}`,
  },
  {
    label: "Jenis Layanan",
    value: jenis_layanan,
  },
  {
    label: "Jenis Pengajuan",
    value: jenis_pengajuan,
  },
  {
    label: "Jenis Produk",
    value: jenis_produk,
  },
  {
    label: "Merek Dagang",
    value: merek_dagang,
  },
  {
    label: "Area Pemasaran",
    value: area_pemasaran,
  },
];

const expanded = ref(0);
</script>

<template>
  <VExpansionPanels v-model="expanded">
    <VExpansionPanel>
      <VExpansionPanelTitle>
        <h3>Pengajuan Sertifikasi</h3>
      </VExpansionPanelTitle>
      <br />
      <VExpansionPanelText>
        <VRow v-for="(item, index) in listData" :key="index" class="info-row">
          <VCol cols="4" class="label-col">
            <span class="label">{{ (item as any).label }}</span>
          </VCol>
          <VCol cols="1" class="separator"> : </VCol>
          <VCol cols="7" class="value-col">
            <span class="value">{{ (item as any).value }}</span>
          </VCol>
        </VRow>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>
