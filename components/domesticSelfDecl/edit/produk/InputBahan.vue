<script setup lang="ts">
const props = defineProps<{
  productName?: string | null;
}>();
const listBahan: any = ref([]);

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

const addText = computed(() => {
  return selectedBahan.value.length
    ? `Tambah (${selectedBahan.value.length})`
    : "Tambah";
});

const emit = defineEmits(["submit"]);
const handleSubmit = () => {
  emit("submit", selectedBahan.value);
  selectedBahan.value = [];
};
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
            <VCol cols="7">{{
              props.productName ? props.productName : "-"
            }}</VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <div>
                <p>Pilih bahan-bahan yang diperlukan untuk produk tersebut:</p>
                <VCheckbox
                  v-for="item in listBahan"
                  :key="item.id"
                  :label="item.nama_bahan"
                  :value="item.id"
                  v-model="selectedBahan"
                ></VCheckbox>
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
          <VBtn
            variant="flat"
            density="compact"
            :color="selectedBahan.length ? 'primary' : '#A09BA1'"
            @click="
              selectedBahan.length
                ? [handleSubmit(), (isActive.value = false)]
                : null
            "
            >{{ addText }}</VBtn
          >
        </VCardActions>
      </VCard>
    </template>
  </VDialog>
</template>
