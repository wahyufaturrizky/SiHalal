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

const dataAsal = ref([
  {
    label: 'No. Registrasi',
    value: '1',
  },
  {
    label: 'NIK (Nomor Induk Kependudukan)',
    value: '1',
  },
  {
    label: 'Nama',
    value: '1',
  },
  {
    label: 'Tempat Tanggal Lahir',
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
])

const lp3hDummy = ref([
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

const panelStatusDummy = ref([
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

onMounted(async () => {
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
          <DialogReturn
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
          </DialogReturn>
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
              <Lp3hTujuan :data="lp3hDummy" />
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
              <PanelStatusApproval :data="panelStatusDummy" />
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
        <br>
        <VExpansionPanels v-model="panelTracking">
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4">
              Melacak
            </VExpansionPanelTitle>
            <!--
              <VExpansionPanelText class="d-flex align-center">
              <HalalTimeLine
              :event="
              detailSubmission.tracking.map(
              ({ status, username, tanggal, comment, keterangan } : any) => ({
              status: statusItem[status].desc,
              created_at: formatDate(tanggal),
              username,
              comment,
              keterangan: (
              status === 'OF280' || status === 'OF290' || status === 'OF900' || status === 'OF285'
              ) ? keterangan : '',
              }),
              )
              "
              show-keterangan
              />
              </VExpansionPanelText>
            -->
          </VExpansionPanel>
        </VExpansionPanels>
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
