<script setup>
import { ref } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: false,
    default: '1',
  },
  onComplete: {
    type: Function,
    default: () => { },
    required: false,
  },
})

const agreed = ref(false)
const loading = ref(false)

const penanggungJawabProfile = ref({
  namaPerusahaan: null,
  namaPenanggungJawab: 'Ketua Tim Manajemen Halal kosong',
  jabatan: 'Tim managemen Halal',
  nib: 'NIB tidak ditemukan',
})

const getDetailData = async () => {
  try {
    loading.value = true
    const response = await $api('/reguler/pelaku-usaha/detail', {
      method: 'get',
      params: { id: props?.id },
    })

    if (response.code === 2000) {
      penanggungJawabProfile.value = {
        namaPerusahaan: response.data?.certificate_halal?.nama_pu,
        namaPenanggungJawab: response.data?.penanggung_jawab?.nama_pj,
        jabatan: 'Tim managemen Halal',
        nib: response?.data.aspek_legal?.filter(i => i.jenis_surat === 'NIB')[0].no_surat,
      }
    }
    loading.value = false
  }
  catch (error) {
    loading.value = false
    console.error('error : ', error)
  }
}

const handleSubmit = () => {
  props.onComplete()
  localStorage.setItem('pernyataanBebasBabiAgreement', true)
  agreed.value = true
}

onMounted(async () => {
  if (localStorage.getItem('pernyataanBebasBabiAgreement'))
    props.onComplete()
  getDetailData()
})
</script>

<template>
  <div v-if="loading">
    <VSkeletonLoader type="card" />
  </div>
  <div v-else>
    <VRow justify="center">
      <VCol cols="12">
        <VCard class="pa-5">
          <h2 class="text-h4 fs18 font-weight-bold mb-4">
            Pernyataan Bebas Babi
          </h2>
  
          <VCardText class="bgContent">
            <div class="text-center mb-4">
              <span
                class="text-h3 font-weight-bold"
                style="font-size: 40px !important;"
              >Pernyataan Bebas Babi</span>
            </div>
            <p class="fs18 py-2">
              Yang bertanda tangan dibawah ini:
            </p>
            <VRow>
              <VCol cols="4">
                <p class="text-h5 fs18 font-weight-bold">
                  Nama
                </p>
              </VCol>
              <VCol>
                <p class="fs18">
                  : <span>{{ penanggungJawabProfile.namaPenanggungJawab }}</span>
                </p>
              </VCol>
            </VRow>
            <VRow class="-mt30">
              <VCol cols="4">
                <p class="text-h5 fs18 font-weight-bold">
                  Jabatan
                </p>
              </VCol>
              <VCol>
                <p class="fs18">
                  : <span>{{ penanggungJawabProfile.jabatan }}</span>
                </p>
              </VCol>
            </VRow>
            <VRow class="-mt30">
              <VCol cols="4">
                <p class="text-h5 fs18 font-weight-bold">
                  NIB
                </p>
              </VCol>
              <VCol>
                <p class="fs18">
                  : <span>{{ penanggungJawabProfile.nib }}</span>
                </p>
              </VCol>
            </VRow>
            <VRow class="-mt30">
              <VCol cols="4">
                <p class="text-h5 fs18 font-weight-bold">
                  Perusahaan
                </p>
              </VCol>
              <VCol>
                <p class="fs18">
                  : <span>{{ penanggungJawabProfile.namaPerusahaan }}</span>
                </p>
              </VCol>
            </VRow>
            <div>
              <p class="fs18">
                Menyatakan bahwa perusahaan kami tidak menggunakan bahan, fasilitas, dan memproduksi produk yang mengandung babi dan turunannya yang bersifat najis dan bahan berbahaya.
              </p>
              <p class="fs18">
                Demikian surat ini dibuat dengan sebenar-benarnya untuk dapat digunakan dengan semestinya.
              </p>
            </div>
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
  </div>
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
  .-mt30 {
    margin-top: -30px;
  }
  .fs18 {
    font-size: 18px !important
  }
  </style>
