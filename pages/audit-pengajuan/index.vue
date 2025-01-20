<script setup lang="ts">
const snackBar = useSnackbar();

interface AuditPengajuan {
  id_reg: string;
  jenis_daftar: string;
  jenis_produk: string;
  jenis_usaha: string;
  jumlah_produk: number;
  nama_pu: string;
  nomor_daftar: string;
  status: string;
  tanggal: string;
  tgl_dikirim: string;
}

interface ApiResponse {
  code: number;
  data: AuditPengajuan[];
  message: string;
}

interface Payload {
  page: number;
  size: number;
  search?: string;
}

const headers = [
  { title: "No", value: "no" },
  { title: "No. Daftar", key: "nomor_daftar", nowrap: true },
  { title: "Tanggal", key: "tanggal", nowrap: true },
  { title: "Nama PU", key: "nama_pu", nowrap: true },
  { title: "Jenis Daftar", key: "jenis_daftar", nowrap: true },
  { title: "Jenis Produk", key: "jenis_produk", nowrap: true },
  { title: "Status", key: "status", nowrap: true },
  { title: "Action", value: "action", sortable: false, nowrap: true },
];

const items = ref([]);

const searchQuery = ref("");
const currentPage = ref(1);
const size = ref(10);
const totalItems = ref(0);

const loadItem = async (page: number, size: number, search: string): void => {
  try {
    const response = await $api("/reguler/auditor", {
      method: "GET",
      params: { page, size, search },
    });

    if (response.code === 2000) {
      currentPage.value = response.current_page;
      totalItems.value = response.total_item;
      response?.data?.map((item: any) => {
        item.newStatus = [item?.jenis_usaha, item?.jumlah_produk, item.status];
      });
      items.value = response.data;
    }
  } catch (e) {
    snackBar.sendSnackbar("Terjadi Kesalahan ", "error");
  }
};

// TODO -> BIKIN LOGIC BUAT SET CHIP COLOR
const getChipColor = (status: string) => {
  if (status === "Proses di LPH") return "primary";
  else if (status === "Micre") return "success";

  return "success";
};

const debouncedFetch = debounce(loadItem, 500);
const handleInput = () => debouncedFetch(1, size.value, searchQuery.value);

// onMounted(
//   await loadItem(1, size.value)
// )
</script>

<template>
  <div>
    <!-- <KembaliButton class="pl-0" /> -->
    <h2 style="font-size: 32px">Audit Pengajuan</h2>
    <br />

    <VCard class="pa-4">
      <VCardTitle class="d-flex justify-space-between align-center">
        <span class="text-h5 font-weight-bold"
          >Daftar Pengajuan untuk Dilakukan Audit</span
        >
      </VCardTitle>
      <VCardItem>
        <VTextField
          v-model="searchQuery"
          density="compact"
          placeholder="Cari Tagihan"
          append-inner-icon="ri-search-line"
          style="max-inline-size: 100%"
          @input="handleInput"
        />
      </VCardItem>
      <VCardItem>
        <VDataTableServer
          v-model:items-per-page="size"
          v-model:page="currentPage"
          :items-length="totalItems"
          :headers="headers"
          :items="items"
          item-value="no"
          class="elevation-1 border rounded"
          @update:options="loadItem(page, size, searchQuery)"
          :hide-default-footer="totalItems < 10"
        >
          <template #no-data>
            <div class="pt-2">
              <img src="~/assets/images/empty-data.png" alt="" />
              <div class="pt-2 font-weight-bold">Data Kosong</div>
            </div>
          </template>
          <template #[`item.newStatus`]="{ item }">
            <div class="d-flex">
              <VChip
                v-for="(status, index) in item.newStatus"
                :key="index"
                :color="getChipColor(status)"
                label
                class="ma-1"
              >
                {{ status }}
              </VChip>
            </div>
          </template>
          <template #item.action="{ item }">
            <VIcon
              color="primary"
              style="cursor: pointer"
              class="ic-center"
              @click="navigateTo(`/audit-pengajuan/${item.id_reg}`)"
            >
              ri-arrow-right-line
            </VIcon>
          </template>
          <template #[`item.no`]="{ index }">
            <span>{{ index + 1 }}</span>
          </template>
        </VDataTableServer>
      </VCardItem>
    </VCard>
  </div>
</template>

<style lang="scss" scoped>
.ic-center {
  display: flex;
  place-self: center;
}
</style>
