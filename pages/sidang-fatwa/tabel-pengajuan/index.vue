<script setup lang="ts">
import { onMounted, ref } from "vue";
import { VDataTableServer } from "vuetify/components";

const items = ref([]);
const loadingAll = ref(true);

const itemPerPage = ref(10);
const totalItems = ref(0); // Total dummy data
const loading = ref(false);
const page = ref(1);

const searchQuery = ref("");

const loadItem = async ({
  page,
  size,
  keyword,
}: {
  page: number;
  size: number;
  keyword: string;
}) => {
  try {
    loading.value = true;

    const response: any = await $api("/sidang-fatwa/proses-sidang-fatwa", {
      method: "get",
      params: {
        page,
        size,
        keyword,
      },
    });

    if (response.code === 2000) {
      items.value = response.data || [];
      totalItems.value = response.total_item || 0;
      loading.value = false;
      return response;
    } else {
      loading.value = false;
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loading.value = false;
  }
};

const debouncedFetch = debounce(loadItem, 500);

onMounted(async () => {
  const res = await Promise.all([
    loadItem({
      page: page.value,
      size: itemPerPage.value,
      keyword: searchQuery.value,
    }),
  ]);

  const checkResIfUndefined = res.every((item: any) => {
    return item !== undefined;
  });

  if (checkResIfUndefined) {
    loadingAll.value = false;
  } else {
    loadingAll.value = false;
  }
});

const verifikatorTableHeader = [
  { title: "No", key: "no" },
  { title: "Nomor Daftar", key: "no_daftar" },
  { title: "Tanggal Daftar", key: "tgl_daftar" },
  { title: "Nama PU", key: "nama_pu" },
  { title: "Alamat", key: "alamat" },
  { title: "Skala Usaha", key: "skala_usaha" },
  { title: "Jenis Produk", key: "jenis_produk" },
  { title: "Merek Dagang", key: "merek_dagang" },
  // { title: "Lihat Laporan SPH", key: "laporan_sph" },
  { title: "Action", key: "action" },
];

const handleInput = () => {
  debouncedFetch({
    page: page.value,
    size: itemPerPage.value,
    keyword: searchQuery.value,
  });
};

const navigateAction = (id: string) => {
  navigateTo(`/sidang-fatwa/tabel-pengajuan/${id}`);
};
</script>

<template>
  <div>
    <h2 style="font-size: 32px">Tabel Pengajuan Proses Sidang</h2>
    <br />
    <VCard class="pa-4">
      <VRow v-if="!loadingAll">
        <VCol>
          <p class="text-h5">Data Pengajuan</p>
        </VCol>
      </VRow>
      <VRow v-if="!loadingAll">
        <VCol class="d-flex justify-sm-space-between align-center">
          <VTextField
            v-model="searchQuery"
            density="compact"
            placeholder="Search Data"
            append-inner-icon="ri-search-line"
            @input="handleInput"
          />
        </VCol>
      </VRow>
      <VRow v-if="!loadingAll">
        <VCol>
          <VDataTableServer
            v-model:items-per-page="itemPerPage"
            v-model:page="page"
            :headers="verifikatorTableHeader"
            :items="items"
            :loading="loading"
            :items-length="totalItems"
            loading-text="Loading..."
            @update:options="
              loadItem({
                page: page,
                size: itemPerPage,
                keyword: searchQuery,
              })
            "
          >
            <template #item.no="{ index }">
              {{ index + 1 + (page - 1) * itemPerPage }}
            </template>
            <template #item.tgl_daftar="{ item }">
              {{ formatDate((item as any).tgl_daftar) }}
            </template>
            <template #item.laporan_sph="{ item }">
              <VBtn color="primary" @click="navigateAction((item as any).id)">
                {{
                  (item as any).laporan_sph
                    ? "Lihat Dokumen"
                    : "Tidak Ada Dokumen"
                }}
              </VBtn>
            </template>
            <template #item.action="{ item }">
              <div class="d-flex gap-1">
                <VIcon
                  icon="ri-arrow-right-line"
                  color="primary"
                  @click="navigateAction((item as any).id)"
                />
              </div>
            </template>
          </VDataTableServer>
        </VCol>
      </VRow>

      <VSkeletonLoader type="card" v-else />
    </VCard>
  </div>
</template>

<style scoped lang="scss"></style>
