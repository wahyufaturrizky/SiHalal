<script lang="ts" setup>
import { ref } from "vue";

// Data form untuk menyimpan input pengguna
const form = ref({
  nomorPendaftaran: "",
  namaPelakuUsaha: "",
  merekDagang: "",
  statusPermohonan: "",
  kodeFasilitasi: "",
});

// Opsi untuk select status permohonan dan kode fasilitasi
const statusPermohonanOptions = ["Reguler", "Prioritas", "Lainnya"];
const kodeFasilitasiOptions = ["Kode 1", "Kode 2", "Kode 3"];

// Fungsi untuk menampilkan hasil
const viewResults = () => {
  console.log(form.value);
};
</script>

<template>
  <VCard>
    <VCardTitle>
      <span class="text-h6 font-weight-bold">Filter</span>
    </VCardTitle>
    <VCardText>
      <VRow>
        <VCol cols="12" sm="4">
          <VTextField
            v-model="form.nomorPendaftaran"
            label="Nomor Pendaftaran"
          />
        </VCol>
        <VCol cols="12" sm="4">
          <VTextField
            v-model="form.namaPelakuUsaha"
            label="Nama Pelaku Usaha"
          />
        </VCol>
        <VCol cols="12" sm="4">
          <VTextField v-model="form.merekDagang" label="Merek Dagang" />
        </VCol>
        <VCol cols="12" sm="4">
          <VSelect
            v-model="form.statusPermohonan"
            label="Status Permohonan"
            :items="statusPermohonanOptions"
          />
        </VCol>
        <VCol cols="12" sm="4">
          <VSelect
            v-model="form.kodeFasilitasi"
            label="Kode Fasilitasi"
            :items="kodeFasilitasiOptions"
          />
        </VCol>
        <VCol cols="12" sm="4">
          <VBtn color="primary" @click="viewResults"> View </VBtn>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.v-card-title {
  color: #3f51b5;
}
</style>
