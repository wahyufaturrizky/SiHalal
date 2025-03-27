<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const { t } = useI18n()

const route = useRoute()
const loading = ref(true)
const idReg = (route.params as any).id

const combinedNamaProduk = ref('')
const formattedBahan = ref('')
const formattedCleaning = ref('')
const formattedKemasan = ref('')
const sertifikatHalal = ref<Record<string, any>>({})
const penanggungJawab = ref<Record<string, any>>({})
const dataDukungBahan = ref<Array<Record<string, any>>>([])
const melacak = ref<Array<Record<string, any>>>([])
const dataPengajuan = ref<any>(null)
const dataPenanggungJawab = ref<any>(null)
const dataAspectLegal = ref<any>([])
const dataPabrik = ref<any>([])
const dataOutlet = ref<any>([])
const dataPenyelia = ref<any>([])
const dataNamaProduk = ref<any>([])
const dataPenetapan = ref<any>({})
const dataTracking = ref<any>([])
const fileUnduh = ref<any>({})
const phoneNumber = ref('')

const newDataSertifikatHalal = reactive({
  sertifikatHalal: {},
  penanggungJawab: {},
  dataDukungBahan: [],
  melacak: [],
  combinedNamaProduk: '',
  formattedBahan: '',
  formattedCleaning: '',
  formattedKemasan: '',
})

const loadItemById = async () => {
  try {
    const response: any = await $api(
      '/sidang-fatwa/task-force/detail-sidang',
      {
        method: 'get',
        query: {
          url: `api/v1/komisi-fatwa/proses-sidang-detail/${idReg}`,
        },
      },
    )

    if (response.code === 2000) {
      const { aspek_legal, data_pengajuan, outlet, pabrik, penanggung_jawab, penyelia_halal, produk, tracking, penetapan, no_hp } = response.data || {}

      dataPengajuan.value = data_pengajuan
      dataPenanggungJawab.value = penanggung_jawab
      dataAspectLegal.value = aspek_legal
      dataPabrik.value = pabrik
      dataOutlet.value = outlet
      dataPenyelia.value = penyelia_halal
      dataNamaProduk.value = produk
      dataPenetapan.value = penetapan
      dataTracking.value = tracking
      phoneNumber.value = no_hp

      return response
    }
    else {
      useSnackbar().sendSnackbar(response.errors.list_error.join(', '), 'error')
    }
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}

const getDownloadForm = async (docName: string) => {
  // surat-penyelia, laporan-pendamping, rekomendasi, surat-permohonan,surat-pernyataan, sttd, setifikasi-halal
  const result: any = await $api(
    `/self-declare/submission/${route.params?.id}/file`,
    {
      method: 'get',
      query: {
        document: docName,
      },
    },
  )

  if (result?.code === 2000) {
    fileUnduh.value.sttd = result?.data?.file

    return result?.data?.file
  }
}

onMounted(async () => {
  loading.value = true
  await Promise.allSettled([
    loadItemById(),
    getDownloadForm('sttd'),
  ])
  loading.value = false
})

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
    dataAspectLegal: dataAspectLegal.value,
  }),
  newData => {
    if (newData)
      Object.assign(newDataSertifikatHalal, newData)
  },
  { immediate: true, deep: true },
)
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
      <h2>{{ t('task-force.proses-sidang.detail.title') }}</h2>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="8">
      <VRow v-if="!loading">
        <VCol cols="12">
          <ProfilPendampinganFatwa
            v-if="Object.keys(newDataSertifikatHalal).length > 0"
            :sertifikat="newDataSertifikatHalal.sertifikatHalal"
            :bahan="newDataSertifikatHalal.formattedBahan"
            :cleaning="newDataSertifikatHalal.formattedCleaning"
            :kemasan="newDataSertifikatHalal.formattedKemasan"
            :produk="newDataSertifikatHalal.combinedNamaProduk"
            :penanggungjawab="newDataSertifikatHalal.penanggungJawab"
            :data="dataPengajuan"
          />
        </VCol>
      </VRow>
      <VRow v-if="!loading">
        <VCol cols="12">
          <PenanggungJawabFatwa
            v-if="Object.keys(newDataSertifikatHalal).length > 0"
            :sertifikat="newDataSertifikatHalal.sertifikatHalal"
            :bahan="newDataSertifikatHalal.formattedBahan"
            :cleaning="newDataSertifikatHalal.formattedCleaning"
            :kemasan="newDataSertifikatHalal.formattedKemasan"
            :produk="newDataSertifikatHalal.combinedNamaProduk"
            :penanggungjawab="newDataSertifikatHalal.penanggungJawab"
            :data="dataPenanggungJawab"
          />
        </VCol>
      </VRow>
      <VRow v-if="!loading">
        <VCol cols="12">
          <AspectLegalFatwa :data="newDataSertifikatHalal.dataAspectLegal" />
        </VCol>
      </VRow>
      <VRow v-if="!loading">
        <VCol cols="12">
          <PabrikFatwa :data="dataPabrik" />
        </VCol>
      </VRow>
      <VRow v-if="!loading">
        <VCol cols="12">
          <OutletFatwa :data="dataOutlet" />
        </VCol>
      </VRow>
      <VRow v-if="!loading">
        <VCol cols="12">
          <PenyeliaHalalFatwa :data="dataPenyelia" />
        </VCol>
      </VRow>
      <VRow v-if="!loading">
        <VCol cols="12">
          <NamaProdukFatwa :data="dataNamaProduk" />
        </VCol>
      </VRow>
    </VCol>
    <VCol cols="4">
      <VRow v-if="!loading">
        <VCol cols="12">
          <DokumenUnduhanFatwa
            :sertifikat="newDataSertifikatHalal.sertifikatHalal"
            :file-unduh="fileUnduh"
          />
        </VCol>
      </VRow>
      <VRow v-if="!loading">
        <VCol cols="12">
          <InformasiPenetapanFatwa
            :data="dataPenetapan"
            :data-pengajuan="dataPengajuan"
            :id-reg="idReg"
            :phoneNumber="phoneNumber"
            @refresh="loadItemById"
          />
        </VCol>
      </VRow>
      <VRow v-if="!loading">
        <VCol cols="12">
          <MelacakPendamping :tracking="dataTracking" />
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>
