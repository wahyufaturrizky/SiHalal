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
          <VBtn variant="outlined" append-icon="ri-edit-line">Ubah Data</VBtn>
          <VBtn @click="navigateTo(`/audit-pengajuan/ubah-laporan/${id}`)" variant="outlined" append-icon="ri-edit-line">Ubah Laporan</VBtn>
          <VBtn append-icon="fa-paper-plane">Kirim</VBtn>
        </VRow>
      </VCol>
    </VRow>

    <VRow class="d-flex justify-space-between">
      <VCol cols="8">
        <VExpansionPanels
          v-model="panelSubmission"
        >
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">Data Pengajuan</VExpansionPanelTitle>
            <VExpansionPanelText>
              <InfoRow colsName="5" colsSeparator="1" colsValue="6" name="No.ID">{{detailSubmission.id}}</InfoRow>
              <InfoRow colsName="5" colsSeparator="1" colsValue="6" name="Status">{{detailSubmission.date}}</InfoRow>
              <InfoRow colsName="5" colsSeparator="1" colsValue="6" name="Tanggal">{{detailSubmission.date}}</InfoRow>
              <ThinLine :thickness=1 />
              <InfoRow colsName="5" colsSeparator="1" colsValue="6" name="Nama Perusahaan">{{detailSubmission.requestNumber}}</InfoRow>
              <InfoRow colsName="5" colsSeparator="1" colsValue="6" name="Alamat">{{detailSubmission.requestDate}}</InfoRow>
              <InfoRow colsName="5" colsSeparator="1" colsValue="6" name="Kota/Kab">{{detailSubmission.serviceType}}</InfoRow>
              <InfoRow colsName="5" colsSeparator="1" colsValue="6" name="Provinsi">{{detailSubmission.productType}}</InfoRow>
              <InfoRow colsName="5" colsSeparator="1" colsValue="6" name="Kode Pos">{{detailSubmission.brand}}</InfoRow>
              <InfoRow colsName="5" colsSeparator="1" colsValue="6" name="Negara">{{detailSubmission.marketingArea}}</InfoRow>
              <InfoRow colsName="5" colsSeparator="1" colsValue="6" name="Telepon">{{detailSubmission.companion}}</InfoRow>
              <InfoRow colsName="5" colsSeparator="1" colsValue="6" name="Email">{{detailSubmission.companionInstitution}}</InfoRow>
              <ThinLine :thickness=1 />
              <InfoRow colsName="5" colsSeparator="1" colsValue="6" name="Jenis Badan Usaha">{{detailSubmission.companionInstitution}}</InfoRow>
              <InfoRow colsName="5" colsSeparator="1" colsValue="6" name="Skala Usaha" class="d-flex align-center">
                <VRow class="d-flex align-center">
                  <VCol cols="8">
                    <VSelect
                      v-model="detailSubmission.K"
                      :items="['Minuman','Makanan']"
                      label="Choose an option"
                      outlined
                    ></VSelect>
                  </VCol>
                  <VCol cols="4">
                    <VBtn variant="outlined" @click="updateKbli">
                    Update
                    </VBtn>
                  </VCol>
                </VRow>
              </InfoRow>
            </VExpansionPanelText>
          </VExpansionPanel>

        </VExpansionPanels>

        <br>
        <VExpansionPanels
          v-model="panelPic"
        >
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">Pengajuan Sertifikasi</VExpansionPanelTitle>
            <VExpansionPanelText>
              <InfoRow colsName="5" colsSeparator="1" colsValue="6" name="No / Tanggal Permohonan">{{pic.name}}</InfoRow>
              <InfoRow colsName="5" colsSeparator="1" colsValue="6" name="Jenis Layanan">{{pic.phoneNumber}}</InfoRow>
              <InfoRow colsName="5" colsSeparator="1" colsValue="6" name="Jenis Pengajuan">{{pic.email}}</InfoRow>
              <InfoRow colsName="5" colsSeparator="1" colsValue="6" name="Jenis Produk">{{pic.email}}</InfoRow>
              <InfoRow colsName="5" colsSeparator="1" colsValue="6" name="Merek Dagang">{{pic.email}}</InfoRow>
              <InfoRow colsName="5" colsSeparator="1" colsValue="6" name="Area Pemasaran">{{pic.email}}</InfoRow>
            </VExpansionPanelText>
          </VExpansionPanel>

        </VExpansionPanels>

        <br>
        <VExpansionPanels
          v-model="panelAspectLegal"
        >
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">Daftar Nama Produk</VExpansionPanelTitle>
            <VExpansionPanelText>
              <VDataTable :headers="aspectLegalHeader" :items="aspectLegalItems">
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
        <VExpansionPanels
          v-model="panelFactory"
        >
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">Biaya Pemeriksaan</VExpansionPanelTitle>
            <VExpansionPanelText>
              <VDataTable :headers="factoryHeader" :items="factoryItems">
              </VDataTable>
            </VExpansionPanelText>
          </VExpansionPanel>

        </VExpansionPanels>

        <br>
        <VExpansionPanels
          v-model="panelOutlet"
        >
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">Jadwal Audit</VExpansionPanelTitle>
            <VExpansionPanelText>
              <InfoRow colsName="5" colsSeparator="1" colsValue="6" name="Tanggal Mulai">{{detailSubmission.companionInstitution}}</InfoRow>
              <InfoRow colsName="5" colsSeparator="1" colsValue="6" name="Tanggal Selesai">{{detailSubmission.companionInstitution}}</InfoRow>
            </VExpansionPanelText>
          </VExpansionPanel>

        </VExpansionPanels>

        <br>
        <VExpansionPanels
          v-model="panelSupervisor"
        >
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">Auditor</VExpansionPanelTitle>
            <VExpansionPanelText>
              <VDataTable :headers="supervisorHeader" :items="supervisorItems">
              </VDataTable>
            </VExpansionPanelText>
          </VExpansionPanel>

        </VExpansionPanels>
        <br>
        <VExpansionPanels
          v-model="panelOutlet"
        >
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">Hasil Pemeriksaan</VExpansionPanelTitle>
            <VExpansionPanelText>
              <InfoRow colsName="5" colsSeparator="1" colsValue="6" name="Tanggal Selesai LPH">{{detailSubmission.companionInstitution}}</InfoRow>
              <InfoRow colsName="5" colsSeparator="1" colsValue="6" name="Hasil">{{detailSubmission.companionInstitution}}</InfoRow>
              <InfoRow colsName="5" colsSeparator="1" colsValue="6" name="Dokumen">{{detailSubmission.companionInstitution}}</InfoRow>
            </VExpansionPanelText>
          </VExpansionPanel>

        </VExpansionPanels>
      </VCol>
      <VCol cols="4" class="pr-0">
        <VExpansionPanels
          v-model="panelDownloadFormulir"
        >
          <VExpansionPanel class="pa-5">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">No. Pendaftaran</VExpansionPanelTitle>
            <VExpansionPanelText class="d-flex align-center">
              <p class="font-weight-bold text-black">SH2023-1-582897</p>
              <p class="font-weight-bold text-black">13/10/2024</p>
              <p class="font-weight-bold text-black">Jawa Tengah</p>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
        <br />
        <VExpansionPanels
          v-model="panelDownloadFormulir"
        >
          <VExpansionPanel class="pa-5">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">Biaya Pemeriksaan</VExpansionPanelTitle>
            <VExpansionPanelText class="d-flex align-center">
              <p class="font-weight-bold text-black">Rp 7.000.000</p>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
        <br />

        <br />
        <VExpansionPanels
          v-model="panelTracking"
        >
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4">Melacak</VExpansionPanelTitle>
            <VExpansionPanelText class="d-flex align-center">
              <HalalTimeLine :event="[
                             { status: 'Draft PU', created_at: '2024/10/05', username: 'Samsul' },]"/>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
      </VCol>
    </VRow>

  </VContainer>
