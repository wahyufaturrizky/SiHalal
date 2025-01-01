<script setup lang="ts">
type DataImage = {
  id: string;
  image: string | null;
  status: boolean;
};
const tableHeaders: any[] = [
  { title: "No", key: "no", sortable: false, width: "30px" },
  { title: "Image", key: "image", nowrap: true },
  { title: "Status", key: "status", nowrap: true },
  {
    title: "Action",
    key: "actions",
    sortable: false,
    align: "center",
    width: "30px",
  },
];
const tableItems = ref<Array<DataImage>>([
  {
    id: "1",
    image: "SiHalalBanner_2024.jpg",
    status: false,
  },
  {
    id: "2",
    image: "SiHalalBanner_2023.jpg",
    status: true,
  },
  {
    id: "3",
    image: null,
    status: true,
  },
]);
const currentPage = ref(1);
const itemPerPage = ref(10);
const totalItems = ref(tableItems.value.length);
const isLoading = ref(false);

const searchQuery = ref("");
const handleSearchUser = useDebounceFn((val: string) => {
  searchQuery.value = val;
  currentPage.value = 1;

  // refresh();
}, 350);

const handleDownload = async (filename: string) => {
  return await downloadDocument(filename);
};

const isOpenAddModal = ref(false);
const handleOpenAddModal = () => {
  isOpenAddModal.value = !isOpenAddModal.value;
};
const handleAddImage = (payload: any) => {
  console.log(payload, "< submit payload");
  useSnackbar().sendSnackbar("Data Successfully Added", "success");
  // useSnackbar().sendSnackbar("Add Data Failed", "error");
};
const handleUpdateUser = (payload: any) => {
  console.log(payload, "< update payload");
  useSnackbar().sendSnackbar("Data Successfully Updated", "success");
  // useSnackbar().sendSnackbar("Update Data Failed", "error");
};

const selectedImage = ref("");
const detailData = ref();
// remove this function on integrating update
const handleLoadDetail = (id: string) => {
  selectedImage.value = id;
  const detail = tableItems.value.find((item) => {
    return item.id === selectedImage.value;
  });
  if (detail) detailData.value = detail;
};
const isOpenDeleteModal = ref(false);
const handleOpenDeleteModal = (id?: string | null) => {
  if (id) selectedImage.value = id;
  isOpenDeleteModal.value = !isOpenDeleteModal.value;
};

const handleConfirmDelete = () => {
  useSnackbar().sendSnackbar("Data Successfully Deleted", "success");
  // useSnackbar().sendSnackbar("Delete Data Failed", "error");
};
</script>

<template>
  <VRow>
    <VCol>
      <h1 class="mb-1 font-weight-bold">Image Authorization</h1>
    </VCol>
  </VRow>
  <VRow>
    <VCol>
      <VCard class="w-100 py-3">
        <VCardTitle
          class="d-flex justify-space-between align-center font-weight-bold text-h4"
        >
          <div>Image Authorization List</div>
          <VBtn append-icon="fa-plus" @click="handleOpenAddModal"
            >Add Image</VBtn
          >
        </VCardTitle>
        <VCardItem>
          <VRow>
            <VCol cols="6">
              <VTextField
                placeholder="Search Data"
                v-model="searchQuery"
                @update:model-value="handleSearchUser"
                clearable
                density="compact"
                class="mb-5"
                append-inner-icon="fa-search"
              />
            </VCol>
          </VRow>
          <VCard variant="outlined">
            <VDataTableServer
              class="custom-table"
              :headers="tableHeaders"
              :items="tableItems"
              :items-length="totalItems"
              v-model:items-per-page="itemPerPage"
              v-model:page="currentPage"
              :loading="isLoading"
              :hide-default-footer="tableItems.length === 0"
            >
              <template #no-data>
                <VCard variant="outlined" class="w-full mt-7 mb-5">
                  <div class="pt-2" style="justify-items: center">
                    <img
                      src="~/assets/images/empty-data.png"
                      alt="empty_data"
                    />
                    <div class="pt-2 pb-2 font-weight-bold">Data Kosong</div>
                  </div>
                </VCard>
              </template>
              <template #item.no="{ index }">
                {{ index + 1 + (currentPage - 1) * itemPerPage }}
              </template>
              <template #item.image="{ item }">
                <div v-if="item.image" class="d-flex align-center">
                  <div class="text-primary font-weight-bold">
                    {{ item.image }}
                  </div>
                  <VBtn variant="flat" class="px-3 ms-2">
                    <VIcon
                      icon="fa-download"
                      @click="handleDownload(item.image)"
                    ></VIcon>
                  </VBtn>
                </div>
                <div v-else>-</div>
              </template>
              <template #item.status="{ item }">
                <VChip
                  variant="outlined"
                  :class="item.status ? 'active-chip' : 'inactive-chip'"
                >
                  <span>
                    {{ item.status ? "Active" : "Inactive" }}
                  </span>
                </VChip>
              </template>
              <template #item.actions="{ item }">
                <VMenu>
                  <template #activator="{ props }">
                    <VIcon
                      v-bind="props"
                      icon="fa-ellipsis-v"
                      color="primary"
                      @click="handleLoadDetail(item.id)"
                    />
                  </template>
                  <VList>
                    <UpdateImageForm
                      :detail="detailData"
                      @submit:update="handleUpdateUser"
                    />
                    <VListItem
                      class="cursor-pointer"
                      @click="handleOpenDeleteModal(item.id)"
                    >
                      <template #prepend>
                        <VIcon icon="mdi-delete" color="error" />
                      </template>
                      <VListItemTitle class="text-error">Delete</VListItemTitle>
                    </VListItem>
                  </VList>
                </VMenu>
              </template>
            </VDataTableServer>
          </VCard>
        </VCardItem>
      </VCard>
    </VCol>
  </VRow>
  <AddImageForm
    :dialog-visible="isOpenAddModal"
    :close-handler="handleOpenAddModal"
    @submit:add="handleAddImage"
  />
  <ConfirmModal
    dialog-title="Delete Confirmation"
    :dialog-visible="isOpenDeleteModal"
    @update:dialog-visible="isOpenDeleteModal = $event"
  >
    <VCardText> Are you sure you want to delete this data? </VCardText>
    <VCardActions class="px-4">
      <VBtn variant="outlined" class="px-4 me-3" @click="handleOpenDeleteModal"
        >Cancel</VBtn
      >
      <VBtn
        variant="flat"
        class="px-4"
        color="error"
        @click="[handleConfirmDelete(), handleOpenDeleteModal()]"
      >
        Delete
      </VBtn>
    </VCardActions>
  </ConfirmModal>
</template>

<style scoped lang="scss">
.active-chip {
  border: 1px solid #49a84c !important;
  border-radius: 8px;
  background-color: #edf6ed;

  span {
    color: #49a84c;
  }
}
.inactive-chip {
  border: 1px solid #e1442e !important;
  border-radius: 8px;
  background-color: #fcecea;

  span {
    color: #e1442e;
  }
}
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
