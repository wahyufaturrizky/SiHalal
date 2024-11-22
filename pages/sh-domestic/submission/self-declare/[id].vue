<template>
  <VContainer>
    <KembaliButton />
    <VRow class="d-flex justify-space-between align-center">
      <VCol class="">
        <h3 class="text-h3">
          Detail Pengajuan Self Declare
        </h3>
      </VCol>
      <VCol cols="3">
        <VRow class="d-flex justify-end align-center ga-2">
          <VBtn variant="outlined" color="error"><VIcon icon="ri-delete-bin-5-line"></VIcon></VBtn>
          <VBtn variant="outlined" append-icon="ri-edit-line">Edit</VBtn>
          <VBtn>Kirim</VBtn>
        </VRow>
      </VCol>
    </VRow>

    <VRow>
      <VCol cols="8">
        <VExpansionPanels
          v-model="panelSubmission"
        >
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4">Pengajuan Sertifikasi Halal</VExpansionPanelTitle>
            <VExpansionPanelText>
              <InfoRow name="No.ID">{{detailSubmission.id}}</InfoRow>
              <InfoRow name="Tanggal">{{detailSubmission.date}}</InfoRow>
              <ThinLine :thickness=1 />
              <InfoRow name="No Surat Permohonan">{{detailSubmission.requestNumber}}</InfoRow>
              <InfoRow name="Tanggal Permohonan">{{detailSubmission.requestDate}}</InfoRow>
              <InfoRow name="Jenis Layanan">{{detailSubmission.serviceType}}</InfoRow>
              <InfoRow name="Jenis Produk">{{detailSubmission.productType}}</InfoRow>
              <InfoRow name="Merk Dagang">{{detailSubmission.brand}}</InfoRow>
              <InfoRow name="Area Pemasaran">{{detailSubmission.marketingArea}}</InfoRow>
              <InfoRow name="Pendamping">{{detailSubmission.companion}}</InfoRow>
              <InfoRow name="Lembaga Pendamping">{{detailSubmission.companionInstitution}}</InfoRow>
              <InfoRow name="KBLI" class="d-flex align-center">
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
              <ThinLine :thickness=1 />
              <InfoRow name="Nama Perusahaan ">{{detailSubmission.companyName}}</InfoRow>
              <InfoRow name="Alamat ">{{detailSubmission.address}}</InfoRow>
              <InfoRow name="Kota / Kab ">{{detailSubmission.district}}</InfoRow>
              <InfoRow name="Provinsi">{{detailSubmission.province}}</InfoRow>
              <InfoRow name="Kode Pos">{{detailSubmission.zipCode}}</InfoRow>
              <InfoRow name="Country">{{detailSubmission.country}}</InfoRow>
              <InfoRow name="Telepon">{{detailSubmission.phone}}</InfoRow>
              <InfoRow name="Email">{{detailSubmission.email}}</InfoRow>
              <ThinLine :thickness=1 />
              <InfoRow name="Jenis Badan Usaha">{{detailSubmission.businessType}}</InfoRow>
              <InfoRow name="Skala Usaha">{{detailSubmission.businessScale}}</InfoRow>
              <InfoRow name="Tingkat Usaha">{{detailSubmission.businessLevel}}</InfoRow>
              <InfoRow name="Modal Dasar">{{detailSubmission.authorizedCapital}}</InfoRow>
              <InfoRow name="Asal Usaha">{{detailSubmission.businessOrigin}}</InfoRow>


            </VExpansionPanelText>
          </VExpansionPanel>

        </VExpansionPanels>

        <br>
        <VExpansionPanels
          v-model="panelPic"
        >
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4">Penanggung Jawab</VExpansionPanelTitle>
            <VExpansionPanelText>
              <InfoRow name="Nama">{{pic.name}}</InfoRow>
              <InfoRow name="Nomor Kontak">{{pic.phoneNumber}}</InfoRow>
              <InfoRow name="Email">{{pic.email}}</InfoRow>
            </VExpansionPanelText>
          </VExpansionPanel>

        </VExpansionPanels>

        <br>
        <VExpansionPanels
          v-model="panelAspectLegal"
        >
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4">Aspek Legal</VExpansionPanelTitle>
            <VExpansionPanelText>
              <VDataTable :headers="aspectLegalHeader" :items="aspectLegalItems">
              </VDataTable>
            </VExpansionPanelText>
          </VExpansionPanel>

        </VExpansionPanels>

        <br>
        <VExpansionPanels
          v-model="panelFactory"
        >
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4">Pabrik</VExpansionPanelTitle>
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
            <VExpansionPanelTitle class="text-h4">Outlet</VExpansionPanelTitle>
            <VExpansionPanelText>
              <VDataTable :headers="outletHeader" :items="outletItems">
              </VDataTable>
            </VExpansionPanelText>
          </VExpansionPanel>

        </VExpansionPanels>

        <br>
        <VExpansionPanels
          v-model="panelSupervisor"
        >
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4">Penyelia Halal</VExpansionPanelTitle>
            <VExpansionPanelText>
              <VDataTable :headers="supervisorHeader" :items="supervisorItems">
              </VDataTable>
            </VExpansionPanelText>
          </VExpansionPanel>

        </VExpansionPanels>

        <br>
        <VExpansionPanels
          v-model="panelSubstance"
        >
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4">Daftar Nama Bahan</VExpansionPanelTitle>
            <VExpansionPanelText>
              <VDataTable :headers="substanceHeader" :items="substanceItems">
              </VDataTable>
            </VExpansionPanelText>
          </VExpansionPanel>

        </VExpansionPanels>


        <br>
        <VExpansionPanels
          v-model="panelProduct"
        >
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4">Daftar Nama Produk</VExpansionPanelTitle>
            <VExpansionPanelText class="d-flex align-center">
              <VDataTable :headers="productHeader" :items="productItems" class="elevation-1" fixed-header >
                <template #item.foto="{ item }">
                  <VIcon
                    color="primary"
                    style="cursor: pointer;"
                  >
                    ri-download-2-fill
                  </VIcon>
                </template>
              </VDataTable>
            </VExpansionPanelText>
          </VExpansionPanel>

        </VExpansionPanels>

        <br />
        <VExpansionPanels
          v-model="panelProductionProcess"
        >
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4">Daftar Nama Produk</VExpansionPanelTitle>
            <VExpansionPanelText class="d-flex align-center">
              <VTextarea
                ref="processProduction"
                placeholder="Masukkan proses produksi"
                v-model="textValue"
                outlined
              ></VTextarea>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
      </VCol>
      <VCol cols="4">
        <VExpansionPanels
          v-model="panelDownloadFormulir"
        >
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4">Formulir Unduhan</VExpansionPanelTitle>
            <VExpansionPanelText class="d-flex align-center">
              <InfoRowV2 class="d-flex align-center" name="Surat Permohonan"><VBtn color="primary" style="cursor: pointer;" icon="ri-download-line"></VBtn></InfoRowV2>
              <InfoRowV2 class="d-flex align-center" name="Surat Pernyataan"><VBtn color="primary" style="cursor: pointer;" icon="ri-download-line"></VBtn></InfoRowV2>
              <InfoRowV2 class="d-flex align-center" name="Ikrar"><VBtn color="primary" style="cursor: pointer;" icon="ri-download-line"></VBtn></InfoRowV2>
              <InfoRowV2 class="d-flex align-center" name="Hasil Verval"><VBtn color="primary" style="cursor: pointer;" icon="ri-download-line"></VBtn></InfoRowV2>
              <InfoRowV2 class="d-flex align-center" name="Rekomendasi"><VBtn color="primary" style="cursor: pointer;" icon="ri-download-line"></VBtn></InfoRowV2>
              <InfoRowV2 class="d-flex align-center" name="SJPH"><VBtn color="primary" style="cursor: pointer;" icon="ri-download-line"></VBtn></InfoRowV2>
              <InfoRowV2 class="d-flex align-center" name="Laporan"><VBtn color="primary" style="cursor: pointer;" icon="ri-download-line"></VBtn></InfoRowV2>
              <InfoRowV2 class="d-flex align-center" name="STTD"><VBtn color="primary" style="cursor: pointer;" icon="ri-download-line"></VBtn></InfoRowV2>
              <InfoRowV2 class="d-flex align-center" name="Sertifikasi Halal"><VBtn color="primary" style="cursor: pointer;" icon="ri-download-line"></VBtn></InfoRowV2>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
        <br />
        <VExpansionPanels
          v-model="panelRegistration"
        >
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4">Pendaftaran</VExpansionPanelTitle>
            <VExpansionPanelText class="d-flex align-center">
              <InfoRowV2 class="d-flex align-center" name="Nomor Daftar">-</InfoRowV2>
              <InfoRowV2 class="d-flex align-center" name="Tanggal">-</InfoRowV2>
              <InfoRowV2 class="d-flex align-center" name="Tempat Pendaftaran">-</InfoRowV2>
              <InfoRowV2 class="d-flex align-center" name="Jenis Pengajuan">-</InfoRowV2>
              <InfoRowV2 class="d-flex align-center" name="Status"><v-chip
                class="ma-2"
                color="primary"
                label
              >
                Draft PU
              </v-chip></InfoRowV2>
              <InfoRowV2 class="d-flex align-center" name="Channel Pendaftaran">Pendaftaran Self Declare</InfoRowV2>
              <InfoRowV2 class="d-flex align-center" name="Fasilitator">-</InfoRowV2>

            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br />
        <VExpansionPanels
          v-model="panelFatwaHearing"
        >
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4">Sidang Fatwa</VExpansionPanelTitle>
            <VExpansionPanelText class="d-flex align-center">
              <InfoRowV2 class="d-flex align-center" name="Nomor Penetapan">-</InfoRowV2>
              <InfoRowV2 class="d-flex align-center" name="Tanggal Penetapan">-</InfoRowV2>
              <InfoRowV2 class="d-flex align-center" name="Penetapan">-</InfoRowV2>
              <InfoRowV2 class="d-flex align-center" name="Document">-</InfoRowV2>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br />
        <VExpansionPanels
          v-model="panelHalalCertificate"
        >
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4">Sertifikat Halal</VExpansionPanelTitle>
            <VExpansionPanelText class="d-flex align-center">
              <InfoRowV2 class="d-flex align-center" name="Nomor Sertifikat">-</InfoRowV2>
              <InfoRowV2 class="d-flex align-center" name="Tanggal Sertifikat">-</InfoRowV2>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br />
        <VExpansionPanels
          v-model="panelTracking"
        >
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4">Melacak</VExpansionPanelTitle>
            <VExpansionPanelText class="d-flex align-center">
              <HalalTimeLine :timeline-data ="[
                             { title: 'Draft PU', date: '2024/10/05', description: 'Samsul' },]"/>
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
  requestDate: '10/10/2024',
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
  {title : 'Jenis', key: 'type', nowrap:true},
  {title : 'No. Document', key: 'documentNumber', nowrap:true},
  {title : 'Tanggal', key: 'date', nowrap:true},
  {title : 'Masa Berlaku', key: 'validDate', nowrap:true},
  {title : 'Instansi Penerbit', key: 'issuer', nowrap:true},
]

