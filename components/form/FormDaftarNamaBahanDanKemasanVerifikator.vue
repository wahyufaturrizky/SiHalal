<script setup lang="ts">
const headers = [
  { title: "No", key: "no" },
  { title: "Jenis Bahan", key: "jenis_bahan" },
  { title: "Nama Bahan", key: "nama_bahan" },
  { title: "Produsen", key: "produsen" },
  { title: "Nomor Sertifikat Halal", key: "no_sertifikat" },
];

const items = ref([]);
const route = useRoute();
const getIngredient = async () => {
  try {
    const response = await $api("/reguler/verifikator/detail/bahan/ingredient", {
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
  await getIngredient()
})
</script>

<template>
  <VCard class="pa-4 mb-8">
    <VCardTitle class="d-flex justify-space-between align-center">
      <span class="text-h3">Daftar Nama Bahan Dan Kemasan</span>
    </VCardTitle>
    <VCardItem>
      <VDataTable :headers="headers" :items="items"> 
        <template #item.no="{index}"> 
          {{index + 1}}
        </template>
      </VDataTable>
    </VCardItem>
  </VCard>
</template>

<style scoped lang="scss"></style>
