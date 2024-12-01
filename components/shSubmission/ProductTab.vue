<script setup lang="ts">
const productHeader: any[] = [
  { title: "No", value: "index" },
  { title: "Nama Produk", value: "name", nowrap: true },
  { title: "Merek", value: "brand", nowrap: true },
  { title: "Foto", value: "image", nowrap: true },
  { title: "Jumlah Bahan Digunakan", value: "ingredientCount" },
  { title: "Input Bahan", value: "ingredientInput" },
  { title: "Verif oleh Pendamping", value: "isVerified" },
  { title: "Action", value: "actions", align: "center" },
];
const productData = ref([
  {
    name: "Kopi Luwak Ciater",
    brand: "Biji Kopi",
    image: "",
    ingredientCount: "20",
    ingredientInput: "",
    isVerified: false,
  },
]);

const verifiedProduct = computed(() => {
  let count = 0;
  productData.value.forEach((item) => {
    if (item.isVerified) count++;
  });
  return count;
});

const isFormModalOpen = ref(false);
const isDeleteModalOpen = ref(false);

const selectedDelete = ref();
const modalUse = ref("CREATE");

const modalTitle = computed(() => {
  return modalUse.value === "CREATE"
    ? `Tambah Pemetaan Produk dan Pabrik`
    : `Ubah Pemetaan Produk dan Pabrik`;
});

const handleSaveVerified = () => {
  useSnackbar().sendSnackbar("Berhasil menyimpan verifikasi data", "success");
};

const handleOpenFormModal = (type: string) => {
  modalUse.value = type;
  isFormModalOpen.value = true;
};
const handleOpenDeleteModal = (index: number) => {
  selectedDelete.value = index;
  isDeleteModalOpen.value = !isDeleteModalOpen.value;
};
const handleCloseFormModal = (type: string) => {
  const snackbarMsg = type === "CREATE" ? "menambahkan" : "merubah";
  useSnackbar().sendSnackbar(`Berhasil ${snackbarMsg} data`, "success");
};
const handleDeleteProduct = () => {
  const exist = productData.value.findIndex(
    (_, idx) => idx === selectedDelete.value
  );
  productData.value.splice(exist, 1);
  useSnackbar().sendSnackbar("Berhasil menghapus data", "success");
};

const uploadedFile = ref({
  name: null,
  file: null,
});
const handleRemoveFile = () => {
  uploadedFile.value.name = null;
  uploadedFile.value.file = null;
};
const handleUploadFile = (event: any) => {
  if (event?.target?.files.length) {
    const fileData = event.target.files[0];
    if (fileData) {
      uploadedFile.value.name = fileData.name;
      uploadedFile.value.file = fileData;
    }
  }
};
</script>

<template>
  <VCard>
    <VCardTitle class="my-3 d-flex justify-space-between align-center">
      <div class="font-weight-bold text-h4">Daftar Nama Produk</div>
      <div>
        <VBtn
          variant="outlined"
          class="me-3"
          @click="handleOpenFormModal('CREATE')"
        >
          <div class="pe-3">Tambah</div>
          <VIcon icon="fa-plus" />
        </VBtn>
        <VBtn
          variant="flat"
          :color="verifiedProduct ? 'primary' : `#A09BA1`"
          :disabled="verifiedProduct == 0"
          @click="handleSaveVerified"
        >
          <div class="pe-3">
            {{
              verifiedProduct
                ? `Simpan Verif (${verifiedProduct})`
                : "Simpan Verif"
            }}
          </div>
          <VIcon icon="fa-upload" />
        </VBtn>
      </div>
    </VCardTitle>
    <VCardText>
      <VDataTable
        class="product-table"
        :headers="productHeader"
        :items="productData"
        hide-default-footer
      >
        <template #item.index="{ index }">
          {{ index + 1 }}
        </template>
        <template #item.image>
          <div class="d-flex">
            <VIcon icon="mdi-file-download" size="small" color="primary" />
            <div class="text-primary ms-3">file</div>
          </div>
        </template>
        <template #item.ingredientInput>
          <VBtn variant="outlined" size="small" rounded="lg"> Lihat </VBtn>
        </template>
        <template #item.isVerified="{ item }">
          <VCheckboxBtn v-model="item.isVerified" />
        </template>
        <template #item.actions="{ index }">
          <VMenu>
            <template #activator="{ props }">
              <VIcon
                icon="fa-ellipsis-v"
                color="primary"
                class="cursor-pointer"
                v-bind="props"
              />
            </template>
            <VList>
              <VListItem
                prepend-icon="mdi-pencil"
                title="Ubah"
                class="cursor-pointer"
                @click="handleOpenFormModal('EDIT')"
              />
              <VListItem @click="handleOpenDeleteModal(index)">
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
    </VCardText>
  </VCard>
  <ShSubmissionDetailFormModal
    :dialog-title="modalTitle"
    :dialog-visible="isFormModalOpen"
    :dialog-use="modalUse"
    @update:dialog-visible="isFormModalOpen = $event"
    @submit:commit-action="handleCloseFormModal(modalUse)"
  >
    <VCardText>
      <VItemGroup>
        <div class="font-weight-bold mb-1">Klasifikasi Produk</div>
        <VSelect
          placeholder="Pilih Klasifikasi Produk"
          density="compact"
          rounded="xl"
          menu-icon="fa-chevron-down"
        />
        <br />
      </VItemGroup>
      <VItemGroup>
        <div class="font-weight-bold mb-1">Rincian Produk</div>
        <VSelect
          placeholder="Pilih Rincian Produk"
          density="compact"
          rounded="xl"
          menu-icon="fa-chevron-down"
        />
        <br />
      </VItemGroup>
      <VItemGroup>
        <div class="font-weight-bold mb-1">Nama Produk</div>
        <VTextField
          placeholder="Masukkan Nama Produk"
          density="compact"
          rounded="xl"
        />
        <br />
      </VItemGroup>
      <VItemGroup>
        <div class="font-weight-bold mb-1">Merek Produk</div>
        <VTextField
          placeholder="Masukkan Merek Produk"
          density="compact"
          rounded="xl"
        />
        <br />
      </VItemGroup>
      <VItemGroup>
        <VRow align="center">
          <VCol cols="6" class="font-weight-bold mb-1">
            Unggah Foto Produk
          </VCol>
          <VCol cols="6">
            <VTextField
              v-if="uploadedFile.file"
              :model-value="uploadedFile.name"
              density="compact"
              placeholder="No file choosen"
              rounded="xl"
              max-width="400"
            >
              <template #append-inner>
                <VIcon
                  icon="fa-trash"
                  color="error"
                  class="cursor-pointer"
                  @click="handleRemoveFile"
                />
              </template>
            </VTextField>
            <VFileInput
              v-else
              :model-value="uploadedFile.file"
              class="custom-file-input"
              density="compact"
              rounded="xl"
              label="No file choosen"
              max-width="400"
              prepend-icon=""
              @change="handleUploadFile"
            >
              <template #append-inner>
                <VBtn rounded="s-0 e-xl" text="Choose" />
              </template>
            </VFileInput>
          </VCol>
        </VRow>
        <br />
      </VItemGroup>
    </VCardText>
  </ShSubmissionDetailFormModal>
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
