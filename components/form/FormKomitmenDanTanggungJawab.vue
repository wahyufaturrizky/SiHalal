<script setup lang="ts">
const props = defineProps({
  isEditable: {
    type: Boolean,
    default: true,
  },
});

const headers = [
  { title: "No", key: "no" },
  { title: "Nama", key: "name", nowrap: true },
  { title: "Jabatan", key: "jabatan", nowrap: true },
  { title: "Posisi", key: "posisi", nowrap: true },
  {
    title: "Action",
    value: "action",
    sortable: false,
    nowrap: true,
    fixed: true,
  },
];

const items = ref([
  { no: 1, name: "Nico Robin", jabatan: "CTO", posisi: "CTO " },
  { no: 2, name: "Sanji", jabatan: "CEO", posisi: "CEO " },
]);

// TODO -> LOGIC DELETE BY ID
const remove = (no) => {
  console.log("DELETE WITH ID : ", no);
};

// TODO -> LOGIC EDIT BY ID
const update = (form) => {
  console.log("EDIT  : ", form);
};

// TODO -> LOGIC TAMBAH DATA
const save = (form) => {
  console.log("TAMBAH DATA ", form);
};
</script>

<template>
  <VCard class="pa-4 mb-8">
    <VCardTitle class="d-flex justify-space-between align-center">
      <span class="text-h3">Komitmen Dan Tanggung Jawab</span>
      <FormTambahKomitmenDanTanggungJawab
        @confirm="save"
        v-if="props.isEditable"
      />
    </VCardTitle>
    <VCardItem>
      <VDataTable disable-sort :headers="headers" :items="items">
        <template #item.action="{ item }">
          <v-btn color="primary" variant="plain">
            <VIcon>mdi-dots-vertical</VIcon>
            <VMenu activator="parent" :close-on-content-click="false">
              <VCard>
                <FormEditPenyeliaHalal
                  :initial-data="item"
                  @confirm="update"
                  :is-editable="props.isEditable"
                />
                <VBtn
                  variant="text"
                  color="error"
                  prepend-icon="ri-delete-bin-6-line"
                  @click="remove(item.no)"
                  block
                  :disabled="!props.isEditable"
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
