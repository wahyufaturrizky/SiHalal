<script setup lang="ts">

const panelProfile = ref([0, 1])
const panelPenanggungJawab = ref([0, 1])
const panelDataPendamping = ref([0, 1])
const panelDataRegistrasi = ref([0,1])
const panelDokumenPersyaratan = ref([0,1])
const panelDataRekeningBankDanNpwp = ref([0,1])


const itemPerPage = ref(10)
const totalItems = ref(0)
const page = ref(1)
const loading = ref(true)


const dataProfilePendamping = ref([
  { label: "Nama Lembaga", value: "-" },
  { label: "Jenis Lembaga", value: "-" },
  { label: "Alamat", value: "-" },
  { label: "Kecamatan", value: "-" },
  { label: "Kode Pos", value: "-" },
  { label: "Kota/Kab", value: "-" },
  { label: "Provinsi", value: "-" },
  { label: "Email", value: "-" }
])

const dataNamaPenanggungJawab = ref([
  { label: "Nama Pimpinan", value: "-" },
  { label: "No. HP Pimpinan", value: "-" }
])

const dataKontakPenanggungJawab = ref([
  { label: "Nama Kontak", value: "-" },
  { label: "No. HP Kontak", value: "-" }
])

const dataPendampingHeader = [
  { title: "No", key: "no"},
  { title: "NIK", key: "nik"},
  { title: "Pendidikan", key: "pendidikan"},
  { title: "Ijazah", key: "ijazah"},
  { title: "KTP", key: "ktp"},
  { title: "No. Register", key: "noRegister", nowrap: true},
  { title: "Tanggal Berlaku", key: "tanggalBerlaku", nowrap: true},
  { title: "Status Registrasi", key: "status", nowrap: true},
  // { title: "Action", key: "action"}
]

const dataPendampingItem = ref([
])

const downloadFile = async (file) => {
  console.log('file : ', file)

  try {
    const response = await $api('/shln/submission/document/download', {
      method: 'post',
      body: {
        filename: file,
      },
    })

    if (response.url)
      window.open(response.url, '_blank', 'noopener,noreferrer')
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
    console.log(error)
  }
}

const loadItem = async (page: number, size: number) => {
  try {
    loading.value = true
    const response = await $api('/lp3h/list-pendamping', {
      method: 'get',
      params: {
        page,
        size
      },
    })

    const data = response.data

    if (data != null) {
      dataPendampingItem.value = data.map(
        i => ({
          nik: i.nik,
          pendidikan: i.pendidikan,
          noRegister: i.idx_daftar,
          tanggalBerlaku: "TODO",
          status: i.status,
          ijazah: i.fotoijazah,
          ktp: i.fotoktp
        }),
      )
    }

    totalItems.value = response.total_item
    loading.value = false
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
    loading.value = false
  }
}


const deleteItem = (item) => {
  console.log("ITEM DELETE : ", item)
}

const dataRegistrasi = ref([
  { label: "No. Registrasi", value: "-" },
  { label: "Tanggal Berlaku", value: "-" },
  { label: "Status", value: "-" }
])

const dokumenPersyaratan = ref([
])


const file = ref({})

const dialog = ref(false);

