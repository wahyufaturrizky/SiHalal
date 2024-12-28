<script setup lang="ts">
import { computed, ref } from "vue";
import { VDataTableServer } from "vuetify/components";

const emit = defineEmits<{
  (event: "refresh"): void;
}>();

const items = ref([]);
const itemPerPage = ref(10);
const totalItems = ref(0);
const loading = ref(false);
const loadingAll = ref(true);
const page = ref(1);
const itemsProduct = ref();
const searchQuery = ref("");
const dialogVisible = ref(false);
const itemsFacility = ref();
const itemsLembaga = ref();
const itemsPendamping = ref();
const itemsProvince = ref();
const itemsDistrict = ref();
const loadingAddSubmission = ref(false);
const selectedItems = ref<any[]>([]);

const headers: any = [
  { title: "Pilih", key: "pilih", fixed: true },
  { title: "No", key: "no", align: "center" },
  { title: "ID Daftar", key: "id_daftar" },
  { title: "No Daftar", key: "no_daftar" },
  { title: "Tanggal Daftar", key: "tgl_daftar" },
  { title: "Nama PU", key: "nama" },
  { title: "Alamat", key: "alamat" },
  { title: "Jenis Produk", key: "jenis_produk" },
  { title: "Merk Dagang", key: "merek_dagang" },
  { title: "Status", key: "status_code" },
  { title: "Action", key: "action", fixed: true },
];

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
    OF50: { color: "success", desc: "Dikirim ke LPH" },
    OF300: { color: "success", desc: "Halal Certified Issued" },
    OF285: { color: "success", desc: "Dikembalikan Oleh Fatwa" },
    OF74: { color: "success", desc: "Sent to Komite Fatwa" },
    OF280: { color: "success", desc: "Dikembalikan Ke PU" },
    OF100: { color: "success", desc: "Selesai Sidang Fatwa" },
    OF120: { color: "success", desc: "Certificate Issued" },
    OF900: { color: "error", desc: "Dibatalkan" },
  },
  {
    get(target: any, prop: any) {
      return prop in target ? target[prop] : defaultStatus;
    },
  }
);

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
  navigateTo(`/self-declare/verification/${id}`);
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
        status: "OF10",
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

// const debouncedFetch = debounce(loadItem, 500);

const showFilterMenu = ref(false);

