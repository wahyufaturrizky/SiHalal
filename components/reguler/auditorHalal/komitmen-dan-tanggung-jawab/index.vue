<script setup>
import { ref } from 'vue'

const props = defineProps({
  onComplete: {
    type: Function,
    default: () => { },
    required: false,
  },
})

const agreed = ref(false)
const progress = ref(33)
const labelProgress = ref('1/3')

const handleSubmit = () => {
  switch (progress.value) {
    case 33:
      progress.value = 66
      labelProgress.value = '2/3'
      break;
    case 66:
      progress.value = 100
      labelProgress.value = '3/3'
      break;
    case 100:
    props.onComplete()
      break;
    default:
      break;
  }
  agreed.value = false
}
</script>

<template>
  <VRow justify="center">
    <VCol cols="12">
      <VCard class="pa-5">
        <label class="progress-text">
          {{ labelProgress }}
        </label>
        <VProgressLinear
          height="6"
          color="success"
          class="mb-4"
          bg-color="#000"
          active="true"
          buffer-color="#652672"
          :buffer-value="progress"
          buffer-opacity="1"
          rounded="50px"
        />
        <h2 class="text-h6 font-weight-bold">
          Komitmen dan Tanggung Jawab
        </h2>
        <VDivider class="mb-4" />

        <VCardText
          v-if="progress <= 33"
          class="bgContent"
        >
          <div class="text-center mb-4">
            <span class="text-h3 font-weight-bold">Kebijakan Halal</span>
          </div>
          <p>
            Kami berkomitmen dan bertanggung jawab untuk menghasilkan produk halal
            secara konsisten dan berkesinambungan dengan melakukan tindakan:
          </p>
          <ol class="ml-4">
            <li>
              Mematuhi peraturan perundangan terkait jaminan produk halal.
            </li>
            <li>
              Menggunakan bahan halal dan melakukan Proses Produk Halal (PPH)
              sesuai ketentuan yang berlaku.
            </li>
            <li>
              Menyiapkan sumber daya manusia yang mendukung pelaksanaan PPH
              di perusahaan.
            </li>
            <li>
              Mensosialisasikan dan mengkomunikasikan kebijakan halal pada seluruh pihak
              terkait untuk memastikan semua personel menjaga integrasi halal di perusahaan.
            </li>
          </ol>
        </VCardText>
        <VCardText
          v-if="progress > 33 && progress <= 66"
          class="bgContent"
        >
          <div class="text-center mb-4">
            <span class="text-h3 font-weight-bold">Pengertian Halal & Haram</span>
          </div>
          <ol class="ml-4">
            <li>
              Mengkonsumsi makanan dan minuman yang halal adalah wajib hukumnya bagi orang islam.
            </li>
            <li>
              Pengertian halal haram: (i) Halal adalah Boleh. (ii) Haram adalah sesuatu yang dilarang oleh ALLAH SWT dengan larangan yang tegas.
            </li>
            <li>
              Contoh bahan haram: (i) Babi, termasuk seluruh bagian tubuhnya dan produk turunannya (segar atau olahan), (ii) Khamr (minuman beralkohol), (iii) Hasil samping Khamr yang diperoleh hanya dengan pemisahan secara fisik, (iv) Darah, (v) Bangkai, (vi) Bagian dari tubuh manusia, binatang buas, dan anjing.
            </li>
          </ol>
        </VCardText>
        <VCardText
          v-if="progress > 66"
          class="bgContent"
        >
          <div class="text-center mb-4">
            <span class="text-h3 font-weight-bold">Prakrik Penerapan SJPH</span>
          </div>
          <ol class="ml-4">
            <li>
              Menjaga semua fasilitas produksi dan peralatan dalam keadaan bersih sebelum dan sesudah digunakan.
            </li>
            <li>
              Menjaga Kebersihan diri sebelum dan selama bekerja sehingga tidak mengotori produk yang dihasilkan.
            </li>
            <li>
              Tidak boleh membawa produk tidak halal di area produksi.
            </li>
            <li>
              Tidak boleh menggunakan peralatan produksi untuk kepentingan lain.
            </li>
            <li>
              Menyimpan bahan dan produk di tempat yang bersih dan menjaga supaya terhindar dari najis.
            </li>
            <li>
              Memastikan kendaraan yang digunakan untuk mengangkut produk halal dalam kondisi baik dan tidak digunakan untuk mengangkut produk lain yang diragukan kehalalannya.
            </li>
          </ol>
        </VCardText>

        <VDivider class="my-4" />

        <VRow align="center">
          <VCheckbox
            v-model="agreed"
            label="Saya telah membaca seluruh persyaratan yang telah dicantumkan, dan berjanji akan memenuhi kebijakan tersebut."
          />
        </VRow>

        <VRow
          justify="center"
          class="mt-4"
        >
          <VBtn
            :disabled="!agreed"
            color="#652672"
            @click="handleSubmit"
          >
            Saya Setuju
          </VBtn>
        </VRow>
      </VCard>
    </VCol>
  </VRow>
</template>

  <style scoped>
  .text-center {
    text-align: center;
  }
  .bgContent {
    background-color: #F0E9F1;
    border-radius: 10px;
  }
  .progress-text {
    font-size: 14px !important;
    font-weight: 700 !important;
    line-height: 20px !important;
  }
  </style>
