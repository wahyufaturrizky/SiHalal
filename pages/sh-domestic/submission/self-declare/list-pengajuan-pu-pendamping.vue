<template>
  <v-container>
    <kembali-button class="pl-0" />
    <h3 class="text-h3">Cek Data Pengajuan PU</h3>
    <br />

    <v-card class="pa-4">
      <v-card-title class="text-h5 font-weight-bold">Data Pengajuan</v-card-title>
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
        <v-data-table :headers="headers" :items="items" class="elevation-1" fixed-header>
          <template #item.status="{ item }">
            <v-chip :color="getStatusColor(item.status)" label variant="outlined">
              {{ item.status }}
            </v-chip>
          </template>
          <template #item.action="{ item }">
            <v-icon
              color="primary"
              style="cursor: pointer;"
              @click="navigateTo(`/sh-domestic/submission/self-declare/detail-pengajuan/${item.no}`)"
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
  { title: 'Tanggal Masuk', key: 'inputDate', nowrap: true },
  { title: 'Nama PU', key: 'puName',nowrap: true },
  { title: 'Alamat', key: 'address' , nowrap: true},
  { title: 'Penanggung Jawab', key: 'pic', nowrap: true },
  { title: 'Nomor Kontak', key: 'phoneNumber', nowrap: true },
  { title: 'Jenis Usaha', key: 'businessType' , nowrap: true},
  { title: 'Skala Usaha', key: 'businessScale', nowrap: true },
  { title: 'Merek Dagang', key: 'brand' , nowrap: true},
  { title: 'Status', value: 'status', key: 'status', nowrap: true },
  { title: 'Action', value: 'action', sortable: false, nowrap: true },
];

const items = [
  {
    no: 1,
    inputDate: '2024-11-20',
    puName: 'PT ABCD',
    address: 'Jl. Merdeka No. 10, Jakarta',
    pic: 'John Doe',
    phoneNumber: '081234567890',
    businessType: 'Retail',
    businessScale: 'Medium',
    brand: 'ABC',
    status: 'Verifikasi',
  },
  {
    no: 2,
    inputDate: '2024-11-19',
    puName: 'CV XYZ',
    address: 'Jl. Pahlawan No. 5, Bandung',
    pic: 'Jane Smith',
    phoneNumber: '089876543210',
    businessType: 'Wholesale',
    businessScale: 'Large',
    brand: 'XYZ',
    status: 'Verifikasi',
  },
  {
    no: 3,
    inputDate: '2024-11-18',
    puName: 'PT Example',
    address: 'Jl. Sudirman No. 15, Surabaya',
    pic: 'Alice Johnson',
    phoneNumber: '085112233445',
    businessType: 'Manufacturing',
    businessScale: 'Small',
    brand: 'ExampleCo',
    status: 'Verifikasi',
  },
  {
    no: 4,
    inputDate: '2024-11-17',
    puName: 'UD Maju Jaya',
    address: 'Jl. Raya No. 8, Yogyakarta',
    pic: 'Bob Lee',
    phoneNumber: '082233344556',
    businessType: 'Service',
    businessScale: 'Small',
    brand: 'MajuJaya',
    status: 'Verifikasi',
  },
  {
    no: 5,
    inputDate: '2024-11-16',
    puName: 'PT Success',
    address: 'Jl. Raya No. 20, Bali',
    pic: 'Charlie Kim',
    phoneNumber: '081122233344',
    businessType: 'Technology',
    businessScale: 'Large',
    brand: 'SuccessTech',
    status: 'Verifikasi',
  },
];

const getStatusColor = (status: string) => {
  if (status === 'Verifikasi') return 'primary';
  return 'grey';
};

const navigateTo = (url: string) => {
  window.location.href = url;
};
</script>
