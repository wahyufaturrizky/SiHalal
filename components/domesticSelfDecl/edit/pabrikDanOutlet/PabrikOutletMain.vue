<script setup lang="ts">
// const tablePabrikHeader = [
//   { title: "No", key: "no" },
//   { title: "Jenis", key: "kind" },
//   { title: "No. Dokumen", key: "no_docs" },
//   { title: "Tanggal", key: "date" },
//   { title: "Masa Berlaku", key: "exp_date" },
//   { title: "Instansi Penerbit", key: "publisher" },
//   { title: "Action", key: "action" },
// ];

const tableHeader = [
  { title: "No", key: "index" },
  { title: "Nama", key: "nama" },
  { title: "Alamat", key: "alamat" },
  { title: "Action", key: "action" },
];
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
const itemsAdd = ref<
  {
    alamat: string;
    id_pabrik: string;
    nama: string;
  }[]
>([]);
const route = useRoute();

const loadPabrik = async (type: string = "FAPAB") => {
  try {
    const options = {
      method: "get",
      params: {
        fas_id: type,
      },
    };
    const response = await $api(
      `/self-declare/submission/pabrik/${route.params.id}/list`,
      options
    );
    if (type == "FAPAB") {
      itemsPabrik.value = response.data;
      return;
    }
    itemsOutlet.value = response.data;
  } catch (error) {
    console.log(error);
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};
const itemPerPage = ref(10);
const totalItems = ref(0);
const loading = ref(true);
const page = ref(1);
const loadItemAdd = async (
  page: number,
  size: number,
  type: string = "FAPAB"
) => {
  loading.value = true;
  try {
    const options = {
      method: "get",
      params: {
        fas_id: type,
        page: page.value,
        size: itemPerPage.value,
      },
    };
    const response = await $api(
      `/self-declare/submission/pabrik/${route.params.id}/search`,
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
const addDialog = ref(false);
const typeAdd = ref<"FAPAB" | "FAOUT">("FAPAB");
const selectedOption = ref(null);
const openModal = async (type: "FAPAB" | "FAOUT") => {
  selectedOption.value = null;
  typeAdd.value = type;
  page.value = 1;
  itemPerPage.value = 10;
  await loadItemAdd(page.value, itemPerPage.value, typeAdd.value);
  addDialog.value = true;
};
const submitAddButton = ref(false);

const insertData = async () => {
  submitAddButton.value = true;

  if (selectedOption.value == false) {
    useSnackbar().sendSnackbar("Harus Pilih 1 Outlet/Pabrik", "error");
    addDialog.value = false;
    return;
  }

  try {
    const response = await $api("/self-declare/submission/pabrik/add", {
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
const deleteDialog = ref(false);
const deleteButton = ref(false);
const deletedId = ref();
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
const closeDelete = () => {
  deletedId.value = null;
  deleteDialog.value = false;
  deleteButton.value = false;
};
const deletedPabrikOutlet = async () => {
  try {
    deleteButton.value = true;
    const response = await $api("/self-declare/submission/pabrik/delete", {
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
onMounted(async () => {
  await Promise.allSettled([
    await loadPabrik("FAPAB"),
    await loadPabrik("FAOUT"),
  ]);
});
</script>
<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard>
          <VCardTitle>
            <VRow>
              <VCol cols="6"><h4>Pabrik</h4></VCol>
              <VCol cols="6" style="display: flex; justify-content: end"
                ><VBtn
                  density="compact"
                  variant="outlined"
                  @click="openModal('FAPAB')"
                  :disabled="itemsPabrik.length > 0"
                  >Tambah</VBtn
                ></VCol
              >
            </VRow>
          </VCardTitle>
          <VCardText>
            <VDataTable :items="itemsPabrik" :headers="tableHeader">
              <template #item.index="{ index }">
                {{ index }}
              </template>
              <template #item.action="{ item }">
                <div class="d-flex gap-1">
                  <IconBtn size="small" @click="deleteItem(item, 'FAPAB')">
                    <VIcon icon="fa-trash-o" color="error" />
                  </IconBtn>
                </div>
              </template>
            </VDataTable>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12">
        <VCard>
          <VCardTitle>
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
                {{ index }}
              </template>
              <template #item.action="{ item }">
                <div class="d-flex gap-1">
                  <IconBtn size="small" @click="deleteItem(item, 'FAOUT')">
                    <VIcon icon="fa-trash-o" color="error" />
                  </IconBtn>
                </div>
              </template>
            </VDataTable>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
    <VDialog
      v-model="deleteDialog"
      max-width="500px"
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

    <VDialog v-model="addDialog" max-width="500px">
      <DialogCloseBtn
        variant="text"
        size="default"
        @click="addDialog = false"
      />
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
            <VCheckbox v-model="selectedOption" :value="item.id" />
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
  </div>
</template>
