<script setup lang="ts">
const route = useRoute();

const selectedIsVefified = ref([]);
const loadingAll = ref(true);

const productHeader: any[] = [
  { title: "No", value: "index" },
  { title: "Nama Produk", value: "nama", nowrap: true },
  { title: "Merek", value: "merek", nowrap: true },
  { title: "Foto", value: "foto", nowrap: true },
  { title: "Jumlah Bahan Digunakan", value: "jumlah_bahan" },
  { title: "Input Bahan", value: "ingredientInput" },
  { title: "Verif oleh Pendamping", value: "verified" },
  { title: "Action", value: "actions", align: "center" },
];
const props = defineProps({
  idDetail: {
    required: true,
    type: String,
  },
});

const productData = ref([]);

const verifiedProduct = computed(() => {
  let count = 0;
  productData.value.forEach((item) => {
    if (item.vefified) count++;
  });
  return count;
});

const isFormModalOpen = ref(false);
const isDeleteModalOpen = ref(false);

const modalUse = ref("CREATE");

const modalTitle = computed(() => {
  return modalUse.value === "CREATE"
    ? `Tambah Pemetaan Produk dan Pabrik`
    : `Ubah Pemetaan Produk dan Pabrik`;
});

const handleSaveVerified = async () => {
  const submitedData = {};
  let countKey = 0;
  if (selectedIsVefified.value.length > 0) {
    selectedIsVefified.value.forEach((item, index) => {
      const keyTmp = productData.value[index]?.id;
      console.log("key tmp = ", keyTmp);
      if (keyTmp) {
        submitedData[keyTmp] = item;
        countKey += 1;
      }
    });
  }

  if (countKey > 0) {
    console.log(submitedData);
    try {
      const response: any = await $api(
        `/self-declare/submission/product/${route.params?.id}/pendamping-verify`,
        {
          method: "post",
          body: JSON.stringify(submitedData),
        }
      );

      if (response.code === 2000) {
        useSnackbar().sendSnackbar(
          "Berhasil menyimpan verifikasi data",
          "success"
        );
        handleListProduct();
      }
      return response;
    } catch (error) {
      console.error(error);
      useSnackbar().sendSnackbar("Gagal menyimpan verifikasi data", "error");
      return null;
    }
  } else {
    useSnackbar().sendSnackbar("Gagal menyimpan verifikasi data", "error");
  }
};

const handleDeleteProduct = async () => {
  try {
    const response: any = await $api(
      `/self-declare/business-actor/product/remove`,
      {
        method: "delete",
        query: {
          id_reg: route.params?.id,
          product_id: selectedProduct.value,
        },
      }
    );

    if (response.code === 2000) {
      useSnackbar().sendSnackbar("Berhasil menghapus data", "success");
      handleListProduct();
      refresh();
    }
    return response;
  } catch (error) {
    useSnackbar().sendSnackbar("Gagal menghapus data", "error");
    console.log(error);
  }
};

const { refresh } = await useAsyncData("list-product", async () => {
  return handleListProduct();
});
const totalProduct = ref(0);
const handleListProduct = async () => {
  try {
    const response: any = await $api(
      `/self-declare/business-actor/product/list`,
      {
        method: "get",
        query: {
          id_reg: (route.params as any)?.id,
        },
      }
    );

    if (response.code === 2000) {
      productData.value = response.data || [];
      totalProduct.value = response.data.length;

      response.data.forEach((val: any) => {
        selectedIsVefified.value.push(val.verified);
      });

      return response;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const selectedProduct = ref("");

const handleOpenModal = async (type: string, id?: string) => {
  modalUse.value = type;
  if (id) selectedProduct.value = id;

  if (type === "DELETE") {
    isDeleteModalOpen.value = true;
  } else {
    if (type === "EDIT") {
      console.log("data on edit = ", productData.value);
    }
    isFormModalOpen.value = true;
  }
};
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
          id_reg: (route.params as any)?.id,
        },
      }
    );

    if (response.code === 2000) {
      useSnackbar().sendSnackbar("Berhasil menambahkan data", "success");
      handleListProduct();
      refresh();
    }
    return response;
  } catch (error) {
    useSnackbar().sendSnackbar("Gagal menambahkan data", "error");
    refresh();
    console.log(error);
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
          id_reg: route.params?.id,
          product_id: idProduct,
        },
      }
    );

    if (response.code === 2000) {
      useSnackbar().sendSnackbar("Berhasil menambahkan data", "success");
      handleListProduct();
      refresh();
    }
    return response;
  } catch (error) {
    useSnackbar().sendSnackbar("Gagal menambahkan data", "error");
    console.log(error);
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
          id_reg: (route.params as any)?.id,
          product_id: productId,
        },
      }
    );

    if (response.code === 2000) {
      useSnackbar().sendSnackbar("Berhasil mengubah data", "success");
      handleListProduct();
      refresh();
    }
    return response;
  } catch (error) {
    useSnackbar().sendSnackbar("Gagal mengubah data", "error");
    console.log(error);
  }
};

