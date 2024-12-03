<script setup lang="ts">

import FormEditLayoutProduksi from "@/components/form/FormEditLayoutProduksi.vue"
import FormTambahLayoutProduksi from "@/components/form/FormTambahLayoutProduksi.vue"

const snackBar = useSnackbar()

const props = defineProps({
  isEditable: {
    type: Boolean,
    default: true,
  },
});

const headers = [
  { title: "No", key: "no" },
  { title: "Nama Pabrik", key: "name" , nowrap: true},
  { title: "File Layout Pabrik", key: "file" , value: "file", sortable: false, nowrap: true},
  { title: "Action", value: "action", sortable: false, nowrap: true },
];

const items = [
  {
    no: 1,
    name: "Pabrik 1",
    file: null
  },
];

// TODO -> LOGIC DELETE BY ID
const remove = (no) => {
  console.log("DELETE WITH ID : ", no);
  snackBar.sendSnackbar("Berhasil menghapus data", "success");
};

// TODO -> LOGIC EDIT BY ID
const update = (form) => {
  console.log("EDIT : ", form);
  snackBar.sendSnackbar("Berhasil menambahkan data", "success")
};

// TODO -> LOGIC TAMBAH DATA
const save = (form) => {
  console.log("TAMBAH DATA ", form);
  snackBar.sendSnackbar("Berhasil menambahkan data", "success")
};

// TODO -> LOGIC TO DONWLOAD FILE
const download = item => console.log("DOWNLOAD FILE ", item.file)

</script>

<template>
  <VCard class="pa-4 mb-8">
    <VCardTitle class="d-flex justify-space-between align-center">
      <span class="text-h3">Layout / Denah Ruang Produksi </span>
      <FormTambahLayoutProduksi :is-editable="props.isEditable" @confirm="save" />
    </VCardTitle>
    <VCardItem>
      <VDataTable :headers="headers" :items="items">
        <template #item.action="{ item }">
          <v-btn color="primary" variant="plain">
            <VIcon>mdi-dots-vertical</VIcon>
            <VMenu activator="parent" :close-on-content-click="false">
              <VCard>
                <FormEditLayoutProduksi
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
        <template #item.file="{ item }">
          <v-btn color="primary" variant="plain" prepend-icon="mdi-download" @click="download(item)">
            File
          </v-btn>
        </template>
      </VDataTable>
    </VCardItem>
  </VCard>
</template>

<style scoped lang="scss"></style>
