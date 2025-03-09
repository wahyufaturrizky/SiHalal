<script setup lang="ts">
import { modalTypeEnum } from "@/components/prosesVerval/verval-enum";
import { useGoTo } from "vuetify";

const route = useRoute();

const dataPelakuUsaha = ref();
const dataPenanggungJawab = ref();
const dataPendaftaran = ref();
const dataRequirementGeneral = ref();
const dataRequirementSpecific = ref();
const dataBahanList = ref();
const dataProdukList = ref();
const dataProsesList = ref();
const dataTracking = ref();
const generalReqRef = ref();
const specificReqRef = ref();
const ingredientTableRef = ref();
const productRef = ref();
const prodProcessRef = ref();
const fileImage = ref<File | null>(null);
const imageData = ref(null)

const getDetail = async () => {
  try {
    const response = await $api(
      `/self-declare/proses-verval/${route.params?.id}/detail`,
      {
        method: "get",
      }
    );
    
    if (response.code != 2000) {
      useSnackbar().sendSnackbar("ada kesalahan", "error");
      return;
    }
    dataPelakuUsaha.value = response.data?.pelaku_usaha;
    dataPenanggungJawab.value = response.data?.penanggung_jawab;
    dataPendaftaran.value = response.data?.pendaftaran;
    dataTracking.value = response.data?.tracking;
    imageData.value = response?.data?.lembaga_pendamping?.foto_pendampingan
  } catch (error) {
    useSnackbar().sendSnackbar("ada kesalahan", "error");
  }
};

const getGeneralQuestion = async () => {
  try {
    const response = await $api(
      `/self-declare/proses-verval/${route.params?.id}/req-general`,
      {
        method: "get",
      }
    );
    if (response.code != 2000) {
      useSnackbar().sendSnackbar("ada kesalahan", "error");
      return;
    }

    dataRequirementGeneral.value = response.data;
  } catch (error) {
    useSnackbar().sendSnackbar("ada kesalahan", "error");
  }
};

const getSpecificQuestion = async () => {
  try {
    const response = await $api(
      `/self-declare/proses-verval/${route.params?.id}/req-specific`,
      {
        method: "get",
      }
    );
    if (response.code != 2000) {
      useSnackbar().sendSnackbar("ada kesalahan", "error");
      return;
    }

    dataRequirementSpecific.value = response.data;
  } catch (error) {
    useSnackbar().sendSnackbar("ada kesalahan", "error");
  }
};

const getIngredientList = async () => {
  try {
    const response = await $api(
      `/self-declare/proses-verval/${route.params?.id}/ingredient-list`,
      {
        method: "get",
      }
    );
    if (response.code != 2000) {
      useSnackbar().sendSnackbar("ada kesalahan", "error");
      return;
    }

    dataBahanList.value = response.data;
  } catch (error) {
    useSnackbar().sendSnackbar("ada kesalahan", "error");
  }
};

const getProductList = async () => {
  try {
    const response = await $api(
      `/self-declare/proses-verval/${route.params?.id}/product-list`,
      {
        method: "get",
      }
    );
    if (response.code != 2000) {
      useSnackbar().sendSnackbar("ada kesalahan", "error");
      return;
    }

    if (response.data) {
      dataProdukList.value = response.data;
    } else {
      dataProdukList.value = [];
    }
  } catch (error) {
    useSnackbar().sendSnackbar("ada kesalahan", "error");
  }
};

const getProductProcessList = async () => {
  try {
    const response = await $api(
      `/self-declare/proses-verval/${route.params?.id}/product-process-list`,
      {
        method: "get",
      }
    );
    if (response.code != 2000) {
      useSnackbar().sendSnackbar("ada kesalahan", "error");
      return;
    }

    dataProsesList.value = response.data;
  } catch (error) {
    useSnackbar().sendSnackbar("ada kesalahan", "error");
  }
};

const handleBahanAdd = async (result: boolean) => {
  if (result) {
    await getIngredientList();
  }
};

const handleProsesProdukAdd = async (result: boolean) => {
  if (result) {
    await getProductProcessList();
  }
};

const handleProdukAdd = async (result: boolean) => {
  if (result) {
    await getProductList();
  }
};

const handleProsesProdukDelete = async (result: boolean) => {
  if (result) {
    await getProductProcessList();
  }
};

const handleProdukDelete = async (result: boolean) => {
  if (result) {
    await getProductList();
  }
};

const skBlobUri = ref();

