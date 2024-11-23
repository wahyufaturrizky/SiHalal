<script setup lang="ts">

const aspectLegalHeader = [
  { title: 'No.', key: 'no', nowrap: true },
  { title: 'Jenis', key: 'type', nowrap: true },
  { title: 'No. Document', key: 'documentNumber', nowrap: true },
  { title: 'Tanggal', key: 'date', nowrap: true },
  { title: 'Masa Berlaku', key: 'validDate', nowrap: true },
  { title: 'Instansi Penerbit', key: 'issuer', nowrap: true },
  { title: 'Action', value: 'action', sortable: false, nowrap: true },
]

const aspectLegalItems = ref([
  { no: 1, type: 'SIUP', documentNumber: '2131421421411', date: '09/10/2024', validDate: '09/10/2024', issuer: 'DITJEN PAJAK' },
  { no: 2, type: 'NPWP', documentNumber: '2131421421411', date: '09/10/2024', validDate: '09/10/2024', issuer: 'DITJEN PAJAK' },
])

const pabrikHeader = [
  { title: 'No', key: 'no' },
  { title: 'Jenis', key: 'type' },
  { title: 'Alamat', key: 'address' },
  { title: 'Tanggal', key: 'date' },
  { title: 'Masa Berlaku', key: 'validDate' },
  { title: 'Instansi Penerbit', key: 'publisher' },
  { title: 'Action', value: 'action', sortable: false, nowrap: true },
]

const pabrikItem = ref([
  { no: 1, type: 'My Drink Ok', address: 'Sumbawa banget, RT 002/ RW 002, Sumbang, Jawa barat' },
])

const outletHeader = [
  { title: 'No', key: 'no' },
  { title: 'Nama', key: 'name' },
  { title: 'Alamat', key: 'address' },
  { title: 'Status', key: 'status' },
]

const outletItem = [
  { no: 1, name: 'Name', address: 'Jakarta', status: 'Active' },
]

// TODO -> LOGIC DELETE BY ID
const deleteAspectLegal = no => {
  console.log('DELETE ASPEK LEGAL WITH ID : ', no)
}
</script>

<template>
  <FormPengajuanSertifikasiHalal />
  <FormPenanggungJawab />
  <VCard class="pa-4 mb-8">
    <VCardTitle class="d-flex justify-space-between align-center">
      <span class="text-h3">Aspek Legal</span>
      <FormPengajuanAspekLegal />
    </VCardTitle>
    <VCardItem>
      <VDataTable
        :headers="aspectLegalHeader"
        :items="aspectLegalItems"
      >
        <template #item.action="{ item }">
          <VIcon
            color="error"
            style="cursor: pointer;"
            @click="deleteAspectLegal(item.no)"
          >
            mdi-delete
          </VIcon>
        </template>
      </VDataTable>
    </VCardItem>
  </VCard>
  <VCard class="pa-4 mb-8">
    <VCardTitle class="d-flex justify-space-between align-center">
      <span class="text-h3">Pabrik</span>
      <AspekLegalModal />
    </VCardTitle>
    <VCardItem>
      <VDataTable
        :headers="pabrikHeader"
        :items="pabrikItem"
      >
        <template #item.action="{ item }">
          <VIcon
            color="error"
            style="cursor: pointer;"
            @click="deleteAspectLegal(item.no)"
          >
            mdi-delete
          </VIcon>
        </template>
      </VDataTable>
    </VCardItem>
  </VCard>
  <VCard class="pa-4 mb-8">
    <VCardTitle class="d-flex justify-space-between align-center">
      <span class="text-h3">Outlet</span>
      <AspekLegalModal />
    </VCardTitle>
    <VCardItem>
      <VDataTable
        :headers="outletHeader"
        :items="outletItem"
      />
    </VCardItem>
  </VCard>
</template>
