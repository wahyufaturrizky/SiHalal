<script setup lang="ts">
import { VDataTable } from "vuetify/components";

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
  <VDataTable :headers="tableHeader"></VDataTable>
</template>
