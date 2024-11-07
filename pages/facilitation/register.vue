<script setup lang="ts">
import { VCardItem, VCardTitle, VDataTable } from "vuetify/components";

const tableHeader = [
  { title: "No", value: "no" },
  { title: "Kode Fasilitasi", value: "fac_code" },
  { title: "Tahun", value: "fac_year" },
  { title: "Nama Fasilitasi", value: "fac_name" },
  { title: "Sumber Pembiayaan", value: "fac_sof" },
  { title: "Jenis", value: "fac_kind" },
];
</script>

<template>
  <h2>Daftar Fasilitasi</h2>
  <br />
  <VCard>
    <VCardTitle><h3>List Fasilitasi</h3></VCardTitle>
    <VCardItem>
      <VRow>
        <VCol :cols="6">
          <VTextField
            density="compact"
            append-inner-icon="mdi-magnify"
            placeholder="Cari data"
          >
          </VTextField> </VCol
      ></VRow>
      <VRow>
        <VCol :cols="12">
          <VDataTable :headers="tableHeader"></VDataTable>
        </VCol>
      </VRow>
    </VCardItem>
  </VCard>
</template>
