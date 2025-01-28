<script setup lang="ts">
import { ref } from 'vue'

const route = useRoute()
const id = (route?.params as any)?.id

const dialogToggle = ref(false)
const titleDialog = ref('')
const labelSaveBtn = ref('')
const returnNote = ref('')

const loadingAll = ref(false)

const panelDataAsal = ref([0, 1])
const panelLp3hTujuan = ref([0, 1])
const panelStatus = ref([0, 1])
const panelTracking = ref([0, 1])

const dataAsal = ref([])

const lp3hDestination = ref([
  {
    label: 'No. Surat',
    value: '1',
  },
  {
    label: 'Tanggal Surat',
    value: '1',
  },
  {
    label: 'Alamat',
    value: '1',
  },
  {
    label: 'Provinsi',
    value: '1',
  },
  {
    label: 'Kab/Kota',
    value: '1',
  },
  {
    label: 'Kecamatan',
    value: '1',
  },
  {
    label: 'Kode Pos',
    value: '1',
  },
  {
    label: 'Upload Surat',
    value: '1',
  },
])

const statusData = ref([
  {
    label: 'Status',
    value: 'Pengajuan',
  },
  {
    label: 'Catatan',
    value: '-',
  },
])

const toggle = (type: string) => {
  dialogToggle.value = true
  titleDialog.value
    = type === 'add' ? 'Mengirim Pengajuan' : 'Pengembalian Dokumen'
  labelSaveBtn.value = type === 'add' ? 'Ya, Kirim' : 'Kembalikan'
}

const onApprove = () => {
  useSnackbar().sendSnackbar('Pengajuan pindah domisili disetujui', 'success')
}

const onReturn = () => {
  useSnackbar().sendSnackbar('Pengajuan pindah domisili dikembalikan', 'success')
}

const handleGetDetail = async () => {
  try {
    const response: any = await $api('/approval/domisili-lp3h/detail', {
      method: 'get',
      query: {
        id,
      },
    } as any)

    if (response.code === 2000) {
      const data: any = response.data

      dataAsal.value = [
        {
          label: 'No. Registrasi',
          value: data.no_register,
        },
        {
          label: 'NIK (Nomor Induk Kependudukan)',
          value: data.nik,
        },
        {
          label: 'Nama',
          value: data.nama,
        },
        {
          label: 'Tempat Tanggal Lahir',
          value: `${data.tempat_lahir} ${formatDateId(data?.tgl_lahir)}`,
        },
        {
          label: 'Alamat',
          value: data?.alamat_asal,
        },
        {
          label: 'Provinsi',
          value: data?.asal_provinsi,
        },
        {
          label: 'Kab/Kota',
          value: data?.asal_kabupaten,
        },
        {
          label: 'Kecamatan',
          value: data?.asal_kecamatan,
        },
        {
          label: 'Kode Pos',
          value: data?.asal_kodepos,
        },
      ]
      lp3hDestination.value = [
        {
          label: 'No. Surat',
          value: data?.no_surat,
        },
        {
          label: 'Tanggal Surat',
          value: data?.tgl_surat,
        },
        {
          label: 'Alamat',
          value: data?.alamat_tujuan,
        },
        {
          label: 'Provinsi',
          value: data?.tujuan_provinsi,
        },
        {
          label: 'Kab/Kota',
          value: data?.tujuan_kabupaten,
        },
        {
          label: 'Kecamatan',
          value: data?.tujuan_kecamatan,
        },
        {
          label: 'Kode Pos',
          value: data?.tujuan_kodepos,
        },
        {
          label: 'Upload Surat',
          value: data?.file_surat,
        },
      ]
      statusData.value = [
        {
          label: 'Status',
          value: data?.status,
        },
        {
          label: 'Catatan',
          value: data?.catatan,
        },
      ]

      return response
    }
  }
  catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  handleGetDetail()
})
</script>

<template>
  <VContainer v-if="!loadingAll">
    <VRow>
      <KembaliButton />
    </VRow>
    <VRow class="d-flex justify-space-between w-100">
      <VCol sm="7">
        <h3 class="text-h3 font-weight-bold align-center">
          Detail Persetujuan Pindah Domisili P3H
        </h3>
      </VCol>
      <VCol
        cols="5"
        style="align-content: center;"
      >
        <VRow
          class="d-flex justify-end align-center ga-2"
          style="margin-right: 0px;"
        >
          <!-- <VBtn variant="outlined"> Lihat Draft Sertif </VBtn> -->
          <!-- <DialogReturn
            title="Dikembalikan"
            button-text="Ya, Kembalikan"
            :on-return="onReturn"
          >
            <template #contentDelete>
              <label>
                Catatan Pengembalian
              </label>
              <VTextarea v-model="returnNote" />
            </template>
          </DialogReturn> -->
          <DialogApproval
            title="Pindah Domisili Disetujui"
            button-text="Ya, Setujui"
            :on-approve="onApprove"
          >
            <template #contentDelete>
              Pastikan semua data sudah terisi dengan benar
            </template>
          </DialogApproval>
        </VRow>
      </VCol>
    </VRow>

    <VRow class="d-flex justify-space-between w-100">
      <VCol cols="8">
        <VExpansionPanels v-model="panelDataAsal">
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Data Asal P3H
            </VExpansionPanelTitle>

            <VExpansionPanelText>
              <DataAsalP3h :data="dataAsal" />
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
        <br>
        <VExpansionPanels v-model="panelLp3hTujuan">
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              LP3H Tujuan
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <Lp3hTujuan :data="lp3hDestination" />
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
      </VCol>
      <VCol sm="4">
        <VExpansionPanels v-model="panelStatus">
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4">
              Status
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <PanelStatusApproval :data="statusData" />
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
        <br>
        <!-- <VExpansionPanels v-model="panelTracking">
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4">
              Melacak
            </VExpansionPanelTitle>
          </VExpansionPanel>
        </VExpansionPanels> -->
      </VCol>
    </VRow>
  </VContainer>

  <VSkeletonLoader
    v-else
    type="table-heading, list-item-two-line, image, table-tfoot"
  />
</template>

<style lang="scss" scoped>
.mw-170 {
  max-width: 170px;
  overflow: hidden;
  white-space: nowrap;
  text-wrap: wrap;
}
</style>
