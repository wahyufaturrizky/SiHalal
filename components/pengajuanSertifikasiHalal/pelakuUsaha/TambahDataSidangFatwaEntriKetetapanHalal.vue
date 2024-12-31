<script setup lang="ts">
import { ref } from "vue";
import { useDisplay } from "vuetify";
import { VTextField } from "vuetify/components";

const route = useRoute();

const selfDeclareId = (route.params as any).id;
const isFormError = ref(false);
const loadingAll = ref(false);
const listPenetapan = ref([]);

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

const addDialog = ref(false);
const loadingAdd = ref(false);

const formData = ref({
  no_penetapan: "",
  penetapan: "",
  tgl_penetapan: "",
  dokumen: null,
});

const resetForm = () => {
  formData.value = {
    no_penetapan: "",
    penetapan: "",
    tgl_penetapan: "",
    dokumen: null,
  };
};

const addDataPenyeliaHalal = async () => {
  try {
    loadingAdd.value = true;

    const { dokumen } = formData.value;

    const fileSpph = await uploadDocument(dokumen);
    if (fileSpph.code !== 2000) {
      return;
    }

    const res: any = await $api(
      `/sidang-fatwa/entri-ketetapan-halal/add/${selfDeclareId}`,
      {
        method: "put",
        body: {
          ...formData.value,
          dokumen: fileSpph.data.file_url,
        },
      }
    );

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

const loadItemPenetapan = async () => {
  try {
    const response: any = await $api("/master/penetapan", {
      method: "get",
    });

    if (response.length) {
      listPenetapan.value = response;

      return response;
    } else {
      useSnackbar().sendSnackbar(
        response.errors.list_error.join(", "),
        "error"
      );
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const checkIsFieldEMpty = (data: any) => {
  return Object.keys(data)?.find((key: any) => !data[key]);
};

const { mdAndUp } = useDisplay();
const dialogMaxWidth = computed(() => (mdAndUp ? 700 : "90%"));

onMounted(async () => {
  const res = await Promise.all([loadItemPenetapan()]);

  const checkResIfUndefined = res.every((item: any) => {
    return item !== undefined;
  });

  if (checkResIfUndefined) {
    loadingAll.value = false;
  } else {
    loadingAll.value = false;
  }
});
</script>

<template>
  <VBtn style="margin: 1svw" @click="addDialog = true">
    Unggah Ketetapan Halal
  </VBtn>

  <VDialog v-model="addDialog" :max-width="dialogMaxWidth">
    <VCard v-if="!loadingAll">
      >
      <VCardTitle>
        <VRow>
          <VCol cols="10"><h3>Unggah Ketetapan Halal</h3></VCol>
          <VCol cols="2" style="display: flex; justify-content: end">
            <VIcon size="small" icon="fa-times" @click="addDialog = false" />
          </VCol>
        </VRow>
      </VCardTitle>
      <VCardItem>
        <VRow>
          <VCol cols="12">
            <VItemGroup>
              <VLabel>No. Penetapan</VLabel>
              <VTextField
                v-model="formData.no_penetapan"
                placeholder="Isi Nomor Penetapan"
              />
            </VItemGroup>
          </VCol>
        </VRow>

        <VRow>
          <VCol cols="12">
            <VItemGroup>
              <VLabel>Tanggal Surat Pemohon</VLabel>
              <VTextField
                v-model="formData.tgl_penetapan"
                placeholder="Isi Tanggal Sertifikat"
                type="date"
              />
            </VItemGroup>
          </VCol>
        </VRow>

        <VRow>
          <VCol cols="12">
            <VItemGroup>
              <VLabel>Penetapan</VLabel>
              <VSelect
                v-model="formData.penetapan"
                :items="listPenetapan"
                item-title="name"
                item-value="code"
                placeholder="Pilih Jenis Dokumen"
                density="compact"
              />
            </VItemGroup>
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
                  :modelValue="formData.dokumen"
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
                  @update:modelValue="formData.dokumen = $event"
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
    <VSkeletonLoader
      type="table-heading, list-item-two-line, image, table-tfoot"
      v-else
    />
  </VDialog>
</template>
