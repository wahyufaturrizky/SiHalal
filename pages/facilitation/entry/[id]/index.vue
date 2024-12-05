<script setup lang="ts">
const loading = ref(false);
const loadingSOF = ref(false);
const loadingSubmit = ref(false);
const loadingDelete = ref(false);
const visibleModalKirim = ref(false);
const visibleModalHapus = ref(false);
const dataFasilitasi = ref();
const dataDetailRegistration = ref();
const timelineEvents = ref();
const openPanelRegisterData = ref(0);
const openPanelFacilitate = ref(0);
const openPanelTracking = ref(0);
const dataSOF = ref([]);

const route = useRoute();
const router = useRouter();

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
        fac_description,
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
          key: "Fasilitasi Deskripsi",
          value: fac_description,
        },
        {
          id: 5,
          key: "Nomor Kontak Penanggung Jawab Program",
          value: phone_penanggung_jawab,
        },
        { id: 6, key: "Tahun", value: tahun },
        {
          id: 7,
          key: "Lingkup Wilayah Fasilitasi",
          value: lingkup_wilayah_fasilitas,
        },
        {
          id: 8,
          key: "Tanggal Mulai",
          value: tgl_mulai ? formatDateIntl(new Date(tgl_mulai)) : "",
        },
        {
          id: 9,
          key: "Tanggal Selesai",
          value: tgl_selesai ? formatDateIntl(new Date(tgl_selesai)) : "",
        },
        {
          id: 10,
          key: "Jenis Fasilitasi",
          value: jenis_fasilitasi,
        },
        {
          id: 11,
          key: "Sumber Pembiayaan",
          value: sumber_pembiayaan,
        },
        {
          id: 12,
          key: "Kuota",
          value: kuota,
        },
      ];

      dataDetailRegistration.value = status_registrasi;

      timelineEvents.value = tracking?.map((itemLembaga: any) => {
        const { date, status, comment } = itemLembaga || {};

        return {
          time: date ? formatDateIntl(new Date(date)) : "",
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
    console.log("@error", error);

    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loading.value = false;
  }
};

const submitFacilitate = async () => {
  try {
    loadingSubmit.value = true;

    const res = await $api(`/facilitate/entry/submit/${facilitateId}`, {
      method: "post",
    });

    console.log(res);

    if (res?.code === 2000) {
      router.go(-1);
      loadingSubmit.value = false;
      visibleModalKirim.value = false;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
      loadingSubmit.value = false;
      visibleModalKirim.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingSubmit.value = false;
    visibleModalKirim.value = false;
  }
};

const deleteFacilitate = async () => {
  try {
    loadingDelete.value = true;

    const res = await $api(`/facilitate/entry/delete/${facilitateId}`, {
      method: "post",
    });

    console.log(res);

    if (res?.code === 2000) {
      router.go(-1);
      loadingDelete.value = false;
      visibleModalHapus.value = false;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
      loadingDelete.value = false;
      visibleModalHapus.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingDelete.value = false;
    visibleModalHapus.value = false;
  }
};

const loadSOF = async () => {
  try {
    loadingSOF.value = true;

    const response = await $api("/master/source-of-fund", {
      method: "get",
    });

    if (response.length) {
      dataSOF.value = response;

      loadingSOF.value = false;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan asd", "error");
      loadingSOF.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingSOF.value = false;
  }
};

onMounted(async () => {
  await loadItemById();
  await loadSOF();
});

const navigateAction = () => {
  navigateTo(`/facilitation/entry/${facilitateId}/edit`);
};

const formatSof = (val: string) => {
  return dataSOF.value.find((item: any) => item.code === val)?.name;
};
</script>

<template>
  <KembaliButton />
  <VRow v-if="!loading && !loadingSOF">
    <VCol cols="6" style="display: flex; align-items: center">
      <h2>Detail Data Fasilitasi</h2>
    </VCol>
    <VCol cols="6" style="display: flex; justify-content: end">
      <div>
        <VBtn
          density="compact"
          style="margin: 0.5svw"
          variant="outlined"
          color="#E1442E"
          @click="visibleModalHapus = true"
        >
          <VIcon style="color: #e1442e" icon="fa-trash" />
        </VBtn>

        <VDialog v-model="visibleModalHapus" max-width="50svw">
          <VCard style="padding: 1svw">
            <VCardTitle><h3>Hapus Pengajuan</h3></VCardTitle>
            <VCardItem>
              <p>Yakin ingin menghapus pengajuan fasilitasi?</p>
            </VCardItem>
            <VCardActions>
              <VBtn
                variant="outlined"
                density="compact"
                @click="visibleModalHapus = false"
              >
                Batal
              </VBtn>
              <VBtn
                color="#E1442E"
                variant="flat"
                density="compact"
                :disabled="loadingDelete"
                @click="deleteFacilitate"
              >
                {{ loadingDelete ? "Loading..." : "Ya, Hapus" }}
              </VBtn>
            </VCardActions>
          </VCard>
        </VDialog>

        <VBtn
          density="compact"
          style="margin: 0.5svw"
          variant="outlined"
          append-icon="fa-pencil"
          @click="navigateAction"
        >
          Ubah
        </VBtn>

        <VBtn
          density="compact"
          style="margin: 0.5svw"
          variant="flat"
          append-icon="fa-paper-plane"
          @click="visibleModalKirim = true"
        >
          Kirim
        </VBtn>

        <VDialog v-model="visibleModalKirim" max-width="50svw">
          <VCard>
            <VCardTitle><h3>Kirim Pengajuan</h3></VCardTitle>
            <VCardItem>
              <p>Yakin ingin mengirim pengajuan fasilitasi?</p>
            </VCardItem>
            <VCardActions>
              <VBtn
                variant="outlined"
                density="compact"
                @click="visibleModalKirim = false"
              >
                Batal
              </VBtn>
              <VBtn
                :disabled="loadingSubmit"
                variant="flat"
                density="compact"
                @click="submitFacilitate"
              >
                {{ loadingSubmit ? "Loading..." : "Kirim" }}
              </VBtn>
            </VCardActions>
          </VCard>
        </VDialog>
      </div>
    </VCol>
  </VRow>
  <VRow v-if="!loading && !loadingSOF">
    <VCol cols="8">
      <VExpansionPanels v-model="openPanelFacilitate">
        <VExpansionPanel>
          <VExpansionPanelTitle>
            <h3>Informasi Data Fasilitasi</h3>
          </VExpansionPanelTitle>
          <VExpansionPanelText>
            <VRow v-for="item in dataFasilitasi" :key="item.id" gutter="1svh">
              <template v-if="item.key === 'Sumber Pembiayaan'">
                <VCol cols="3">
                  {{ item.key }}
                </VCol>
                <VCol cols="1"> : </VCol>
                <VCol cols="8">
                  {{ formatSof(item.value) }}
                </VCol>
              </template>
              <template v-else>
                <VCol cols="3">
                  {{ item.key }}
                </VCol>
                <VCol cols="1"> : </VCol>
                <VCol cols="8">
                  {{ item.value }}
                </VCol>
              </template>
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
