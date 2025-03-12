<script setup lang="ts">
const props = defineProps({
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
const certHalalData = ref();
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
      handleDetailProduct(submissionId);
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
      handleDetailProduct(submissionId);
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
      handleDetailProduct(submissionId);
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
const totalProduct = ref(0);
const statusSelf = ref<string>("");
const handleDetailProduct = async (id: string) => {
  // selectedProduct.value = id;
  try {
    const response: any = await $api(`/self-declare/submission/${id}/detail`, {
      method: "get",
    } as any);

    if (response.code === 2000) {
      console.log(response.data.produk.length, "ini data");

      const tracking = response.data.tracking ?? [];
      const lastIndex = tracking.length - 1;
      totalProduct.value = response.data.produk.length;
      // console.log("result", tracking[lastIndex]?.status);

      statusSelf.value = tracking[lastIndex]?.status || "";
      // console.log(statusSelf.value, "ini status self");
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
      handleDetailProduct(submissionId);
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
const setCertificateHalalData = () => {
  certHalalData.value = store.getCertificateHalal();
};

const disableTambahProduk = () => {
  if (!certHalalData.value?.id_jenis_produk) {
    return false;
  } else {
    if (!props.canNotEdit) {
      return true;
    }
  }

  return true;
};

onMounted(() => {
  setCertificateHalalData();
  handleDetailProduct(submissionId);
});

watch(
  () => store.certificateHalal,
  (newData) => {
    if (newData) {
      setCertificateHalalData();
    }
  },
  { immediate: true, deep: true }
);

const itemsPerPage = ref(10);
const currentPage = ref(1);
// Hitung total halaman
const totalPages = computed(() =>
  Math.ceil(produk.value.length / itemsPerPage.value)
);

// Filter data berdasarkan halaman aktif
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return produk.value.slice(start, start + itemsPerPage.value);
});

// Ganti halaman
const changePage = (page: number) => {
  currentPage.value = page;
};
</script>

<template>
  <VCard style="padding: 1svw;">
    <VCardTitle>
      <VRow>
        <VCol cols="6"><h3>Daftar Produk</h3></VCol>
        <VCol cols="6" style="display: flex; justify-content: end;">
          <VBtn
            v-if="disableTambahProduk()"
            @click="handleOpenModal('CREATE')"
            variant="outlined"
            append-icon="fa-plus"
            style="margin-inline-end: 1svw;"
            :disabled="totalProduct===10"
            >Tambah</VBtn
          >
          <!-- <VBtn variant="flat">Simpan Perubahan</VBtn> -->
        </VCol>
      </VRow>
      <div class="bgContent">
        <div class="d-flex flex-wrap mt-5">
          <VIcon icon="ri-error-warning-line" color="#652672" />
          <label class="subText"
            >Mapping Produk dan Bahan yang digunakan harus lakukan sebelum
            mengisi bagian Proses Produk Halal</label
          >
        </div>
      </div>
      <br />
      <div>
        <v-alert
          v-if="!disableTambahProduk()"
          text="Harap isi jenis produk di tab 'Pengajuan'"
          type="error"
          variant="tonal"
          class="mt-5"
        ></v-alert>

        <v-alert
          v-if="totalProduct === 10"
          text="Maksimal Produk 10"
          type="error"
          variant="tonal"
          class="mt-5"
        ></v-alert>
      </div>
    </VCardTitle>

    <VCardItem>
      <VDataTable
        :headers="tableHeader"
        :items="produk"
        class="custom-table"
        hide-default-footer
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
        <template #item.verified="{ item }">
          <v-chip :color="item.verified ? 'success' : 'error'">{{
            item.verified ? "Sudah" : "Belum"
          }}</v-chip>
        </template>
        <template v-if="!canNotEdit" #item.action="{ item }: any">
          <VMenu
            v-if="
              !item.verified ||
              statusSelf === 'OF1' ||
              statusSelf === 'OF280' ||
              statusSelf === 'OF285'
            "
          >
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

      <VPagination
        v-model="currentPage"
        :length="totalPages"
        total-visible="5"
        :style="{ marginTop: '20px' }"
        @update:modelValue="changePage"
      />
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
      position: sticky;
      border-inline-start: 1px solid rgba(#000, 0.12);
      inset-inline-end: 0;
    }

    tbody > tr > td:last-of-type {
      position: sticky;
      background: white;
      border-inline-start: 1px solid rgba(#000, 0.12);
      inset-inline-end: 0;
    }
  }
}

.bgContent {
  border-radius: 10px;
  background-color: #f0e9f1;
  padding-inline-start: 10px;
}

.bgContent-error {
  border-radius: 10px;
  background-color: #da5739;
  padding-inline-start: 10px;
}

.subText {
  align-content: center;
  color: #652672 !important;
  font-size: 12px !important;
  font-weight: 500 !important;
  line-height: 18px !important;
  padding-inline-start: 10px;
}
</style>
