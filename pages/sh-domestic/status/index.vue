<script setup lang="ts">
const dataTable = ref<any[]>([]);
const loading = ref<boolean>(false);
const page = ref<number>(1);
const size = ref<number>(10);
const searchQuery = ref<string>("");

const tableHeader = [
  { title: "No", value: "no" },
  { title: "No. Daftar", value: "no_daftar" },
  { title: "Tanggal", value: "tgl_daftar" },
  { title: "Nama PU", value: "nama_pu" },
  { title: "Jenis Daftar", value: "jenis_daftar" },
  { title: "Jenis Produk", value: "jenis_produk" },
  { title: "Status", value: "status" },
  { title: "Action", value: "action" },
];

const navigateToDetail = (item: any) => {
  if (item.channel_id == "CH003") {
    navigateTo(`/sh-domestic/status/self-declare/${item.id_reg}`);
  } else {
    navigateTo(`/sh-domestic/status/reguler/${item.id_reg}`);
  }
};

const loadItem = async (
  pageNumber: number,
  sizeData: number,
  keyword: string = "",
  path: string
) => {
  try {
    const response: any = await $api("/reguler/list", {
      method: "get",
      params: {
        pageNumber,
        sizeData,
        keyword,
        url: path,
      },
    });

    if (response?.code === 2000) dataTable.value = response?.data;
    else useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const handleInput = (e: any) => {
  debounce(
    loadItem(page.value, size.value, e.target.value, LIST_MENU_STATUS),
    500
  );
};

onMounted(async () => {
  loading.value = true;
  loadItem(page.value, size.value, searchQuery.value, LIST_MENU_STATUS);
  loading.value = false;
});
</script>

<template>
  <!-- <VRow>
    <VCol cols="12">
      <KembaliButton />
    </VCol>
  </VRow> -->
  <VRow>
    <VCol cols="12">
      <h2>Status Permohonan</h2>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardTitle><h3>Data Pengajuan</h3></VCardTitle>
        <VCardItem>
          <VRow>
            <VCol cols="12">
              <VTextField
                v-model="searchQuery"
                placeholder="Cari data"
                density="compact"
                append-inner-icon="ri-search-line"
                style="max-inline-size: 100%"
                @input="handleInput"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <VDataTable
                :headers="tableHeader"
                :items="dataTable"
                :hide-default-footer="dataTable.length === 0"
                class="border rounded"
              >
                <template #no-data>
                  <div class="w-full mt-2">
                    <div class="pt-2">
                      <img
                        src="~/assets/images/empty-data.png"
                        alt="empty_data"
                      />
                      <div class="pt-2 pb-2 font-weight-bold">Data Kosong</div>
                    </div>
                  </div>
                </template>
                <template #item.no="{ index }">
                  {{ index + 1 }}
                </template>
                <template #item.status="{ item }">
                  <div style="min-width: 14rem !important">
                    <VChip
                      color="success"
                      text-color="white"
                      small
                      variant="outlined"
                      style="margin-right: 1svw; background-color: #edf6ed"
                    >
                      {{ item?.jenis_usaha }}
                    </VChip>
                    <VChip
                      color="success"
                      text-color="white"
                      small
                      variant="outlined"
                      style="margin-right: 1svw; background-color: #edf6ed"
                    >
                      {{ item?.jumlah_produk }}
                    </VChip>
                    <VChip
                      color="primary"
                      text-color="white"
                      small
                      variant="outlined"
                      style="margin-right: 1svw; background-color: #f0e9f1"
                    >
                      {{ item.status }}
                    </VChip>
                  </div>
                </template>
                <template #item.jenis_produk="{ item }">
                  <div style="min-width: 40rem !important">
                    {{ item.jenis_produk }}
                  </div>
                </template>
                <template #item.no_daftar="{ item }">
                  <div style="min-width: 8rem !important">
                    {{ item.no_daftar }}
                  </div>
                </template>
                <template #item.tgl_daftar="{ item }">
                  <div
                    v-if="item?.tgl_daftar"
                    style="min-width: 5rem !important"
                  >
                    {{ formatDateIntl(new Date(item.tgl_daftar)) }}
                  </div>
                </template>
                <template #item.nama_pu="{ item }">
                  <div style="min-width: 8rem !important">
                    {{ item.nama_pu }}
                  </div>
                </template>
                <template #item.jenis_daftar="{ item }">
                  <div style="min-width: 8rem !important">
                    {{ item.jenis_daftar }}
                  </div>
                </template>
                <template #item.action="{ item }">
                  <VIcon
                    color="primary"
                    icon="mdi-arrow-right"
                    @click="navigateToDetail(item)"
                  />
                </template>
              </VDataTable>
            </VCol>
          </VRow>
        </VCardItem>
      </VCard>
    </VCol>
  </VRow>
</template>