const skReadyHandler = (blob) => {
  skBlobUri.value = blob;
};

const downloadFileRekomendasi = () => {
  if (skBlobUri.value) {
    window.open(skBlobUri.value);
  }
};

const dataBahanListOption = ref();

const getIngredientListDropdown = async () => {
  try {
    const response = await $api(
      `/self-declare/proses-verval/${route.params?.id}/pendamping-bahan-list`,
      {
        method: "get",
      }
    );
    if (response.code != 2000) {
      useSnackbar().sendSnackbar("ada kesalahan", "error");
      return;
    }

    dataBahanListOption.value = response.data;
  } catch (error) {
    useSnackbar().sendSnackbar("ada kesalahan", "error");
  }
};

const goToComponent = useGoTo();

const validateVerval = async () => {
  let scrollTo = null;
  let countValidation = 5;

  const countGeneralReqRefSelected = generalReqRef.value.selected.size;
  const countSpecificReqRefSelected = specificReqRef.value.selected.size;
  await getIngredientListDropdown();

  if (countGeneralReqRefSelected < dataRequirementGeneral.value?.length) {
    countValidation -= 1;
    generalReqRef.value.openValidationErrorRibbon();
    if (!scrollTo) {
      scrollTo = "#generalReqTableId";
    }
  }
  if (countSpecificReqRefSelected < dataRequirementSpecific.value?.length) {
    countValidation -= 1;
    specificReqRef.value.openValidationErrorRibbon();
    if (!scrollTo) {
      scrollTo = "#specificReqTableId";
    }
  }
  if (dataBahanList.value?.length != dataBahanListOption.value?.length) {
    countValidation -= 1;
    ingredientTableRef.value.openValidationErrorRibbon();
    if (!scrollTo) {
      scrollTo = "#ingredientTableId";
    }
  }
  if (dataProsesList.value?.length < 2) {
    countValidation -= 1;
    prodProcessRef.value.openValidationErrorRibbon();
    if (!scrollTo) {
      scrollTo = "#processProductReqTableId";
    }
  }
  if (dataProdukList.value?.length < 1) {
    countValidation -= 1;
    productRef.value.openValidationErrorRibbon();
    if (!scrollTo) {
      scrollTo = "#productReqTableId";
    }
  }

  if (countValidation == 5) {
    await vervalSend();
  } else {
    if (scrollTo) {
      goToComponent(scrollTo, {
        duration: 500,
        easing: "easeInOutCubic",
        offset: -10,
      });
    }

    useSnackbar().sendSnackbar("Data Verval belum terisi sepenuhnya", "error");
  }
};

const vervalReturn = async (notesPengembalian: string) => {
  try {
    const response = await $api(
      `/self-declare/proses-verval/${route.params?.id}/verval-return`,
      {
        method: "post",
        body: {
          notes: notesPengembalian,
        },
      }
    );
    if (response.code != 2000) {
      useSnackbar().sendSnackbar("ada kesalahan", "error");
      return;
    }
    useSnackbar().sendSnackbar("Kembalikan data sukses", "success");
    navigateTo("/pengajuan/verval-pendamping");
  } catch (error) {
    useSnackbar().sendSnackbar("ada kesalahan", "error");
  }
};

const vervalSend = async () => {
  try {
    const response = await $api(
      `/self-declare/proses-verval/${route.params?.id}/verval-send`,
      {
        method: "post",
        body: {
          notes: "",
        },
      }
    );
    if (response.code != 2000) {
      useSnackbar().sendSnackbar("Gagal Kirim Data", "error");
      return;
    }
    useSnackbar().sendSnackbar("Kirim data sukses", "success");
    navigateTo("/pengajuan/verval-pendamping");
  } catch (error) {
    useSnackbar().sendSnackbar("Gagal Kirim Data", "error");
  }
};

const triggerFileInput = () => {
  fileImage.value.click();
};

const handleFileSelect = async (event) => {
  try {
    const formData = new FormData();
    formData.append("id", route.params?.id);
    formData.append("file", event.target.files?.[0]);
    const response = await $api(
      `/self-declare/proses-verval/${route.params?.id}/upload-image`,
      {
        method: "post",
        body: formData,
      }
    );
    if (response.code != 2000) {
      useSnackbar().sendSnackbar("ada kesalahan", "error");
      return;
    }
    useSnackbar().sendSnackbar("Upload Image Success", "success");
    getDetail()
  } catch (error) {
    useSnackbar().sendSnackbar("ada kesalahan", "error");
  }
};

