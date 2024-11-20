<script lang="ts" setup>
import { ref } from "vue";

const form = ref({
  nomorPendaftaran: null,
  namaPelakuUsaha: null,
  merekDagang: null,
  statusPermohonan: null,
  kodeFasilitasi: null,
  typePengajuan: null,
  layarExcel: null,
});

const statusPermohonanOptions = ["Reguler", "Prioritas", "Lainnya"];
const kodeFasilitasiOptions = ["Kode 1", "Kode 2", "Kode 3"];
const typePengajuanOptions = ["1", "2", "3"];
const layarExcelOptions = ["1excel", "2layar"];

const viewResults = () => {
  console.log(form.value);
};
</script>

<template>
  <VCard>
    <VCardTitle>
      <div class="d-flex justify-space-between align-center">
        <span class="text-h2 font-weight-bold">Filter</span>
        <VBtn color="primary" @click="viewResults"> Cari </VBtn>
      </div>
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
            placeholder="Pilih Status Permohonanan"
            :items="statusPermohonanOptions"
          />
        </VCol>
        <VCol cols="12" sm="4">
          <VSelect
            v-model="form.typePengajuan"
            placeholder="Pilih Tipe pengajuan"
            :items="typePengajuanOptions"
          />
        </VCol>

        <VCol cols="12" sm="4">
          <VSelect
            v-model="form.kodeFasilitasi"
            placeholder="Kode Fasilitasi"
            :items="kodeFasilitasiOptions"
          />
        </VCol>

        <VCol cols="12" sm="4">
          <VSelect
            v-model="form.layarExcel"
            placeholder="Kode Fasilitasi"
            :items="layarExcelOptions"
          />
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
