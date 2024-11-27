<script setup lang="ts">
const profil = ref([
  { id: 1, key: "Nomor STTD", value: "" },
  { id: 2, key: "Nama Perusahaan", value: "" },
  { id: 3, key: "Alamat", value: "" },
  { id: 4, key: "Kota/Kab", value: "" },
  { id: 5, key: "Nama Personel", value: "" },
  { id: 6, key: "divider", value: true },
  { id: 7, key: "Jenis Layanan", value: "" },
  { id: 8, key: "Jenis Produk", value: "" },
  { id: 9, key: "Pendampingan", value: "" },
  { id: 10, key: "Pendamping", value: "" },
  { id: 11, key: "Lembaga", value: "" },
  { id: 12, key: "Nama Produk", value: "" },
  { id: 13, key: "divider", value: true },
]);

const paneSwitcher = [0];
</script>
<template>
  <VExpansionPanels v-model="paneSwitcher">
    <VExpansionPanel>
      <VExpansionPanelTitle><h2>Profil</h2></VExpansionPanelTitle>
      <br />
      <VExpansionPanelText>
        <VRow gutters="0.5svh" v-for="item in profil" :key="item.id">
          <VCol cols="3" v-if="item.key !== 'divider'">{{ item.key }}</VCol>
          <VCol cols="1" v-if="item.key !== 'divider'">:</VCol>
          <VCol cols="8" v-if="item.key !== 'divider'">{{ item.value }}</VCol>
          <VCol cols="12" v-else>
            <VDivider></VDivider>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12"><h4>Daftar Bahan</h4></VCol>
        </VRow>
        <VRow style="padding-left: 2svw">
          <VCol cols="12">
            <ol type="1">
              <li>
                <VRow>
                  <VCol cols="4">Bahan</VCol>
                  <VCol cols="1">:</VCol>
                  <VCol cols="7"
                    >(1) Bubuk Minuman Taro, (2) Bubuk Minuman Thaitea, (3) Susu
                    UHT, (4) Air Murni, (5) Bubuk Minuman Rasa Coklat</VCol
                  >
                </VRow>
              </li>
              <li>
                <VRow>
                  <VCol cols="4">Cleaning Agent</VCol>
                  <VCol cols="1">:</VCol>
                  <VCol cols="7"></VCol>
                </VRow>
              </li>
              <li>
                <VRow>
                  <VCol cols="4">Kemasan</VCol>
                  <VCol cols="1">:</VCol>
                  <VCol cols="7"></VCol>
                </VRow>
              </li>
            </ol>
          </VCol>
        </VRow>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>
<style type="text/css">
li {
  list-style-position: outside;
}
</style>
