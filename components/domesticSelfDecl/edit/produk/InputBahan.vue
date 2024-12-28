<script setup lang="ts">
const props = defineProps<{
  productName?: string | null;
  productId?: string | null;
  bahanSelected: any;
  embeddedInModule?: string | null;
}>();

const embedType = computed(() =>
  props.embeddedInModule !== null ? props.embeddedInModule : "pelakuSelfDec"
);
const listBahan: any = ref([]);

const selectedBahan = ref([]);
const loadingAll = ref(true);
const loadingListIngredient = ref(false);

const route = useRoute<"">();
const submissionId = route.params?.id;

const handleListIngredient = async () => {
  loadingListIngredient.value = true;
  try {
    const response: any = await $api(
      `/self-declare/business-actor/ingredient/list`,
      {
        method: "get",
        query: {
          id_reg: submissionId,
        },
      } as any
    );

    if (response.code === 2000) {
      listBahan.value = response.data ? response.data : [];
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
      loadingListIngredient.value = false;
      return response;
    } else {
      loadingListIngredient.value = false;
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
    loadingListIngredient.value = false;
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

onMounted(async () => {
  const res: any = await Promise.all([handleListIngredient()]);

  const checkResIfUndefined = res.every((item: any) => {
    return item !== undefined;
  });

  if (checkResIfUndefined) {
    loadingAll.value = false;
  } else {
    loadingAll.value = false;
  }
});

const addText = computed(() => {
  return selectedBahan.value.length > 0
    ? `Tambah (${selectedBahan.value.length})`
    : "Tambah";
});

const emit = defineEmits(["submit"]);
const handleSubmit = () => {
  emit("submit", selectedBahan.value, props.productId);
};

const onOpenModal = () => {
  selectedBahan.value = props.bahanSelected ? props.bahanSelected : [];
  handleListIngredient();
};
</script>

<template>
  <VDialog max-width="60svw">
    <template #activator="{ props: openModal }">
      <VListItem
        v-if="embedType === 'pelakuSelfDec'"
        v-bind="openModal"
        @click="onOpenModal"
        ><VListItemTitle>
          <VIcon class="mr-2" icon="ri-file-add-fill" />
          Input Bahan
        </VListItemTitle></VListItem
      >
      <VBtn
        v-if="embedType === 'pendampingSelfDec'"
        variant="outlined"
        size="small"
        rounded="lg"
        v-bind="openModal"
        @click="onOpenModal"
        >Lihat</VBtn
      >
    </template>
    <template #default="{ isActive }">
      <VCard v-if="!loadingAll">
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
                  @change="console.log('selected bahan', selectedBahan)"
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

      <VSkeletonLoader
        type="table-heading, list-item-two-line, image, table-tfoot"
        v-else
      />
    </template>
  </VDialog>
</template>
