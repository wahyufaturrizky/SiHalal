<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = ref('')

const headers = [
  { title: 'No', key: 'no' },
  { title: 'No. Daftar', key: 'registrationNo', nowrap: true },
  { title: 'Tanggal', key: 'date', nowrap: true },
  { title: 'Nama PU', key: 'puName', nowrap: true },
  { title: 'Jenis Daftar', key: 'registrationType', nowrap: true },
  { title: 'Jenis Produk', key: 'productType', nowrap: true },
  { title: 'Status', key: 'status', nowrap: true },
  { title: 'Action', value: 'action', sortable: false, nowrap: true },
]

const items = [
  {
    no: 1,
    registrationNo: 'SIUP',
    date: '10/10/2024',
    puName: 'Testing',
    registrationType: 'Baru',
    productType: 'Minuman Bahagia',
    status: [1, 3, 'Proses di LPH'],
  },
  {
    no: 2,
    registrationNo: 'SIUP',
    date: '10/10/2024',
    puName: 'Testing',
    registrationType: 'Baru',
    productType: 'Minuman Bahagia',
    status: [1, 3, 'Proses di LPH'],
  },
  {
    no: 3,
    registrationNo: 'SIUP',
    date: '10/10/2024',
    puName: 'Testing',
    registrationType: 'Baru',
    productType: 'Minuman Bahagia',
    status: [1, 3, 'Proses di LPH'],
  },
]

// TODO -> BIKIN LOGIC BUAT SET CHIP COLOR
const getChipColor = (status: string) => {
  if (status === 'Proses di LPH')
    return 'primary'
  else if (status === 'Micre')
    return 'success'

  return 'success'
}

const navigateTo = (url: string) => {
  window.location.href = url
}
</script>

<template>
  <VContainer>
    <KembaliButton class="pl-0" />
    <h3 class="text-h3">
      Audit Pengajuan
    </h3>
    <br>

    <VCard class="pa-4">
      <VCardTitle class="d-flex justify-space-between align-center">
        <span class="text-h5 font-weight-bold">Daftar Pengajuan untuk Dilakukan Audit</span>
      </VCardTitle>
      <VCardItem>
        <VTextField
          v-model="searchQuery"
          density="compact"
          placeholder="Cari Tagihan"
          append-inner-icon="ri-search-line"
          style="max-width: 100%"
          @input="handleInput"
        />
      </VCardItem>
      <VCardItem>
        <VDataTable
          :headers="headers"
          :items="items"
          item-value="no"
          class="elevation-1"
        >
          <template #[`item.status`]="{ item }">
            <div class="d-flex">
              <VChip
                v-for="(status, index) in item.status"
                :key="index"
                :color="getChipColor(status)"
                label
                class="ma-1"
              >
                {{ status }}
              </VChip>
            </div>
          </template>
          <template #item.action="{ item }">
            <VIcon
              color="primary"
              style="cursor: pointer;"
              class="ic-center"
              @click="navigateTo(`/audit-pengajuan/${item.no}`)"
            >
              ri-arrow-right-line
            </VIcon>
          </template>
        </VDataTable>
      </VCardItem>
    </VCard>
  </VContainer>
</template>

<style lang="scss" scoped>
.ic-center {
    place-self: center;
    display: flex;
}
</style>
