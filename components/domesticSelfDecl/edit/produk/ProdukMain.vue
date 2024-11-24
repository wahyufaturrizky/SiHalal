<script setup lang="ts">
const tableHeader = [
  { title: "No", value: "no" },
  { title: "Nama Produk", value: "ingr_name" },
  { title: "Merk", value: "brand" },
  { title: "Foto", value: "photo" },
  { title: "Jumlah Bahan Digunakan", value: "amount_used" },
  { title: "Action", value: "action" },
];

const items = [
  {
    ingr_name: "xx",
    brand: "xx",
    photo: "xx",
    amount_used: "0",
  },
];
</script>
<template>
  <VCard style="padding: 1svw">
    <VCardTitle>
      <VRow>
        <VCol cols="6"><h3>Daftar Produk</h3></VCol>
        <VCol cols="6" style="display: flex; justify-content: end">
          <TambahProduk></TambahProduk>
          <VBtn variant="flat">Simpan Perubahan</VBtn>
        </VCol>
      </VRow>
    </VCardTitle>
    <VCardItem>
      <VDataTable :headers="tableHeader" :items="items">
        <template #item.photo>
          <div style="display: flex; justify-content: center">
            <VBtn variant="flat">
              <VIcon icon="fa-download"></VIcon>
            </VBtn>
          </div>
        </template>
        <template #item.action>
          <div style="display: flex; justify-content: center">
            <VMenu>
              <template #activator="{ props }">
                <VIcon icon="fa-ellipsis-v" v-bind="props"></VIcon>
              </template>

              <VList>
                <InputBahan></InputBahan>
                <UbahProduk></UbahProduk>
                <VListItem
                  ><VListItemTitle style="color: red">
                    <VIcon color="red" class="mr-2"> fa-trash </VIcon>
                    Hapus
                  </VListItemTitle></VListItem
                >
              </VList>
            </VMenu>
          </div>
        </template>
      </VDataTable>
    </VCardItem>
  </VCard>
</template>
