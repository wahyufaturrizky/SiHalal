<script setup lang="ts">
import FormEditCatatanDistribusi from "@/components/form/FormEditCatatanDistribusi.vue";
import FormTambahCatatanDistribusi from "@/components/form/FormTambahCatatanDistribusi.vue";

const snackBar = useSnackbar();

const props = defineProps({
  isEditable: {
    type: Boolean,
    default: true,
  },
});

const catatanHeaders = [
  { title: "No", key: "no" },
  { title: "Nama Catatan", key: "name", nowrap: true },
  { title: "Tipe Penambahan", key: "type", nowrap: true },
  { title: "Jumlah", key: "total", nowrap: true },
  { title: "Tanggal Distribusi", key: "distributionate", nowrap: true },
  { title: "Tujuan", key: "destination", nowrap: true },
  {
    title: "File Dokumen",
    key: "file",
    value: "file",
    sortable: false,
    nowrap: true,
  },
  { title: "Action", value: "action", sortable: false, nowrap: true },
];

const catatanItems = [
  {
    no: 1,
    name: "Catatan 1",
    type: "Unggah Foto",
    total: "-",
    distributionate: "12/11/2024",
    destination: "Palembang",
    file: null,
  },
  {
    no: 2,
    name: "Catatan 1",
    type: "Unggah Foto",
    total: "-",
    distributionate: "12/11/2024",
    destination: "Palembang",
    file: null,
  },
];

// TODO -> LOGIC DELETE BY ID
const remove = (no) => {
  console.log("remove BY ID : ", no);
  snackBar.sendSnackbar("Berhasil menghapus data", "success");
};

// TODO -> LOGIC EDIT BY ID
const update = (form) => {
  console.log("update : ", form);
  snackBar.sendSnackbar("Berhasil menambahkan data", "success");
};

// TODO -> LOGIC TAMBAH DATA
const save = (form) => {
  console.log("save ", form);
  snackBar.sendSnackbar("Berhasil menambahkan data", "success");
};

// TODO -> LOGIC TAMBAH DATA
const upload = (file) => {
  console.log("upload ", file);
  snackBar.sendSnackbar("Berhasil menambahkan data", "success");
};

// TODO -> LOGIC TO DONWLOAD FILE
const download = (item) => console.log("download ", item);
</script>

<template>
  <VCard class="pa-4 mb-8">
    <VCardTitle class="d-flex justify-space-between align-center">
      <span class="text-h3">Catatan Distribusi / Penjualan Produk </span>
      <FormTambahCatatanDistribusi
        :is-editable="props.isEditable"
        @confirm="save"
        @upload="upload"
      />
    </VCardTitle>
    <VCardItem>
      <VDataTable
        disable-sort
        :items-per-page-options="[10, 25, 50, 100]"
        :headers="catatanHeaders"
        :items="catatanItems"
      >
        <template #item.action="{ item }">
          <v-btn color="primary" variant="plain">
            <VIcon>mdi-dots-vertical</VIcon>
            <VMenu activator="parent" :close-on-content-click="false">
              <VCard>
                <FormEditCatatanDistribusi
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
          <v-btn
            color="primary"
            variant="plain"
            prepend-icon="mdi-download"
            @click="download(item)"
          >
            File
          </v-btn>
        </template>
      </VDataTable>
    </VCardItem>
  </VCard>
</template>

<style scoped lang="scss"></style>
