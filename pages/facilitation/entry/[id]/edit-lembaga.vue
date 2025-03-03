<script setup lang="ts">
const tabs = ref(0);
const route = useRoute();

const facilitateId = route.params.id;
const loading = ref(true);
const loadingLoadItemById = ref(true);

const form = ref({
  facilitatorName: "",
  facilitationProgramName: "",
  explanationOfFacilitation: "",
  year: "",
  regionalScope: "",
  startDate: "",
  endDate: "",
  type: "",
  sourceOfFund: "",
  kuota: "",
  picName: "",
  picPhoneNumber: "",
  provinsi_id: "",
  kabupaten_id: ""
});

const dataSOF = ref([]);

const isLockedLembaga = ref(false);

const dataDetailRegistration = ref();

const loadItemById = async () => {
  loadingLoadItemById.value = true;
  try {
    const response = await $api(`/facilitate/entry/${facilitateId}`, {
      method: "get",
    });

    if (response.code === 2000) {
      const { fasilitator } = response.data || {};

      const { fasilitasi, status_registrasi } = fasilitator || {};

      const {
        nama,
        sumber_pembiayaan,
        kuota,
        penanggung_jawab,
        nama_program,
        phone_penanggung_jawab,
        tahun,
        lingkup_wilayah_fasilitas,
        tgl_mulai,
        tgl_selesai,
        jenis_fasilitasi,
        is_locked_lembaga,
        fac_description,
        provinsi_id,
        kabupaten_id
      } = fasilitasi || {};

      dataDetailRegistration.value = status_registrasi;

      isLockedLembaga.value = is_locked_lembaga;

      form.value = {
        facilitatorName: nama,
        facilitationProgramName: nama_program,
        explanationOfFacilitation: fac_description,
        year: tahun || new Date().getFullYear(),
        regionalScope: lingkup_wilayah_fasilitas,
        startDate: formatToISOString(
          tgl_mulai || new Date(new Date().setDate(new Date().getDate() + 1))
        ),
        endDate: formatToISOString(
          tgl_selesai || new Date(new Date().setDate(new Date().getDate() + 2))
        ),
        type: jenis_fasilitasi,
        sourceOfFund: sumber_pembiayaan,
        kuota,
        picName: penanggung_jawab,
        picPhoneNumber: phone_penanggung_jawab,
        provinsi_id: provinsi_id,
        kabupaten_id: kabupaten_id
      };

      loadingLoadItemById.value = false;

      return response;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
      loadingLoadItemById.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingLoadItemById.value = false;
  }
};

const loadSOF = async () => {
  try {
    const response = await $api("/master/source-of-fund", {
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
  const res = await Promise.all([loadSOF(), loadItemById()]);

  const checkResIfUndefined = res.every((item) => {
    return item !== undefined;
  });

  if (checkResIfUndefined) {
    loading.value = false;
  } else {
    loading.value = false;
  }
});
</script>

<template>
  <VRow>
    <VCol cols="12">
      <KembaliButton />
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="4">
      <h3>Ubah Data Fasilitasi</h3>
    </VCol>
    <VSpacer />
    <VCol cols="4" class="d-flex justify-end">
      <VBtn color="error" variant="outlined" @click="$router.go(-1)">
        Batal
      </VBtn>
    </VCol>
  </VRow>
 <VRow v-if="!loading && !loadingLoadItemById">
  <VCol cols="10">
    <VTabs v-model="tabs" align-tabs="start">
      <VTab value="1">Lembaga</VTab>
    </VTabs>
  </VCol>
</VRow>
  <VRow v-if="!loading && !loadingLoadItemById">
    <VCol cols="12">
      <VTabsWindow v-model="tabs">
        <VTabsWindowItem value="1">
          <EditLembagaFacilitator
            :islockedlembaga="isLockedLembaga"
            :type="form.type"
          />
        </VTabsWindowItem>
      </VTabsWindow>
    </VCol>
  </VRow>
</template>
