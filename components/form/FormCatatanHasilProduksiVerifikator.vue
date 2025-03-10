<script setup lang="ts">
import FormEditLayoutProduksi from "@/components/form/FormEditLayoutProduksi.vue";
import FormTambahLayoutProduksi from "@/components/form/FormTambahLayoutProduksi.vue";

const catatanHeaders = [
  { title: "No", key: "no" },
  { title: "Nama Produk", key: "nama_produk", nowrap: true },
  { title: "Tipe Penambahan", key: "tipe_penambahan", nowrap: true },
  { title: "Jumlah", key: "jumlah", nowrap: true },
  { title: "Tanggal Produksi", key: "tanggal_produksi", nowrap: true },
  { title: "Tanggal Kadaluarsa", key: "tanggal_kadaluarsa", nowrap: true },
  {
    title: "File Dokumen",
    key: "file",
    value: "file",
    sortable: false,
    nowrap: true,
  },
];

const catatanItems = ref([]);

const route = useRoute();
const getCatatanProduksi = async () => {
  try {
    const response = await $api("/reguler/verifikator/detail/proses/catatan-produksi", {
      method: "post",
      body: {
        id_reg: route.params.id,
      },
    });
    if (response.code != 2000) {
      useSnackbar().sendSnackbar("ada kesalahan", "error");
      return;
    }
    catatanItems.value = response.data;
  } catch (error) {
    useSnackbar().sendSnackbar("ada kesalahan", "error");
  }
};
onMounted(async () => {
  await getCatatanProduksi();
});
// TODO -> LOGIc DOWNLOAD
const download = async (item) => {
  await downloadDocument(item,'FILES');
};
</script>

<template>
  <VCard class="pa-4 mb-8">
    <VCardTitle class="d-flex justify-space-between align-center">
      <span class="text-h3">Catatan Hasil Produksi </span>
    </VCardTitle>
    <VCardItem>
      <VDataTable :headers="catatanHeaders" :items="catatanItems">
        <template #item.no="{index}"> 
          {{index + 1}}
        </template>
        <template #item.file="{ item }">
          <v-btn
          :disabled="item.file_dok == ''"
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