</template>

<script setup lang="ts">

const route = useRoute()
const id = route.params.id

const snackbar = useSnackbar()

const panelSubmission = ref([0, 1])
const panelPic = ref([0, 1])
const panelAspectLegal = ref([0, 1])
const panelFactory = ref([0,1])
const panelOutlet = ref([0,1])
const panelSupervisor = ref([0,1])
const panelSubstance = ref([0,1])
const panelProduct = ref([0,1])
const panelProductionProcess = ref([0,1])
const panelDownloadFormulir =  ref([0,1])
const panelRegistration = ref([0,1])
const panelFatwaHearing = ref([0,1])
const panelHalalCertificate = ref([0,1])
const panelTracking = ref([0,1])

const detailSubmission = ref({
  id: id,
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
  businessOrigin: 'Domestik'
})

const pic = ref({
  name: 'Sumayah',
  phoneNumber: '0899999999',
  email: 'rasarasa@gmail.com'
})


const aspectLegalHeader = [
  {title : 'No.', key: 'no', nowrap:true},
  {title : 'Layanan Produk', key: 'productService', nowrap:true},
  {title : 'Jenis Produk', key: 'productType', nowrap:true},
  {title : 'Kelas Produk', key: 'productClass', nowrap:true},
  {title : 'Rincian Produk', key: 'productDetail', nowrap:true},
  {title : 'Nama Produk', key: 'productName', nowrap:true},
  {title : 'Publikasi', key: 'publication', nowrap:true},
]

