<script lang="ts" setup>
interface Pendaftaran {
  channel_pendaftaran: string
  fasilitator: string
  jenis_pengajuan: string
  kode_fac: string
  nomor_daftar: string
  status: string
  tanggal: string
  tempat_pendaftaran: string
}
const props = defineProps<{data : Pendaftaran}>();


const dataDetail = ref(props.data);
watchEffect(()=> {
  dataDetail.value = props.data
})

const selectedFilters = ref({
  fasilitas: 'Semua',
  jenisProduk: 'Semua',
  provinsi: 'Semua',
  lembaga: 'Semua',
  pendamping: 'Semua',
  kabupaten: 'Semua',
  skalaUsaha: 'Semua',
  jenisPengajuan: 'Semua',
  fac: 'Semua'
})
</script>

<template>
  <VContainer>
  <VRow>
    <VCol cols="3"> Nomor Daftar </VCol>
    <VCol cols="1"> : </VCol>
    <VCol cols="8"> {{dataDetail.nomor_daftar}} </VCol>
  </VRow>
  <VRow>
    <VCol cols="3"> Tanggal Daftar </VCol>
    <VCol cols="1"> : </VCol>
    <VCol cols="8">{{dataDetail.tanggal}} </VCol>
  </VRow>
  <VRow>
    <VCol cols="3"> Tempat Pendaftaran </VCol>
    <VCol cols="1"> : </VCol>
    <VCol cols="8"> {{dataDetail.tempat_pendaftaran}} </VCol>
  </VRow>
  <VRow>
    <VCol cols="3"> Jenis Daftar </VCol>
    <VCol cols="1"> : </VCol>
    <VCol cols="8"> {{dataDetail.jenis_pengajuan}} </VCol>
  </VRow>
  <VRow>
    <VCol cols="3"> Status </VCol>
    <VCol cols="1"> : </VCol>
    <VCol cols="8"> 
      <VChip
        variant="outlined"
        style="border-color: #652672; border-radius: 8px; background-color: #f0e9f1;"
      >
        <span style="color: #652672;">
          {{dataDetail.status}}
        </span>
      </VChip>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="3"> Channel </VCol>
    <VCol cols="1"> : </VCol>
    <VCol cols="8"> {{dataDetail.channel_pendaftaran}} </VCol>
  </VRow>
  <VRow>
    <VCol cols="3"> Fasilitator </VCol>
    <VCol cols="1"> : </VCol>
    <VCol cols="8"> {{dataDetail.fasilitator}} </VCol>
  </VRow>
  <VRow>
    <VCol cols="3"> Kode Fasilitasi </VCol>
    <VCol cols="1"> : </VCol>
    <VCol cols="8"> {{dataDetail.kode_fac}} </VCol>
  </VRow>
</VContainer>
</template>

<style scoped>
.v-list-item-subtitle {
  white-space: nowrap; /* Prevents breaking into multiple lines */
}

.v-list-item-title {
  min-inline-size: 300px;
}
</style>