const addVefified = (event: any) => {
  console.log("event = ", selectedIsVefified.value);
};

const handleDownload = async (filename: string) => {
  if (filename) {
    return await downloadDocument(filename, "PRODUCT");
  }
};

const statusPengajuan = ref<string>("");
const handleDetail = async () => {
  try {
    const response: any = await $api(
      `/self-declare/submission/${props.idDetail}/detail`,
      {
        method: "get",
      }
    );

    if (response.code === 2000) {
      console.log(response.data, "ini data");

      const tracking = response.data.tracking ?? [];
      const lastIndex = tracking.length - 1;

      console.log("result", tracking[lastIndex]?.status);

      statusPengajuan.value = tracking[lastIndex]?.status || "";
      console.log(statusPengajuan.value, "ini status pengajuan product");
    }
    return response;
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  const res: any = await Promise.all([handleListProduct(), handleDetail()]);

  const checkResIfUndefined = res.every((item: any) => {
    return item !== undefined;
  });

  if (checkResIfUndefined) {
    loadingAll.value = false;
  } else {
    loadingAll.value = false;
  }
});

const itemsPerPage = ref(10);
const currentPage = ref(1);

const totalPages = computed(() =>
  Math.ceil(totalProduct.value / itemsPerPage.value)
);

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return totalProduct.value.slice(start, start + itemsPerPage.value);
});

const changePage = (page: number) => {
  currentPage.value = page;
};
</script>

<template>
  <VCard v-if="!loadingAll">
    <VCardTitle class="my-3 d-flex justify-space-between align-center">
      <div class="font-weight-bold text-h4">Daftar Nama Produk</div>
      <v-alert
        v-if="totalProduct === 10"
        text="Maksimal Produk 10"
        type="error"
        variant="tonal"
        class="mt-5"
      ></v-alert>
      <div>
        <VBtn
          @click="handleOpenModal('CREATE')"
          variant="outlined"
          append-icon="fa-plus"
          :disabled="totalProduct === 10"
          style="margin-inline-end: 1svw"
          >Tambah</VBtn
        >
        <VBtn variant="flat" @click="handleSaveVerified">
          <div class="pe-3">
            {{ verifiedProduct ? `Simpan Verif` : "Simpan Verif" }}
          </div>
          <VIcon icon="fa-upload" />
        </VBtn>
      </div>
    </VCardTitle>
    <VCardText>
      <VDataTable
        disable-sort
        class="product-table"
        :headers="productHeader"
        :items="productData"
        hide-default-footer
      >
        <template #item.index="{ index }">
          {{ index + 1 }}
        </template>
        <template #item.foto="{ item }">
          <div class="d-flex">
            <VBtn variant="text" @click="handleDownload(item.foto)">
              <template #default>
                <VIcon icon="mdi-file-download" size="large" color="primary" />
              </template>
            </VBtn>
            <!-- <div class="text-primary ms-3">file</div> -->
          </div>
        </template>
        <template #item.ingredientInput="{ item }">
          <InputBahan
            :embedded-in-module="'pendampingSelfDec'"
            :product-name="(item as any).nama"
            :product-id="(item as any).id"
            :bahan-selected="(item as any).bahan_selected ? (item as any).bahan_selected : []"
            @submit="handleAddIngredient"
          />
        </template>
        <template #item.verified="{ item, index }">
          <!-- <VCheckboxBtn v-model="item.isVerified" /> -->
          <VCheckboxBtn
            @change="addVefified($event)"
            :key="(item as any).id"
            v-model="selectedIsVefified[index]"
          ></VCheckboxBtn>
        </template>
        <template #item.actions="{ item }">
          <VMenu
            v-if="
              statusPengajuan === 'OF1' ||
              statusPengajuan === 'OF280' ||
              statusPengajuan === 'OF285'
            "
          >
            <template #activator="{ props }">
              <VIcon
                icon="fa-ellipsis-v"
                color="primary"
                class="cursor-pointer"
                v-bind="props"
              />
            </template>
            <VList>
              <!-- <VListItem
                prepend-icon="mdi-pencil"
                title="Ubah"
                class="cursor-pointer"
                @click="handleOpenFormModal('EDIT')"
              /> -->
              <UbahProduk
                :submission-id="(route.params as any)?.id"
                :id-produk="(item as any).id"
                @confirm-edit="handleUpdateProduct"
              ></UbahProduk>
              <VListItem @click="handleOpenModal('DELETE', (item as any).id)">
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
        @update:modelValue="changePage"
      />
    </VCardText>
  </VCard>

  <TambahProduk
    :dialog-title="modalTitle"
    :dialog-visible="isFormModalOpen"
    :dialog-use="modalUse"
    @update:dialog-visible="isFormModalOpen = $event"
    @submit:commit-action="handleSubmit"
    :data="productData != null ? productData : undefined"
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
:deep(.v-data-table.product-table > .v-table__wrapper) {
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
</style>
