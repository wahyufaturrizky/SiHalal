<script setup lang="ts">
const router = useRouter();
const isPanelOpen = ref(0);

const submissionData = ref({
  name: "Sartiika/Industri Minuman Ringan",
  address: "Sumbawa Banget, RT002/RW002, Sumbang, Curio, Jawa Barat",
  businessEntity: "Lainnya",
  businessScale: "Mikro",
  guarantor: "Sumayah",
});
const guarantorData = ref({
  name: "Sumayah",
  phoneNumber: "081234567899",
  email: "rasarasaa@gmail.com",
});

const legalAspectHeader: any[] = [
  { title: "No", value: "index" },
  { title: "Jenis", value: "type" },
  { title: "No. Dokumen", value: "docNumber" },
  { title: "Tanggal", value: "date" },
  { title: "Masa Berlaku", value: "validPeriod" },
  { title: "Instansi Penerbit", value: "publisher" },
  { title: "Action", value: "actions", align: "center" },
];
const legalAspectData = ref([
  {
    type: "SIUP",
    docNumber: "0128749286836",
    date: "01/10/2024",
    validPeriod: "09/10/2024",
    publisher: "Testing",
  },
  {
    type: "NPWP",
    docNumber: "12312134989871345490",
    date: "-",
    validPeriod: "-",
    publisher: "DITJEN PAJAK",
  },
  {
    type: "NIB",
    docNumber: "3947298572986",
    date: "12/10/2019",
    validPeriod: "30/09/2023",
    publisher: "BKPM",
  },
]);

const halalSupervisorHeader = [
  { title: "No", value: "index" },
  { title: "Nama", value: "name" },
  { title: "No. KTP", value: "ktpNumber" },
  { title: "No. Kontak", value: "contactNumber" },
  { title: "No/Tgl Sertif Penyelia Halal ", value: "certificateNumber" },
  { title: "No/Tgl SK", value: "skDate" },
];
const halalSupervisorData = [
  {
    name: "Maya",
    ktpNumber: "83628776293r6238976",
    contactNumber: "081238365862",
    certificateNumber: "09/10/2024",
    skDate: "001/SKP/127/13/10/2024",
  },
  {
    name: "Rahmi",
    ktpNumber: "12312134989871345490",
    contactNumber: "082798275829",
    certificateNumber: "001/SKP/127/13/10/2024",
    skDate: "001/SKP/127/13/10/2024",
  },
];

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

const handleUploadFile = (event: any, index: number) => {
  if (event?.target?.files.length) {
    const file = event.target.files[0];
    if (file) {
      return documentData.value.map((i: any, idx: number) => {
        if (idx === index) {
          i.filename = file.name;
          i.document = file;
          return i;
        }
      });
    }
  }
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
          <VCol cols="9">: {{ submissionData.name }}</VCol>
        </VRow>
        <VRow>
          <VCol cols="3" class="font-weight-bold">Alamat</VCol>
          <VCol cols="9">: {{ submissionData.address }}</VCol>
        </VRow>
        <VRow>
          <VCol cols="3" class="font-weight-bold"> Jenis Badan Usaha </VCol>
          <VCol cols="9">: {{ submissionData.businessEntity }}</VCol>
        </VRow>
        <VRow>
          <VCol cols="3" class="font-weight-bold">Sekala Usaha</VCol>
          <VCol cols="9">: {{ submissionData.businessScale }}</VCol>
        </VRow>
        <VDivider class="my-5" />
        <VRow>
          <VCol cols="3" class="font-weight-bold">Penanggung Jawab</VCol>
          <VCol cols="9">: {{ submissionData.guarantor }}</VCol>
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
        <div class="font-weight-bold mb-1">Jenis Badan Usaha</div>
        <VTextField
          v-model="guarantorData.name"
          density="compact"
          rounded="xl"
        />
      </div>
      <div class="mb-3">
        <div class="font-weight-bold mb-1">Nomor Kontak</div>
        <VTextField
          v-model="guarantorData.phoneNumber"
          density="compact"
          rounded="xl"
        />
      </div>
      <div>
        <div class="font-weight-bold mb-1">Email</div>
        <VTextField
          v-model="guarantorData.email"
          density="compact"
          rounded="xl"
        />
      </div>
    </VCardText>
  </VCard>
  <VCard class="mb-10">
    <VCardTitle class="my-5 d-flex justify-space-between align-center">
      <div class="font-weight-bold text-h4">Aspek Legal</div>
      <VBtn
        variant="outlined"
        @click="router.push('/sh-domestic/submission/self-declare/edit?tab=1')"
      >
        <div class="pe-3">Tambah</div>
        <VIcon icon="fa-plus" />
      </VBtn>
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
      <div class="font-weight-bold text-h4">Penyelia Halal</div>
      <VBtn
        variant="outlined"
        @click="router.push('/sh-domestic/submission/self-declare/edit?tab=1')"
      >
        <div class="pe-3">Tambah</div>
        <VIcon icon="fa-plus" />
      </VBtn>
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
  <VCard>
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
  </VCard>
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
