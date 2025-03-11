<script setup lang="ts">
import LPHDetailLayout from "@/layouts/LPHDetailLayout.vue";
import { onMounted, ref, watch } from "vue";

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
const selectedFile = ref(null);
const uploadMessage = ref("");
const selectedAuditResult = ref(null);

const tanggalMulai = ref("");
const tanggalSelesai = ref("");

watch(tanggalMulai, (newVal) => {
  localStorage.setItem("tanggalMulai", newVal);
});

watch(tanggalSelesai, (newVal) => {
  localStorage.setItem("tanggalSelesai", newVal);
});

const formatDateTime = (date) => {
  return new Date(date).toISOString();
};

const auditResults = ref([
  { label: "Lulus", value: "PR001" },
  { label: "Tidak Lulus", value: "PR002" },
]);

const formUploadLaporan = ref<{ filename: string }>({ filename: "" });

const laporanAudit = ref({
  label: [
    { title: "No.", key: "index", nowrap: true },
    { title: "Filename", key: "filename", nowrap: true },
    {
      title: "Action",
      value: "actions",
      sortable: false,
      nowrap: true,
    },
  ],
  value: [],
});
const MAX_FILE_SIZE = 20 * 1024 * 1024;
const uploadedFile = ref<{ name: string; file: File | null }>({
  name: "",
  file: null,
});

const downloadForms = reactive({
  sttd: "",
  sertifikasi_halal: "",
  hasil_audit: "",
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
const isUploadModalOpen = ref(false);

const handleOpenAssignModal = () => {
  isAssignModalOpen.value = !isAssignModalOpen.value;
};

const handleOpenUpdateModal = () => {
  isUpdateModalOpen.value = !isUpdateModalOpen.value;
};

const handleOpenUploadModal = () => {
  isUploadModalOpen.value = !isUploadModalOpen.value;
  selectedFile.value = null;
};

const resetForm = () => {
  formUploadLaporan.value = {
    filename: "",
  };
};

const handleRemoveFile = async (uploadedFile: any) => {
  try {
    if (!uploadedFile.id_hasil_doc) {
      useSnackbar().sendSnackbar("Data tidak valid", "error");
      return;
    }

    const response: any = await $api(
      "/reguler/lph/laporan-audit/remove-laporan",
      {
        method: "DELETE",
        body: { id: uploadedFile.id, id_hasil_doc: uploadedFile.id_hasil_doc },
      }
    );

    if (response?.code === 2000) {
      getListLaporan();
      useSnackbar().sendSnackbar("Sukses menghapus data", "success");
    } else {
      useSnackbar().sendSnackbar("Gagal menghapus data", "error");
    }
  } catch (error) {
    console.error("Error menghapus file:", error);
    useSnackbar().sendSnackbar("Terjadi kesalahan saat menghapus", "error");
  }
};

const handleAddAuditor = () => {
  dataPemeriksaanProduk.value?.auditor.push(selectedAudiotor.value);
  assignAuditorData.value.push(newAuditorData);
};

const handleDeleteAuditor = (index: number) => {
  dataPemeriksaanProduk.value.auditor.splice(index, 1);
};

const handleSaveAuditor = async () => {
  if (process.client) {
    localStorage.setItem(
      "lovAuditor",
      JSON.stringify(dataPemeriksaanProduk.value.auditor)
    );
    localStorage.setItem("tanggalMulai", tanggalMulai.value);
    localStorage.setItem("tanggalSelesai", tanggalSelesai.value);
  }
};

const uploadDocument = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("id", String(id));
    formData.append("file", file);
    formData.append("type", "produk");

    const response = await $api("/shln/submission/document/upload", {
      method: "POST",
      body: formData,
    });

    if (response?.code === 2000) {
      return response.data.file_url; // URL file yang telah diunggah
    } else {
      useSnackbar().sendSnackbar("Gagal mengunggah file!", "error");
      throw new Error("File upload failed");
    }
  } catch (error) {
    useSnackbar().sendSnackbar(
      "Ada kesalahan saat mengunggah file, gagal menyimpan!",
      "error"
    );
    console.error("Upload Error:", error);
    throw error;
  }
};

