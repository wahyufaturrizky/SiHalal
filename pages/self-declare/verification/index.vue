<script setup lang="ts">
import { ref } from "vue";
import { VDataTableServer } from "vuetify/components";

const items = ref([]);
const itemPerPage = ref(10);
const totalItems = ref(0);
const loading = ref(false);
const loadingAll = ref(true);
const page = ref(1);
const searchQuery = ref("");
const status = ref("");
const itemsStatus = ref<any[]>([]);

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

// Table headers
const headers: any = [
  { title: "No", key: "id", align: "center" },
  { title: "ID Registrasi", key: "id_daftar" },
  { title: "Nomor Daftar", key: "nomor_daftar" },
  { title: "Tanggal Daftar", key: "tgl_daftar" },
  { title: "Nama PU", key: "nama" },
  { title: "Alamat", key: "alamat" },
  { title: "Jenis Produk", key: "jenis_produk" },
  { title: "Merk Dagang", key: "merk_dagang" },
  { title: "Nama Pendamping", key: "pendamping" },
  { title: "Status", key: "status_code" },
  { title: "Action", key: "action" },
];

const handleInput = () => {
  debouncedFetch(
    page.value,
    itemPerPage.value,
    searchQuery.value,
    status.value
  );
};

const navigateAction = (id: string) => {
  navigateTo(`/self-declare/verification/${id}`);
};

const loadItem = async (
  page: number,
  size: number,
  keyword: string = "",
  status: string = ""
) => {
  try {
    loading.value = true;

    const response: any = await $api("/self-declare/verificator", {
      method: "get",
      params: {
        page,
        size,
        keyword,
        status,
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

const loadItemStatusApplication = async () => {
  try {
    const response: any = await $api("/master/application-status", {
      method: "get",
    });

    if (response.length) {
      itemsStatus.value = response;
      return response;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const debouncedFetch = debounce(loadItem, 500);

onMounted(async () => {
  const res = await Promise.all([
    loadItem(1, itemPerPage.value, "", status.value),
    loadItemStatusApplication(),
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
  <VCard v-if="!loadingAll" variant="flat" class="pa-4">
    <VCardTitle>
      <VRow>
        <VCol cols="10">
          <h3>Data Pengajuan</h3>
        </VCol>
        <VCol cols="2" style="display: flex; justify-content: end">
          <DataPermohonanSertifikasi />
        </VCol>
      </VRow>
    </VCardTitle>
    <VCardText>
      <VRow>
        <VCol />
      </VRow>
      <VRow>
        <VCol cols="3">
          <VSelect
            v-model="status"
            placeholder="Pilih Status"
            :items="itemsStatus"
            item-title="name"
            item-value="code"
            @update:modelValue="loadItem(1, itemPerPage, searchQuery, $event)"
          />
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
          v-model:items-per-page="itemPerPage"
          v-model:page="page"
          :headers="headers"
          :items="items"
          :loading="loading"
          :items-length="totalItems"
          loading-text="Loading..."
          @update:options="loadItem(page, itemPerPage, searchQuery, status)"
        >
          <template #item.id="{ index }">
            {{ index + 1 + (page - 1) * itemPerPage }}
          </template>
          <template #item.tgl_daftar="{ item }">
            {{ formatDateIntl(new Date((item as any).TanggalDaftar)) }}
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
            </div>
          </template>
          <template #item.status_code="{ item }">
            <VChip label :color="statusItem[(item as any).status_code].color">
              {{ statusItem[(item as any).status_code].desc }}
            </VChip>
          </template>
        </VDataTableServer>
      </VRow>
    </VCardText>
  </VCard>
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
