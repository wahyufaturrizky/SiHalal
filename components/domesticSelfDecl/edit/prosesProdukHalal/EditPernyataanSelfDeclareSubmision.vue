<script setup lang="ts">
const { isVerificator, hideChipStatus } = defineProps({
  canNotEdit: {
    type: Boolean,
  },
  isVerificator: {
    type: Boolean,
    default: false,
  },
});

const aggreButtonDisable = ref(false);
const showDownloadButton = ref(false);

const loadingAgree = ref(false);
const pledgeFile = ref("");
const handleAgree = async () => {
  console.log("agree.........");
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
  return await downloadDocument(pledgeFile.value,'DOC');
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
      if (pledgeFile.value) {
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
          <InfoRow
            name="Nama Pemilik Usaha"
            class="text"
            :name-style="{ fontWeight: '700' }"
            >{{
              submissionDetail.nama_pemilik
                ? submissionDetail.nama_pemilik
                : "-"
            }}</InfoRow
          >
          <InfoRow name="Nama Usaha" :name-style="{ fontWeight: '700' }">{{
            submissionDetail.nama_usaha ? submissionDetail.nama_usaha : "-"
          }}</InfoRow>
          <InfoRow name="Alamat Usaha" :name-style="{ fontWeight: '700' }">{{
            submissionDetail.alamat_usaha ? submissionDetail.alamat_usaha : "-"
          }}</InfoRow>
          <InfoRow
            name="Alamat Tempat Produksi"
            :name-style="{ fontWeight: '700' }"
            >{{
              submissionDetail.alamat_tempat_usaha
                ? submissionDetail.alamat_tempat_usaha
                : "-"
            }}</InfoRow
          >
          <InfoRow name="Telepon" :name-style="{ fontWeight: '700' }">{{
            submissionDetail.no_telp ? submissionDetail.no_telp : "+"
          }}</InfoRow>
          <InfoRow name="Email" :name-style="{ fontWeight: '700' }">{{
            submissionDetail.email ? submissionDetail.email : "-"
          }}</InfoRow>
          <InfoRow name="Jenis Produksi" :name-style="{ fontWeight: '700' }">{{
            submissionDetail.jenis_produk ? submissionDetail.jenis_produk : "-"
          }}</InfoRow>

          <br />
          <p>Dengan ini menyatakan:</p>
          <div class="ps-7">
            <ol>
              <li>Menggunakan bahan yang sudah dipastikan kehalalannya;</li>
              <li>
                Memproduksi dan mengolah produk sesuai dengan persyaratan
                kehalalan; dan
              </li>
              <li>Menghasilkan produk yang dipastikan kehalalan nya;</li>
              <li>
                Memiliki Penyelia Halal sesuai ketentuan peraturan
                perundang-undangan;
              </li>
              <li>
                Apabila kami memperoleh/memperpanjang Sertifikat Halal akan:
              </li>
              <div class="ps-7">
                <ol type="a">
                  <li>
                    Mencantumkan Label Halal terhadap Produk yang telah mendapat
                    Sertifikat Halal;
                  </li>
                  <li>
                    Menjaga kehalalan Produk yang telah memperoleh Sertifikat
                    Halal;
                  </li>
                  <li>
                    Memberikan informasi penyimpanan, distribusi, pengolahan,
                    penyajian, pengemasan, dan/atau bahan yang digunakan kepada
                    BPJPH dan/atau LPPOM MUI;
                  </li>
                  <li>
                    Memisahkan lokasi, tempat, dan alat penyembelihan, alat
                    pengolahan, penyimpanan, pengemasan, dan distribusi yang
                    halal dengan yang tidak halal;
                  </li>
                  <li>
                    Melaporkan perubahan komposisi bahan dan perubahan PPH
                    kepada BPJPH.
                  </li>
                </ol>
              </div>
              <li>
                Apabila ditemukan informasi dan/atau pernyataan dalam pernyataan
                dalam pernyataan ini tidak benar, atau kami tidak memenuhi
                kewajiban sesuai dengan ketentuan peraturan perundang-undangan,
                bersedia dijatuhkan:
              </li>
              <div class="ps-7">
                <ol type="a">
                  <li>Sanksi administratif;</li>
                  <li>Peringatan tertulis;</li>
                  <li>Denda administratif;</li>
                  <li>Pencabutan sertifikat Halal; dan/atau</li>
                  <li>Pencabutan pernyataan pelaku usaha.</li>
                </ol>
              </div>
            </ol>
          </div>
          <br />
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
          <p>
            {{
              submissionDetail.nama_pemilik
                ? submissionDetail.nama_pemilik
                : "-"
            }}
          </p>
          <div>
            <!-- {{ submissionDetail.nama_pj ? submissionDetail.nama_pj : "-" }} -->
            Pelaku Usaha
          </div>
          <!-- <p>Penanggung Jawab Produk Halal</p> -->
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
        @click="handleAgree"
        :disabled="isVerificator"
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
  position: relative;
  display: inline-block;
  font-weight: bold;
}

.dots::after {
  position: absolute;
  border-block-end: 1px dotted black;
  content: "";
  inline-size: 100%;
  inset-block-start: -5px;
  inset-inline: 0;
}
</style>
