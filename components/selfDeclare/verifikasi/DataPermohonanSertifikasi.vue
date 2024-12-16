<script setup lang="ts">
import { computed, ref } from "vue";
import { VDataTableServer } from "vuetify/components";

const items = ref([]);
const itemPerPage = ref(10);
const totalItems = ref(0);
const loading = ref(false);
const loadingAll = ref(false);
const page = ref(1);
const searchQuery = ref("");

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

const defaultStatus = { color: "error", desc: "Unknown Status" };

const statusItem: any = new Proxy(
  {
    OF1: { color: "grey-300", desc: "Draft" },
    OF10: { color: "success", desc: "Submitted" },
    OF15: { color: "success", desc: "Verified" },
    OF2: { color: "error", desc: "Returned" },
    OF290: { color: "error", desc: "Rejected" },
    OF5: { color: "success", desc: "Invoice issued" },
    OF320: { color: "success", desc: "Code Issued" },
    OF11: { color: "success", desc: "Verification" },
  },
  {
    get(target: any, prop: any) {
      return prop in target ? target[prop] : defaultStatus;
    },
  }
);

const selectedItems = ref<DataItem[]>([]);

// Dummy data for table
const tableData = ref([
  {
    id: 1,
    id_daftar: "D001",
    TanggalDaftar: "2024-11-01",
    Nama: "John Doe",
    Alamat: "1234 Elm Street, Springfield",
    JenisProduk: "Electronics",
    MerkDagang: "TechBrand",
    Status: "OF74",
  },
]);

const headers: any = [
  { title: "No", key: "id", align: "center" },
  { title: "ID Daftar", key: "id_daftar" },
  { title: "Pilih", key: "pilih" },
  { title: "Tanggal Daftar", key: "TanggalDaftar" },
  { title: "Nama", key: "Nama" },
  { title: "Alamat", key: "Alamat" },
  { title: "Jenis Produk", key: "JenisProduk" },
  { title: "Merk Dagang", key: "MerkDagang" },
  { title: "Status", key: "Status" },
  { title: "Action", key: "action" },
];

const handleInput = () => {
  debouncedFetch({
    page: page.value,
    size: itemPerPage.value,
    keyword: searchQuery.value,
    fasilitas: selectedFilters.value.fasilitas,
    jenis_produk: selectedFilters.value.jenisProduk,
    provinsi: selectedFilters.value.provinsi,
    lembaga: selectedFilters.value.lembaga,
    pendamping: selectedFilters.value.pendamping,
    kabupaten: selectedFilters.value.kabupaten,
  });
};

const navigateAction = (id: string) => {
  navigateTo(`/sertifikasi-halal/luar-negeri/verification/${id}`);
};

const loadItem = async ({
  page,
  size,
  keyword,
  fasilitas,
  jenis_produk,
  provinsi,
  lembaga,
  pendamping,
  kabupaten,
}: {
  page: number;
  size: number;
  keyword: string;
  fasilitas: string;
  jenis_produk: string;
  provinsi: string;
  lembaga: string;
  pendamping: string;
  kabupaten: string;
}) => {
  try {
    loading.value = true;

    const response: any = await $api("/self-declare/verificator/submission", {
      method: "get",
      params: {
        page,
        size,
        keyword,
        fasilitas,
        jenis_produk,
        provinsi,
        lembaga,
        pendamping,
        kabupaten,
      },
    });

    items.value = response.data;
    totalItems.value = response.total_item;
    loading.value = false;
    return response;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loading.value = false;
  }
};

const debouncedFetch = debounce(loadItem, 500);

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
  loadItem({
    page: page.value,
    size: itemPerPage.value,
    keyword: searchQuery.value,
    fasilitas: selectedFilters.value.fasilitas,
    jenis_produk: selectedFilters.value.jenisProduk,
    provinsi: selectedFilters.value.provinsi,
    lembaga: selectedFilters.value.lembaga,
    pendamping: selectedFilters.value.pendamping,
    kabupaten: selectedFilters.value.kabupaten,
  });
};

const isAllSelected = computed(
  () => selectedItems.value.length === items.value.length
);

