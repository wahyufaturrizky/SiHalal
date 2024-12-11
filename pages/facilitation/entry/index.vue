<script setup lang="ts">
const items = ref();
const itemPerPage = ref(10);
const totalItems = ref(0);
const loading = ref(false);

const page = ref(1);
const searchQuery = ref("");
const status = ref("OF1,OF10,OF5,OF2,OF290,OF15");
const loadingAll = ref(true);

const loadItem = async (
  page: number,
  size: number,
  keyword: string = "",
  status: string = ""
) => {
  try {
    loading.value = true;

    const response = await $api("/facilitate/entry", {
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

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "lunas":
      return "success";
    case "pending":
      return "warning";
    case "telat":
      return "error";
    default:
      return "grey";
  }
};

const debouncedFetch = debounce(loadItem, 500);

onMounted(async () => {
  const res = await Promise.all([
    loadItem(1, itemPerPage.value, "", "OF1,OF10,OF5,OF2,OF290,OF15"),
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

const handleInput = () => {
  debouncedFetch(
    page.value,
    itemPerPage.value,
    searchQuery.value,
    "OF1,OF10,OF5,OF2,OF290,OF15"
  );
};

const tableHeader = [
  { title: "No", key: "id" },
  { title: "Kode Fasilitasi", key: "kode_fac" },
  { title: "Tahun", key: "tahun" },
  { title: "Nama Fasilitasi", key: "fac_name" },
  { title: "Sumber Pembiayaan", key: "sumber_biaya_name" },
  { title: "Jenis", key: "jenis" },
  { title: "Tanggal Aktif", key: "tgl_selesai" },
  { title: "Tanggal Selesai", key: "tgl_aktif" },
  { title: "Kuota", key: "kuota" },
  { title: "Sisa", key: "sisa" },
  { title: "Status", key: "status" },
  { title: "Action", key: "action" },
];

const navigateAction = (id: string) => {
  navigateTo(`/facilitation/entry/${id}`);
};
</script>

<template>
  <VRow>
    <VCol><h3>Entri Fasilitasi</h3></VCol>
  </VRow>
  <VRow v-if="!loadingAll">
    <VCol>
      <VCard>
        <VCardTitle><h4>List Fasilitasi</h4></VCardTitle>
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
                {{ formatDateIntl(new Date(item.tgl_aktif)) }}
              </template>
              <template #item.tgl_selesai="{ item }">
                {{ formatDateIntl(new Date(item.tgl_selesai)) }}
              </template>
              <template #item.status="{ item }">
                <VChip
                  :color="getStatusColor(item.status)"
                  text-color="white"
                  small
                >
                  {{ item.status }}
                </VChip>
              </template>
              <template #item.action="{ item }">
                <div class="d-flex gap-1">
                  <IconBtn size="small">
                    <VIcon
                      icon="ri-arrow-right-line"
                      color="primary"
                      @click="navigateAction(item.id)"
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