const selectedFilters = ref({
  fasilitas: "",
  jenisProduk: "",
  provinsi: "",
  lembaga: "",
  pendamping: "",
  kabupaten: "",
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

  showFilterMenu.value = false;
};

const resetFilters = () => {
  selectedFilters.value = {
    fasilitas: "",
    jenisProduk: "",
    provinsi: "",
    lembaga: "",
    pendamping: "",
    kabupaten: "",
  };

  searchQuery.value = "";

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

  showFilterMenu.value = false;
};

const isAllSelected = computed(
  () =>
    selectedItems.value.length === items.value.length && items.value.length > 0
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

const loadItemProduct = async () => {
  try {
    const response: any = await $api("/master/products", {
      method: "get",
    });

    if (response.length) {
      itemsProduct.value = response;
      return response;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const postSubmission = async (selectedItems: any) => {
  try {
    loadingAddSubmission.value = true;

    const res: any = await $api("/self-declare/verificator/submission/assign", {
      method: "post",
      body: {
        certificate_id: selectedItems,
      },
    });

    if (res?.code === 2000) {
      useSnackbar().sendSnackbar("Berhasil menambahkan data", "success");
      dialogVisible.value = false;
      loadingAddSubmission.value = false;
      selectedItems.value = [];
      emit("refresh");
    } else {
      useSnackbar().sendSnackbar("Gagal menambahkan data", "error");
      selectedItems.value = [];
      dialogVisible.value = false;
      loadingAddSubmission.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    dialogVisible.value = false;
    loadingAddSubmission.value = false;
  }
};

const loadItemFacility = async () => {
  try {
    const response: any = await $api("/master/facility", {
      method: "get",
    });

    if (response.length) {
      itemsFacility.value = response;
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
    });

    if (response.length) {
      itemsLembaga.value = response;
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
    });

    if (response.length) {
      itemsPendamping.value = response;
      return response;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const loadItemProvince = async () => {
  try {
    const response: any = await $api("/master/province", {
      method: "get",
    });

    if (response.length) {
      itemsProvince.value = response;
      return response;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const loadItemDistrict = async () => {
  try {
    const response: any = await $api("/master/district", {
      method: "post",
      body: {
        province: selectedFilters.value.provinsi,
      },
    });

    if (response.length) {
      itemsDistrict.value = response;
      return response;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

onMounted(async () => {
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
    loadItemProduct(),
    loadItemFacility(),
    loadItemLembaga(),
    loadItemPendamping(),
    loadItemProvince(),
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

const openDialog = () => {
  dialogVisible.value = true;
};
</script>

<template>
  <VBtn
    variant="flat"
    append-icon="fa-plus"
    style="margin: 1svw"
    @click="openDialog"
  >
    Ambil Data
  </VBtn>

  <VDialog v-model="dialogVisible" width="1200">
    <VCard variant="flat" class="pa-4">
      <VCardTitle>
        <VRow>
          <VCol cols="10"><h3>Data Permohonan Sertifikasi</h3></VCol>
          <VCol cols="2" style="display: flex; justify-content: end">
            <VIcon
              size="small"
              icon="fa-times"
              @click="dialogVisible = false"
            />
          </VCol>
        </VRow>
      </VCardTitle>
      <VCardText v-if="!loadingAll">
        <VRow>
          <VCol>
            <VBtn
              :disabled="selectedItems.length === 0"
              :text="buttonText"
              @click="postSubmission(selectedItems)"
              :loading="loadingAddSubmission"
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
                :disabled="items.length === 0"
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
                  :items="itemsProduct"
                  item-title="name"
                  item-value="code"
                  class="mt-3"
                />
                <VSelect
                  v-model="selectedFilters.fasilitas"
                  label="Fasilitas"
                  :items="itemsFacility"
                  class="mt-3"
                  item-title="name"
                  item-value="id"
                />
                <VSelect
                  v-model="selectedFilters.lembaga"
                  label="Lembaga"
                  :items="itemsLembaga"
                  class="mt-3"
                  item-title="name"
                  item-value="id"
                />
                <VSelect
                  v-model="selectedFilters.pendamping"
                  label="Pendamping"
                  :items="itemsPendamping"
                  class="mt-3"
                  item-title="name"
                  item-value="id"
                />
                <VSelect
                  v-model="selectedFilters.provinsi"
                  label="Provinsi"
                  :items="itemsProvince"
                  item-title="name"
                  item-value="code"
                  class="mt-3"
                  @update:modelValue="loadItemDistrict"
                />
                <VSelect
                  v-model="selectedFilters.kabupaten"
                  label="Kabupaten"
                  :items="itemsDistrict"
                  item-title="name"
                  item-value="code"
                  class="mt-3"
                />
                <VBtn block color="primary" class="mt-3" @click="applyFilters">
                  Apply Filters
                </VBtn>
                <VBtn
                  block
                  color="secondary"
                  class="mt-3"
                  @click="resetFilters"
                >
                  Reset Filters
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
            <template #item.no="{ index }">
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
                    @click="navigateAction((item as any).id_daftar)"
                  />
                </IconBtn>
                <!-- Right arrow icon for action -->
              </div>
            </template>
            <template #item.pilih="{ item }">
              <VCheckbox
                v-model="selectedItems"
                :value="(item as any).id_daftar"
              />
            </template>
            <template #item.status_code="{ item }">
              <VChip label :color="statusItem[(item as any).status_code].color">
                {{ statusItem[(item as any).status_code].desc }}
              </VChip>
            </template>
          </VDataTableServer>
        </VRow>
      </VCardText>
      <VSkeletonLoader type="card" v-else />
    </VCard>
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
