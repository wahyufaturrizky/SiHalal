<script setup lang="ts">
const tableHeader = [
  { title: "No", value: "no" },
  { title: "Tanda Tangan Penanggung Jawab", value: "signage_responsible" },
  { title: "Nama Penyelia Halal", value: "nama_penyelia" },
  { title: "Tanda Tangan Penyelia Halal", value: "signage_penyelia" },
];

const items = ref([]);
const route = useRoute();
const getDocument = async () => {
  try {
    const response = await $api(
      "/reguler/verifikator/detail/pemantauan/tanda-tangan",
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
const download = async (item, param?: string) => {
  await downloadDocument(item, param);
};
</script>

<template>
  <VCard>
    <VCardTitle>
      <VRow>
        <VCol cols="6"><h3>Tanda Tangan</h3></VCol>
      </VRow>
    </VCardTitle>
    <VCardItem>
      <VDataTable :headers="tableHeader" :items="items">
        <template #item.no="{ index }">
          {{ index + 1 }}
        </template>
        <template
          #item.signage_responsible="{ item }"
          style="display: flex; align-content: center; align-items: center;"
        >
          <v-btn
            :disabled="item.ttd_pj == ''"
            color="primary"
            variant="plain"
            prepend-icon="mdi-file-download"
            @click="download(item.ttd_pj,'FILES')"
          >
            File
          </v-btn>
        </template>
        <template
          #item.signage_penyelia="{ item }"
          style="display: flex; align-content: center; align-items: center;"
        >
          <v-btn
            :disabled="item.ttd_ph == ''"
            color="primary"
            variant="plain"
            prepend-icon="mdi-file-download"
            @click="download(item.ttd_ph, 'FILES')"
          >
            File
          </v-btn>
        </template>
      </VDataTable>
    </VCardItem>
  </VCard>
</template>

<style scoped lang="scss"></style>
