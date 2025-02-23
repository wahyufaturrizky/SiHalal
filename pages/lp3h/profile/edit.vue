<script setup lang="ts">
import type { MasterDistrict, MasterSubDistrict } from '@/server/interface/master.iface'

const panelProfile = ref([0, 1])
const panelPenanggungJawab = ref([0, 1])
const panelDataRegistrasi = ref([0, 1])
const panelDokumenPersyaratan = ref([0, 1])
const panelDataRekeningBankDanNpwp = ref([0, 1])

const componentKey = ref(0);

const loading = ref(true)

const uploadFileButton = ref(false)

const province = ref()
const kabKota = ref()
const kecamatan = ref()
const lembaga = [
  "Instansi Pemerintah/Badan Usaha",
  "Perguruan Tinggi",
  "Ormas",
  "Instansi Pemerintah"
]

const emptyBlob = new Blob([""], { type: "application/octet-stream" });

const temporaryDokumentPersyaratan = ref([])

const authUser = useMyAuthUserStore()

const uploadDocument = async (file) => {
  console.log("UPLOAD FILE : ", file)
  try {
    const formData = new FormData();
    formData.append("id", authUser.user.id)
    formData.append("file", file);
    formData.append("type", "files");
    const response = await $api("/shln/submission/document/upload", {
      method: "post",
      body: formData,
    });
    return response;
  } catch (error) {
    useSnackbar().sendSnackbar(
      "ada kesalahan saat upload file, gagal menyimpan!",
      "error"
    );
  }
};


const dataProfilePendamping = ref({})

const dataNamaPenanggungJawab = ref({})

const dataKontakPenanggungJawab = ref({})

const dataRegistrasi = ref({})

const dokumenPersyaratan = ref([])

const dataRekeningBankDanNpwp = ref({})


const handleDownloadV2 = async (filename: string) => {
  try {
    const response = await $api("/shln/submission/document/download", {
      method: "post",
      body: {
        filename: filename,
      },
    });

    if (response.url)
      window.open(response.url, "_blank", "noopener,noreferrer");
  } catch (error) {
    //console.log(error);
  }
};


const dialog = ref(false)
const simpanHandler = async () => {
  //console.log('SIMPAN : ')
  const npwpUpload = await uploadDocument(npwpFile.value)
  const rekUpload = await uploadDocument(rekFile.value)
  //console.log("UPLOAD NPWP : ", npwpUpload)

  const body = {
    // START TODO NEED TO MAKESURE FIELD NAME
    nama_lembaga: dataProfilePendamping.value.namaLembaga,
    jenis_lembaga: dataProfilePendamping.value.jenisLembaga,
    // END TODO

    alamat: dataProfilePendamping.value.alamat,
    nama_pimpinan: dataNamaPenanggungJawab.value.namaPimpinan,
    email: dataProfilePendamping.value.email,
    kabupaten: dataProfilePendamping.value.kabKota,
    kode_pos: dataProfilePendamping.value.kodePos,
    no_hp: dataNamaPenanggungJawab.value.noHp,
    nama_kontak: dataKontakPenanggungJawab.value.namaKontak,
    no_hp_kontak_person: dataKontakPenanggungJawab.value.noHp,
    kecamatan: dataProfilePendamping.value.kecamatan,
    provinsi: dataProfilePendamping.value.provinsi,
    rekening: {
      no_rekening: dataRekeningBankDanNpwp.value.noRekening,
      nama: dataRekeningBankDanNpwp.value.atasNama,
      bank: dataRekeningBankDanNpwp.value.namaBank,
      npwp: dataRekeningBankDanNpwp.value.npwp,
      foto_rekening: rekUpload.code === 2000 ? rekUpload.data.file_url : dataRekeningBankDanNpwp.value.fotoRekening,
      foto_npwp: npwpUpload.code === 2000 ? npwpUpload.data.file_url : dataRekeningBankDanNpwp.value.fotoNpwp
    }
  }

  try {
    await $api(
      `/lp3h/update-profil/${dataProfilePendamping.value.id_lp}`,
      {
        method: "put",
        body,
      }
    );
    useSnackbar().sendSnackbar('Berhasil menyimpan data ', 'success')
    navigateTo("/lp3h/profile");
  }catch (error){
    //console.log(error)
    useSnackbar().sendSnackbar('Ada Kesalaan ', 'error')

  }
  dialog.value = false
}

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

