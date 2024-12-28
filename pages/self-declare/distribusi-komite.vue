<script setup lang="ts">
import { defineProps, ref } from "vue";
import { useDisplay } from "vuetify";
import { VDataTableServer } from "vuetify/components";

defineProps({ mode: String });
const selectAll = ref([]);

interface DataItem {
  id: number;
  id_daftar: string;
  no_daftar: string;
  tgl_daftar: string;
  nama_pu: string;
  alamat: string;
  merek_dagang: string;
  status: string;
  status_code: string;
}

const currentPage = ref(1);
const itemPerPage = ref(10);
const totalItems = ref(0);
const loading = ref(false);
const permohonanHeaders: any = [
  { title: "No", key: "id", maxWidth: 25 },
  { title: "Pilih", key: "pilih", maxWidth: 60 },
  { title: "ID Daftar", key: "id_daftar", nowrap: true },
  { title: "Nomor Daftar", key: "no_daftar", nowrap: true },
  { title: "Tanggal Daftar", key: "tgl_daftar", nowrap: true },
  { title: "Nama PU", key: "nama_pu", nowrap: true },
  { title: "Alamat", key: "alamat", nowrap: true },
  { title: "Merk Dagang", key: "merek_dagang", nowrap: true },
  { title: "Status", key: "status" },
  // { title: "Action", key: "action", align: "center" },
];
const listData = ref<Array<DataItem>>([]);
const selectedItems = ref<String[]>([]);

const searchQuery = ref("");

const handleSelectAll = () => {
  if (selectAll.value.length === 1) {
    for (const item of listData.value) {
      selectedItems.value.push(item.id_daftar);
    }
  } else {
    selectedItems.value = [];
  }
};

const isVisible = ref(false);
const openDialog = () => (isVisible.value = true);
const closeDialog = () => (isVisible.value = false);

const { mdAndUp } = useDisplay();

const dialogMaxWidth = computed(() => (mdAndUp.value ? 700 : "90%"));

const selectedComitee = ref(null);
const onHandleDistribusi = async () => {
  try {
    const result: any = await $api(
      "/self-declare/verificator/submission/update-status",
      {
        method: "post",
        body: {
          certificate_id: selectedItems.value,
          user_id: selectedComitee.value,
        },
      } as any
    );
    if (result.code === 2000) {
      refresh();
      useSnackbar().sendSnackbar("Berhasil Mengdistribusikan Data", "success");
    }
  } catch (error) {
    useSnackbar().sendSnackbar(
      "Oops, terjadi kesalahan. Silakan coba kembali",
      "error"
    );
  }

  selectedItems.value = [];
  selectedComitee.value = null;
  closeDialog();
};

// TODO -> IMPLEMENT FILTER
const onFiltersUpdate = (filter: any) => {
  console.log("UPDATE FILTER : ", filter);
};
const distributeBtnText = computed(() => {
  return selectedItems.value.length
    ? `Distribusi (${selectedItems.value.length})`
    : `Distribusi`;
});

const listProduct = ref([]);
const listFasilitas = ref([]);
const listLembaga = ref([]);
const listPendamping = ref([]);
const listComitee = ref([]);

