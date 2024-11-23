<script setup lang="ts">
const tableHeader = [
  { title: "No", value: "no" },
  { title: "Jenis Bahan", value: "ingr_kind" },
  { title: "Nama Bahan", value: "ingr_name" },
  { title: "Kelompok", value: "group" },
  { title: "Merk", value: "brand" },
  { title: "Produsen", value: "manufacturer" },
  { title: "No. Sertifikat Halal", value: "sh_number" },
  { title: "Tanggal Berlaku", value: "effective_date" },
  { title: "Verifikasi Pendamping", value: "verification_comp" },
  { title: "Action", value: "action" },
];

const items = [
  {
    ingr_kind: "xx",
    ingr_name: "xx",
    group: "xx",
    brand: "xx",
    manufacturer: "xx",
    sh_number: "xx",
    effective_date: "xx",
    verification_comp: "xx",
  },
];
</script>
<template>
  <VCard>
    <VCardTitle>
      <VRow>
        <VCol cols="6" style="display: flex; align-items: center"
          ><h3>Daftar Nama Bahan dan Kemasan</h3></VCol
        >
        <VCol cols="6" style="display: flex; justify-content: end">
          <AjukanBahanModal></AjukanBahanModal>
          <TambahBahanModal></TambahBahanModal>
        </VCol>
      </VRow>
    </VCardTitle>
    <VCardItem>
      <VRow>
        <VCol cols="12"></VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <VDataTable :headers="tableHeader" :items="items">
            <template #item.action>
              <div style="display: flex; justify-content: center">
                <VMenu>
                  <template #activator="{ props }">
                    <VIcon icon="fa-ellipsis-v" v-bind="props"></VIcon>
                  </template>

                  <VList>
                    <VListItem>Edit</VListItem>
                    <VListItem>Hapus</VListItem>
                  </VList>
                </VMenu>
              </div>
            </template>
          </VDataTable>
        </VCol>
      </VRow>
    </VCardItem>
  </VCard>
</template>
