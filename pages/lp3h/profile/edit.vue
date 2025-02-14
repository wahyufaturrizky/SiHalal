<script setup lang="ts">

const panelProfile = ref([0, 1])
const panelPenanggungJawab = ref([0, 1])
const panelDataRegistrasi = ref([0,1])
const panelDokumenPersyaratan = ref([0,1])
const panelDataRekeningBankDanNpwp = ref([0,1])


const dataProfilePendamping = ref(
  {
    namaLembaga : "UIN Walisongo Semarang",
    jenisLembaga : "Perguruan Tinggi",
    alamat : "Jl. Prof DR. Hamka",
    provinsi : "Jawa Tengah",
    kabKota : "Kota Semarang",
    kecamatan : "Ngaliyan",
    kodePos: "14045",
    email : "UINWS@gmail.com"
  }
)

const dataNamaPenanggungJawab = ref({
  namaPimpinan : "Albert Flores",
  noHp : "0821178958123"
})

const dataKontakPenanggungJawab = ref({
  namaKontak : "Robert Fox",
  noHp : "0821178958123"
})


const dataRegistrasi = [
  { label: "No. Registrasi", value: "1234567890789" },
  { label: "Tanggal Berlaku", value: "1/14/2027 10:00:00 AM" }
]


const dokumenPersyaratan = [
  { name: "Akte/Dasar Hukum Pendirian" , id: "1"},
  { name: "Struktur Organisasi", id: "2" },
  { name: "Ijazah Sarjana/Diploma", id: "3" },
  { name: "Pernyataan Komitmen Sebagai Lembaga Pendamping" , id: "4"}
]

const deleteDokumenPersyaratan = (item) => {
  console.log("DELETE DOKUMEN PERSYARATAN : ", item)
}

const downloadDokumenPersyaratan = (item) => {
  console.log("Download Dokumen Peryaratan : ", item)
}


const dialog = ref(false);
const simpanHandler = () => {
  console.log("SIMPAN : ")
  dialog.value = false
  useSnackbar().sendSnackbar("Berhasil menyimpan data ", "success")
}

const file = ref(null)


const dataRekeningBankDanNpwp = ref({
  namaBank : "Bank Syariah Indonesia",
  noRekening : "982913021321",
  atasNama : "LP POM MUI",
  fotoRekening : null,
  npwp : "123.456.789.761",
  fotoNpwp : null
})

</script>

