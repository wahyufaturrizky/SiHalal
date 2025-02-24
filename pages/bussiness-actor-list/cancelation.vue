<script setup lang="ts">
const items = ref();
const size = ref(10);
const totalItems = ref(0);
const loading = ref(false);
const loadingAll = ref(true);
const page = ref(1);
const keyword = ref();
const query_by = ref();

const form = ref({
  keyword: null,
  query_by: null,
});

const loadItem = async ({
  page,
  size,
  keyword = "",
  query_by = "",
}: {
  page: number;
  size: number;
  keyword?: string;
  query_by?: string;
}) => {
  try {
    loading.value = true;

    const response: any = await $api("/cancelation", {
      method: "get",
      params: {
        page,
        size,
        keyword,
        query_by,
      },
    });

    if (response.code === 2000) {
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

const handleSearch = () => {
  debouncedFetch({
    page: page.value,
    size: size.value,
    keyword: form.value.keyword,
    query_by: form.value.query_by,
  });
};

const filterOptions = [
  {
    title: "No Daftar",
    value: "no_daftar",
  },
  {
    title: "Pelaku Usaha",
    value: "pelaku_usaha",
  },
];

const headers = [
  {
    title: "No",
    key: "no",
  },
  {
    title: "No Daftar",
    key: "no_daftar",
  },
  {
    title: "Tanggal",
    key: "tgl_daftar",
  },
  {
    title: "Nama PU",
    key: "nama_pu",
  },
  {
    title: "Jenis Daftar",
    key: "jenis_daftar",
  },
  {
    title: "Jenis Produk",
    key: "jenis_produk",
  },
  {
    title: "No Sertifikat",
    key: "no_sert",
  },
  {
    title: "Status",
    key: "status",
  },
];
</script>

<template>
  <h1 style="font-size: 32px">Pembatalan</h1>
  <br />

  <VCard v-if="!loadingAll" class="pa-4">
    <div class="text-h4 font-weight-bold mb-4">
      Data Pengajuan Sertifikasi Halal
    </div>

    <div class="d-flex gap-4 mb-4">
      <VSelect
        v-model="form.query_by"
        :items="filterOptions"
        placeholder="Nama Pelaku Usaha"
        class="max-w-[200px]"
      />

      <VTextField
        v-model="form.keyword"
        placeholder="Isian pencarian data"
        class="max-w-[300px]"
      />
      <VBtn
        color="primary"
        elevation="2"
        class="max-w-[500px] w-full"
        variant="flat"
        @click="handleSearch"
      >
        Cari
      </VBtn>
    </div>

    <VCard>
      <VDataTableServer
        v-model:items-per-page="size"
        v-model:page="page"
        :headers="headers"
        :items="items"
        :loading="loading"
        :items-length="totalItems"
        loading-text="Loading..."
        @update:options="
          loadItem({
            page: 1,
            size,
            keyword,
            query_by,
          })
        "
      >
        <template #item.no="{ index }">
          {{ index + 1 + (page - 1) * size }}
        </template>
        <template #item.tgl_daftar="{ item }">
          {{ formatDateIntl(new Date((item as any).tgl_daftar)) }}
        </template>
        <template #item.status="{ item }">
          <div class="status-box py-1 px-3 cursor-pointer">
            {{ (item as any).status }}
          </div>
        </template>
      </VDataTableServer>
    </VCard>
  </VCard>

  <VSkeletonLoader type="card" v-else />
</template>

<style scoped>
th {
  color: #333; /* Warna teks */
  font-size: 14px; /* Sesuaikan ukuran font */
  font-weight: normal; /* Tidak terlalu tebal */
  text-transform: none !important; /* Tidak mengubah teks menjadi uppercase */
}

.status-box {
  color: #652672;
  background-color: #f0e9f1;
  border: 1px solid #652672;
  border-radius: 8px;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
