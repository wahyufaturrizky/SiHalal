<script setup lang="ts">
const router = useRouter();
const route = useRoute();
const submissionId = route.params.id as string;

const isPanelOpen = ref(0);

const props = defineProps({
  idDetail: {
    required: true,
    type: String,
  },
});

const submissionData = ref({
  nama_pu: null,
  alamat_pu: null,
  jenis_badan_usaha: null,
  skala_usaha: null,
  nama_pj: null,
});
const guarantorData = ref({
  nama_pj: null,
  nomor_kontak_pj: null,
  email_pj: null,
});

const legalAspectHeader: any[] = [
  { title: "No", key: "index", sortable: false },
  { title: "Jenis", key: "jenis_surat" },
  { title: "No. Dokumen", key: "no_surat", nowrap: true },
  { title: "Tanggal", key: "tanggal_surat", nowrap: true },
  { title: "Masa Berlaku", key: "masa_berlaku", nowrap: true },
  { title: "Instansi Penerbit", key: "instansi_penerbit", nowrap: true },
  { title: "Action", key: "action", align: "center", sortable: false },
];
const legalAspectData = ref([]);

const halalSupervisorHeader: any[] = [
  { title: "No", key: "index", sortable: false },
  { title: "Nama", key: "penyelia_nama", nowrap: true },
  { title: "No. KTP", key: "no_ktp", nowrap: true },
  { title: "No. Kontak", key: "no_kontak", nowrap: true },
  {
    title: "No/Tgl Sertif Penyelia Halal",
    key: "no_penyelia_halal",
    nowrap: true,
  },
  { title: "No/Tanggal SK", key: "no_sk", nowrap: true },
  { title: "Action", key: "action", align: "center", sortable: false },
];
const halalSupervisorData = ref([]);

const documentHeader = [
  { title: "No", value: "index" },
  { title: "Nama", value: "name" },
  { title: "Dokumen", value: "document" },
];
const documentData = ref([
  {
    name: "Izin Edar",
    filename: "Surat Izin Usaha.pdf",
    document: new File(["Surat Izin Usaha"], "Surat Izin Usaha.pdf"),
  },
  {
    name: "Izin Masuk",
    filename: null,
    document: null,
  },
]);

const deleteType = ref("");
const selectedItem = ref();
const isModalOpen = ref(false);

const handleOpenModal = (type: string, index: number) => {
  deleteType.value = type;
  selectedItem.value = index;
  isModalOpen.value = !isModalOpen.value;
};
const confirmDeleteItem = () => {
  const itemIndex = legalAspectData.value.findIndex(
    (_, idx) => idx === selectedItem.value
  );
  legalAspectData.value.splice(itemIndex, 1);
  selectedItem.value = null;
  useSnackbar().sendSnackbar("Berhasil menghapus data", "success");
};

const confirmDeleteDoc = () => {
  documentData.value.map((i: any, idx: number) => {
    if (idx === selectedItem.value) {
      i.filename = null;
      i.document = null;
      useSnackbar().sendSnackbar("Berhasil menghapus data", "success");
    }
  });
};

const handleDetailPelakuUsaha = async () => {
  try {
    const response: any = await $api(
      `/self-declare/submission/${props.idDetail}/detail`,
      {
        method: "get",
      }
    );

    if (response.code === 2000) {
      submissionData.value.nama_pj = response.data.penanggung_jawab.nama_pj;
      Object.assign(submissionData.value, response.data.certificate_halal);
      Object.assign(guarantorData.value, response.data.penanggung_jawab);
      legalAspectData.value = response.data.aspek_legal;
      halalSupervisorData.value = response.data.penyelia_halal;
    }
    return response;
  } catch (error) {
    console.log(error);
  }
};

const refresh = async () => {
  await handleDetailPelakuUsaha();
};

const handleAddLegal = async (selectedLegal: string[]) => {
  try {
    const response: any = await $api(
      `/self-declare/business-actor/legal/create`,
      {
        method: "post",
        body: {
          id_reg: submissionId,
          id_legal: selectedLegal,
        },
      }
    );
    if (response.code === 2000) {
      refresh();
    }
  } catch (error) {
    console.log(error);
  }
};

const handleAddSupervisor = async (selectedSupervisor: string[]) => {
  try {
    const response: any = await $api(
      `/self-declare/business-actor/supervisor/create`,
      {
        method: "post",
        body: {
          id_reg: submissionId,
          id_penyelia: selectedSupervisor,
        },
      }
    );
    if (response.code === 2000) {
      refresh();
    }
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  await handleDetailPelakuUsaha();
});
</script>

