<script setup lang="ts">
const snackBar = useSnackbar();

const props = defineProps({
  isEditable: {
    type: Boolean,
    default: true,
  },
});

const headers = [
  { title: "No", key: "no" },
  { title: "Nama Produk", key: "namaProduk" },
  {
    title: "Foto Produk",
    key: "foto",
    value: "foto",
    sortable: false,
    nowrap: true,
  },
  { title: "Action", value: "action", sortable: false, nowrap: true },
];

const items = ref([
  {
    no: 1,
    namaProduk: "Kopi Luak Ciater",
    kualitasProduk: null,
    rincianProduk: null,
    foto: null,
  },
  {
    no: 2,
    namaProduk: "Kopi Luak Ciater",
    kualitasProduk: null,
    rincianProduk: null,
    foto: null,
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

// TODO -> LOGIC TAMBAH DATA
const save = (form) => {
  console.log("TAMBAH DATA ", form);
  snackBar.sendSnackbar("Berhasil menambahkan data", "success");
};

// TODO -> LOGIc DOWNLOAD
const download = (item) => {
  console.log("DOWNLOAD ", item);
};
</script>

<template>
  <VCard class="pa-4 mb-8">
    <VCardTitle class="d-flex justify-space-between align-center">
      <span class="text-h3">Daftar Nama Produk</span>
      <FormTambahNamaProduk :is-editable="props.isEditable" @confirm="save" />
    </VCardTitle>
    <VCardItem>
      <VDataTable
        :items-per-page-options="[10, 25, 50, 100]"
        :headers="headers"
        :items="items"
      >
        <template #item.foto="{ item }">
          <v-btn color="primary" variant="plain" @click="download(item)">
            <VIcon>mdi-download</VIcon> File
          </v-btn>
        </template>

        <template #item.action="{ item }">
          <v-btn color="primary" variant="plain">
            <VIcon>mdi-dots-vertical</VIcon>
            <VMenu activator="parent" :close-on-content-click="false">
              <VCard>
                <FormEditNamaProduk
                  :is-editable="props.isEditable"
                  :initial-data="item"
                  @confirm="update"
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
