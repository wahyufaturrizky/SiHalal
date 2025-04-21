<script setup lang="ts">
// const items = [
//   {
//     index: 1,
//     role_name: "Verificator Self Declare",
//     menu: "10 Acess Menu(s)",
//     action: "true",
//   },
//   {
//     index: 2,
//     role_name: "Komisi fatwa",
//     menu: "5 Acess Menu(s)",
//     action: "true",
//   },
//   {
//     index: 3,
//     role_name: "Auditor",
//     menu: "2 Acess Menu(s)",
//     action: "true",
//   },
//   {
//     index: 4,
//     role_name: "Verifikator BPJPH",
//     action: "true",
//   },
// ];

const tableHeader = [
  { title: "No", value: "index" },
  { title: "Role Name", value: "name" },
  { title: "Menu", value: "count_menu" },
  { title: "Action", value: "action", fixed: true },
];

// const navigateAction = (id: string) => {
//   navigateTo(`/user-management/role/${id}`);
// };

const dialogVisible = ref(false);

const handleDialogvisible = () => {
  dialogVisible.value = true;
};
const handleCloseButton = (data: any) => {
  debouncedFetch(page.value, itemPerPage.value, searchQuery.value);
  dialogVisible.value = data;
};
const handleEditButton = (data: any) => {
  debouncedFetch(page.value, itemPerPage.value, searchQuery.value);
  // dialogVisible.value = data;
};
const handleAddButton = (data: any) => {
  debouncedFetch(page.value, itemPerPage.value, searchQuery.value);
  dialogVisible.value = data;
};

const handleDelete = async (item: any) => {
  try {
    const response = await $api(
      `/user-management/role/delete-user/${item.id}`,
      {
        method: "post",
      }
    );

    if (response.code === 2000) {
      loading.value = false;
      useSnackbar().sendSnackbar("Data Berhasil di Hapus", "success");
    } else if (response.code === 500000) {
      useSnackbar().sendSnackbar(`${response.errors.list_error}`, "error");
      loading.value = false;
    } else {
      loading.value = false;
      useSnackbar().sendSnackbar("Ada Kesalahan delete ", "error");
    }

    debouncedFetch(page.value, itemPerPage.value, searchQuery.value);
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan delete", "error");
    loading.value = false;
  }
};

const items = ref([]);
const loadingAll = ref(true);

const itemPerPage = ref(10);
const totalItems = ref(0);
const loading = ref(false);
const page = ref(1);

const loadItem = async ({
  page,
  size,
  keyword,
}: {
  page: number;
  size: number;
  keyword: string;
}) => {
  try {
    loading.value = true;

    const response: any = await $api("/user-management/role/list", {
      method: "get",
      params: {
        page,
        size,
        keyword,
      },
    });

    if (response.code === 2000) {
      items.value = items.value = response.data.map((item, idx) => ({
        ...item,
        index: idx + 1,
      }));
      totalItems.value = response.total_item || 0;
      loading.value = false;
      return response;
    } else {
      loading.value = false;
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loading.value = false;
  }
};
const searchQuery = ref("");

const handleInput = () => {
  debouncedFetch({
    page: page.value,
    size: itemPerPage.value,
    keyword: searchQuery.value,
  });
};

const debouncedFetch = debounce(loadItem, 500);

onMounted(async () => {
  const res = await Promise.all([
    loadItem({
      page: page.value,
      size: itemPerPage.value,
    }),
  ]);

  const checkResIfUndefined = res.every((item: any) => {
    return item !== undefined;
  });

  if (checkResIfUndefined) {
    loadingAll.value = false;
  } else {
    loadingAll.value = false;
  }
});
</script>

<template>
  <div>
    <VRow>
      <VCol>
        <VRow>
          <VCol>
            <h1 style="font-size: 32px">Role</h1>
          </VCol>
        </VRow>
        <br />
        <VCard>
          <VCardItem>
            <VCardTitle class="d-flex justify-space-between align-center">
              <div class="text-h4 font-weight-bold">Role List</div>
              <VBtn append-icon="fa-plus" @click="handleDialogvisible">
                Add Role
              </VBtn>

              <VDialog v-model="dialogVisible" max-width="100svh">
                <VCard style="padding: 1.5svw">
                  <AddRoleForm
                    @visible="handleCloseButton"
                    :action="true"
                    @add="handleAddButton"
                  />
                </VCard>
              </VDialog>
            </VCardTitle>

            <VRow>
              <VCol cols="7">
                <VTextField
                  v-model="searchQuery"
                  placeholder="Search Data"
                  density="compact"
                  append-inner-icon="mdi-magnify"
                  @update:model-value="handleInput"
                />
              </VCol>
            </VRow>

            <VRow>
              <VCol>
                <VCard variant="outlined">
                  <VDataTableServer
                    disable-sort
                    :items-per-page-options="[10, 25, 50, 100]"
                    class="custom-table"
                    v-model:items-per-page="itemPerPage"
                    v-model:page="page"
                    :headers="tableHeader"
                    :items="items"
                    :loading="loading"
                    :items-length="totalItems"
                    loading-text="Loading..."
                    @update:options="
                      loadItem({
                        page: page,
                        size: itemPerPage,
                        keyword: searchQuery,
                      })
                    "
                  >
                    <template #no-data>
                      <VCard variant="outlined" class="w-full mt-7 mb-5">
                        <div class="pt-2" style="justify-items: center">
                          <img
                            src="~/assets/images/empty-data.png"
                            alt="empty_data"
                          />
                          <div class="pt-2 pb-2 font-weight-bold">
                            Data Kosong
                          </div>
                        </div>
                      </VCard>
                    </template>

                    <template #item.index="{ index }">
                      {{ index + 1 + (page - 1) * itemPerPage }}
                    </template>
                    <template #item.count_menu="{ item }">
                      {{ item.count_menu }} Access Menus(s)
                    </template>

                    <template #item.no="{ index }">
                      {{ index + 1 + (page - 1) * itemPerPage }}
                    </template>
                    <template #item.action="{ item }">
                      <VMenu :close-on-content-click="false">
                        <template #activator="{ props }">
                          <VBtn
                            icon="mdi-dots-vertical"
                            variant="text"
                            v-bind="props"
                            color="primary"
                          />
                        </template>
                        <VList>
                          <VListItem
                            v-bind="props"
                            class="cursor-pointer"
                            @click="handleDialogvisible"
                          >
                            <template #prepend>
                              <VIcon icon="ri-edit-line" :size="16" />
                            </template>
                            <VListItemTitle>Ubah</VListItemTitle>
                          </VListItem>
                          <VDialog v-model="dialogVisible" max-width="100svh">
                            <VCard style="padding: 1.5svw">
                              <AddRoleForm
                                @visible="handleCloseButton"
                                @edit="handleEditButton"
                                :id_role="item.id"
                                :action="false"
                              />
                            </VCard>
                          </VDialog>

                          <DeleteConfirmation
                            @delete-confirm="handleDelete(item)"
                          />
                        </VList>
                      </VMenu>
                    </template>
                  </VDataTableServer>
                </VCard>
              </VCol>
            </VRow>
          </VCardItem>
        </VCard>
      </VCol>
    </VRow>
  </div>
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
