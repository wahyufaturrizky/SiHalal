<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const props = defineProps({
  isEditable: {
    type: Boolean,
    default: true,
  },
});

const tableHeader = [
  { title: "No", value: "no" },
  { title: "Nama Produk", value: "product_name" },
  { title: "Nama Pabrik", value: "factory_name" },
  { title: "Action", value: "action" },
];

const items = [
  {
    product_name: "xx",
    factory_name: "xx",
  },
];
</script>

<template>
  <VCard>
    <VCardTitle>
      <VRow>
        <VCol cols="6"
          ><h3>{{ t("pengajuan-reguler.reguler-form-produk-title") }}</h3></VCol
        >
        <VCol cols="6" style="display: flex; justify-content: end"
          ><ModalTambahProduk v-if="props.isEditable"></ModalTambahProduk
        ></VCol>
      </VRow>
    </VCardTitle>
    <VCardItem>
      <VDataTable
        disable-sort
        :items-per-page-options="[10, 25, 50, 100]"
        :headers="tableHeader"
        :items="items"
      >
        <template #item.action>
          <div class="text-center">
            <ModalHapusProduk
              :is-editable="props.isEditable"
            ></ModalHapusProduk>
          </div>
        </template>
      </VDataTable>
    </VCardItem>
  </VCard>
</template>

<style scoped lang="scss"></style>
