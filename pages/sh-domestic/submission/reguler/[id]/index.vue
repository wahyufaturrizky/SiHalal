<script setup lang="ts">
import { ref } from 'vue'

const route = useRoute()
const id = route?.params?.id
const panelSubmission = ref([0, 1])
const panelPic = ref([0, 1])
const panelAspectLegal = ref([0, 1])
const panelFactory = ref([0, 1])
const panelOutlet = ref([0, 1])
const panelSupervisor = ref([0, 1])
const panelDownloadFormulir = ref([0, 1])
const panelTracking = ref([0, 1])
const data = ref<any>({})
const loading = ref(false)

const aspectLegalHeader = [
  { title: 'No.', key: 'id_reg_legal', nowrap: true },
  { title: 'Jenis', key: 'jenis_surat', nowrap: true },
  { title: 'No. Dokumen', key: 'no_surat', nowrap: true },
  { title: 'Tanggal', key: 'tanggal_surat', nowrap: true },
  { title: 'Masa Berlaku', key: 'masa_berlaku', nowrap: true },
  { title: 'Instansi Penerbit', key: 'instansi_penerbit', nowrap: true },
]

const factoryHeader = [
  { title: 'No.', key: 'no', nowrap: true },
  { title: 'Nama', key: 'priceDetail', nowrap: true },
  { title: 'Alamat', key: 'total', nowrap: true },
]

const penyeliaHalalHeaders = [
  { title: 'No.', key: 'no', nowrap: true },
  { title: 'Nama', key: 'penyelia_nama', nowrap: true },
  { title: 'No. KTP', key: 'no_ktp', nowrap: true },
  { title: 'No. Kontak', key: 'no_kontak', nowrap: true },
  {
    title: 'No/Tgl Sertif Penyelia Halal',
    key: 'tgl_penyelia_halal',
    nowrap: true,
  },
  { title: 'No/Tgl SK', key: 'tanggal_sk', nowrap: true },
]

const getChipColor = (status: string) => {
  if (status === 'Draf')
    return 'primary'
  else if (status === 'Micre')
    return 'success'

  return 'success'
}

const getDetailData = async () => {
  try {
    loading.value = true

    const response: any = await $api('/reguler/pelaku-usaha/detail', {
      method: 'get',
      params: { id },
    })

    if (response?.code === 2000) {
      data.value = response.data
      loading.value = false
    }
    else {
      useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
      loading.value = false
    }
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
    loading.value = false
  }
}

const handleDownload = (type: string, url: string) => {
  if (type === 'STTD')
    window.open(url, '_blank')
}

onMounted(() => {
  getDetailData()
})

const navigateTo = (url: string) => {
  window.location.href = url
}
</script>

