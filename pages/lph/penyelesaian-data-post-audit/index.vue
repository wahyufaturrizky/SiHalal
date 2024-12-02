<script setup lang="ts">
import { ref } from 'vue'

const route = useRoute()
const id = route?.params?.id

const dialogToggle = ref(false)
const titleDialog = ref('')
const labelSaveBtn = ref('')
const inputValueReturn = ref('')

const snackbar = useSnackbar()

const panelSubmission = ref([0, 1])
const panelPic = ref([0, 1])
const panelAspectLegal = ref([0, 1])
const panelOutlet = ref([0, 1])
const panelSupervisor = ref([0, 1])
const panelDownloadFormulir = ref([0, 1])
const panelRegistration = ref([0, 1])
const panelPayment = ref([0, 1])
const panelTracking = ref([0, 1])

const detailSubmission = ref({
  id,
  date: '10/10/2024',
  requestNumber: '389392924',
  requestDate: 'Sumbawa Banget, RT002/RW002, Sumbang, Curio',
  serviceType: 'PNB',
  productType: 'Minuman',
  brand: '-',
  marketingArea: '-',
  companion: '-',
  companionInstitution: '-',
  kbli: 'Minuman',
  companyName: 'Kopi Susu Samsul',
  address: 'Sumbawa Banget, RT002/RW002, Sumbang, Curio',
  district: 'Kab. Enrekang',
  province: 'Sulawesi Selatan',
  zipCode: '-',
  country: 'Indonesia',
  phone: '081231123213',
  email: 'kopisususamsul@gmail.com',
  businessType: 'Lainnya',
  businessScale: 'Mikro',
  businessLevel: 'UMK',
  authorizedCapital: 'Rp. 5.000.000',
  businessOrigin: 'Domestik',
})

const pic = ref({
  name: 'Sumayah',
  phoneNumber: '0899999999',
  email: 'rasarasa@gmail.com',
})

const aspectLegalHeader = [
  { title: 'No.', key: 'no', nowrap: true },
  { title: 'Layanan Produk', key: 'productService', nowrap: true },
  { title: 'Jenis Produk', key: 'productType', nowrap: true },
  { title: 'Kelas Produk', key: 'productClass', nowrap: true },
  { title: 'Rincian Produk', key: 'productDetail', nowrap: true },
  { title: 'Nama Produk', key: 'productName', nowrap: true },
  { title: 'Publikasi', key: 'publication', nowrap: true },
]

const aspectLegalItems = ref([
  { no: 1, productService: 'Makanan', productType: 'Penyedia minuman dan makanan dengan pengolahan', productClass: 'Resto', productDetail: 'Makanan Mie', productName: 'Ramen Double Spicy lvl 2', publictaion: true },
  { no: 2, productService: 'Makanan', productType: 'Penyedia minuman dan makanan dengan pengolahan', productClass: 'Resto', productDetail: 'Makanan Mie', productName: 'Ramen Double Spicy lvl 2', publictaion: true },
  { no: 3, productService: 'Makanan', productType: 'Penyedia minuman dan makanan dengan pengolahan', productClass: 'Resto', productDetail: 'Makanan Mie', productName: 'Ramen Double Spicy lvl 2', publictaion: true },
  { no: 4, productService: 'Makanan', productType: 'Penyedia minuman dan makanan dengan pengolahan', productClass: 'Resto', productDetail: 'Makanan Mie', productName: 'Ramen Double Spicy lvl 2', publictaion: true },
  { no: 5, productService: 'Makanan', productType: 'Penyedia minuman dan makanan dengan pengolahan', productClass: 'Resto', productDetail: 'Makanan Mie', productName: 'Ramen Double Spicy lvl 2', publictaion: true },
  { no: 6, productService: 'Makanan', productType: 'Penyedia minuman dan makanan dengan pengolahan', productClass: 'Resto', productDetail: 'Makanan Mie', productName: 'Ramen Double Spicy lvl 2', publictaion: true },
  { no: 7, productService: 'Makanan', productType: 'Penyedia minuman dan makanan dengan pengolahan', productClass: 'Resto', productDetail: 'Makanan Mie', productName: 'Ramen Double Spicy lvl 2', publictaion: true },
  { no: 8, productService: 'Makanan', productType: 'Penyedia minuman dan makanan dengan pengolahan', productClass: 'Resto', productDetail: 'Makanan Mie', productName: 'Ramen Double Spicy lvl 2', publictaion: true },
  { no: 9, productService: 'Makanan', productType: 'Penyedia minuman dan makanan dengan pengolahan', productClass: 'Resto', productDetail: 'Makanan Mie', productName: 'Ramen Double Spicy lvl 2', publictaion: true },
  { no: 10, productService: 'Makanan', productType: 'Penyedia minuman dan makanan dengan pengolahan', productClass: 'Resto', productDetail: 'Makanan Mie', productName: 'Ramen Double Spicy lvl 2', publictaion: true },
  { no: 11, productService: 'Makanan', productType: 'Penyedia minuman dan makanan dengan pengolahan', productClass: 'Resto', productDetail: 'Makanan Mie', productName: 'Ramen Double Spicy lvl 2', publictaion: true },
])

