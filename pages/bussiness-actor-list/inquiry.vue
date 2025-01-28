<script setup lang="ts">
const items = ref();
const size = ref(10);
const totalItems = ref(0);
const loading = ref(false);
const itemsStatus = ref();
const page = ref(1);
const no_daftar = ref("");
const nama_pu = ref("");
const merek_dagang = ref("");
const status = ref("");
const jenis = ref("");
const kode_fac = ref("");
const dataSOF = ref([]);
const loadingAll = ref(true);

const headers = [
  { title: "No", key: "no" },
  { title: "No Daftar", key: "no_daftar" },
  { title: "Nama PU", key: "nama_pu" },
  { title: "Tanggal", key: "tgl_daftar" },
  { title: "Jenis Daftar", key: "jenis_daftar" },
  { title: "Jenis Produk", key: "jenis_produk" },
  // { title: "Merk Dagang", key: "merk_dagang" },
  { title: "Kode Fasilitasi", key: "kode_fac" },
  { title: "Status", key: "status" },
];

const loadItem = async ({
  page,
  size,
  no_daftar,
  nama_pu,
  merek_dagang,
  status,
  jenis,
  kode_fac,
}: {
  page: number;
  size: number;
  no_daftar?: string;
  nama_pu?: string;
  merek_dagang?: string;
  status?: string;
  jenis?: string;
  kode_fac?: string;
}) => {
  try {
    loading.value = true;

    const response: any = await $api("/inquiry", {
      method: "get",
      params: {
        page,
        size,
        no_daftar,
        nama_pu,
        merek_dagang,
        status,
        jenis,
        kode_fac,
      },
    });

    if (response.code === 2000) {
      items.value = response.data || [];
      totalItems.value = response.total_item || 0;
      loading.value = false;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
      loading.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loading.value = false;
  }
};

const loadItemStatusApplication = async () => {
  try {
    const response: any = await $api("/master/application-status", {
      method: "get",
    });

    if (response.length) {
      itemsStatus.value = response;
      return response;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const loadSOF = async () => {
  try {
    const response: any = await $api("/master/source-of-fund", {
      method: "get",
    });

    if (response) {
      dataSOF.value = response;

      return response;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan asd", "error");
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

onMounted(async () => {
  const res = await Promise.all([
    loadItem({
      page: 1,
      size: size.value,
      no_daftar: no_daftar.value,
      nama_pu: nama_pu.value,
      merek_dagang: merek_dagang.value,
      status: status.value,
      jenis: jenis.value,
      kode_fac: kode_fac.value,
    }),
    loadItemStatusApplication(),
    loadSOF(),
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

const debouncedFetch = debounce(loadItem, 500);
</script>

<template>
  <h1 style="font-size: 32px">Inquiry</h1>
  <br />
  <div v-if="!loadingAll">
    <InquiryFilter
      :itemsstatus="itemsStatus"
      :datsof="dataSOF"
      @formvalue="
        debouncedFetch({
          page,
          size,
          no_daftar: $event.no_daftar,
          nama_pu: $event.nama_pu,
          merek_dagang: $event.merek_dagang,
          status: $event.status,
          jenis: $event.jenis,
          kode_fac: $event.kode_fac,
        })
      "
    />

    <VCard class="w-100 mt-5">
      <VCardTitle class="mt-3 text-h4 font-weight-bold">
        Data Pengajuan Sertifikasi Halal
      </VCardTitle>
      <VCardItem>
        <VRow>
          <VCol>
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
                  page,
                  size,
                  no_daftar,
                  nama_pu,
                  merek_dagang,
                  status,
                  jenis,
                  kode_fac,
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
          </VCol>
        </VRow>
      </VCardItem>
    </VCard>
  </div>

  <VSkeletonLoader type="card" v-else />
</template>

<style scoped lang="scss">
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