const handleUploadFile = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target.files?.length) return;

  const fileData = target.files[0];

  // 🔹 Validasi format & ukuran file
  if (fileData.type !== "application/pdf") {
    useSnackbar().sendSnackbar("File harus dalam format PDF!", "error");
    return;
  }
  if (fileData.size > MAX_FILE_SIZE) {
    useSnackbar().sendSnackbar("Ukuran file maksimal 20MB!", "error");
    return;
  }

  uploadedFile.value = { name: fileData.name, file: fileData };

  try {
    const fileUrl = await uploadDocument(fileData);
    formUploadLaporan.value.filename = fileUrl;
    useSnackbar().sendSnackbar("File berhasil diunggah!", "success");
  } catch (error) {
    console.error("Upload Error:", error);
  }
};

const handleSaveFileUpload = async () => {
  if (!formUploadLaporan.value.filename) {
    useSnackbar().sendSnackbar(
      "Harap unggah file sebelum menyimpan!",
      "warning"
    );
    return;
  }

  if (!id) {
    useSnackbar().sendSnackbar("ID tidak valid!", "error");
    console.error("Error: ID is undefined or null");
    return;
  }

  if (!selectedAuditResult.value) {
    useSnackbar().sendSnackbar("Harap pilih hasil audit!", "warning");
    return;
  }

  try {
    const fileResponse = await $api(
      "/reguler/lph/laporan-audit/upload-laporan-audit",
      {
        method: "POST",
        query: { id },
        body: JSON.stringify(formUploadLaporan.value),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (fileResponse.code !== 2000) {
      useSnackbar().sendSnackbar("Gagal menyimpan laporan audit!", "error");
      console.error("API Error:", fileResponse);
      return;
    }

    const auditResponse = await $api(
      "/reguler/lph/laporan-audit/save-audit-result",
      {
        method: "POST",
        query: { id },
        body: { hasil_audit: selectedAuditResult.value },
      }
    );

    if (auditResponse.code === 2000) {
      resetForm();
      useSnackbar().sendSnackbar(
        "Sukses menyimpan laporan audit dan hasil audit!",
        "success"
      );
    } else {
      useSnackbar().sendSnackbar("Gagal menyimpan hasil audit!", "error");
      console.error("API Error:", auditResponse);
    }

    getListLaporan();
  } catch (error) {
    useSnackbar().sendSnackbar("Terjadi kesalahan saat menyimpan!", "error");
    console.error("Request Error:", error);
  }
};

const handleUpdateStatus = async () => {
  if (!process.client) return;

  const auditorToAdd = localStorage.getItem("lovAuditor");
  const dataArray = JSON.parse(auditorToAdd) || [];

  const startDate = formatDateTime(localStorage.getItem("tanggalMulai"));
  const endDate = formatDateTime(localStorage.getItem("tanggalSelesai"));

  if (!startDate || !endDate) {
    return useSnackbar().sendSnackbar(
      "Tanggal mulai dan selesai harus diisi!",
      "error"
    );
  }
  if (dataArray.length === 0) {
    return useSnackbar().sendSnackbar(
      "Harap isi auditor terlebih dahulu",
      "error"
    );
  }

  const ids = dataArray.map((item) => item.id_auditor || null);

  try {
    // API Assign Auditor
    const responseAuditor = await $api("/reguler/auditor/assign", {
      method: "post",
      query: { id },
      body: { id_auditor: ids },
    });

    if (responseAuditor.code !== 2000) {
      return useSnackbar().sendSnackbar("Gagal menyimpan auditor", "error");
    }
    useSnackbar().sendSnackbar("Berhasil menambah auditor", "success");

    const responseTanggal = await $api("/reguler/auditor/assign-dates", {
      method: "post",
      query: { id },
      body: {
        jadwal_awal: startDate,
        jadwal_akhir: endDate,
      },
    });

    if (responseTanggal.code === 2000) {
      useSnackbar().sendSnackbar(
        "Berhasil menyimpan tanggal pemeriksaan",
        "success"
      );
    } else {
      return useSnackbar().sendSnackbar("Gagal menyimpan tanggal", "error");
    }

    // API Kirim Data (Pastikan tetap dijalankan)
    const response = await $api("/reguler/lph/post-audit/kirim", {
      method: "put",
      body: {
        id_reg: id,
        keterangan: "update",
      },
    });

    if (response?.code === 2000) {
      useSnackbar().sendSnackbar("Sukses kirim data", "success");
      return response?.data;
    } else {
      useSnackbar().sendSnackbar(
        response.errors.list_error.join(", "),
        "error"
      );
    }
  } catch (error) {
    console.error("Error saat menyimpan data:", error);
    useSnackbar().sendSnackbar(
      "Terjadi kesalahan saat menyimpan data",
      "error"
    );
  }
};

const getDetailData = async (type: string) => {
  try {
    const response: any = await $api("/reguler/lph/detail-payment", {
      method: "get",
      params: { url: `${LIST_INFORMASI_PEMBAYARAN}/${id}/${type}` },
    });

    if (response?.code === 2000) return response?.data;
    else useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const handleDownloadForm = async (fileName: string, param: string) => {
  return await downloadDocument(fileName, param);
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

const getListLaporan = async () => {
  laporanAudit.value = {
    ...laporanAudit.value,
    value: [],
  };
  const response: any = await $api(
    "/reguler/lph/laporan-audit/list-laporan-audit",
    {
      method: "get",
      query: { id },
    }
  );

  if (response.code === 2000) {
    laporanAudit.value = {
      ...laporanAudit.value,
      value: response.data,
    };
    if (response.data.length > 0) {
      downloadForms.hasil_audit = response.data[0].filename;
      uploadedFile.value.file = response.data[0].filename;
    }
  }

  return response || [];
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

const fetchHasilAudit = async () => {
  try {
    const response = await $api("/reguler/lph/laporan-audit/get-hasil-audit", {
      method: "get",
      query: { id },
    });

    console.log("Response hasil audit:", response);

    if (response.code == 2000) {
      if (response.data.length > 0) {
        selectedAuditResult.value = response.data[0].hasil_audit;
      }
    }
  } catch (error) {
    console.error("Gagal mengambil hasil audit:", error);
  }
};

onMounted(async () => {
  loading.value = true;

  if (process.client) {
    tanggalMulai.value = localStorage.getItem("tanggalMulai") || "";
    tanggalSelesai.value = localStorage.getItem("tanggalSelesai") || "";
  }

  const responseData = await Promise.allSettled([
    getDetailData("pengajuan"),
    getDetailData("produk"),
    getDetailData("pemeriksaanproduk"),
    getListAuditor(),
    fetchHasilAudit(),
    getListLaporan(),
    // getDownloadForm("file_laporan", "file_laporan"),
    // getDownloadForm("file_kh", "file_kh"),
  ]);

  dataPengajuan.value = responseData?.[0]?.value || {};
  dataProduk.value = responseData?.[1]?.value || [];
  dataPemeriksaanProduk.value = responseData?.[2]?.value || {};
  localStorage.setItem(
    "lovAuditor",
    JSON.stringify(responseData?.[2]?.value.auditor)
  );
  loading.value = false;
});
</script>

<template>
  <div v-if="!loading">
    <LPHDetailLayout>
      <template #page-title>
        <VRow no-gutters>
          <VCol>
            <h1>Detail Pemeriksaan</h1>
          </VCol>
          <VCol cols="auto" class="d-flex align-center">
            <VBtn
              text="Upload Laporan"
              variant="outlined"
              class="me-2"
              @click="handleOpenUploadModal"
            />
            <VBtn
              text="Assign Auditor"
              variant="outlined"
              class="me-2"
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
                  <!-- <VBtn rounded="xl" density="compact" class="px-2">
                    <template #default>
                      <VIcon icon="fa-download" />
                    </template>
                  </VBtn> -->
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
                <VCol>{{
                  formatToIDR(dataPemeriksaanProduk?.total_biaya)
                }}</VCol>
              </VRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
        <div class="mt-10">
          <PanelTracking :data="dataPemeriksaanProduk?.tracking" />
        </div>
      </template>
    </LPHDetailLayout>
    <VDialog v-model="isUploadModalOpen" max-width="840px" persistent>
      <VCard class="pa-4">
        <VCardTitle class="d-flex justify-space-between align-center">
          <div class="text-h3 font-weight-bold">Upload Laporan Audit</div>
          <VIcon @click="handleOpenUploadModal">fa-times</VIcon>
        </VCardTitle>

        <VCardText>
          <!-- Form Upload File -->
          <VRow class="mb-4 align-center">
            <VCol cols="3">
              <div class="text-body-1 font-weight-medium">Upload File</div>
            </VCol>
            <VCol cols="9">
              <VTextField
                v-if="uploadedFile.file"
                :model-value="uploadedFile.name"
                density="compact"
                placeholder="No file chosen"
                rounded="xl"
                class="mb-2"
              >
                <template #append-inner>
                  <VIcon
                    icon="fa-trash"
                    color="error"
                    class="cursor-pointer"
                    @click="handleRemoveFile(uploadedFile)"
                  />
                </template>
              </VTextField>

              <VFileInput
                v-else
                class="custom-file-input"
                density="compact"
                rounded="xl"
                label="Pilih File"
                accept="application/pdf"
                @change="handleUploadFile"
              >
                <template #append-inner>
                  <VBtn rounded="s-0 e-xl" text="Choose" />
                </template>
              </VFileInput>
              <div class="text-caption text-grey-darken-1 mt-1">
                * Hanya file PDF dengan ukuran maksimal 20MB
              </div>
            </VCol>
          </VRow>

          <!-- Form Pilih Hasil Audit -->
          <VRow class="mb-4 align-center">
            <VCol cols="3">
              <div class="text-body-1 font-weight-medium">
                Pilih Hasil Audit
              </div>
            </VCol>
            <VCol cols="9">
              <VSelect
                v-model="selectedAuditResult"
                :items="auditResults"
                item-title="label"
                item-value="value"
                density="compact"
                rounded="xl"
                label="Pilih Hasil Audit"
              />
            </VCol>
          </VRow>

          <VDivider class="my-4" />

          <!-- Tabel Data Laporan Audit -->
          <div class="text-h5 font-weight-bold mb-3">Data Laporan Audit</div>
          <VDataTable
            :headers="laporanAudit.label"
            :items="laporanAudit.value"
            hide-default-footer
          >
            <template #item.index="{ index }">
              {{ index + 1 }}
            </template>
            <template #item.actions="{ item }">
              <VIcon
                icon="mdi-delete"
                color="error"
                class="cursor-pointer"
                @click="() => handleRemoveFile(item)"
              />
            </template>
          </VDataTable>
        </VCardText>

        <VCardActions class="px-4">
          <VBtn
            variant="outlined"
            class="px-4 me-3"
            @click="handleOpenUploadModal"
          >
            Batal
          </VBtn>
          <VBtn
            variant="flat"
            class="px-4"
            color="primary"
            @click="handleSaveFileUpload"
          >
            Simpan
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <VDialog v-model="isAssignModalOpen" max-width="840px" persistent>
      <VCard class="pa-4">
        <VCardTitle class="d-flex justify-space-between align-center">
          <div class="text-h3 font-weight-bold">Update Auditor</div>
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
                @input="handleInputAuditor"
                @update:model-value="(v) => (assignedAuditor = v)"
                return-object
                class="mb-5"
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
                class="auditor-table"
                :headers="assignAuditorHeader"
                :items="dataPemeriksaanProduk?.auditor"
                hide-default-footer
              >
                <template #item.index="{ index }">
                  {{ index + 1 }}
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
          <VRow class="mb-5">
            <VCol>
              <div class="text-h6 mb-1">Tanggal Mulai</div>
              <VTextField
                v-model="tanggalMulai"
                type="date"
                density="compact"
                placeholder="Pilih tanggal mulai"
              />
            </VCol>
            <VCol>
              <div class="text-h6 mb-1">Tanggal Selesai</div>
              <VTextField
                v-model="tanggalSelesai"
                type="date"
                density="compact"
                placeholder="Pilih tanggal selesai"
              />
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
            <VCol>
              Pastikan sudah memilih auditor untuk pengajuan ini dan sudah meng
              upload laporan audit.
            </VCol>
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
            Kirim
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
