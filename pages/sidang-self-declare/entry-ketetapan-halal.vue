<script setup lang="ts">
import { computed, ref } from "vue";
import { useDisplay } from "vuetify";
import { VDataTableServer } from "vuetify/components";

const items = ref<
  {
    id: string;
    no_daftar: string;
    tgl_sidang: string;
    tgl_daftar: string;
    nama_pu: string;
    alamat: string;
    kota_pu: string;
    jenis_produk: string;
    merek_dagang: string;
    no_kh: string;
    keteteapan: string;
    catatan1: string;
    catatan2: string;
  }[]
>([]);

const itemPerPage = ref(10);
const totalItems = ref(0);
const loading = ref(false);
const loadingAll = ref(true);
const searchQuery = ref("");
const startDate = ref("");
const endDate = ref("");
const page = ref(1);
const ketetapan = ref("");
const average = ref(0);
const showFilterMenu = ref(false);
const totalWorkingDays = ref(0);

const headers = [
  { title: "No", key: "no" },
  { title: "Nomor Daftar", key: "no_daftar", nowrap: true },
  { title: "Nama PU", key: "nama_pu", nowrap: true },
  { title: "Alamat", key: "alamat", nowrap: true },
  { title: "Kabupaten", key: "kota_pu", nowrap: true },
  { title: "Jenis Produk", key: "jenis_produk", nowrap: true },
  // { title: "Merk Dagang", key: "merek_dagang", nowrap: true },
  { title: "Tanggal Sidang", key: "tgl_sidang", nowrap: true },
  { title: "Tanggal Daftar", key: "tgl_daftar", nowrap: true },
  { title: "Nomor KH", key: "no_kh", nowrap: true },
  { title: "Ketetapan", key: "keteteapan", nowrap: true },
  { title: "Catatan 1", key: "catatan", nowrap: true },
  { title: "Catatan 2", key: "catatan2", nowrap: true },
  { title: "Action", key: "action" },
];

