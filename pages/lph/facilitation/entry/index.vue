<script setup lang="ts">
const items = ref();
const itemPerPage = ref(10);
const totalItems = ref(0);
const loading = ref(false);

const page = ref(1);
const searchQuery = ref("");
const status = ref("OF12");
const loadingAll = ref(true);

const defaultStatus = { color: "error", desc: "Unknown Status" };

const statusItem: any = new Proxy(
  {
    OF1: { color: "grey-300", desc: "Draft" },
    OF10: { color: "success", desc: "Submitted" },
    OF12: { color: "success", desc: "Verifikasi LPH" },
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

const loadItem = async (
  page: number,
  size: number,
  keyword: string = "",
  status: string = ""
) => {
  try {
    loading.value = true;

    const response = await $api("/facilitate/entry-lph", {
      method: "get",
      params: {
        page,
        size,
        keyword,
        status,
      },
    });

    if (response) {
      items.value = response.data;
      totalItems.value = response.total_item;
      loading.value = false;

      return response;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
      loading.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loading.value = false;
  }
};

const debouncedFetch = debounce(loadItem, 500);

onMounted(async () => {
  const res = await Promise.all([
    loadItem(1, itemPerPage.value, "", status.value),
  ]);

  const checkResIfUndefined = res.every((item) => {
    return item !== undefined;
  });

  if (checkResIfUndefined) loadingAll.value = false;
  else loadingAll.value = false;
});

const handleInput = () => {
  debouncedFetch(
    page.value,
    itemPerPage.value,
    searchQuery.value,
    status.value
  );
};

const tableHeader = [
  { title: "No", key: "id" },
  // { title: "Kode Fasilitasi", key: "kode_fac" },
  { title: "Tahun", key: "tahun" },
  { title: "Nama Fasilitasi", key: "fac_name" },
  // { title: "Sumber Pembiayaan", key: "sumber_biaya_name" },
  { title: "Jenis", key: "jenis" },
  { title: "Tanggal Aktif", key: "tgl_selesai" },
  { title: "Tanggal Selesai", key: "tgl_aktif" },
  // { title: "Kuota", key: "kuota" },
  // { title: "Sisa", key: "sisa" },
  { title: "Status", key: "status_code" },
  { title: "Action", key: "action" },
];

const navigateAction = (id: string) => {
  navigateTo(`/lph/facilitation/entry/${id}`);
};
</script>

<template>
  <VRow>
    <VCol>
      <h1 style="font-size: 32px">Verifikasi Fasilitasi</h1>
    </VCol>
  </VRow>
  <VRow v-if="!loadingAll">
    <VCol>
      <VCard>
        <VCardTitle>
          <div class="text-h4 font-weight-bold">List Fasilitasi</div>
        </VCardTitle>
        <VCardItem>
          <VRow>
            <VCol cols="6">
              <VTextField
                v-model="searchQuery"
                placeholder="Cari data"
                append-icon="mdi-magnify"
                @input="handleInput"
              />
            </VCol>
            <VCol cols="6" style="display: flex; justify-content: end">
              <EntryFacilitateModal />
            </VCol>
          </VRow>
          <VRow>
            <VDataTableServer
              :items-per-page-options="[10, 25, 50, 100]"
              v-model:items-per-page="itemPerPage"
              v-model:page="page"
              :headers="tableHeader"
              :items="items"
              :loading="loading"
              :items-length="totalItems"
              loading-text="Loading..."
              @update:options="loadItem(page, itemPerPage, searchQuery, status)"
            >
              <template #item.id="{ index }">
                {{ index + 1 + (page - 1) * itemPerPage }}
              </template>
              <template #item.tgl_aktif="{ item }">
                {{ formatDateIntl(new Date((item as any).tgl_aktif)) }}
              </template>
              <template #item.tgl_selesai="{ item }">
                {{ formatDateIntl(new Date((item as any).tgl_selesai)) }}
              </template>
              <template #item.status_code="{ item }">
                <VChip
                  label
                  :color="statusItem[(item as any).status_code].color"
                >
                  {{ statusItem[(item as any).status_code].desc }}
                </VChip>
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
            </VDataTableServer>
          </VRow>
        </VCardItem>
      </VCard>
    </VCol>
  </VRow>
</template>
