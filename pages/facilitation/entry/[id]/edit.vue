<script setup lang="ts">
const tabs = ref(0);
const route = useRoute();

const facilitateId = route.params.id;
const loading = ref(false);

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
  facilityCode: "",
  status: "",
});

const isLockedLembaga = ref(false);

const dataDetailRegistration = ref();

const loadItemById = async () => {
  try {
    loading.value = true;

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
      } = fasilitasi || {};

      dataDetailRegistration.value = status_registrasi;

      isLockedLembaga.value = is_locked_lembaga;

      form.value = {
        facilitatorName: nama,
        facilitationProgramName: nama_program,
        explanationOfFacilitation: "Dummy Penjelasan Fasilitasi",
        year: tahun,
        regionalScope: lingkup_wilayah_fasilitas,
        startDate: formatToISOString(tgl_mulai),
        endDate: formatToISOString(tgl_selesai),
        type: jenis_fasilitasi,
        sourceOfFund: sumber_pembiayaan,
        kuota,
        picName: penanggung_jawab,
        picPhoneNumber: phone_penanggung_jawab,
        facilityCode: "",
        status: "Draft",
      };

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

onMounted(async () => {
  await loadItemById();
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
  <VRow v-if="!loading">
    <VCol cols="10">
      <VTabs v-model="tabs" align-tabs="start">
        <VTab value="1"> Pengajuan </VTab>

        <VTab :disabled="!form.type" value="2"> Lembaga </VTab>
      </VTabs>
    </VCol>
  </VRow>
  <VRow v-if="!loading">
    <VCol cols="12">
      <VTabsWindow v-model="tabs">
        <VTabsWindowItem value="1">
          <EditPengajuanFacilitator
            :dataform="form"
            :datadetailregistration="dataDetailRegistration"
          />
        </VTabsWindowItem>
        <VTabsWindowItem value="2">
          <EditLembagaFacilitator
            :islockedlembaga="isLockedLembaga"
            :type="form.type"
          />
        </VTabsWindowItem>
      </VTabsWindow>
    </VCol>
  </VRow>
</template>
