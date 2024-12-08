<script lang="ts" setup>
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const { data } = props || {};
const { importer, hcb, hcn, profile } = data || {};

const dataDetail = {
  name: importer?.name,
  nib: profile?.nib,
  api: profile?.api_type,
  npwp: profile?.npwp,
  address: importer?.address,
  province: profile?.province,
  regence: profile?.regency,
  subDistrict: profile?.sub_district,
  hcb: hcb?.hcb_id,
  companyName: hcb?.company_name,
  companyId: hcb?.corporate_id_number,
  country: hcb?.country,
  companyAddress: hcb?.address,
  halalCertNumber: hcn?.hcn_number,
  issuedDate: hcn?.issued_date,
  expiredDate: hcn?.expired_date,
  scope: hcn?.scope,
};

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
    <VCol cols="3"> Tgl. Pengawasan </VCol>
    <VCol cols="1"> : </VCol>
    <VCol cols="8">-</VCol>
  </VRow>
  <VRow>
    <VCol cols="3"> Tgl. Pengawasan Selanjutnya </VCol>
    <VCol cols="1"> : </VCol>
    <VCol cols="8"> - </VCol>
  </VRow>
  <VRow>
    <VCol cols="3"> Keterangan </VCol>
    <VCol cols="1"> : </VCol>
    <VCol cols="8"> - </VCol>
  </VRow>
  <VRow>
    <VCol cols="3"> Hasil</VCol>
    <VCol cols="1"> : </VCol>
    <VCol cols="8"> - </VCol>
  </VRow>
  <VRow>
    <VCol cols="3"> Dokumen </VCol>
    <VCol cols="1"> : </VCol>
    <VCol cols="8"> - </VCol>
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
