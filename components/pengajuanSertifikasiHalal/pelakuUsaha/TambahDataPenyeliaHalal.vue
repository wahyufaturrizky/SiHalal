<script setup lang="ts">
import { ref } from "vue";
import { useDisplay } from "vuetify";
import { VTextField } from "vuetify/components";

const route = useRoute();

const selfDeclareId = (route.params as any).id;
const isFormError = ref(false);

const emit = defineEmits(["refresh"]);

const fileExtensionValidator = (value: any) => {
  let file = value;
  if (Array.isArray(value)) {
    file = value[0];
  }
  console.log("file attribute = ", value[0].type);
  const allowedFileExtensionList = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "application/pdf",
  ];
  const result = useArrayIncludes(allowedFileExtensionList, file.type).value;
  if (result) {
    isFormError.value = false;
    return true;
  }
  isFormError.value = true;
  return "File extension not allowed";
};

const uploadDocument = async (file: any) => {
  try {
    const formData = new FormData();
    formData.append("id", selfDeclareId);
    formData.append("file", file);
    formData.append("type", "sample");
    const response: any = await $api("/shln/submission/document/upload", {
      method: "post",
      body: formData,
    });

    if (response?.code === 2000) {
      return response;
    } else {
      useSnackbar().sendSnackbar(
        response.errors.list_error.join(", "),
        "error"
      );
      loadingAdd.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar(
      "ada kesalahan saat upload file, gagal menyimpan!",
      "error"
    );
    loadingAdd.value = false;
  }
};

const props = defineProps({
  listagama: {
    type: Array,
  },
});

const { listagama } = props || {};

const addDialog = ref(false);
const loadingAdd = ref(false);

const formData = ref({
  no_ktp: "",
  no_kontak: "",
  nama: "",
  agama: "",
  no_sertifikat: "",
  tgl_sertifikat: "",
  no_sk: "",
  tgl_sk: "",
  file_spph: null,
  file_skph: null,
  file_ktp: null,
});

const resetForm = () => {
  formData.value = {
    no_ktp: "",
    no_kontak: "",
    nama: "",
    agama: "",
    no_sertifikat: "",
    tgl_sertifikat: "",
    no_sk: "",
    tgl_sk: "",
    file_spph: null,
    file_skph: null,
    file_ktp: null,
  };
};

const addDataPenyeliaHalal = async () => {
  try {
    loadingAdd.value = true;

    const { file_spph, file_skph, file_ktp } = formData.value;

    const fileSpph = await uploadDocument(file_spph);
    if (fileSpph.code !== 2000) {
      return;
    }
    const fileSkph = await uploadDocument(file_skph);
    if (fileSkph.code !== 2000) {
      return;
    }
    const fileKtp = await uploadDocument(file_ktp);
    if (fileKtp.code !== 2000) {
      return;
    }

    const res: any = await $api(
      `/self-declare/verificator/penyelia/add/${selfDeclareId}`,
      {
        method: "post",
        body: {
          ...formData.value,
          file_spph: fileSpph.data.file_url,
          file_skph: fileSkph.data.file_url,
          file_ktp: fileKtp.data.file_url,
        },
      }
    );
    console.log("@res", res);

    if (res?.code === 2000) {
      loadingAdd.value = false;
      resetForm();
      addDialog.value = false;
      useSnackbar().sendSnackbar("Berhasil menambahkan data", "success");
      emit("refresh");
    } else {
      useSnackbar().sendSnackbar(res.errors.list_error.join(", "), "error");
      loadingAdd.value = false;
      resetForm();
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingAdd.value = false;
    resetForm();
  }
};

const checkIsFieldEMpty = (data: any) => {
  return Object.keys(data)?.find((key: any) => !data[key]);
};

const { mdAndUp } = useDisplay();
const dialogMaxWidth = computed(() => (mdAndUp ? 700 : "90%"));

const limitCharKtp = (v: string) => {
  if (v.length > 16) {
    isFormError.value = true;
    return "Maksimal 16 karakter";
  } else {
    isFormError.value = false;
  }
};
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
                  :rules="[requiredValidator, limitCharKtp]"
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
                  v-model="formData.nama"
                  placeholder="Isi Nama Penyelia"
                />
              </VCol>
              <VCol cols="6">
                <VItemGroup>
                  <VLabel>Agama Penyelia</VLabel>
                  <VSelect
                    v-model="formData.agama"
                    :items="listagama"
                    item-title="name"
                    item-value="name"
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
                  v-model="formData.no_sertifikat"
                  placeholder="Isi Nomor Sertifikat"
                />
              </VCol>
              <VCol cols="6">
                <VLabel>Tanggal Surat Pemohon</VLabel>
                <VTextField
                  v-model="formData.tgl_sertifikat"
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
                  v-model="formData.no_sk"
                  placeholder="Isi Nomor SK"
                />
              </VCol>
              <VCol cols="6">
                <VLabel>Tanggal SK</VLabel>
                <VTextField
                  v-model="formData.tgl_sk"
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
                  :modelValue="formData.file_spph"
                  :rules="[
                      requiredValidator,
                      fileExtensionValidator,
                      (value: any) => {
                        if (value && value.length && value[0].size > 2000000) {
                          isFormError = true
                          return 'file maksimum 2MB'
                        } else {
                          isFormError = false
                        }
                      },
                    ]"
                  @update:modelValue="formData.file_spph = $event"
                />
              </VCol>
            </VRow>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12">
            <VRow>
              <VCol cols="8">
                <h3>Unggahan (SKPH)</h3>
              </VCol>
              <VCol cols="4">
                <HalalFileInput
                  :modelValue="formData.file_skph"
                  :rules="[
                      requiredValidator,
                      fileExtensionValidator,
                      (value: any) => {
                        if (value && value.length && value[0].size > 2000000) {
                          isFormError = true
                          return 'file maksimum 2MB'
                        } else {
                          isFormError = false
                        }
                      },
                    ]"
                  @update:modelValue="formData.file_skph = $event"
                />
              </VCol>
            </VRow>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12">
            <VRow>
              <VCol cols="8">
                <h3>Unggahan (SKPH)</h3>
              </VCol>
              <VCol cols="4">
                <HalalFileInput
                  :modelValue="formData.file_ktp"
                  :rules="[
                      requiredValidator,
                      fileExtensionValidator,
                      (value: any) => {
                        if (value && value.length && value[0].size > 2000000) {
                          isFormError = true
                          return 'file maksimum 2MB'
                        } else {
                          isFormError = false
                        }
                      },
                    ]"
                  @update:modelValue="formData.file_ktp = $event"
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
            :disabled="checkIsFieldEMpty(formData) || isFormError"
            @click="addDataPenyeliaHalal"
            variant="flat"
            >Tambah</VBtn
          >
        </div>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
