<script setup lang="ts">
const dialogDaftarBahan = ref(false);
const listIngredient = ref([]);
const currentSelectedBahan = ref([]);

const selectedIngredients = computed(() => {
  return listIngredient.value.filter((item) =>
    currentSelectedBahan.value.includes(item.id)
  );
});

const headers = [
  { title: "No", key: "no" },
  { title: "Nama Produk", key: "nama" },
  { title: "Jumlah Bahan", key: "jumlah_bahan", align: "center" },
  {
    title: "Foto Produk",
    key: "foto",
    value: "foto",
    sortable: false,
    nowrap: true,
  },
  { title: "Action", key: "action", align: "center" },
];

const items = ref([]);
const route = useRoute();
const page = ref(1);
const itemsPerPage = ref(10);

const getProduct = async () => {
  try {
    const response = await $api("/reguler/verifikator/detail/bahan/product", {
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

const handleListIngredient = async () => {
  try {
    const response: any = await $api(
      "/self-declare/business-actor/ingredient/list",
      {
        method: "get",
        query: {
          id_reg: route.params.id,
        },
      } as any
    );

    listIngredient.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const onShowDaftarBahan = (selectedBahan: any) => {
  currentSelectedBahan.value = selectedBahan;
  dialogDaftarBahan.value = true;
};

const onCloseDaftarBahan = () => {
  dialogDaftarBahan.value = false;
};

onMounted(async () => {
  await getProduct();
  await handleListIngredient();
});

// TODO -> LOGIc DOWNLOAD
const download = async (item) => {
  await downloadDocument(item, "PRODUCT");
};
</script>

<template>
  <VCard class="pa-4 mb-8">
    <VCardTitle class="d-flex justify-space-between align-center">
      <span class="text-h3">Daftar Nama Produk</span>
    </VCardTitle>
    <VCardItem>
      <VDataTable
        disable-sort
        :headers="headers"
        :items="items"
        :items-per-page="itemsPerPage"
        :page="page"
        @update:page="(newPage) => (page = newPage)"
        @update:items-per-page="(newSize) => (itemsPerPage = newSize)"
      >
        <template #item.no="{ index }">
          {{ (page - 1) * itemsPerPage + index + 1 }}
        </template>
        <template #item.foto="{ item }">
          <VBtn
            :color="Boolean(item.foto) ? 'primary' : 'secondary'"
            variant="plain"
            :disabled="Boolean(!item.foto)"
            @click="download(item.foto)"
          >
            <VIcon>mdi-download</VIcon> File
          </VBtn>
        </template>
        <template #item.action="{ item }">
          <div class="d-flex justify-center gap-1">
            <IconBtn size="small">
              <VIcon
                icon="mdi-eye"
                color="danger"
                @click="() => onShowDaftarBahan(item.bahan_selected)"
              />
              <VTooltip activator="parent" location="top">
                Lihat Daftar Bahan
              </VTooltip>
            </IconBtn>
          </div>
        </template>
      </VDataTable>
    </VCardItem>
  </VCard>

  <VDialog v-model="dialogDaftarBahan" max-width="640px" persistent>
    <VCard class="px-4 pb-2">
      <VCardTitle class="pa-4 d-flex justify-space-between align-center">
        <h4 class="text-h4 font-weight-bold">Daftar Bahan</h4>
        <VIcon size="large" @click="onCloseDaftarBahan">
          mdi-close-thick
        </VIcon>
      </VCardTitle>
      <ol class="pr-4 pb-4 ml-8">
        <li v-for="(item, index) in selectedIngredients" :key="index">
          {{ item.nama_bahan }}
        </li>
      </ol>
    </VCard>
  </VDialog>
</template>

<style scoped lang="scss"></style>
