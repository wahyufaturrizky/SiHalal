<script setup lang="ts">
import LPHDetailLayout from "@/layouts/LPHDetailLayout.vue";

const route = useRoute();
const id = route?.params?.id;

const openedLeftPanels = ref([0, 1, 2, 3, 4, 5]);
const openedRightPanels = ref([0, 1, 2]);
const loading = ref(false);
const dataPengajuan = ref<any>({});
const dataProduk = ref<any>([]);
const lovAuditor = ref<any>([]);
const dataPemeriksaanProduk = ref<any>(null);
const selectedAudiotor = ref<any>(null);
const loadingAuditor = ref(false);
const dokumenLama = ref<any>([]);
const page = ref(1);
const size = ref(10);
const sjphFile = ref<any>(null);
const suratMohonFile = ref<any>(null);

const downloadForms = reactive({
  sttd: "",
  sertifikasi_halal: "",
}) as Record<string, string>;

const assignAuditorHeader: any[] = [
  { title: "No", key: "index" },
  { title: "Nama", key: "nama" },
  { title: "Tanggal Lahir", key: "tanggal_lahir" },
  { title: "No Reg", key: "no_reg" },
  { title: "Action", key: "actions", align: "center", sortable: false },
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

const handleOpenAssignModal = () => {
  isAssignModalOpen.value = !isAssignModalOpen.value;
};

const handleOpenUpdateModal = () => {
  isUpdateModalOpen.value = !isUpdateModalOpen.value;
};

const handleAddAuditor = () => {
  dataPemeriksaanProduk.value?.auditor.push(selectedAudiotor.value);
  assignAuditorData.value.push(newAuditorData);
};

const handleDeleteAuditor = (index: number) => {
  dataPemeriksaanProduk.value.auditor.splice(index, 1);
};

const handleSaveAuditor = async () => {
  localStorage.setItem(
    "lovAuditor",
    JSON.stringify(dataPemeriksaanProduk.value.auditor)
  );
};

const handleUpdateStatus = async () => {
  const auditorToAdd = localStorage.getItem("lovAuditor");
  const dataArray = JSON.parse(auditorToAdd);
  if (dataArray === []) {
    return useSnackbar().sendSnackbar(
      "Harap isi auditor terlebih dahulu",
      "error"
    );
  } else {
    const ids = dataArray.map((item: any) => item.id_auditor || null);
    if (dataPemeriksaanProduk?.value?.auditor.length === 0) {
      return useSnackbar().sendSnackbar(
        "Harap isi auditor terlebih dahulu",
        "error"
      );
    } else {
      try {
        const response: any = await $api("/reguler/auditor/assign", {
          method: "post",
          query: { id },
          body: { id_auditor: ids },
        });

        if (response?.code === 2000) {
          useSnackbar().sendSnackbar("Berhasil menambah auditor", "success");

          return response?.data;
        } else {
          useSnackbar().sendSnackbar("Ada Kesalahan", "error");
        }
      } catch (error) {
        useSnackbar().sendSnackbar("Ada Kesalahan", "error");
      }
    }
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

const getSuratPermohonan = async () => {
  const result: any = await $api("/reguler/lph/generate-surat-permohonan", {
    method: "get",
    query: {
      id,
    },
  });

  if (result?.code === 2000) suratMohonFile.value = result?.data?.file;
};

const getDetailData = async (type: string) => {
  try {
    const response: any = await $api("/reguler/lph/detail-payment", {
      method: "get",
      params: { url: `${LIST_INFORMASI_PEMBAYARAN}/${id}/${type}` },
    });

    if (response?.code === 2000) {
      const data = response?.data;

      if (type === "pemeriksaanproduk") {
        const noDaftar = data?.no_pendaftaran?.no_daftar;
        if (noDaftar) await OldDoc(noDaftar);
        else console.error("noDaftar tidak ditemukan dalam response API");
      }

      return data;
    } else {
      const snackbar = useSnackbar();

      snackbar.sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
    const snackbar = useSnackbar();

    snackbar.sendSnackbar(`Ada Kesalahan: ${error.message || error}`, "error");
  }
};

const getDetailProductData = async (pg: number, sz) => {
  try {
    const response: any = await $api("/reguler/lph/detail-product", {
      method: "get",
      params: {
        url: `${LIST_INFORMASI_PEMBAYARAN}/${id}/produk`,
        page: pg,
        size: sz,
      },
    });

    if (response?.code === 2000) {
      dataProduk.value = response;

      return response?.data;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const OldDoc = async (noDaftar: string) => {
  const url = `https://prod-api.halal.go.id/v1/referensi/dokumen_reguler?no_daftar=${noDaftar}`;

  // console.log("berhasil");
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

const handleDownloadForm = async (fileName: string, param: string) => {
  return await downloadDocument(fileName, param);
};

const handleDownloadFormDokumenLama = async (fileName: string) => {
  window.open(fileName, "_blank");
};

const getListAuditor = async (type?: string) => {
  try {
    const response: any = await $api("/reguler/list", {
      method: "get",
      params: {
        url: `api/v1/halal-certificate-reguler/lph/pemeriksaan/${id}/auditor`,
      },
    });

    if (response?.code === 2000) {
      lovAuditor.value = response.data;

      return response?.data;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

// const getDownloadForm = async (docName: string, propName: string) => {
//   const result: any = await $api(`/self-declare/submission/${id}/file`, {
//     method: "get",
//     query: {
//       document: docName,
//     },
//   });

//   if (result?.code === 2000) downloadForms[propName] = result?.data?.file || "";
// };

const handleInputAuditor = async (val: any) => {
  try {
    const response: any = await $api("/reguler/list", {
      method: "get",
      params: {
        url: `api/v1/halal-certificate-reguler/lph/pemeriksaan/${id}/auditor`,
        keyword: val,
      },
    });

    if (response?.code === 2000) {
      lovAuditor.value = response.data;

      return response?.data;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

onMounted(async () => {
  loading.value = true;

  const responseData = await Promise.allSettled([
    getDetailData("pengajuan"),
    getDetailProductData(page.value, size.value),
    getDetailData("pemeriksaanproduk"),
    getListAuditor(),
    getSjphDocument(),
    getSuratPermohonan(),
  ]);

  dataPengajuan.value = responseData?.[0]?.value || {};
  dataPemeriksaanProduk.value = responseData?.[2]?.value || {};
  localStorage.setItem(
    "lovAuditor",
    JSON.stringify(responseData?.[2]?.value.auditor)
  );
  loading.value = false;
});

const handlePageChange = async (pg: any) => {
  page.value = pg;
  await getDetailProductData(pg || 1, size.value);
};

const handleRowPageChange = async (sz: any) => {
  size.value = sz;
  await getDetailProductData(page.value, sz || 10);
};

const productNameHeader: any[] = [
  { title: "No", key: "index" },
  { title: "Layanan Produk", key: "layanan_produk", nowrap: true },
  { title: "Jenis Produk", key: "jenis_produk", nowrap: true },
  { title: "Kelas Produk", key: "kelas_produk", nowrap: true },
  { title: "Rincian Produk", key: "rincian_produk", nowrap: true },
  { title: "Nama Produk", key: "nama_produk", nowrap: true },
  { title: "Publikasi", key: "publikasi_produk" },
];
</script>

<template>
  <div v-if="!loading">
    <LPHDetailLayout>
      <template #page-title>
        <VRow no-gutters>
          <VCol>
            <h1>Detail Pemeriksaan</h1>
          </VCol>
          <VCol class="d-flex justify-end">
            <VBtn
              text="Assign Auditor"
              variant="outlined"
              class="me-4"
              @click="handleOpenAssignModal"
            />
            <VBtn text="Update Status" @click="handleOpenUpdateModal" />
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
              Daftar Pengajuan
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
              <VDataTableServer
                disable-sort
                v-model:page="page"
                v-model:items-per-page="size"
                :items-per-page-options="[10, 25, 50, 100]"
                :items-per-page="size"
                :items-length="dataProduk.totalItems"
                :items="dataProduk.data"
                :headers="productNameHeader"
                hide-items-per-page
                class="custom-table"
                hover
                @update:page="handlePageChange"
                @update:items-per-page="handleRowPageChange"
              >
                <template #item.index="{ index }">
                  {{ index + 1 }}
                </template>
                <template #item.publikasi_produk="{ item }">
                  <VCheckbox
                    :model-value="item.publikasi_produk"
                    class="non-clickable"
                  />
                </template>
              </VDataTableServer>
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
                type="EDIT"
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
              Dokumen Unduhan
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <VRow align="center">
                <VCol cols="5" class="text-h6"> Hasil Audit </VCol>
                <VCol class="d-flex align-center">
                  <div class="me-1">:</div>
                  <VBtn
                    :color="downloadForms.hasil_audit ? 'primary' : '#A09BA1'"
                    density="compact"
                    class="px-2"
                    @click="
                      downloadForms.hasil_audit
                        ? handleDownloadForm(downloadForms.hasil_audit, 'FILES')
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
                <VCol cols="5" class="text-h6"> File KH </VCol>
                <VCol class="d-flex align-center">
                  <div class="me-1">:</div>
                  <!--
                    <VBtn rounded="xl" density="compact" class="px-2">
                    <template #default>
                    <VIcon icon="fa-download" />
                    </template>
                    </VBtn>
                  -->
                  <VBtn
                    :color="downloadForms.file_kh ? 'primary' : '#A09BA1'"
                    density="compact"
                    class="px-2"
                    @click="
                      downloadForms.file_kh
                        ? handleDownloadForm(downloadForms.file_kh, 'FILES')
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
                  <!--
                    <VBtn rounded="xl" density="compact" class="px-2">
                    <template #default>
                    <VIcon icon="fa-download" />
                    </template>
                    </VBtn>
                  -->
                  <VBtn
                    :color="downloadForms.file_laporan ? 'primary' : '#A09BA1'"
                    density="compact"
                    class="px-2"
                    @click="
                      downloadForms.file_laporan
                        ? handleDownloadForm(
                            downloadForms.file_laporan,
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
          <VExpansionPanel :value="1" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              No. Pendaftaran
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <PanelNoPendaftaran
                :data="dataPemeriksaanProduk?.no_pendaftaran"
              />
            </VExpansionPanelText>
          </VExpansionPanel>
          <VExpansionPanel :value="2" class="pt-3">
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
        </VExpansionPanels>
        <VExpansionPanels>
          <VExpansionPanel
            v-if="dokumenLama.length > 0"
            :value="2"
            class="pt-3 mt-10"
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
              <VAutocomplete
                v-model="selectedAudiotor"
                :items="lovAuditor"
                item-title="nama"
                item-value="id_auditor"
                density="compact"
                placeholder="Cari auditor"
                :loading="loadingAuditor"
                return-object
                class="mb-5"
                @input="handleInputAuditor"
                @update:model-value="(v) => (assignedAuditor = v)"
              >
                <template #item="{ props, item }">
                  <VListItem v-bind="props" :title="(item.raw as any).nama" />
                </template>
              </VAutocomplete>
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
                disable-sort
                class="auditor-table"
                :headers="assignAuditorHeader"
                :items="dataPemeriksaanProduk?.auditor"
                hide-default-footer
              >
                <template #item.index="{ index }">
                  {{ index + 1 }}
                </template>
                <template #item.tanggal_lahir="{ item }">
                  {{ formatDateId(item.tanggal_lahir) }}
                </template>
                <template #item.actions>
                  <VIcon
                    icon="mdi-delete"
                    color="error"
                    @click="() => handleDeleteAuditor(index)"
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
