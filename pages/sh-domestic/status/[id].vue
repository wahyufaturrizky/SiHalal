<script setup lang="ts">
const route = useRoute()
const id = route?.params?.id

const snackbar = useSnackbar()

const panelSubmission = ref([0, 1])
const panelPic = ref([0, 1])
const panelAspectLegal = ref([0, 1])
const panelFactory = ref([0, 1])
const panelOutlet = ref([0, 1])
const panelPenyelia = ref([0, 1])
const panelProduct = ref([0, 1])
const panelRegistration = ref([0, 1])
const panelPayment = ref([0, 1])
const panelChecking = ref([0, 1])
const panelSidangFatwa = ref([0, 1])
const panelPengawasan = ref([0, 1])
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

const dataAspectLegal = ref({
  label: [
    { title: 'No.', key: 'no', nowrap: true },
    { title: 'Jenis', key: 'type', nowrap: true },
    { title: 'No. Dokumen', key: 'docNo', nowrap: true },
    { title: 'Tanggal', key: 'date', nowrap: true },
    { title: 'Masa Berlaku', key: 'expire', nowrap: true },
    { title: 'Instansi Penerbit', key: 'publishAgency', nowrap: true },
  ],
  value: [
    { no: 1, type: 'SIUP', docNo: '0123456789', date: '01/10/2024', expire: '09/10/2024', publishAgency: 'Testing' },
    { no: 2, type: 'NPWP', docNo: '1234567890', date: '-', expire: '-', publishAgency: 'Ditjen Pajak' },
    { no: 3, type: 'NIB', docNo: '2345678901', date: '01/09/2024', expire: '09/09/2024', publishAgency: 'BKPM' },
  ],
})

const dataFactory = ref({
  label: [
    { title: 'No.', key: 'no', nowrap: true },
    { title: 'Nama', key: 'name', nowrap: true },
    { title: 'Alamat', key: 'address', nowrap: true },
    { title: 'Status', key: 'status', nowrap: true },
  ],
  value: [
    { no: 1, name: 'My Drink Oke', address: 'Sumbawa Banget, RT002/RW002, Sumbang, Curio, Kab.Enrekang,', status: 'Milik Sendiri' },
  ],
})

const dataOutlet = ref({
  label: [
    { title: 'No.', key: 'no', nowrap: true },
    { title: 'Nama', key: 'name', nowrap: true },
    { title: 'Alamat', key: 'address', nowrap: true },
    { title: 'Status', key: 'status', nowrap: true },
  ],
  value: [
    { no: 1, name: 'My Drink Oke', address: 'Sumbawa Banget, RT002/RW002, Sumbang, Curio, Kab.Enrekang,', status: 'Milik Sendiri' },
  ],
})

const dataPenyelia = ref({
  label: [
    { title: 'No.', key: 'no', nowrap: true },
    { title: 'Nama', key: 'name', nowrap: true },
    { title: 'No. KTP', key: 'idNumber', nowrap: true },
    { title: 'No. Kontak', key: 'contactNo', nowrap: true },
    { title: 'No/Tgl Sertif Penyelia Halal', key: 'dateCertif', nowrap: true },
  ],
  value: [
    { no: 1, name: 'Maya', idNumber: '83628776293r6238976', contactNo: '081238365862', dateCertif: '09/10/2024' },
    { no: 2, name: 'Rahmi', idNumber: '83628776293r6238976', contactNo: '081238365862', dateCertif: '09/10/2024' },
  ],
})

const dataProduct = ref({
  label: [
    { title: 'No.', key: 'no', nowrap: true },
    { title: 'Layanan Produk', key: 'productService', nowrap: true },
    { title: 'Jenis Produk', key: 'productType', nowrap: true },
    { title: 'Kelas Produk', key: 'productClass', nowrap: true },
    { title: 'Rincian Produk', key: 'productDetail', nowrap: true },
    { title: 'Nama Produk', key: 'productName', nowrap: true },
    { title: 'Publikasi', key: 'publication', nowrap: true },
  ],
  value: [
    { no: 1, productService: 'Minuman', productType: 'Minuman', productClass: 'Kopi Campur', productDetail: 'Kopi Campur', productName: 'Maya' },
    { no: 2, productService: 'Makanan', productType: 'Makanan', productClass: 'Makanan', productDetail: 'Makanan', productName: 'Rahmi' },
  ],
})
</script>

