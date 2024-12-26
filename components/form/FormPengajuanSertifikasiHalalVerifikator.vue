<script setup lang="ts">
const store =useMyVerifikatorRegulerStore();
const { certificate_halal } = storeToRefs(store)

</script>

<template>
  <VCard class="pa-4 mb-8">
    <VCardTitle class="text-h3"> Pengajuan Sertifikasi Halal </VCardTitle>
    <VForm>
      <VCardItem>
        <CustomTextField
          id="companyName"
          v-model="certificate_halal.nama_pu"
          label="Nama Perusahaan yang Tertera pada Sertifikat"
          class="mb-4"
          :readonly="true"
        />

        <CustomTextField
          id="submissionNumber"
          v-model="certificate_halal.no_mohon"
          label="Nomor Surat Permohonan"
          class="mb-4"
          :readonly="true"
        />

        <CustomTextField
          id="submissionDate"
          v-model="certificate_halal.tgl_mohon"
          label="Tanggal Surat Permohonan"
          class="mb-4"
          :readonly="true"
        />

        <CustomSelect
          id="type"
          v-model="certificate_halal.jenis_layanan"
          label="Jenis Layanan"
          class="mb-4"
          :readonly="true"
        />

        <CustomSelect
          id="productType"
          v-model="certificate_halal.jenis_produk"
          label="Jenis Produk"
          class="mb-4"
          :readonly="true"
        />

        <CustomTextarea
          id="brand"
          v-model="certificate_halal.merk_dagang"
          label="Merek Dagang"
          class="mb-4"
          :readonly="true"
        />

        <CustomSelect
          id="marketingArea"
          v-model="certificate_halal.area_pemasaran"
          label="Area Pemasaran"
          class="mb-4"
          :readonly="true"
        />

        <CustomSelect
          id="lph"
          v-model="certificate_halal.nama_lph"
          label="LPH"
          placeholder="Pilih LPH"
          class="mb-4"
          :readonly="true"
        />

        <CustomSelect
          id="registrationType"
          v-model="certificate_halal.jenis_pengajuan"
          label="Jenis Pendaftaran"
          placeholder="Jenis Pendaftaran"
          class="mb-4"
          :readonly="true"
        />
      </VCardItem>
    </VForm>
  </VCard>
</template>
