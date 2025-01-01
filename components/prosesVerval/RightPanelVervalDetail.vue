<script setup lang="ts">
const unduhan = ref([
  { id: 1, key: "Surat Permohonan", filename: "", api_key: "surat_permohonan" },
  { id: 2, key: "Surat Pernyataan", filename: "", api_key: "surat_pernyataan" },
  { id: 3, key: "Ikrar", filename: "", api_key: "ikrar" },
  { id: 4, key: "STTD", filename: "", api_key: "sttd" },
  { id: 5, key: "Cek Laporan", filename: "", api_key: "cek_laporan" },
  {
    id: 6,
    key: "Cek Hasil Pendampingan",
    filename: "",
    api_key: "laporan_pendamping",
  },
]);

const pendaftaran = ref([
  { id: 1, key: "Nomor Daftar", value: "/#", api_key: "no_daftar" },
  { id: 2, key: "Tanggal", value: "/#", api_key: "tgl_daftar" },
  { id: 3, key: "Tempat Pendaftaran", value: "/#", api_key: "provinsi" },
  { id: 4, key: "Jenis Pengajuan", value: "/#", api_key: "jenis_daftar" },
  { id: 5, key: "Status", value: "", api_key: "status" },
  { id: 6, key: "Channel Pendaftaran", value: "/#", api_key: "channel" },
  { id: 7, key: "Fasilitator", value: "/#", api_key: "nama_fasilitator" },
]);

const tracking = ref([
  { id: 1, key: "Draft", value: "fachrudin@panganlestari.com" },
  { id: 2, key: "Submitted", value: "fachrudin@panganlestari.com" },
  { id: 3, key: "Verification", value: "Arini HS" },
  { id: 4, key: "Returned", value: "ARINI HS" },
  { id: 5, key: "Submitted", value: "fachrudin@panganlestari.com" },
]);

async function onClickDownload(filename: string) {
  return await downloadDocument(filename);
}

const expanded = [0, 1, 2];

const props = defineProps({
  dataPendaftaran: {
    type: Object,
    required: true,
  },
  dataTracking: {
    type: Object as () => any,
    required: true,
  },
});

watch(
  () => props.dataPendaftaran,
  async (newData) => {
    if (newData) {
      pendaftaran.value.forEach((val) => {
        val.value = newData[val.api_key] ? newData[val.api_key] : "-";
      });
    }
  },
  { immediate: true }
);

const route = useRoute();

const downloadForms = reactive({
  sttd: "",
  sertifikasi_halal: "",
  laporan_pendamping: "",
  rekomendasi: "",
  surat_penyelia: "",
  surat_permohonan: "",
  surat_pernyataan: "",
}) as Record<string, string>;

const getDownloadForm = async (docName: string, propName: string) => {
  // surat-penyelia, laporan-pendamping, rekomendasi, surat-permohonan,surat-pernyataan, sttd, setifikasi-halal
  const result: any = await $api(
    `/self-declare/submission/${route.params?.id}/file`,
    {
      method: "get",
      query: {
        document: docName,
      },
    }
  );

  if (result?.code === 2000) {
    // downloadForms.value[propName] = result?.data?.file || "";
    const idx = unduhan.value.findIndex((val) => val.api_key === propName);
    unduhan.value[idx].filename = result?.data?.file || "";
  }
};

onMounted(async () => {
  await Promise.all([
    getDownloadForm("sttd", "sttd"),
    getDownloadForm("ikrar", "ikrar"),
    getDownloadForm("laporan-pendamping", "laporan_pendamping"),
    getDownloadForm("surat-permohonan", "surat_permohonan"),
    getDownloadForm("surat-pernyataan", "surat_pernyataan"),
  ]);
});
</script>
<template>
  <VRow>
    <VCol cols="12">
      <VExpansionPanels v-model="expanded">
        <VExpansionPanel>
          <VExpansionPanelTitle><h3>Formulir Unduhan</h3></VExpansionPanelTitle>
          <VExpansionPanelText>
            <VRow v-for="item in unduhan" :key="item.id">
              <VCol cols="5">{{ item.key }}</VCol>
              <VCol cols="1">:</VCol>
              <VCol cols="6"
                ><VBtn
                  :disabled="item.filename == ''"
                  variant="flat"
                  @click="onClickDownload(item.filename)"
                  ><VIcon icon="fa-download"></VIcon></VBtn
              ></VCol>
            </VRow>
          </VExpansionPanelText>
        </VExpansionPanel>
      </VExpansionPanels>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
      <VExpansionPanels v-model="expanded">
        <VExpansionPanel>
          <VExpansionPanelTitle><h3>Pendaftaran</h3></VExpansionPanelTitle>
          <VExpansionPanelText>
            <VRow v-for="item in pendaftaran" :key="item.id">
              <VCol cols="5">{{ item.key }}</VCol>
              <VCol cols="1">:</VCol>
              <VCol cols="6">
                <VChip
                  v-if="item.key === 'Status' && item.value !== ''"
                  color="success"
                  >{{ item.value }}</VChip
                >
                <p v-if="item.key !== 'Status' && item.key !== 'Tanggal'">
                  {{ item.value }}
                </p>
                <p v-if="item.key === 'Tanggal'">
                  {{
                    item.value
                      ? new Date(item.value).toISOString().substring(0, 10)
                      : "-"
                  }}
                </p>
              </VCol>
            </VRow>
          </VExpansionPanelText>
        </VExpansionPanel>
      </VExpansionPanels>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
      <VExpansionPanels v-model="expanded">
        <VExpansionPanel>
          <VExpansionPanelTitle><h3>Tracking</h3></VExpansionPanelTitle>
          <VExpansionPanelText style="max-height: 50svh; overflow: auto">
            <div>
              <HalalTimeLine :event="props.dataTracking"></HalalTimeLine>
            </div>
          </VExpansionPanelText>
        </VExpansionPanel>
      </VExpansionPanels>
    </VCol>
  </VRow>
</template>
