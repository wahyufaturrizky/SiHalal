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

const selectedFilterProduk = ref([]);
const selectedFilterFasilitas = ref([]);
const selectedFilterLembaga = ref([]);
const selectedFilterPendamping = ref([]);
</script>

<template>
  <VRow>
    <VCol cols="12">
      <KembaliButton></KembaliButton>
    </VCol>
  </VRow>
  <VRow
    ><VCol cols="12"><h2>Inquiry / Pengajuan</h2></VCol></VRow
  >
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardTitle><h3>Data Pengajuan</h3></VCardTitle>
        <VCardItem>
          <VRow>
            <VCol cols="3">
              <VMenu :close-on-content-click="false">
                <template #activator="{ props: openMenu }">
                  <VBtn
                    append-icon="fa-filter"
                    v-bind="openMenu"
                    variant="outlined"
                    style="width: 100%"
                    >Filter</VBtn
                  >
                </template>
                <VList>
                  <VListItem>
                    <VItemGroup>
                      <VLabel><b>Jenis Produk</b></VLabel>
                      <VSelect
                        v-model="selectedFilterProduk"
                        density="compact"
                        placeholder="Semua"
                      ></VSelect>
                    </VItemGroup>
                  </VListItem>
                  <VListItem>
                    <VItemGroup>
                      <VLabel><b>Fasilitas</b></VLabel>
                      <VSelect
                        v-model="selectedFilterFasilitas"
                        density="compact"
                        placeholder="Semua"
                      ></VSelect>
                    </VItemGroup>
                  </VListItem>
                  <VListItem>
                    <VItemGroup>
                      <VLabel><b>Lembaga</b></VLabel>
                      <VSelect
                        v-model="selectedFilterLembaga"
                        density="compact"
                        placeholder="Semua"
                      ></VSelect>
                    </VItemGroup>
                  </VListItem>
                  <VListItem>
                    <VItemGroup>
                      <VLabel><b>Pendamping</b></VLabel>
                      <VSelect
                        v-model="selectedFilterPendamping"
                        density="compact"
                        placeholder="Semua"
                      ></VSelect>
                    </VItemGroup>
                  </VListItem>
                  <VListItem>
                    <VBtn style="width: 100%" ariant="flat" density="compact"
                      >Apply</VBtn
                    >
                  </VListItem>
                </VList>
              </VMenu>
            </VCol>
            <VCol cols="1"></VCol>
            <VCol cols="8">
              <VTextField
                density="compact"
                placeholder="Cari Nama Pengajuan"
                append-inner-icon="mdi-magnify"
              ></VTextField>
            </VCol>
          </VRow>
          <VRow>
            <VCol>
              <VDataTable :headers="tableHeader"></VDataTable>
            </VCol>
          </VRow>
        </VCardItem>
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped></style>
