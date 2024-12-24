<script setup lang="ts">
const aggreButtonDisable = ref(false);
const showDownloadButton = ref(false);

const loadingAgree = ref(false);
const pledgeFile = ref("");
const handleAgree = async () => {
  // console.log("agree.........");
  try {
    loadingAgree.value = true;
    const response: any = await $api(
      `/self-declare/business-actor/statement/agree`,
      {
        method: "get",
        query: {
          id_reg: submissionId,
        },
      }
    );

    if (response.code === 2000) {
      pledgeFile.value = response.data.url_download;
      aggreButtonDisable.value = true;
      showDownloadButton.value = true;
      loadingAgree.value = false;
    }
    return response;
  } catch (error) {
    loadingAgree.value = false;
    console.log(error);
  }
};

const handleDownload = async () => {
  return await downloadDocument(pledgeFile.value);
};

const route = useRoute<"">();
const submissionId = route.params?.id;
const submissionDetail = reactive({
  nama_pemilik: null,
  nama_usaha: null,
  alamat_usaha: null,
  alamat_tempat_usaha: null,
  no_telp: null,
  email: null,
  jenis_produk: null,
  nama_pj: null,
  file: null,
});

const handleGetDeclare = async () => {
  try {
    const response: any = await $api(`/self-declare/business-actor/statement`, {
      method: "get",
      query: {
        id_reg: submissionId,
      },
    });

    if (response.code === 2000) {
      Object.assign(submissionDetail, response.data);
      pledgeFile.value = response.data.file;
      if (pledgeFile) {
        aggreButtonDisable.value = true;
        showDownloadButton.value = true;
      }
    }
    return response;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  handleGetDeclare();
});
</script>

<template>
  <VCard class="pa-6">
    <VCardTitle class="pa-0 mb-2">
      <span class="text-h5 font-weight-bold">Pernyataan Pelaku Usaha </span>
    </VCardTitle>
    <VCardText class="pa-0">
      <p>Yang bertandatangan di bawah ini sebagai Pelaku Usaha :</p>
      <VRow>
        <VCol cols="8">
          <InfoRow name="Nama Pemilik Usaha">{{
            submissionDetail.nama_pemilik ? submissionDetail.nama_pemilik : "-"
          }}</InfoRow>
          <InfoRow name="Nama Usaha">{{
            submissionDetail.nama_usaha ? submissionDetail.nama_usaha : "-"
          }}</InfoRow>
          <InfoRow name="Alamat Usaha">{{
            submissionDetail.alamat_usaha ? submissionDetail.alamat_usaha : "-"
          }}</InfoRow>
          <InfoRow name="Alamat Tempat Usaha">{{
            submissionDetail.alamat_tempat_usaha
              ? submissionDetail.alamat_tempat_usaha
              : "-"
          }}</InfoRow>
          <InfoRow name="Nomor Handphone">{{
            submissionDetail.no_telp ? submissionDetail.no_telp : "-"
          }}</InfoRow>
          <InfoRow name="Email">{{
            submissionDetail.email ? submissionDetail.email : "-"
          }}</InfoRow>
          <InfoRow name="Jenis Produk">{{
            submissionDetail.jenis_produk ? submissionDetail.jenis_produk : "-"
          }}</InfoRow>

          <br />
          <p>Dengan ini menyatakan:</p>
          <ol class="pl-4">
            <li>Menggunakan bahan yang sudah dipastikan kehalalannya</li>
            <li>
              Memproduksi dan mengolah produk sesuai dengan persyaratan
              kehalalan
            </li>
            <li>Menghasilkan produk yang dipastikan kehalalan nya; dan</li>
          </ol>
          <p>
            Semua informasi yang disampaikan dalam akad/ikrar ini adalah benar,
            Apabila ditemukan dan/atau dibuktikan adanya penipuan/pemalsuan atas
            informasi yang kami sampaikan, maka kami bersedia dikenakan dan
            menerima penetapan sangsi
          </p>
          <p>
            Demikian akad/ikrar pernyataan Pelaku Usaha ini kami buat untuk
            digunakan secara semestinya
          </p>
        </VCol>
      </VRow>
    </VCardText>
    <VCardText class="pa-0">
      <VRow no-gutters class="d-flex flex-column align-items-start">
        <VCol cols="12" md="6" lg="4">
          <br />
          <br />
          <br />
          <div class="dots">
            {{ submissionDetail.nama_pj ? submissionDetail.nama_pj : "-" }}
          </div>
          <p>Penanggung Jawab Produk Halal</p>
        </VCol>
      </VRow>
    </VCardText>
    <VCardActions class="d-flex justify-end">
      <VBtn
        v-if="showDownloadButton"
        @click="handleDownload"
        variant="outlined"
        append-icon="ri-download-line"
        >Download ikrar</VBtn
      >
      <VBtn
        @click="aggreButtonDisable ? handleAgree : null"
        variant="flat"
        min-width="120px"
        class="text-white"
        :color="aggreButtonDisable ? '#A09BA1' : 'primary'"
        :loading="loadingAgree"
        >Setuju</VBtn
      >
    </VCardActions>
  </VCard>
</template>

<style scoped lang="scss">
.dots {
  display: inline-block;
  position: relative;
  font-weight: bold;
}

.dots::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: -5px;
  border-bottom: 1px dotted black;
  width: 100%;
}
</style>
