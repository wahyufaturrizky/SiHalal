<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useSnackbar } from "@/composables/useSnackbar"; 
import { navigateTo } from "#app";

const loading = ref<boolean>(false);
const page = ref<number>(1);
const size = ref<number>(10);
const searchQuery = ref<string>("");
const dataTable = ref<any[]>([]);
const totalItems = ref<number>(0);
const loadingDownloadExcel = ref(false);

const nomorPendaftaran = ref<string>("");
const nomorSertifikat = ref<string>("");
const namaPelakuUsaha = ref<string>("");
const merekDagangan = ref<string>("");
const jenisPermohonan = ref<string>("");
const statusPermohonan = ref<string>("");
const jenisPendaftaran = ref<string>("");
const namaFasilitator = ref<string>("");
const jenisLayanan = ref<string>("");
const listJenisLayanan = ref([]);

const statusPermohonanOptions = ref([
  { label: "Draft PU", value: "OF1" },
  { label: "Submitted", value: "OF10" },
  { label: "Verifikasi", value: "OF15" },
  { label: "DIkirim ke LPH", value: "OF50" },
  { label: "Penetapan Biaya", value: "OF55" },
  { label: "Pembayaran", value: "OF56" },
  { label: "Proses di LPH", value: "OF60" },
  { label: "Selesai Proses LPH", value: "OF70" },
  { label: "Dikirim ke Komisi Fatwa", value: "OF75" },
  { label: "Terbit SH", value: "OF300" },
]);

const jenisPermohonanOptions = ref([
  { label: "Pendaftaran Mandiri/Regular", value: "CH001" },
  { label: "Pendaftaran Melalui Fasilitasi", value: "CH002" },
]);

const jenisPendaftaranOptions = ref([
  { label: "Baru", value: "JD.1" },
  { label: "Pengembangan", value: "JD.3" },
]);

const tableHeader = [
  { title: "No", value: "no" },
  { title: "No. Daftar", value: "no_daftar" },
  { title: "Tanggal", value: "tgl_daftar" },
  { title: "Nama PU", value: "nama_pu" },
  { title: "Jenis Daftar", value: "jenis_pendaftaran" },
  { title: "Jenis Layanan", value: "jenis_layanan" },
  { title: "Status", value: "status" },
  { title: "Action", value: "action" },
];

const navigateToDetail = (id_reg: string) => {
  navigateTo(`/lph/inquiry-lph/${id_reg}`);
};


