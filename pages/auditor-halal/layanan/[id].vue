<script setup lang="ts">
import { ref } from 'vue'
import { Bahan, Evaluasi, Produk } from '#components'

const route = useRoute()
const id = route.params.id

const activeTab = ref(-1)
const approveRequirements = ref(false)

const tabList = ref([
  'Data Pengajuan', 'Komitmen dan Tanggung Jawab', 'Bahan', 'Proses', 'Produk', 'Pemantauan dan Evaluasi', 'Dokumen',
])

const detailDataSerfikat = ref({})

// PROVIDE DETAIL DATA :
const getDetailData = async () => {
  try {
    const response: any = await $api('/reguler/pelaku-usaha/detail', {
      method: 'get',
      params: { id },
    })

    if (response?.code === 2000) {
      const certificateHalal = response?.data?.certificate_halal
      const responsibilityData = response?.data?.penanggung_jawab
      const aspectLegal = response?.data?.aspek_legal
      const factory = response?.data?.pabrik
      const outlet = response?.data?.outlet
      const penyelia = response?.data?.penyelia_halal

      requestCertificateData = [
        {
          title: 'Nama Perusahaan yang Tertera pada Sertifikat',
          value: certificateHalal.nama_pu || '',
          type: 'text',
          required: true,
          key: 'nama_pu',
        },
        {
          title: 'Nomor Surat Permohonan',
          value: certificateHalal.no_mohon || '',
          type: 'text',
          required: true,
          key: 'no_mohon',
        },
        {
          title: 'Tanggal Surat Pemohon',
          value: certificateHalal.tgl_mohon || '',
          type: 'text',
          required: true,
          key: 'tgl_mohon',
        },
        {
          title: 'Jenis Layanan',
          value: certificateHalal.jenis_layanan || '',
          type: 'select',
          disabled: false,
          required: true,
          key: 'jenis_layanan',
        },
        {
          title: 'Jenis Produk',
          value: certificateHalal.jenis_produk || '',
          type: 'select',
          disabled: false,
          required: true,
          key: 'jenis_produk',
        },
        {
          title: 'Merek Dagang',
          value: certificateHalal.merk_dagang || '',
          type: 'textarea',
          required: true,
          key: 'merk_dagang',
        },
        {
          title: 'Area Pemasaran',
          value: certificateHalal.area_pemasaran || '',
          type: 'select',
          disabled: false,
          required: true,
          key: 'area_pemasaran',
        },
        {
          title: 'LPH',
          value: certificateHalal.lembaga_pendamping || '',
          type: 'select',
          disabled: false,
          required: true,
          key: 'lembaga_pendamping',
        },
        {
          title: 'Jenis Pengajuan',
          value: certificateHalal.jenis_pengajuan || '',
          type: 'select',
          disabled: true,
          key: 'jenis_pengajuan',
        },
        {
          title: 'Jenis Pendaftaran',
          value: certificateHalal.jenis_produk || '',
          type: 'select',
          disabled: false,
          required: true,
        },
      ]

      responsibility = [
        {
          title: 'Jenis Badan Usaha',
          value: responsibilityData.nama_pj || '',
          type: 'text',
          required: false,
        },
        {
          title: 'Nomor Kontak',
          value: responsibilityData.nomor_kontak_pj || '',
          type: 'text',
          required: false,
        },
        {
          title: 'Email',
          value: responsibilityData.email_pj || '',
          type: 'text',
          required: false,
        },
      ]

      aspectLegalData = {
        label: [
          { title: 'No.', key: 'no', nowrap: true },
          { title: 'Jenis', key: 'jenis_surat', nowrap: true },
          { title: 'No. Dokumen', key: 'no_surat', nowrap: true },
          { title: 'Tanggal', key: 'tanggal_surat', nowrap: true },
          { title: 'Masa Berlaku', key: 'masa_berlaku', nowrap: true },
          { title: 'Instansi Penerbit', key: 'instansi_penerbit', nowrap: true },
          { title: 'Action', key: 'action', nowrap: true },
        ],
        value: aspectLegal,
      }

      factoryData = {
        label: [
          { title: 'No.', key: 'no', nowrap: true },
          { title: 'Nama', key: 'nama_pabrik', nowrap: true },
          { title: 'Alamat', key: 'alamat_pabrik', nowrap: true },
          { title: 'Status', key: 'status_milik', nowrap: true },
          { title: 'Action', value: 'action', sortable: false, nowrap: true },
        ],
        value: factory,
      }

      outletData.value = {
        label: [
          { title: 'No.', key: 'no', nowrap: true },
          { title: 'Nama', key: 'nama_outlet', nowrap: true },
          { title: 'Alamat', key: 'alamat_outlet', nowrap: true },
          { title: 'Status', key: 'status_milik', nowrap: true },
          { title: 'Action', value: 'action', sortable: false, nowrap: true },
        ],
        value: outlet,
      }

      halalData = {
        label: [
          { title: 'No.', key: 'no', nowrap: true },
          { title: 'Nama', key: 'penyelia_nama', nowrap: true },
          { title: 'Unduh SKPH', key: 'skph', nowrap: true },
          { title: 'Unduh SPPH', key: 'spph', nowrap: true },
          { title: 'Unduh KTP', key: 'ktp', nowrap: true },
          { title: 'No. KTP', key: 'no_ktp', nowrap: true },
          { title: 'Agama', key: 'religion', nowrap: true },
          { title: 'No/Tgl Sertif Penyelia Halal', key: 'tgl_penyelia_halal', nowrap: true },
          { title: 'Action', value: 'action', sortable: false, nowrap: true },
        ],
        value: penyelia,
      }
      detailDataSerfikat.value = {
        certificateHalal,
        responsibilityData,
        aspectLegal,
        factory,
        outlet,
        penyelia,
      }
    }
    else {
      useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
    }
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}

onMounted(async () => {
  activeTab.value = 0
  await getDetailData()
})


</script>

<template>
  <VContainer>
    <KembaliButton class="pl0" />
    <div class="headerSection">
      <h3 class="text-h3 font-weight-bold">
        Ubah Data
      </h3>
      <div v-if="activeTab === 4 || activeTab === 5 || activeTab === 6">
        <VRow>
          <VCol>
            <VBtn
              color="#E1442E"
              variant="outlined"
              style="border-color: #E1442E !important;"
            >
              Batal
            </VBtn>
          </VCol>
          <VCol>
            <VBtn variant="elevated">
              Simpan Perubahan
            </VBtn>
          </VCol>
        </VRow>
      </div>
    </div>
    <br>
    <VRow>
      <VCol
        cols="12"
        class="pl0"
      >
        <VTabs
          v-model="activeTab"
          align-tabs="start"
          class="w-100"
        >
          <VTab
            v-for="(item, index) in tabList"
            :key="item"
            :value="index"
          >
            {{ item }}
          </VTab>
        </VTabs>
      </VCol>
    </VRow>
    <br>
    <VTabsItems v-model="activeTab">
      <VTabItem>
        <div v-if="activeTab === 0">
          <PengajuanDataAuditor :list_factory="detailDataSerfikat?.factory" />
        </div>
        <div v-if="activeTab === 1">
          <div v-if="!approveRequirements">
            <KomitmenDanTanggungJawab :on-complete="() => approveRequirements = true" />
          </div>
          <div v-else>
            <ListKomitmenDanTanggungJawab />
          </div>
        </div>
        <div v-if="activeTab === 2">
          <Bahan />
        </div>
        <div v-if="activeTab === 3">
          <div v-if="!approveRequirements">
            <ProsesLayanan :on-complete="() => approveRequirements = true" />
          </div>
          <div v-else>
            <ListProses />
          </div>
        </div>
        <div v-if="activeTab === 4">
          <Produk />
        </div>
        <div v-if="activeTab === 5">
          <Evaluasi />
        </div>
        <div v-if="activeTab === 6">
          <DokumenTab />
        </div>
      </VTabItem>
    </VTabsItems>
  </VContainer>
</template>

<style lang="scss" scoped>
.required {
  color: red;
  font-size: 12px;
}
.pl0 {
  padding-left: 0px !important;
}
.headerSection {
  display: flex;
  justify-content: space-between
}
</style>
