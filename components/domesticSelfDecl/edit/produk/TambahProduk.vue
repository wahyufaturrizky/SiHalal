<script setup lang="ts">
import type { VForm } from "vuetify/components";

const predictKBLIMessage = ref("");
const predictMessage = ref("");
const jenis_product = ref("");
const loadingPredictKBLI = ref(true);
const isSesuai = ref(false);
const loadingPredict = ref(true);
const loadingAll = ref(true);

const props = defineProps<{
  dialogVisible: boolean;
  dialogTitle: string;
  dialogUse?: string;
  hideButton?: boolean;
  data?: any;
}>();

const emit = defineEmits(["update:dialogVisible", "submit:commitAction"]);
const localDialogVisible = ref(props.dialogVisible);
const localDialogUse = ref(props.dialogUse);

const modalUse = computed(() => props.dialogUse);
const detailData = ref(props.data);
const textSubmitButton = computed(() => {
  switch (localDialogUse.value) {
    case "EDIT":
      return "Simpan";
    default:
      return "Tambah";
  }
});

const closeDialog = () => {
  localDialogVisible.value = false;
  emit("update:dialogVisible", false);
};
const resetForm = () => {
  uploadedFile.value.name = null;
  uploadedFile.value.file = null;
  formData.foto_produk = null;
  formData.kode_rincian = null;
  formData.nama_produk = null;
  formData.product_grade = null;
  formData.merek = null;
  productDetail.value = null;
};

const productDetail = ref(null);
const formData = reactive({
  product_grade: null,
  kode_rincian: detailData?.value?.koderincian || null,
  nama_produk: detailData?.value?.nama || null,
  merek: detailData?.value?.merek || null,
  foto_produk: detailData?.value?.fotoproduk || null,
});

watch(
  () => props.dialogUse,
  (newVal) => {
    localDialogUse.value = newVal;
  }
);
watch(
  () => props.dialogVisible,
  (newVal) => {
    localDialogVisible.value = newVal;
  }
);
watch(localDialogVisible, (newVal, oldValue) => {
  if (oldValue === false && modalUse.value === "CREATE") resetForm();
  emit("update:dialogVisible", newVal);
});

const uploadedFile = ref({
  name: props?.data?.fotoproduk || null,
  file: null,
});

const route = useRoute<"">();
const submissionId = route.params?.id;

const listClassification = ref([]);
const listClassificationDetail = ref([]);
const handleListClassification = async () => {
  try {
    const response: any = await $api(
      `/self-declare/business-actor/product/classification`,
      {
        method: "get",
        params: {
          id_reg: submissionId,
        },
      }
    );
    if (response.code != 2000) {
    }
    listClassification.value = response.data;
  } catch (error) {
    useSnackbar().sendSnackbar("ada kesalahan", "error");
  }
};
const handleListClassificationDetail = async (grade: string) => {
  formData.kode_rincian = null;
  try {
    const response: any = await $api(
      `/self-declare/business-actor/product/classification-detail`,
      {
        method: "get",
        params: {
          code: grade,
        },
      }
    );
    if (response.code != 2000) {
    }
    listClassificationDetail.value = response.data;
  } catch (error) {
    useSnackbar().sendSnackbar("ada kesalahan", "error");
  }
};

const handleRemoveFile = () => {
  uploadedFile.value.name = null;
  uploadedFile.value.file = null;
  formData.foto_produk = null;
};

const handleUploadFile = async (event: any) => {
  if (event?.target?.files.length) {
    const fileData = event.target.files[0];
    uploadedFile.value.name = fileData.name;
    uploadedFile.value.file = fileData;
    try {
      const response = await uploadDocument(fileData);
      if (response.code === 2000) {
        formData.foto_produk = response.data.file_url;
      }
    } catch (error) {
      console.log(error);
    }
  }
};

const uploadDocument = async (file: any) => {
  try {
    const formData = new FormData();
    formData.append("id", String(submissionId));
    formData.append("file", file);
    formData.append("type", "produk");
    const response = await $api("/shln/submission/document/upload", {
      method: "post",
      body: formData,
    });
    return response;
  } catch (error) {
    useSnackbar().sendSnackbar(
      "ada kesalahan saat upload file, gagal menyimpan!",
      "error"
    );
  }
};

const predictKBLI = async (product: any) => {
  try {
    const response: any = await $api(
      "/machine-learning/registration/mlclient/predict-kbli",
      {
        method: "post",
        body: {
          CREATE_MLCLIENT: {
            Name: product,
          },
        },
      }
    );

    if (response) {
      predictKBLIMessage.value = response.CREATE_MLCLIENT.predictkbli;
      loadingPredictKBLI.value = false;

      return response;
    }
  } catch (error) {
    loadingPredictKBLI.value = false;
    useSnackbar().sendSnackbar("ada kesalahan!", "error");
  }
};

const predict = async (product: any) => {
  try {
    const response: any = await $api(
      "/machine-learning/registration/mlclient/predict",
      {
        method: "post",
        body: {
          CREATE_MLCLIENT: {
            Name: product,
          },
        },
      }
    );

    if (response) {
      predictMessage.value = response.CREATE_MLCLIENT.predict;
      loadingPredict.value = false;

      return response;
    }
  } catch (error) {
    loadingPredict.value = false;
    useSnackbar().sendSnackbar("ada kesalahan!", "error");
  }
};

const debouncedFetch: any = debounce(predictKBLI, 1000);
const debouncedFetchPredict: any = debounce(predict, 1000);

