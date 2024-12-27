<script setup lang="ts">
import { useDisplay } from "vuetify";

const route = useRoute();

const itemsAdd = ref<
  {
    alamat: string;
    id_pabrik: string;
    nama: string;
  }[]
>([]);

const tableHeaderAdd = [
  { title: "Select", key: "action" },
  { title: "Nama", key: "nama" },
  { title: "Alamat", key: "alamat" },
];

const itemsOutlet = ref<
  {
    alamat: string;
    id_pabrik: string;
    nama: string;
  }[]
>([]);

const itemsPabrik = ref<
  {
    alamat: string;
    id_pabrik: string;
    nama: string;
  }[]
>([]);

const factoryData = ref([
  {
    name: "My Drink Oke",
    address: "Sumbawa Banget, RT002/RW002, Sumbang, Jawa Barat",
    status: "Milik Sendiri",
  },
]);

const outletHeader: any[] = [
  { title: "No", value: "index" },
  { title: "Nama", value: "name" },
  { title: "Alamat", value: "address" },
  { title: "Action", value: "actions", align: "center" },
];
const outletData = ref([
  {
    name: "My Drink Oke",
    address: "Sumbawa Banget, RT002/RW002, Sumbang, Jawa Barat",
    status: "Milik Sendiri",
  },
]);

const isFormModalOpen = ref(false);
const isDeleteModalOpen = ref(false);

const modalUse = ref("CREATE");
const modalType = ref("Pabrik");
const modalTitle = computed(() => {
  return modalUse.value === "CREATE"
    ? `Tambah Data ${modalType.value}`
    : `Ubah Data ${modalType.value}`;
});

const handleOpenFormModal = (type: string) => {
  modalType.value = type;
  isFormModalOpen.value = true;
};
const handleCloseFormModal = (type: string) => {
  const snackbarMsg = type === "CREATE" ? "menambahkan" : "merubah";
  useSnackbar().sendSnackbar(`Berhasil ${snackbarMsg} data`, "success");
};

const deleteType = ref("");
const selectedDelete = ref();

const handleOpenDeleteModal = (type: string, index: number) => {
  deleteType.value = type;
  selectedDelete.value = index;
  isDeleteModalOpen.value = !isDeleteModalOpen.value;
};
const handleDeleteFactory = () => {
  const exist = factoryData.value.findIndex(
    (_, idx) => idx === selectedDelete.value
  );
  factoryData.value.splice(exist, 1);
  useSnackbar().sendSnackbar("Berhasil menghapus data", "success");
};
const handleDeleteOutlet = () => {
  const exist = outletData.value.findIndex(
    (_, idx) => idx === selectedDelete.value
  );
  outletData.value.splice(exist, 1);
  useSnackbar().sendSnackbar("Berhasil menghapus data", "success");
};

const tableHeader = [
  { title: "No", key: "index" },
  { title: "Nama", key: "nama" },
  { title: "Alamat", key: "alamat" },
  { title: "Action", key: "action" },
];

const addDialog = ref(false);
const loading = ref(false);
const typeAdd = ref<"FAPAB" | "FAOUT">("FAPAB");
const selectedOption = ref(null);
const page = ref(1);
const itemPerPage = ref(10);
const totalItems = ref(0);
const deletedId = ref();