const deleteFromTemporaryDokumentPersyaratan = (item) => {
  console.log("DELETE DOKUMENT : ", item)
  if(temporaryDokumentPersyaratan.value.length > 0){
    temporaryDokumentPersyaratan.value =
      temporaryDokumentPersyaratan.value.filter(i => i.jenis !== item.jenis)
  }
  temporaryDokumentPersyaratan.value.push({
    jenis: item.jenis,
    file: ""
  })

  dokumenPersyaratan.value =
    dokumenPersyaratan.value.map(
      i => ({
        jenis: i.jenis,
        file: i.file,
        emptyFile: i.jenis === item.jenis ? null : (i.emptyFile === null ? null : new File([emptyBlob], i.file))
      })
    )
  componentKey.value += 1;
}


const handlerUploadFileChange = (newVal, item) => {

  if(temporaryDokumentPersyaratan.value.length > 0){
    temporaryDokumentPersyaratan.value =
      temporaryDokumentPersyaratan.value.filter(i => i.jenis !== item.jenis)
  }
  temporaryDokumentPersyaratan.value.push({
    jenis: item.jenis,
    file: ""
  })

  if(newVal !== null){
  // UPDATED FILE
    temporaryDokumentPersyaratan.value.push({
      jenis: item.jenis,
      file: newVal
    })
  }
}


const uploadDokumen = async () => {
  uploadFileButton.value = true

  if(dokumenPersyaratan.value.length == 0) return

  const body = []
  console.log("dokumen persyaratan : ", dokumenPersyaratan.value)
  console.log("temp dokument persyaratan : ", temporaryDokumentPersyaratan)

  for(let i = 0; i < dokumenPersyaratan.value.length; i++){
    const updatedDokument = temporaryDokumentPersyaratan.value.filter(j => j.jenis === dokumenPersyaratan.value[i].jenis)

    if(updatedDokument.length > 0){
      let namafile = ""
      if(updatedDokument[updatedDokument.length - 1].file !== ""){
        const response = await uploadDocument(updatedDokument[updatedDokument.length - 1].file)
        namafile = response.data.file_url
      }
      body.push({
        jenis: dokumenPersyaratan.value[i].jenis,
        namafile})
    }else{
      body.push({
        jenis: dokumenPersyaratan.value[i].jenis,
        namafile: dokumenPersyaratan.value[i].file
      })
    }
  }
  console.log("BODY REQUEST : ", body)

  try {
    await $api(
      `/lp3h/upload-doc/${dataProfilePendamping.value.id_lp}`,
      {
        method: "put",
        body,
      }
    );
    useSnackbar().sendSnackbar('Berhasil menyimpan data ', 'success')
    navigateTo("/lp3h/profile");
  }catch (error){
    //console.log(error)
    useSnackbar().sendSnackbar('Ada Kesalaan ', 'error')

  }
  temporaryDokumentPersyaratan.value = []
  uploadFileButton.value = false
}

const npwpFile = ref('x')
const rekFile = ref('x')