const loadItem = async (
  page: number,
  size: number,
  startDate: string,
  endDate: string,
  ketetapan: string,
  searchQuery: string,
  workingDays: number
) => {
  try {
    loading.value = true;

    const response: any = await $api(
      "/self-declare/komite-fatwa/entri-ketetapan-halal",
      {
        method: "get",
        params: {
          page,
          size,
          startDate,
          endDate,
          ketetapan,
          searchQuery,
          workingDays,
        },
      }
    );

    if (response.code === 2000) {
      items.value = response.data || [];
      totalItems.value = response.total_item || 0;
      loading.value = false;
      average.value = response.rata_rata || 0;

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

// const debouncedFetch = debounce(loadItem, 500)

// const handleInput = () => {
//   debouncedFetch({
//     page: page.value,
//     size: itemPerPage.value,
//     startDate: startDate.value,
//     endDate: endDate.value,
//     ketetapan: ketetapan.value,
//   })
// }

const selectable = [
  { id: 0, value: "", title: "semua" },
  { id: 1, value: "Ditetapkan Halal", title: "Ditetapkan Halal" },
  { id: 2, value: "Dikembalikan", title: "Dikembalikan" },
  { id: 3, value: "Ditolak", title: "Ditolak" },
];
const findProdukByCode = (code) => {
  const produk = filterProduk.value.find((item) => item.code == code);
  if (produk) {
    return produk.name;
  }
  return code;
};
const filterProduk = ref([]);

const getJenisProduk = async () => {
  try {
    const response4: any = await $api(
      "/self-declare/komite-fatwa/proses-sidang/filter-produk",
      {
        method: "get",
      }
    );
    filterProduk.value = response4.data || [];
  } catch (error) {}
};
onMounted(async () => {
  const res = await Promise.all([getJenisProduk()]);

  const checkResIfUndefined = res.every((item) => {
    return item !== undefined;
  });

  if (checkResIfUndefined) loadingAll.value = false;
  else loadingAll.value = false;
});

const debouncedFetch = debounce(loadItem, 500);

const handleInput = () => {
  debouncedFetch(
    page.value,
    itemPerPage.value,
    startDate.value,
    endDate.value,
    ketetapan.value,
    searchQuery.value,
    totalWorkingDays.value
  );
};

const applyFilters = () => {
  debouncedFetch(
    page.value,
    itemPerPage.value,
    startDate.value,
    endDate.value,
    ketetapan.value,
    searchQuery.value,
    totalWorkingDays.value
  );
  showFilterMenu.value = false;
};

const reset = () => {
  startDate.value = "";
  endDate.value = "";
  ketetapan.value = "";
  totalWorkingDays.value = 0;
  debouncedFetch(
    page.value,
    itemPerPage.value,
    startDate.value,
    endDate.value,
    ketetapan.value,
    searchQuery.value,
    totalWorkingDays.value
  );
  showFilterMenu.value = false;
};

// TODO -> LOGIC BUAT NGE UPDATE DATA BY FILTER
// const onUpdate = () => {
//   console.log('UPDATE FILTE ', filter.value)
// }

// TODO -> BIKIN LOGIC BUAT SET CHIP COLOR
const getChipColor = (status: string) => {
  if (status === "Ditetapkan Halal") return "success";

  return "primary";
};

const { mdAndUp } = useDisplay();

const dialogMaxWidth = computed(() => {
  return mdAndUp.value ? 400 : "90%";
});
const routeStore = useCommonRoutingStore();
const route = useRoute();

const navigateAction = (id: string) => {
  routeStore.setPreviousRoute(route.fullPath);
  routeStore.setCurrentRoute(`/sidang-fatwa/proses-sidang/${id}`);
  navigateTo(`/sidang-fatwa/proses-sidang/${id}`, {
    open: {
      target: "_blank",
    },
  });
};
</script>

<template>
  <div>
    <h1 style="font-size: 32px">Hasil Penetapan</h1>
    <br />

    <VCard class="pa-4">
      <VCardTitle class="d-flex justify-space-between align-center">
        <div class="text-h4 font-weight-bold">Daftar Hasil</div>
      </VCardTitle>
      <VCardItem>
        <VRow no-gutters class="d-flex align-center">
          <VCol cols="2">
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
              <VCard :min-width="dialogMaxWidth">
                <VCardItem>
                  <VRow class="mb-1">
                    <VCol cols="6">
                      <VLabel for="startDate"> Tanggal Sidang </VLabel>
                      <VTextField
                        id="startDate"
                        v-model="startDate"
                        type="date"
                      />
                    </VCol>
                    <VCol cols="6">
                      <VLabel for="endDate"> Sampai </VLabel>
                      <VTextField id="endDate" v-model="endDate" type="date" />
                    </VCol>
                  </VRow>
                  <VCardText class="pa-0 mb-1">
                    <VLabel>Ketetapan</VLabel>
                    <VSelect
                      v-model="ketetapan"
                      :items="selectable"
                      placeholder="Pilih Ketetapan"
                      class="mb-1"
                    />
                  </VCardText>
                  <VCardText class="pa-0 mb-1">
                    <VLabel>Jumlah Hari Kerja</VLabel>
                    <VTextField
                      v-model="totalWorkingDays"
                      type="number"
                      placeholder="Isi Jumlah Hari Kerja"
                    />
                  </VCardText>
                  <VCardText class="pa-0">
                    <VLabel>Rata-Rata</VLabel>
                    <VTextField
                      v-model="average"
                      type="number"
                      disabled
                      placeholder="Isi Rata-Rata"
                    />
                  </VCardText>
                  <br />
                  <VBtn
                    style="float: inline-start"
                    text="Reset Filter"
                    @click="reset"
                  />
                  <VBtn
                    style="float: inline-end"
                    text="Apply"
                    @click="applyFilters"
                  />
                </VCardItem>
              </VCard>
            </VMenu>
          </VCol>
          <VCol>
            <VTextField
              v-model="searchQuery"
              density="compact"
              placeholder="Search Data"
              append-inner-icon="ri-search-line"
              @input="handleInput"
            />
          </VCol>
        </VRow>
      </VCardItem>
      <VCardItem>
        <VDataTableServer
          disable-sort
          :items-per-page-options="[10, 25, 50, 100]"
          v-model:items-per-page="itemPerPage"
          v-model:page="page"
          :headers="headers"
          :items="items"
          :loading="loading"
          :items-length="totalItems"
          loading-text="Loading..."
          @update:options="
            loadItem(
              page,
              itemPerPage,
              startDate,
              endDate,
              ketetapan,
              searchQuery,
              totalWorkingDays
            )
          "
        >
          <template #item.no="{ index }">
            {{ index + 1 + (page - 1) * itemPerPage }}
          </template>
          <template #item.tgl_sidang="{ item }">
            {{ formatToISOString(item.tgl_sidang) }}
          </template>
          <template #item.tgl_daftar="{ item }">
            {{ formatToISOString(item.tgl_daftar) }}
          </template>
          <template #item.jenis_produk="{ item }">
            {{ findProdukByCode(item.jenis_produk) }}
          </template>
          <template #[`item.keteteapan`]="{ item }">
            <div class="d-flex flex-wrap">
              <VChip
                :key="item.id"
                :color="getChipColor(item.keteteapan)"
                label
                class="ma-1"
              >
                {{ item.keteteapan }}
              </VChip>
            </div>
          </template>
          <template #item.action="{ item }">
            <div class="d-flex gap-1">
              <IconBtn size="small">
                <VIcon
                  icon="ri-arrow-right-line"
                  color="primary"
                  @click="navigateAction((item as any).id_reg)"
                />
              </IconBtn>
              <!-- Right arrow icon for action -->
            </div>
          </template>
        </VDataTableServer>
      </VCardItem>
    </VCard>
  </div>
</template>
