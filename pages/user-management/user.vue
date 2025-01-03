<script setup lang="ts">
type DataUser = {
  id: string;
  username: string;
  nama: string;
  email: string;
  password?: string;
  phone_no: string;
  is_verify: boolean;
  roles: Array<{ name: string }>;
};
const tableHeaders: any[] = [
  { title: "No", key: "no", sortable: false },
  { title: "User Name", key: "username", nowrap: true },
  { title: "Name", key: "name", nowrap: true },
  { title: "Email", key: "email", nowrap: true },
  { title: "Phone Number", key: "phone_no", nowrap: true },
  { title: "Verify", key: "is_verify", nowrap: true },
  { title: "Role", key: "roles", nowrap: true },
  { title: "Action", key: "actions", sortable: false, align: "center" },
];
const tableItems = ref<Array<DataUser>>([]);
const currentPage = ref(1);
const itemPerPage = ref(10);
const totalItems = ref(0);
const isLoading = ref(false);

const searchQuery = ref("");
const handleLoadList = async () => {
  try {
    const response: any = await $api("/admin/users/list", {
      method: "get",
      params: {
        page: currentPage.value,
        size: itemPerPage.value,
        search: searchQuery.value,
      },
    } as any);

    if (response.code === 2000) {
      if (response.data !== null) {
        tableItems.value = response.data;
        currentPage.value = response.current_page;
        totalItems.value = response.total_item;
      } else {
        tableItems.value = [];
        currentPage.value = 1;
        totalItems.value = 0;
      }
      return response;
    }
  } catch (error) {
    console.error(error);
  }
};

const { refresh } = await useAsyncData(
  "user-list",
  async () => await handleLoadList(),
  {
    watch: [currentPage, itemPerPage],
  }
);
onMounted(() => {
  handleLoadList();
});

const handleSearchUser = useDebounceFn((val: string) => {
  searchQuery.value = val;
  currentPage.value = 1;

  refresh();
}, 350);

const isOpenAddModal = ref(false);
const handleOpenAddModal = () => {
  isOpenAddModal.value = !isOpenAddModal.value;
};
const handleAddNewUser = async (payload: any) => {
  try {
    const response: any = await $api("/admin/users/create", {
      method: "post",
      body: payload,
    } as any);

    if (response.code === 2000) {
      useSnackbar().sendSnackbar("Data Successfully Added", "success");
      refresh();
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Add Data Failed", "error");
    console.error(error);
  }
};
const handleUpdateUser = async (payload: any) => {
  try {
    const response: any = await $api("/admin/users/update", {
      method: "put",
      query: {
        user_id: selectedUser.value,
      },
      body: payload,
    } as any);

    if (response.code === 2000) {
      useSnackbar().sendSnackbar("Data Successfully Edited", "success");
      refresh();
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Update Data Failed", "error");
    console.error(error);
  }
};

const selectedUser = ref("");
const isOpenDeleteModal = ref(false);
const handleOpenDeleteModal = (id?: string | null) => {
  if (id) selectedUser.value = id;
  isOpenDeleteModal.value = !isOpenDeleteModal.value;
};

const handleConfirmDelete = async () => {
  try {
    const response: any = await $api("/admin/users/remove", {
      method: "delete",
      query: {
        user_id: selectedUser.value,
      },
    } as any);

    if (response.code === 2000) {
      useSnackbar().sendSnackbar("Data Successfully Deleted", "success");
      refresh();
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Delete Data Failed", "error");
    console.error(error);
  }
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
              <template #item.phone_no="{ item }">
                {{ item.phone_no ? item.phone_no : "-" }}
              </template>
              <template #item.is_verify="{ item }">
                {{ item.is_verify ? "Yes" : "No" }}
              </template>
              <template #item.roles="{ item }">
                <div v-if="item.roles.length">
                  <div v-for="(el, idx) in item.roles" class="d-inline-block">
                    <div>
                      <span v-if="idx != 0" class="mx-2">|</span>{{ el.name }}
                    </div>
                  </div>
                </div>
                <div v-else>-</div>
              </template>
              <template #item.actions="{ item }">
                <VMenu>
                  <template #activator="{ props }">
                    <VIcon
                      v-bind="props"
                      icon="fa-ellipsis-v"
                      color="primary"
                      @click="selectedUser = item.id"
                    />
                  </template>
                  <VList>
                    <UpdateUserForm
                      :user-id="selectedUser"
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