const aspectLegalItems = ref([
  {no: 1, productService : 'Makanan', productType: 'Penyedia minuman dan makanan dengan pengolahan', productClass: 'Resto', productDetail: 'Makanan Mie', productName: 'Ramen Double Spicy lvl 2', publictaion: true},
  {no: 2, productService : 'Makanan', productType: 'Penyedia minuman dan makanan dengan pengolahan', productClass: 'Resto', productDetail: 'Makanan Mie', productName: 'Ramen Double Spicy lvl 2', publictaion: true},
  {no: 3, productService : 'Makanan', productType: 'Penyedia minuman dan makanan dengan pengolahan', productClass: 'Resto', productDetail: 'Makanan Mie', productName: 'Ramen Double Spicy lvl 2', publictaion: true},
  {no: 4, productService : 'Makanan', productType: 'Penyedia minuman dan makanan dengan pengolahan', productClass: 'Resto', productDetail: 'Makanan Mie', productName: 'Ramen Double Spicy lvl 2', publictaion: true},
  {no: 5, productService : 'Makanan', productType: 'Penyedia minuman dan makanan dengan pengolahan', productClass: 'Resto', productDetail: 'Makanan Mie', productName: 'Ramen Double Spicy lvl 2', publictaion: true},
  {no: 6, productService : 'Makanan', productType: 'Penyedia minuman dan makanan dengan pengolahan', productClass: 'Resto', productDetail: 'Makanan Mie', productName: 'Ramen Double Spicy lvl 2', publictaion: true},
  {no: 7, productService : 'Makanan', productType: 'Penyedia minuman dan makanan dengan pengolahan', productClass: 'Resto', productDetail: 'Makanan Mie', productName: 'Ramen Double Spicy lvl 2', publictaion: true},
  {no: 8, productService : 'Makanan', productType: 'Penyedia minuman dan makanan dengan pengolahan', productClass: 'Resto', productDetail: 'Makanan Mie', productName: 'Ramen Double Spicy lvl 2', publictaion: true},
  {no: 9, productService : 'Makanan', productType: 'Penyedia minuman dan makanan dengan pengolahan', productClass: 'Resto', productDetail: 'Makanan Mie', productName: 'Ramen Double Spicy lvl 2', publictaion: true},
  {no: 10, productService : 'Makanan', productType: 'Penyedia minuman dan makanan dengan pengolahan', productClass: 'Resto', productDetail: 'Makanan Mie', productName: 'Ramen Double Spicy lvl 2', publictaion: true},
  {no: 11, productService : 'Makanan', productType: 'Penyedia minuman dan makanan dengan pengolahan', productClass: 'Resto', productDetail: 'Makanan Mie', productName: 'Ramen Double Spicy lvl 2', publictaion: true},
])