// Toggle select all
const toggleSelectAll = () => {
  selectedItems.value = isAllSelected.value ? [] : items.value.slice();
};

// Adaptive button text
const buttonText = computed(() =>
  selectedItems.value.length > 0
    ? `Pilih Data (${selectedItems.value.length})`
    : "Pilih Data"
);

onMounted(async () => {
  loadingAll.value = true;
  const res = await Promise.all([
    loadItem({
      page: page.value,
      size: itemPerPage.value,
      keyword: searchQuery.value,
      fasilitas: selectedFilters.value.fasilitas,
      jenis_produk: selectedFilters.value.jenisProduk,
      provinsi: selectedFilters.value.provinsi,
      lembaga: selectedFilters.value.lembaga,
      pendamping: selectedFilters.value.pendamping,
      kabupaten: selectedFilters.value.kabupaten,
    }),
  ]);

  const checkResIfUndefined = res.every((item) => {
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
  <VDialog width="1200">
    <template #activator="{ props: openModal }">
      <VBtn
        variant="flat"
        append-icon="fa-plus"
        style="margin: 1svw"
        v-bind="openModal"
      >
        Ambil Data
      </VBtn>
    </template>
    <template #default="{ isActive }">
      <VCard v-if="!loadingAll" variant="flat" class="pa-4">
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
                    v-model="selectedFilters.jenisProduk"
                    label="Jenis Produk"
                    :items="['Semua', 'Produk Y', 'Produk Z']"
                    class="mt-3"
                  />
                  <VSelect
                    v-model="selectedFilters.fasilitas"
                    label="Fasilitas"
                    :items="['Semua', 'Fasilitas A', 'Fasilitas AB']"
                    class="mt-3"
                  />
                  <VSelect
                    v-model="selectedFilters.lembaga"
                    label="Lembaga"
                    :items="['Semua', 'Lembaga A', 'Lembaga B']"
                    class="mt-3"
                  />
                  <VSelect
                    v-model="selectedFilters.pendamping"
                    label="Pendamping"
                    :items="['Semua', 'Pendamping A', 'Pendamping B']"
                    class="mt-3"
                  />
                  <VSelect
                    v-model="selectedFilters.provinsi"
                    label="Provinsi"
                    :items="['Semua', 'Provinsi A', 'Provinsi B']"
                    class="mt-3"
                  />
                  <VSelect
                    v-model="selectedFilters.kabupaten"
                    label="Kabupaten"
                    :items="['Semua', 'Kabupaten A', 'Kabupaten B']"
                    class="mt-3"
                  />
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
                placeholder="Search Data"
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
              :headers="headers"
              :items="items"
              :loading="loading"
              :items-length="totalItems"
              loading-text="Loading..."
              style="white-space: nowrap"
              @update:options="
                loadItem({
                  page: page,
                  size: itemPerPage,
                  keyword: searchQuery,
                  fasilitas: selectedFilters.fasilitas,
                  jenis_produk: selectedFilters.jenisProduk,
                  provinsi: selectedFilters.provinsi,
                  lembaga: selectedFilters.lembaga,
                  pendamping: selectedFilters.pendamping,
                  kabupaten: selectedFilters.kabupaten,
                })
              "
            >
              <template #item.id="{ index }">
                {{ index + 1 + (page - 1) * itemPerPage }}
              </template>
              <template #item.tgl_daftar="{ item }">
                {{ formatDateIntl(new Date((item as any).tgl_daftar)) }}
              </template>
              <template #item.action="{ item }">
                <div class="d-flex gap-1">
                  <IconBtn size="small">
                    <VIcon
                      icon="ri-arrow-right-line"
                      color="primary"
                      @click="navigateAction((item as any).id)"
                    />
                  </IconBtn>
                  <!-- Right arrow icon for action -->
                </div>
              </template>
              <template #item.pilih="{ item }">
                <VCheckbox v-model="selectedItems" :value="item" />
              </template>
              <template #item.status_code="{ item }">
                <VChip
                  label
                  :color="statusItem[(item as any).status_code].color"
                >
                  {{ statusItem[(item as any).status_code].desc }}
                </VChip>
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