const handleInput = () => {
  debouncedFetch(formData?.nama_produk);
  debouncedFetchPredict(formData?.nama_produk);
};

const formUbahProduk = ref<VForm>();

const handleSubmit = () => {
  formUbahProduk.value?.validate().then(({ valid: isValid }) => {
    if (isValid) {
      emit("submit:commitAction", formData);
      closeDialog();
    }
  });
};

const getDetail = async () => {
  try {
    const response: any = await $api(
      `/self-declare/pengajuan/${submissionId}/detail`,
      {
        method: "get",
      }
    );

    if (response.code == 2000) {
      jenis_product.value = response.data.jenis_product;
    }
  } catch (error: any) {
    useSnackbar().sendSnackbar("ada kesalahan!", "error");
  }
};

const handlePredict = (product: any) => {
  if (product) {
    if (jenis_product.value === predictMessage.value) {
      isSesuai.value = true;
      const res = `Jenis Produk Sudah Sesuai ${predictMessage.value}, KBLI: ${predictKBLIMessage.value}`;
      return res;
    } else {
      isSesuai.value = false;
      const res = `Jenis Produk untuk ${product} Tidak sesuai dengan yang dipilih pada Tab Pengajuan, Seharusnya: ${predictMessage.value}, KBLI: ${predictKBLIMessage.value}`;
      return res;
    }
  }
};

onMounted(async () => {
  const res = await Promise.all([getDetail(), handleListClassification()]);

  const checkResIfUndefined = res.every((item) => {
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
  <VDialog v-model="localDialogVisible" max-width="60svw">
    <VCard v-if="!loadingAll">
      <VCardTitle>
        <VRow>
          <VCol cols="10" style="display: flex; align-items: center"
            ><h3>{{ props.dialogTitle }}</h3></VCol
          >
          <VCol cols="2" style="display: flex; justify-content: end">
            <VCol cols="2" style="display: flex; justify-content: end"
              ><VIcon size="small" icon="fa-times" @click="closeDialog"></VIcon
            ></VCol>
          </VCol>
        </VRow>
      </VCardTitle>
      <VCardItem>
        <VForm ref="formUbahProduk" @submit.prevent>
          <VItemGroup>
            <VLabel><b>Klasifikasi Produk</b></VLabel>
            <VSelect
              density="compact"
              placeholder="Pilih Klasifikasi Produk"
              v-model="formData.product_grade"
              :items="listClassification"
              item-title="name"
              item-value="code"
              v-on:update:model-value="handleListClassificationDetail"
              :rules="[requiredValidator]"
            ></VSelect>
          </VItemGroup>
          <br />
          <VItemGroup>
            <VLabel><b>Rincian Produk</b></VLabel>
            <VSelect
              density="compact"
              placeholder="Pilih Rincian Produk"
              v-model="formData.kode_rincian"
              :items="listClassificationDetail"
              item-title="name"
              item-value="code"
              :rules="[requiredValidator]"
            ></VSelect>
          </VItemGroup>
          <br />
          <VItemGroup>
            <VLabel><b>Nama Produk</b></VLabel>
            <VTextField
              density="compact"
              placeholder="Isi Nama Produk"
              v-model="formData.nama_produk"
              :rules="[requiredValidator]"
              @input="handleInput"
            ></VTextField>
            <p
              v-if="!loadingPredict && !loadingPredictKBLI"
              :class="isSesuai ? 'text-blue' : 'text-red'"
            >
              {{ handlePredict(formData?.nama_produk) }}
            </p>
          </VItemGroup>
          <br />
          <VItemGroup>
            <VLabel><b>Merk</b></VLabel>
            <VTextField
              density="compact"
              placeholder="Isi Merk"
              v-model="formData.merek"
              :rules="[requiredValidator]"
            ></VTextField>
          </VItemGroup>
          <br />
          <VItemGroup>
            <VRow align="center">
              <VCol cols="6" class="font-weight-bold mb-1">
                Unggah Foto Produk
              </VCol>
              <VCol cols="6">
                <VTextField
                  v-if="uploadedFile.file"
                  :model-value="uploadedFile.name"
                  density="compact"
                  placeholder="No file choosen"
                  rounded="xl"
                  max-width="400"
                >
                  <template #append-inner>
                    <VIcon
                      icon="fa-trash"
                      color="error"
                      class="cursor-pointer"
                      @click="handleRemoveFile"
                    />
                  </template>
                </VTextField>
                <VFileInput
                  v-else
                  :model-value="uploadedFile.file"
                  class="custom-file-input"
                  density="compact"
                  rounded="xl"
                  label="No file choosen"
                  max-width="400"
                  prepend-icon=""
                  @change="handleUploadFile"
                  :rules="[requiredValidator, fileExtensionTypeValidator]"
                >
                  <template #append-inner>
                    <VBtn rounded="s-0 e-xl" text="Choose" />
                  </template>
                </VFileInput>
              </VCol>
            </VRow>
          </VItemGroup>
          <br />
        </VForm>
      </VCardItem>
      <VCardActions>
        <VBtn variant="outlined" @click="closeDialog"> Batal</VBtn>
        <VBtn variant="flat" @click="handleSubmit">{{ textSubmitButton }}</VBtn>
      </VCardActions>
    </VCard>

    <VSkeletonLoader type="card" v-else />
  </VDialog>
</template>

<style lang="scss">
.custom-file-input {
  .v-field--appended {
    padding-inline-end: 0 !important;
  }
}

.text-red {
  color: red;
}

.text-blue {
  color: blue;
}
</style>
