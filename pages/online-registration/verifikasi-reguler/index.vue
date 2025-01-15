<script setup lang="ts">
import DataPermohonanSertifikasiBpjph from "@/components/verificator/bpjph/DataPermohonanSertifikasiBpjph.vue";
import { computed, defineEmits, defineProps, ref } from "vue";
import { VDataTableServer } from "vuetify/components";

// Props and Emits
defineProps({ mode: String });

const emit = defineEmits(["confirm-add", "cancel"]);

// State variables
const isModalOpen = ref(false);
interface DataItem {
  id: number;
  id_daftar: string;
  TanggalDaftar: string;
  Nama: string;
  Provinsi: string;
  JenisDaftar: string;
  JenisProduk: string;
  MerkDagang: string;
  Status: string;
}

const defaultStatus = { color: "error", desc: "Unknown Status" };
const statusItem = new Proxy(
  {
    OF1: { color: "grey-300", desc: "Draft" },
    OF10: { color: "success", desc: "Submitted" },
    OF11: { color: "success", desc: "Verification" },
    OF15: { color: "success", desc: "Verification" },
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

const selectedItems = ref<DataItem[]>([]);

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

// Dummy data for table
// Dummy data for the table
const items = ref<ItemList[]>([]);

const itemPerPage = ref(10);
const totalItems = ref(0);
const loading = ref(false);
const page = ref(1);

// Table headers
const permohonanHeaders = [
  { title: "No", key: "id", align: "center" },
  { title: "Nomor Daftar", key: "no_daftar" },
  { title: "Tanggal Daftar", key: "tgl_daftar" },
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
  navigateTo(`/online-registration/verifikasi-reguler/${id}`);
};

const loadItem = async (page, size, keyword = "") => {
  // Temporarily skip API call for dummy data testing
  try {
    loading.value = true;

    const response = await $api("/reguler/verifikator/list", {
      method: "get",
      params: {
        page,
        size,
        keyword,
      },
    });

    items.value = response.data;
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
  provinsi: "Semua",
  lembaga: "Semua",
  pendamping: "Semua",
  kabupaten: "Semua",
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

// Sample data for "Bahan Bersertifikat" and "Tidak Bersertifikat"
const StatusOptions = [
  { name: "OF74", value: "of74" },
  { name: "Verifikasi", value: "verifikasi" },
];
const loadDataFromModal = async () => {
  page.value = 1;
  searchQuery.value = "";
  await loadItem(page.value, itemPerPage.value, searchQuery.value);
};

const bahanType = ref(null);
</script>

<template>
  <VContainer class="pa-0">
    <!-- Title and Buttons Row -->
    <VRow>
      <VCol>
        <h2 style="font-size: 32px">Verifikasi Dokumen Reguler</h2>
      </VCol>
      <VCol cols="4" style="display: flex; justify-content: end">
        <DataPermohonanSertifikasiBpjph @loadData="loadDataFromModal()" />
      </VCol>
    </VRow>
    <VCard class="pa-4">
      <VCardTitle>
        <VRow>
          <VCol cols="10"><h2>Data Pengajuan</h2></VCol>
        </VRow>
      </VCardTitle>
      <VCardText>
        <VRow>
          <VCol />
        </VRow>
        <VRow>
          <VCol class="d-flex justify-sm-space-between align-center" cols="12">
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
            :headers="permohonanHeaders"
            v-model:items-per-page="itemPerPage"
            v-model:page="page"
            :items="items"
            :loading="loading"
            :items-length="totalItems"
            style="white-space: nowrap"
            loading-text="Loading..."
            @update:options="loadItem(page, itemPerPage, searchQuery)"
          >
            <template #item.id="{ index }">
              {{ index + 1 + (page - 1) * itemPerPage }}
            </template>
            <template #item.tgl_daftar="{ item }">
              {{
                item.tgl_daftar != undefined && item.tgl_daftar != ""
                  ? formatDateIntl(new Date(item.tgl_daftar))
                  : ""
              }}
            </template>
            <template #item.action="{ item }">
              <div class="d-flex gap-1">
                <IconBtn size="small">
                  <VIcon
                    icon="ri-arrow-right-line"
                    color="primary"
                    @click="navigateAction(item.id_reg)"
                  />
                </IconBtn>
                <!-- Right arrow icon for action -->
              </div>
            </template>
            <template #item.pilih="{ item }">
              <VCheckbox v-model="selectedItems" :value="item" />
            </template>
            <template #item.status="{ item }">
              <VChip :color="statusItem[item?.id_status].color">
                {{ statusItem[item?.id_status].desc }}
              </VChip>
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
  </VContainer>
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

custom-v-checkbox {
  --v-checkbox-size: 24px; /* Set size for outer box */
}

.custom-v-checkbox .v-checkbox__input {
  border: 2px solid #ccc !important; /* Outline border */
  border-radius: 6px; /* Rounded corners */
}

.custom-v-checkbox .v-checkbox__input::before {
  width: 16px !important; /* Inner box size */
  height: 16px !important;
  background: transparent !important;
  border: 2px solid transparent !important; /* Inner box border */
}

.custom-v-checkbox .v-checkbox__input--indeterminate::before,
.custom-v-checkbox .v-checkbox__input--checked::before {
  border-color: #000 !important; /* Inner box color */
  background: #ccc !important;
}
</style>
