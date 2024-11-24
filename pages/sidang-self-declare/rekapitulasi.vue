<template>
  <v-container>
    <kembali-button class="pl-0" />
    <h3 class="text-h3">Rekapitulasi</h3>
    <br />

    <v-card class="pa-4">
      <v-card-title class="text-h5 font-weight-bold">Daftar Rekapitulasi</v-card-title>
      <v-card-item>
        <v-text-field
          v-model="searchQuery"
          density="compact"
          placeholder="Cari Nama Pengajuan"
          append-inner-icon="ri-search-line"
          style="max-width: 100%"
          @input="handleInput"
        />
      </v-card-item>
      <v-card-item>
        <v-data-table :headers="headers" :items="items" class="elevation-1" fixed-header>
        </v-data-table>
      </v-card-item>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const searchQuery = ref("");

const headers = [
  { title: 'No', key: 'no' },
  { title: 'User ID', key: 'userId', nowrap: true },
  { title: 'Ditetapkan Halal', key: 'totalDeterminedHalal',nowrap: true },
  { title: 'Dikembalikan', key: 'totalReturn' , nowrap: true},
  { title: 'Ditolak', key: 'totalReject', nowrap: true },
  { title: 'Sub Total', key: 'subTotal', nowrap: true },
  { title: 'Belum Ditetapkan', key: 'totalNotDetermined' , nowrap: true},
  { title: 'Total', key: 'total', nowrap: true }
];

const items = [
  {
    no: 1,
    userId: 'SH2024-225-29480',
    totalDeterminedHalal: 121,
    totalReturn: 22,
    totalReject: 14,
    subTotal: 150,
    totalNotDetermined: 32,
    total: 300,

  },
  {
    no: 2,
    userId: 'SH2024-225-29480',
    totalDeterminedHalal: 121,
    totalReturn: 22,
    totalReject: 14,
    subTotal: 150,
    totalNotDetermined: 32,
    total: 300,

  },
  {
    no: 3,
    userId: 'SH2024-225-29480',
    totalDeterminedHalal: 121,
    totalReturn: 22,
    totalReject: 14,
    subTotal: 150,
    totalNotDetermined: 32,
    total: 300,

  },
  {
    no: 4,
    userId: 'SH2024-225-29480',
    totalDeterminedHalal: 121,
    totalReturn: 22,
    totalReject: 14,
    subTotal: 150,
    totalNotDetermined: 32,
    total: 300,

  },
  {
    no: 5,
    userId: 'SH2024-225-29480',
    totalDeterminedHalal: 121,
    totalReturn: 22,
    totalReject: 14,
    subTotal: 150,
    totalNotDetermined: 32,
    total: 300,

  },

];

</script>
