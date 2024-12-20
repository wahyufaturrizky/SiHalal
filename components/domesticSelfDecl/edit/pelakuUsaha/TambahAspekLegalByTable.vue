<script setup lang="ts">
const tableHeader = [
  { title: "No", value: "no" },
  { title: "Jenis", value: "ingr_kind" },
  { title: "No Dokumen", value: "doc_no" },
  { title: "Tanggal", value: "date" },
  { title: "Masa Berlaku", value: "effective_date" },
  { title: "Instansi Penerbit", value: "publisher" },
  { title: "Action", value: "action" },
];

const items = [
  {
    id: 1,
    jenis: "xx",
    doc_no: "xx",
    date: "xx",
    effective_date: "xx",
    publisher: "xx",
  },
  {
    id: 2,
    jenis: "xx",
    doc_no: "xx",
    date: "xx",
    effective_date: "xx",
    publisher: "xx",
  },
];

const selected = ref([]);
</script>
<template>
  <VDialog max-width="60svw">
    <template #activator="{ props: openModal }">
      <VBtn v-bind="openModal" variant="outlined" append-icon="fa-plus">
        Tambah
      </VBtn>
    </template>
    <template #default="{ isActive }">
      <VCard>
        <VCardTitle>
          <VRow>
            <VCol cols="10" style="display: flex; align-items: center"
              ><h3>Tambah Aspek Legal</h3></VCol
            >
            <VCol cols="2" style="display: flex; justify-content: end">
              <VCol cols="2" style="display: flex; justify-content: end"
                ><VIcon
                  size="small"
                  icon="fa-times"
                  @click="isActive.value = false"
                ></VIcon
              ></VCol>
            </VCol>
          </VRow>
        </VCardTitle>
        <VCardItem>
          <VDataTable :headers="tableHeader" :items="items">
            <template #item.action="{ item }">
              <VCheckbox v-model="selected" :value="item.id"></VCheckbox>
            </template>
          </VDataTable>
        </VCardItem>
        <VCardActions
          style="display: flex; justify-content: end; padding: 1.5svw"
        >
          <div>
            <VBtn @click="isActive.value = false" variant="outlined"
              >Batal</VBtn
            >
            <VBtn variant="flat">Tambah ({{ selected.length }})</VBtn>
          </div>
        </VCardActions>
      </VCard>
    </template>
  </VDialog>
</template>
