<script setup lang="ts">
import { ref } from "vue";

const data = ref({});
const route = useRoute();
const id = route?.params?.id;
const loadingAll = ref(true);

const handleDownloadV2 = async (filename: string, param?: string) => {
  try {
    const response: any = await $api("/shln/submission/document/download", {
      method: "post",
      body: {
        filename: filename,
        param: param && `dirName=${param}`,
      },
    });

    if (response.url)
      window.open(response.url, "_blank", "noopener,noreferrer");
  } catch (error) {
    console.log(error);
  }
};

const getDetailData = async () => {
  try {
    const response: any = await $api("/reguler/pelaku-usaha/detail", {
      method: "get",
      params: { id },
    });

    if (response?.code === 2000) {
      data.value = response.data;

      return response;
    } else useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

onMounted(async () => {
  const res: any = await Promise.all([getDetailData()]);

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
  <div>
    <VCard v-if="!loadingAll">
      <VCardTitle><h3>Unduh Dokumen kelengkapan</h3></VCardTitle>
      <VCardItem>
        <VRow>
          <VCol cols="4"> Dokumen Surat Permohonan </VCol>
          <VCol cols="1"> : </VCol>
          <VCol cols="7" style="display: flex; justify-content: start">
            <VBtn
              append-icon="fa-download"
              variant="flat"
              @click="
                () => handleDownloadV2(data?.dokumen?.permohonan, 'FILES')
              "
            >
              Unduh
            </VBtn>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="4"> Dokumen SJPH </VCol>
          <VCol cols="1"> : </VCol>
          <VCol cols="7" style="display: flex; justify-content: start">
            <VBtn
              append-icon="fa-download"
              variant="flat"
              @click="() => handleDownloadV2(data?.dokumen?.sjph, 'FILES')"
            >
              Unduh
            </VBtn>
          </VCol>
        </VRow>
      </VCardItem>
    </VCard>
    <div v-else>
      <VSkeletonLoader v-for="i in 3" :key="i" type="list-item-two-line" />
    </div>
  </div>
</template>

<style scoped>
.text-center {
  text-align: center;
}

.bgContent {
  border-radius: 10px;
  background-color: #f0e9f1;
}

.progress-text {
  font-size: 14px !important;
  font-weight: 700 !important;
  line-height: 20px !important;
}
</style>
