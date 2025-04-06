<script setup lang="ts">
import { onMounted, ref } from "vue";
import { VDataTableServer } from "vuetify/components";

const items = ref<
  {
    id: string;
    nomor_daftar: string;
    tanggal_daftar: string;
    nama_pu: string;
    alamat: string;
    skala_usaha: string;
    jenis_produk: string;
    merek_dagang: string;
    laporan_sph: string;
  }[]
>([]);

const itemPerPage = ref(10);
const totalItems = ref(0);
const loading = ref(false);
const searchQuery = ref("");
const page = ref(1);
const filterLembaga = ref([]);
const filterPendamping = ref([]);
const filterFasilitasi = ref([]);
const lembaga = ref("");
const fasilitasi = ref("");
const pendamping = ref("");

const loadItem = async (
  page: number,
  size: number,
  lembaga: string = "",
  fasilitasi: string = "",
  pendamping: string = "",
  namaPengajuan: string = ""
) => {
  try {
    loading.value = true;

    const response: any = await $api(
      "/self-declare/komite-fatwa/proses-sidang",
      {
        method: "get",
        params: {
          page,
          size,
          lembaga,
          fasilitasi,
          pendamping,
          namaPengajuan,
        },
      }
    );

    items.value = response.data || [];
    totalItems.value = response.total_item || 0;
    loading.value = false;

    return response;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loading.value = false;
  }
};

