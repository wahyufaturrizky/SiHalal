<script setup lang="ts">
defineProps({
  canNotEdit: {
    type: Boolean,
  },
});

const tableHeader: any[] = [
  { title: "No", key: "no", nowrap: true },
  { title: "Nama Produk", key: "nama", nowrap: true },
  { title: "Merk", key: "merek", nowrap: true },
  { title: "Foto", key: "foto", nowrap: true },
  { title: "Jumlah Bahan Digunakan", key: "jumlah_bahan", nowrap: true },
  { title: "Verifikasi Pendamping", key: "verified", nowrap: true },
  {
    title: "Action",
    key: "action",
    nowrap: true,
    align: "center",
    sortable: false,
  },
];

const selectedIngredient = ref([]);
const store = useMyTabEditRegulerStore();
const route = useRoute<"">();
const { produk, produkAllBahan } = storeToRefs(store);
const submissionId = route.params?.id as string;
const { refresh } = await useAsyncData("list-product", async () => {
  return store.getProduct(submissionId);
});
const handleSubmit = async (payload: any) => {
  if (modalUse.value === "CREATE") await handleAddProduct(payload);
  // if (modalUse.value === "UPDATE") await handleUpdateProduct(payload);
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
      } as any
    );

    if (response.code === 2000) {
      useSnackbar().sendSnackbar("Berhasil menambahkan data", "success");
      await refresh();
    }
    return response;
  } catch (error) {
    useSnackbar().sendSnackbar("Gagal menambahkan data", "error");
    console.log(error);
  } finally {
    store.isAllBahanSelected();
  }
};

const handleUpdateProduct = async (payload: any, productId: string) => {
  try {
    const response: any = await $api(
      `/self-declare/business-actor/product/update`,
      {
        method: "put",
        body: payload,
        query: {
          id_reg: submissionId,
          product_id: productId,
        },
      } as any
    );

    if (response.code === 2000) {
      useSnackbar().sendSnackbar("Berhasil mengubah data", "success");
      await refresh();
    }
    return response;
  } catch (error) {
    useSnackbar().sendSnackbar("Gagal mengubah data", "error");
    console.log(error);
  } finally {
    store.isAllBahanSelected();
  }
};

const handleAddIngredient = async (payload: any, idProduct: string) => {
  try {
    const response: any = await $api(
      `/self-declare/business-actor/product/add-ingredient`,
      {
        method: "post",
        body: payload,
        query: {
          id_reg: submissionId,
          product_id: idProduct,
        },
      } as any
    );

    if (response.code === 2000) {
      useSnackbar().sendSnackbar("Berhasil menambahkan data", "success");
      await refresh();
    }
    return response;
  } catch (error) {
    useSnackbar().sendSnackbar("Gagal menambahkan data", "error");
    console.log(error);
  } finally {
    store.isAllBahanSelected();
  }
};

const handleDownload = async (productId: string) => {
  return await downloadDocument(productId, "PRODUCT");
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
    if (type === "EDIT") {
      console.log("data on edit = ", detailProduct.value);
    }
    isFormModalOpen.value = true;
  }
};

const detailProduct = ref({
  id: null,
  koderincian: null,
  merek: null,
  nama: null,
});
const handleDetailProduct = async (id: string) => {
  selectedProduct.value = id;
  try {
    const response: any = await $api(
      `/self-declare/business-actor/product/detail`,
      {
        method: "get",
        query: {
          id_reg: submissionId,
          product_id: id,
        },
      } as any
    );

    if (response.code === 2000) {
      detailProduct.value = response.data;
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
      } as any
    );

    if (response.code === 2000) {
      useSnackbar().sendSnackbar("Berhasil menghapus data", "success");
      await refresh();
    }
    return response;
  } catch (error) {
    useSnackbar().sendSnackbar("Gagal menghapus data", "error");
    console.log(error);
  } finally {
    store.isAllBahanSelected();
  }
};
</script>

<template>
  <VCard style="padding: 1svw">
    <VCardTitle>
      <VRow>
        <VCol cols="6"><h3>Daftar Produk</h3></VCol>
        <VCol cols="6" style="display: flex; justify-content: end">
          <VBtn
            v-if="!canNotEdit"
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
      <VDataTable :headers="tableHeader" :items="produk" class="custom-table">
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
        <template #item.verified="{ item }">
          <v-chip :color="item.verified ? 'success' : 'error'">{{
            item.verified ? "Sudah" : "Belum"
          }}</v-chip>
        </template>
        <template v-if="!canNotEdit" #item.action="{ item }: any">
          <VMenu v-if="!item.verified">
            <template #activator="{ props }">
              <!-- <VIcon
                @click="handleDetailProduct(item.id)"
                icon="fa-ellipsis-v"
                color="primary"
                v-bind="props"
              ></VIcon> -->
              <VIcon
                icon="fa-ellipsis-v"
                color="primary"
                v-bind="props"
              ></VIcon>
            </template>

            <VList>
              <InputBahan
                :product-name="item.nama"
                :product-id="item.id"
                :bahan-selected="item.bahan_selected"
                @submit="handleAddIngredient"
                :embedded-in-module="'pelakuSelfDec'"
              />
              <!-- <VListItem> -->
              <UbahProduk
                :submission-id="submissionId"
                :id-produk="item.id"
                @confirm-edit="handleUpdateProduct"
              ></UbahProduk>
              <!-- </VListItem> -->
              <!-- <VListItem
                prepend-icon="mdi-pencil"
                title="Ubah"
                class="cursor-pointer"
                @click="handleOpenModal('EDIT', item.id)"
              /> -->
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
    :data="detailProduct != null ? detailProduct : undefined"
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
