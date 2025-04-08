<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const tableHeader = [
  { title: "No", value: "no" },
  { title: "Nama Produk", value: "nama_produk" },
  { title: "Nama Pabrik", value: "nama_pabrik" },
];

const items = ref([]);
const route = useRoute();
const getProduct = async () => {
  try {
    const response = await $api("/reguler/verifikator/detail/produk", {
      method: "post",
      body: {
        id_reg: route.params.id,
      },
    });
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
  await getProduct();
});
</script>

<template>
  <VCard>
    <VCardTitle>
      <VRow>
        <VCol cols="6"
          ><h3>{{ t("pengajuan-reguler.reguler-form-produk-title") }}</h3></VCol
        >
      </VRow>
    </VCardTitle>
    <VCardItem>
      <VDataTable
        :items-per-page-options="[10, 25, 50, 100]"
        :headers="tableHeader"
        :items="items"
      >
        <template #item.no="{ index }">
          {{ index + 1 }}
        </template>
      </VDataTable>
    </VCardItem>
  </VCard>
</template>

<style scoped lang="scss"></style>