<template>
  <VContainer>
    <v-dialog v-model="dialog" max-width="700">
      <v-card class="pa-4">
        <v-card-title>Simpan Perubahan </v-card-title>
        <v-card-text>Apakah yakin ingin menyimpan perubahan data ini ?</v-card-text>
        <VRow>
          <VCol class="d-flex justify-end ga-4">
            <v-btn variant="outlined" color="primary" @click="dialog = false">Batal</v-btn>
            <v-btn variant="flat" color="primary" @click="simpanHandler">Ya, Setuju</v-btn>
          </VCol>
        </VRow>
      </v-card>
    </v-dialog>
    <VRow>
      <KembaliButton />
    </VRow>
    <VRow class="d-flex justify-space-between align-center">
      <VCol class="mb-8">
        <h3 class="text-h3">
          Ubah Lembaga Pendamping
        </h3>
      </VCol>
      <VCol cols="8">
        <VRow class="d-flex justify-end align-center">
          <VBtn append-icon="mdi-content-save" @click="dialog = true">
            Simpan
          </VBtn>
        </VRow>
      </VCol>
    </VRow>

    <VRow class="d-flex justify-space-between">
      <VCol cols="8">
        <VExpansionPanels v-model="panelProfile" class="mb-8">
          <VExpansionPanel>
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Profil Lembaga Pendamping
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <VLabel for="namaLembaga">
                Nama Lembaga
              </VLabel>
              <VTextField
                class="mb-4"
                id="namaLembaga"
                v-model="dataProfilePendamping.namaLembaga"
              />

              <VLabel for="jenisLembaga">
                Jenis Lembaga
              </VLabel>
              <VSelect
                class="mb-4"
                id="namaLembaga"
                v-model="dataProfilePendamping.jenisLembaga"
                :items="['Perguruan Tinggi']"
              />

              <VLabel for="alamat">
                Alamat
              </VLabel>
              <VTextField
                class="mb-4"
                id="alamat"
                v-model="dataProfilePendamping.alamat"
              />

              <VLabel for="provinsi">
                Jenis Lembaga
              </VLabel>
              <VSelect
                class="mb-4"
                id="provinsi"
                v-model="dataProfilePendamping.provinsi"
                :items="['Jawa Tengah']"
              />

              <VLabel for="kabKota">
                Kab/Kota
              </VLabel>
              <VSelect
                class="mb-4"
                id="kabKota"
                v-model="dataProfilePendamping.kabKota"
                :items="['Kota Semarang']"
              />

              <VLabel for="kecamatan">
                Kecamatan
              </VLabel>
              <VSelect
                class="mb-4"
                id="kecamatan"
                v-model="dataProfilePendamping.kecamatan"
                :items="['Ngaliyan']"
              />

              <VLabel for="kodePos">
                Kode Pos
              </VLabel>
              <VTextField
                class="mb-4"
                id="kodePos"
                v-model="dataProfilePendamping.kodePos"
              />

              <VLabel for="email">
                Email
              </VLabel>
              <VTextField
                class="mb-4"
                id="email"
                v-model="dataProfilePendamping.email"
              />

            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
        <VExpansionPanels v-model="panelPenanggungJawab" class="mb-8">
          <VExpansionPanel>
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Penanggung Jawab
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <VRow>
                <VCol cols="6">
                  <VLabel for="namaPimpinan">Nama Pimpinan</VLabel>
                  <VTextField
                    id="namaPimpinan"
                    v-model="dataNamaPenanggungJawab.namaPimpinan"
                  />

                </VCol>
                <VCol cols="6">
                  <VLabel for="hpPimpinan">No. HP</VLabel>
                  <VTextField
                    id="hpPimpinan"
                    v-model="dataNamaPenanggungJawab.noHp"
                  />
                </VCol>
              </VRow>
              <VDivider class="my-4"/>
              <VRow>
                <VCol cols="6">
                  <VLabel for="namaKontak">Nama Kontak</VLabel>
                  <VTextField
                    id="namaKontak"
                    v-model="dataKontakPenanggungJawab.namaKontak"
                  />
                </VCol>
                <VCol cols="6">
                  <VLabel for="hpKontak">No. HP</VLabel>
                  <VTextField
                    id="hpKontak"
                    v-model="dataKontakPenanggungJawab.noHp"
                  />
                </VCol>
              </VRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
      </VCol>
      <VCol cols="4">
        <VExpansionPanels v-model="panelDataRegistrasi" class="mb-8">
          <VExpansionPanel>
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Data Registrasi
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <VRow v-for="(item, index) in dataRegistrasi" :key="index" class="d-flex justify-center align-center">
                <VCol cols="5" class="text-left font-weight-medium">
                  {{ item.label }}
                </VCol>
                <VCol cols="1" class="text-right">
                  :
                </VCol>
                <VCol cols="6" class="pl-0 ">
                  {{ item.value }}
                </VCol>
              </VRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <VExpansionPanels v-model="panelDokumenPersyaratan" class="mb-8">
          <VExpansionPanel>
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Dokumen Persyaratan
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <VList class="mb-8 ">
                <VListItem v-for="(item, index) in dokumenPersyaratan" :key="index" class="pa-1">
                  <VRow class="d-flex align-center">
                    <VCol cols="12" md="6">
                      <div class="text-body-1 font-weight-medium ">{{ index + 1 }}.{{ item.name }}</div>
                    </VCol>
                    <VCol cols="12" md="6">
                      <VRow no-gutters class="pa-0 ma-0 d-flex align-center ">
                        <VCol cols="6" class="squareBtnIcon">
                          <VBtn  icon variant="outlined" color="error" @click="deleteDokumenPersyaratan(item)">
                            <VIcon >mdi-delete</VIcon>
                          </VBtn>
                          <VBtn icon variant="outlined" color="purple" class="ml-2" @click="downloadDokumenPersyaratan(item)">
                            <VIcon color="primary">mdi-download</VIcon>
                          </VBtn>
                        </VCol>
                        <VCol cols="6">
                          <HalalFileInput2 v-model="file" label="Pilih File" />
                        </VCol>
                      </VRow>
                    </VCol>
                  </VRow>
                </VListItem>
              </VList>
              <VRow>
                <VCol cols="2" >
                  <span style="color: red">Info :</span>
                </VCol>
                <VCol cols="8">
                  <span>
                    File yang akan di upload dengan extension XLSX, PDF, dan JPG dan kapasitas maksimal 50 Mb untuk sekali Upload.
                  </span>
                </VCol>
              </VRow>
              <VDivider class="my-4"/>
              <VRow class="d-flex justify-end ma-3">
                <VBtn>
                  Simpan
                </VBtn>
              </VRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <VExpansionPanels v-model="panelDataRekeningBankDanNpwp" class="mb-8">
          <VExpansionPanel>
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Data Rekening Bank & NPWP
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <VLabel for="namaBank">
                Nama Bank
              </VLabel>
              <VTextField
                class="mb-4"
                id="namaBank"
                v-model="dataRekeningBankDanNpwp.namaBank"
              />

              <VLabel for="noRekening">
                No. Rekening
              </VLabel>
              <VTextField
                class="mb-4"
                id="noRekening"
                v-model="dataRekeningBankDanNpwp.noRekening"
              />

              <VLabel for="atasNama">
                Atas Nama
              </VLabel>
              <VTextField
                class="mb-4"
                id="atasNama"
                v-model="dataRekeningBankDanNpwp.atasNama"
              />

              <VLabel for="fotoRekening">
                Upload Foto Rekening
              </VLabel>
              <HalalFileInput
                class="mb-4"
                id="fotoRekening"
                v-model="dataRekeningBankDanNpwp.fotoRekening"
              />

              <VLabel for="npwp">
                NPWP
              </VLabel>
              <VTextField
                class="mb-4"
                id="npwp"
                v-model="dataRekeningBankDanNpwp.npwp"
              />

              <VLabel for="fotoNpwp">
                Upload Foto NPWP
              </VLabel>
              <HalalFileInput
                class="mb-4"
                id="fotoNpwp"
                v-model="dataRekeningBankDanNpwp.fotoNpwp"
              />

            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

      </VCol>
    </VRow>
  </VContainer>
</template>

<style scoped lang="scss">

.squareBtnIcon button {
  border-radius: 8px;
}
</style>