const selectedProductType = ref();
const selectedFasilitas = ref();
const selectedLembaga = ref();
const selectedPendamping = ref();
const handleLoadList = async () => {
  try {
    const response: any = await $api(
      "/self-declare/verificator/submission/list",
      {
        method: "get",
        params: {
          jenis_produk: selectedProductType.value,
          fasilitas: selectedFasilitas.value,
          lembaga: selectedLembaga.value,
          pendamping: selectedPendamping.value,
          page: currentPage.value,
          size: itemPerPage.value,
          keyword: searchQuery.value,
        },
      } as any
    );

    if (response.code === 2000) {
      if (response.data !== null) {
        listData.value = response.data;
        currentPage.value = response.current_page;
        totalItems.value = response.total_item;
      } else {
        listData.value = [];
        currentPage.value = 1;
        totalItems.value = 0;
      }
    }
    return response;
  } catch (error) {
    console.log(error);
  }
};
const loadItemProduct = async () => {
  try {
    const response: any = await $api("/master/products", {
      method: "get",
    } as any);

    if (response.length) {
      listProduct.value = response;

      return response;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};
const loadItemFacility = async () => {
  try {
    const response: any = await $api("/master/facility", {
      method: "get",
    } as any);

    if (response.length) {
      listFasilitas.value = response;
      return response;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};
const loadItemLembaga = async () => {
  try {
    const response: any = await $api("/master/lembaga", {
      method: "get",
    } as any);

    if (response.length) {
      listLembaga.value = response;
      return response;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};
const loadItemPendamping = async () => {
  try {
    const response: any = await $api("/master/pendamping", {
      method: "get",
    } as any);

    if (response.length) {
      listPendamping.value = response;
      return response;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const handleLoadListComitee = async () => {
  try {
    const response: any = await $api(
      "/self-declare/verificator/submission/list-comitee",
      {
        method: "get",
      } as any
    );

    if (response.code === 2000 && response.data) {
      listComitee.value = response.data;
    }
    return response;
  } catch (error) {
    console.log(error);
  }
};

const { refresh } = await useAsyncData(
  "comitee-distribution-list",
  async () => handleLoadList(),
  {
    watch: [currentPage, itemPerPage],
  }
);

const handleSearchSubmission = useDebounceFn((val: string) => {
  searchQuery.value = val;
  currentPage.value = 1;

  refresh();
}, 350);
const handleFilterProductType = (val: string) => {
  selectedProductType.value = val;
  currentPage.value = 1;

  refresh();
};
const handleFilterFasilitas = (val: string) => {
  selectedFasilitas.value = val;
  currentPage.value = 1;

  refresh();
};
const handleFilterLembaga = (val: string) => {
  selectedLembaga.value = val;
  currentPage.value = 1;

  refresh();
};
const handleFilterPendamping = (val: string) => {
  selectedPendamping.value = val;
  currentPage.value = 1;

  refresh();
};

onMounted(() => {
  handleLoadList();
  loadItemProduct();
  loadItemFacility();
  loadItemLembaga();
  loadItemPendamping();
  handleLoadListComitee();
});
</script>

<template>
  <VCard variant="flat" class="pa-4">
    <VCardTitle class="mb-6 px-2">
      <VRow>
        <VCol cols="10">
          <h3 class="font-weight-bold">Data Pengajuan</h3>
        </VCol>
      </VRow>
    </VCardTitle>
    <VCardText>
      <VRow>
        <VBtn
          :color="selectedItems.length ? 'primary' : '#A09BA1'"
          @click="selectedItems.length ? openDialog() : null"
        >
          {{ distributeBtnText }}
        </VBtn>
      </VRow>
      <VRow>
        <VCol cols="3" class="px-0">
          <VRow class="ga-4" no-gutters>
            <div
              class="border rounded-lg d-flex justify-center align-center pa"
            >
              <VCheckbox
                v-model="selectAll"
                @change="handleSelectAll"
              ></VCheckbox>
            </div>
            <VMenu :close-on-content-click="false">
              <template #activator="{ props }">
                <VTextField
                  placeholder="Filter"
                  density="compact"
                  rounded="xl"
                  append-inner-icon="mdi-filter"
                  class="cursor-pointer"
                  v-bind="props"
                />
              </template>
              <VCard min-width="360px" class="mt-2">
                <VCardText>
                  <VRow no-gutters class="mb-3">
                    <VCol>
                      <div class="text-h6 mb-1">Jenis Produk</div>
                      <VSelect
                        density="compact"
                        @update:model-value="handleFilterProductType"
                        v-model="selectedProductType"
                        :items="listProduct"
                        item-title="name"
                        item-value="code"
                        menu-icon="fa-chevron-down"
                        rounded="xl"
                        placeholder="Semua"
                        clearable
                      />
                    </VCol>
                  </VRow>
                  <VRow no-gutters class="mb-3">
                    <VCol>
                      <div class="text-h6 mb-1">Fasilitas</div>
                      <VSelect
                        density="compact"
                        @update:model-value="handleFilterFasilitas"
                        v-model="selectedFasilitas"
                        :items="listFasilitas"
                        item-title="name"
                        item-value="id"
                        menu-icon="fa-chevron-down"
                        rounded="xl"
                        placeholder="Semua"
                        clearable
                      />
                    </VCol>
                  </VRow>
                  <VRow no-gutters class="mb-3">
                    <VCol>
                      <div class="text-h6 mb-1">Lembaga</div>
                      <VSelect
                        density="compact"
                        @update:model-value="handleFilterLembaga"
                        v-model="selectedLembaga"
                        :items="listLembaga"
                        item-title="name"
                        item-value="id"
                        menu-icon="fa-chevron-down"
                        rounded="xl"
                        placeholder="Semua"
                        clearable
                      />
                    </VCol>
                  </VRow>
                  <VRow no-gutters class="mb-3">
                    <VCol>
                      <div class="text-h6 mb-1">Pendamping</div>
                      <VSelect
                        density="compact"
                        @update:model-value="handleFilterPendamping"
                        v-model="selectedPendamping"
                        :items="listPendamping"
                        menu-icon="fa-chevron-down"
                        rounded="xl"
                        placeholder="Semua"
                        clearable
                      />
                    </VCol>
                  </VRow>
                </VCardText>
              </VCard>
            </VMenu>
            <!-- <DistribusiKomiteSelfDeclareTableFilter
              @updateFilter="onFiltersUpdate"
            /> -->
          </VRow>
        </VCol>
        <VCol class="d-flex justify-sm-space-between align-center" cols="9">
          <VTextField
            v-model="searchQuery"
            density="compact"
            placeholder="Cari Nama Pengajuan"
            append-inner-icon="ri-search-line"
            style="max-inline-size: 100%"
            @update:model-value="handleSearchSubmission"
            clearable
          />
        </VCol>
      </VRow>
      <VRow>
        <VDataTableServer
          class="custom-table"
          v-model:items-per-page="itemPerPage"
          v-model:page="currentPage"
          :headers="permohonanHeaders"
          :items="listData"
          :loading="loading"
          :items-length="totalItems"
          loading-text="Loading..."
        >
          <template #item.id="{ index }">
            {{ index + 1 + (currentPage - 1) * itemPerPage }}
          </template>
          <template #item.no_daftar="{ item }">
            {{ item.no_daftar ? item.no_daftar : "-" }}
          </template>
          <template #item.tgl_daftar="{ item }">
            {{
              item.tgl_daftar
                ? new Date(item.tgl_daftar)
                    .toISOString()
                    .substring(0, 10)
                    .replace(/-/g, "/")
                : "-"
            }}
          </template>
          <template #item.nama_pu="{ item }">
            {{ item.nama_pu ? item.nama_pu : "-" }}
          </template>
          <template #item.alamat="{ item }">
            {{ item.alamat ? item.alamat : "-" }}
          </template>
          <template #item.merek_dagang="{ item }">
            {{ item.merek_dagang ? item.merek_dagang : "-" }}
          </template>
          <!-- <template #item.status="{ item }">
            {{ item.status ? item.status : "-" }}
          </template> -->
          <template #item.pilih="{ item }">
            <VCheckbox v-model="selectedItems" :value="item.id_daftar" />
          </template>
          <template #item.status="{ item }">
            <!-- <div v-if="item.status === 'OF74'">
              <div class="status-container">
                <VChip
                  variant="outlined"
                  style="
                    border-color: #49a84c;
                    border-radius: 8px;
                    background-color: #edf6ed;
                  "
                >
                  <span style="color: #49a84c">
                    {{ item.status_code }}
                  </span>
                </VChip>
              </div>
            </div> -->
            <!-- <div> -->
            <div class="status-container">
              <VChip
                variant="outlined"
                style="
                  border-color: #652672;
                  border-radius: 8px;
                  background-color: #f0e9f1;
                "
              >
                <span style="color: #652672">
                  {{ item.status }}
                </span>
              </VChip>
            </div>
            <!-- </div> -->
          </template>
        </VDataTableServer>
      </VRow>
      <!-- <VPagination v-model="page" :total-visible="7" :length="totalPages" /> -->
    </VCardText>
  </VCard>

  <VDialog v-model="isVisible" :max-width="dialogMaxWidth" location="top">
    <VCard class="pa-4">
      <VCardTitle class="px-2 font-weight-bold"> Distribusi </VCardTitle>
      <VCardItem class="px-2 mb-4">
        <VLabel for="proses">
          Proses Distribusi Untuk Data Data Yang Dipilih
        </VLabel>
        <VSelect
          id="proses"
          placeholder="Pilih Proses Distribusi"
          v-model="selectedComitee"
          :items="listComitee"
          item-title="name"
          item-value="user_id"
        />
      </VCardItem>
      <VCardActions class="d-flex justify-end ga-4">
        <VBtn
          @click="[closeDialog(), (selectedComitee = null)]"
          variant="outlined"
          min-width="100px"
        >
          Batal
        </VBtn>
        <VBtn min-width="100px" variant="flat" @click="onHandleDistribusi">
          Simpan
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<style scoped lang="scss">
.text-center {
  text-align: center;
}

.text-success {
  color: #4caf50;
}

.text-error {
  color: #e53935;
}

.text-primary {
  color: #1976d2;
}

.text-decoration-underline {
  text-decoration: underline;
}

custom-v-checkbox {
  --v-checkbox-size: 24px; /* Set size for outer box */
}

.custom-v-checkbox .v-checkbox__input {
  border: 2px solid #ccc !important; /* Outline border */
  border-radius: 6px; /* Rounded corners */
}

.custom-v-checkbox .v-checkbox__input::before {
  border: 2px solid transparent !important; /* Inner box border */
  background: transparent !important;
  block-size: 16px !important;
  inline-size: 16px !important; /* Inner box size */
}

.custom-v-checkbox .v-checkbox__input--indeterminate::before,
.custom-v-checkbox .v-checkbox__input--checked::before {
  border-color: #000 !important; /* Inner box color */
  background: #ccc !important;
}
</style>
