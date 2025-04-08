<script setup lang="ts">
import { ref } from "vue";
import { VTextField } from "vuetify/components";

// Static bill date value
const data = {
  sertifikasi_date: ref([]),
};

const bahanType = ref(null);

// Sample data for "Bahan Bersertifikat" and "Tidak Bersertifikat"
const AgamaOptions = [
  { name: "Islam", value: "islam" },
  { name: "Hindu", value: "hindu" },
  { name: "Kristen", value: "kristen" },
];

const file = ref<File | null>(null);

// Mock data for document list
const documentList = ref([
  { nama: "Izin Edar", fileName: "Surat Izin Usaha.pdf", file: null },
  { nama: "Izin Masuk", fileName: "", file: null },
]);

// Handle file removal
const removeFile = (index: number) => {
  documentList.value[0].fileName = "";
  documentList.value[0].file = null;

  file.value = null;
};

const uploadFile = (event: Event, index: string | number) => {
  const fileUpload = event.target.files[0];
  if (fileUpload) {
    documentList.value[0].fileName = fileUpload.name;
    documentList.value[0].file = fileUpload;
  }
};

// Handle file upload
const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    file.value = input.files[0];
    console.log("File uploaded:", file.value.name);
  } else {
    console.log("No file selected");
  }
};

// Search term entered by the user
const searchTerm = ref("");

// Boolean to toggle visibility of the suggestion
const showSuggestion = ref(false);

// Boolean to toggle the visibility of the CariBahanModal
const isCariBahanModalOpen = ref(false);
</script>

