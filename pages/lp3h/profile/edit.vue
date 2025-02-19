<script setup lang="ts">
import type { MasterDistrict, MasterSubDistrict } from '@/server/interface/master.iface'

const panelProfile = ref([0, 1])
const panelPenanggungJawab = ref([0, 1])
const panelDataRegistrasi = ref([0, 1])
const panelDokumenPersyaratan = ref([0, 1])
const panelDataRekeningBankDanNpwp = ref([0, 1])

const province = ref()
const kabKota = ref()
const kecamatan = ref()
const lembaga = [
  "Instansi Pemerintah/Badan Usaha",
  "Perguruan Tinggi",
  "Ormas",
  "Instansi Pemerintah"
]


const dataProfilePendamping = ref({})

const dataNamaPenanggungJawab = ref({})

const dataKontakPenanggungJawab = ref({})

const dataRegistrasi = ref({})

const dokumenPersyaratan = ref([])

const deleteDokumenPersyaratan = item => {
  console.log('DELETE DOKUMEN PERSYARATAN : ', item)
}

const downloadDokumenPersyaratan = item => {
  console.log('Download Dokumen Peryaratan : ', item)
}

const dialog = ref(false)

const simpanHandler = () => {
  console.log('SIMPAN : ')
  dialog.value = false
  useSnackbar().sendSnackbar('Berhasil menyimpan data ', 'success')
}

const file = ref(null)

const dataRekeningBankDanNpwp = ref({})

const loadProvince = async () => {
  const response: MasterProvince[] = await $api('/master/province', {
    method: 'get',
  })

  province.value = response.map(
    i => ({
      title: i.name,
      value: i.code,
    }),
  )
}

const getDistrict = async () => {
  const response: MasterDistrict[] = await $api('/master/district', {
    method: 'post',
    body: {
      province: dataProfilePendamping.value.provinsi,
    },
  })

  kabKota.value = response.map(
    i => ({
      title: i.name,
      value: i.code,
    }),
  )
}

const updateDistrict = async () => {
  dataProfilePendamping.value.kabKota = null
  await getDistrict()
}

const updateSubDistrict = async () => {
  dataProfilePendamping.value.kecamatan = null
  await getSubDistrict()
}

const getSubDistrict = async () => {
  const response: MasterSubDistrict[] = await $api('/master/subdistrict', {
    method: 'post',
    body: {
      district: dataProfilePendamping.value.kabKota,
    },
  })

  kecamatan.value = response.map(
    i => ({
      title: i.name,
      value: i.code,
    }),
  )
}


