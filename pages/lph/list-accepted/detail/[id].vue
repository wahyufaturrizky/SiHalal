<script setup lang="ts">
import LPHDetailLayout from "@/layouts/LPHDetailLayout.vue";

const route = useRoute();
const router = useRouter();
const id = route?.params?.id;

const openedLeftPanels = ref([0, 1, 2, 3, 4, 5]);
const openedRightPanels = ref([0, 1, 2]);
const loading = ref(false);
const dataPengajuan = ref<any>({});
const dataProduk = ref<any>([]);
const dokumenLama = ref<any>([]);
const dataPemeriksaanProduk = ref<any>(null);
const sjphFile = ref<any>(null);
const suratMohonFile = ref<any>(null);
const invoiceFile = ref<string>("");
const regNumber = ref<string>("");

const isSendModalOpen = ref(false);

const handleOpenSendModal = () => {
  isSendModalOpen.value = !isSendModalOpen.value;
};

const downloadForms = reactive({
  sttd: "",
}) as Record<string, string>;

const handleUpdateStatus = async () => {
  // useSnackbar().sendSnackbar('Berhasil mengirim pengajuan data', 'success')
  try {
    const response: any = await $api("/reguler/lph/generate-invoice", {
      method: "put",
      body: {
        id_reg: id,
      },
    });

    if (response?.code === 2000) {
      const fetchedInvoiceFile = (await downloadInvoice(regNumber.value)) || "";

      if (fetchedInvoiceFile) invoiceFile.value = fetchedInvoiceFile;

      useSnackbar().sendSnackbar("Berhasil kirim data", "success");

      return response?.data;
    } else {
      useSnackbar().sendSnackbar(response?.errors?.list_error?.[0], "error");
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const getSjphDocument = async () => {
  // useSnackbar().sendSnackbar('Berhasil mengirim pengajuan data', 'success')
  try {
    const response: any = await $api("/reguler/lph/generate-sjph", {
      method: "post",
      body: {
        id_reg: id,
      },
    });

    if (response?.code === 2000) {
      sjphFile.value = response.data;

      return response?.data;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan File SJPH", "error");
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan File SJPH", "error");
  }
};

const OldDoc = async (noDaftar: string) => {
  const url = `https://prod-api.halal.go.id/v1/referensi/dokumen_reguler?no_daftar=${noDaftar}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();

    dokumenLama.value = data.data;

    return data;
  } catch (error) {
    console.error("Terjadi kesalahan saat mengambil data:", error);

    return null;
  }
};

const biayaValidasi = ref("");

const getDetailData = async (type: string) => {
  try {
    const response: any = await $api("/reguler/lph/detail-payment", {
      method: "get",
      params: { url: `${LIST_DAFTAR_AJUAN_DITERIMA}/${id}/${type}` },
    });

    if (response?.code === 2000) {
      const data = response?.data;
      if (type == "pemeriksaanproduk") {
        const noDaftar = data?.no_pendaftaran?.no_daftar;

        biayaValidasi.value = data?.biaya.length;
        if (noDaftar) await OldDoc(noDaftar);
        else console.error("noDaftar tidak ditemukan dalam response API");
      }

      return data;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");

      return null;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");

    return null;
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

const getSuratPermohonan = async () => {
  const result: any = await $api("/reguler/lph/generate-surat-permohonan", {
    method: "get",
    query: {
      id,
    },
  });

  if (result?.code === 2000) suratMohonFile.value = result?.data?.file;
};

const onUpdateBiaya = async () => {
  try {
    const response: any = await $api("/reguler/lph/update-cost/seed-detail", {
      method: "post",
      query: { id },
    });

    if (response?.code === 2000) {
      router.push(`/lph/list-accepted/detail/update-cost/${id}`);

      return response?.data;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const downloadInvoice = async (el: any) => {
  try {
    const response: any = await $api("/reguler/lph/download-invoice", {
      method: "post",
      body: {
        no_daftar: el,
      },
    });

    if (response?.code === 2000) return response?.data?.file;

    return null;
  } catch (error) {
    return null;
  }
};

const handleDownloadForm = async (fileName: string, param?: string) => {
  return await downloadDocument(fileName, param);
};

const handleDownloadFormDokumenLama = async (fileName: string) => {
  window.open(fileName, "_blank");
};

onMounted(async () => {
  loading.value = true;

  const responseData = await Promise.allSettled([
    getDetailData("pengajuan"),
    getDetailData("produk"),
    getDetailData("pemeriksaanproduk"),
    getDownloadForm("sttd", "sttd"),
    getSjphDocument(),
    getSuratPermohonan(),

    // getDownloadForm('setifikasi-halal', 'setifikasi_halal'),
  ]);

  dataPengajuan.value = responseData?.[0]?.value || {};
  dataProduk.value = responseData?.[1]?.value || [];
  dataPemeriksaanProduk.value = responseData?.[2]?.value || {};

  const noDaftar = responseData?.[2]?.value?.no_pendaftaran?.no_daftar;

  regNumber.value = noDaftar;

  const fetchedInvoiceFile = (await downloadInvoice(noDaftar)) || "";

  if (fetchedInvoiceFile) invoiceFile.value = fetchedInvoiceFile;

  loading.value = false;
});
</script>

<template>
  <div v-if="!loading">
    <LPHDetailLayout>
      <template #page-title>
        <VRow no-gutters>
          <VCol>
            <h1>Detail Ajuan Diterima</h1>
          </VCol>
          <VCol class="d-flex justify-end">
            <VBtn
              class="me-4"
              :color="invoiceFile ? 'primary' : '#A09BA1'"
              variant="outlined"
              :disabled="!Boolean(invoiceFile)"
              @click="handleDownloadForm(invoiceFile, 'INVOICE')"
            >
              <template #default>
                <div class="d-flex gap-2">
                  <label>Download Invoice</label>
                  <VIcon icon="fa-download" />
                </div>
              </template>
            </VBtn>
            <VBtn
              :color="downloadForms.sttd ? 'primary' : '#A09BA1'"
              class="me-4"
              text="STTD"
              variant="outlined"
              @click="
                downloadForms.sttd
                  ? handleDownloadForm(downloadForms.sttd, 'FILES')
                  : null
              "
            />
            <VBtn
              v-if="!dataPemeriksaanProduk?.old_data"
              text="Update Biaya"
              variant="outlined"
              class="me-4"
              @click="onUpdateBiaya"
            />
            <VBtn text="Kirim" @click="handleOpenSendModal" />
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
              Data Pengajuan
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <PanelDaftarPengajuan
                type="READ"
                :data-pengajuan="dataPengajuan"
              />
            </VExpansionPanelText>
          </VExpansionPanel>
          <VExpansionPanel :value="1" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              Pengajuan Sertifikasi
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <PanelPengajuanSertifikasi :data-pengajuan="dataPengajuan" />
            </VExpansionPanelText>
          </VExpansionPanel>
          <VExpansionPanel :value="2" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              Daftar Nama Produk
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <PanelDaftarProduk :data="dataProduk" />
            </VExpansionPanelText>
          </VExpansionPanel>
          <VExpansionPanel :value="3" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              Jadwal Audit
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <PanelJadwalAudit :data="dataPemeriksaanProduk?.jadwal_audit" />
            </VExpansionPanelText>
          </VExpansionPanel>
          <VExpansionPanel :value="4" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              Auditor
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <PanelAuditorTable :data="dataPemeriksaanProduk?.auditor" />
            </VExpansionPanelText>
          </VExpansionPanel>
          <VExpansionPanel :value="5" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              Hasil Pemeriksaan
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <PanelHasilPemeriksaan
                :data="dataPemeriksaanProduk?.hasil_pemeriksaan"
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
              No. Pendaftaran
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <PanelNoPendaftaran
                :data="dataPemeriksaanProduk?.no_pendaftaran"
              />
            </VExpansionPanelText>
          </VExpansionPanel>
          <VExpansionPanel :value="1" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              Biaya Pemeriksaan
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <VRow>
                <VCol>
                  {{ formatToIDR(dataPemeriksaanProduk?.total_biaya) }}
                </VCol>
              </VRow>
            </VExpansionPanelText>
          </VExpansionPanel>

          <VExpansionPanel :value="2" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              Dokumen
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <VRow align="center">
                <VCol cols="5" class="text-h6"> File KH </VCol>
                <VCol class="d-flex align-center">
                  <div class="me-1">:</div>
                  <VBtn
                    :color="
                      dataPemeriksaanProduk?.file_kh ? 'primary' : '#A09BA1'
                    "
                    density="compact"
                    class="px-2"
                    @click="
                      dataPemeriksaanProduk?.file_kh
                        ? handleDownloadForm(
                            dataPemeriksaanProduk?.file_kh,
                            'FILES'
                          )
                        : null
                    "
                  >
                    <template #default>
                      <VIcon icon="fa-download" />
                    </template>
                  </VBtn>
                </VCol>
              </VRow>
              <VRow align="center">
                <VCol cols="5" class="text-h6"> File Laporan LPH </VCol>
                <VCol class="d-flex align-center">
                  <div class="me-1">:</div>
                  <VBtn
                    :color="
                      dataPemeriksaanProduk?.file_laporan
                        ? 'primary'
                        : '#A09BA1'
                    "
                    density="compact"
                    class="px-2"
                    @click="
                      dataPemeriksaanProduk?.file_laporan
                        ? handleDownloadForm(
                            dataPemeriksaanProduk?.file_laporan,
                            'FILES'
                          )
                        : null
                    "
                  >
                    <template #default>
                      <VIcon icon="fa-download" />
                    </template>
                  </VBtn>
                </VCol>
              </VRow>
              <VRow align="center">
                <VCol cols="5" class="text-h6"> Dokumen SJPH </VCol>
                <VCol class="d-flex align-center">
                  <div class="me-1">:</div>
                  <VBtn
                    :color="sjphFile?.file ? 'primary' : '#A09BA1'"
                    density="compact"
                    class="px-2"
                    :disabled="sjphFile?.file ? false : true"
                    @click="downloadDocument(sjphFile?.file, 'FILES')"
                  >
                    <template #default>
                      <VIcon icon="fa-download" />
                    </template>
                  </VBtn>
                </VCol>
              </VRow>
              <VRow align="center">
                <VCol cols="5" class="text-h6"> Surat Permohonan </VCol>
                <VCol class="d-flex align-center">
                  <div class="me-1">:</div>
                  <VBtn
                    :color="suratMohonFile ? 'primary' : '#A09BA1'"
                    density="compact"
                    class="px-2"
                    :disabled="suratMohonFile ? false : true"
                    @click="downloadDocument(suratMohonFile, 'FILES')"
                  >
                    <template #default>
                      <VIcon icon="fa-download" />
                    </template>
                  </VBtn>
                </VCol>
              </VRow>
            </VExpansionPanelText>
          </VExpansionPanel>

          <VExpansionPanel
            v-if="dokumenLama.length > 0"
            :value="3"
            class="pt-3"
          >
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              Dokumen Lama
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <VRow
                v-for="(item, idx) in dokumenLama"
                :key="idx"
                align="center"
              >
                <VCol cols="5" class="text-h6">
                  {{ item.ref_desc }}
                </VCol>
                <VCol class="d-flex align-center">
                  <div class="me-1">:</div>
                  <VBtn
                    :color="item?.file_dok ? 'primary' : '#A09BA1'"
                    density="compact"
                    class="px-2"
                    @click="
                      item?.file_dok
                        ? handleDownloadFormDokumenLama(item.file_download)
                        : null
                    "
                  >
                    <template #default>
                      <VIcon icon="fa-download" />
                    </template>
                  </VBtn>
                </VCol>
              </VRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
        <div class="mt-10">
          <PanelTracking :data="dataPemeriksaanProduk?.tracking" />
        </div>
      </template>
    </LPHDetailLayout>
    <VDialog v-model="isSendModalOpen" max-width="840px" persistent>
      <VCard class="pa-4">
        <VCardTitle class="d-flex justify-space-between align-center">
          <div v-if="biayaValidasi === 0" class="text-h3 font-weight-bold">
            Pengajuan Belum Dapat Dikirim
          </div>
          <div v-if="biayaValidasi >= 1" class="text-h3 font-weight-bold">
            Terbitkan Invoice
          </div>
          <VIcon @click="handleOpenSendModal"> fa-times </VIcon>
        </VCardTitle>
        <VCardText>
          <VRow>
            <VCol>
              Pastikan dokumen persyaratan lengkap dan semua biaya pemeriksaan
              sudah dimasukkan. Invoice akan diterbitkan saat Anda klik tombol
              ”kirim” dan invoice tidak dapat diedit kembali
            </VCol>
          </VRow>
        </VCardText>
        <VCardActions v-if="biayaValidasi >= 1" class="px-4">
          <VBtn
            variant="outlined"
            class="px-4 me-3"
            @click="handleOpenSendModal"
          >
            Batal
          </VBtn>
          <VBtn
            variant="flat"
            class="px-4"
            color="primary"
            @click="[handleUpdateStatus(), handleOpenSendModal()]"
          >
            Ya, Kirim
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
