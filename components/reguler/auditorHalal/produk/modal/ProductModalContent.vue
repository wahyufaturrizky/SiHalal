<script lang="ts" setup>
const props = defineProps({
  isEditable: {
    type: Boolean,
    default: true,
    required: false,
  },
  data: {
    type: Array,
    required: false,
  },
  start: {
    type: Number,
    required: false,
  },
  end: {
    type: Number,
    required: false,
  },
})

const tableHeader = [
  { title: "No", value: "no" },
  { title: "Nama Produk", value: "product_name" },
  { title: "Nama Pabrik", value: "factory_name" },
  { title: "Action", value: "action" },
];

const items = [
  {
    id: "112233",
    product_name: "xx",
    factory_name: "xx",
  },
];
const selected = ref([]);
</script>

<template>
  <VCardItem>
    <VRow>
      <VCol cols="12">
        <VItemGroup>
          <VLabel>Pabrik</VLabel>
          <VSelect
            placeholder="Pilih Pabrik"
            :items="props?.data"
            item-title="nama"
            item-value="id_pabrik"
          />
        </VItemGroup>
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="6">
        <VItemGroup>
          <VLabel>Nomor</VLabel>
          <VSelect
            v-model="props?.start"
            placeholder="Pilih Nomor"
          />
        </VItemGroup>
      </VCol>
      <VCol cols="6">
        <VItemGroup>
          <VLabel>Sampai</VLabel>
          <VSelect placeholder="Pilih Nomor"></VSelect>
        </VItemGroup>
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12">
        <VDataTable
            :headers="tableHeader"
            :items="items"
            hide-default-footer
            class="border rounded"
        >
            <template #item.no="{ index }">
                <label>{{ index + 1 }}</label>
            </template>
          <template #item.action="{ item }">
            <VCheckbox v-model="selected" :value="item.id"></VCheckbox>
          </template>
        </VDataTable>
      </VCol>
    </VRow>
  </VCardItem>
</template>
