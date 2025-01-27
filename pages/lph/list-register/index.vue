<!-- eslint-disable array-callback-return -->
<script setup lang="ts">
import { ref } from "vue";

const totalItems = ref<number>(0);
const data = ref<any[]>([]);
const loading = ref<boolean>(false);
const page = ref<number>(1);
const size = ref<number>(10);
const searchQuery = ref<string>("");
const loadingAll = ref(true);

const tableHeader = [
  { title: "No", value: "no" },
  { title: "No. Daftar", value: "nomor_daftar" },
  { title: "Tanggal", value: "tanggal" },
  { title: "Nama PU", value: "nama_pu" },
  { title: "Jenis Daftar", value: "jenis_daftar" },
  { title: "Jenis Produk", value: "jenis_produk" },
  { title: "Skala Usaha dan Jumlah", value: "typeAndTotal" },
  { title: "Status", value: "status" },
  { title: "Tanggal Dikirim oleh BPJPH", value: "tgl_dikirim" },
  { title: "Action", value: "action" },
];

const getChipColor = (status: string) => {
  if (status === "Diterima") return "primary";
  else if (status === "Micre") return "success";

  return "success";
};

const loadItem = async (
  pageNumber: number,
  sizeData: number,
  search: string = ""
) => {
  loading.value = true;
  try {
    const response: any = await $api("/reguler/lph/list", {
      method: "get",
      params: {
        pageNumber,
        sizeData,
        search,
        url: LPH_LIST_REGISTER_PATH,
      },
    });

    if (response?.code === 2000) {
      response?.data?.map((item: any) => {
        item.typeAndTotal = [item?.jenis_usaha, item?.jumlah_produk];
      });
      data.value = response.data;
      totalItems.value = response.total_item;
      loading.value = false;
      return response;
    } else {
      loading.value = false;
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
    loading.value = false;
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const navigateToDetail = (id: string) => {
  navigateTo(`/lph/list-register/detail/${id}`);
};

const handleInput = (e: any) => {
  loading.value = true;
  debounce(loadItem(page.value, size.value, e.target.value), 500);
  loading.value = false;
};

onMounted(async () => {
  const res: any = await Promise.all([
    loadItem(page.value, size.value, searchQuery.value),
  ]);

  const checkResIfUndefined = res.every((item: any) => {
    return item !== undefined;
  });

  if (checkResIfUndefined) loadingAll.value = false;
  else loadingAll.value = false;
});
</script>

<template>
  <div v-if="!loadingAll">
    <!-- <VRow>
      <VCol cols="12">
        <KembaliButton />
      </VCol>
    </VRow> -->
    <VRow>
      <VCol cols="12">
        <h1 style="font-size: 32px">Tabel Daftar Ajuan</h1>
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
                  style="max-inline-size: 100%"
                  @input="handleInput"
                />
              </VCol>
            </VRow>
            <VRow>
              <VCol cols="12">
                <VDataTable
                  :headers="tableHeader"
                  :items="data"
                  :hide-default-footer="data.length === 0"
                  class="border rounded"
                >
                  <template #no-data>
                    <div class="w-full mt-2">
                      <div class="pt-2" style="justify-items: center">
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
                    {{ index + 1 }}
                  </template>
                  <template #item.nomor_daftar="{ item }">
                    <div class="mw-9">
                      {{ item.nomor_daftar }}
                    </div>
                  </template>
                  <template #item.jenis_daftar="{ item }">
                    <div class="mw-9">
                      {{ item.jenis_daftar }}
                    </div>
                  </template>
                  <template #item.jenis_produk="{ item }">
                    <div class="mw-9">
                      {{ item.jenis_produk }}
                    </div>
                  </template>
                  <template #item.nama_pu="{ item }">
                    <div class="mw-15">
                      {{ item.nama_pu }}
                    </div>
                  </template>
                  <template #item.tgl_dikirim="{ item }">
                    <div class="mw-15">
                      {{ item.tgl_dikirim }}
                    </div>
                  </template>
                  <template #item.typeAndTotal="{ item }">
                    <div class="d-flex" style="min-width: 12rem !important">
                      <VChip
                        v-for="(status, index) in item.typeAndTotal"
                        :key="index"
                        :color="getChipColor(status)"
                        label
                        class="ma-1"
                      >
                        {{ status }}
                      </VChip>
                    </div>
                  </template>
                  <template #item.status="{ item }">
                    <div class="d-flex" style="min-width: 12rem !important">
                      <VChip
                        :color="getChipColor(item.status)"
                        label
                        class="ma-1"
                      >
                        {{ item.status }}
                      </VChip>
                    </div>
                  </template>
                  <template #item.action="{ item }">
                    <VIcon
                      color="primary"
                      icon="mdi-arrow-right"
                      @click="navigateToDetail(item.id_reg)"
                    />
                  </template>
                </VDataTable>
              </VCol>
            </VRow>
          </VCardItem>
        </VCard>
      </VCol>
    </VRow>
  </div>

  <VSkeletonLoader type="card" v-else />
</template>

<style scoped>
.mw-9 {
  min-width: 9rem !important;
}
.mw-15 {
  min-width: 15rem !important;
}
</style>