<template>
  <VExpansionPanels
    v-model="isPanelOpen"
    expand-icon="fa-chevron-down"
    collapse-icon="fa-chevron-up"
  >
    <VExpansionPanel class="mb-10 pt-3">
      <VExpansionPanelTitle class="font-weight-bold text-h4">
        Pengajuan Sertifikasi Halal
      </VExpansionPanelTitle>
      <VExpansionPanelText class="mt-5">
        <VRow>
          <VCol cols="3" class="font-weight-bold">Nama</VCol>
          <VCol cols="9">: {{ submissionData.nama_pu }}</VCol>
        </VRow>
        <VRow>
          <VCol cols="3" class="font-weight-bold">Alamat</VCol>
          <VCol cols="9">: {{ submissionData.alamat_pu }}</VCol>
        </VRow>
        <VRow>
          <VCol cols="3" class="font-weight-bold"> Jenis Badan Usaha </VCol>
          <VCol cols="9">: {{ submissionData.jenis_badan_usaha }}</VCol>
        </VRow>
        <VRow>
          <VCol cols="3" class="font-weight-bold">Sekala Usaha</VCol>
          <VCol cols="9">: {{ submissionData.skala_usaha }}</VCol>
        </VRow>
        <VDivider class="my-5" />
        <VRow>
          <VCol cols="3" class="font-weight-bold">Penanggung Jawab</VCol>
          <VCol cols="9">: {{ submissionData.nama_pj }}</VCol>
        </VRow>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
  <VCard class="mb-10 pt-3">
    <VCardTitle class="mb-5">
      <div class="font-weight-bold text-h4">Penanggung Jawab</div>
    </VCardTitle>
    <VCardText>
      <div class="mb-3">
        <div class="font-weight-bold mb-1">Nama Penanggung Jawab</div>
        <VTextField
          v-model="guarantorData.nama_pj"
          density="compact"
          rounded="xl"
          readonly
        />
      </div>
      <div class="mb-3">
        <div class="font-weight-bold mb-1">Nomor Kontak</div>
        <VTextField
          v-model="guarantorData.nomor_kontak_pj"
          density="compact"
          rounded="xl"
          readonly
        />
      </div>
      <div>
        <div class="font-weight-bold mb-1">Email</div>
        <VTextField
          v-model="guarantorData.email_pj"
          density="compact"
          rounded="xl"
          readonly
        />
      </div>
    </VCardText>
  </VCard>
  <VCard class="mb-10">
    <VCardTitle class="my-5 d-flex justify-space-between align-center">
      <VRow align="center">
        <VCol class="font-weight-bold text-h4"> Aspek Legal </VCol>
      </VRow>
    </VCardTitle>
    <VCardText>
      <VDataTable
        class="legal-aspect-table"
        :headers="legalAspectHeader"
        :items="legalAspectData"
        hide-default-footer
      >
        <template #item.index="{ index }">
          {{ index + 1 }}
        </template>
        <template #item.actions="{ index }">
          <div>
            <VIcon
              icon="mdi-delete"
              color="error"
              class="cursor-pointer"
              @click="handleOpenModal('LEGAL', index)"
            />
          </div>
        </template>
      </VDataTable>
    </VCardText>
  </VCard>
  <VCard class="mb-10">
    <VCardTitle class="my-5 d-flex justify-space-between align-center">
      <VRow align="center">
        <VCol class="font-weight-bold text-h4"> Penyelia Halal </VCol>
      </VRow>
    </VCardTitle>
    <VCardText>
      <VDataTable
        :headers="halalSupervisorHeader"
        :items="halalSupervisorData"
        hide-default-footer
      >
        <template #item.index="{ index }">
          {{ index + 1 }}
        </template>
      </VDataTable>
    </VCardText>
  </VCard>
  <!-- dokumen belom -->
  <!-- <VCard>
    <VCardTitle class="my-3 d-flex justify-space-between align-center">
      <div class="font-weight-bold text-h4">Dokumen Persyaratan Fasilitas</div>
    </VCardTitle>
    <VCardText>
      <VAlert
        class="mb-5"
        color="primary"
        variant="tonal"
        density="compact"
        prominent
      >
        <div>
          File yang digunakan dengan extension XLSX, PDF, PNG dan Maksimal 50mb
        </div>
        <template #prepend>
          <VIcon icon="fa-exclamation-circle" />
        </template>
      </VAlert>
      <VDataTable
        :headers="documentHeader"
        :items="documentData"
        hide-default-footer
      >
        <template #item.index="{ index }">
          {{ index + 1 }}
        </template>
        <template #item.document="{ item, index }">
          <VTextField
            v-if="item.document"
            density="compact"
            :model-value="item.filename"
            placeholder="No file choosen"
            rounded="xl"
            max-width="400"
          >
            <template #append-inner>
              <VIcon
                icon="fa-trash"
                color="error"
                class="cursor-pointer"
                @click="handleOpenModal('DOC', index)"
              />
            </template>
          </VTextField>
          <VFileInput
            v-else
            :model-value="item.document"
            class="custom-file-input"
            density="compact"
            rounded="xl"
            label="No file choosen"
            max-width="400"
            prepend-icon=""
            @change="(e: Event) => handleUploadFile(e, index)"
          >
            <template #append-inner>
              <VBtn rounded="s-0 e-xl" text="Choose" />
            </template>
          </VFileInput>
        </template>
      </VDataTable>
    </VCardText>
  </VCard> -->
  <ShSubmissionDetailFormModal
    dialog-title="Menghapus Data"
    :dialog-visible="isModalOpen"
    dialog-use="DELETE"
    @update:dialog-visible="isModalOpen = $event"
    @submit:commit-action="
      deleteType === 'LEGAL' ? confirmDeleteItem() : confirmDeleteDoc()
    "
  >
    <VCardText>
      <div>Apakah yakin ingin menghapus data ini</div>
    </VCardText>
  </ShSubmissionDetailFormModal>
</template>

<style lang="scss">
.custom-file-input {
  .v-field--appended {
    padding-inline-end: 0 !important;
  }
}
</style>

<style scoped lang="scss">
:deep(.v-data-table.legal-aspect-table > .v-table__wrapper) {
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
