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
  { title: "Pilih", key: "pilih", fixed: true, sortable: false },
  { title: "No", key: "no", align: "center", sortable: false },
  { title: "ID Daftar", key: "id_daftar", sortable: false },
  { title: "No Daftar", key: "no_daftar", sortable: true },
  { title: "Tanggal Daftar", key: "tgl_daftar", sortable: true },
  { title: "Nama PU", key: "nama", sortable: false },
  { title: "Alamat", key: "alamat", sortable: false },
  { title: "Jenis Produk", key: "jenis_produk", sortable: false },
  { title: "Merk Dagang", key: "merek_dagang", sortable: false },
  { title: "Status", key: "status_code", sortable: false },
  { title: "Action", key: "action", fixed: true, sortable: false },
];
const authUser = useMyAuthUserStore();

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
    OF71: { color: "success", desc: "Selesai P3H" },
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
  sortBy,
  sortByField,
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
  sortBy: string;
  sortByField: string;
}) => {
  try {
    loading.value = true;
    // Ambil user & cek pelaku_usaha_id dengan lebih singkat
    const user = authUser?.user;
    if (user?.roles?.[0]?.code === "R.44" && user.pelaku_usaha_id?.Valid) {
      lembaga = user.pelaku_usaha_id.String;
    }
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
        status: "OF71",
        channel_id: "CH003,CH004",
        shortBy: sortBy,
        shortByField: sortByField,
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
const loadItemReturn = async ({
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
        status: "OF71",
        channel_id: "CH003,CH004",
      },
    });
    return response;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const debouncedFetch = debounce(loadItem, 500);

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

const isAllSelected = computed(() => {
  return (
    items.value.length > 0 && selectedItems.value.length === items.value.length
  );
});

// Toggle select all
const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedItems.value = [];
  } else {
    selectedItems.value = items.value.map((item) => item.id_daftar);
  }
};

watch(selectedItems, () => {
  if (selectedItems.value.length !== items.value.length) {
    // Jika ada yang tidak tercentang, pastikan checkbox utama tidak aktif
  }
});

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

const postSubmission = async () => {
  try {
    if (selectedItems.value.length === 0) return;

    loadingAddSubmission.value = true;
    const res = await $api("/self-declare/verificator/submission/assign", {
      method: "post",
      body: { certificate_id: selectedItems.value },
    });

    if (res?.code === 2000) {
      useSnackbar().sendSnackbar("Berhasil menambahkan data", "success");
      emit("refresh");
    } else {
      throw new Error("Gagal menambahkan data");
    }
  } catch (error) {
    useSnackbar().sendSnackbar(error.message || "Ada Kesalahan", "error");
  } finally {
    dialogVisible.value = false;
    loadingAddSubmission.value = false;
    selectedItems.value = [];
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
    const user = authUser?.user;
    let idLp: string | undefined;
    if (user?.roles?.[0]?.code === "R.44" && user.pelaku_usaha_id?.Valid) {
      idLp = user.pelaku_usaha_id.String;
    }

    const response: any = await $api("/master/lembaga", {
      method: "get",
      params: {
        // hanya tambahkan id_lp kalau idLp !== undefined
        ...(idLp ? { id_lp: idLp } : {}),
      },
    });
    if (response.length) {
      if (idLp && itemsLembaga.value.length > 0) {
        selectedFilters.value.lembaga = response[0].id;
      }
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

const openDialog = async () => {
  dialogVisible.value = true;

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
    loadPendamping(1, 10),
    // loadItemPendamping(),
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
};
const loadPendamping = async (page, item, name = "") => {
  try {
    loadingPendamping.value = true;
    const response: any = await $api(
      "/self-declare/komite-fatwa/proses-sidang/filter-pendamping",
      {
        method: "get",
        params: {
          page,
          item,
          name,
        },
      }
    );
    console.log("response pendamping ", response);
    if (response.code == 2000) {
      if (page === 1) {
        itemsPendamping.value = response.data || [];
        console.log("items Pendamping : ", itemsPendamping.value);
      } else {
        itemsPendamping.value = [...itemsPendamping.value, ...response.data];
      }
      totalItemsPendamping.value = response.total_item || 0;
      return;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  } finally {
    loadingPendamping.value = false;
  }
};
const loadMorePendamping = () => {
  if (
    itemsPendamping.value.length < totalItemsPendamping.value &&
    !loadingPendamping.value
  ) {
    pagePendamping.value += 1;
    loadPendamping(pagePendamping.value, itemPerPagePendamping.value, "");
  }
};
const totalItemsPendamping = ref(0);
const searchPendamping = ref("");
const pagePendamping = ref(1);
const itemPerPagePendamping = ref(0);
const loadingPendamping = ref(false);
const debouncedFetchPendamping = debounce(loadPendamping, 500);

const handleInputPendamping = (val: any) => {
  pagePendamping.value = 1;
  debouncedFetchPendamping(
    pagePendamping.value,
    itemPerPagePendamping.value,
    val.target.value
  );
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
                @update:modelValue="toggleSelectAll"
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
                <!-- <VSelect
                  v-model="selectedFilters.pendamping"
                  label="Pendamping"
                  :items="itemsPendamping"
                  class="mt-3"
                  item-title="name"
                  item-value="id"
                /> -->
                <br />
                <VAutocomplete
                  :items="itemsPendamping"
                  v-model="selectedFilters.pendamping"
                  label="Pendamping"
                  item-value="id"
                  item-title="name"
                  density="compact"
                  placeholder="Pilih atau Cari Pendamping"
                  :loading="loadingPendamping"
                  @input="handleInputPendamping"
                >
                  <template #item="{ props, item }">
                    <VListItem v-bind="props" :title="(item.raw as any).name">
                    </VListItem>
                  </template>
                  <template #append-item>
                    <div v-intersect="loadMorePendamping" />
                  </template>
                </VAutocomplete>
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
              style="max-inline-size: 100%"
              @input="handleInput"
            />
          </VCol>
        </VRow>
        <VRow>
          <VDataTableServer
            :items-per-page-options="[10, 25, 50, 100]"
            v-model:items-per-page="itemPerPage"
            v-model:page="page"
            :headers="headers"
            :items="items"
            :loading="loading"
            :items-length="totalItems"
            loading-text="Loading..."
            style="white-space: nowrap"
            @update:options="
              (newFilter) =>
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
                  sortBy: newFilter?.sortBy?.[0]?.order || '',
                  sortByField: newFilter?.sortBy?.[0]?.key || '',
                })
            "
          >
            <template #item.no="{ index }">
              {{ index + 1 + (page - 1) * itemPerPage }}
            </template>
            <template #item.tgl_daftar="{ item }">
              {{
                item.tgl_daftar != ""
                  ? formatDateIntl(new Date((item as any).tgl_daftar))
                  : ""
              }}
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
