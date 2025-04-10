<script setup lang="ts">
import LPHDetailLayout from "@/layouts/LPHDetailLayout.vue";
import { useI18n } from "vue-i18n";

const route = useRoute();
const id = route?.params?.id;

const openedLeftPanels = ref([0, 1, 2, 3, 4, 5]);
const openedRightPanels = ref([0, 1, 2]);
const loading = ref(false);
const detailData = ref<any>(null);

const { t } = useI18n();

const assignAuditorHeader: any[] = [
  { title: "No", key: "index" },
  { title: "Nama", key: "name" },
  { title: "Tanggal Lahir", key: "birthDate" },
  { title: "No Reg", key: "regisNumber" },
  { title: "Action", key: "actions", align: "center", sortable: false },
];

const aspectLegalHeader = [
  { title: "No.", key: "id_reg_legal", nowrap: true },
  {
    title: `${t("status-permohoanan.reguler-detail-legal-jenis")}`,
    key: "jenis_surat",
    nowrap: true,
  },
  {
    title: `${t("status-permohoanan.reguler-detail-legal-nodok")}`,
    key: "no_surat",
    nowrap: true,
  },
  {
    title: `${t("status-permohoanan.reguler-detail-legal-tanggal")}`,
    key: "tanggal_surat",
    nowrap: true,
  },
  {
    title: `${t("status-permohoanan.reguler-detail-legal-expired")}`,
    key: "masa_berlaku",
    nowrap: true,
  },
  {
    title: `${t("status-permohoanan.reguler-detail-legal-issuer")}`,
    key: "instansi_penerbit",
    nowrap: true,
  },
];

const outletHeaders = [
  { title: "No.", key: "no", nowrap: true },
  {
    title: `${t("status-permohoanan.reguler-detail-out-nama")}`,
    key: "nama_outlet",
    nowrap: true,
  },
  {
    title: `${t("status-permohoanan.reguler-detail-out-alamat")}`,
    key: "alamat_outlet",
    nowrap: true,
  },
  {
    title: `${t("status-permohoanan.reguler-detail-out-status")}`,
    key: "status_milik",
    nowrap: true,
  },
];

const penyeliaHalalHeaders = [
  { title: "No.", key: "no", nowrap: true },
  {
    title: `${t("status-permohoanan.reguler-detail-produk-nama")}`,
    key: "penyelia_nama",
    nowrap: true,
  },
  {
    title: `${t("status-permohoanan.reguler-detail-produk-nama")}`,
    key: "no_ktp",
    nowrap: true,
  },
  {
    title: `${t("status-permohoanan.reguler-detail-produk-nama")}`,
    key: "no_kontak",
    nowrap: true,
  },
  {
    title: `${t("status-permohoanan.reguler-detail-ph-sertif")}`,
    key: "tgl_penyelia_halal",
    nowrap: true,
  },
  {
    title: `${t("status-permohoanan.reguler-detail-ph-sk")}`,
    key: "tanggal_sk",
    nowrap: true,
  },
];

const produkHeaders = [
  { title: "No", key: "no" },
  {
    title: `${t("status-permohoanan.produk-serivices")}`,
    key: "layanan_produk",
  },
  { title: `${t("status-permohoanan.produk-type")}`, key: "jenis_produk" },
  { title: `${t("status-permohoanan.produk-class")}`, key: "kelas_produk" },
  {
    title: `${t("status-permohoanan.produk-rincian")}`,
    key: "rincian_prooduk",
  },
  { title: `${t("status-permohoanan.produk-name")}`, key: "nama_produk" },
  {
    title: `${t("status-permohoanan.produk-publication")}`,
    key: "publication",
  },
];

const pabrikHeader = [
  { title: "No", key: "no" },
  { title: `${t("status-permohoanan.pabrik-name")}`, key: "nama_pabrik" },
  { title: `${t("status-permohoanan.pabrik-address")}`, key: "alamat_pabrik" },
  { title: `${t("status-permohoanan.pabrik-status")}`, key: "status_milik" },
];

