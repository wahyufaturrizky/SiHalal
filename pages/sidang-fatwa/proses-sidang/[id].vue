<script setup lang="ts">
import HasilPemeriksaan from '@/components/sidangFatwa/HasilPemeriksaan.vue';

const route = useRoute()
const detailData = ref()
const loadingAll = ref(true)
const submissionId = (route.params as any).id

const loadItemById = async () => {
  try {
    const response: any = await $api(`/self-declare/komite-fatwa/proses-sidang/${submissionId}/detail`, {
      method: 'get',
    })

    if (response.code === 2000) {
      detailData.value = response.data

      console.log(response, 'ini response detail sidang')

      const { certificate_halal } = response.data || {};

      // const {
      //   status,
      //   jenis_daftar,
      //   nama_pu,
      //   kota_pu,
      //   prov_pu,
      //   alamat_pu,
      //   kode_pos_pu,
      //   negara_pu,
      //   no_telp,
      //   email,
      //   jenis_usaha,
      //   id_reg,
      //   tgl_permohonan,
      //   skala_usaha,
      // } = sertifikat_halal_reguler || {};

      // jenisUsaha.value = jenis_usaha;
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

onMounted(async () => {
  const res = await Promise.all([loadItemById()])

  const checkResIfUndefined = res.every((item: any) => {
    return item !== undefined
  })

  if (checkResIfUndefined)
    loadingAll.value = false
  else
    loadingAll.value = false
})
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
            :sertifikathalal="sertifikathalal"
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
