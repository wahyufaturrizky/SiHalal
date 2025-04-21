<script setup lang="ts">
import FormEditCatatan from "@/components/form/FormEditCatatan.vue";

const props = defineProps({
  isEditable: {
    type: Boolean,
    default: true,
  },
});

const snackBar = useSnackbar();

const headers = [
  { title: "No", key: "no" },
  { title: "Nama", key: "nama" },
  { title: "Tipe Penambahan", key: "type" },
  { title: "Jumlah", key: "jumlah" },
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
    jumlah: 20,
    tanggal: "20/09/2024",
    file: null,
  },
  {
    no: 2,
    nama: "Kopi Luak Ciater",
    type: "Unggah Photo",
    jumlah: 20,
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
  snackBar.sendSnackbar("Berhasil menambahkan data", "success");
};

// TODO -> LOGIC TAMBAH DATA
const save = (form) => {
  console.log("TAMBAH DATA ", form);
  snackBar.sendSnackbar("Berhasil menambahkan data", "success");
};

// TODO -> LOGIC TAMBAH DATA
const download = (item) => {
  console.log("DOWNLOAD ", item);
};
</script>

<template>
  <VCard class="pa-4 mb-8">
    <VCardTitle class="d-flex justify-space-between align-center">
      <span class="text-h3">Catatan Pembelian Bahan</span>
      <FormTambahCatatan :is-editable="props.isEditable" @confirm="save" />
    </VCardTitle>
    <VCardItem>
      <VDataTable
        disable-sort
        :items-per-page-options="[10, 25, 50, 100]"
        :headers="headers"
        :items="items"
      >
        <template #item.file="{ item }">
          <VBtn color="primary" variant="plain" @click="download(item)">
            <VIcon>mdi-download</VIcon>
            File
          </VBtn>
        </template>

        <template #item.tanggal="{ item }">
          {{ formatDateId(item.tanggal) }}
        </template>

        <template #item.action="{ item }">
          <VBtn color="primary" variant="plain">
            <VIcon>mdi-dots-vertical</VIcon>
            <VMenu activator="parent" :close-on-content-click="false">
              <VCard>
                <FormEditCatatan
                  :is-editable="props.isEditable"
                  :initial-data="item"
                  @confirm="update"
                />
                <VBtn
                  :disabled="!props.isEditable"
                  variant="text"
                  color="error"
                  prepend-icon="ri-delete-bin-6-line"
                  block
                  @click="remove(item.no)"
                >
                  Hapus
                </VBtn>
              </VCard>
            </VMenu>
          </VBtn>
        </template>
      </VDataTable>
    </VCardItem>
  </VCard>
</template>

<style scoped lang="scss"></style>
