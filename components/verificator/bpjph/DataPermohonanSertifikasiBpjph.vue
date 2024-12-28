<script setup lang="ts">
import {
  MasterBadanUsaha,
  type MasterProvince,
} from "@/server/interface/master.iface";
import { computed, defineEmits, defineProps, ref } from "vue";
import { VDataTableServer } from "vuetify/components";

// Props and Emits
defineProps({ mode: String });

// State variables
const isModalOpen = ref(false);
interface DataItem {
  id: number;
  id_daftar: string;
  TanggalDaftar: string;
  Nama: string;
  Alamat: string;
  JenisProduk: string;
  MerkDagang: string;
  Status: string;
}
interface ItemList {
  id_reg: string;
  jenis_daftar: string;
  jenis_produk: string;
  jenis_usaha: string;
  provinsi: string;
  jumlah_produk: number;
  nama_pu: string;
  no_daftar: string;
  status: string;
  id_status: string;
  tgl_daftar: string;
}

const selectedItems = ref<DataItem[]>([]);

// Dummy data for table
// Dummy data for the table
const tableData = ref<ItemList[]>([]);

const itemPerPage = ref(10);
const totalItems = ref(0);
const loading = ref(false);
const page = ref(1);

// Table headers
const permohonanHeaders = [
  { title: "No", key: "index", align: "center" },
  { title: "Pilih", key: "pilih" },
  { title: "Nomor Daftar", key: "no_daftar" },
  { title: "Tanggal Daftar", key: "tgl_daftar" },
  { title: "Tanggal Submit", key: "tgl_submit" },
  { title: "Nama PU", key: "nama_pu" },
  { title: "Provinsi", key: "provinsi" },
  { title: "Jenis Daftar", key: "jenis_daftar" },
  { title: "Jenis Produk", key: "jenis_produk" },
  { title: "Jenis Usaha dan Jumlah", key: "jenis_usaha_jumlah" },
  { title: "Status", key: "status" },
  { title: "Action", key: "action" },
];

// Methods
const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  emit("cancel");
};

const searchQuery = ref("");

const handleInput = () => {
  debouncedFetch(page.value, itemPerPage.value, searchQuery.value);
};

const handleCancel = (message: string) => {
  console.log("Cancel message:", message);
};

const navigateAction = (id: string) => {
  navigateTo(`/sertifikasi-halal/luar-negeri/verification/${id}`);
};

const loadItem = async (page, size, keyword) => {
  // Temporarily skip API call for dummy data testing
  try {
    loading.value = true;

    const response = await $api("/reguler/verifikator/list-not-taken", {
      method: "get",
      params: {
        page,
        size,
        keyword,
      },
    });

    tableData.value = response.data;
    totalItems.value = response.total_item;
    loading.value = false;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loading.value = false;
  }
};

const debouncedFetch = debounce(loadItem, 500);
// Filter state
const showFilterMenu = ref(false);

const selectedFilters = ref({
  fasilitas: "Semua",
  jenisProduk: "Semua",
  provinsi: "",
  lembaga: "Semua",
  pendamping: "Semua",
  kabupaten: "Semua",
  skalaUsaha: "",
  jenisPengajuan: "",
  fac: "Semua",
});

const applyFilters = () => {
  loadItem(
    page.value,
    itemPerPage.value,
    searchQuery.value,
    selectedFilters.value
  );
};

// Check if all items are selected
const isAllSelected = computed(
  () => selectedItems.value.length === tableData.value.length
);

// Toggle select all
const toggleSelectAll = () => {
  selectedItems.value = isAllSelected.value ? [] : tableData.value.slice();
};

// Adaptive button text
const buttonText = computed(() =>
  selectedItems.value.length > 0
    ? `Pilih Data (${selectedItems.value.length})`
    : "Pilih Data"
);