const loadProfil = async () => {
  try {
    const response = await $api("/lp3h/profil", {
      method: "get",
    });

    const data = response.data;
    console.log("RESPONSE : ", response)

    const lp = data.lembaga_pendamping
    dataProfilePendamping.value = [
      { label: "Nama Lembaga", value: lp.nama_lembaga },
      { label: "Jenis Lembaga", value: lp.jenis_lembaga },
      { label: "Alamat", value: lp.alamat },
      { label: "Kecamatan", value: lp.kecamatan },
      { label: "Kode Pos", value: lp.kode_pos },
      { label: "Kota/Kab", value: lp.kabupaten },
      { label: "Provinsi", value: lp.provinsi },
      { label: "Email", value: lp.email }
    ];

    dataNamaPenanggungJawab.value = [
      { label: "Nama Pimpinan", value: lp.nama_pimpinan },
      { label: "No. HP Pimpinan", value: lp.no_hp }
    ]

    dataKontakPenanggungJawab.value = [
      { label: "Nama Kontak", value: lp.nama_kontak },
      { label: "No. HP Kontak", value: lp.no_hp_kontak_person }
    ]

    dataRegistrasi.value = [
      { label: "No. Registrasi", value: lp.no_register },
      { label: "Tanggal Berlaku", value: lp.tgl_berlaku },
      { label: "Status", value: lp.status }
    ]

    const lpd = data.lembaga_pendamping_doc

    dokumenPersyaratan.value = lpd.map(
      i =>({
        name: i.jenis,
        file: i.namafile
      })
    )
    console.log("DOKUMEN PERSYARATAN ", dokumenPersyaratan)


    const rek = data.rekening
    dataRekeningBankDanNpwp.value = {
      namaBank : rek.bank,
      noRekening : rek.no_rekening,
      atasNama : rek.nama,
      fotoRekening : rek.filefotorek,
      npwp : rek.nama_npwp,
      fotoNpwp : rek.filefotonpwp
    }

  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const dataRekeningBankDanNpwp = ref({})


const getColor = (status) => {
  return status.toUpperCase() === 'Disetujui'.toUpperCase() ? 'success' : 'error'
}

onMounted(async () => {
  await loadProfil()
})

</script>

<template>
  <VContainer>
    <v-dialog v-model="dialog" max-width="700">
      <v-card class="pa-4">
        <v-card-title>Pengajuan </v-card-title>
        <v-card-text>Ajukan sebagai lembaga Pendamping ?</v-card-text>
        <VRow>
          <VCol class="d-flex justify-end ga-4">
            <v-btn variant="outlined" color="primary" @click="dialog = false">Batal</v-btn>
            <v-btn variant="flat" color="primary" @click="ajukanHandler">Ya, Setuju</v-btn>
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
          Lembaga Pendamping
        </h3>
      </VCol>
      <VCol cols="8">
        <VRow class="d-flex justify-end align-center ga-2">
          <VBtn
            variant="outlined"
            append-icon="ri-edit-line"
            @click="navigateTo(`/lp3h/profile/edit`)"
          >
            Ubah
          </VBtn>
<!--          <VBtn append-icon="fa-paper-plane" @click="dialog = true">-->
<!--            Ajukan-->
<!--          </VBtn>-->
        </VRow>
      </VCol>
    </VRow>

    <VRow class="d-flex justify-space-between">
      <VCol cols="8">
        <VExpansionPanels v-model="panelProfile" class="mb-4">
          <VExpansionPanel>
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Profil Lembaga Pendamping
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <VRow v-for="(item, index) in dataProfilePendamping" :key="index">
                <VCol cols="5" class="text-left font-weight-medium">
                  {{ item.label }}
                </VCol>
                <VCol cols="1" class="text-right">
                  :
                </VCol>
                <VCol cols="6" class="pl-0">
                  {{ item.value }}
                </VCol>
              </VRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
        <VExpansionPanels v-model="panelPenanggungJawab" class="mb-4">
          <VExpansionPanel>
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Penanggung Jawab
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <VRow v-for="(item, index) in dataNamaPenanggungJawab" :key="index">
                <VCol cols="5" class="text-left font-weight-medium">
                  {{ item.label }}
                </VCol>
                <VCol cols="1" class="text-right">
                  :
                </VCol>
                <VCol cols="6" class="pl-0">
                  {{ item.value }}
                </VCol>
              </VRow>
              <VDivider class="my-4"/>
              <VRow v-for="(item, index) in dataKontakPenanggungJawab" :key="index">
                <VCol cols="5" class="text-left font-weight-medium">
                  {{ item.label }}
                </VCol>
                <VCol cols="1" class="text-right">
                  :
                </VCol>
                <VCol cols="6" class="pl-0">
                  {{ item.value }}
                </VCol>
              </VRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
        <VExpansionPanels v-model="panelDataPendamping" class="mb-4">
          <VExpansionPanel>
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Data Pendamping
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <VDataTableServer
                :headers="dataPendampingHeader"
                :items="dataPendampingItem"
                v-model:items-per-page="itemPerPage"
                v-model:page="page"
                :items-length="totalItems"
                loading-text="Loading..."
                @update:options="loadItem(page, itemPerPage)"
              >
                <template #item.no="{ index }">
                  {{ index + 1 }}
                </template>

                <template #item.ijazah="{ item }">
                  <VBtn icon variant="text" @click="downloadFile(item.ijazah)">
                    <VIcon size="24" color="primary">mdi-eye</VIcon>
                  </VBtn>
                </template>

                <template #item.ktp="{ item }">
                  <VBtn icon variant="text" @click="downloadFile(item.ktp)">
                    <VIcon size="24" color="primary">mdi-eye</VIcon>
                  </VBtn>
                </template>

                <template #item.status="{ item }">
                  <VChip :color="getColor(item.status)"
                         variant="outlined"
                         label
                  >
                    {{ item.status }}
                  </VChip>
                </template>

<!--                <template #item.action="{ item }">-->
<!--                  <VBtn icon variant="text" @click="deleteItem(item)">-->
<!--                    <VIcon size="24" color="error">mdi-delete</VIcon>-->
<!--                  </VBtn>-->
<!--                </template>-->
              </VDataTableServer>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
      </VCol>
      <VCol cols="4">
        <VExpansionPanels v-model="panelDataRegistrasi" class="mb-4">
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
                  <VChip v-if="item.label === 'Status'" :color="getColor(item.value)"
                         variant="outlined"
                         label
                  >
                    {{ item.value }}
                  </VChip>
                  <span v-else>
                    {{ item.value }}
                  </span>
                </VCol>
              </VRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <VExpansionPanels v-model="panelDokumenPersyaratan" class="mb-4">
          <VExpansionPanel>
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Dokumen Persyaratan
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <VList class="mb-4">
                <VListItem v-for="(item, index) in dokumenPersyaratan" :key="index" class="pa-1">
                  <VRow class="d-flex align-center">
                    <VCol cols="12" md="8">
                      <div class="text-body-1 font-weight-medium ">{{ index + 1 }}.{{ item.name }}</div>
                    </VCol>
                    <VCol cols="12" md="4" class="squareBtnIcon">
<!--                      <VBtn  icon variant="outlined" color="error" @click="deleteDokumenPersyaratan(item)">-->
<!--                        <VIcon >mdi-delete</VIcon>-->
<!--                      </VBtn>-->
                      <VBtn icon variant="outlined" color="purple" class="ml-2" @click="downloadFile(item.namafile)">
                        <VIcon color="primary">mdi-download</VIcon>
                      </VBtn>
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
<!--              <VDivider class="my-4"/>-->
<!--              <VRow class="d-flex justify-end ma-3">-->
<!--                <VBtn>-->
<!--                  Simpan-->
<!--                </VBtn>-->
<!--              </VRow>-->
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

<!--        <VExpansionPanels v-model="panelMelacak" class="mb-4">-->
<!--          <VExpansionPanel>-->
<!--            <VExpansionPanelTitle class="text-h4 font-weight-bold">-->
<!--              Melacak-->
<!--            </VExpansionPanelTitle>-->
<!--            <VExpansionPanelText>-->
<!--              <HalalTimeLine :event="[-->
<!--                { created_at: '09/09/2024',-->
<!--                  id: '1',-->
<!--                  status: 'Pengajuan',-->
<!--                  username: 'Samsul',-->
<!--                  comment: ''},-->
<!--              ]" />-->
<!--            </VExpansionPanelText>-->
<!--          </VExpansionPanel>-->
<!--        </VExpansionPanels>-->

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
                disabled
              />

              <VLabel for="noRekening">
                No. Rekening
              </VLabel>
              <VTextField
                class="mb-4"
                id="noRekening"
                v-model="dataRekeningBankDanNpwp.noRekening"
                disabled
              />

              <VLabel for="atasNama">
                Atas Nama
              </VLabel>
              <VTextField
                class="mb-4"
                id="atasNama"
                v-model="dataRekeningBankDanNpwp.atasNama"
                disabled
              />

              <VRow class="d-flex align-center mb-2">
                <VCol cols="12" md="8">
                  <div class="text-body-1 font-weight-medium ">Foto Rekening</div>
                </VCol>
                <VCol cols="12" md="4" class="squareBtnIcon">
                  <VBtn icon variant="outlined" color="purple" class="ml-2" @click="downloadFile(dataRekeningBankDanNpwp.fotoRekening)">
                    <VIcon color="primary">mdi-download</VIcon>
                  </VBtn>
                </VCol>
              </VRow>

<!--              <VLabel for="fotoRekening">-->
<!--                Upload Foto Rekening-->
<!--              </VLabel>-->
<!--              <VBtn block variant="outlined" color="purple" class="ml-2" @click="downloadDokumenPersyaratan(item)">-->
<!--                <VIcon color="primary">mdi-download</VIcon>-->
<!--              </VBtn>-->
<!--              <HalalFileInput-->
<!--                class="mb-4"-->
<!--                id="fotoRekening"-->
<!--                v-model="dataRekeningBankDanNpwp.fotoRekening"-->
<!--              />-->

              <VLabel for="npwp">
                NPWP
              </VLabel>
              <VTextField
                class="mb-4"
                id="npwp"
                v-model="dataRekeningBankDanNpwp.npwp"
                disabled
              />

              <VRow class="d-flex align-center">
                <VCol cols="12" md="8">
                  <div class="text-body-1 font-weight-medium ">Foto NPWP</div>
                </VCol>
                <VCol cols="12" md="4" class="squareBtnIcon">
                  <VBtn icon variant="outlined" color="purple" class="ml-2" @click="downloadFile(dataRekeningBankDanNpwp.fotoNpwp)">
                    <VIcon color="primary">mdi-download</VIcon>
                  </VBtn>
                </VCol>
              </VRow>

<!--              <VLabel for="fotoNpwp">-->
<!--                Upload Foto NPWP-->
<!--              </VLabel>-->
<!--              <VBtn block  variant="outlined" color="purple" class="ml-2" @click="downloadDokumenPersyaratan(item)">-->
<!--                <VIcon color="primary">mdi-download</VIcon>-->
<!--              </VBtn>-->
<!--              <HalalFileInput-->
<!--                class="mb-4"-->
<!--                id="fotoNpwp"-->
<!--                v-model="dataRekeningBankDanNpwp.fotoNpwp"-->
<!--              />-->

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
