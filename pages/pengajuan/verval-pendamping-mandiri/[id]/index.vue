<script setup lang="ts">
import { formatCurrencyIntl } from "@/utils/conversionIntl";

const defaultStatus = { color: "error", desc: "Unknown Status" };
const loadingTandaiOK = ref(false);

const statusItem = new Proxy(
  {
    OF1: { color: "primary", desc: "Draft" },
    OF10: { color: "success", desc: "Submitted" },
    OF11: { color: "success", desc: "Verification" },
    OF15: { color: "success", desc: "Verified" },
    OF2: { color: "error", desc: "Returned" },
    OF290: { color: "error", desc: "Rejected" },
    OF5: { color: "success", desc: "Invoice issued" },
    OF300: { color: "success", desc: "Halal Certified Issued" },
    OF320: { color: "success", desc: "Code Issued" },
    OF50: { color: "success", desc: "Dikirim ke LPH" },
    OF285: { color: "success", desc: "Dikembalikan Oleh Fatwa" },
    OF74: { color: "success", desc: "Sent to Komite Fatwa" },
    OF280: { color: "success", desc: "Dikembalikan Ke PU" },
    OF100: { color: "success", desc: "Selesai Sidang Fatwa" },
    OF120: { color: "success", desc: "Certificate Issued" },
    OF900: { color: "error", desc: "Dibatalkan" },
    OF71: { color: "success", desc: "Selesai P3H" },
    OF56: { color: "success", desc: "Pembayaran" },
    OF72: { color: "success", desc: "Verifikasi LP3H" },
  },
  {
    get(target: any, prop: string) {
      return prop in target ? target[prop] : defaultStatus;
    },
  }
);

const skalaUsaha = ref([]);

const router = useRouter();
const route = useRoute<"">();
const submissionId = route.params?.id as string;

const snackbar = useSnackbar();

const isDeleteModalOpen = ref(false);
const isSendModalOpen = ref(false);

const panelSubmission = ref([0, 1]);
const panelPic = ref([0, 1]);
const panelAspectLegal = ref([0, 1]);
const panelFactory = ref([0, 1]);
const panelOutlet = ref([0, 1]);
const panelSupervisor = ref([0, 1]);
const panelSubstance = ref([0, 1]);
const panelProduct = ref([0, 1]);
const panelProductionProcess = ref([0, 1]);
const panelDownloadFormulir = ref([0, 1]);
const panelRegistration = ref([0, 1]);
const panelFatwaHearing = ref([0, 1]);
const panelHalalCertificate = ref([0, 1]);
const panelTracking = ref([]);

const submissionDetail = reactive({
  id_reg: "",
  tanggal_buat: "",
  no_mohon: "",
  tgl_mohon: "",
  jenis_layanan: "",
  jenis_produk: "",
  merk_dagang: "",
  area_pemasaran: "",
  pendamping: "",
  lembaga_pendamping: "",
  nama_kbli: "",
  nama_pu: "",
  alamat_pu: "",
  kota_pu: "",
  provinsi_pu: "",
  kode_pos_pu: "",
  negara_pu: "",
  telp_pu: "",
  email: "",
  jenis_badan_usaha: "",
  skala_usaha: "",
  tingkat_usaha: "",
  modal_usaha: 0,
  asal_usaha: "",
  narasi: "",
  url_sample_penyelia_sk: "",
});

const picDetail = reactive({
  nama_pj: "",
  nomor_kontak_pj: "",
  email_pj: "",
});

const pages = reactive({
  bahan: 1,
});

const itemPerPages = reactive({
  bahan: 10,
});

const kbliDropdown = ref<any>([]);

const getExistKbli = () => {
  const result = kbliDropdown.value.find((el: any) => {
    return el.uraian_usaha === submissionDetail.nama_kbli;
  });

  return result ? result.id : null;
};

const selectedKbli = ref(null);

const kbliData = computed(() => {
  return selectedKbli.value ? selectedKbli.value : getExistKbli();
});

const isEditButtonDisabled = computed(() => {
  if (selectedKbli.value) return getExistKbli() == selectedKbli.value;
  else return getExistKbli() !== selectedKbli.value;
});

const aspectLegalHeader = [
  { title: "No", key: "no", nowrap: true, sortable: false },
  { title: "Jenis", key: "jenis_surat", nowrap: true },
  { title: "No. Dokumen", key: "no_surat", nowrap: true },
  { title: "Tanggal", key: "tanggal_surat", nowrap: true },
  { title: "Masa Berlaku", key: "masa_berlaku", nowrap: true },
  { title: "Instansi Penerbit", key: "instansi_penerbit", nowrap: true },
];

const aspectLegalItems = ref([]);

const factoryHeader = [
  { title: "No", key: "no", nowrap: true, sortable: false },
  { title: "Nama", key: "nama_pabrik", nowrap: true },
  { title: "Alamat", key: "alamat_pabrik" },
];

const factoryItems = ref([]);

const outletHeader = [
  { title: "No", key: "no", nowrap: true, sortable: false },
  { title: "Nama", key: "nama_outlet", nowrap: true },
  { title: "Alamat", key: "alamat_outlet" },
];

const outletItems = ref([]);

