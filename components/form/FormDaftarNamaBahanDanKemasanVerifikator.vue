<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const headers = [
  { title: "No", key: "no" },
  {
    title: "pengajuan-reguler.reguler-form--bahan-jenisbahan",
    key: "jenis_bahan",
  },
  {
    title: "pengajuan-reguler.reguler-form--bahan-namabahan",
    key: "nama_bahan",
  },
  { title: "pengajuan-reguler.reguler-form--bahan-produsen", key: "produsen" },
  {
    title: "pengajuan-reguler.reguler-form--bahan-nosert",
    key: "no_sertifikat",
  },
];

const items = ref([]);
const route = useRoute();
const getIngredient = async () => {
  try {
    const response = await $api(
      "/reguler/verifikator/detail/bahan/ingredient",
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
  await getIngredient();
});
</script>

<template>
  <VCard class="pa-4 mb-8">
    <VCardTitle class="d-flex justify-space-between align-center">
      <span class="text-h3"
        >{{ t("pengajuan-reguler.reguler-form--bahan-title") }}
      </span>
    </VCardTitle>
    <VCardItem>
      <VDataTable
        :items-per-page-options="[10, 25, 50, 100]"
        :headers="headers"
        :items="items"
      >
        <template #headers.jenis_bahan="{ column }">
          {{ t(column.title) }}
        </template>

        <template #headers.nama_bahan="{ column }">
          {{ t(column.title) }}
        </template>

        <template #headers.produsen="{ column }">
          {{ t(column.title) }}
        </template>

        <template #headers.no_sertifikat="{ column }">
          {{ t(column.title) }}
        </template>

        <template #item.no="{ index }">
          {{ index + 1 }}
        </template>
      </VDataTable>
    </VCardItem>
  </VCard>
</template>

<style scoped lang="scss"></style>