const loadFilter = async () => {
  try {
    loading.value = true;

    const response1: any = await $api(
      "/self-declare/komite-fatwa/proses-sidang/filter-fasilitasi",
      {
        method: "get",
      }
    );

    const response2: any = await $api(
      "/self-declare/komite-fatwa/proses-sidang/filter-lembaga",
      {
        method: "get",
      }
    );

    filterFasilitasi.value = response1.data || [];
    filterLembaga.value = response2.data || [];
    loading.value = false;

    return response1;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loading.value = false;
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
    if (response.code == 2000) {
      if (page === 1) {
        filterPendamping.value = response.data || [];
      } else {
        filterPendamping.value = [...filterPendamping.value, ...response.data];
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
    filterPendamping.value.length < totalItemsPendamping.value &&
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
const filterSkalaUsaha = ref([]);
const getJenisProduk = async () => {
  try {
    const response4: any = await $api("/master/business-entity-scale", {
      method: "get",
    });
    filterSkalaUsaha.value = response4 || [];
  } catch (error) {}
};
const findSkalaUsahaByCode = (code) => {
  const produk = filterSkalaUsaha.value.find((item) => item.code == code);

  if (produk) {
    return produk.name;
  }
  return code;
};
onMounted(async () => {
  loading.value = true;
  await getJenisProduk();
  await loadPendamping(pagePendamping.value, itemPerPagePendamping.value);
  // await loadItem(
  //   1,
  //   itemPerPage.value,
  //   lembaga.value,
  //   fasilitasi.value,
  //   pendamping.value,
  //   searchQuery.value
  // );
  await loadFilter();
  loading.value = false;
});

const refresh = async () => {
  await loadItem(
    1,
    itemPerPage.value,
    lembaga.value,
    fasilitasi.value,
    pendamping.value,
    searchQuery.value
  );
};

const verifikatorTableHeader = [
  { title: "No", key: "no" },
  { title: "Nomor Daftar", key: "no_daftar", nowrap: true },
  { title: "Tanggal Daftar", key: "tgl_daftar", nowrap: true },
  { title: "Nama PU", key: "nama_pu" },
  { title: "Alamat", key: "alamat_pu" },
  { title: "Skala Usaha", key: "skala_usaha" },
  { title: "Jenis Produk", key: "jenis_produk" },
  { title: "Merek Dagang", key: "merek_dagang" },
  { title: "Pendamping", key: "pendamping" },
  { title: "Action", key: "action" },
];

const debouncedFetch = debounce(loadItem, 500);

const handleInput = () => {
  debouncedFetch(
    page.value,
    itemPerPage.value,
    lembaga.value,
    fasilitasi.value,
    pendamping.value,
    searchQuery.value
  );
};

const navigateAction = (id: string) => {
  navigateTo(`/sidang-fatwa/proses-sidang/${id}`, {
    open: {
      target: "_blank",
    },
  });
};

// Filter state
const showFilterMenu = ref(false);
const applyFilters = () => {
  debouncedFetch(
    page.value,
    itemPerPage.value,
    lembaga.value,
    fasilitasi.value,
    pendamping.value,
    searchQuery.value
  );
  showFilterMenu.value = false;
};

const reset = () => {
  lembaga.value = "";
  fasilitasi.value = "";
  pendamping.value = "";
  searchQuery.value = "";

  debouncedFetch(
    page.value,
    itemPerPage.value,
    fasilitasi.value,
    pendamping.value,
    searchQuery.value
  );

  showFilterMenu.value = false;
};
</script>

<template>
  <div>
    <h1 style="font-size: 32px">Tabel Pengajuan Proses Sidang</h1>
    <br />
    <VCard class="pa-4">
      <VRow>
        <VCol>
          <div class="text-h4 font-weight-bold">Data Pengajuan</div>
        </VCol>
      </VRow>
      <VRow>
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
              <VAutocomplete
                v-model="fasilitasi"
                label="Fasilitas"
                placeholder="Pilih Fasilitas"
                :items="filterFasilitasi"
                item-title="name"
                item-value="id"
                :loading="loading"
                class="mt-3"
                density="compact"
                clearable
              />

              <VSelect
                clearable
                v-model="lembaga"
                label="Lembaga"
                placeholder="Pilih Lembaga"
                :items="[{ id: '', name: 'Pilih Lembaga' }, ...filterLembaga]"
                item-title="name"
                item-value="id"
                class="mt-3"
              />
              <br />
              <VAutocomplete
                clearable
                label="Pendamping"
                :items="filterPendamping"
                v-model="pendamping"
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
              <br />
              <VBtn
                style="float: inline-start"
                text="Reset Filter"
                @click="reset"
              />
              <VBtn
                style="float: inline-end"
                color="primary"
                @click="applyFilters"
              >
                Apply Filters
              </VBtn>
            </VCard>
          </VMenu>
        </VCol>
        <VCol class="d-flex justify-sm-space-between align-center" cols="10">
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
        <VCol>
          <VDataTableServer
            :items-per-page-options="[10, 25, 50, 100]"
            v-model:items-per-page="itemPerPage"
            v-model:page="page"
            :headers="verifikatorTableHeader"
            :items="items"
            :loading="loading"
            :items-length="totalItems"
            loading-text="Loading..."
            @update:options="loadItem(page, itemPerPage, searchQuery)"
          >
            <template #item.no="{ index }">
              {{ index + 1 + (page - 1) * itemPerPage }}
            </template>
            <!--
              <template #item.tanggal_daftar="{ item }">
              {{ formatDateIntl(new Date(item?.tanggal_daftar)) || "22-07-2024"}}
              </template>
            -->
            <template #item.merek_dagang="{ item }">
              {{ item.merek_dagang }}
              <!-- Display Merek Dagang value or N/A if not available -->
            </template>
            <template #item.laporan_sph="{ item }">
              <VBtn color="secondary" @click="navigateAction(item.id)">
                Lihat Dokumen
              </VBtn>
              <!-- Button changed to "Lihat Dokumen" -->
            </template>
            <template #item.tgl_daftar="{ item }">
              {{ formatToISOString(item.tgl_daftar) }}
            </template>
            <template #item.skala_usaha="{ item }">
              {{ findSkalaUsahaByCode(item.skala_usaha) }}
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
                <!-- Right arrow icon for action -->
              </div>
            </template>
          </VDataTableServer>
        </VCol>
      </VRow>
    </VCard>
  </div>
</template>

<style scoped lang="scss"></style>
