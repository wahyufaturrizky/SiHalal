<script setup lang="ts">
const tableHeader = [
  { title: "No", value: "no" },
  { title: "Nama Dokumen", value: "nama_dokumen" },
  { title: "File Dokumen", value: "file_docs" },
  { title: "Dokumen Pendukung", value: "supp_docs" },
];

const items = ref([]);
const route = useRoute();
const getDocument = async () => {
  try {
    const response = await $api(
      "/reguler/verifikator/detail/pemantauan/dokumen",
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
    items.value = response.data;
  } catch (error) {
    useSnackbar().sendSnackbar("ada kesalahan", "error");
  }
};
onMounted(async () => {
  await getDocument();
});
// TODO -> LOGIc DOWNLOAD
const download = async (item) => {
  await downloadDocument(item);
};
</script>

<template>
  <VCard>
    <VCardTitle>
      <VRow>
        <VCol cols="6"><h3>Upload Dokumen Lainnya</h3></VCol>
      </VRow>
    </VCardTitle>
    <VCardItem>
      <VDataTable
        disable-sort
        :items-per-page-options="[10, 25, 50, 100]"
        :headers="tableHeader"
        :items="items"
      >
        <template #item.no="{ index }">
          {{ index + 1 }}
        </template>
        <template
          #item.file_docs="{ item }"
          style="display: flex; align-content: center; align-items: center"
        >
          <v-btn
            :disabled="item.file_dok == ''"
            color="primary"
            variant="plain"
            prepend-icon="mdi-file-download"
            @click="download(item.file_dok, 'FILES')"
          >
            File
          </v-btn>
        </template>
      </VDataTable>
    </VCardItem>
  </VCard>
</template>

<style scoped lang="scss"></style>
