<script setup lang="ts">

const panelProfile = ref([0, 1])
const panelPenanggungJawab = ref([0, 1])
const panelDataPendamping = ref([0, 1])
const panelDataRegistrasi = ref([0,1])
const panelDokumenPersyaratan = ref([0,1])
const panelMelacak = ref([0,1])


const dataProfilePendamping = [
  { label: "Nama Lembaga", value: "Lembaga AB761" },
  { label: "Jenis Lembaga", value: "Komisi Fatwa MUI Provinsi" },
  { label: "Alamat", value: "Sumbawa Banget, RT002/RW002, Sumbang, Curio Sumbawa Banget, RT002/RW002, Sumbang, Curio" },
  { label: "Kecamatan", value: "-" },
  { label: "Kode Pos", value: "14045" },
  { label: "Kota/Kab", value: "Kab. Enrekang" },
  { label: "Provinsi", value: "Pusat" },
  { label: "Email", value: "LembagaAB761@gmail.com" }
]

const dataNamaPenanggungJawab = [
  { label: "Nama Pimpinan", value: "Albert Flores" },
  { label: "No. HP Pimpinan", value: "0821178958123" }
]

const dataKontakPenanggungJawab = [
  { label: "Nama Kontak", value: "Robert Fox" },
  { label: "No. HP Kontak", value: "0821178958123" }
]

const dataPendampingHeader = [
  { title: "No", key: "no"},
  { title: "NIK", key: "nik"},
  { title: "Pendidikan", key: "pendidikan"},
  { title: "Ijazah", key: "ijazah"},
  { title: "KTP", key: "ktp"},
  { title: "No. Register", key: "noRegister", nowrap: true},
  { title: "Tanggal Berlaku", key: "tanggalBerlaku", nowrap: true},
  { title: "Status Registrasi", key: "status", nowrap: true},
  { title: "Action", key: "action"}
]

const dataPendampingItem = [
  { nik: "123412341234", pendidikan: "S1", noRegister: "123456789", tanggalBerlaku: "-", status: "Disetujui"}
]


const deleteItem = (item) => {
  console.log("ITEM DELETE : ", item)
}

const previewIjazah = (item) => {
  console.log("PREVIEW IJAZAH : ", item)
}

const previewKtp = (item) => {
  console.log("PREVIEW KTP : ", item)
}

const dataRegistrasi = [
  { label: "No. Registrasi", value: "1234567890789" },
  { label: "Tanggal Berlaku", value: "1/14/2027 10:00:00 AM" },
  { label: "Status", value: "Disetujui" }
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
const ajukanHandler = () => {
  console.log("AJUKAN SEBAGAI LEMBAGA PENDAMPING : ")
  dialog.value = false
  useSnackbar().sendSnackbar("Berhasil mengirim pengajuan ", "success")
}

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
          <VBtn append-icon="fa-paper-plane" @click="dialog = true">
            Ajukan
          </VBtn>
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
              >
                <template #item.no="{ index }">
                  {{ index + 1 }}
                </template>

                <template #item.ijazah="{ item }">
                  <VBtn icon variant="text" @click="previewIjazah(item)">
                    <VIcon size="24" color="primary">mdi-eye</VIcon>
                  </VBtn>
                </template>

                <template #item.ktp="{ item }">
                  <VBtn icon variant="text" @click="previewKtp(item)">
                    <VIcon size="24" color="primary">mdi-eye</VIcon>
                  </VBtn>
                </template>

                <template #item.status="{ item }">
                  <VChip :color="item.status === 'Disetujui' ? 'success' : 'error'"
                         variant="outlined"
                         label
                  >
                    {{ item.status }}
                  </VChip>
                </template>

                <template #item.action="{ item }">
                  <VBtn icon variant="text" @click="deleteItem(item)">
                    <VIcon size="24" color="error">mdi-delete</VIcon>
                  </VBtn>
                </template>
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
                  <VChip v-if="item.label === 'Status'" :color="item.value === 'Disetujui' ? 'success' : 'error'"
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
                      <VBtn  icon variant="outlined" color="error" @click="deleteDokumenPersyaratan(item)">
                        <VIcon >mdi-delete</VIcon>
                      </VBtn>
                      <VBtn icon variant="outlined" color="purple" class="ml-2" @click="downloadDokumenPersyaratan(item)">
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
              <VDivider class="my-4"/>
              <VRow class="d-flex justify-end ma-3">
                <VBtn>
                  Simpan
                </VBtn>
              </VRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <VExpansionPanels v-model="panelMelacak" class="mb-4">
          <VExpansionPanel>
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Melacak
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <HalalTimeLine :event="[
                { created_at: '09/09/2024',
                  id: '1',
                  status: 'Pengajuan',
                  username: 'Samsul',
                  comment: ''},
              ]" />
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