// Handle checkbox change
const handleCheckboxChange = (
  item: {
    id: number;
    id_daftar: string;
    TanggalDaftar: string;
    Nama: string;
    Alamat: string;
    JenisProduk: string;
    MerkDagang: string;
    Status: string;
  },
  checked: any
) => {
  if (checked) {
    // Add item if not already selected
    if (!selectedItems.value.includes(item)) selectedItems.value.push(item);
  } else {
    // Remove item by filtering out the current item
    selectedItems.value = selectedItems.value.filter(
      (selectedItem) => selectedItem.id !== item.id
    );
  }
};
const defaultStatus = { color: "error", desc: "Unknown Status" };
const statusItem = new Proxy(
  {
    OF1: { color: "grey-300", desc: "Draft" },
    OF10: { color: "success", desc: "Submitted" },
    OF11: { color: "success", desc: "Verification" },
    OF15: { color: "success", desc: "Verified" },
    OF2: { color: "error", desc: "Returned" },
    OF280: { color: "error", desc: "Returned to PU" },
    OF285: { color: "error", desc: "Returned By KF" },
    OF290: { color: "error", desc: "Rejected" },
    OF5: { color: "success", desc: "Invoice issued" },
    OF300: { color: "success", desc: "Halal Certified Issued" },
  },
  {
    get(target, prop) {
      return prop in target ? target[prop] : defaultStatus;
    },
  }
);
const filterJenisPengajuan = [
  { name: "Semua", value: "" },
  { name: "Reguler", value: "CH001" },
  { name: "Fasilitasi", value: "CH002" },
];
const filterSkalaUsaha = ref<MasterBadanUsaha[]>([]);
const filterProvince = ref<MasterProvince[]>([]);
const getSkalaUsaha = async () => {
  const masterSkalaUsaha: MasterBadanUsaha[] = await $api(
    "/master/business-entity-scale",
    {
      method: "get",
    }
  );
  filterSkalaUsaha.value = [
    { code: "", name: "Semua", name_eng: "All" },
    ...masterSkalaUsaha,
  ];
};
const getProvinsi = async () => {
  const masterSkalaUsaha: MasterProvince[] = await $api("/master/province", {
    method: "get",
  });
  filterProvince.value = [{ code: "", name: "Semua" }, ...masterSkalaUsaha];
};
const dialogVisible = ref(false);
const emits = defineEmits(["loadData"]);
const selectVerifikasiItem = async (item) => {
  try {
    const response = await $api("/reguler/verifikator/take", {
      method: "post",
      body: {
        id_reg: [item],
      },
    });
    if (response.code != 2000) {
      useSnackbar().sendSnackbar("Ada kesalahan", "error");
      return;
    }
    emits("loadData");
    // await loadItem(page.value, itemPerPage.value, searchQuery.value);
    dialogVisible.value = false;
    useSnackbar().sendSnackbar("Berhasil menyimpan data", "success");
  } catch (error) {
    useSnackbar().sendSnackbar("Ada kesalahan", "error");
  }
};

onMounted(async () => {
  await Promise.all([getSkalaUsaha(), getProvinsi()]);
});
</script>

