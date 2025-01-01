<script setup lang="ts">
import LPHDetailLayout from "@/layouts/LPHDetailLayout.vue";

const route = useRoute();
const id = route?.params?.id;

const openedLeftPanels = ref([0, 1, 2, 3, 4, 5]);
const openedRightPanels = ref([0, 1, 2]);
const loading = ref(false);
const detailData = ref<any>(null);

const assignAuditorHeader: any[] = [
  { title: "No", key: "index" },
  { title: "Nama", key: "name" },
  { title: "Tanggal Lahir", key: "birthDate" },
  { title: "No Reg", key: "regisNumber" },
  { title: "Action", key: "actions", align: "center", sortable: false },
];

const aspectLegalHeader = [
  { title: "No.", key: "id_reg_legal", nowrap: true },
  { title: "Jenis", key: "jenis_surat", nowrap: true },
  { title: "No. Dokumen", key: "no_surat", nowrap: true },
  { title: "Tanggal", key: "tanggal_surat", nowrap: true },
  { title: "Masa Berlaku", key: "masa_berlaku", nowrap: true },
  { title: "Instansi Penerbit", key: "instansi_penerbit", nowrap: true },
];

const outletHeaders = [
  { title: "No.", key: "no", nowrap: true },
  { title: "Nama", key: "nama_outlet", nowrap: true },
  { title: "Alamat", key: "alamat_outlet", nowrap: true },
  { title: "Status", key: "status_milik", nowrap: true },
];

const penyeliaHalalHeaders = [
  { title: "No.", key: "no", nowrap: true },
  { title: "Nama", key: "penyelia_nama", nowrap: true },
  { title: "No. KTP", key: "no_ktp", nowrap: true },
  { title: "No. Kontak", key: "no_kontak", nowrap: true },
  {
    title: "No/Tgl Sertif Penyelia Halal",
    key: "tgl_penyelia_halal",
    nowrap: true,
  },
  { title: "No/Tgl SK", key: "tanggal_sk", nowrap: true },
];

const produkHeaders = [
  { title: "No", key: "no" },
  { title: "Layanan Produk", key: "layanan_produk" },
  { title: "Jenis Produk", key: "jenis_produk" },
  { title: "Kelas Produk", key: "kelas_produk" },
  { title: "Rincian Produk", key: "rincian_prooduk" },
  { title: "Nama Produk", key: "nama_produk" },
  { title: "Publikasi", key: "publication" },
];

