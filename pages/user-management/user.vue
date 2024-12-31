<script setup lang="ts">
type DataUser = {
  id: string;
  username: string;
  nama: string;
  email: string;
  password?: string;
  phone_no: string;
  is_verify: boolean;
  role: string;
};
const tableHeaders: any[] = [
  { title: "No", key: "no", sortable: false },
  { title: "User Name", key: "username", nowrap: true },
  { title: "Name", key: "nama", nowrap: true },
  { title: "Email", key: "email", nowrap: true },
  { title: "Phone Number", key: "phone_no", nowrap: true },
  { title: "Verify", key: "is_verify", nowrap: true },
  { title: "Role", key: "role", nowrap: true },
  { title: "Action", key: "actions", sortable: false, align: "center" },
];
const tableItems = ref<Array<DataUser>>([
  {
    id: "1",
    username: "Banawadmnk",
    nama: "Banawa Damanik",
    email: "juli18@palastri.in",
    password: "123",
    phone_no: "0839 9981 7991",
    is_verify: true,
    role: "Pelaku Usaha",
  },
  {
    id: "2",
    username: "Zelda_Zulaika",
    nama: "Zelda Zulaika",
    email: "ibrani.pradana@yahoo.co.id",
    phone_no: "0839 9981 7991",
    is_verify: true,
    role: "Verifikator HLN",
  },
  {
    id: "3",
    username: "Genta_Halimah",
    nama: "Genta Halimah",
    email: "gmulyani@tamba.sch.id",
    phone_no: "0759 9443 896",
    is_verify: false,
    role: "Fasilitator",
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

const isOpenAddModal = ref(false);
const handleOpenAddModal = () => {
  isOpenAddModal.value = !isOpenAddModal.value;
};
const handleAddNewUser = (payload: any) => {
  console.log(payload, "< submit payload");
  useSnackbar().sendSnackbar("Data Successfully Added", "success");
  // useSnackbar().sendSnackbar("Add Data Failed", "error");
};
const handleUpdateUser = (payload: any) => {
  console.log(payload, "< update payload");
  useSnackbar().sendSnackbar("Data Successfully Edited", "success");
  // useSnackbar().sendSnackbar("Update Data Failed", "error");
};

const selectedUser = ref("");
const detailData = ref();
// remove this function on integrating update
const handleLoadDetail = (id: string) => {
  selectedUser.value = id;
  const detail = tableItems.value.find((item) => {
    return item.id === selectedUser.value;
  });
  if (detail) detailData.value = detail;
};
const isOpenDeleteModal = ref(false);
const handleOpenDeleteModal = (id?: string | null) => {
  if (id) selectedUser.value = id;
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
      <h1 class="mb-1 font-weight-bold">User</h1>
    </VCol>
  </VRow>
  <VRow>
    <VCol>
      <VCard class="w-100 py-3">
        <VCardTitle
          class="d-flex justify-space-between align-center font-weight-bold text-h4"
        >
          <div>User List</div>
          <VBtn append-icon="fa-plus" @click="handleOpenAddModal"
            >Add User</VBtn
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
              <template #item.is_verify="{ item }">
                {{ item.is_verify ? "Yes" : "No" }}
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
                    <UpdateUserForm
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
  <AddUserForm
    :dialog-visible="isOpenAddModal"
    :close-handler="handleOpenAddModal"
    @submit:add="handleAddNewUser"
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
