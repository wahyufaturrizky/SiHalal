<template>
  <v-container>
    <kembali-button class="pl-0" />
    <h3 class="text-h3">Pengajuan Reguler</h3>
    <br />

    <v-card class="pa-4">
      <v-card-title class="d-flex justify-space-between align-center">
        <span class="text-h5 font-weight-bold">Data Pengajuan Reguler</span>
        <NewRegulerSertificationHalalDialog />
      </v-card-title>
      <v-card-item>
        <v-text-field
          v-model="searchQuery"
          density="compact"
          placeholder="Search Data"
          append-inner-icon="ri-search-line"
          style="max-width: 100%"
          @input="handleInput"
        />
      </v-card-item>
      <v-card-item>
        <v-data-table
          :headers="headers"
          :items="items"
          item-value="no"
          class="elevation-1"
        >
          <template v-slot:[`item.status`]="{ item }">
            <div class="d-flex flex-wrap">
              <v-chip
                v-for="(status, index) in item.status"
                :key="index"
                :color="getChipColor(status)"
                label
                class="ma-1"
              >
                {{ status }}
              </v-chip>
            </div>
          </template>
          <template #item.action="{ item }">
            <v-icon
              color="primary"
              style="cursor: pointer;"
              @click="navigateTo(`/sh-domestic/submission/reguler/${item.no}`)"
            >
              ri-arrow-right-line
            </v-icon>
          </template>
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
  { title: 'Nomor Daftar', key: 'registrationDate', nowrap: true },
  { title: 'Nama PU', key: 'puName',nowrap: true },
  { title: 'Jenis Daftar', key: 'registrationType' , nowrap: true},
  { title: 'Jenis Produk', key: 'productType', nowrap: true },
  { title: 'Status', key: 'status', nowrap: true },
  { title: 'Action', value: 'action', sortable: false, nowrap: true },
];

const items = [
  {
    no: 1,
    registrationDate: '2024-11-20',
    puName: 'PT ABCD',
    registrationType: 'Jl. Merdeka No. 10, Jakarta',
    productType: 'John Doe',
    status: ['Micro', 32, 'Verifikasi'],
  },
  {
    no: 2,
    registrationDate: '2024-11-20',
    puName: 'PT ABCD',
    registrationType: 'Jl. Merdeka No. 10, Jakarta',
    productType: 'John Doe',
    status: ['Micro', 32, 'Verifikasi'],
  },
  {
    no: 3,
    registrationDate: '2024-11-20',
    puName: 'PT ABCD',
    registrationType: 'Jl. Merdeka No. 10, Jakarta',
    productType: 'John Doe',
    status: ['Micro', 32, 'Verifikasi'],
  }
];

// TODO -> BIKIN LOGIC BUAT SET CHIP COLOR
const getChipColor = (status: string) => {
  if (status === 'Verifikasi') return 'primary';
  else if (status === 'Micre') return 'success';
  return 'success';
};

const navigateTo = (url: string) => {
  window.location.href = url;
};
</script>