const factoryHeader = [
  {title : 'No.', key: 'no', nowrap:true},
  {title : 'Keterangan Biaya', key: 'priceDetail', nowrap:true},
  {title : 'Jumlah', key: 'total', nowrap:true},
  {title : 'Harga', key: 'price', nowrap:true},
  {title : 'Sub Total', key: 'subTotal', nowrap:true},
]

const factoryItems = ref([
  {no: 1, priceDetail : 'Biaya Pemeriksaan', total: '1', price: 'Rp 6.000.000', subTotal: 'Rp 6.000.000'},
  {no: 2, priceDetail : 'Biaya Audit', total: '1', price: 'Rp 6.000.000', subTotal: 'Rp 6.000.000'},
]
)

const outletHeader = [
  {title : 'No.', key: 'no', nowrap:true},
  {title : 'Nama.', key: 'name', nowrap:true},
  {title : 'Alamat.', key: 'address', nowrap:true}
]

const outletItems = ref([
  {no: 1, name : 'Maya', address: 'Jakarta'},
  {no: 2, name : 'Rahmi', address: 'Bandung'}]
)

const supervisorHeader = [
  {title : 'No.', key: 'no', nowrap:true},
  {title : 'Nama', key: 'name', nowrap:true},
  {title : 'Tanggal Lahir', key: 'birthdate', nowrap:true},
  {title : 'JK', key: 'gender', nowrap:true},
  {title : 'No. Pendaftaran', key: 'registrationNo', nowrap:true},
]

const supervisorItems = ref([
  {no: 1, name : 'Maya', birthdate: '20/10/2000', gender: '-', registrationNo: 'REG RI AHA 10102134'},
  {no: 2, name : 'Bambang', birthdate: '20/10/2000', gender: '-', registrationNo: 'REG RI AHA 10102134'},
])


const substanceHeader = [
  {title : 'No.', key: 'no', nowrap:true},
  {title : 'Jenis Bahan ', key: 'type', nowrap:true},
  {title : 'Nama Bahan', key: 'name', nowrap:true},
  {title : 'Produsen', key: 'produsen', nowrap:true},
  {title : 'No. Sertifikat Halal', key: 'sertificateNumber', nowrap:true},
]

const substanceItems = ref([
  {no: 1, type : 'Bahan', name: 'Air Matang', produsen: 'PT ACEN ', sertificateNumber: '3123821093821093821'}])


const productHeader = [
  {title : 'No.', key: 'no', nowrap:true},
  {title : 'Nama Produk ', key: 'name', nowrap:true},
  {title : 'Merk ', key: 'brand', nowrap:true},
  {title: "Foto", value: "foto", sortable: false , nowrap: true},
  {title : 'Jumlah Bahan Digunakan', key: 'totalUsage', nowrap:true}
]

const productItems = ref([
  {no: 1, name : 'Jus Mangga Rez', brand: 'Rez Juice', totalUsage: '1000'}])


const updateKbli = () => {
  snackbar.sendSnackbar('KBLI Successfully Updated','success')
}

const navigateTo = (url: string) => {
    window.location.href = url;
  };


</script>

<style lang="scss" scoped>
.mw-170 {
  max-width: 170px;
  overflow: hidden; 
  white-space: nowrap;
  text-wrap: wrap;
}
</style>