const loadItem = async () => {
  try {
    const response: any = await $api("/inquiry-lph", {
      method: "get",
      params: {
        page: page.value,
        size: size.value,
        no_daftar: nomorPendaftaran.value,
        no_sertifikat: nomorSertifikat.value,
        nama_pu: namaPelakuUsaha.value,
        merek_dagang: merekDagangan.value,
        jenis_permohonan: jenisPermohonan.value,
        status: statusPermohonan.value,
        jenis_pendaftaran: jenisPendaftaran.value,
        nama_fasilitator: namaFasilitator.value,
        jenis_layanan: jenisLayanan.value
      },
    });

    if (response.code === 2000) {
      dataTable.value = response.data || [];
      totalItems.value = response.total_item || 0;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const downloadExcel = async () => {
  loadingDownloadExcel.value = true;

  try {
    const response: any = await $api("/inquiry-lph/download", {
      method: "get",
      params: {
        page: page.value,
        size: size.value,
        no_daftar: nomorPendaftaran.value,
        no_sertifikat: nomorSertifikat.value,
        nama_pu: namaPelakuUsaha.value,
        merek_dagang: merekDagangan.value,
        jenis_permohonan: jenisPermohonan.value,
        status: statusPermohonan.value,
        jenis_pendaftaran: jenisPendaftaran.value,
        nama_fasilitator: namaFasilitator.value,
        jenis_layanan: jenisLayanan.value
      },
    });

    if (response) {
      downloadFileExcel(response);
    } else {
      useSnackbar().sendSnackbar(
        response.errors?.list_error?.join(", ") || "Gagal mengunduh file",
        "error"
      );
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  } finally {
    loadingDownloadExcel.value = false;
  }
};

const loadJenisLayanan = async () => {
  try {
    const response = await $api("/master/jenis-layanan", {
      method: "get",
      query: {
        query: "empty",
      },
    });

    if (response.length > 0) {
      listJenisLayanan.value = response;

      return response;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan 5", "error");
  }
};

const handleInput = (e: any) => {
  debounce(() => {
    loadItem();
  }, 500)();
};

onMounted(() => {
  loading.value = true;
  //loadItem();
  loading.value = false;
  loadJenisLayanan();
});

watch([page, size], () => {
  loadItem();
});
</script>

<template>
  <div v-if="!loading">
    <VRow>
      <VCol cols="12">
        <h1 style="font-size: 32px">Inquiry</h1>
      </VCol>
    </VRow>

    <!-- FILTER -->
    <VRow>
      <VCol cols="12">
        <VCard>
          <VCardTitle>
            <div class="text-h4 font-weight-bold">Filter</div>
          </VCardTitle>
          <VCardItem>
            <VRow dense>
              <VCol cols="12" md="6" lg="4">
                <VTextField v-model="nomorPendaftaran" label="Nomor Pendaftaran" />
              </VCol>
              <VCol cols="12" md="6" lg="4">
                <VTextField v-model="nomorSertifikat" label="Nomor Sertifikat" />
              </VCol>
              <VCol cols="12" md="6" lg="4">
                <VTextField v-model="namaPelakuUsaha" label="Nama Pelaku Usaha" />
              </VCol>
              <VCol cols="12" md="6" lg="4">
                <VTextField v-model="merekDagangan" label="Merek Dagang" />
              </VCol>

              <VCol cols="12" md="6" lg="4">
                <VSelect
                  v-model="jenisLayanan"
                  :items="listJenisLayanan"
                  item-title="name"
                  item-value="code"
                  label="Jenis Layanan"
                  density="comfortable"
                  hide-details="auto"
                />
              </VCol>

              <VCol cols="12" md="6" lg="4">
                <VSelect
                  v-model="jenisPermohonan"
                  :items="jenisPermohonanOptions"
                  item-title="label"
                  item-value="value"
                  label="Jenis Permohonan"
                  density="comfortable"
                  hide-details="auto"
                />
              </VCol>

              <VCol cols="12" md="6" lg="4">
                <VSelect
                  v-model="statusPermohonan"
                  :items="statusPermohonanOptions"
                  item-title="label"
                  item-value="value"
                  label="Status Permohonan"
                  density="comfortable"
                  hide-details="auto"
                />
              </VCol>

              <VCol cols="12" md="6" lg="4">
                <VSelect
                  v-model="jenisPendaftaran"
                  :items="jenisPendaftaranOptions"
                  item-title="label"
                  item-value="value"
                  label="Jenis Pendaftaran"
                  density="comfortable"
                  hide-details="auto"
                />
              </VCol>

              <VCol cols="12" md="6" lg="4">
                <VTextField v-model="namaFasilitator" label="Nama Fasilitator" />
              </VCol>
            </VRow>

            <VRow>
              <VCol cols="12" class="d-flex justify-end" style="gap: 12px;">
                <VBtn
                  :loading="loadingDownloadExcel"
                  @click="downloadExcel"
                  variant="flat"
                >
                  Download Excel
                </VBtn>
                <VBtn color="primary" @click="loadItem">View</VBtn>
              </VCol>
            </VRow>
          </VCardItem>
        </VCard>
      </VCol>
    </VRow>


    <!-- DATA TABEL -->
    <VRow class="mt-4">
      <VCol cols="12">
        <VCard>
          <VCardTitle>
            <div class="text-h4 font-weight-bold">Data Pengajuan Sertifikasi Halal</div>
          </VCardTitle>
          <VCardItem>
            <!-- <VRow>
              <VCol cols="12">
                <VTextField
                  v-model="searchQuery"
                  placeholder="Cari Nama Pengajuan"
                  density="compact"
                  append-inner-icon="ri-search-line"
                  style="max-inline-size: 100%"
                  @input="handleInput"
                />
              </VCol>                              
            </VRow> -->

            <VRow>
              <VCol cols="12">
                <VDataTableServer
                  disable-sort
                  v-if="dataTable"
                  v-model:items-per-page="size"
                  v-model:page="page"
                  :items-per-page-options="[10, 25, 50, 100]"
                  :items-length="totalItems"
                  :loading="loading"
                  :headers="tableHeader"
                  :items="dataTable"
                  class="border rounded"
                >
                  <template #no-data>
                    <div class="w-full mt-2 text-center">
                      <img src="~/assets/images/empty-data.png" alt="empty_data" />
                      <div class="pt-2 pb-2 font-weight-bold">Data Kosong</div>
                    </div>
                  </template>

                  <template #item.no="{ index }">
                    {{ index + 1 + (page - 1) * size }}
                  </template>

                  <template #item.tanggal="{ item }">
                    {{ formatDateId(item.tanggal) }}
                  </template>

                  <template #item.action="{ item }">
                    <VIcon
                      color="primary"
                      icon="mdi-arrow-right"
                      @click="navigateToDetail((item as any).id_reg)"
                    />
                  </template>
                </VDataTableServer>
              </VCol>
            </VRow>
          </VCardItem>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>