const supervisorHeader = [
  { title: "No", key: "no", nowrap: true, sortable: false },
  { title: "Nama", key: "penyelia_nama", nowrap: true },
  { title: "No. KTP", key: "no_ktp", nowrap: true },
  { title: "No. Kontak", key: "no_kontak", nowrap: true },
  {
    title: "No/Tgl Sertif Penyelia Halal",
    key: "no_penyelia_halal",
    nowrap: true,
  },
  { title: "No/Tgl SK", key: "no_sk", nowrap: true },
];

const supervisorItems = ref([]);

const substanceHeader = [
  { title: "No", key: "no", nowrap: true, sortable: false },
  { title: "Jenis Bahan ", key: "type", nowrap: true },
  { title: "Nama Bahan", key: "name", nowrap: true },
  { title: "Produsen", key: "produsen", nowrap: true },
  { title: "Kelompok", key: "kelompok", nowrap: true },
  { title: "No. Sertifikat Halal", key: "sertificateNumber", nowrap: true },
];

const substanceItems = ref([]);

const productHeader = [
  { title: "No.", key: "no", nowrap: true, sortable: false },
  { title: "Nama Produk ", key: "nama_produk", nowrap: true },

  // { title: "Merk ", key: "brand", nowrap: true },
  { title: "Foto", key: "photo", sortable: false, nowrap: true },
  { title: "Jumlah Bahan Digunakan", key: "jumlah_bahan", nowrap: true },
];

const productItems = ref([]);

const downloadForms = reactive({
  surat_permohonan: "",
  surat_pernyataan: "",
  ikrar: "",
  hasil_verval: "",
  rekomendasi: "",
  sjph: "",
  laporan: "",
  sttd: "",
  sertifikasi_halal: "",
  laporan_pendamping: "",
}) as Record<string, string>;

const isComplete = computed(() => {
  return ["", "Draf"].includes(registrationDetail.status);
});

const registrationDetail = reactive({
  no_daftar: "",
  tgl_daftar: "",
  nama_provinsi: "",
  jenis_pengajuan: "",
  status: "",
  channel: "",
  fasilitator_name: "",
});

const fatwaSessionDetail = reactive({
  nomor_penetapan: "",
  tanggal_penetapan: "",
  ketetapan: "",
  dokumen: "",
});

const halalCertificateDetail = reactive({
  nomor_sertifikat: "",
  tanggal_sertifikat: "",
});

const trackingDetail = ref([]);

const handleUpdateKbli = async () => {
  try {
    const result: any = await $api(
      `/self-declare/submission/${submissionId}/update-kbli`,
      {
        method: "put",
        body: {
          kbli_id: selectedKbli.value,
        },
      }
    );

    if (result.code === 2000)
      snackbar.sendSnackbar("KBLI Successfully Updated", "success");
  } catch (error) {
    snackbar.sendSnackbar("Update KBLI Failed", "error");
  }
};

const handleDeleteSubmission = async () => {
  try {
    const result: any = await $api(
      `/self-declare/submission/${submissionId}/remove`,
      {
        method: "delete",
      }
    );

    if (result.code === 2000) {
      snackbar.sendSnackbar("Berhasil menghapus data", "success");
      router.push("/pengajuan/verval-pendamping-mandiri");
    }
  } catch (error) {
    snackbar.sendSnackbar("Gagal menghapus data", "error");
  }
};

const productionProcesss = ref("");

const handleGetNarration = async () => {
  try {
    const response: any = await $api("/self-declare/business-actor/narration", {
      method: "get",
      query: {
        id_reg: submissionId,
      },
    });

    if (response.code === 2000) productionProcesss.value = response.data.narasi;
  } catch (error) {
    console.log(error);
  }
};

const getSkalaUsaha = async () => {
  const response = await $api("/master/business-entity-scale", {
    method: "get",
  });

  skalaUsaha.value = response;
};

