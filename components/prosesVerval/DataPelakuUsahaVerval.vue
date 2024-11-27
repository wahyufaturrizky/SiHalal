<script setup lang="ts">
const dataPelakuUsaha = ref([
  { id: 1, key: "Nomor ID", value: "" },
  { id: 2, key: "Tanggal", value: "" },
  { id: 3, key: "divider", value: true },
  { id: 4, key: "No. Surat Permohonan", value: "" },
  { id: 5, key: "Tanggal Permohonan", value: "" },
  { id: 6, key: "Jenis Layanan", value: "" },
  { id: 7, key: "Jenis Produk", value: "" },
  { id: 8, key: "Merk Dagang", value: "" },
  { id: 9, key: "Area Pemasaran", value: "" },
  { id: 10, key: "Pendamping", value: "" },
  { id: 11, key: "Lembaga Pendamping", value: "" },
  { id: 12, key: "divider", value: true },
  { id: 13, key: "Nama Perusahaan", value: "" },
  { id: 14, key: "Nama Alternatif Perusahaan", value: "" },
  { id: 15, key: "Alamat", value: "" },
  { id: 16, key: "Kota / Kab", value: "" },
  { id: 17, key: "Provinsi", value: "" },
  { id: 18, key: "Kode Pos", value: "" },
  { id: 19, key: "Negara", value: "" },
  { id: 20, key: "Telepon", value: "" },
  { id: 21, key: "Email", value: "" },
  { id: 22, key: "divider", value: true },
  { id: 23, key: "Jenis Badan Usaha", value: "" },
  { id: 24, key: "Sekala Usaha", value: "" },
  { id: 25, key: "Tingkat Usaha", value: "" },
  { id: 26, key: "Modal Dasar", value: "" },
  { id: 27, key: "Asal Usaha", value: "" },
]);

const expanded = [0];
</script>
<template>
  <VExpansionPanels v-model="expanded">
    <VExpansionPanel>
      <VExpansionPanelTitle><h3>Data Pelaku Usaha</h3></VExpansionPanelTitle>
      <VExpansionPanelText>
        <VRow gutters="0.5svh" v-for="item in dataPelakuUsaha" :key="item.id">
          <VCol cols="3" v-if="item.key !== 'divider'">{{ item.key }}</VCol>
          <VCol cols="1" v-if="item.key !== 'divider'">:</VCol>
          <VCol cols="8" v-if="item.key !== 'divider'">{{ item.value }}</VCol>
          <VCol cols="12" v-else-if="item.key === 'divider' && item.value">
            <VDivider></VDivider>
          </VCol>
        </VRow>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>
