<script setup lang="ts">
import DetailFacilitateModalSend from "@/components/fasilitator/detail-facilitate-modal-send.vue";

const loading = ref(false);
const dataFasilitasi = ref();
const dataDetailRegistration = ref();
const timelineEvents = ref();
const openPanelRegisterData = ref(0);
const openPanelFacilitate = ref(0);
const openPanelTracking = ref(0);

const route = useRoute();

const facilitateId = route.params.id;

const loadItemById = async () => {
  try {
    loading.value = true;

    const response = await $api(`/facilitate/entry/${facilitateId}`, {
      method: "get",
    });

    if (response.code === 2000) {
      const { fasilitator } = response.data || {};

      const { fasilitasi, tracking, status_registrasi } = fasilitator || {};

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
      } = fasilitasi || {};

      dataFasilitasi.value = [
        {
          id: 1,
          key: "Nama Fasilitator",
          value: nama,
        },
        {
          id: 2,
          key: "Nama Program Fasilitasi",
          value: nama_program,
        },
        {
          id: 3,
          key: "Nama Penanggung Jawab Program",
          value: penanggung_jawab,
        },
        {
          id: 4,
          key: "Nomor Kontak Penanggung Jawab Program",
          value: phone_penanggung_jawab,
        },
        { id: 5, key: "Tahun", value: tahun },
        {
          id: 6,
          key: "Lingkup Wilayah Fasilitasi",
          value: lingkup_wilayah_fasilitas,
        },
        {
          id: 7,
          key: "Tanggal Mulai",
          value: formatDateIntl(new Date(tgl_mulai)),
        },
        {
          id: 8,
          key: "Tanggal Selesai",
          value: formatDateIntl(new Date(tgl_selesai)),
        },
        {
          id: 9,
          key: "Jenis Fasilitasi",
          value: jenis_fasilitasi,
        },
        {
          id: 10,
          key: "Sumber Pembiayaan",
          value: sumber_pembiayaan,
        },
        {
          id: 11,
          key: "Kuota",
          value: kuota,
        },
      ];

      dataDetailRegistration.value = status_registrasi;

      timelineEvents.value = tracking?.map((itemLembaga) => {
        const { date, status, comment } = itemLembaga;

        return {
          time: formatDateIntl(new Date(date)),
          title: status,
          description: comment,
          dotColor: "grey",
        };
      });

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

const navigateAction = () => {
  navigateTo(`/facilitation/entry/${facilitateId}/edit`);
};
</script>

<template>
  <KembaliButton />
  <VRow v-if="!loading">
    <VCol cols="6" style="display: flex; align-items: center">
      <h2>Detail Data Fasilitasi</h2>
    </VCol>
    <VCol cols="6" style="display: flex; justify-content: end">
      <div>
        <DetailFacilitateModalDelete />
        <VBtn
          density="compact"
          style="margin: 0.5svw"
          variant="outlined"
          append-icon="fa-pencil"
          @click="navigateAction"
        >
          Ubah
        </VBtn>
        <DetailFacilitateModalSend />
      </div>
    </VCol>
  </VRow>
  <VRow v-if="!loading">
    <VCol cols="8">
      <VExpansionPanels v-model="openPanelFacilitate">
        <VExpansionPanel>
          <VExpansionPanelTitle>
            <h3>Informasi Data Fasilitasi</h3>
          </VExpansionPanelTitle>
          <VExpansionPanelText>
            <VRow v-for="item in dataFasilitasi" :key="item.id" gutter="1svh">
              <VCol cols="3">
                {{ item.key }}
              </VCol>
              <VCol cols="1"> : </VCol>
              <VCol cols="8">
                {{ item.value }}
              </VCol>
            </VRow>
          </VExpansionPanelText>
        </VExpansionPanel>
      </VExpansionPanels>
    </VCol>
    <VCol cols="4">
      <VRow>
        <VCol :cols="12">
          <VExpansionPanels v-model="openPanelRegisterData">
            <VExpansionPanel>
              <VExpansionPanelTitle>
                <h2>Registration Data</h2>
              </VExpansionPanelTitle>
              <VExpansionPanelText>
                <RegisterDataFacilitate :data="dataDetailRegistration" />
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
        </VCol>
      </VRow>

      <VRow>
        <VCol :cols="12">
          <VExpansionPanels v-model="openPanelTracking">
            <VExpansionPanel>
              <VExpansionPanelTitle>
                <h2>Tracking</h2>
              </VExpansionPanelTitle>
              <VExpansionPanelText>
                <TrackingFacilitate :data="timelineEvents" />
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>

<style>
.v-btn--variant-outlined {
  color: red;
}
</style>
