<script setup lang="ts">
import { ref } from "vue";
import { useDisplay } from "vuetify";
import { VTextField } from "vuetify/components";

const emit = defineEmits(["refresh"]);

const addDialog = ref(false);
const loadingAdd = ref(false);

const downloadDOcument = async (filename: string) => {
  try {
    const response = await $api("/shln/submission/document/download", {
      method: "post",
      body: {
        filename,
      },
    });
    window.open(response.url, "_blank", "noopener,noreferrer");
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const formData = ref({
  no_ktp: "",
  no_kontak: "",
  nama_penyelia: "",
  agama_penyelia: "",
  nomor_sertifikat: "",
  tanggal_sertifikat: "",
  nomor_sk: "",
  tanggal_sk: "",
  file: null,
});

const resetForm = () => {
  formData.value = {
    no_ktp: "",
    no_kontak: "",
    nama_penyelia: "",
    agama_penyelia: "",
    nomor_sertifikat: "",
    tanggal_sertifikat: "",
    nomor_sk: "",
    tanggal_sk: "",
    file: null,
  };
};

const addDataPenyeliaHalal = async () => {
  try {
    console.log("formData", formData.value);
    loadingAdd.value = true;

    const res: any = await $api("/self-declare/penyelia-halal/add", {
      method: "post",
      body: formData.value,
    });

    if (res?.code === 2000) {
      loadingAdd.value = false;
      resetForm();
      addDialog.value = false;
      useSnackbar().sendSnackbar("Berhasil menambahkan data", "success");
      emit("refresh");
    } else {
      useSnackbar().sendSnackbar("Gagal update data", "error");
      loadingAdd.value = false;
      resetForm();
      addDialog.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingAdd.value = false;
    resetForm();
    addDialog.value = false;
  }
};

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

const { mdAndUp } = useDisplay();
const dialogMaxWidth = computed(() => (mdAndUp ? 700 : "90%"));
</script>

<template>
  <VBtn
    variant="outlined"
    prepend-icon="fa-plus"
    style="margin: 1svw"
    @click="addDialog = true"
  >
    Tambah
  </VBtn>

  <VDialog v-model="addDialog" :max-width="dialogMaxWidth">
    <VCard>
      <VCardTitle>
        <VRow>
          <VCol cols="10"><h3>Tambah Data Penyelia Halal</h3></VCol>
          <VCol cols="2" style="display: flex; justify-content: end">
            <VIcon size="small" icon="fa-times" @click="addDialog = false" />
          </VCol>
        </VRow>
      </VCardTitle>
      <VCardItem>
        <VRow>
          <VCol cols="12">
            <VRow>
              <VCol cols="6">
                <VLabel>No. KTP</VLabel>
                <VTextField
                  v-model="formData.no_ktp"
                  placeholder="Isi Nomor KTP"
                  type="number"
                />
              </VCol>
              <VCol cols="6">
                <VLabel>No. Kontak</VLabel>
                <VTextField
                  v-model="formData.no_kontak"
                  placeholder="Isi Nomor Kontak"
                  type="number"
                />
              </VCol>
            </VRow>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12">
            <VRow>
              <VCol cols="6">
                <VLabel>Nama Penyelia</VLabel>
                <VTextField
                  v-model="formData.nama_penyelia"
                  placeholder="Isi Nama Penyelia"
                />
              </VCol>
              <VCol cols="6">
                <VItemGroup>
                  <VLabel>Agama Penyelia</VLabel>
                  <VSelect
                    v-model="formData.agama_penyelia"
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
                <VTextField
                  v-model="formData.nomor_sertifikat"
                  placeholder="Isi Nomor Sertifikat"
                />
              </VCol>
              <VCol cols="6">
                <VLabel>Tanggal Surat Pemohon</VLabel>
                <VTextField
                  v-model="formData.tanggal_sertifikat"
                  placeholder="Isi Tanggal Sertifikat"
                  type="date"
                />
              </VCol>
            </VRow>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12">
            <VRow>
              <VCol cols="6">
                <VLabel>Nomor SK</VLabel>
                <VTextField
                  v-model="formData.nomor_sk"
                  placeholder="Isi Nomor SK"
                />
              </VCol>
              <VCol cols="6">
                <VLabel>Tanggal SK</VLabel>
                <VTextField
                  v-model="formData.tanggal_sk"
                  placeholder="Isi Tanggal Sertifikat"
                  type="date"
                />
              </VCol>
            </VRow>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12">
            <VRow>
              <VCol cols="8">
                <h3>Unggahan Sertifikat Pelatihan Penyelia Halal (SPPH)</h3>
              </VCol>
              <VCol cols="4">
                <HalalFileInput
                  :modelValue="formData.file"
                  :rules="[
                      requiredValidator,
                      fileExtensionValidator,
                      (value: any) => {
                        return (
                          !value ||
                          !value.length ||
                          value[0].size < 2000000 ||
                          'file maksimum 2MB'
                        );
                      },
                    ]"
                  @update:modelValue="formData.file = $event"
                />
              </VCol>
            </VRow>
          </VCol>
        </VRow>
      </VCardItem>
      <VCardActions
        style="display: flex; justify-content: end; padding: 1.5svw"
      >
        <div>
          <VBtn
            :disabled="loadingAdd"
            @click="addDialog = false"
            variant="outlined"
          >
            Batal
          </VBtn>
          <VBtn
            :loading="loadingAdd"
            @click="addDataPenyeliaHalal"
            variant="flat"
            >Tambah</VBtn
          >
        </div>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
