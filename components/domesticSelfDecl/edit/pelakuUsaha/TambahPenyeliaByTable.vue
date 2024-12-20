<script setup lang="ts">
const tableHeader = [
  { title: "No", value: "no" },
  { title: "Nama", value: "name" },
  { title: "No Ktp", value: "ktp_no" },
  {
    title: "No / Tgl Sertifikat Penyelia Halal",
    value: "certificate_no_or_date",
  },
  { title: "No/Tgl SK", value: "sk_no_or_date" },
  { title: "No Kontak", value: "contact_no" },
  { title: "Action", value: "action" },
];

const items = [
  {
    id: 1,
    name: "xx",
    ktp_no: "xx",
    certificate_no_or_date: "xx",
    sk_no_or_date: "xx",
    contact_no: "xx",
  },
  {
    id: 2,
    name: "xx",
    ktp_no: "xx",
    certificate_no_or_date: "xx",
    sk_no_or_date: "xx",
    contact_no: "xx",
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
              ><h3>Tambah Penyelia</h3></VCol
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
