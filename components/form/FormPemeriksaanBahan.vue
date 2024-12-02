<script setup lang="ts">
const props = defineProps({
  isEditable: {
    type: Boolean,
    default: true,
  },
});

const headers = [
  { title: "No", key: "no" },
  { title: "Nama", key: "nama" },
  { title: "Tipe Penambahan", key: "type" },
  { title: "Lokasi", key: "lokasi" },
  { title: "Tanggal Pembelian", key: "tanggal" },
  {
    title: "File Dokumen",
    key: "file",
    value: "file",
    sortable: false,
    nowrap: true,
  },
  { title: "Action", value: "action", sortable: false, nowrap: true },
];

const items = ref([
  {
    no: 1,
    nama: "Kopi Luak Ciater",
    type: "Unggah Photo",
    lokasi: "-",
    tanggal: "20/09/2024",
    file: null,
  },
  {
    no: 2,
    nama: "Kopi Luak Ciater",
    type: "Unggah Photo",
    lokasi: "Medan",
    tanggal: "20/09/2024",
    file: null,
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
};

// TODO -> LOGIC TAMBAH DATA
const download = (item) => {
  console.log("DOWNLOAD ", item);
};
</script>

<template>
  <VCard class="pa-4 mb-8">
    <VCardTitle class="d-flex justify-space-between align-center">
      <span class="text-h3">Formulir Pemeriksaan Bahan</span>
      <FormTambahPemeriksaanBahan
        :is-editable="props.isEditable"
        @confirm="save"
      />
    </VCardTitle>
    <VCardItem>
      <VDataTable :headers="headers" :items="items">
        <template #item.file="{ item }">
          <v-btn color="primary" variant="plain" @click="download(item)">
            <VIcon>mdi-download</VIcon>
            File
          </v-btn>
        </template>

        <template #item.action="{ item }">
          <v-btn color="primary" variant="plain">
            <VIcon>mdi-dots-vertical</VIcon>
            <VMenu activator="parent" :close-on-content-click="false">
              <VCard>
                <FormEditPemeriksaanBahan
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
