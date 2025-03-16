<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const loading = ref(true);
const submissionId = (route.params as any).id;

const combinedNamaProduk = ref("");
const formattedBahan = ref("");
const formattedCleaning = ref("");
const formattedKemasan = ref("");
const sertifikatHalal = ref<Record<string, any>>({});
const penanggungJawab = ref<Record<string, any>>({});
const dataDukungBahan = ref<Array<Record<string, any>>>([]);
const melacak = ref<Array<Record<string, any>>>([]);
const listProduk = ref<Array<Record<string, any>>>([]);

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

const loadItemById = async () => {
  try {
    const response: any = await $api(
      `/self-declare/komite-fatwa/proses-sidang/${submissionId}/detail`,
      { method: "get" }
    );

    if (response.code === 2000) {
      console.log(response.data, "ini response data");

      const {
        certificate_halal,
        penanggung_jawab,
        produk,
        bahan,
        data_dukung,
        tracking,
      } = response.data || {};

      sertifikatHalal.value = certificate_halal;
      penanggungJawab.value = penanggung_jawab;
      dataDukungBahan.value = Array.isArray(data_dukung) ? data_dukung : [];
      melacak.value = Array.isArray(tracking) ? tracking : [];
      listProduk.value = produk;

      console.log(tracking, "ini data tracking");
      console.log(melacak.value, "ini data trackking value");
      combinedNamaProduk.value = produk
        .map(
          (item: any, index: number) =>
            `(${index + 1}) ${item.nama_produk?.trim() ?? "-"}`
        )
        .join(", ");

      formattedBahan.value = bahan
        .filter((item: any) => {
          // Extract the part after the `|` in `jenis_bahan`
          const jenisBahan =
            item.jenis_bahan?.split("|")[1] || item.jenis_bahan;

          return jenisBahan === "Bahan";
        })
        .map(
          (item: any, index: number) =>
            `(${index + 1}) ${item.nama_bahan?.trim() ?? "-"}`
        )
        .join(", ");

      formattedCleaning.value = bahan
        .filter((item: any) => {
          // Extract the part after the `|` in `jenis_bahan`
          const jenisBahan =
            item.jenis_bahan?.split("|")[1] || item.jenis_bahan;

          return jenisBahan === "Cleaning Agent";
        })
        .map(
          (item: any, index: number) =>
            `(${index + 1}) ${item.nama_bahan?.trim() ?? "-"}`
        )
        .join(", ");

      formattedKemasan.value = bahan
        .filter((item: any) => {
          // Extract the part after the `|` in `jenis_bahan`
          const jenisBahan =
            item.jenis_bahan?.split("|")[1] || item.jenis_bahan;

          return jenisBahan === "Kemasan";
        })
        .map(
          (item: any, index: number) =>
            `(${index + 1}) ${item.nama_bahan?.trim() ?? "-"}`
        )
        .join(", ");

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

onMounted(async () => {
  loading.value = true;
  await loadItemById();
  loading.value = false;
});

watch(
  () => ({
    sertifikatHalal: sertifikatHalal.value,
    dataDukungBahan: dataDukungBahan.value,
    melacak: melacak.value,
    penanggungJawab: penanggungJawab.value,
    combinedNamaProduk: combinedNamaProduk.value,
    formattedBahan: formattedBahan.value,
    formattedCleaning: formattedCleaning.value,
    formattedKemasan: formattedKemasan.value,
    listProduk: listProduk.value,
  }),
  (newData) => {
    if (newData) Object.assign(newDataSertifikatHalal, newData);
    // console.log('Updated newDataSertifikatHalal:', newDataSertifikatHalal)
  },
  { immediate: true, deep: true }
);
</script>

<!-- role pendamping -->

<template>
  <VRow>
    <VCol cols="12">
      <KembaliButton />
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
      <h2>Laporan Hasil Pendampingan</h2>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="8">
      <VRow v-if="!loading">
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
      </VRow>
      <VRow v-if="!loading">
        <VCol cols="12">
          <DaftarNamaBahanPendampingan
            v-if="Object.keys(newDataSertifikatHalal).length > 0"
            :databahan="newDataSertifikatHalal.dataDukungBahan"
          />
        </VCol>
      </VRow>
      <VRow v-if="!loading">
        <VCol cols="12">
          <DaftarProdukSidangDetail
            :dataproduk="newDataSertifikatHalal.listProduk"
          ></DaftarProdukSidangDetail>
        </VCol>
      </VRow>
    </VCol>
    <VCol cols="4">
      <VRow v-if="!loading">
        <VCol cols="12">
          <PendaftaranPendamping
            v-if="Object.keys(newDataSertifikatHalal).length > 0"
            :sertifikat="newDataSertifikatHalal.sertifikatHalal"
          />
        </VCol>
      </VRow>
      <VRow v-if="!loading">
        <VCol cols="12">
          <MelacakPendamping
            v-if="Object.keys(newDataSertifikatHalal).length > 0"
            :tracking="newDataSertifikatHalal.melacak"
          />
        </VCol>
      </VRow>
      <!-- <RestPanelPendamping /> -->
    </VCol>
  </VRow>
</template>