<template>
  <VContainer>
    <VRow>
      <KembaliButton />
    </VRow>
    <VRow class="d-flex justify-space-between align-center">
      <VCol class="">
        <h3 class="text-h3">
          Detail Audit Produk
        </h3>
      </VCol>
      <VCol cols="8">
        <VRow class="d-flex justify-end align-center ga-2">
          <VBtn
            variant="outlined"
            olor="#E1442E"
            class="delete-container"
          >
            <VIcon color="red">
              fa-trash
            </VIcon>
          </VBtn>
          <VBtn
            variant="outlined"
            append-icon="ri-edit-line"
            @click="navigateTo(`/sh-domestic/submission/reguler/${id}/edit`)"
          >
            Ubah Laporan
          </VBtn>
          <VBtn append-icon="fa-paper-plane"> Kirim </VBtn>
        </VRow>
      </VCol>
    </VRow>

    <VRow class="d-flex justify-space-between">
      <VCol cols="8">
        <VExpansionPanels v-model="panelSubmission">
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Pengajuan Sertifikasi Halal
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="No.ID"
              >
                {{ data?.certificate_halal?.no_daftar || "-" }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Tanggal"
              >
                {{ data?.certificate_halal?.tanggal_buat || "-" }}
              </InfoRow>
              <ThinLine :thickness="1" />
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="No. Surat Permohonan"
              >
                {{ data?.certificate_halal?.no_mohon || "-" }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Tanggal Permohonan"
              >
                {{ data?.certificate_halal?.tgl_mohon || "-" }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Jenis Layanan"
              >
                {{ data?.certificate_halal?.jenis_layanan || "-" }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Jenis Produk"
              >
                {{ data?.certificate_halal?.jenis_produk || "-" }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Merk Dagang"
              >
                {{ data?.certificate_halal?.merk_dagang || "-" }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Area Pemasaran"
              >
                {{ data?.certificate_halal?.area_pemasaran || "-" }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="LPH"
              >
                {{ data?.certificate_halal?.lembaga_pendamping || "-" }}
              </InfoRow>
              <ThinLine :thickness="1" />
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Nama Perusahaan"
              >
                {{ data?.certificate_halal?.nama_pu || "-" }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Nama Perusahaan tertera di SH"
              >
                {{ data?.certificate_halal?.nama_provinsi || "-" }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Nama KBLI"
              >
                {{ data?.certificate_halal?.nam_kbli || "-" }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Alamat"
              >
                {{ data?.certificate_halal?.alamat_pu || "-" }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Kota/Kab"
              >
                {{ data?.certificate_halal?.kota_pu || "-" }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Provinsi"
              >
                {{ data?.certificate_halal?.provinsi_pu || "-" }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Kode Pos"
              >
                {{ data?.certificate_halal?.kode_pos_pu || "-" }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Negara"
              >
                {{ data?.certificate_halal?.negara_pu || "-" }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Telepon"
              >
                {{ data?.certificate_halal?.telp_pu || "-" }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Email"
              >
                {{ data?.certificate_halal?.email || "-" }}
              </InfoRow>
              <ThinLine :thickness="1" />
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Jenis Badan Usaha"
              >
                {{ data?.certificate_halal?.jenis_badan_usaha || "-" }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Sekala Usaha"
              >
                {{ data?.certificate_halal?.skala_usaha || "-" }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Tingkat Usaha"
              >
                {{ data?.certificate_halal?.tingkat_usaha || "-" }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Modal Dasar"
              >
                {{ data?.certificate_halal?.modal_usaha || "-" }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Asal Usaha"
              >
                {{ data?.certificate_halal?.asal_usaha || "-" }}
              </InfoRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br>
        <VExpansionPanels v-model="panelPic">
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Penanggung Jawab
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Nama"
              >
                {{ data?.penanggung_jawab?.nama_pj || "-" }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Nomor Kontak"
              >
                {{ data?.penanggung_jawab?.nomor_kontak_pj || "-" }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Email"
              >
                {{ data?.penanggung_jawab?.email_pj || "-" }}
              </InfoRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br>
        <VExpansionPanels v-model="panelAspectLegal">
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Aspek Legal
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <VDataTable
                :headers="aspectLegalHeader"
                :items="data?.aspek_legal"
                class="border rounded"
                hide-default-footer
              >
                <template #item.productType="{ item }">
                  <div class="mw-170">
                    {{ item.productType }}
                  </div>
                </template>
                <template #item.productName="{ item }">
                  <div class="mw-170">
                    {{ item.productName }}
                  </div>
                </template>
                <template #item.id_reg_legal="{ index }">
                  <div class="mw-170">
                    {{ index + 1 }}
                  </div>
                </template>
              </VDataTable>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br>
        <VExpansionPanels v-model="panelFactory">
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Pabrik
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <VDataTable
                :headers="factoryHeader"
                :items="data?.pabrik"
                hide-default-footer
                class="border rounded"
              />
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br>
        <VExpansionPanels v-model="panelOutlet">
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Outlet
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <div
                class="border rounded w-100"
                style="justify-items: center"
              >
                <div
                  v-if="data?.outlet?.length === 0"
                  class="pt-2"
                >
                  <img
                    src="~/assets/images/empty-data.png"
                    alt="empty_data"
                  >
                  <div class="pt-2 pb-2 font-weight-bold">
                    Data Kosong
                  </div>
                </div>
              </div>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br>
        <VExpansionPanels v-model="panelSupervisor">
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Penyelia Halal
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <VDataTable
                :headers="penyeliaHalalHeaders"
                :items="data?.penyelia_halal"
                hide-default-footer
                class="border rounded"
              />
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
        <br>
        <VExpansionPanels v-model="panelOutlet">
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Daftar Nama Produk
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <div
                class="border rounded w-100"
                style="justify-items: center"
              >
                <div
                  v-if="data?.produk?.length === 0"
                  class="pt-2"
                >
                  <img
                    src="~/assets/images/empty-data.png"
                    alt="empty_data"
                  >
                  <div class="pt-2 pb-2 font-weight-bold">
                    Data Kosong
                  </div>
                </div>
              </div>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
      </VCol>
      <VCol
        cols="4"
        class="zero-padding"
      >
        <VExpansionPanels v-model="panelDownloadFormulir">
          <VExpansionPanel class="pa-5">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Formulir Unduhan
            </VExpansionPanelTitle>
            <VExpansionPanelText class="d-flex align-center">
              <VRow>
                <VCol cols="4">
                  STTD
                </VCol>
                <VCol cols="1">
                  :
                </VCol>
                <VCol cols="7">
                  <VBtn
                    icon="ri-download-fill"
                    class="rounded"
                    variant="flat"
                    density="compact"
                    @click="
                      () =>
                        handleDownload(
                          'STTD',
                          data?.certificate_halal?.url_sample_penyelia_sk,
                        )
                    "
                  />
                </VCol>
              </VRow>
              <VRow>
                <VCol cols="4">
                  Sertifikasi Halal
                </VCol>
                <VCol cols="1">
                  :
                </VCol>
                <VCol cols="7">
                  <VBtn
                    icon="ri-download-fill"
                    class="rounded"
                    variant="flat"
                    density="compact"
                  />
                </VCol>
              </VRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
        <br>
        <VExpansionPanels v-model="panelDownloadFormulir">
          <VExpansionPanel class="pa-5">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Pendaftaran
            </VExpansionPanelTitle>
            <VExpansionPanelText class="d-flex align-center">
              <InfoRow
                cols-name="4"
                cols-separator="1"
                cols-value="7"
                name="Nomor Daftar"
              >
                {{ data?.certificate_halal?.no_daftar || "-" }}
              </InfoRow>
              <InfoRow
                cols-name="4"
                cols-separator="1"
                cols-value="7"
                name="Tanggal"
              >
                {{ data?.certificate_halal?.tgl_daftar || "-" }}
              </InfoRow>
              <InfoRow
                cols-name="4"
                cols-separator="1"
                cols-value="7"
                name="Tempat Pendaftaran"
              >
                {{ data?.certificate_halal?.no_daftar || "-" }}
              </InfoRow>
              <InfoRow
                cols-name="4"
                cols-separator="1"
                cols-value="7"
                name="Jenis Daftar"
              >
                {{ data?.certificate_halal?.jenis_pengajuan || "-" }}
              </InfoRow>
              <InfoRow
                cols-name="4"
                cols-separator="1"
                cols-value="7"
                name="Status"
              >
                <VChip
                  :color="getChipColor(data?.certificate_halal?.status || '-')"
                  label
                  class="ma-1"
                >
                  {{ data?.certificate_halal?.status || "-" }}
                </VChip>
              </InfoRow>
              <InfoRow
                cols-name="4"
                cols-separator="1"
                cols-value="7"
                name="Channel"
              >
                {{ data?.certificate_halal?.channel || "-" }}
              </InfoRow>
              <InfoRow
                cols-name="4"
                cols-separator="1"
                cols-value="7"
                name="Fasilitator"
              >
                {{ data?.certificate_halal?.fasilitator_name || "-" }}
              </InfoRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
        <br>
        <VExpansionPanels v-model="panelDownloadFormulir">
          <VExpansionPanel class="pa-5">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Sertifikasi Halal
            </VExpansionPanelTitle>
            <VExpansionPanelText class="d-flex align-center">
              <InfoRow
                cols-name="4"
                cols-separator="1"
                cols-value="7"
                name="Nomor Sertifikat"
              >
                {{ data?.sertifikat_halal_info?.nomor_sertifikat || "-" }}
              </InfoRow>
              <InfoRow
                cols-name="4"
                cols-separator="1"
                cols-value="7"
                name="Tanggal Sertifikat"
              >
                {{ data?.sertifikat_halal_info?.tanggal_sertifikat || "-" }}
              </InfoRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
        <br>

        <br>
        <VExpansionPanels v-model="panelTracking">
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4">
              Melacak
            </VExpansionPanelTitle>
            <VExpansionPanelText class="d-flex align-center">
              <HalalTimeLine :event="data?.tracking" />
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
      </VCol>
    </VRow>
  </VContainer>
</template>

<style lang="scss" scoped>
.mw-170 {
  max-width: 170px;
  overflow: hidden;
  white-space: nowrap;
  text-wrap: wrap;
}
.delete-container {
  border-color: #e1442e !important;
}
.zero-padding {
  padding-right: 0px !important;
}
</style>