const loadProfil = async () => {
  try {
    const response = await $api('/lp3h/profil', {
      method: 'get',
    })

    const data = response.data

    console.log('RESPONSE : ', response)

    const lp = data.lembaga_pendamping

    dataProfilePendamping.value = {
      namaLembaga: lp.nama_lembaga,
      jenisLembaga: lp.jenis_lembaga,
      alamat: lp.alamat,
      provinsi : lp.provinsi,
      kabKota: lp.kabupaten,
      kecamatan: lp.kecamatan,
      kodePos: lp.kode_pos,
      email: lp.email,
    }

    dataNamaPenanggungJawab.value = {
      namaPimpinan: lp.nama_pimpinan,
      noHp: lp.no_hp,
    }

    dataKontakPenanggungJawab.value = {
      namaKontak: lp.nama_kontak,
      noHp: lp.no_hp_kontak_person,
    }

    dataRegistrasi.value = [
      { label: 'No. Registrasi', value: lp.no_register },
      { label: 'Tanggal Berlaku', value: lp.tgl_berlaku },
    ]

    const lpd = data.lembaga_pendamping_doc

    dokumenPersyaratan.value = lpd.map(
      i => ({
        name: i.jenis,
        file: i.namafile,
      }),
    )
    console.log('DOKUMEN PERSYARATAN ', dokumenPersyaratan)

    const rek = data.rekening

    dataRekeningBankDanNpwp.value = {
      namaBank: rek.bank,
      noRekening: rek.no_rekening,
      atasNama: rek.nama,
      fotoRekening: rek.filefotorek,
      npwp: rek.nama_npwp,
      fotoNpwp: rek.filefotonpwp,
    }

    console.log("DATA REKENING BANK DAN NPWP : ", dataRekeningBankDanNpwp)
  }
  catch (error) {
    console.log('ERROR : ', error)
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}

onMounted(async () => {
  await loadProfil()
  await loadProvince()
  await getDistrict()
  await getSubDistrict()
})
</script>

<template>
  <VContainer>
    <VDialog
      v-model="dialog"
      max-width="700"
    >
      <VCard class="pa-4">
        <VCardTitle>Simpan Perubahan </VCardTitle>
        <VCardText>Apakah yakin ingin menyimpan perubahan data ini ?</VCardText>
        <VRow>
          <VCol class="d-flex justify-end ga-4">
            <VBtn
              variant="outlined"
              color="primary"
              @click="dialog = false"
            >
              Batal
            </VBtn>
            <VBtn
              variant="flat"
              color="primary"
              @click="simpanHandler"
            >
              Ya, Setuju
            </VBtn>
          </VCol>
        </VRow>
      </VCard>
    </VDialog>
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
          <VBtn
            append-icon="mdi-content-save"
            @click="dialog = true"
          >
            Simpan
          </VBtn>
        </VRow>
      </VCol>
    </VRow>

    <VRow class="d-flex justify-space-between">
      <VCol cols="8">
        <VExpansionPanels
          v-model="panelProfile"
          class="mb-8"
        >
          <VExpansionPanel>
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Profil Lembaga Pendamping
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <VLabel for="namaLembaga">
                Nama Lembaga
              </VLabel>
              <VTextField
                id="namaLembaga"
                v-model="dataProfilePendamping.namaLembaga"
                class="mb-4"
              />

              <VLabel for="jenisLembaga">
                Jenis Lembaga
              </VLabel>
              <VSelect
                id="namaLembaga"
                v-model="dataProfilePendamping.jenisLembaga"
                class="mb-4"
                :items="lembaga"
              />

              <VLabel for="alamat">
                Alamat
              </VLabel>
              <VTextField
                id="alamat"
                v-model="dataProfilePendamping.alamat"
                class="mb-4"
              />

              <VLabel for="provinsi">
                Provinsi
              </VLabel>
              <VSelect
                id="provinsi"
                v-model="dataProfilePendamping.provinsi"
                class="mb-4"
                :items="province"
                @update:model-value="updateDistrict"
              />

              <VLabel for="kabKota">
                Kab/Kota
              </VLabel>
              <VSelect
                id="kabKota"
                v-model="dataProfilePendamping.kabKota"
                class="mb-4"
                :items="kabKota"
                @update:model-value="updateSubDistrict"
              />

              <VLabel for="kecamatan">
                Kecamatan
              </VLabel>
              <VSelect
                id="kecamatan"
                v-model="dataProfilePendamping.kecamatan"
                class="mb-4"
                :items="kecamatan"
              />

              <VLabel for="kodePos">
                Kode Pos
              </VLabel>
              <VTextField
                id="kodePos"
                v-model="dataProfilePendamping.kodePos"
                class="mb-4"
              />

              <VLabel for="email">
                Email
              </VLabel>
              <VTextField
                id="email"
                v-model="dataProfilePendamping.email"
                class="mb-4"
              />
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
        <VExpansionPanels
          v-model="panelPenanggungJawab"
          class="mb-8"
        >
          <VExpansionPanel>
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Penanggung Jawab
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <VRow>
                <VCol cols="6">
                  <VLabel for="namaPimpinan">
                    Nama Pimpinan
                  </VLabel>
                  <VTextField
                    id="namaPimpinan"
                    v-model="dataNamaPenanggungJawab.namaPimpinan"
                  />
                </VCol>
                <VCol cols="6">
                  <VLabel for="hpPimpinan">
                    No. HP
                  </VLabel>
                  <VTextField
                    id="hpPimpinan"
                    v-model="dataNamaPenanggungJawab.noHp"
                  />
                </VCol>
              </VRow>
              <VDivider class="my-4" />
              <VRow>
                <VCol cols="6">
                  <VLabel for="namaKontak">
                    Nama Kontak
                  </VLabel>
                  <VTextField
                    id="namaKontak"
                    v-model="dataKontakPenanggungJawab.namaKontak"
                  />
                </VCol>
                <VCol cols="6">
                  <VLabel for="hpKontak">
                    No. HP
                  </VLabel>
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
        <VExpansionPanels
          v-model="panelDataRegistrasi"
          class="mb-8"
        >
          <VExpansionPanel>
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Data Registrasi
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <VRow
                v-for="(item, index) in dataRegistrasi"
                :key="index"
                class="d-flex justify-center align-center"
              >
                <VCol
                  cols="5"
                  class="text-left font-weight-medium"
                >
                  {{ item.label }}
                </VCol>
                <VCol
                  cols="1"
                  class="text-right"
                >
                  :
                </VCol>
                <VCol
                  cols="6"
                  class="pl-0 "
                >
                  {{ item.value }}
                </VCol>
              </VRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <VExpansionPanels
          v-model="panelDokumenPersyaratan"
          class="mb-8"
        >
          <VExpansionPanel>
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Dokumen Persyaratan
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <VList class="mb-8 ">
                <VListItem
                  v-for="(item, index) in dokumenPersyaratan"
                  :key="index"
                  class="pa-1"
                >
                  <VRow class="d-flex align-center">
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <div class="text-body-1 font-weight-medium ">
                        {{ index + 1 }}.{{ item.name }}
                      </div>
                    </VCol>
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <VRow
                        no-gutters
                        class="pa-0 ma-0 d-flex align-center "
                      >
                        <VCol
                          cols="6"
                          class="squareBtnIcon"
                        >
                          <VBtn
                            icon
                            variant="outlined"
                            color="error"
                            @click="deleteDokumenPersyaratan(item)"
                          >
                            <VIcon>mdi-delete</VIcon>
                          </VBtn>
                          <VBtn
                            icon
                            variant="outlined"
                            color="purple"
                            class="ml-2"
                            @click="downloadDokumenPersyaratan(item)"
                          >
                            <VIcon color="primary">
                              mdi-download
                            </VIcon>
                          </VBtn>
                        </VCol>
                        <VCol cols="6">
                          <HalalFileInput2
                            v-model="file"
                            label="Pilih File"
                          />
                        </VCol>
                      </VRow>
                    </VCol>
                  </VRow>
                </VListItem>
              </VList>
              <VRow>
                <VCol cols="2">
                  <span style="color: red">Info :</span>
                </VCol>
                <VCol cols="8">
                  <span>
                    File yang akan di upload dengan extension XLSX, PDF, dan JPG dan kapasitas maksimal 50 Mb untuk sekali Upload.
                  </span>
                </VCol>
              </VRow>
              <VDivider class="my-4" />
              <VRow class="d-flex justify-end ma-3">
                <VBtn>
                  Simpan
                </VBtn>
              </VRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <VExpansionPanels
          v-model="panelDataRekeningBankDanNpwp"
          class="mb-8"
        >
          <VExpansionPanel>
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Data Rekening Bank & NPWP
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <VLabel for="namaBank">
                Nama Bank
              </VLabel>
              <VTextField
                id="namaBank"
                v-model="dataRekeningBankDanNpwp.namaBank"
                class="mb-4"
              />

              <VLabel for="noRekening">
                No. Rekening
              </VLabel>
              <VTextField
                id="noRekening"
                v-model="dataRekeningBankDanNpwp.noRekening"
                class="mb-4"
              />

              <VLabel for="atasNama">
                Atas Nama
              </VLabel>
              <VTextField
                id="atasNama"
                v-model="dataRekeningBankDanNpwp.atasNama"
                class="mb-4"
              />

              <VLabel for="fotoRekening">
                Upload Foto Rekening
              </VLabel>
              <HalalFileInput
                id="fotoRekening"
                v-model="dataRekeningBankDanNpwp.fotoRekening"
                class="mb-4"
              />

              <VLabel for="npwp">
                NPWP
              </VLabel>
              <VTextField
                id="npwp"
                v-model="dataRekeningBankDanNpwp.npwp"
                class="mb-4"
              />

              <VLabel for="fotoNpwp">
                Upload Foto NPWP
              </VLabel>
              <HalalFileInput
                id="fotoNpwp"
                v-model="dataRekeningBankDanNpwp.fotoNpwp"
                class="mb-4"
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