const pabrikHeader = [
  { title: "No", key: "no" },
  { title: "Nama", key: "nama_pabrik" },
  { title: "Alamat", key: "alamat_pabrik" },
  { title: "Status", key: "status_milik" },
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

const getSertifikasiDetail = async () => {
  try {
    const response: any = await $api("/reguler/lph/detail-payment", {
      method: "get",
      params: { url: `${SERTIFIKASI_DETAIL}/${id}/detail` },
    });

    if (response?.code === 2000) detailData.value = response.data || {};
    else useSnackbar().sendSnackbar("Ada Kesalahan", "error");
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

const handleDownloadForm = async (fileName: string) => {
  return await downloadDocument(fileName);
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
            <h1>Detail Pengajuan Sertifikasi</h1>
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
              Pengajuan Sertifikasi Halal
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
              Penanggung Jawab
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Nama"
              >
                {{ detailData?.penanggung_jawab?.nama_pj || "-" }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Nomor Kontak"
              >
                {{ detailData?.penanggung_jawab?.nomor_kontak_pj || "-" }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Email"
              >
                {{ detailData?.penanggung_jawab?.email_pj || "-" }}
              </InfoRow>
            </VExpansionPanelText>
          </VExpansionPanel>
          <VExpansionPanel :value="2" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              Aspek Legal
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <TableSertifikasiHalal
                :data="detailData?.aspek_legal"
                :headers="aspectLegalHeader"
              />
            </VExpansionPanelText>
          </VExpansionPanel>
          <VExpansionPanel :value="3" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              Pabrik
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <TableSertifikasiHalal
                :data="detailData?.pabrik"
                :headers="pabrikHeader"
              />
            </VExpansionPanelText>
          </VExpansionPanel>
          <VExpansionPanel :value="4" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              Outlet
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <TableSertifikasiHalal
                :data="detailData?.outlet"
                :headers="outletHeaders"
              />
            </VExpansionPanelText>
          </VExpansionPanel>
          <VExpansionPanel :value="5" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              Penyelia Halal
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <TableSertifikasiHalal
                :data="detailData?.penyelia_halal"
                :headers="penyeliaHalalHeaders"
              />
            </VExpansionPanelText>
          </VExpansionPanel>
          <VExpansionPanel :value="6" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              Daftar Nama Produk
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <TableSertifikasiHalal
                :data="detailData?.produk"
                :headers="produkHeaders"
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
              Formulir Unduhan
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <InfoRowV2
                class="d-flex align-center"
                name="STTD"
                :style="{ fontWeight: '600' }"
              >
                <VBtn
                  :color="downloadForms.sttd ? 'primary' : '#A09BA1'"
                  density="compact"
                  class="px-2"
                  @click="
                    downloadForms.sttd
                      ? handleDownloadForm(downloadForms.sttd)
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
                name="Sertifikasi Halal"
                :style="{ fontWeight: '600' }"
              >
                <VBtn
                  :color="
                    downloadForms.sertifikasi_halal ? 'primary' : '#A09BA1'
                  "
                  density="compact"
                  class="px-2"
                  @click="
                    downloadForms.sertifikasi_halal
                      ? handleDownloadForm(downloadForms.sertifikasi_halal)
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
              Pendaftaran
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <div v-if="detailData?.certificate_halal">
                <!-- <Pendaftaran :data="detailData?.certificate_halal" /> -->
                <VContainer>
                  <VRow>
                    <VCol cols="3"> Nomor Daftar </VCol>
                    <VCol cols="1"> : </VCol>
                    <VCol cols="8">
                      {{ detailData?.certificate_halal.no_daftar }}
                    </VCol>
                  </VRow>
                  <VRow>
                    <VCol cols="3"> Tanggal </VCol>
                    <VCol cols="1"> : </VCol>
                    <VCol
                      cols="8"
                      v-if="detailData?.certificate_halal?.tgl_daftar"
                    >
                      {{
                        formatDateIntl(
                          new Date(detailData?.certificate_halal?.tgl_daftar)
                        )
                      }}
                    </VCol>
                  </VRow>
                  <VRow>
                    <VCol cols="3"> Jenis Daftar </VCol>
                    <VCol cols="1"> : </VCol>
                    <VCol cols="8">
                      {{ detailData?.certificate_halal.jenis_pengajuan }}
                    </VCol>
                  </VRow>
                  <VRow>
                    <VCol cols="3"> Tempat Pendaftaran </VCol>
                    <VCol cols="1"> : </VCol>
                    <VCol cols="8">
                      {{ detailData?.certificate_halal.tempat }}
                    </VCol>
                  </VRow>
                  <VRow>
                    <VCol cols="3"> Channel Pendaftaran </VCol>
                    <VCol cols="1"> : </VCol>
                    <VCol cols="8">
                      {{ detailData?.certificate_halal.channel }}
                    </VCol>
                  </VRow>
                  <VRow>
                    <VCol cols="3"> Status </VCol>
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
                    <VCol cols="3"> Fasilitator </VCol>
                    <VCol cols="1"> : </VCol>
                    <VCol cols="8">
                      {{ detailData?.certificate_halal.fasilitator_name }}
                    </VCol>
                  </VRow>
                  <VRow>
                    <VCol cols="3"> Kode Fasilitasi </VCol>
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
              Sertifikat Halal
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <div v-if="detailData?.sertifikat_halal_info">
                <VContainer>
                  <VRow>
                    <VCol cols="3"> Nomor Sertifikat </VCol>
                    <VCol cols="1"> : </VCol>
                    <VCol cols="8">
                      {{ detailData?.sertifikat_halal_info.nomor_sertifikat }}
                    </VCol>
                  </VRow>
                  <VRow>
                    <VCol cols="3"> Tanggal Terbit </VCol>
                    <VCol cols="1"> : </VCol>
                    <VCol cols="8"
                      >{{
                        detailData?.sertifikat_halal_info.tanggal_sertifikat
                      }}
                    </VCol>
                  </VRow>
                </VContainer>
              </div>
            </VExpansionPanelText>
          </VExpansionPanel>
          <VExpansionPanel :value="3" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              Pemeriksaan
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <div v-if="detailData?.pemeriksaan">
                <div class="d-flex flex-column ga-4">
                  <VRow no-gutters>
                    <VCol cols="5">
                      <div class="d-flex justify-space-between">
                        <div class="text-h6">LPH</div>
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
                        <div class="text-h6">Tanggal Selesai LPH</div>
                        <div class="me-2">:</div>
                      </div>
                    </VCol>
                    <VCol
                      cols="7"
                      v-if="detailData?.pemeriksaan?.tgl_selesai_lph"
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
                        <div class="text-h6">Hasil</div>
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
                        <div class="text-h6">Dokumen</div>
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
          <VExpansionPanel :value="4" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              Sidang Fatwa
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <div v-if="detailData?.sidang_fatwa">
                <VContainer>
                  <VRow>
                    <VCol cols="3"> Nomor Penetapan </VCol>
                    <VCol cols="1"> : </VCol>
                    <VCol cols="8">{{
                      detailData?.sidang_fatwa.nomor_penetapan
                    }}</VCol>
                  </VRow>
                  <VRow>
                    <VCol cols="3"> Tanggal Penetapan</VCol>
                    <VCol cols="1"> : </VCol>
                    <VCol cols="8">
                      {{ detailData?.sidang_fatwa.tanggal_penetapan }}
                    </VCol>
                  </VRow>
                  <VRow>
                    <VCol cols="3"> Hasil Penetapan</VCol>
                    <VCol cols="1"> : </VCol>
                    <VCol cols="8">
                      {{ detailData?.sidang_fatwa.ketetapan }}
                    </VCol>
                  </VRow>
                  <VRow>
                    <VCol cols="3"> Dokumen </VCol>
                    <VCol cols="1"> : </VCol>
                    <VCol cols="8">
                      {{ detailData?.sidang_fatwa.dokumen }}
                    </VCol>
                  </VRow>
                </VContainer>
              </div>
            </VExpansionPanelText>
          </VExpansionPanel>
          <VExpansionPanel :value="5" class="pt-3">
            <div v-if="detailData?.tracking">
              <!-- <PanelTracking :data="detailData?.tracking" /> -->
              <VCard class="pa-5">
                <VCardlTitle class="font-weight-bold text-h4">
                  Melacak
                </VCardlTitle>
                <VCardText class="px-0" v-if="detailData?.tracking">
                  <VTimeline side="end" align="start" hide-opposite>
                    <VTimelineItem
                      v-for="(item, index) in detailData?.tracking"
                      :key="index"
                      dot-color="#FFFFFF"
                    >
                      <VRow>
                        <VCol cols="7">
                          <div class="text-h6">{{ item.comment }}</div>
                          <div>{{ item.username }}</div>
                        </VCol>
                        <VCol cols="5" v-if="item.tanggal">
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
          <!-- <VExpansionPanel :value="6" class="pt-3">
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
          </VExpansionPanel> -->
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
                @update:model-value="(v) => (assignedAuditor = v)"
                menu-icon="fa-chevron-down"
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
            >Batal</VBtn
          >
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
            >Batal</VBtn
          >
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
  margin-top: 40px !important;
}

:deep(.v-data-table.auditor-table > .v-table__wrapper) {
  table {
    thead > tr > th:last-of-type {
      right: 0;
      position: sticky;
      border-left: 1px solid rgba(#000000, 0.12);
    }
    tbody > tr > td:last-of-type {
      right: 0;
      position: sticky;
      border-left: 1px solid rgba(#000000, 0.12);
      background: white;
    }
  }
}
</style>
