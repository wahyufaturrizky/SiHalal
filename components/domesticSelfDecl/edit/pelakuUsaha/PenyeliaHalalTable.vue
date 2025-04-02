<script setup lang="ts">
const penyeliaHeader = [
  { title: "No", key: "no" },
  { title: "Nama", key: "name" },
  { title: "No. KTP", key: "no_idcard" },
  { title: "No. Kontak", key: "no_contact" },
  { title: "No/Tgl Sertif Penyelia Halal", key: "cert_date" },
  { title: "No/Tanggal SK", key: "dec_letter_date" },
  { title: "Action", key: "action" },
];
</script>
<template>
  <VDataTable
    :items-per-page-options="[10, 25, 50, 100]"
    :headers="penyeliaHeader"
  ></VDataTable>
</template>
