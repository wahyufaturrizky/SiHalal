<script setup lang="ts">
import HasilPemeriksaan from '@/components/sidangFatwa/HasilPemeriksaan.vue';

const route = useRoute()
const detailData = ref()
const loading = ref(true)
const submissionId = (route.params as any).id
const combinedNamaProduk = ref('')
const formattedBahan = ref('')
const formattedCleaning = ref('')
const formattedKemasan = ref('')
const sertifikatHalal = reactive({})
const penanggungJawab = ref({})

const loadItemById = async () => {
  try {
    const response: any = await $api(`/self-declare/komite-fatwa/proses-sidang/${submissionId}/detail`, {
      method: 'get',
    })

    if (response.code === 2000) {
      console.log(response.data, 'ini response detail sidang')

      const { certificate_halal, penanggung_jawab, produk, bahan } = response.data || {}

      const {
        no_daftar,
        status,
        jenis_daftar,
        nama_pu,
        kota_pu,
        jenis_layanan,
        jenis_produk,
        pendamping,
        tgl_daftar,
        lembaga_pendamping,
        alamat_pu,
      } = certificate_halal || {}

      const {
        nama_pj,
      } = penanggung_jawab || {}

      sertifikatHalal.value = certificate_halal

      penanggungJawab.value = penanggung_jawab

      combinedNamaProduk.value = produk.map((item: any, index: number) => `(${index + 1}) ${item.nama_bahan?.trim() ?? '-'}`).join(', ')

      formattedBahan.value = bahan.filter((item: any) => item.jenis_bahan === 'Bahan').map((item: any, index: number) => `(${index + 1}) ${item.nama_bahan?.trim() ?? '-'}`).join(', ')

      formattedCleaning.value = bahan.filter((item: any) => item.jenis_bahan === 'Cleaning Agent').map((item: any, index: number) => `(${index + 1}) ${item.nama_bahan?.trim() ?? '-'}`).join(', ')

      formattedKemasan.value = bahan.filter((item: any) => item.jenis_bahan === 'Kemasan').map((item: any, index: number) => `(${index + 1}) ${item.nama_bahan?.trim() ?? '-'}`).join(', ')

      console.log(sertifikatHalal.value, 'ini sertifikat halal')

      // skalaUsaha.value = skala_usaha;
      // trackingData.value = tracking;

      // profil.value = [
      //   {
      //     label: "Nomor ID",
      //     value: id_reg,
      //   },
      //   {
      //     label: "Tanggal Buat",
      //     value: formatDate(tgl_permohonan),
      //   },
      //   {
      //     label: "Status",
      //     value: status,
      //   },
      //   {
      //     label: "Jenis Pendaftaran",
      //     value: jenis_daftar,
      //   },
      //   {
      //     label: "Nama Perusahaan",
      //     value: nama_pu,
      //   },
      //   {
      //     label: "Alamat",
      //     value: alamat_pu,
      //   },
      //   {
      //     label: "Kota/Kab",
      //     value: kota_pu,
      //   },
      //   {
      //     label: "Provinsi",
      //     value: prov_pu,
      //   },
      //   {
      //     label: "Kode Pos",
      //     value: kode_pos_pu,
      //   },
      //   {
      //     label: "Negara",
      //     value: negara_pu,
      //   },
      //   {
      //     label: "Telepon",
      //     value: no_telp,
      //   },
      //   {
      //     label: "Email",
      //     value: email,
      //   },
      // ];

      return response
    }
    else {
      useSnackbar().sendSnackbar(
        response.errors.list_error.join(', '),
        'error',
      )
    }
  }
  catch (error) {
    console.log(error, 'ini')
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}

// onMounted(async () => {
//   loading.value = true

//   await loadItemById()

//   loading.value = false
// })

watch(
  () => sertifikatHalal,
  newData => {
    console.log(newData, 'newdata')
  },
  { immediate: true },
)

// await loadItemById()
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
      <VRow>
        <VCol cols="12">
          <ProfilPendampingan
            :sertifikat="sertifikatHalal"
            :bahan="formattedBahan"
            :cleaning="formattedCleaning"
            :kemasan="formattedKemasan"
            :produk="combinedNamaProduk"
            :penanggungjawab="penanggungJawab"
          />
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <DaftarNamaBahanPendampingan />
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <BiayaPemeriksaan />
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <JadwalAudit />
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <AuditorList />
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <HasilPemeriksaan />
        </VCol>
      </VRow>
    </VCol>
    <VCol cols="4">
      <VRow>
        <VCol cols="12">
          <PendaftaranPendamping />
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <MelacakPendamping />
        </VCol>
      </VRow>
      <RestPanelPendamping />
    </VCol>
  </VRow>
</template>
