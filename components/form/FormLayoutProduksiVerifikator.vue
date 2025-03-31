<script setup lang="ts">
import FormEditLayoutProduksi from "@/components/form/FormEditLayoutProduksi.vue";
import FormTambahLayoutProduksi from "@/components/form/FormTambahLayoutProduksi.vue";

const headers = [
  { title: "No", key: "no" },
  { title: "Nama Pabrik", key: "nama_pabrik", nowrap: true },
  {
    title: "File Layout Pabrik",
    key: "file",
    value: "file",
    sortable: false,
    nowrap: true,
  },
];

const items = ref([])
const size = ref(10);
const page = ref(1);
const totalData = ref(0);

const route = useRoute();
const getLayout = async () => {
  try {
    const response = await $api("/reguler/verifikator/detail/proses/layout", {
      method: "post",
      body: {
        id_reg: route.params.id,
      },
      params: {
        page: page.value,
        size: size.value,
      },
    });
    if (response.code != 2000) {
      useSnackbar().sendSnackbar("ada kesalahan", "error");
      return;
    }
    items.value = response.data;
    totalData.value = response.total_data
  } catch (error) {
    useSnackbar().sendSnackbar("ada kesalahan", "error");
  }
};
// TODO -> LOGIc DOWNLOAD
const download = async (item) => {
  await downloadDocument(item,'FILES');
};
</script>

<template>
  <VCard class="pa-4 mb-8">
    <VCardTitle class="d-flex justify-space-between align-center">
      <span class="text-h3">Layout / Denah Ruang Produksi </span>
    </VCardTitle>
    <VCardItem>
      <VDataTableServer
        v-model:items-per-page="size"
        v-model:page="page"
        :headers="headers"
        :items="items"
        :items-length="totalData"
        @update:options="getLayout"
      >
        <template #item.no="{ index }">
          {{ (page - 1) * size + index + 1 }}
        </template>
        <template #item.file="{ item }">
          <v-btn
            :disabled="item.file_layout == ''"
            color="primary"
            variant="plain"
            prepend-icon="mdi-download"
            @click="download(item.file_layout)"
          >
            File
          </v-btn>
        </template>
      </VDataTableServer>
    </VCardItem>
  </VCard>
</template>

<style scoped lang="scss"></style>
