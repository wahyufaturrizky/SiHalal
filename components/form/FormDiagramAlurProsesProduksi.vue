<script setup lang="ts">

import FormEditDiagramAlurProsesProduksi from "@/components/form/FormEditDiagramAlurProsesProduksi.vue"
import FormEditLayoutProduksi from "@/components/form/FormEditLayoutProduksi.vue"
import FormTambahDiagramAlurProsesProduksi from "@/components/form/FormTambahDiagramAlurProsesProduksi.vue"
import FormTambahLayoutProduksi from "@/components/form/FormTambahLayoutProduksi.vue"

const snackBar = useSnackbar()

const props = defineProps({
  isEditable: {
    type: Boolean,
    default: true,
  },
});

const catatanHeaders = [
  { title: "No", key: "no" },
  { title: "Nama Bahan", key: "name" , nowrap: true},
  { title: "Tipe Penambahan", key: "type" , nowrap: true},
  { title: "Proses Pembuatan", key: "process" , nowrap: true},
  { title: "Diagram Alur Proses", key: "diagramProcess" , nowrap: true},
  { title: "File Dokumen", key: "file" , value: "file", sortable: false, nowrap: true},
  { title: "Action", value: "action", sortable: false, nowrap: true },
];

const catatanItems = [
  {
    no: 1,
    name: "Alur 1",
    type: 'Unggah Foto',
    process: '-',
    diagramProcess: '-',
    file: null
  },
  {
    no: 1,
    name: "Alur 3",
    type: 'Unggah Foto',
    process: 'penggilingan',
    diagramProcess: '-',
    file: null
  }
];

// TODO -> LOGIC DELETE BY ID
const remove = (no) => {
  console.log("remove BY ID : ", no);
  snackBar.sendSnackbar("Berhasil menghapus data", "success");
};

// TODO -> LOGIC EDIT BY ID
const update = (form) => {
  console.log("update : ", form);
  snackBar.sendSnackbar("Berhasil menambahkan data", "success")
};

// TODO -> LOGIC TAMBAH DATA
const save = (form) => {
  console.log("save ", form);
  snackBar.sendSnackbar("Berhasil menambahkan data", "success")
};

// TODO -> LOGIC TAMBAH DATA
const upload = (file) => {
  console.log("upload ", file);
  snackBar.sendSnackbar("Berhasil menambahkan data", "success")
};

// TODO -> LOGIC TO DONWLOAD FILE
const downloadCatatanBahan = item => console.log("download ", item)

</script>

<template>
  <VCard class="pa-4 mb-8">
    <VCardTitle class="d-flex justify-space-between align-center">
      <span class="text-h3">Diagram Alur Proses Produksi </span>
      <FormTambahDiagramAlurProsesProduksi :is-editable="props.isEditable" @confirm="save"  @upload="upload"/>
    </VCardTitle>
    <VCardItem>
      <VDataTable :headers="catatanHeaders" :items="catatanItems">
        <template #item.action="{ item }">
          <v-btn color="primary" variant="plain">
            <VIcon>mdi-dots-vertical</VIcon>
            <VMenu activator="parent" :close-on-content-click="false">
              <VCard>
                <FormEditDiagramAlurProsesProduksi
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
          <v-btn color="primary" variant="plain" prepend-icon="mdi-download" @click="downloadCatatanBahan(item)">
            File
          </v-btn>
        </template>
      </VDataTable>
    </VCardItem>
  </VCard>
</template>

<style scoped lang="scss"></style>