<template>
  <VDialog max-width="20svw">
    <template #activator="{ props: openModal }">
      <VBtn
        variant="outlined"
        prepend-icon="fa-plus"
        style="margin: 1svw"
        v-bind="openModal"
      >
        Tambah
      </VBtn>
    </template>
    <template #default="{ isActive }">
      <VCard>
        <VCardTitle>
          <VRow>
            <VCol cols="10">
              <h3>Ubah Data Penyelia Halal</h3>
            </VCol>
            <VCol cols="2" style="display: flex; justify-content: end">
              <VIcon
                size="small"
                icon="fa-times"
                @click="isActive.value = false"
              />
            </VCol>
          </VRow>
        </VCardTitle>
        <VCardItem>
          <VRow>
            <VCol cols="12">
              <VRow>
                <VCol cols="6">
                  <VLabel>No. KTP</VLabel>
                  <VTextField placeholder="Isi Nomor KTP" />
                </VCol>
                <VCol cols="6">
                  <VLabel>No. Kontak</VLabel>
                  <VTextField placeholder="Isi Nomor Kontak" />
                </VCol>
              </VRow>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <VRow>
                <VCol cols="6">
                  <VLabel>Nama Penyelia</VLabel>
                  <VTextField placeholder="Isi Nama Penyelia" />
                </VCol>
                <VCol cols="6">
                  <VItemGroup>
                    <VLabel>Agama Penyelia</VLabel>
                    <VSelect
                      v-model="bahanType"
                      :items="AgamaOptions"
                      item-title="name"
                      item-value="value"
                      placeholder="Isi Agama Penyelia"
                    />
                  </VItemGroup>
                </VCol>
              </VRow>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <VRow>
                <VCol cols="6">
                  <VLabel>Nomor Sertifikat</VLabel>
                  <VTextField placeholder="Isi Nomor Sertifikat" />
                </VCol>
                <VCol cols="6">
                  <VItemGroup>
                    <!-- Date TextField -->
                    <Vuepicdatepicker>
                      <template #trigger>
                        <Vuepicdatepicker
                          v-model:model-value="data.sertifikasi_date.value"
                          auto-apply
                          model-type="dd/MM/yyyy"
                          :enable-time-picker="false"
                          :teleport="true"
                          clearable
                        >
                          <template #trigger>
                            <VLabel>Tanggal Sertifikat</VLabel>
                            <VTextField
                              placeholder="Isi Tanggal Sertifikat"
                              readonly
                              append-inner-icon="fa-calendar"
                              :model-value="data.sertifikasi_date.value"
                            />
                          </template>
                        </Vuepicdatepicker>
                      </template>
                    </Vuepicdatepicker>
                  </VItemGroup>
                </VCol>
              </VRow>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <VRow>
                <VCol cols="6">
                  <VLabel>Nomor SK</VLabel>
                  <VTextField placeholder="Isi Nomor SK" />
                </VCol>
                <VCol cols="6">
                  <VItemGroup>
                    <!-- Date TextField -->
                    <Vuepicdatepicker>
                      <template #trigger>
                        <Vuepicdatepicker
                          v-model:model-value="data.sertifikasi_date.value"
                          auto-apply
                          model-type="dd/MM/yyyy"
                          :enable-time-picker="false"
                          :teleport="true"
                          clearable
                        >
                          <template #trigger>
                            <VLabel>Tanggal SK</VLabel>
                            <VTextField
                              placeholder="Isi Tanggal SK"
                              readonly
                              append-inner-icon="fa-calendar"
                              :model-value="data.sertifikasi_date.value"
                            />
                          </template>
                        </Vuepicdatepicker>
                      </template>
                    </Vuepicdatepicker>
                  </VItemGroup>
                </VCol>
              </VRow>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <VRow>
                <VCol cols="8">
                  <VCardText>
                    <h3>
                      Unggahan Sertifikat Kompetensi Penyelia Halal (SKPH)
                    </h3>
                  </VCardText>
                </VCol>
                <VCol cols="4">
                  <div v-if="documentList[0].fileName">
                    <!-- Display file name with remove button -->
                    <VTextField
                      v-model="documentList[0].fileName"
                      dense
                      outlined
                      readonly
                      style="max-inline-size: 300px; padding-inline-end: 0"
                    >
                      <template #append-inner>
                        <VBtn variant="text" @click="removeFile">
                          <VIcon color="error"> ri-delete-bin-fill </VIcon>
                        </VBtn>
                      </template>
                    </VTextField>
                  </div>
                  <div v-else>
                    <!-- File upload input -->
                    <VFileInput
                      v-model="file"
                      dense
                      prepend-icon=""
                      label="No File Chosen"
                      hide-details
                      style="max-inline-size: 300px"
                      class="input-file-izin"
                      @change="uploadFile"
                    >
                      <!-- Button upload input -->
                      <template #append-inner>
                        <VBtn
                          color="primary"
                          variant="flat"
                          class="choose-file"
                          style="block-size: 100%; inline-size: 150px"
                        >
                          Choose File
                        </VBtn>
                      </template>
                    </VFileInput>
                  </div>
                </VCol>
              </VRow>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <VRow>
                <VCol cols="8">
                  <VCardText>
                    <h3>Unggahan Sertifikat Pelatihan Penyelia Halal (SPPH)</h3>
                  </VCardText>
                </VCol>
                <VCol cols="4">
                  <div v-if="documentList[0].fileName">
                    <!-- Display file name with remove button -->
                    <VTextField
                      v-model="documentList[0].fileName"
                      dense
                      outlined
                      readonly
                      style="max-inline-size: 300px; padding-inline-end: 0"
                    >
                      <template #append-inner>
                        <VBtn variant="text" @click="removeFile">
                          <VIcon color="error"> ri-delete-bin-fill </VIcon>
                        </VBtn>
                      </template>
                    </VTextField>
                  </div>
                  <div v-else>
                    <!-- File upload input -->
                    <VFileInput
                      v-model="file"
                      dense
                      prepend-icon=""
                      hide-details
                      label="No File Chosen"
                      style="max-inline-size: 300px"
                      class="input-file-izin"
                      @change="uploadFile"
                    >
                      <!-- Button upload input -->
                      <template #append-inner>
                        <VBtn
                          color="primary"
                          variant="flat"
                          class="choose-file"
                          style="block-size: 100%; inline-size: 150px"
                        >
                          Choose File
                        </VBtn>
                      </template>
                    </VFileInput>
                  </div>
                </VCol>
              </VRow>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <VRow>
                <VCol cols="8">
                  <VCardText><h3>Unggah KTP</h3></VCardText>
                </VCol>
                <VCol cols="4">
                  <div v-if="documentList[0].fileName">
                    <!-- Display file name with remove button -->
                    <VTextField
                      v-model="documentList[0].fileName"
                      dense
                      outlined
                      readonly
                      style="max-inline-size: 300px; padding-inline-end: 0"
                    >
                      <template #append-inner>
                        <VBtn variant="text" @click="removeFile">
                          <VIcon color="error"> ri-delete-bin-fill </VIcon>
                        </VBtn>
                      </template>
                    </VTextField>
                  </div>
                  <div v-else>
                    <!-- File upload input -->
                    <VFileInput
                      v-model="file"
                      dense
                      prepend-icon=""
                      hide-details
                      label="No File Chosen"
                      style="max-inline-size: 300px"
                      class="input-file-izin"
                      @change="uploadFile"
                    >
                      <!-- Button upload input -->
                      <template #append-inner>
                        <VBtn
                          color="primary"
                          variant="flat"
                          class="choose-file"
                          style="block-size: 100%; inline-size: 150px"
                        >
                          Choose File
                        </VBtn>
                      </template>
                    </VFileInput>
                  </div>
                </VCol>
              </VRow>
            </VCol>
          </VRow>
        </VCardItem>
        <VCardActions
          style="display: flex; justify-content: end; padding: 1.5svw"
        >
          <div>
            <VBtn variant="outlined" @click="isActive.value = false">
              Batal
            </VBtn>
            <VBtn variant="flat"> Simpan </VBtn>
          </div>
        </VCardActions>
      </VCard>
    </template>
  </VDialog>
</template>