const loadBahan = async () => {
  try {
    const options = {
      method: "get",
    };

    const response = await $api(
      `/self-declare/submission/bahan/${submissionId}/list`,
      options
    );

    substanceItems.value = response.data;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

onMounted(async () => {
  await Promise.all([
    loadBahan(),
    getSkalaUsaha(),
    getSubmissionDetail(),
    getKbli(),
    getExistKbli(),
    handleGetNarration(),
    getDownloadForm("surat-permohonan", "surat_permohonan"),
    getDownloadForm("surat-pernyataan", "surat_pernyataan"),

    // getDownloadForm("ikrar", "ikrar"),
    getIkrarFile(),

    // getDownloadForm("surat-verval", "hasil_verval"),
    getDownloadForm("rekomendasi", "rekomendasi"),
    getDownloadForm("sjph", "sjph"),
    getDownloadForm("laporan", "hasil_verval"),
    getDownloadForm("setifikasi-halal", "sertifikasi_halal"),
    getDownloadForm("laporan-pendamping", "laporan_pendamping"),
  ]);
  if (registrationDetail.status == "") return;

  if (Number(registrationDetail.status.split("OF")[1]) >= 71)
    getDownloadForm("sttd", "sttd");
});

const getSubmissionDetail = async () => {
  try {
    const response: any = await $api(
      `/self-declare/submission/${submissionId}/detail`,
      {
        method: "get",
      }
    );

    if (response.code === 2000) {
      // data for left side
      Object.assign(submissionDetail, response.data.certificate_halal);
      Object.assign(picDetail, response.data.penanggung_jawab);
      aspectLegalItems.value = response.data.aspek_legal;
      factoryItems.value = response.data.pabrik;
      outletItems.value = response.data.outlet;
      supervisorItems.value = response.data.penyelia_halal;
      productItems.value = response.data.produk;

      // data for right side
      Object.assign(registrationDetail, response.data.certificate_halal);
      Object.assign(fatwaSessionDetail, response.data.sidang_fatwa);
      Object.assign(
        halalCertificateDetail,
        response.data.sertifikat_halal_info
      );
      trackingDetail.value = response.data.tracking;
      Object.assign(panelTracking.value, [0, 1]);
    }
  } catch (error) {
    router.push("/pengajuan/verval-pendamping-mandiri");
  }
};

const getKbli = async () => {
  const response3: any = await $api("/master/list-oss", {
    method: "get",
  });

  kbliDropdown.value = response3;
};

const getIkrarFile = async () => {
  try {
    const response: any = await $api("/self-declare/business-actor/statement", {
      method: "get",
      query: {
        id_reg: submissionId,
      },
    });

    if (response.code === 2000) downloadForms.ikrar = response.data.file;

    return response;
  } catch (error) {
    console.log(error);
  }
};

const tandaiOK = async () => {
  try {
    loadingTandaiOK.value = true;

    const res: any = await $api(
      "/self-declare/verificator/tandai-ok-vercal-pendamping-mandiri",
      {
        method: "put",
        body: {
          id_reg: submissionId,
        },
      }
    );

    console.log("@res", res);

    if (res?.code === 2000) {
      useSnackbar().sendSnackbar("Success", "success");
      loadingTandaiOK.value = false;

      setTimeout(() => {
        router.push("/pengajuan/verval-pendamping-mandiri");
      }, 1000);
    } else {
      useSnackbar().sendSnackbar(res?.errors.list_error?.join(", "), "error");
      loadingTandaiOK.value = false;
    }
  } catch (error) {
    console.log(error);
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingTandaiOK.value = false;
  }
};

const getDownloadForm = async (docName: string, propName: string) => {
  const result: any = await $api(
    `/self-declare/submission/${submissionId}/file`,
    {
      method: "get",
      query: {
        document: docName,
      },
    }
  );

  if (result.code === 2000) downloadForms[propName] = result.data.file;
};

const handleDownloadForm = async (fileName: string, directori: string) => {
  return await downloadDocument(fileName, directori);
};

const handleDownload = async (productId: string, directori: string) => {
  return await downloadDocument(productId, directori);
};

const handleDownloadSk = async (id: string) => {
  try {
    const response = await $api("download-sk-selfdeclare", {
      method: "post",
      body: {
        id,
      },
    });

    if (response.data.file) await handleDownload(response.data?.file, "FILES");
    else useSnackbar().sendSnackbar("Download gagal", "error");
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const handleOpenBlankWindow = (fileUri: string) => {
  window.open(fileUri, "_blank", "noopener,noreferrer");
};

const handleSentSubmission = async () => {
  try {
    const response: any = await $api("/self-declare/submission/send", {
      method: "post",
      body: {
        id_reg: submissionId,
      },
    });

    if (response.code === 2000) {
      snackbar.sendSnackbar("Berhasil mengirim pengajuan", "success");
      navigateTo("/pengajuan/verval-pendamping-mandiri");
    } else {
      if (response.errors.list_error.length > 0) {
        for (const element of response.errors.list_error)
          snackbar.sendSnackbar(element, "error");
      }
    }
  } catch (error) {
    // snackbar.sendSnackbar("Gagal mengirim pengajuan", "error");
    useSnackbar().sendSnackbar(
      error?.errors?.list_error[0] || "Ada kesalahan",
      "error"
    );
  }
};

const isCanEdit = () => {
  return (
    registrationDetail.status == "OF1" ||
    registrationDetail.status == "OF280" ||
    registrationDetail.status == "OF285"
  );
};
</script>

<template>
  <VContainer>
    <div
      class="d-flex align-center cursor-pointer"
      @click="router.push(`/pengajuan/verval-pendamping-mandiri`)"
    >
      <VIcon icon="mdi-chevron-left" size="40px" color="primary" />
      <div class="text-primary">Kembali</div>
    </div>
    <VRow align="center">
      <VCol :cols="isCanEdit() ? 8 : 12">
        <h3 class="text-h3 font-weight-bold">
          Detail Pengajuan Self Declare Mandiri
        </h3>
      </VCol>
      <VCol v-if="isCanEdit()" cols="4">
        <div class="d-flex justify-end align-center ga-2">
          <VBtn
            variant="outlined"
            color="error"
            class="px-3"
            @click="isDeleteModalOpen = true"
          >
            <VIcon icon="mdi-delete" />
          </VBtn>
          <VBtn
            variant="outlined"
            append-icon="ri-pencil-fill"
            @click="
              router.push(
                `/pengajuan/verval-pendamping-mandiri/${submissionId}/edit`
              )
            "
          >
            Ubah
          </VBtn>
          <VBtn @click="isSendModalOpen = true"> Kirim </VBtn>
        </div>
      </VCol>

      <VCol class="d-flex justify-end">
        <!--
          <VBtn
          :loading="loadingLihatLaporan"
          @click="lihatLaporan"
          variant="outlined"
          class="mx-2"
          >
          Lihat Laporan
          </VBtn>
        -->
        <VBtn
          variant="outlined"
          @click="
            router.push(
              `/pengajuan/verval-pendamping-mandiri/${submissionId}/edit`
            )
          "
        >
          Cek Data
        </VBtn>
        <VBtn
          :loading="loadingTandaiOK"
          color="#49A84C"
          class="mx-2"
          @click="tandaiOK"
        >
          Setujui
        </VBtn>
        <ModalPengajuanVervalPendampingMandiri modal-type="return" />
        <ModalPengajuanVervalPendampingMandiri modal-type="reject" />
      </VCol>
    </VRow>

    <VRow>
      <VCol cols="8">
        <VExpansionPanels
          v-model="panelSubmission"
          expand-icon="fa-chevron-down"
          collapse-icon="fa-chevron-up"
        >
          <VExpansionPanel class="py-2">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Pengajuan Sertifikasi Halal
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <InfoRow name="No. ID" :name-style="{ fontWeight: '600' }">
                {{ submissionDetail.id_reg ? submissionDetail.id_reg : "-" }}
              </InfoRow>
              <InfoRow name="Tanggal" :name-style="{ fontWeight: '600' }">
                {{
                  submissionDetail.tanggal_buat
                    ? formatFromIsoString(submissionDetail.tanggal_buat)
                    : "-"
                }}
              </InfoRow>
              <ThinLine :thickness="1" />
              <InfoRow
                name="No Surat Permohonan"
                :name-style="{ fontWeight: '600' }"
              >
                {{
                  submissionDetail.no_mohon ? submissionDetail.no_mohon : "-"
                }}
              </InfoRow>
              <InfoRow
                name="Tanggal Permohonan"
                :name-style="{ fontWeight: '600' }"
              >
                {{
                  submissionDetail.tgl_mohon
                    ? formatFromIsoString(submissionDetail.tgl_mohon)
                    : "-"
                }}
              </InfoRow>
              <InfoRow name="Jenis Layanan" :name-style="{ fontWeight: '600' }">
                {{
                  submissionDetail.jenis_layanan
                    ? submissionDetail.jenis_layanan
                    : "-"
                }}
              </InfoRow>
              <InfoRow name="Jenis Produk" :name-style="{ fontWeight: '600' }">
                {{
                  submissionDetail.jenis_produk
                    ? submissionDetail.jenis_produk
                    : "-"
                }}
              </InfoRow>
              <InfoRow name="Merk Dagang" :name-style="{ fontWeight: '600' }">
                {{
                  submissionDetail.merk_dagang
                    ? submissionDetail.merk_dagang
                    : "-"
                }}
              </InfoRow>
              <InfoRow name="Area Pemasaran" :name-style="{ fontWeight: '00' }">
                {{
                  submissionDetail.area_pemasaran
                    ? submissionDetail.area_pemasaran
                    : "-"
                }}
              </InfoRow>
              <InfoRow name="Pendamping" :name-style="{ fontWeight: '600' }">
                {{
                  submissionDetail.pendamping
                    ? submissionDetail.pendamping
                    : "-"
                }}
              </InfoRow>
              <InfoRow
                name="Lembaga Pendamping"
                :name-style="{ fontWeight: '600' }"
              >
                {{
                  submissionDetail.lembaga_pendamping
                    ? submissionDetail.lembaga_pendamping
                    : "-"
                }}
              </InfoRow>
              <InfoRow
                name="KBLI"
                class="d-flex align-center"
                :name-style="{ fontWeight: '600' }"
              >
                {{
                  submissionDetail.nama_kbli ? submissionDetail.nama_kbli : "-"
                }}
              </InfoRow>
              <ThinLine :thickness="1" />
              <InfoRow
                name="Nama Perusahaan"
                :name-style="{ fontWeight: '600' }"
              >
                {{ submissionDetail.nama_pu ? submissionDetail.nama_pu : "-" }}
              </InfoRow>
              <InfoRow name="Alamat" :name-style="{ fontWeight: '600' }">
                {{
                  submissionDetail.alamat_pu ? submissionDetail.alamat_pu : "-"
                }}
              </InfoRow>
              <InfoRow name="Kota / Kab" :name-style="{ fontWeight: '600' }">
                {{ submissionDetail.kota_pu ? submissionDetail.kota_pu : "-" }}
              </InfoRow>
              <InfoRow name="Provinsi" :name-style="{ fontWeight: '600' }">
                {{
                  submissionDetail.provinsi_pu
                    ? submissionDetail.provinsi_pu
                    : "-"
                }}
              </InfoRow>
              <InfoRow name="Kode Pos" :name-style="{ fontWeight: '600' }">
                {{
                  submissionDetail.kode_pos_pu
                    ? submissionDetail.kode_pos_pu
                    : "-"
                }}
              </InfoRow>
              <InfoRow name="Negara" :name-style="{ fontWeight: '600' }">
                {{
                  submissionDetail.negara_pu ? submissionDetail.negara_pu : "-"
                }}
              </InfoRow>
              <InfoRow name="Telepon" :name-style="{ fontWeight: '600' }">
                {{ submissionDetail.telp_pu ? submissionDetail.telp_pu : "-" }}
              </InfoRow>
              <InfoRow name="Email" :name-style="{ fontWeight: '600' }">
                {{ submissionDetail.email ? submissionDetail.email : "-" }}
              </InfoRow>
              <ThinLine :thickness="1" />
              <InfoRow
                name="Jenis Badan Usaha"
                :name-style="{ fontWeight: '600' }"
              >
                {{
                  submissionDetail.jenis_badan_usaha
                    ? submissionDetail.jenis_badan_usaha
                    : "-"
                }}
              </InfoRow>
              <InfoRow name="Skala Usaha" :name-style="{ fontWeight: '600' }">
                {{
                  submissionDetail.skala_usaha
                    ? submissionDetail.skala_usaha
                    : "-"
                }}
              </InfoRow>
              <InfoRow name="Tingkat Usaha" :name-style="{ fontWeight: '600' }">
                {{
                  skalaUsaha.find(
                    (data: any) => data.code == submissionDetail.tingkat_usaha
                  ) != undefined
                    ? (
                        skalaUsaha.find(
                          (data: any) =>
                            data.code == submissionDetail.tingkat_usaha
                        ) as any
                      ).name
                    : "-"
                }}
              </InfoRow>
              <InfoRow name="Modal Dasar" :name-style="{ fontWeight: '600' }">
                {{
                  submissionDetail.modal_usaha
                    ? formatCurrencyIntl(String(submissionDetail.modal_usaha))
                    : "Rp 0"
                }}
              </InfoRow>
              <InfoRow name="Asal Usaha" :name-style="{ fontWeight: '600' }">
                {{
                  submissionDetail.asal_usaha
                    ? submissionDetail.asal_usaha
                    : "-"
                }}
              </InfoRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br />
        <VExpansionPanels
          v-model="panelPic"
          expand-icon="fa-chevron-down"
          collapse-icon="fa-chevron-up"
        >
          <VExpansionPanel class="py-2">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Penanggung Jawab
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <InfoRow name="Nama" :name-style="{ fontWeight: '600' }">
                {{ picDetail.nama_pj ? picDetail.nama_pj : "-" }}
              </InfoRow>
              <InfoRow name="Nomor Kontak" :name-style="{ fontWeight: '600' }">
                {{
                  picDetail.nomor_kontak_pj ? picDetail.nomor_kontak_pj : "-"
                }}
              </InfoRow>
              <InfoRow name="Email" :name-style="{ fontWeight: '600' }">
                {{ picDetail.email_pj ? picDetail.email_pj : "-" }}
              </InfoRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br />
        <VExpansionPanels
          v-model="panelAspectLegal"
          expand-icon="fa-chevron-down"
          collapse-icon="fa-chevron-up"
        >
          <VExpansionPanel class="py-2">
            <VExpansionPanelTitle class="text-h4 font-weight-bold mb-3">
              Aspek Legal
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <VDataTable
                disable-sort
                v-if="aspectLegalItems.length"
                :headers="aspectLegalHeader"
                :items="aspectLegalItems"
                :hide-default-footer="aspectLegalItems.length < 10"
              >
                <template #item.no="{ index }">
                  {{ index + 1 }}
                </template>
                <template #item.tanggal_surat="{ item }: any">
                  {{
                    item.tanggal_surat
                      ? formatFromIsoString(item.tanggal_surat)
                      : "-"
                  }}
                </template>
                <template #item.masa_berlaku="{ item }: any">
                  {{ item.masa_berlaku ? item.masa_berlaku : "-" }}
                </template>
              </VDataTable>
              <VCard v-else variant="outlined" class="py-2">
                <VRow>
                  <VCol cols="12" align="center">
                    <img src="~/assets/images/empty-data.png" alt="" />
                    <div class="pt-2 font-weight-bold">Data Kosong</div>
                  </VCol>
                </VRow>
              </VCard>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br />
        <VExpansionPanels
          v-model="panelFactory"
          expand-icon="fa-chevron-down"
          collapse-icon="fa-chevron-up"
        >
          <VExpansionPanel class="py-2">
            <VExpansionPanelTitle class="text-h4 font-weight-bold mb-3">
              Pabrik
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <VDataTable
                disable-sort
                v-if="factoryItems.length"
                :headers="factoryHeader"
                :items="factoryItems"
                :hide-default-footer="factoryItems.length < 10"
              >
                <template #item.no="{ index }">
                  {{ index + 1 }}
                </template>
              </VDataTable>
              <VCard v-else variant="outlined" class="py-2">
                <VRow>
                  <VCol cols="12" align="center">
                    <img src="~/assets/images/empty-data.png" alt="" />
                    <div class="pt-2 font-weight-bold">Data Kosong</div>
                  </VCol>
                </VRow>
              </VCard>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br />
        <VExpansionPanels
          v-model="panelOutlet"
          expand-icon="fa-chevron-down"
          collapse-icon="fa-chevron-up"
        >
          <VExpansionPanel class="py-2">
            <VExpansionPanelTitle class="text-h4 font-weight-bold mb-3">
              Outlet
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <VDataTable
                disable-sort
                v-if="outletItems.length"
                :headers="outletHeader"
                :items="outletItems"
                :hide-default-footer="outletItems.length < 10"
              >
                <template #item.no="{ index }">
                  {{ index + 1 }}
                </template>
              </VDataTable>
              <VCard v-else variant="outlined" class="py-2">
                <VRow>
                  <VCol cols="12" align="center">
                    <img src="~/assets/images/empty-data.png" alt="" />
                    <div class="pt-2 font-weight-bold">Data Kosong</div>
                  </VCol>
                </VRow>
              </VCard>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br />
        <VExpansionPanels
          v-model="panelSupervisor"
          expand-icon="fa-chevron-down"
          collapse-icon="fa-chevron-up"
        >
          <VExpansionPanel class="py-2">
            <VExpansionPanelTitle class="text-h4 font-weight-bold mb-3">
              Penyelia Halal
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <VDataTable
                disable-sort
                v-if="supervisorItems.length"
                :headers="supervisorHeader"
                :items="supervisorItems"
                :hide-default-footer="supervisorItems.length < 10"
              >
                <template #item.no="{ index }">
                  {{ index + 1 }}
                </template>
                <template #item.no_penyelia_halal="{ item }: any">
                  {{ `${item.no_penyelia_halal}/${item.tgl_penyelia_halal}` }}
                </template>
                <template #item.no_sk="{ item }: any">
                  {{ `${item.no_sk}/${item.tanggal_sk}` }}
                </template>
              </VDataTable>
              <VCard v-else variant="outlined" class="py-2">
                <VRow>
                  <VCol cols="12" align="center">
                    <img src="~/assets/images/empty-data.png" alt="" />
                    <div class="pt-2 font-weight-bold">Data Kosong</div>
                  </VCol>
                </VRow>
              </VCard>
              <div>
                <VBtn
                  append-icon="fa-download"
                  variant="outlined"
                  class="float-end mt-6"
                  @click="handleDownloadSk(submissionId)"
                >
                  Download SK Penyelia
                </VBtn>
              </div>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br />
        <VExpansionPanels
          v-model="panelSubstance"
          expand-icon="fa-chevron-down"
          collapse-icon="fa-chevron-up"
        >
          <VExpansionPanel class="py-2">
            <VExpansionPanelTitle class="text-h4 font-weight-bold mb-3">
              Daftar Nama Bahan
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <VDataTable
                disable-sort
                v-if="substanceItems.length"
                v-model:page="pages.bahan"
                v-model:items-per-page="itemPerPages.bahan"
                :headers="substanceHeader"
                :items="substanceItems"
                :hide-default-footer="substanceItems.length < 10"
              >
                <template #item.no="{ index }">
                  {{ (pages.bahan - 1) * itemPerPages.bahan + index + 1 }}
                </template>
                <template #item.type="{ item }">
                  {{ item.jenis_bahan }}
                </template>
                <template #item.name="{ item }">
                  {{ item.nama_bahan }}
                </template>
                <template #item.sertificateNumber="{ item }">
                  {{ item.no_sertifikat }}
                </template>
              </VDataTable>
              <VCard v-else variant="outlined" class="py-2">
                <VRow>
                  <VCol cols="12" align="center">
                    <img src="~/assets/images/empty-data.png" alt="" />
                    <div class="pt-2 font-weight-bold">Data Kosong</div>
                  </VCol>
                </VRow>
              </VCard>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br />
        <VExpansionPanels
          v-model="panelProduct"
          expand-icon="fa-chevron-down"
          collapse-icon="fa-chevron-up"
        >
          <VExpansionPanel class="py-2">
            <VExpansionPanelTitle class="text-h4 font-weight-bold mb-3">
              Daftar Nama Produk
            </VExpansionPanelTitle>
            <VExpansionPanelText class="d-flex align-center">
              <VDataTable
                disable-sort
                v-if="productItems.length"
                :headers="productHeader"
                :items="productItems"
                class="elevation-1"
                fixed-header
                :hide-default-footer="productItems.length < 10"
              >
                <template #item.no="{ index }">
                  {{ index + 1 }}
                </template>
                <template #item.photo="{ item }: any">
                  <VIcon
                    color="primary"
                    style="cursor: pointer"
                    @click="handleDownload(item.photo, 'PRODUCT')"
                  >
                    ri-download-2-fill
                  </VIcon>
                </template>
              </VDataTable>
              <VCard v-else variant="outlined" class="py-2">
                <VRow>
                  <VCol cols="12" align="center">
                    <img src="~/assets/images/empty-data.png" alt="" />
                    <div class="pt-2 font-weight-bold">Data Kosong</div>
                  </VCol>
                </VRow>
              </VCard>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br />
        <VExpansionPanels
          v-model="panelProductionProcess"
          expand-icon="fa-chevron-down"
          collapse-icon="fa-chevron-up"
        >
          <VExpansionPanel class="py-2">
            <VExpansionPanelTitle class="text-h4 font-weight-bold mb-3">
              Proses Produksi
            </VExpansionPanelTitle>
            <VExpansionPanelText class="d-flex align-center">
              <VTextarea
                ref="processProduction"
                v-model="productionProcesss"
                rounded="xl"
                outlined
                readonly
              />
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
      </VCol>
      <VCol cols="4">
        <VExpansionPanels
          v-model="panelDownloadFormulir"
          expand-icon="fa-chevron-down"
          collapse-icon="fa-chevron-up"
        >
          <VExpansionPanel class="py-2">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Formulir Unduhan
            </VExpansionPanelTitle>
            <VExpansionPanelText class="d-flex align-center">
              <InfoRowV2
                class="d-flex align-center"
                name="Surat Permohonan"
                :style="{ fontWeight: '600' }"
              >
                <VBtn
                  :color="
                    downloadForms.surat_permohonan ? 'primary' : '#A09BA1'
                  "
                  density="compact"
                  class="px-2"
                  @click="
                    downloadForms.surat_permohonan
                      ? handleDownloadForm(
                          downloadForms.surat_permohonan,
                          'FILES'
                        )
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
                name="Surat Pernyataan"
                :style="{ fontWeight: '600' }"
              >
                <VBtn
                  :color="
                    downloadForms.surat_pernyataan ? 'primary' : '#A09BA1'
                  "
                  density="compact"
                  class="px-2"
                  @click="
                    downloadForms.surat_pernyataan
                      ? handleDownloadForm(
                          downloadForms.surat_pernyataan,
                          'FILES'
                        )
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
                name="Ikrar"
                :style="{ fontWeight: '600' }"
              >
                <VBtn
                  :color="downloadForms.ikrar ? 'primary' : '#A09BA1'"
                  density="compact"
                  class="px-2"
                  @click="
                    downloadForms.ikrar
                      ? handleDownload(downloadForms.ikrar, 'DOC')
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
                name="Hasil Verval"
                :style="{ fontWeight: '600' }"
              >
                <VBtn
                  :color="downloadForms.hasil_verval ? 'primary' : '#A09BA1'"
                  density="compact"
                  class="px-2"
                  @click="
                    downloadForms.hasil_verval
                      ? handleDownloadForm(downloadForms.hasil_verval, 'DOC')
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
                name="Rekomendasi"
                :style="{ fontWeight: '600' }"
              >
                <VBtn
                  :color="downloadForms.rekomendasi ? 'primary' : '#A09BA1'"
                  density="compact"
                  class="px-2"
                  @click="
                    downloadForms.rekomendasi
                      ? handleDownloadForm(downloadForms.rekomendasi, 'DOC')
                      : null
                  "
                >
                  <template #default>
                    <VIcon icon="fa-download" />
                  </template>
                </VBtn>
              </InfoRowV2>
              <!--
                <InfoRowV2
                class="d-flex align-center"
                name="SJPH"
                :style="{ fontWeight: '600' }"
                >
                <VBtn
                @click="
                downloadForms.sjph
                ? handleDownloadForm(downloadForms.sjph)
                : null
                "
                :color="downloadForms.sjph ? 'primary' : '#A09BA1'"
                density="compact"
                class="px-2"
                >
                <template #default>
                <VIcon icon="fa-download" />
                </template>
                </VBtn>
                </InfoRowV2>
                <InfoRowV2
                class="d-flex align-center"
                name="Laporan"
                :style="{ fontWeight: '600' }"
                >
                <VBtn
                @click="
                downloadForms.laporan
                ? handleDownloadForm(downloadForms.laporan)
                : null
                "
                :color="downloadForms.laporan ? 'primary' : '#A09BA1'"
                density="compact"
                class="px-2"
                >
                <template #default>
                <VIcon icon="fa-download" />
                </template>
                </VBtn>
                </InfoRowV2>
              -->
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
                      ? handleDownloadForm(
                          downloadForms.sertifikasi_halal,
                          'SERT'
                        )
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
                name="Laporan Pendamping"
                :style="{ fontWeight: '600' }"
              >
                <VBtn
                  :color="
                    downloadForms.laporan_pendamping ? 'primary' : '#A09BA1'
                  "
                  density="compact"
                  class="px-2"
                  @click="
                    downloadForms.laporan_pendamping
                      ? handleDownloadForm(
                          downloadForms.laporan_pendamping,
                          'FILES'
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
        </VExpansionPanels>
        <br />
        <VExpansionPanels
          v-model="panelRegistration"
          expand-icon="fa-chevron-down"
          collapse-icon="fa-chevron-up"
        >
          <VExpansionPanel class="py-2">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Pendaftaran
            </VExpansionPanelTitle>
            <VExpansionPanelText class="d-flex align-center">
              <InfoRowV2
                class="d-flex align-center"
                name="Nomor Daftar"
                :style="{ fontWeight: '600' }"
              >
                {{
                  registrationDetail.no_daftar
                    ? registrationDetail.no_daftar
                    : "-"
                }}
              </InfoRowV2>
              <InfoRowV2
                class="d-flex align-center"
                name="Tanggal"
                :style="{ fontWeight: '600' }"
              >
                {{
                  registrationDetail.status != "OF1"
                    ? registrationDetail.tgl_daftar
                      ? formatFromIsoString(registrationDetail.tgl_daftar)
                      : "-"
                    : ""
                }}
              </InfoRowV2>
              <InfoRowV2
                class="d-flex align-center"
                name="Tempat Pendaftaran"
                :style="{ fontWeight: '600' }"
              >
                {{
                  registrationDetail.nama_provinsi
                    ? registrationDetail.nama_provinsi
                    : "-"
                }}
              </InfoRowV2>
              <InfoRowV2
                class="d-flex align-center"
                name="Jenis Pengajuan"
                :style="{ fontWeight: '600' }"
              >
                {{
                  registrationDetail.jenis_pengajuan
                    ? registrationDetail.jenis_pengajuan
                    : "-"
                }}
              </InfoRowV2>
              <InfoRowV2
                class="d-flex align-center"
                name="Status"
                :style="{ fontWeight: '600' }"
              >
                <VChip
                  style="background: #f0e9f1"
                  :color="statusItem[registrationDetail.status].color"
                  variant="outlined"
                  rounded="lg"
                >
                  {{ statusItem[registrationDetail.status].desc }}
                </VChip>
              </InfoRowV2>
              <InfoRowV2
                class="d-flex align-top"
                name="Channel Pendaftaran"
                :style="{ fontWeight: '600' }"
              >
                {{
                  registrationDetail.channel ? registrationDetail.channel : "-"
                }}
              </InfoRowV2>
              <InfoRowV2
                class="d-flex align-center"
                name="Fasilitator"
                :style="{ fontWeight: '600' }"
              >
                {{
                  registrationDetail.fasilitator_name
                    ? registrationDetail.fasilitator_name
                    : "-"
                }}
              </InfoRowV2>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br />
        <VExpansionPanels
          v-model="panelFatwaHearing"
          expand-icon="fa-chevron-down"
          collapse-icon="fa-chevron-up"
        >
          <VExpansionPanel class="py-4">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Sidang Fatwa
            </VExpansionPanelTitle>
            <VExpansionPanelText class="d-flex align-center">
              <InfoRowV2
                class="d-flex align-center"
                name="Nomor Penetapan"
                :style="{ fontWeight: '600' }"
              >
                {{
                  fatwaSessionDetail.nomor_penetapan
                    ? fatwaSessionDetail.nomor_penetapan
                    : "-"
                }}
              </InfoRowV2>
              <InfoRowV2
                class="d-flex align-center"
                name="Tanggal Penetapan"
                :style="{ fontWeight: '600' }"
              >
                {{
                  fatwaSessionDetail.tanggal_penetapan
                    ? formatDateId(fatwaSessionDetail.tanggal_penetapan)
                    : "-"
                }}
              </InfoRowV2>
              <InfoRowV2
                class="d-flex align-center"
                name="Penetapan"
                :style="{ fontWeight: '600' }"
              >
                {{
                  fatwaSessionDetail.nomor_penetapan
                    ? fatwaSessionDetail.nomor_penetapan
                    : "-"
                }}
              </InfoRowV2>
              <InfoRowV2
                class="d-flex align-center"
                name="Dokumen"
                :style="{ fontWeight: '600' }"
              >
                {{
                  fatwaSessionDetail.dokumen ? fatwaSessionDetail.dokumen : "-"
                }}
              </InfoRowV2>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br />
        <VExpansionPanels
          v-model="panelHalalCertificate"
          expand-icon="fa-chevron-down"
          collapse-icon="fa-chevron-up"
        >
          <VExpansionPanel class="py-2">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Sertifikat Halal
            </VExpansionPanelTitle>
            <VExpansionPanelText class="d-flex align-center">
              <VRow :style="{ fontWeight: '600' }">
                <VCol cols="3"> Nomor Sertifikat </VCol>
                <VCol cols="1"> : </VCol>
                <VCol cols="8">
                  {{
                    halalCertificateDetail.nomor_sertifikat
                      ? halalCertificateDetail.nomor_sertifikat
                      : "-"
                  }}
                </VCol>
              </VRow>
              <VRow :style="{ fontWeight: '600' }">
                <VCol cols="3"> Tanggal Sertifikat </VCol>
                <VCol cols="1"> : </VCol>
                <VCol cols="8">
                  {{
                    halalCertificateDetail.tanggal_sertifikat
                      ? formatDateId(halalCertificateDetail.tanggal_sertifikat)
                      : "-"
                  }}
                </VCol>
              </VRow>
              <!--
                <InfoRowV2
                class="d-flex align-center"
                name="Nomor Sertifikat"
                :style="{ fontWeight: '600' }"
                >
                <p>
                {{
                halalCertificateDetail.nomor_sertifikat
                ? halalCertificateDetail.nomor_sertifikat
                : "-"
                }}
                </p>
                </InfoRowV2>
              -->
              <!--
                <InfoRowV2
                class="d-flex align-center"
                name="Tanggal Sertifikat"
                :style="{ fontWeight: '600' }"
                >
                {{
                halalCertificateDetail.nomor_sertifikat
                ? halalCertificateDetail.nomor_sertifikat
                : "-"
                }}
                </InfoRowV2>
              -->
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br />
        <VExpansionPanels
          v-model="panelTracking"
          expand-icon="fa-chevron-down"
          collapse-icon="fa-chevron-up"
        >
          <VExpansionPanel class="py-2">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Melacak
            </VExpansionPanelTitle>
            <VExpansionPanelText class="d-flex align-center">
              <Tracking :data="trackingDetail" />
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
      </VCol>
    </VRow>
  </VContainer>
  <ShSubmissionDetailFormModal
    dialog-title="Menghapus Data"
    :dialog-visible="isDeleteModalOpen"
    dialog-use="DELETE"
    @update:dialog-visible="isDeleteModalOpen = $event"
    @submit:commit-action="handleDeleteSubmission"
  >
    <VCardText>
      <div>Apakah yakin ingin menghapus data pengajuan ini</div>
    </VCardText>
  </ShSubmissionDetailFormModal>
  <ShSubmissionDetailFormModal
    dialog-title="Kirim Pengajuan"
    :dialog-visible="isSendModalOpen"
    dialog-use="SEND"
    @update:dialog-visible="isSendModalOpen = $event"
    @submit:commit-action="handleSentSubmission"
  >
    <VCardText>
      <div>Apakah yakin ingin mengirim pengajuan ini</div>
    </VCardText>
  </ShSubmissionDetailFormModal>
</template>