<template>
  <VDialog width="1200" v-model="dialogVisible">
    <template #activator="{ props: openModal }">
      <VBtn
        variant="flat"
        append-icon="fa-plus"
        style="margin: 1svw"
        v-bind="openModal"
      >
        Terima Data
      </VBtn>
    </template>
    <template #default="{ isActive }">
      <VCard variant="flat" class="pa-4">
        <VCardTitle>
          <VRow>
            <VCol cols="10"><h3>Data Permohonan Sertifikasi</h3></VCol>
            <VCol cols="2" style="display: flex; justify-content: end">
              <VIcon
                size="small"
                icon="fa-times"
                @click="isActive.value = false"
              />
            </VCol>
          </VRow>
        </VCardTitle>
        <VCardText>
          <VRow>
            <VCol>
              <VBtn
                :disabled="selectedItems.length === 0"
                :text="buttonText"
                @click="() => console.log(selectedItems)"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="1">
              <div class="checkbox-container">
                <VCheckbox
                  v-model="isAllSelected"
                  class="custom-checkbox"
                  @click="toggleSelectAll"
                />
              </div>
            </VCol>
            <VCol class="d-flex justify-start align-center" cols="2">
              <VMenu
                v-model="showFilterMenu"
                :close-on-content-click="false"
                offset-y
              >
                <template #activator="{ props }">
                  <VBtn
                    color="primary"
                    variant="outlined"
                    v-bind="props"
                    append-icon="ri-filter-fill"
                  >
                    Filter
                  </VBtn>
                </template>
                <VCard class="pa-3" width="300">
                  <VSelect
                    v-model="selectedFilters.jenisPengajuan"
                    label="Jenis Pengajuan"
                    item-value="value"
                    item-title="name"
                    :items="filterJenisPengajuan"
                    class="mt-3"
                  />
                  <VSelect
                    v-model="selectedFilters.skalaUsaha"
                    label="Skala Usaha"
                    item-value="code"
                    item-title="name"
                    :items="filterSkalaUsaha"
                    class="mt-3"
                  />
                  <VSelect
                    v-model="selectedFilters.provinsi"
                    label="Provinsi"
                    item-value="code"
                    item-title="name"
                    :items="filterProvince"
                    class="mt-3"
                  />
                  <!-- <VSelect
                    v-model="selectedFilters.fac"
                    label="Kode Fac"
                    :items="['Semua', 'Pendamping A', 'Pendamping B']"
                    class="mt-3"
                  /> -->
                  <VBtn
                    block
                    color="primary"
                    class="mt-3"
                    @click="applyFilters"
                  >
                    Apply Filters
                  </VBtn>
                </VCard>
              </VMenu>
            </VCol>
            <VCol class="d-flex justify-sm-space-between align-center" cols="9">
              <VTextField
                v-model="searchQuery"
                density="compact"
                placeholder="Cari Nama Pengajuan"
                append-inner-icon="ri-search-line"
                style="max-width: 100%"
                @input="handleInput"
              />
            </VCol>
          </VRow>
          <VRow>
            <VDataTableServer
              v-model:items-per-page="itemPerPage"
              v-model:page="page"
              :headers="permohonanHeaders"
              style="white-space: nowrap"
              :items="tableData"
              :loading="loading"
              :items-length="totalItems"
              loading-text="Loading..."
              @update:options="loadItem(page, itemPerPage, searchQuery)"
            >
              <template #item.index="{ index }">
                {{ index + 1 + (page - 1) * itemPerPage }}
              </template>
              <template #item.tgl_daftar="{ item }">
                {{
                  item.tgl_daftar != undefined && item.tgl_daftar != ""
                    ? formatDateIntl(new Date(item.tgl_daftar))
                    : ""
                }}
              </template>
              <template #item.status="{ item }">
                <VChip :color="statusItem[item.id_status].color">
                  {{ statusItem[item.id_status].desc }}
                </VChip>
              </template>
              <template #item.action="{ item }">
                <div class="d-flex gap-1">
                  <IconBtn size="small">
                    <VIcon
                      icon="ri-arrow-right-line"
                      color="primary"
                      @click="selectVerifikasiItem(item.id_reg)"
                    />
                  </IconBtn>
                  <!-- Right arrow icon for action -->
                </div>
              </template>
              <template #item.pilih="{ item }">
                <VCheckbox v-model="selectedItems" :value="item" />
              </template>

              <template #item.jenis_usaha_jumlah="{ item }">
                <VContainer
                  style="
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    white-space: nowrap;
                  "
                >
                  <VChip
                    variant="outlined"
                    style="
                      border-color: #49a84c;
                      border-radius: 8px;
                      background-color: #edf6ed;
                    "
                  >
                    <span style="color: #49a84c">
                      {{ item.jenis_usaha }}
                    </span>
                  </VChip>
                  <VChip
                    variant="outlined"
                    style="
                      border-color: #49a84c;
                      border-radius: 8px;
                      background-color: #edf6ed;
                    "
                  >
                    <span style="color: #49a84c">
                      {{ item.jumlah_produk }}
                    </span>
                  </VChip>
                </VContainer>
              </template>
            </VDataTableServer>
          </VRow>
        </VCardText>
      </VCard>
    </template>
  </VDialog>
</template>

<style scoped>
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

.checkbox-container {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc; /* Thin border */
  border-radius: 4px; /* Rounded corners */
  block-size: 32px; /* Container size */
  inline-size: 32px; /* Container size */
  padding-inline-end: 35px; /* Smaller padding */
}

.custom-checkbox {
  --v-checkbox-size: 16px; /* Smaller checkbox size */
}
</style>
