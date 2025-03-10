<script setup lang="ts">
import { defineProps, ref, watch } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
  sertifikat: {
    type: Object,
    required: true,
  },
});

const route = useRoute();

const combinedProps = ref({
  sertifikat: props.sertifikat,
});

const data = ref([]);
const expanded = [0];
const selectedStatus = ref(
  ["OF290", "OF285", "OF100", "OF120", "OF300"].some(
    (status) => combinedProps.value.sertifikat.status == status
  )
    ? combinedProps.value.sertifikat.status
    : ""
);
const selectedStatusDisabled = ref(
  ["OF290", "OF285", "OF100", "OF120", "OF300"].some(
    (status) => combinedProps.value.sertifikat.status == status
  )
    ? true
    : false
);
const dialogOpen = ref(false);
const notes = ref("");
const submissionId = (route.params as any).id;

function getValueOrDash(value: string) {
  return value && value.trim() !== "" ? value : "-";
}

// Handle actions
async function ditetapkan() {
  try {
    const body = {
      status: selectedStatus.value,
      notes: notes.value.trim() || "No notes provided",
    };

    console.log(body, "ini bodynya");

    const response: any = await $api(
      `/self-declare/komite-fatwa/proses-sidang/${submissionId}/ditetapkan`,
      {
        method: "put",
        body,
      }
    );

    if (response?.code === 2000) {
      useSnackbar().sendSnackbar("Sukses", "success");
      navigateTo("/sidang-fatwa/proses-sidang");
      return;
    }
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  } catch (error) {
    console.log(error, "ini error");
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  } finally {
    dialogOpen.value = false;
    notes.value = "";
  }
}

watch(
  combinedProps,
  (newData) => {
    console.log(newData, "Updated props");

    // Example of using `newData` to update a derived reactive variable
    if (newData) {
      data.value = [
        {
          id: 1,
          key: "Nomor STTD",
          value: getValueOrDash(newData?.sertifikat?.no_daftar),
        },
        {
          id: 2,
          key: "Nama Perusahaan",
          value: getValueOrDash(newData?.sertifikat?.nama_pu),
        },
        {
          id: 3,
          key: "Jenis Produk",
          value: getValueOrDash(newData?.sertifikat?.jenis_produk),
        },
      ];
    }

    console.log(data, "Derived data");
  },
  { immediate: true, deep: true }
);

const selectable = [
  { id: 1, value: "OF100", title: "Ditetapkan Halal" },
  { id: 2, value: "OF285", title: "Dikembalikan" },
  { id: 3, value: "OF290", title: "Ditolak" },
];

// Button action handler
function handleButtonClick() {
  if (selectedStatus.value === "OF100") ditetapkan();
  else if (selectedStatus.value === "OF285") dialogOpen.value = true;
  else if (selectedStatus.value === "OF290") dialogOpen.value = true;
  else alert("Please select a valid option!");
}

const downloadForms = reactive({
  laporan_pendamping: "",
}) as Record<string, string>;

async function onClickDownload(filename: string) {
  return await downloadDocument(filename);
}

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
  if (result.code === 2000) {
    downloadForms[propName] = result.data.file;
  }
};

const handleDownloadForm = async (fileName: string) => {
  return await downloadDocument(fileName);
};

onMounted(async () => {
  await getDownloadForm("laporan-pendamping", "laporan_pendamping");
});
</script>

<template>
  <VExpansionPanels v-model="expanded">
    <VExpansionPanel>
      <VExpansionPanelTitle><h3>Pendaftaran</h3></VExpansionPanelTitle>
      <VExpansionPanelText>
        <VRow v-for="item in data" :key="item.id">
          <VCol cols="3">
            <p>{{ item.key }}</p>
          </VCol>
          <VCol cols="1">
            <p>:</p>
          </VCol>
          <VCol cols="8">
            <p>{{ item.value }}</p>
          </VCol>
        </VRow>
        <VRow style="display: flex; align-items: stretch">
          <VCol cols="3">
            <p>Laporan Pendamping</p>
          </VCol>
          <VCol cols="1">
            <p>:</p>
          </VCol>
          <VCol cols="8">
            <VBtn
              @click="
                downloadForms.laporan_pendamping
                  ? handleDownloadForm(downloadForms.laporan_pendamping)
                  : null
              "
              :color="downloadForms.laporan_pendamping ? 'primary' : '#A09BA1'"
              density="compact"
              class="px-2"
            >
              <template #default>
                <VIcon icon="fa-download" />
              </template>
            </VBtn>
          </VCol>
        </VRow>
        <VRow style="display: flex; align-items: center">
          <VCol cols="3">
            <p>Keterangan</p>
          </VCol>
          <VCol cols="1">
            <p>:</p>
          </VCol>
          <VCol cols="8">
            <VSelect
              v-model="selectedStatus"
              :items="selectable"
              :disabled="selectedStatusDisabled"
              item-text="title"
              item-value="value"
            />
          </VCol>
        </VRow>
        <VRow align="center">
          <VSpacer />
          <!-- Pushes the button to the right -->
          <VBtn
            v-if="!selectedStatusDisabled"
            text="Penetapan"
            @click="handleButtonClick"
          />
        </VRow>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>

  <!-- Dialog -->
  <VDialog v-model="dialogOpen" max-width="50svw">
    <VCard>
      <VCardTitle>
        <h3 v-if="selectedStatus === 'OF285'">Konfirmasi Pengembalian</h3>
        <h3 v-if="selectedStatus === 'OF290'">Konfirmasi Penolakan</h3>
      </VCardTitle>
      <VCardText>
        <p v-if="selectedStatus === 'OF285'">
          <b>Apakah yakin pengajuan ini dikembalikan ke Pelaku Usaha?</b>
        </p>
        <p v-else-if="selectedStatus === 'OF290'">
          <b>Apakah yakin pengajuan ini ditolak?</b>
        </p>
        <VTextarea v-model="notes" placeholder="Isi alasan" />
      </VCardText>
      <VCardActions>
        <VBtn variant="outlined" @click="dialogOpen = false"> Batal </VBtn>
        <VBtn
          v-if="selectedStatus === 'OF285'"
          color="error"
          variant="flat"
          @click="ditetapkan"
        >
          Kembalikan
        </VBtn>
        <VBtn
          v-else-if="selectedStatus === 'OF290'"
          color="error"
          variant="flat"
          @click="ditetapkan"
        >
          Tolak
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
