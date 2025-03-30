<script setup lang="ts">
import FormEditDiagramAlurProsesProduksi from "@/components/form/FormEditDiagramAlurProsesProduksi.vue";
import FormEditLayoutProduksi from "@/components/form/FormEditLayoutProduksi.vue";
import FormTambahDiagramAlurProsesProduksi from "@/components/form/FormTambahDiagramAlurProsesProduksi.vue";
import FormTambahLayoutProduksi from "@/components/form/FormTambahLayoutProduksi.vue";

const catatanHeaders = [
  { title: "No", key: "no" },
  { title: "Nama Produk", key: "nama_produk", nowrap: true },
  { title: "Tipe Penambahan", key: "tipe_penambahan", nowrap: true },
  { title: "Diagram Alur Proses", key: "narasi", nowrap: true },
  {
    title: "File Dokumen",
    key: "file",
    value: "file",
    sortable: false,
    nowrap: true,
  },
];
const route = useRoute();

const catatanItems = ref([]);
const size = ref(10);
const page = ref(1);
const totalData = ref(0);

const getAlur = async () => {
  try {
    const response = await $api(
      "/reguler/verifikator/detail/proses/diagram-alur",
      {
        method: "post",
        body: {
          id_reg: route.params.id,
        },
        params: {
          page: page.value,
          size: size.value,
        },
      }
    );
    if (response.code != 2000) {
      useSnackbar().sendSnackbar("ada kesalahan", "error");
      return;
    }
    catatanItems.value = response.data;
    totalData.value = response.total_data
  } catch (error) {
    useSnackbar().sendSnackbar("ada kesalahan", "error");
  }
};
// TODO -> LOGIC TO DONWLOAD FILE
const downloadCatatanBahan = async (item) => {
  await downloadDocument(item,'FILES');
};
</script>

<template>
  <VCard class="pa-4 mb-8">
    <VCardTitle class="d-flex justify-space-between align-center">
      <span class="text-h3">Diagram Alur Proses Produksi </span>
    </VCardTitle>
    <VCardItem>
      <VDataTableServer
        v-model:items-per-page="size"
        v-model:page="page"
        :headers="catatanHeaders"
        :items="catatanItems"
        :items-length="totalData"
        @update:options="getAlur"
      >
        <template #item.no="{ index }">
          {{ (page - 1) * size + index + 1 }}
        </template>
        <template #item.file="{ item }">
          <v-btn
            :disabled="item.file_dok == ''"
            color="primary"
            variant="plain"
            prepend-icon="mdi-download"
            @click="downloadCatatanBahan(item.file_dok)"
          >
            File
          </v-btn>
        </template>
      </VDataTableServer>
    </VCardItem>
  </VCard>
</template>

<style scoped lang="scss"></style>
