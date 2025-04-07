<script setup lang="ts">
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
  <VDialog max-width="60svw">
    <template #activator="{ props: openModal }">
      <VBtn v-bind="openModal" prepend-icon="fa-plus" variant="outlined"
        >Tambah</VBtn
      >
    </template>
    <template #default="{ isActive }">
      <VCard>
        <VCardTitle>
          <VRow>
            <VCol cols="10"><h3>Tambah Pemetaan Produk dan Pabrik</h3></VCol>
            <VCol cols="2" style="display: flex; justify-content: end"
              ><VIcon
                size="small"
                icon="fa-times"
                @click="isActive.value = false"
              ></VIcon
            ></VCol>
          </VRow>
        </VCardTitle>
        <VCardItem>
          <VRow>
            <VCol cols="12">
              <VItemGroup>
                <VLabel>Pabrik</VLabel>
                <VSelect placeholder="Pilih Pabrik"></VSelect>
              </VItemGroup>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="6">
              <VItemGroup>
                <VLabel>Nomor</VLabel>
                <VSelect placeholder="Pilih Nomor"></VSelect>
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
                :items-per-page-options="[10, 25, 50, 100]"
                :headers="tableHeader"
                :items="items"
              >
                <template #item.action="{ item }">
                  <VCheckbox v-model="selected" :value="item.id"></VCheckbox>
                </template>
              </VDataTable>
            </VCol>
          </VRow>
        </VCardItem>
        <VCardActions
          style="display: flex; justify-content: end; padding: 1.5svw"
        >
          <div>
            <VBtn @click="isActive.value = false" variant="outlined"
              >Batal</VBtn
            >
            <VBtn variant="flat">Tambah</VBtn>
          </div>
        </VCardActions>
      </VCard>
    </template>
  </VDialog>
</template>
