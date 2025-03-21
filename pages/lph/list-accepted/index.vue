<script setup lang="ts">
const loading = ref<boolean>(false);
const page = ref<number>(1);
const size = ref<number>(10);
const searchQuery = ref<string>("");
const dataTable = ref<any>(null);
const totalItems = ref<number>(0);

const tableHeader = [
  { title: "No", value: "no" },
  { title: "No. Daftar", value: "nomor_daftar" },
  { title: "Tanggal", value: "tanggal" },
  { title: "Nama PU", value: "nama_pu" },
  { title: "Jenis Daftar", value: "jenis_daftar" },
  { title: "Jenis Produk", value: "jenis_produk" },
  { title: "Tanggal Dikirim oleh BPJPH", value: "tgl_dikirim" },
  { title: "Action", value: "action" },
];

const navigateToDetail = (id: string) => {
  navigateTo(`/lph/list-accepted/detail/${id}`);
};

const loadItem = async (
  pageNumber: number,
  sizeData: number,
  search: string = "",
  path: string
) => {
  try {
    const params = {
      page: pageNumber,
      size: sizeData,
      search,
      url: path,
    };

    const response: any = await $api("/reguler/lph/list", {
      method: "get",
      params,
    });

    if (response?.code === 2000) {
      totalItems.value = response.total_item;
      dataTable.value = response?.data;
      loading.value = false;

      return response.data;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const handleInput = (e: any) => {
  debounce(
    loadItem(
      page.value,
      size.value,
      e.target.value,
      LIST_DAFTAR_AJUAN_DITERIMA
    ),
    500
  );
};

onMounted(() => {
  loading.value = true;
  loadItem(
    page.value,
    size.value,
    searchQuery.value,
    LIST_DAFTAR_AJUAN_DITERIMA
  );
  loading.value = false;
});
watch([page, size], () => {
  loadItem(
    page.value,
    size.value,
    searchQuery.value,
    LIST_DAFTAR_AJUAN_DITERIMA
  );
});
</script>

<template>
  <div v-if="!loading">
    <!-- <VRow>
      <VCol cols="12">
        <KembaliButton></KembaliButton>
      </VCol>
    </VRow> -->
    <VRow>
      <VCol cols="12">
        <h1 style="font-size: 32px;">Daftar Ajuan Diterima</h1>
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12">
        <VCard>
          <VCardTitle>
            <div class="text-h4 font-weight-bold">Data Pengajuan</div>
          </VCardTitle>
          <VCardItem>
            <VRow>
              <VCol cols="12">
                <VTextField
                  v-model="searchQuery"
                  placeholder="Cari Nama Pengajuan"
                  density="compact"
                  append-inner-icon="ri-search-line"
                  style="max-inline-size: 100%;"
                  @input="handleInput"
                />
              </VCol>
            </VRow>
            <VRow>
              <VCol cols="12">
                <VDataTableServer
                  v-if="dataTable"
                  v-model:items-per-page="size"
                  v-model:page="page"
                  :items-length="totalItems"
                  :loading="loading"
                  :headers="tableHeader"
                  :items="dataTable"
                  class="border rounded"
                >
                  <template #no-data>
                    <div class="w-full mt-2">
                      <div class="pt-2" style="justify-items: center;">
                        <img
                          src="~/assets/images/empty-data.png"
                          alt="empty_data"
                        />
                        <div class="pt-2 pb-2 font-weight-bold">
                          Data Kosong
                        </div>
                      </div>
                    </div>
                  </template>
                  <template #item.no="{ index }">
                    {{ index + 1 + (page - 1) * size }}
                  </template>
                  <template #item.status="{ item }">
                    <VChip
                      color="success"
                      text-color="white"
                      small
                      variant="outlined"
                      style=" background-color: #edf6ed;margin-inline-end: 1svw;"
                    >
                      1
                    </VChip>
                    <VChip
                      color="success"
                      text-color="white"
                      small
                      variant="outlined"
                      style=" background-color: #edf6ed;margin-inline-end: 1svw;"
                    >
                      3
                    </VChip>
                    <VChip
                      color="primary"
                      text-color="white"
                      small
                      variant="outlined"
                      style=" background-color: #f0e9f1;margin-inline-end: 1svw;"
                    >
                      {{ (item as any).status }}
                    </VChip>
                  </template>
                  <template #item.action="{ item }">
                    <VIcon
                      @click="navigateToDetail((item as any).id_reg)"
                      color="primary"
                      icon="mdi-arrow-right"
                    ></VIcon>
                  </template>
                </VDataTableServer> </VCol
            ></VRow>
          </VCardItem>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>
