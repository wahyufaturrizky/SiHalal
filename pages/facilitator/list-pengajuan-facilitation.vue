<script setup lang="ts">

const searchQuery = ref()

const headers = [
  {title: 'No', key: 'no', nowrap: true},
  {title: 'Tgl. Daftar', key: 'registrationDate', nowrap: true},
  {title: 'Kode Fasilitasi', key: 'facilitationCode', nowrap: true},
  {title: 'Tahun', key: 'year', nowrap: true},
  {title: 'Nama Fasilitasi', key: 'facilitationName', nowrap: true},
  {title: 'Kode Program', key: 'programName', nowrap: true},
  {title: 'Sumber Pembiayaan', key: 'sourceOfFund', nowrap: true},
  {title: 'type', key: 'type', nowrap: true},
  {title: 'Tgl. Aktif', key: 'startDate', nowrap: true},
  {title: 'Tgl. Selesai', key: 'endDate', nowrap: true},
  {title: 'Kuota', key: 'kuota', nowrap: true},
  {title: 'Status Registrasi', key: 'status', nowrap: true},
  {title: "Action", value: "action", sortable: false , nowrap: true},
]

const items = ref([
  {no: 1, registrationDate: '01-11-2024', facilitationCode: '', year: '2025',facilitationName: 'WAWAN BRO',  programName: 'Dinas Koperasi Kab. Bogor', sourceOfFund: 'JSP01', type: 'Self Declare', startDate: '06-11-2024', endDate: '31-01-2025', kuota: 1000, status: 'PENGAJUAN'    }
])

import { useDisplay } from "vuetify";
const { mdAndUp } = useDisplay();
const maxWidthSearch = computed(() => (mdAndUp ? 700 : "90%"));

</script>

<template>
  <div>
    <p class="text-h4">Verifikasi Fasilitator</p>
    <VCard class="pa-4">
      <p class="text-h5">Daftar pengajuan Fasilitasi</p>
      <VRow>
        <VCol class="d-flex justify-sm-space-between align-center">
          <VTextField
            v-model="searchQuery"
            density="compact"
            placeholder="Search Data"
            append-inner-icon="ri-search-line"
            :max-width="maxWidthSearch"
            @input="handleInput"
          />
        </VCol>
      </VRow>
      <VRow>
        <VDataTable :headers="headers" :items="items" class="elevation-1" fixed-header >
          <template #item.action="{ item }">
            <VIcon
              color="success"
              style="cursor: pointer;"
              @click="navigateTo('/')"
            >
              ri-arrow-right-line
            </VIcon>
          </template>
        </VDataTable>

      </VRow>
    </VCard>
  </div>
</template>

<style scoped lang="scss">

</style>
