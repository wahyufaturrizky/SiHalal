<script setup lang="ts">
const listBahan = ref([
  // { id: 1, label: "Air", value: "1" },
  // { id: 2, label: "Es Batu", value: "2" },
  // { id: 3, label: "Buah Mangga", value: "3" },
  // { id: 4, label: "Buah Alpukat", value: "4" },
  // { id: 5, label: "Gula Pasir 1Kg", value: "5" },
  // { id: 6, label: "Gula Aren 1Kg", value: "6" },
  // { id: 7, label: "Gelas Plastik", value: "7" },
]);

const selectedBahan = ref([]);

const route = useRoute<"">();
const submissionId = route.params?.id;
const handleListIngredient = async () => {
  try {
    const response: any = await $api(
      `/self-declare/business-actor/ingredient/list`,
      {
        method: "get",
        query: {
          id_reg: submissionId,
        },
      }
    );

    if (response.code === 2000) {
      listBahan.value = response.data ? response.data : [];
    }
    return response;
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  await handleListIngredient();
});
</script>

<template>
  <VDialog max-width="60svw">
    <template #activator="{ props: openModal }">
      <VListItem v-bind="openModal"
        ><VListItemTitle>
          <VIcon class="mr-2" icon="ri-file-add-fill" />
          Input Bahan
        </VListItemTitle></VListItem
      >
    </template>
    <template #default="{ isActive }">
      <VCard>
        <VCardTitle>
          <VRow>
            <VCol cols="10" style="display: flex; align-items: center"
              ><h3>Input Bahan</h3></VCol
            >
            <VCol cols="2" style="display: flex; justify-content: end">
              <VCol cols="2" style="display: flex; justify-content: end"
                ><VIcon
                  size="small"
                  icon="fa-times"
                  @click="isActive.value = false"
                ></VIcon
              ></VCol>
            </VCol>
          </VRow>
        </VCardTitle>
        <VCardItem>
          <VRow>
            <VCol cols="2">Nama Produk</VCol>
            <VCol cols="1">:</VCol>
            <VCol cols="7">Jus Mangga RezQ</VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <div>
                <p>Pilih bahan-bahan yang diperlukan untuk produk tersebut:</p>
                <!-- <VCheckbox
                  v-for="item in listBahan"
                  :key="item.id"
                  :label="item.label"
                  :value="item.value"
                  v-model="selectedBahan"
                ></VCheckbox> -->
              </div>
            </VCol>
          </VRow>
        </VCardItem>
        <VCardActions>
          <VBtn
            variant="outlined"
            density="compact"
            @click="isActive.value = false"
          >
            Batal</VBtn
          >
          <VBtn variant="flat" density="compact"
            >Simpan ({{ selectedBahan.length }})</VBtn
          >
        </VCardActions>
      </VCard>
    </template>
  </VDialog>
</template>
