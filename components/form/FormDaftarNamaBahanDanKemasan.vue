<script setup lang="ts">
const props = defineProps({
  isEditable: {
    type: Boolean,
    default: true,
  },
});

const headers = [
  { title: "No", key: "no" },
  { title: "Jenis Bahan", key: "type" },
  { title: "Nama Bahan", key: "name" },
  { title: "Produsen", key: "producen" },
  { title: "Nomor Sertifikat Halal", key: "setificateHalalNumber" },
  { title: "Action", value: "action", sortable: false, nowrap: true },
];

const items = ref([
  {
    no: 1,
    type: "Kopi Luak Ciater",
    name: "Biji Kopi",
    producen: "Luak Mantui ",
    setificateHalalNumber: "32132138129",
  },
  {
    no: 2,
    type: "Kopi Luak Ciater",
    name: "Biji Kopi",
    producen: "Luak Mantui ",
    setificateHalalNumber: "32132138129",
  },
]);

// TODO -> LOGIC DELETE BY ID
const remove = (no) => {
  console.log("DELETE WITH ID : ", no);
};

// TODO -> LOGIC EDIT BY ID
const update = (form) => {
  console.log("EDIT  : ", form);
};

// TODO -> LOGIC TAMBAH DATA -> PERLU INTEGRASI
const save = (form) => {
  console.log("TAMBAH DATA ", form);
};
</script>

<template>
  <VCard class="pa-4 mb-8">
    <VCardTitle class="d-flex justify-space-between align-center">
      <span class="text-h3">Daftar Nama Bahan Dan Kemasan </span>
      <FormTambahBahan :is-editable="props.isEditable" @confirm="save" />
    </VCardTitle>
    <VCardItem>
      <VDataTable :headers="headers" :items="items">
        <template #item.action="{ item }">
          <v-btn color="primary" variant="plain">
            <VIcon>mdi-dots-vertical</VIcon>
            <VMenu activator="parent" :close-on-content-click="false">
              <VCard>
                <FormEditPabrik
                  :is-editable="props.isEditable"
                  :initial-data="item"
                  @confirm="update"
                />
                <VBtn
                  :disabled="!props.isEditable"
                  variant="text"
                  color="error"
                  prepend-icon="ri-delete-bin-6-line"
                  @click="remove(item.no)"
                  block
                >
                  Hapus
                </VBtn>
              </VCard>
            </VMenu>
          </v-btn>
        </template>
      </VDataTable>
    </VCardItem>
  </VCard>
</template>

<style scoped lang="scss"></style>
