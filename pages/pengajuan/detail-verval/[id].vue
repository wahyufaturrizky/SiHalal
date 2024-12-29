<script setup lang="ts">
import { modalTypeEnum } from "@/components/prosesVerval/verval-enum";

const route = useRoute();

const dataPelakuUsaha = ref();
const dataPenanggungJawab = ref();
const dataPendaftaran = ref();
const dataRequirementGeneral = ref();
const dataRequirementSpecific = ref();
const dataBahanList = ref();
const dataProdukList = ref();
const dataProsesList = ref();

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

    dataProdukList.value = response.data;
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
    <VCol cols="7">
      <VBtn style="margin-right: 1svw" color="warning" variant="outlined"
        >Formulir Rekomendasi</VBtn
      >
      <VBtn append-icon="fa-download" variant="outlined"
        >Download Rekomendasi</VBtn
      >
    </VCol>
    <VCol cols="5" style="display: flex; justify-content: end">
      <ModalPengembalianDanKirim
        :modal-type="modalTypeEnum.KEMBALI"
      ></ModalPengembalianDanKirim>
      <ModalPengembalianDanKirim
        :modal-type="modalTypeEnum.KIRIM"
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
        v-if="dataPendaftaran"
      ></RightPanelVervalDetail>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
      <PersyaratanUmumTable
        :data-persyaratan="dataRequirementGeneral"
        v-if="dataRequirementGeneral"
      ></PersyaratanUmumTable>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
      <PersyaratanKhususTable
        :data-persyaratan="dataRequirementSpecific"
      ></PersyaratanKhususTable>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
      <BahanTablePendamping
        :data="dataBahanList"
        :id-reg="route.params?.id"
        @confirm-add="handleBahanAdd"
      ></BahanTablePendamping>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
      <ProsesProdukHalalPendamping
        :data="dataProsesList"
        @confirm-add="handleProsesProdukAdd"
      ></ProsesProdukHalalPendamping>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
      <ProdukHalalPendamping
        :data="dataProdukList"
        @confirm-add="handleProdukAdd"
      ></ProdukHalalPendamping>
    </VCol>
  </VRow>
</template>