<template>
  <VRow>
    <KembaliButton />
  </VRow>
  <div style="height: fit-content;">
    <VRow class="d-flex justify-space-between">
      <VCol>
        <h3 class="text-h3 font-weight-bold">
          Detail Pengajuan Sertifikasi
        </h3>
      </VCol>
    </VRow>

    <VRow>
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
                {{ detailSubmission.id }}
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
                name="No. Surat Permohonan"
              >
                {{ detailSubmission.requestNumber }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Tanggal Permohonan"
              >
                {{ detailSubmission.requestDate }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Jenis Layanan"
              >
                {{ detailSubmission.serviceType }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Jenis Produk"
              >
                {{ detailSubmission.productType }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Merek Dagang"
              >
                {{ detailSubmission.brand }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Area Pemasaran"
              >
                {{ detailSubmission.marketingArea }}
              </InfoRow>
              <ThinLine :thickness="1" />
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Nama Perusahaan"
              >
                {{ detailSubmission.companionInstitution }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Nama Perusahaan Tertera di SH"
              >
                {{ detailSubmission.companionInstitution }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Nama KBLI"
              >
                {{ detailSubmission.companionInstitution }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Alamat"
              >
                {{ detailSubmission.companionInstitution }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Kota/Kab"
              >
                {{ detailSubmission.companionInstitution }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Provinsi"
              >
                {{ detailSubmission.companionInstitution }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Kode Pos"
              >
                {{ detailSubmission.companionInstitution }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Negara"
              >
                {{ detailSubmission.companionInstitution }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Telepon"
              >
                {{ detailSubmission.companionInstitution }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Email"
              >
                {{ detailSubmission.companionInstitution }}
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
                {{ pic.name }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Nomor Kontak"
              >
                {{ pic.phoneNumber }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Email"
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
              Aspek Legal
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <TableDataShdn :data="dataAspectLegal" />
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br>
        <VExpansionPanels v-model="panelFactory">
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              <div
                class="d-flex"
                style="justify-content: space-between; width: 90%;"
              >
                <p>Pabrik</p>
                <div class="d-flex gap-4">
                  <VBtn variant="outlined">
                    Unduh
                  </VBtn>
                </div>
              </div>
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <TableDataShdn
                :data="dataFactory"
                with-download-button=""
              />
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br>
        <VExpansionPanels v-model="panelOutlet">
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              <div
                class="d-flex"
                style="justify-content: space-between; width: 90%;"
              >
                <p>Outlet</p>
                <div class="d-flex gap-4">
                  <VBtn variant="outlined">
                    Unduh
                  </VBtn>
                </div>
              </div>
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <TableDataShdn
                :data="dataOutlet"
                with-download-button=""
              />
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br>
        <VExpansionPanels v-model="panelPenyelia">
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              <div
                class="d-flex"
                style="justify-content: space-between; width: 90%;"
              >
                <p>Penyelia Halal</p>
                <div class="d-flex gap-4">
                  <VBtn variant="outlined">
                    Unduh
                  </VBtn>
                </div>
              </div>
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <TableDataShdn
                :data="dataPenyelia"
                with-download-button=""
              />
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br>
        <VExpansionPanels v-model="panelProduct">
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              <div
                class="d-flex"
                style="justify-content: space-between; width: 90%;"
              >
                <p>Daftar Nama Produk</p>
                <div class="d-flex gap-4">
                  <VBtn variant="outlined">
                    Unduh
                  </VBtn>
                </div>
              </div>
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <TableDataShdn
                :data="dataProduct"
                with-download-button=""
              />
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
      </VCol>
      <VCol cols="4">
        <VExpansionPanels v-model="panelRegistration">
          <VExpansionPanel class="pa-5">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Pendaftaran
            </VExpansionPanelTitle>
            <VExpansionPanelText class="d-flex align-center">
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="No Daftar"
              >
                {{ detailSubmission.id }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Tanggal"
              >
                {{ detailSubmission.id }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Jenis Daftar"
              >
                {{ detailSubmission.id }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Tempat Pendaftaran"
              >
                {{ detailSubmission.id }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Channel Pendaftaran"
              >
                {{ detailSubmission.id }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Status"
              >
                <div
                  style="border: 1ox; background-color: #F0E9F1; width: 50px; height: 32px;"
                  class="rounded d-flex justify-center"
                >
                  <label
                    class="pt-1"
                    style="color: #652672 !important;"
                  >Draft</label>
                </div>
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Fasilitator"
              >
                {{ detailSubmission.id }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Kode Fasilitator"
              >
                {{ detailSubmission.id }}
              </InfoRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
        <br>
        <VExpansionPanels v-model="panelPayment">
          <VExpansionPanel class="pa-5">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Sertifikat Halal
            </VExpansionPanelTitle>
            <VExpansionPanelText class="d-flex align-center">
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Nomor Sertifikat"
              >
                {{ detailSubmission.id }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Tanggal Sertifikat"
              >
                {{ detailSubmission.id }}
              </InfoRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
        <br>
        <VExpansionPanels v-model="panelChecking">
          <VExpansionPanel class="pa-5">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Pemeriksaan
            </VExpansionPanelTitle>
            <VExpansionPanelText class="d-flex align-center">
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="LPH"
              >
                {{ detailSubmission.id }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Tanggal Selesai LPH"
              >
                {{ detailSubmission.id }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Hasil"
              >
                {{ detailSubmission.id }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Dokumen"
              >
                {{ detailSubmission.id }}
              </InfoRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
        <br>
        <VExpansionPanels v-model="panelSidangFatwa">
          <VExpansionPanel class="pa-5">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Sidang Fatwa
            </VExpansionPanelTitle>
            <VExpansionPanelText class="d-flex align-center">
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="No. Penetapan"
              >
                {{ detailSubmission.id }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Tanggal Penetapan"
              >
                {{ detailSubmission.id }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Penetapan"
              >
                {{ detailSubmission.id }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Dokumen"
              >
                {{ detailSubmission.id }}
              </InfoRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

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
        <br>
        <VExpansionPanels v-model="panelPengawasan">
          <VExpansionPanel class="pa-5">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Pengawasan
            </VExpansionPanelTitle>
            <VExpansionPanelText class="d-flex align-center">
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Tanggal Pengawasan"
              >
                {{ detailSubmission.id }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Tanggal Pengawasan Selanjutnya"
              >
                {{ detailSubmission.id }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Keterangan"
              >
                {{ detailSubmission.id }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Hasil"
              >
                {{ detailSubmission.id }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Dokumen"
              >
                {{ detailSubmission.id }}
              </InfoRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
      </VCol>
    </VRow>
  </div>
</template>

<style lang="scss" scoped>
.mw-170 {
  max-width: 70px;
  overflow: hidden;
  white-space: nowrap;
  text-wrap: wrap;
}
</style>