const assignAuditorData = ref([
  { name: "Idris", birthDate: "02/10/2000", regisNumber: "SK-896376-3028" },
]);

const newAuditorData = {
  name: "Aliando Syakir",
  birthDate: "02/10/2000",
  regisNumber: "SK-896376-3028",
};

const assignedAuditor = ref(null);
const isAssignModalOpen = ref(false);
const isUpdateModalOpen = ref(false);

const downloadForms = reactive({
  sttd: "",
  sertifikasi_halal: "",
}) as Record<string, string>;

const handleOpenAssignModal = () => {
  isAssignModalOpen.value = !isAssignModalOpen.value;
};

const handleOpenUpdateModal = () => {
  isUpdateModalOpen.value = !isUpdateModalOpen.value;
};

const handleAddAuditor = () => {
  assignAuditorData.value.push(newAuditorData);
};

const handleDeleteAuditor = (index: number) => {
  assignAuditorData.value.splice(index, 1);
};

const handleSaveAuditor = () => {
  useSnackbar().sendSnackbar("Berhasil mengirim pengajuan data", "success");
};

const handleUpdateStatus = () => {
  const snackbarMessage = assignedAuditor.value
    ? "Berhasil mengupdate status data"
    : "Gagal mengupdate status, silahkan assign auditor";

  const snackbarType = assignedAuditor.value ? "success" : "error";

  useSnackbar().sendSnackbar(snackbarMessage, snackbarType);
};

const totalPageAspek = ref(0);
const totalPagePabrik = ref(0);
const totalPageOutlet = ref(0);
const totalPagePenyelia = ref(0);
const totalPageProduk = ref(0);

const allPagesAspek = ref<any[]>([]);
const allPagesPabrik = ref<any[]>([]);
const allPagesOutlet = ref<any[]>([]);
const allPagesPenyelia = ref<any[]>([]);
const allPagesProduk = ref<any[]>([]);