const loadItemAdd = async (
  page: number,
  size: number,
  type: string = "FAPAB"
) => {
  loading.value = true;
  try {
    const options: any = {
      method: "get",
      params: {
        fas_id: type,
        page: page,
        size: size,
      },
    };
    const response: any = await $api(
      `/self-declare/submission/pabrik/${(route.params as any).id}/search`,
      options
    );
    itemsAdd.value = response.data;
    totalItems.value = response.total_item;
    loading.value = false;
  } catch (error) {
    loading.value = false;
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const deletedPabrikOutlet = async () => {
  try {
    deleteButton.value = true;
    const response: any = await $api("/self-declare/submission/pabrik/delete", {
      method: "post",
      body: {
        id: deletedId.value,
      },
    });
    if (response.code != 2000) {
      useSnackbar().sendSnackbar("Gagal Menghapus pabrik/outlet", "error");
      return;
    }
    deleteDialog.value = false;
    useSnackbar().sendSnackbar("Berhasil Menghapus pabrik/outlet", "success");
  } catch (error) {
    deleteDialog.value = false;
    useSnackbar().sendSnackbar("Gagal Menghapus pabrik/outlet", "error");
  } finally {
    deleteButton.value = false;
    await loadPabrik(typeAdd.value);
  }
};

const submitAddButton = ref(false);

const loadPabrik = async (type: string = "FAPAB") => {
  try {
    const options: any = {
      method: "get",
      params: {
        fas_id: type,
      },
    };
    const response: any = await $api(
      `/self-declare/submission/pabrik/${(route.params as any).id}/list`,
      options
    );
    console.log("@response", response);

    if (type == "FAPAB") {
      itemsPabrik.value = response.data;
      return;
    }
    itemsOutlet.value = response.data;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const closeDelete = () => {
  deletedId.value = null;
  deleteDialog.value = false;
  deleteButton.value = false;
};

const { mdAndUp } = useDisplay();

const dialogMaxWidth = computed(() => {
  return mdAndUp.value ? 750 : "90%";
});

const insertData = async () => {
  submitAddButton.value = true;

  if (selectedOption.value == false) {
    useSnackbar().sendSnackbar("Harus Pilih 1 Outlet/Pabrik", "error");
    addDialog.value = false;
    return;
  }

  try {
    const response: any = await $api("/self-declare/submission/pabrik/add", {
      method: "post",
      body: {
        id_reg: route.params.id,
        id_pabrik: selectedOption.value,
      },
    });
    if (response.code == 500) {
      useSnackbar().sendSnackbar("Gagal menambahkan pabrik/outlet", "error");
      return;
    }
    await loadPabrik(typeAdd.value);
  } catch (error) {
    useSnackbar().sendSnackbar("Gagal menambahkan pabrik/outlet", "error");
  } finally {
    addDialog.value = false;
    submitAddButton.value = false;
    selectedOption.value = null;
  }
};

const openModal = async (type: "FAPAB" | "FAOUT") => {
  selectedOption.value = null;
  typeAdd.value = type;
  page.value = 1;
  itemPerPage.value = 10;
  await loadItemAdd(1, 10, type);
  addDialog.value = true;
};

const deleteDialog = ref(false);
const deleteButton = ref(false);

const deleteItem = async (
  item: {
    alamat: string;
    id_pabrik: string;
    nama: string;
  },
  type: "FAPAB" | "FAOUT"
) => {
  console.log(item);
  typeAdd.value = type;
  deletedId.value = item.id_pabrik;
  console.log(deletedId.value);
  deleteDialog.value = true;
};

onMounted(async () => {
  await Promise.all([loadPabrik("FAPAB"), loadPabrik("FAOUT")]);
});
</script>

<template>
  <VCard class="mb-10">
    <VCardTitle class="my-3 d-flex justify-space-between align-center">
      <VRow>
        <VCol cols="6"><h4>Pabrik</h4></VCol>
        <VCol cols="6" style="display: flex; justify-content: end"
          ><VBtn
            density="compact"
            variant="outlined"
            @click="openModal('FAPAB')"
            disabled
            >Tambah</VBtn
          ></VCol
        >
      </VRow>
    </VCardTitle>
    <VCardText>
      <VDataTable :items="itemsPabrik" :headers="tableHeader">
        <template #item.index="{ index }">
          {{ index + 1 }}
        </template>
        <template #item.action="{ item }">
          <div class="d-flex gap-1">
            <IconBtn size="small" @click="deleteItem(item, 'FAPAB')">
              <VIcon disabled icon="fa-trash-o" color="error" />
            </IconBtn>
          </div>
        </template>
      </VDataTable>
    </VCardText>
  </VCard>
  <VCard>
    <VCardTitle class="my-3 d-flex justify-space-between align-center">
      <VRow>
        <VCol cols="6"><h4>Outlet</h4></VCol>
        <VCol cols="6" style="display: flex; justify-content: end"
          ><VBtn
            density="compact"
            variant="outlined"
            @click="openModal('FAOUT')"
            :disabled="itemsOutlet.length > 0"
            >Tambah</VBtn
          ></VCol
        >
      </VRow>
    </VCardTitle>
    <VCardText>
      <VDataTable :items="itemsOutlet" :headers="tableHeader">
        <template #item.index="{ index }">
          {{ index + 1 }}
        </template>
        <template #item.action="{ item }">
          <div class="d-flex gap-1">
            <IconBtn size="small" @click="deleteItem(item, 'FAOUT')">
              <VIcon disabled icon="fa-trash-o" color="error" />
            </IconBtn>
          </div>
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
      <VForm>
        <VItemGroup v-if="modalType === 'Pabrik'">
          <div class="mb-1 font-weight-bold">Lokasi Pabrik</div>
          <VSelect
            placeholder="Pilih Lokasi Pabrik"
            density="compact"
            rounded="xl"
            menu-icon="fa-chevron-down"
          />
          <br />
        </VItemGroup>
        <VItemGroup>
          <div class="mb-1 font-weight-bold">Nama {{ modalType }}</div>
          <VTextField
            :placeholder="`Isi Nama ${modalType}`"
            density="compact"
            rounded="xl"
          />
        </VItemGroup>
        <br />
        <VItemGroup>
          <div class="mb-1 font-weight-bold">Alamat {{ modalType }}</div>
          <VTextField
            :placeholder="`Isi Alamat ${modalType}`"
            density="compact"
            rounded="xl"
          />
        </VItemGroup>
        <br />
        <VRow>
          <VCol cols="6">
            <VItemGroup>
              <div class="mb-1 font-weight-bold">Kab/Kota</div>
              <VTextField
                placeholder="Isi Kabupaten/Kota"
                density="compact"
                rounded="xl"
              />
            </VItemGroup>
          </VCol>
          <VCol cols="6">
            <VItemGroup>
              <div class="mb-1 font-weight-bold">Provinsi</div>
              <VTextField
                placeholder="Isi Provinsi"
                density="compact"
                rounded="xl"
              />
            </VItemGroup>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="6">
            <VItemGroup>
              <div class="mb-1 font-weight-bold">Negara</div>
              <VTextField
                placeholder="Isi Negara"
                density="compact"
                rounded="xl"
              />
            </VItemGroup>
          </VCol>
          <VCol cols="6">
            <VItemGroup>
              <div class="mb-1 font-weight-bold">Kode Pos</div>
              <VTextField
                placeholder="Isi Kode Pos"
                density="compact"
                rounded="xl"
              />
            </VItemGroup>
          </VCol>
        </VRow>
        <VItemGroup v-if="modalType === 'Pabrik'">
          <br />
          <div class="mb-1 font-weight-bold">Status Pabrik</div>
          <VSelect
            placeholder="Pilih Alamat Pabrik"
            density="compact"
            rounded="xl"
            menu-icon="fa-chevron-down"
          />
        </VItemGroup>
      </VForm>
    </VCardText>
  </ShSubmissionDetailFormModal>
  <ShSubmissionDetailFormModal
    dialog-title="Menghapus Data"
    :dialog-visible="isDeleteModalOpen"
    dialog-use="DELETE"
    @update:dialog-visible="isDeleteModalOpen = $event"
    @submit:commit-action="
      deleteType === 'FACTORY' ? handleDeleteFactory() : handleDeleteOutlet()
    "
  >
    <VCardText>
      <div>Apakah yakin ingin menghapus data ini</div>
    </VCardText>
  </ShSubmissionDetailFormModal>

  <VDialog
    v-model="deleteDialog"
    :max-width="dialogMaxWidth"
    @update:model-value="closeDelete"
  >
    <VCard title="Apakah anda yakin akan menghapus data ini?">
      <VCardText>
        <div class="d-flex justify-center gap-4">
          <VBtn color="primary" variant="outlined" @click="closeDelete">
            Cancel
          </VBtn>
          <VBtn
            color="primary"
            variant="elevated"
            @click="deletedPabrikOutlet"
            :disabled="deleteButton"
          >
            OK
          </VBtn>
        </div>
      </VCardText>
    </VCard>
  </VDialog>

  <VDialog v-model="addDialog" :max-width="dialogMaxWidth">
    <DialogCloseBtn variant="text" size="default" @click="addDialog = false" />
    <VCard title="Add Manufacture">
      <v-data-table
        v-model:items-per-page="itemPerPage"
        v-model:page="page"
        :items-length="totalItems"
        :loading="loading"
        loading-text="Loading..."
        @update:options="loadItemAdd(page, itemPerPage, typeAdd)"
        :headers="tableHeaderAdd"
        :items="itemsAdd"
      >
        <template #item.action="{ item, index }">
          <VCheckbox v-model="selectedOption" :value="(item as any).id" />
        </template>
      </v-data-table>
      <v-form ref="refVForm" @submit.prevent="insertData">
        <VCardText>
          <VCol>
            <div class="d-flex justify-end gap-4">
              <VBtn
                color="primary"
                variant="outlined"
                @click="addDialog = false"
              >
                Cancel
              </VBtn>
              <VBtn
                type="submit"
                color="primary"
                :disabled="selectedOption == false || submitAddButton"
                variant="elevated"
              >
                Add
              </VBtn>
            </div>
          </VCol>
        </VCardText>
      </v-form>
    </VCard>
  </VDialog>
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
