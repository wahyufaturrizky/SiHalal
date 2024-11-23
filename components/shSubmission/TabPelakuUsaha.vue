<script setup lang="ts">
const isPanelOpen = ref(0);

const legalAspectHeader = [
  { title: "No", value: "index" },
  { title: "Jenis", value: "type" },
  { title: "No. Dokumen", value: "docNumber" },
  { title: "Tanggal", value: "date" },
  { title: "Masa Berlaku", value: "validPeriod" },
  { title: "Instansi Penerbit", value: "publisher" },
  { title: "Action", value: "actions" },
];
const halalSupervisorHeader = [
  { title: "No", value: "index" },
  { title: "Nama", value: "name" },
  { title: "No. KTP", value: "ktpNumber" },
  { title: "No. Kontak", value: "contactNumber" },
  { title: "No/Tgl Sertif Penyelia Halal ", value: "certificateNumber" },
  { title: "No/Tgl SK", value: "skDate" },
];
const documentHeader = [
  { title: "No", value: "index" },
  { title: "Nama", value: "name" },
  { title: "Dokumen", value: "document" },
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
const documentData = ref([
  { name: "Izin Edar", document: "Surat Izin Usaha.pdf" },
  { name: "Izin Masuk", document: "" },
]);

const handleDelete = (index: number) => {
  const exist = legalAspectData.value.findIndex((i, idx) => idx === index);
  legalAspectData.value.splice(exist, 1);
};

const removeDoc = (index: number) => {
  documentData.value.map((i, idx) => {
    if (idx === index) {
      i.document = "";
    }
  });
};

const fileInput = ref();
const triggerFileInput = () => {
  fileInput.value.click();
};
const onFileChange = (event: any, index: number) => {
  const file = event.target.files[0];
  if (file) {
    return documentData.value.map((i, idx) => {
      if (idx === index) {
        return (i.document = file.name);
      }
    });
  }
};
</script>

<template>
  <VExpansionPanels v-model="isPanelOpen">
    <VExpansionPanel class="mb-10">
      <VExpansionPanelTitle class="font-weight-bold text-h4">
        Pengajuan Sertifikasi Halal
      </VExpansionPanelTitle>
      <VExpansionPanelText class="mt-5">
        <VRow>
          <VCol cols="3">Nama</VCol>
          <VCol cols="9">: Sartiika/Industri Minuman Ringan</VCol>
        </VRow>
        <VRow>
          <VCol cols="3">Alamat</VCol>
          <VCol cols="9"
            >: Sumbawa Banget, RT002/RW002, Sumbang, Curio, Jawa Barat</VCol
          >
        </VRow>
        <VRow>
          <VCol cols="3"> Jenis Badan Usaha </VCol>
          <VCol cols="9">: Lainnya</VCol>
        </VRow>
        <VRow>
          <VCol cols="3">Sekala Usaha</VCol>
          <VCol cols="9">: Mikro</VCol>
        </VRow>
        <VDivider class="my-5" />
        <VRow>
          <VCol cols="3">Penanggung Jawab</VCol>
          <VCol cols="9">: Sumayah</VCol>
        </VRow>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
  <VCard class="mb-10">
    <VCardTitle class="mb-5">
      <div class="font-weight-bold text-h4">Penanggung Jawab</div>
    </VCardTitle>
    <VCardText>
      <div class="mb-3">
        <div>Jenis Badan Usaha</div>
        <VTextField model-value="Sumayah" density="compact" />
      </div>
      <div class="mb-3">
        <div>Nomor Kontak</div>
        <VTextField model-value="081234567899" density="compact" />
      </div>
      <div class="">
        <div>Email</div>
        <VTextField model-value="rasarasaa@gmail.com" density="compact" />
      </div>
    </VCardText>
  </VCard>
  <VCard class="mb-10">
    <VCardTitle class="my-5 d-flex justify-space-between align-center">
      <div class="font-weight-bold text-h4">Aspek Legal</div>
      <VBtn variant="outlined">
        <div class="pe-3">Tambah</div>
        <VIcon icon="fa-plus" />
      </VBtn>
    </VCardTitle>
    <VCardText>
      <VDataTable
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
              @click="handleDelete(index)"
            />
          </div>
        </template>
      </VDataTable>
    </VCardText>
  </VCard>
  <VCard class="mb-10">
    <VCardTitle class="my-5 d-flex justify-space-between align-center">
      <div class="font-weight-bold text-h4">Penyelia Halal</div>
      <VBtn variant="outlined">
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
    <VCardTitle class="my-5 d-flex justify-space-between align-center">
      <div class="font-weight-bold text-h4">Dokumen Persyaratan Fasilitas</div>
      <VBtn variant="outlined">
        <div class="pe-3">Tambah</div>
        <VIcon icon="fa-plus" />
      </VBtn>
    </VCardTitle>
    <VCardText>
      <VAlert
        class="mb-5"
        color="primary"
        variant="tonal"
        text="File yang digunakan dengan extension XLSX, PDF, PNG dan Maksimal
        50mb"
        prominent
      >
        <template #prepend>
          <VIcon>fa-exclamation-circle</VIcon>
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
            v-if="item.document.length"
            density="compact"
            :model-value="item.document"
            placeholder="No file choosen"
            rounded="xl"
            max-width="400"
          >
            <template #append-inner>
              <VIcon
                icon="fa-trash"
                color="error"
                class="cursor-pointer"
                @click="removeDoc(index)"
              />
            </template>
          </VTextField>
          <VTextField
            v-else
            class="custom-file-input"
            density="compact"
            rounded="xl"
            placeholder="No file choosen"
            max-width="400"
          >
            <template #append-inner>
              <VBtn
                rounded="s-0 e-xl"
                @click.prevent="triggerFileInput"
                text="Choose"
              />
            </template>
          </VTextField>
          <input
            type="file"
            ref="fileInput"
            @change="(e) => onFileChange(e, index)"
            accept="application/vnd.ms-excel, application/pdf ,image/png"
            style="display: none"
          />
        </template>
      </VDataTable>
    </VCardText>
  </VCard>
</template>

<style lang="scss">
.custom-file-input {
  .v-field--appended {
    padding-inline-end: 0 !important;
  }
}
</style>
