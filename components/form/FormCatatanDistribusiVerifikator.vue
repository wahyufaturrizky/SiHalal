<script setup lang="ts">
import FormEditCatatanDistribusi from "@/components/form/FormEditCatatanDistribusi.vue";
import FormEditLayoutProduksi from "@/components/form/FormEditLayoutProduksi.vue";
import FormTambahCatatanDistribusi from "@/components/form/FormTambahCatatanDistribusi.vue";
import FormTambahLayoutProduksi from "@/components/form/FormTambahLayoutProduksi.vue";

const catatanHeaders = [
  { title: "No", key: "no" },
  { title: "Nama Catatan", key: "nama_produk", nowrap: true },
  { title: "Tipe Penambahan", key: "tipe_penambahan", nowrap: true },
  { title: "Jumlah", key: "jumlah", nowrap: true },
  { title: "Tanggal Distribusi", key: "tanggal", nowrap: true },
  { title: "Tujuan", key: "tujuan", nowrap: true },
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
const getCatatanDistribusi = async () => {
  try {
    const response = await $api(
      "/reguler/verifikator/detail/proses/catatan-distribusi",
      {
        method: "post",
        body: {
          id_reg: route.params.id,
        },
      }
    );
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
  await getCatatanDistribusi();
});
// TODO -> LOGIc DOWNLOAD
const download = async (item) => {
  await downloadDocument(item);
};
</script>

<template>
  <VCard class="pa-4 mb-8">
    <VCardTitle class="d-flex justify-space-between align-center">
      <span class="text-h3">Catatan Distribusi / Penjualan Produk </span>
    </VCardTitle>
    <VCardItem>
      <VDataTable :headers="catatanHeaders" :items="catatanItems">
        <template #item.no="{ index }">
          {{ index + 1 }}
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
