<script setup lang="ts">
interface DataUser {
  id: string;
  username: string;
  nama: string;
  email: string;
  password?: string;
  phone_no: string;
  is_verify: boolean;
  roles: Array<{ name: string }>;
}

const tableHeaders: any[] = [
  { title: "No", key: "no", sortable: false },
  { title: "No. Registrasi", key: "no_surat", nowrap: true },
  { title: "NIK", key: "nik", nowrap: true },
  { title: "Nama Pendamping", key: "nama", nowrap: true },
  { title: "Tempat, Tanggal Lahir", key: "ttl", nowrap: true },
  { title: "LP3H Asal", key: "asal_lembaga", nowrap: true },
  { title: "LP3H Tujuan", key: "tujuan_lembaga", nowrap: true },
  { title: "Status", key: "status", nowrap: true },
  { title: "Action", key: "actions", sortable: false, align: "center" },
];

const tableItems = ref<Array<DataUser>>([]);
const currentPage = ref(1);
const itemPerPage = ref(10);
const totalItems = ref(0);
const isLoading = ref(false);
const selectedItem = ref([]);

const searchQuery = ref("");

const handleLoadList = async () => {
  try {
    const response: any = await $api("/approval/pindah-lembaga/list", {
      method: "get",
      params: {
        page: currentPage.value,
        size: itemPerPage.value,
        keyword: searchQuery.value,
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

const getChipColor = (status: string) => {
  if (status === "Pengajuan") return "success";

  return "primary";
};

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

const navigateToDetail = (item: any) => {
  navigateTo({
    path: `/approval/lembaga-p3h/${item.id}`,
    query: { pendamping: item?.id_pendamping, lembaga: item.tujuan_id_lembaga },
  });
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
      <h2 style="font-size: 32px">Persetujuan Pindah Lembaga P3H</h2>
    </VCol>
  </VRow>
  <VRow>
    <VCol>
      <VCard class="w-100 py-3">
        <VCardTitle
          class="d-flex justify-space-between align-center font-weight-bold text-h4"
        >
          <div>List Persetujuan Pindah Lembaga P3H</div>
        </VCardTitle>
        <VCardItem>
          <VRow>
            <VCol cols="6">
              <VTextField
                v-model="searchQuery"
                placeholder="Cari"
                clearable
                density="compact"
                class="mb-5"
                append-inner-icon="fa-search"
                @update:model-value="handleSearchUser"
              />
            </VCol>
          </VRow>
          <VCard variant="outlined">
            <VDataTableServer
              disable-sort
              :items-per-page-options="[10, 25, 50, 100]"
              v-model:items-per-page="itemPerPage"
              v-model:page="currentPage"
              v-model="selectedItem"
              class="custom-table"
              :headers="tableHeaders"
              :items="tableItems"
              :items-length="totalItems"
              :loading="isLoading"
              :hide-default-footer="tableItems.length === 0"
            >
              <template #no-data>
                <VCard variant="" class="w-full mt-7 mb-5">
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
              <template #item.ttl="{ item }">
                {{ item.tempat_lahir }}, {{ formatDateId(item.tgl_lahir) }}
              </template>
              <template #item.status="{ item }">
                <div class="d-flex flex-wrap">
                  <VChip
                    :key="item.id"
                    :color="getChipColor(item.status)"
                    label
                    class="ma-1"
                  >
                    Pengajuan
                  </VChip>
                </div>
              </template>
              <template #item.actions="{ item }">
                <Vbtn
                  variant="plain"
                  class="cursor-pointer"
                  @click="() => navigateToDetail(item)"
                >
                  <VRow>
                    <VCol sm="3">
                      <VIcon end icon="ri-arrow-right-line" color="primary" />
                    </VCol>
                  </VRow>
                </Vbtn>
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
      <VBtn variant="outlined" class="px-4 me-3" @click="handleOpenDeleteModal">
        Cancel
      </VBtn>
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
