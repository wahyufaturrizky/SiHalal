<script setup lang="ts">
import { reactive } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const submissionId = route.params.id;

const newDataSertifikatHalal = reactive({
  sertifikatHalal: {},
  penanggungJawab: {},
  dataDukungBahan: [],
  melacak: [],
  combinedNamaProduk: "",
  formattedBahan: "",
  formattedCleaning: "",
  formattedKemasan: "",
  listProduk: [],
});

const { data, pending, error } = await useAsyncData(
  `detail-${submissionId}`,
  async () => {
    const response = await $api(
      `/self-declare/komite-fatwa/proses-sidang/${submissionId}/detail`,
      { method: "get" }
    );

    if (response.code !== 2000) {
      throw createError({
        statusCode: 500,
        message: response.errors?.list_error?.join(", ") ?? "Unknown error",
      });
    }

    return response.data;
  }
);

// Populate reactivity from SSR-safe data
if (data.value) {
  const {
    certificate_halal,
    penanggung_jawab,
    produk,
    bahan,
    data_dukung,
    tracking,
  } = data.value;

  newDataSertifikatHalal.sertifikatHalal = certificate_halal ?? {};
  newDataSertifikatHalal.penanggungJawab = penanggung_jawab ?? {};
  newDataSertifikatHalal.dataDukungBahan = Array.isArray(data_dukung)
    ? data_dukung
    : [];
  newDataSertifikatHalal.melacak = Array.isArray(tracking) ? tracking : [];
  newDataSertifikatHalal.listProduk = produk ?? [];

  newDataSertifikatHalal.combinedNamaProduk = produk
    .map(
      (item: any, index: number) =>
        `(${index + 1}) ${item.nama_produk?.trim() ?? "-"}`
    )
    .join(", ");

  const filterBahan = (jenis: string) =>
    (bahan ?? [])
      .filter((item: any) => {
        const jenisBahan = item.jenis_bahan?.split("|")[1] || item.jenis_bahan;
        return jenisBahan === jenis;
      })
      .map(
        (item: any, index: number) =>
          `(${index + 1}) ${item.nama_bahan?.trim() ?? "-"}`
      )
      .join(", ");

  newDataSertifikatHalal.formattedBahan = filterBahan("Bahan");
  newDataSertifikatHalal.formattedCleaning = filterBahan("Cleaning Agent");
  newDataSertifikatHalal.formattedKemasan = filterBahan("Kemasan");
}
</script>

<!-- role pendamping -->

<template>
  <VRow>
    <VCol cols="12">
      <KembaliButton />
    </VCol>
  </VRow>

  <VRow>
    <VCol cols="8">
      <h2>Laporan Hasil Pendampingan</h2>
    </VCol>
    <VCol style="display: flex; justify-content: end" cols="4">
      <VBtn color="primary" text="Lihat Foto Pendampingan">
        <template #default>
          <ImagePreviewModal
            :card-title="'Foto Pendampingan'"
            :namabahan="
              newDataSertifikatHalal?.sertifikatHalal?.photo_pendampingan
            "
            :doc-query="
              newDataSertifikatHalal.sertifikatHalal.photo_pendampingan?.includes(
                'lembaga.halal.go.id'
              )
                ? 'PRODUCT'
                : ''
            "
            :icon-activator="false"
            string-btn-activator="Buka Foto Pendampingan"
          />
        </template>
      </VBtn>
    </VCol>
  </VRow>

  <VRow v-if="!pending">
    <VCol cols="8">
      <VRow>
        <VCol cols="12">
          <ProfilPendampingan
            v-if="Object.keys(newDataSertifikatHalal).length > 0"
            :sertifikat="newDataSertifikatHalal.sertifikatHalal"
            :bahan="newDataSertifikatHalal.formattedBahan"
            :cleaning="newDataSertifikatHalal.formattedCleaning"
            :kemasan="newDataSertifikatHalal.formattedKemasan"
            :produk="newDataSertifikatHalal.combinedNamaProduk"
            :penanggungjawab="newDataSertifikatHalal.penanggungJawab"
          />
        </VCol>
        <VCol cols="12">
          <DaftarNamaBahanPendampingan
            :databahan="newDataSertifikatHalal.dataDukungBahan"
          />
        </VCol>
        <VCol cols="12">
          <DaftarProdukSidangDetail
            :dataproduk="newDataSertifikatHalal.listProduk"
          />
        </VCol>
      </VRow>
    </VCol>

    <VCol cols="4">
      <VRow>
        <VCol cols="12">
          <PendaftaranPendamping
            :sertifikat="newDataSertifikatHalal.sertifikatHalal"
          />
        </VCol>
        <VCol cols="12">
          <MelacakPendamping :tracking="newDataSertifikatHalal.melacak" />
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>