const aspectLegalItems = ref([
  {no: 1, type : 'SIUP', documentNumber: '2131421421411', date: '09/10/2024', validDate: '09/10/2024', issuer: 'DITJEN PAJAK'},
  {no: 2, type : 'NPWP', documentNumber: '2131421421411', date: '09/10/2024', validDate: '09/10/2024', issuer: 'DITJEN PAJAK'}])

const factoryHeader = [
  {title : 'No.', key: 'no', nowrap:true},
  {title : 'Nama.', key: 'name', nowrap:true},
  {title : 'Alamat.', key: 'address', nowrap:true}
]

const factoryItems = ref([
  {no: 1, name : 'My Drink Oke', address: 'Jakarta'}]
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
  {title : 'Nama.', key: 'name', nowrap:true},
  {title : 'No. KTP.', key: 'idNo', nowrap:true},
  {title : 'No. Kontak', key: 'phoneNumber', nowrap:true},
  {title : 'No/Tgl Sertif Penyelia Halal', key: 'sertificateDate', nowrap:true},
  {title : 'No/Tgl SK', key: 'skDate', nowrap:true},
]

const supervisorItems = ref([
  {no: 1, name : 'Maya', idNo: '2131421421411', phoneNumber: '0899999999', sertificateDate: '09/10/2024', skDate: 'DITJEN PAJAK'},
  {no: 2, name : 'Rahmi', idNo: '2131421421411', phoneNumber: '0899999999', sertificateDate: '09/10/2024', skDate: 'DITJEN PAJAK'}])


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


</script>