const getSertifikasiDetail = async () => {
  try {
    const response: any = await $api("/reguler/lph/detail-payment", {
      method: "get",
      params: { url: `${SERTIFIKASI_DETAIL}/${id}/detail` },
    });

    if (response?.code === 2000) {
      detailData.value = response.data || {};
      allPagesAspek.value = response.data.aspek_legal || [];
      allPagesPabrik.value = response.data.pabrik || [];
      allPagesOutlet.value = response.data.outlet || [];
      allPagesPenyelia.value = response.data.penyelia_halal || [];
      allPagesProduk.value = response.data.produk || [];

      totalPageAspek.value = response.data.aspek_legal.length;
      totalPagePabrik.value = response.data.pabrik.length;
      totalPageOutlet.value = response.data.outlet.length;
      totalPagePenyelia.value = response.data.penyelia_halal.length;
      totalPageProduk.value = response.data.produk.length;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const getDownloadForm = async (docName: string, propName: string) => {
  const result: any = await $api(`/self-declare/submission/${id}/file`, {
    method: "get",
    query: {
      document: docName,
    },
  });

  if (result?.code === 2000) downloadForms[propName] = result?.data?.file || "";
};

const handleDownloadForm = async (fileName: string, type: string) => {
  return await downloadDocument(fileName, type);
};

const handleCertificate = async (fileName: string, type: string) => {
  if (fileName == "") {
    const response = await $api("/certificate/regenerate", {
      method: "post",
      body: {
        document_type: "certificate-reguler",
        ref_id: id,
      },
    });

    if (response) {
      if (response.code == 4001) {
        useSnackbar().sendSnackbar(
          "Ada kesalahan saat TTE sertifikat, silahkan coba beberapa saat lagi",
          "error"
        );

        return;
      }
      fileName = response.filename;
      await getSertifikasiDetail();
    }
  }

  return await downloadDocument(fileName, type);
};

const itemsPerPage = ref(10);
const currentPageAspek = ref(1);
const currentPagePabrik = ref(1);
const currentPageOutlet = ref(1);
const currentPagePenyelia = ref(1);
const currentPageProduk = ref(1);

const halamanAspek = computed(() =>
  Math.ceil(totalPageAspek.value / itemsPerPage.value)
);

const paginatedAspek = computed(() => {
  const start = (currentPageAspek.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;

  return allPagesAspek.value.slice(start, end);
});

const changePageAspek = (page: number) => {
  currentPageAspek.value = page;
};

const halamanPabrik = computed(() =>
  Math.ceil(totalPagePabrik.value / itemsPerPage.value)
);

const paginatedPabrik = computed(() => {
  const start = (currentPagePabrik.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;

  return allPagesPabrik.value.slice(start, end);
});

const changePagePabrik = (page: number) => {
  currentPagePabrik.value = page;
};

const halamanOutlet = computed(() =>
  Math.ceil(totalPageOutlet.value / itemsPerPage.value)
);

const paginatedOutlet = computed(() => {
  const start = (currentPageOutlet.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;

  return allPagesOutlet.value.slice(start, end);
});

const changePageOutlet = (page: number) => {
  currentPageOutlet.value = page;
};

const halamanPenyelia = computed(() =>
  Math.ceil(totalPagePenyelia.value / itemsPerPage.value)
);

const paginatedPenyelia = computed(() => {
  const start = (currentPagePenyelia.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;

  return allPagesPenyelia.value.slice(start, end);
});

const changePagePenyelia = (page: number) => {
  currentPagePenyelia.value = page;
};

const halamanProduk = computed(() =>
  Math.ceil(totalPageProduk.value / itemsPerPage.value)
);

const paginatedProduk = computed(() => {
  const start = (currentPageProduk.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;

  return allPagesProduk.value.slice(start, end);
});

const changePageProduk = (page: number) => {
  currentPageProduk.value = page;
};

onMounted(async () => {
  loading.value = true;
  await Promise.allSettled([
    getSertifikasiDetail(),
    getDownloadForm("sttd", "sttd"),
    getDownloadForm("setifikasi-halal", "setifikasi_halal"),
  ]);
  loading.value = false;
});
</script>

<template>
  <div v-if="!loading">
    <LPHDetailLayout>
      <template #page-title>
        <VRow no-gutters>
          <VCol>
            <h1>{{ t("status-permohoanan.reguler-detail-header-title") }}</h1>
          </VCol>
        </VRow>
      </template>
      <template #left-content>
        <VExpansionPanels
          v-model="openedLeftPanels"
          expand-icon="fa-chevron-down"
          collapse-icon="fa-chevron-up"
          multiple
        >
          <VExpansionPanel :value="0" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              {{ t("status-permohoanan.reguler-detail-pengajuan-title") }}
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <PengajuanSertifikasiHalal
                type="READ"
                :data-pengajuan="detailData?.certificate_halal"
              />
            </VExpansionPanelText>
          </VExpansionPanel>
          <VExpansionPanel :value="1" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              {{ t("status-permohoanan.reguler-detail-pic-title") }}
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                :name="t(`status-permohoanan.reguler-detail-pic-nama`)"
              >
                {{ detailData?.penanggung_jawab?.nama_pj || "-" }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                :name="t(`status-permohoanan.reguler-detail-pic-telp`)"
              >
                {{ detailData?.penanggung_jawab?.nomor_kontak_pj || "-" }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                :name="t(`status-permohoanan.reguler-detail-pic-email`)"
              >
                {{ detailData?.penanggung_jawab?.email_pj || "-" }}
              </InfoRow>
            </VExpansionPanelText>
          </VExpansionPanel>
          <VExpansionPanel :value="2" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              {{ t("status-permohoanan.reguler-detail-legal-title") }}
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <TableSertifikasiHalal
                :data="paginatedAspek"
                :headers="aspectLegalHeader"
                :items-per-page="itemsPerPage"
                :current-page="currentPageAspek"
              />
              <VPagination
                v-model="currentPageAspek"
                :length="halamanAspek"
                :style="{ marginTop: '20px' }"
                @update:model-value="changePageAspek"
              />
            </VExpansionPanelText>
          </VExpansionPanel>
          <VExpansionPanel :value="3" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              {{ t("status-permohoanan.reguler-detail-fac-title") }}
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <TableSertifikasiHalal
                :data="paginatedPabrik"
                :headers="pabrikHeader"
                :items-per-page="itemsPerPage"
                :current-page="currentPagePabrik"
              />
              <VPagination
                v-model="currentPagePabrik"
                :length="halamanPabrik"
                :style="{ marginTop: '20px' }"
                @update:model-value="changePagePabrik"
              />
            </VExpansionPanelText>
          </VExpansionPanel>
          <VExpansionPanel :value="4" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              {{ t("status-permohoanan.reguler-detail-out-title") }}
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <TableSertifikasiHalal
                :data="paginatedOutlet"
                :headers="outletHeaders"
                :items-per-page="itemsPerPage"
                :current-page="currentPageOutlet"
              />
              <VPagination
                v-model="currentPageOutlet"
                :length="halamanOutlet"
                :style="{ marginTop: '20px' }"
                @update:model-value="changePageOutlet"
              />
            </VExpansionPanelText>
          </VExpansionPanel>
          <VExpansionPanel :value="5" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              {{ t("status-permohoanan.reguler-detail-ph-title") }}
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <TableSertifikasiHalal
                :data="paginatedPenyelia"
                :headers="penyeliaHalalHeaders"
                :items-per-page="itemsPerPage"
                :current-page="currentPagePenyelia"
              />
              <VPagination
                v-model="currentPagePenyelia"
                :length="halamanPenyelia"
                :style="{ marginTop: '20px' }"
                @update:model-value="changePagePenyelia"
              />
            </VExpansionPanelText>
          </VExpansionPanel>
          <VExpansionPanel :value="6" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              {{ t("status-permohoanan.reguler-detail-produk-title") }}
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <TableSertifikasiHalal
                :data="paginatedProduk"
                :headers="produkHeaders"
                :items-per-page="itemsPerPage"
                :current-page="currentPageProduk"
              />
              <VPagination
                v-model="currentPageProduk"
                :length="halamanProduk"
                :style="{ marginTop: '20px' }"
                @update:model-value="changePageProduk"
              />
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
      </template>
      <template #right-content>
        <VExpansionPanels
          v-model="openedRightPanels"
          expand-icon="fa-chevron-down"
          collapse-icon="fa-chevron-up"
          multiple
        >
          <VExpansionPanel :value="0" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              {{ t("status-permohoanan.reguler-detail-form-title") }}
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <InfoRowV2
                class="d-flex align-center"
                :name="t(`status-permohoanan.reguler-detail-form-sttd`)"
                :style="{ fontWeight: '600' }"
              >
                <VBtn
                  :color="downloadForms.sttd ? 'primary' : '#A09BA1'"
                  density="compact"
                  class="px-2"
                  @click="
                    downloadForms.sttd
                      ? handleDownloadForm(downloadForms.sttd, 'FILES')
                      : null
                  "
                >
                  <template #default>
                    <VIcon icon="fa-download" />
                  </template>
                </VBtn>
              </InfoRowV2>
              <InfoRowV2
                class="d-flex align-center"
                :name="t(`status-permohoanan.reguler-detail-form-sh`)"
                :style="{ fontWeight: '600' }"
              >
                <VBtn
                  color="primary"
                  :disabled="
                    !detailData?.tracking.some(
                      (track) =>
                        track.status == 'OF100' ||
                        track.status == 'OF120' ||
                        track.status == 'OF300'
                    )
                  "
                  density="compact"
                  class="px-2"
                  @click="
                    detailData?.tracking.some(
                      (track) =>
                        track.status == 'OF100' ||
                        track.status == 'OF120' ||
                        track.status == 'OF300'
                    )
                      ? handleCertificate(
                          downloadForms.setifikasi_halal,
                          'SERT'
                        )
                      : null
                  "
                >
                  <template #default>
                    <VIcon icon="fa-download" />
                  </template>
                </VBtn>

                <!--
                  <VBtn color="#A09BA1" density="compact" class="px-2">
                  <template #default>
                  <VIcon icon="fa-download" />
                  </template>
                  </VBtn>
                -->
              </InfoRowV2>
              <InfoRowV2
                class="d-flex align-center"
                name="Download QR Label"
                :style="{ fontWeight: '600' }"
              >
                <VBtn
                  :color="
                    detailData?.certificate_halal.status == 'Terbit SH'
                      ? 'primary'
                      : '#A09BA1'
                  "
                  density="compact"
                  class="px-2"
                  @click="
                    detailData?.certificate_halal.status == 'Terbit SH'
                      ? downloadCert(
                          detailData?.sertifikat_halal_info.nomor_sertifikat
                        )
                      : null
                  "
                >
                  <template #default>
                    <VIcon icon="fa-download" />
                  </template>
                </VBtn>
              </InfoRowV2>
            </VExpansionPanelText>
          </VExpansionPanel>
          <VExpansionPanel :value="1" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              {{ t("status-permohoanan.reguler-detail-reg-title") }}
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <div v-if="detailData?.certificate_halal">
                <!-- <Pendaftaran :data="detailData?.certificate_halal" /> -->
                <VContainer>
                  <VRow>
                    <VCol cols="3">
                      {{ t("status-permohoanan.reguler-detail-reg-nodaftar") }}
                    </VCol>
                    <VCol cols="1"> : </VCol>
                    <VCol cols="8">
                      {{ detailData?.certificate_halal.no_daftar }}
                    </VCol>
                  </VRow>
                  <VRow>
                    <VCol cols="3">
                      {{ t("status-permohoanan.reguler-detail-reg-tanggal") }}
                    </VCol>
                    <VCol cols="1"> : </VCol>
                    <VCol
                      v-if="detailData?.certificate_halal?.tgl_daftar"
                      cols="8"
                    >
                      {{
                        formatDateIntl(
                          new Date(detailData?.certificate_halal?.tgl_daftar)
                        )
                      }}
                    </VCol>
                  </VRow>
                  <VRow>
                    <VCol cols="3">
                      {{ t("status-permohoanan.reguler-detail-reg-jnsdaftar") }}
                    </VCol>
                    <VCol cols="1"> : </VCol>
                    <VCol cols="8">
                      {{ detailData?.certificate_halal.jenis_pengajuan }}
                    </VCol>
                  </VRow>
                  <VRow>
                    <VCol cols="3">
                      {{
                        t("status-permohoanan.reguler-detail-reg-tempatdaftar")
                      }}
                    </VCol>
                    <VCol cols="1"> : </VCol>
                    <VCol cols="8">
                      {{ detailData?.certificate_halal.tempat }}
                    </VCol>
                  </VRow>
                  <VRow>
                    <VCol cols="3">
                      {{ t("status-permohoanan.reguler-detail-reg-channel") }}
                    </VCol>
                    <VCol cols="1"> : </VCol>
                    <VCol cols="8">
                      {{ detailData?.certificate_halal.channel }}
                    </VCol>
                  </VRow>
                  <VRow>
                    <VCol cols="3">
                      {{ t("status-permohoanan.reguler-detail-reg-status") }}
                    </VCol>
                    <VCol cols="1"> : </VCol>
                    <VCol cols="8">
                      <VChip
                        variant="outlined"
                        style="
                          border-color: #652672;
                          border-radius: 8px;
                          background-color: #f0e9f1;
                        "
                      >
                        <span style="color: #652672">
                          {{ detailData?.certificate_halal.status }}
                        </span>
                      </VChip>
                    </VCol>
                  </VRow>
                  <VRow>
                    <VCol cols="3">
                      {{
                        t("status-permohoanan.reguler-detail-reg-fasilitator")
                      }}
                    </VCol>
                    <VCol cols="1"> : </VCol>
                    <VCol cols="8">
                      {{ detailData?.certificate_halal.fasilitator_name }}
                    </VCol>
                  </VRow>
                  <VRow>
                    <VCol cols="3">
                      {{ t("status-permohoanan.reguler-detail-reg-kodefas") }}
                    </VCol>
                    <VCol cols="1"> : </VCol>
                    <VCol cols="8">
                      {{ detailData?.certificate_halal.kode_fac }}
                    </VCol>
                  </VRow>
                </VContainer>
              </div>
            </VExpansionPanelText>
          </VExpansionPanel>
          <VExpansionPanel :value="2" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              {{ t("status-permohoanan.reguler-detail-sh-title") }}
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <div v-if="detailData?.sertifikat_halal_info">
                <VContainer>
                  <VRow>
                    <VCol cols="3">
                      {{ t("status-permohoanan.reguler-detail-sh-nosert") }}
                    </VCol>
                    <VCol cols="1"> : </VCol>
                    <VCol cols="8">
                      {{ detailData?.sertifikat_halal_info.nomor_sertifikat }}
                    </VCol>
                  </VRow>
                  <VRow>
                    <VCol cols="3">
                      {{ t("status-permohoanan.reguler-detail-sh-tglsert") }}
                    </VCol>
                    <VCol cols="1"> : </VCol>
                    <VCol cols="8">
                      {{
                        formatDateId(
                          detailData?.sertifikat_halal_info.tanggal_sertifikat
                        )
                      }}
                    </VCol>
                  </VRow>
                </VContainer>
              </div>
            </VExpansionPanelText>
          </VExpansionPanel>
          <VExpansionPanel :value="3" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              {{ t("status-permohoanan.reguler-detail-inspection-title") }}
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <div v-if="detailData?.pemeriksaan">
                <div class="d-flex flex-column ga-4">
                  <VRow no-gutters>
                    <VCol cols="5">
                      <div class="d-flex justify-space-between">
                        <div class="text-h6">
                          {{
                            t(
                              "status-permohoanan.reguler-detail-inspection-lph"
                            )
                          }}
                        </div>
                        <div class="me-2">:</div>
                      </div>
                    </VCol>
                    <VCol cols="7">
                      {{ detailData?.pemeriksaan?.lph }}
                    </VCol>
                  </VRow>
                  <VRow no-gutters>
                    <VCol cols="5">
                      <div class="d-flex justify-space-between">
                        <div class="text-h6">
                          {{
                            t(
                              "status-permohoanan.reguler-detail-inspection-tglfinlph"
                            )
                          }}
                        </div>
                        <div class="me-2">:</div>
                      </div>
                    </VCol>
                    <VCol
                      v-if="detailData?.pemeriksaan?.tgl_selesai_lph"
                      cols="7"
                    >
                      {{
                        formatDateIntl(
                          new Date(detailData?.pemeriksaan?.tgl_selesai_lph)
                        )
                      }}
                    </VCol>
                  </VRow>
                  <VRow no-gutters>
                    <VCol cols="5">
                      <div class="d-flex justify-space-between">
                        <div class="text-h6">
                          {{
                            t(
                              "status-permohoanan.reguler-detail-inspection-hasil"
                            )
                          }}
                        </div>
                        <div class="me-2">:</div>
                      </div>
                    </VCol>
                    <VCol cols="7">
                      {{ detailData?.pemeriksaan?.hasil }}
                    </VCol>
                  </VRow>
                  <VRow no-gutters>
                    <VCol cols="5">
                      <div class="d-flex justify-space-between">
                        <div class="text-h6">
                          {{
                            t(
                              "status-permohoanan.reguler-detail-inspection-dok"
                            )
                          }}
                        </div>
                        <div class="me-2">:</div>
                      </div>
                    </VCol>
                    <VCol cols="7">
                      {{ detailData?.pemeriksaan?.dokumen }}
                    </VCol>
                  </VRow>
                </div>
              </div>
            </VExpansionPanelText>
          </VExpansionPanel>
          <!--
            <VExpansionPanel :value="4" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
            {{ t("status-permohoanan.reguler-detail-sidang-title") }}
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
            <div v-if="detailData?.sidang_fatwa">
            <VContainer>
            <VRow>
            <VCol cols="3">
            {{ t("status-permohoanan.reguler-detail-sidang-nokh") }}
            </VCol>
            <VCol cols="1"> : </VCol>
            <VCol cols="8">{{
            detailData?.sidang_fatwa.nomor_penetapan
            }}</VCol>
            </VRow>
            <VRow>
            <VCol cols="3">
            {{
            t("status-permohoanan.reguler-detail-sidang-tglkh")
            }}</VCol
            >
            <VCol cols="1"> : </VCol>
            <VCol cols="8">
            {{ detailData?.sidang_fatwa.tanggal_penetapan }}
            </VCol>
            </VRow>
            <VRow>
            <VCol cols="3">
            {{
            t("status-permohoanan.reguler-detail-sidang-hsilkh")
            }}</VCol
            >
            <VCol cols="1"> : </VCol>
            <VCol cols="8">
            {{ detailData?.sidang_fatwa.ketetapan }}
            </VCol>
            </VRow>
            <VRow>
            <VCol cols="3">
            {{ t("status-permohoanan.reguler-detail-sidang-dok") }}
            </VCol>
            <VCol cols="1"> : </VCol>
            <VCol cols="8">
            {{ detailData?.sidang_fatwa.dokumen }}
            </VCol>
            </VRow>
            </VContainer>
            </div>
            </VExpansionPanelText>
            </VExpansionPanel>
          -->
          <VExpansionPanel :value="5" class="pt-3">
            <div v-if="detailData?.tracking">
              <!-- <PanelTracking :data="detailData?.tracking" /> -->
              <VCard class="pa-5">
                <VCardlTitle class="font-weight-bold text-h4">
                  {{ t("status-permohoanan.reguler-detail-track-title") }}
                </VCardlTitle>
                <VCardText v-if="detailData?.tracking" class="px-0">
                  <VTimeline side="end" align="start" hide-opposite>
                    <VTimelineItem
                      v-for="(item, index) in detailData?.tracking"
                      :key="index"
                      dot-color="#FFFFFF"
                    >
                      <VRow>
                        <VCol cols="7">
                          <div class="text-h6">
                            {{ item.comment }}
                          </div>
                          <div>{{ item.username }}</div>
                        </VCol>
                        <VCol v-if="item.tanggal" cols="5">
                          <div>
                            {{ formatDateIntl(new Date(item.tanggal)) }}
                          </div>
                        </VCol>
                      </VRow>
                    </VTimelineItem>
                  </VTimeline>
                </VCardText>
              </VCard>
            </div>
          </VExpansionPanel>
          <!--
            <VExpansionPanel :value="6" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
            Pengawasan
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
            <InfoRow
            cols-name="5"
            cols-separator="1"
            cols-value="6"
            name="Tanggal Pengawasan"
            >
            {{ detailData?.penanggung_jawab?.nama_pj || "-" }}
            </InfoRow>
            <InfoRow
            cols-name="5"
            cols-separator="1"
            cols-value="6"
            name="Tanggal Pengawasan Selanjutnya"
            >
            {{ detailData?.penanggung_jawab?.nomor_kontak_pj || "-" }}
            </InfoRow>
            <InfoRow
            cols-name="5"
            cols-separator="1"
            cols-value="6"
            name="Keterangan"
            >
            {{ detailData?.penanggung_jawab?.email_pj || "-" }}
            </InfoRow>
            <InfoRow
            cols-name="5"
            cols-separator="1"
            cols-value="6"
            name="Hasil"
            >
            {{ detailData?.penanggung_jawab?.email_pj || "-" }}
            </InfoRow>
            <InfoRow
            cols-name="5"
            cols-separator="1"
            cols-value="6"
            name="Dokumen"
            >
            {{ detailData?.penanggung_jawab?.email_pj || "-" }}
            </InfoRow>
            </VExpansionPanelText>
            </VExpansionPanel>
          -->
        </VExpansionPanels>
      </template>
    </LPHDetailLayout>
    <VDialog v-model="isAssignModalOpen" max-width="840px" persistent>
      <VCard class="pa-4">
        <VCardTitle class="d-flex justify-space-between align-center">
          <div class="text-h3 font-weight-bold">Update Status</div>
          <VIcon @click="handleOpenAssignModal"> fa-times </VIcon>
        </VCardTitle>
        <VCardText>
          <VRow class="mb-1">
            <VCol>
              <div class="text-h6 mb-1">Auditor</div>
              <VSelect
                placeholder="Masukkan Auditor"
                density="compact"
                class="mb-3"
                :items="[{ title: 'Aliando Syakir', value: 'Aliando Syakir' }]"
                menu-icon="fa-chevron-down"
                @update:model-value="(v) => (assignedAuditor = v)"
              />
              <div class="d-flex justify-end">
                <VBtn
                  :disabled="!assignedAuditor"
                  text="Tambah"
                  @click="handleAddAuditor"
                />
              </div>
            </VCol>
          </VRow>
          <VRow class="mb-5">
            <VCol>
              <VDataTable
                class="auditor-table"
                :headers="assignAuditorHeader"
                :items="assignAuditorData"
                hide-default-footer
              >
                <template #item.index="{ index }">
                  {{ index + 1 }}
                </template>
                <template #item.actions>
                  <VIcon
                    icon="mdi-delete"
                    color="error"
                    @click="handleDeleteAuditor"
                  />
                </template>
              </VDataTable>
            </VCol>
          </VRow>
        </VCardText>
        <VCardActions class="px-4">
          <VBtn
            variant="outlined"
            class="px-4 me-3"
            @click="handleOpenAssignModal"
          >
            Batal
          </VBtn>
          <VBtn
            variant="flat"
            class="px-4"
            color="primary"
            @click="[handleSaveAuditor(), handleOpenAssignModal()]"
          >
            Simpan
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
    <VDialog v-model="isUpdateModalOpen" max-width="840px" persistent>
      <VCard class="pa-4">
        <VCardTitle class="d-flex justify-space-between align-center">
          <div class="text-h3 font-weight-bold">Update Status</div>
          <VIcon @click="handleOpenUpdateModal"> fa-times </VIcon>
        </VCardTitle>
        <VCardText>
          <VRow>
            <VCol> Pastikan sudah memilih auditor untuk pengajuan ini. </VCol>
          </VRow>
        </VCardText>
        <VCardActions class="px-4">
          <VBtn
            variant="outlined"
            class="px-4 me-3"
            @click="handleOpenUpdateModal"
          >
            Batal
          </VBtn>
          <VBtn
            variant="flat"
            class="px-4"
            color="primary"
            @click="[handleUpdateStatus(), handleOpenUpdateModal()]"
          >
            Ya, Update
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>

<style scoped lang="scss">
:deep(
    .v-expansion-panel--active:not(:first-child),
    .v-expansion-panel--active + .v-expansion-panel
  ) {
  margin-block-start: 40px !important;
}

:deep(.v-data-table.auditor-table > .v-table__wrapper) {
  table {
    thead > tr > th:last-of-type {
      position: sticky;
      border-inline-start: 1px solid rgba(#000, 0.12);
      inset-inline-end: 0;
    }

    tbody > tr > td:last-of-type {
      position: sticky;
      background: white;
      border-inline-start: 1px solid rgba(#000, 0.12);
      inset-inline-end: 0;
    }
  }
}
</style>
