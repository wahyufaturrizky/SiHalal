<script setup lang="ts">
const items = ref();
const size = ref(10);
const totalItems = ref(0);
const loading = ref(false);
const loadingStatus = ref(false);
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

    const response = await $api("/inquiry", {
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
      items.value = response.data;
      totalItems.value = response.total_item;
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
    const response = await $api("/master/application-status", {
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
    const response = await $api("/master/source-of-fund", {
      method: "get",
    });

    if (response.length) {
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
    loadSOF(),
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
  <h1 class="mb-3">
    <b> Inquiry </b>
  </h1>
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
    <TabelInquiryPengajuanSertifikasiHalal
      :loading="loading"
      :totalitems="totalItems"
      :page="page"
      :items="items"
      :size="size"
      class="mt-12"
      @updatetable="
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
    />
  </div>
</template>
