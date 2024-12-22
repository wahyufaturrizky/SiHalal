<script setup lang="ts">
const tableHeader: any[] = [
  { title: "No", key: "no", nowrap: true },
  { title: "Nama Produk", key: "nama", nowrap: true },
  { title: "Merk", key: "merek", nowrap: true },
  { title: "Foto", key: "foto", nowrap: true },
  { title: "Jumlah Bahan Digunakan", key: "jumlah_bahan", nowrap: true },
  {
    title: "Action",
    key: "action",
    nowrap: true,
    align: "center",
    sortable: false,
  },
];

const productData = ref([]);

const route = useRoute<"">();
const submissionId = route.params?.id;
const { refresh } = await useAsyncData("list-product", async () => {
  return handleListProduct();
});
const handleListProduct = async () => {
  try {
    const response: any = await $api(
      `/self-declare/business-actor/product/list`,
      {
        method: "get",
        query: {
          id_reg: submissionId,
        },
      }
    );

    if (response.code === 2000) {
      productData.value = response.data ? response.data : [];
    }
    return response;
  } catch (error) {
    console.log(error);
  }
};

const handleSubmit = (payload: any) => {
  if (modalUse.value === "CREATE") handleAddProduct(payload);
  if (modalUse.value === "UPDATE") handleUpdateProduct(payload);
};
const handleAddProduct = async (payload: any) => {
  try {
    const response: any = await $api(
      `/self-declare/business-actor/product/create`,
      {
        method: "post",
        body: payload,
        query: {
          id_reg: submissionId,
        },
      }
    );

    if (response.code === 2000) {
      useSnackbar().sendSnackbar("Berhasil menambahkan data", "success");
      refresh();
    }
    return response;
  } catch (error) {
    useSnackbar().sendSnackbar("Gagal menambahkan data", "error");
    console.log(error);
  }
};

const handleUpdateProduct = async (payload: any) => {
  try {
    const response: any = await $api(
      `/self-declare/business-actor/product/update`,
      {
        method: "put",
        body: payload,
        query: {
          id_reg: submissionId,
          product_id: selectedProduct.value,
        },
      }
    );

    if (response.code === 2000) {
      useSnackbar().sendSnackbar("Berhasil mengubah data", "success");
      refresh();
    }
    return response;
  } catch (error) {
    useSnackbar().sendSnackbar("Gagal mengubah data", "error");
    console.log(error);
  }
};

const handleAddIngredient = async (payload: any) => {
  try {
    const response: any = await $api(
      `/self-declare/business-actor/product/create`,
      {
        method: "post",
        body: payload,
        query: {
          id_reg: submissionId,
        },
      }
    );

    if (response.code === 2000) {
      useSnackbar().sendSnackbar("Berhasil menambahkan data", "success");
      refresh();
    }
    return response;
  } catch (error) {
    useSnackbar().sendSnackbar("Gagal menambahkan data", "error");
    console.log(error);
  }
};

const handleDownload = async (productId: string) => {
  return await downloadDocument(productId);
};

const modalUse = ref("DELETE");
const selectedProduct = ref("");

const modalTitle = computed(() => {
  return modalUse.value === "CREATE"
    ? `Tambah Nama Produk`
    : `Ubah Nama Produk`;
});

const isFormModalOpen = ref(false);
const isDeleteModalOpen = ref(false);
const handleOpenModal = async (type: string, id?: string) => {
  modalUse.value = type;
  if (id) selectedProduct.value = id;

  if (type === "DELETE") {
    isDeleteModalOpen.value = true;
  } else {
    isFormModalOpen.value = true;
  }
};

