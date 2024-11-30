<script setup lang="ts">
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
        <VCol cols="6"><h3>Pemetaan Produk dan Pabrik</h3></VCol>
        <VCol cols="6" style="display: flex; justify-content: end"
          ><ModalTambahProduk
            :is-editable="props.isEditable"
          ></ModalTambahProduk
        ></VCol>
      </VRow>
    </VCardTitle>
    <VCardItem>
      <VDataTable :headers="tableHeader" :items="items">
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
