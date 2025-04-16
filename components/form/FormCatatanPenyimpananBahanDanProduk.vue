<script setup lang="ts">
const snackBar = useSnackbar();

const props = defineProps({
  isEditable: {
    type: Boolean,
    default: true,
  },
});

const catatanBahanHeaders = [
  { title: "No", key: "no" },
  { title: "Nama Bahan", key: "name", nowrap: true },
  { title: "Tipe Penambahan", key: "type", nowrap: true },
  { title: "Jumlah", key: "total", nowrap: true },
  { title: "Tanggal Masuk", key: "inDate", nowrap: true },
  { title: "Tanggal Keluar", key: "outDate", nowrap: true },
  { title: "Nama Bahan", key: "name", nowrap: true },
  {
    title: "File Dokumen",
    key: "file",
    value: "file",
    sortable: false,
    nowrap: true,
  },
  { title: "Action", value: "action", sortable: false, nowrap: true },
];

const catatanBahanItems = [
  {
    no: 1,
    name: "Bahan 1",
    type: "Unggah Foto",
    total: "-",
    inDate: "12/11/2024",
    outDate: "13/11/2024",
    file: null,
  },
  {
    no: 2,
    name: "Bahan 2",
    type: "Unggah Foto",
    total: "-",
    inDate: "12/11/2024",
    outDate: "13/11/2024",
    file: null,
  },
];

const catatanProdukHeaders = [
  { title: "No", key: "no" },
  { title: "Nama Bahan", key: "name", nowrap: true },
  { title: "Tipe Penambahan", key: "type", nowrap: true },
  { title: "Jumlah", key: "total", nowrap: true },
  { title: "Tanggal Masuk", key: "inDate", nowrap: true },
  { title: "Tanggal Keluar", key: "outDate", nowrap: true },
  { title: "Nama Bahan", key: "name", nowrap: true },
  {
    title: "File Dokumen",
    key: "file",
    value: "file",
    sortable: false,
    nowrap: true,
  },
  { title: "Action", value: "action", sortable: false, nowrap: true },
];

const catatanProdukItems = [
  {
    no: 1,
    name: "Produk 1",
    type: "Unggah Foto",
    total: "-",
    inDate: "12/11/2024",
    outDate: "13/11/2024",
    file: null,
  },
  {
    no: 2,
    name: "Produk 2",
    type: "Unggah Foto",
    total: "-",
    inDate: "12/11/2024",
    outDate: "13/11/2024",
    file: null,
  },
];

// TODO -> LOGIC DELETE BY ID
const removeCatatanBahan = (no) => {
  console.log("removeCatatanBahan BY ID : ", no);
  snackBar.sendSnackbar("Berhasil menghapus data", "success");
};

// TODO -> LOGIC EDIT BY ID
const updateCatatanBahan = (form) => {
  console.log("updateCatatanBahan : ", form);
  snackBar.sendSnackbar("Berhasil menambahkan data", "success");
};

// TODO -> LOGIC TAMBAH DATA
const saveCatatanBahan = (form) => {
  console.log("saveCatatanBahan ", form);
  snackBar.sendSnackbar("Berhasil menambahkan data", "success");
};

// TODO -> LOGIC TAMBAH DATA
const uploadCatatanBahan = (file) => {
  console.log("uploadCatatanBahan ", file);
  snackBar.sendSnackbar("Berhasil menambahkan data", "success");
};

// TODO -> LOGIC TO DONWLOAD FILE
const downloadCatatanBahan = (item) =>
  console.log("downloadCatatanBahan ", item);

// PRODUK

const removeCatatanProduk = (no) => {
  console.log("removeCatatanProduk BY ID : ", no);
  snackBar.sendSnackbar("Berhasil menghapus data", "success");
};

// TODO -> LOGIC EDIT BY ID
const updateCatatanProduk = (form) => {
  console.log("updateCatatanProduk : ", form);
  snackBar.sendSnackbar("Berhasil menambahkan data", "success");
};

// TODO -> LOGIC TAMBAH DATA
const saveCatatanProduk = (form) => {
  console.log("saveCatatanProduk ", form);
  snackBar.sendSnackbar("Berhasil menambahkan data", "success");
};

// TODO -> LOGIC TAMBAH DATA
const uploadCatatanProduk = (file) => {
  console.log("uploadCatatanProduk ", file);
  snackBar.sendSnackbar("Berhasil menambahkan data", "success");
};

// TODO -> LOGIC TO DONWLOAD FILE
const downloadCatatanProduk = (item) =>
  console.log("downloadCatatanProduk ", item);
</script>

<template>
  <VCard class="pa-4 mb-8">
    <VCardTitle class="d-flex justify-space-between align-center">
      <span class="text-h3">Catatan Penyimpanan Bahan Dan Produk </span>
      <FormTambahCatatanBahan
        :is-editable="props.isEditable"
        @confirm="saveCatatanBahan"
        @upload="uploadCatatanBahan"
      />
    </VCardTitle>
    <VCardItem>
      <span class="text-h5">Tambah Catatan Bahan</span>
      <VDataTable
        disable-sort
        :items-per-page-options="[10, 25, 50, 100]"
        :headers="catatanBahanHeaders"
        :items="catatanBahanItems"
      >
        <template #item.action="{ item }">
          <v-btn color="primary" variant="plain">
            <VIcon>mdi-dots-vertical</VIcon>
            <VMenu activator="parent" :close-on-content-click="false">
              <VCard>
                <FormEditCatatanBahan
                  :is-editable="props.isEditable"
                  :initial-data="item"
                  @confirm="updateCatatanBahan"
                />
                <VBtn
                  :disabled="!props.isEditable"
                  variant="text"
                  color="error"
                  prepend-icon="ri-delete-bin-6-line"
                  @click="removeCatatanBahan(item.no)"
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
            @click="downloadCatatanBahan(item)"
          >
            File
          </v-btn>
        </template>
      </VDataTable>
    </VCardItem>

    <VCardItem>
      <VCardTitle class="d-flex justify-space-between align-center">
        <span class="text-h5">Tambah Catatan Produk</span>
        <FormTambahCatatanProduk
          :is-editable="props.isEditable"
          @confirm="saveCatatanProduk"
          @upload="uploadCatatanProduk"
        />
      </VCardTitle>
      <VDataTable
        disable-sort
        :items-per-page-options="[10, 25, 50, 100]"
        :headers="catatanProdukHeaders"
        :items="catatanProdukItems"
      >
        <template #item.action="{ item }">
          <v-btn color="primary" variant="plain">
            <VIcon>mdi-dots-vertical</VIcon>
            <VMenu activator="parent" :close-on-content-click="false">
              <VCard>
                <FormEditCatatanProduk
                  :is-editable="props.isEditable"
                  :initial-data="item"
                  @confirm="uploadCatatanProduk"
                />
                <VBtn
                  :disabled="!props.isEditable"
                  variant="text"
                  color="error"
                  prepend-icon="ri-delete-bin-6-line"
                  @click="removeCatatanProduk(item.no)"
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
            @click="downloadCatatanProduk(item)"
          >
            File
          </v-btn>
        </template>
      </VDataTable>
    </VCardItem>
  </VCard>
</template>

<style scoped lang="scss"></style>