const detailProduct = reactive({
  id: null,
  koderincian: null,
  merek: null,
  nama: null,
});
const handleDetailProduct = async (id: string) => {
  try {
    const response: any = await $api(
      `/self-declare/business-actor/product/detail`,
      {
        method: "get",
        query: {
          id_reg: submissionId,
          product_id: id,
        },
      }
    );

    if (response.code === 2000) {
      Object.assign(detailProduct, response.data);
    }
    return response;
  } catch (error) {
    console.log(error);
  }
};
const handleDeleteProduct = async () => {
  try {
    const response: any = await $api(
      `/self-declare/business-actor/product/remove`,
      {
        method: "delete",
        query: {
          id_reg: submissionId,
          product_id: selectedProduct.value,
        },
      }
    );

    if (response.code === 2000) {
      useSnackbar().sendSnackbar("Berhasil menghapus data", "success");
      refresh();
    }
    return response;
  } catch (error) {
    useSnackbar().sendSnackbar("Gagal menghapus data", "error");
    console.log(error);
  }
};

onMounted(() => {
  handleListProduct();
});
</script>

<template>
  <VCard style="padding: 1svw">
    <VCardTitle>
      <VRow>
        <VCol cols="6"><h3>Daftar Produk</h3></VCol>
        <VCol cols="6" style="display: flex; justify-content: end">
          <VBtn
            @click="handleOpenModal('CREATE')"
            variant="outlined"
            append-icon="fa-plus"
            style="margin-right: 1svw"
            >Tambah</VBtn
          >
          <!-- <VBtn variant="flat">Simpan Perubahan</VBtn> -->
        </VCol>
      </VRow>
    </VCardTitle>
    <VCardItem>
      <VDataTable
        :headers="tableHeader"
        :items="productData"
        class="custom-table"
        :hide-default-footer="productData.length > 0"
      >
        <template #item.no="{ index }">
          {{ index + 1 }}
        </template>
        <template #item.foto="{ item }: any">
          <VBtn variant="flat" class="px-3">
            <VIcon
              icon="fa-download"
              @click="handleDownload(item.foto)"
            ></VIcon>
          </VBtn>
        </template>
        <template #item.action="{ item }: any">
          <VMenu>
            <template #activator="{ props }">
              <VIcon
                @click="handleDetailProduct(item.id)"
                icon="fa-ellipsis-v"
                color="primary"
                v-bind="props"
              ></VIcon>
            </template>

            <VList>
              <InputBahan
                :product-name="detailProduct.nama"
                @submit="handleAddIngredient"
              />
              <VListItem
                prepend-icon="mdi-pencil"
                title="Ubah"
                class="cursor-pointer"
                @click="handleOpenModal('EDIT', item.id)"
              />
              <VListItem @click="handleOpenModal('DELETE', item.id)">
                <template #prepend>
                  <VIcon
                    icon="mdi-delete"
                    color="error"
                    class="cursor-pointer"
                  />
                </template>
                <VListItemTitle class="text-error">Hapus</VListItemTitle>
              </VListItem>
            </VList>
          </VMenu>
        </template>
      </VDataTable>
    </VCardItem>
  </VCard>
  <TambahProduk
    :dialog-title="modalTitle"
    :dialog-visible="isFormModalOpen"
    :dialog-use="modalUse"
    @update:dialog-visible="isFormModalOpen = $event"
    @submit:commit-action="handleSubmit"
    :data="detailProduct"
  />
  <ShSubmissionDetailFormModal
    dialog-title="Menghapus Data"
    :dialog-visible="isDeleteModalOpen"
    dialog-use="DELETE"
    @update:dialog-visible="isDeleteModalOpen = $event"
    @submit:commit-action="handleDeleteProduct"
  >
    <VCardText>
      <div>Apakah yakin ingin menghapus data ini</div>
    </VCardText>
  </ShSubmissionDetailFormModal>
</template>

<style scoped lang="scss">
:deep(.v-data-table.custom-table > .v-table__wrapper) {
  table {
    thead > tr > th:last-of-type {
      right: 0;
      position: sticky;
      border-left: 1px solid rgba(#000000, 0.12);
    }
    tbody > tr > td:last-of-type {
      right: 0;
      position: sticky;
      border-left: 1px solid rgba(#000000, 0.12);
      background: white;
    }
  }
}
</style>