const loadProfil = async () => {
  loading.value = true
  try {
    const response = await $api('/lp3h/profil', {
      method: 'get',
    })

    const data = response.data

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
      id_lp: lp.id_lp,
      status: lp.status
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
      i => ({jenis: i.jenis, file: i.namafile, emptyFile: new File([emptyBlob], i.namafile)})
    )

    console.log("dokumen persyaratan : ", dokumenPersyaratan)

    const rek = data.rekening
    dataRekeningBankDanNpwp.value = {
      namaBank: rek.bank,
      noRekening: rek.no_rekening,
      atasNama: rek.nama,
      fotoRekening: rek.filefotorek,
      npwp: rek.npwp,
      fotoNpwp: rek.filefotonpwp,
    }

    npwpFile.value = new File([emptyBlob], rek.filefotonpwp)
    rekFile.value = new File([emptyBlob], rek.filefotorek)
  }
  catch (error) {
    //console.log('ERROR : ', error)
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
  loading.value = false
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
            <VExpansionPanelText v-if="dataProfilePendamping">
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
              <VRow v-if="dataNamaPenanggungJawab" >
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
              <VRow v-if="dataKontakPenanggungJawab">
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
            <VExpansionPanelText v-if="dataRegistrasi.length > 0">
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
            <VExpansionPanelText class="pa-0">

              <v-list v-if="!loading && dataProfilePendamping.status === 'REGISTRASI' " class="pa-0 ma-0" :key="componentKey">
                <v-list-item v-for="(item, index) in dokumenPersyaratan" :key="index" class="ma-0 pa-0">
                  <VRow class="d-flex align-center pa-0 ma-0 ga-o" >
                    <VCol cols="12" md="5">
                      <span>{{index + 1}}.</span>
                      <span class="text-body-1 font-weight-medium ">{{item.jenis}}</span>
                    </VCol>
                    <VCol cols="12" md="7">
                      <VRow no-gutters class="pa-0 ma-0 d-flex align-center ">
                        <VCol cols="5" class="squareBtnIcon">
                          <VRow no-gutters class="pa-0 ma-0 ga-0">
                            <VCol cols="6" class="ma-0 pa-0">
                              <VIcon color="error" @click="deleteFromTemporaryDokumentPersyaratan(item)">mdi-delete</VIcon>
                            </VCol>
                            <VCol cols="6" class="ma-0 pa-0">
                              <VIcon color="primary" @click="downloadDocument(item.file, 'FILES')">mdi-download</VIcon>
                            </VCol>
                          </VRow>
                        </VCol>
                        <VCol cols="7">
                          <HalalFileInput3
                            v-model="item.emptyFile"
                            :on-change="(newVal) => handlerUploadFileChange(newVal, item)"
                            @clear="deleteFromTemporaryDokumentPersyaratan(item)"
                            label="Pilih File"/>
                        </VCol>
                      </VRow>
                    </VCol>
                  </VRow>
                </v-list-item>
              </v-list>
              <VList v-else>
                <VListItem v-for="(item, index) in dokumenPersyaratan" :key="index" class="pa-1">
                  <VRow class="d-flex align-center">
                    <VCol cols="12" md="8">
                      <div class="text-body-1 font-weight-medium ">{{ index + 1 }}.{{ item.jenis }}</div>
                    </VCol>
                    <VCol cols="12" md="4" class="squareBtnIcon">
                      <VBtn icon variant="outlined" color="purple" class="ml-2" @click="downloadDocument(item.file, 'FILES')">
                        <VIcon color="primary">mdi-download</VIcon>
                      </VBtn>
                    </VCol>
                  </VRow>
                </VListItem>
              </VList>
              <VRow>
                <VCol cols="2">
                  <span style="color: red;">Info :</span>
                </VCol>
                <VCol cols="8">
                  <span>
                    File yang akan di upload dengan extension XLSX, PDF, dan JPG dan kapasitas maksimal 50 Mb untuk sekali Upload.
                  </span>
                </VCol>
              </VRow>
              <VDivider class="my-4" />
              <VRow class="d-flex justify-end ma-3">
                <VBtn @click="uploadDokumen" :disabled="uploadFileButton" v-if="dataProfilePendamping.status === 'REGISTRASI'">
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
            <VExpansionPanelText v-if="dataRekeningBankDanNpwp">
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
                v-if="rekFile != 'x'"
                id="fotoRekening"
                v-model="rekFile"
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
                v-if="npwpFile != 'x'"
                id="fotoNpwp"
                v-model="npwpFile"
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