async function onClickDownload(filename: string) {
  return await downloadDocument(filename);
}

onMounted(async () => {
  await getDetail();
  await getGeneralQuestion();
  await getSpecificQuestion();
  await getIngredientList();
  await getProductList();
  await getProductProcessList();
});
</script>

<template>
  <VRow
    ><VCol><KembaliButton></KembaliButton></VCol
  ></VRow>
  <VRow
    ><VCol><h2>Detail Proses Verval</h2></VCol></VRow
  >
  <VRow>
    <VCol cols="8">
      <VBtn
        append-icon="fa-download"
        variant="outlined"
        @click="downloadFileRekomendasi"
        >Download Rekomendasi</VBtn
      >
      <VBtn
        style="margin-left: 1svw"
        variant="flat"
        append-icon="fa-plus"
        @click="triggerFileInput"
        >Upload Foto Pendampingan</VBtn
      >
      <input
        type="file"
        ref="fileImage"
        class="d-none"
        @change="handleFileSelect"
      />
      <VBtn
        v-if="imageData"
        style="margin-left: 1svw"
        variant="flat"
        title="Download Foto Pendampingan"
        @click="onClickDownload(imageData)"
        ><VIcon icon="fa-download"></VIcon></VBtn
      >
    </VCol>
    <VCol cols="4" style="display: flex; justify-content: end">
      <ModalPengembalianDanKirim
        :modal-type="modalTypeEnum.KEMBALI"
        @verval-return="vervalReturn"
      ></ModalPengembalianDanKirim>
      <ModalPengembalianDanKirim
        :modal-type="modalTypeEnum.KIRIM"
        :imageData="imageData"
        @verval-submit="validateVerval"
      ></ModalPengembalianDanKirim>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="8">
      <VRow
        ><VCol cols="12"
          ><DataPelakuUsahaVerval
            :data="dataPelakuUsaha"
            v-if="dataPelakuUsaha"
          ></DataPelakuUsahaVerval></VCol
      ></VRow>
      <VRow
        ><VCol cols="12"
          ><PenanggungJawabVerval
            :data="dataPenanggungJawab"
            v-if="dataPenanggungJawab"
          ></PenanggungJawabVerval></VCol
      ></VRow>
    </VCol>
    <VCol cols="4">
      <RightPanelVervalDetail
        :data-pendaftaran="dataPendaftaran"
        :data-tracking="dataTracking"
        v-if="dataPendaftaran"
      ></RightPanelVervalDetail>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
      <PersyaratanUmumTable
        id="generalReqTableId"
        ref="generalReqRef"
        :data-persyaratan="dataRequirementGeneral"
        v-if="dataRequirementGeneral"
      ></PersyaratanUmumTable>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
      <PersyaratanKhususTable
        id="specificReqTableId"
        ref="specificReqRef"
        :data-persyaratan="dataRequirementSpecific"
      ></PersyaratanKhususTable>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
      <BahanTablePendamping
        id="ingredientTableId"
        ref="ingredientTableRef"
        :data="dataBahanList"
        :id-reg="route.params?.id"
        @confirm-add="handleBahanAdd"
        :is-temuan-can-edit="true"
      ></BahanTablePendamping>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
      <ProsesProdukHalalPendamping
        id="processProductReqTableId"
        ref="prodProcessRef"
        :data="dataProsesList"
        @confirm-add="handleProsesProdukAdd"
        @confirm-delete="handleProsesProdukDelete"
      ></ProsesProdukHalalPendamping>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
      <ProdukHalalPendamping
        id="productReqTableId"
        ref="productRef"
        :data="dataProdukList"
        @confirm-add="handleProdukAdd"
        @confirm-delete="handleProdukDelete"
      ></ProdukHalalPendamping>
    </VCol>
  </VRow>
  <VRow style="display: none">
    <VCol cols="12">
      <VCard>
        <VCardItem>
          <!-- <component :is="SkPenyeliaHalal" :></component> -->
          <!-- <VBtn @click="downloadSkHandler">tes</VBtn> -->
          <PdfVervalRekomendasi
            @sk-penyelia-download-handler="skReadyHandler"
            :data-pu="dataPelakuUsaha"
            :data-daftar="dataPendaftaran"
          ></PdfVervalRekomendasi>
        </VCardItem>
      </VCard>
    </VCol>
  </VRow>
</template>