const supervisorHeader = [
  { title: 'No.', key: 'no', nowrap: true },
  { title: 'Nama', key: 'name', nowrap: true },
  { title: 'Tanggal Lahir', key: 'birthdate', nowrap: true },
  { title: 'JK', key: 'gender', nowrap: true },
  { title: 'No. Pendaftaran', key: 'registrationNo', nowrap: true },
]

const supervisorItems = ref([
  { no: 1, name: 'Maya', birthdate: '20/10/2000', gender: '-', registrationNo: 'REG RI AHA 10102134' },
  { no: 2, name: 'Bambang', birthdate: '20/10/2000', gender: '-', registrationNo: 'REG RI AHA 10102134' },
])

const updateKbli = () => {
  snackbar.sendSnackbar('KBLI Successfully Updated', 'success')
}

const toggle = (type: string) => {
  dialogToggle.value = true
  titleDialog.value = type === 'add' ? 'Mengirim Pengajuan' : 'Pengembalian Dokumen'
  labelSaveBtn.value = type === 'add' ? 'Ya, Kirim' : 'Kembalikan'
}
</script>

<template>
  <DialogWithAction
    :title="titleDialog"
    :is-open="dialogToggle"
    :toggle="() => dialogToggle = false"
    :on-save="() => dialogToggle = false"
    :label-save-btn="labelSaveBtn"
  >
    <template #content>
      <div v-if="titleDialog === 'Mengirim Pengajuan'">
        <p>Pastikan dokumen persyaratan lengkap dan semua biaya pemeriksaan sudah dimasukkan</p>
      </div>
      <div v-else>
        <label>Masukan Keterangan Pengembalian (Max. 1000 Karakter)</label>
        <VTextarea
          v-model="inputValueReturn"
          placeholder="Masukkan keterangan pengembalian"
          clearable
          auto-grow
          dense
          outlined
          :style="{ maxWidth: '100%' }"
        />
      </div>
    </template>
  </DialogWithAction>
  <VContainer>
    <VRow>
      <KembaliButton />
    </VRow>
    <VRow class="d-flex justify-space-between align-center">
      <VCol class="">
        <h3 class="text-h3 font-weight-bold">
          Detail Post Audit
        </h3>
      </VCol>
      <VCol cols="8">
        <VRow class="d-flex justify-end align-center ga-2">
          <VBtn
            variant="outlined"
            color="#E1442E"
            style="border-color: #E1442E;"
            @click="() => toggle('return')"
          >
            Pengembalian
          </VBtn>
          <VBtn variant="outlined">
            Lihat Draft Sertif
          </VBtn>
          <VBtn variant="outlined">
            Cetak Data
          </VBtn>
          <VBtn @click="() => toggle('add')">
            Kirim
          </VBtn>
        </VRow>
      </VCol>
    </VRow>

    <VRow class="d-flex justify-space-between">
      <VCol cols="8">
        <VExpansionPanels v-model="panelSubmission">
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Data Pengajuan
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="No.ID"
              >
                {{ detailSubmission.id }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Status"
              >
                {{ detailSubmission.date }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Tanggal"
              >
                {{ detailSubmission.date }}
              </InfoRow>
              <ThinLine :thickness="1" />
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Nama Perusahaan"
              >
                {{ detailSubmission.requestNumber }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Alamat"
              >
                {{ detailSubmission.requestDate }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Kota/Kab"
              >
                {{ detailSubmission.serviceType }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Provinsi"
              >
                {{ detailSubmission.productType }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Kode Pos"
              >
                {{ detailSubmission.brand }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Negara"
              >
                {{ detailSubmission.marketingArea }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Telepon"
              >
                {{ detailSubmission.companion }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Email"
              >
                {{ detailSubmission.companionInstitution }}
              </InfoRow>
              <ThinLine :thickness="1" />
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Jenis Badan Usaha"
              >
                {{ detailSubmission.companionInstitution }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Skala Usaha"
                class="d-flex align-center"
              >
                <VRow class="d-flex align-center">
                  <VCol cols="8">
                    <VSelect
                      v-model="detailSubmission.K"
                      :items="['Minuman', 'Makanan']"
                      label="Choose an option"
                      outlined
                    />
                  </VCol>
                  <VCol cols="4">
                    <VBtn
                      variant="outlined"
                      @click="updateKbli"
                    >
                      Update
                    </VBtn>
                  </VCol>
                </VRow>
              </InfoRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br>
        <VExpansionPanels v-model="panelPic">
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Pengajuan Sertifikasi
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="No / Tanggal Permohonan"
              >
                {{ pic.name }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Jenis Layanan"
              >
                {{ pic.phoneNumber }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Jenis Pengajuan"
              >
                {{ pic.email }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Jenis Produk"
              >
                {{ pic.email }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Merek Dagang"
              >
                {{ pic.email }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Area Pemasaran"
              >
                {{ pic.email }}
              </InfoRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br>
        <VExpansionPanels v-model="panelAspectLegal">
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Daftar Nama Produk
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <VDataTable
                :headers="aspectLegalHeader"
                :items="aspectLegalItems"
                class="border rounded"
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
                <template #item.publication="{ item }">
                  <VCheckbox true-value="true" />
                </template>
              </VDataTable>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br>
        <VExpansionPanels v-model="panelOutlet">
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Jadwal Audit
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Tanggal Mulai"
              >
                {{ detailSubmission.companionInstitution }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Tanggal Selesai"
              >
                {{ detailSubmission.companionInstitution }}
              </InfoRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br>
        <VExpansionPanels v-model="panelSupervisor">
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Auditor
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <VDataTable
                :headers="supervisorHeader"
                :items="supervisorItems"
                hide-default-footer=""
                class="border rounded"
              />
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
        <br>
        <VExpansionPanels v-model="panelOutlet">
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Hasil Pemeriksaan
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Tanggal Selesai LPH"
              >
                {{ detailSubmission.companionInstitution }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Hasil"
              >
                {{ detailSubmission.companionInstitution }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Dokumen"
              >
                {{ detailSubmission.companionInstitution }}
              </InfoRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
      </VCol>
      <VCol
        cols="4"
        class="pr-0"
      >
        <VExpansionPanels v-model="panelDownloadFormulir">
          <VExpansionPanel class="pa-5">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Dokumen Unduhan
            </VExpansionPanelTitle>
            <VExpansionPanelText class="d-flex align-center">
              <InfoRow
                cols-name="8"
                cols-separator="1"
                cols-value="3"
                name="Hasil Unduhan"
              >
                <VBtn
                  append-icon="fa-download"
                  variant="plain"
                  style="align-content: start;"
                />
              </InfoRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
        <br>
        <VExpansionPanels v-model="panelRegistration">
          <VExpansionPanel class="pa-5">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              No. Pendaftaran
            </VExpansionPanelTitle>
            <VExpansionPanelText class="d-flex align-center">
              <p class="font-weight-bold text-black">
                SH2023-1-582897
              </p>
              <p class="font-weight-bold text-black">
                13/10/2024
              </p>
              <p class="font-weight-bold text-black">
                Jawa Tengah
              </p>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
        <br>
        <VExpansionPanels v-model="panelPayment">
          <VExpansionPanel class="pa-5">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Biaya Pemeriksaan
            </VExpansionPanelTitle>
            <VExpansionPanelText class="d-flex align-center">
              <p class="font-weight-bold text-black">
                Rp 7.000.000
              </p>
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
              <HalalTimeLine
                :event="[
                  { status: 'Draft PU', created_at: '2024/10/05', username: 'Samsul' }]"
              />
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
</style>
