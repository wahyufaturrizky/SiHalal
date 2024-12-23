<script setup lang="ts">
const props = defineProps({
  detaildata: {
    type: Object,
  },
});

const { detaildata } = props || {};
const { sidang_fatwa } = detaildata || {};
const { SertifikatHalalReguler } = sidang_fatwa || {};
const { tgl_mohon } = SertifikatHalalReguler || {};

const listData = [
  {
    label: "No dan Tanggal Pemohon",
    value: `${no_mohon} - ${formatDate(tgl_mohon)}}`,
  },
  {
    label: "Jenis Layanan",
    value: "Makanan",
  },
  {
    label: "Jenis Pengajuan",
    value: "Baru",
  },
  {
    label: "Jenis Produk",
    value: "Penyedia layanan makanan dan minuman dengan olahal",
  },
  {
    label: "Merek Dagang",
    value: "Hayuuk Grill",
  },
  {
    label: "Area Pemasaran",
    value: "Provinsi",
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
        <VRow class="info-row">
          <VCol cols="4" class="label-col">
            <span class="label">No dan Tanggal Pemohon</span>
          </VCol>
          <VCol cols="1" class="separator"> : </VCol>
          <VCol cols="7" class="value-col">
            <span class="value">01/RAMEN/VII/23 - 26/06/2023</span>
          </VCol>
        </VRow>
        <VRow class="info-row">
          <VCol cols="4" class="label-col">
            <span class="label">Jenis Layanan</span>
          </VCol>
          <VCol cols="1" class="separator"> : </VCol>
          <VCol cols="7" class="value-col">
            <span class="value">Makanan</span>
          </VCol>
        </VRow>
        <VRow class="info-row">
          <VCol cols="4" class="label-col">
            <span class="label">Jenis Pengajuan</span>
          </VCol>
          <VCol cols="1" class="separator"> : </VCol>
          <VCol cols="7" class="value-col">
            <span class="value">Baru</span>
          </VCol>
        </VRow>
        <VRow class="info-row">
          <VCol cols="4" class="label-col">
            <span class="label">Jenis Produk</span>
          </VCol>
          <VCol cols="1" class="separator"> : </VCol>
          <VCol cols="7" class="value-col">
            <span class="value"
              >Penyedia layanan makanan dan minuman dengan olahal</span
            >
          </VCol>
        </VRow>
        <VRow class="info-row">
          <VCol cols="4" class="label-col">
            <span class="label">Merek Dagang</span>
          </VCol>
          <VCol cols="1" class="separator"> : </VCol>
          <VCol cols="7" class="value-col">
            <span class="value">Hayuuk Grill</span>
          </VCol>
        </VRow>
        <VRow class="info-row">
          <VCol cols="4" class="label-col">
            <span class="label">Area Pemasaran</span>
          </VCol>
          <VCol cols="1" class="separator"> : </VCol>
          <VCol cols="7" class="value-col">
            <span class="value">Provinsi</span>
          </VCol>
        </VRow>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>
