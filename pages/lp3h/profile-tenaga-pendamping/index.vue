<script setup lang="ts">

const panelProfile = ref([0, 1])
const panelPenanggungJawab = ref([0, 1])

const panelDataRegistrasi = ref([0,1])
const panelDokumenPersyaratan = ref([0,1])
const panelMelacak = ref([0,1])


const dataProfilePendamping = [
  { label: "NIK", value: "322323232332" },
  { label: "Nama", value: "John Fren" },
  { label: "Alamat", value: "Sumbawa Banget, RT002/RW002, Sumbang, Curio Sumbawa Banget, RT002/RW002, Sumbang, Curio" },
  { label: "Provinsi", value: "Jawa Tengah" },
  { label: "Kota/Kab", value: "Kota Semarang" },
  { label: "Kecamatan", value: "Ngaliyan" },
  { label: "Kode Pos", value: "14045" },
  { label: "Email", value: "LPHLPPOM@gmail.com" },
  { label: "Telp /HP", value: "0812345678978" },
  { label: "Tempat Lahir", value: "Surabaya" },
  { label: "Pekerjaaan", value: "Lainnya" },


]

const dataNamaPenanggungJawab = [
  { label: "Nama Pimpinan", value: "Albert Flores" },
  { label: "No. HP Pimpinan", value: "0821178958123" }
]

const dataKontakPenanggungJawab = [
  { label: "Nama Kontak", value: "Robert Fox" },
  { label: "No. HP Kontak", value: "0821178958123" }
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
  { label: "Status", value: "Disetujui" },
  { label: "No. Registrasi", value: "1234567890789" },
  { label: "Tanggal Berlaku", value: "-" }
]

const documentLMS =[
  { name: "Pendalaman LMS" , id: "1"},
]

const dokumenPersyaratan = [
  { name: "Ijazah" , id: "1"},
  { name: "KTP", id: "2" },
  { name: "Sertifikat Pelatihan", id: "3" }

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
    <!-- <v-dialog v-model="dialog" max-width="700">
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
    </v-dialog> -->
    <!-- <VRow>
      <KembaliButton />
    </VRow> -->
    <VRow class="d-flex justify-space-between align-center">
      <VCol class="mb-8">
        <h3 class="text-h3">
          Tenaga Pendamping
        </h3>
      </VCol>
      <!-- <VCol cols="8">
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
      </VCol> -->
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
                <VCol cols="3" class="text-left font-weight-medium">
                  {{ item.label }}  
                </VCol>
                <VCol cols="1" class="text-left">
                  :
                </VCol>
                <VCol cols="12" class="pl-1 font-weight-medium">
                  <VTextField
                   v-if="item.label !== 'Alamat'"
                   v-model="item.value"
                    variant="outlined"
                   density="compact"
                   hide-details
                  readonly
                  />
             <VTextarea
              v-else
              v-model="item.value"
              variant="outlined"
              density="compact"
              hide-details
              readonly
              rows="2"
              auto-grow
               />
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
      <VCol cols="4">

        <VCard class="mb-4">
  <VCardTitle class="text-h4 font-weight-bold">
    LMS GreatEdu
  </VCardTitle>
  <VCardText>
    <VList class="mb-4">
      <VListItem v-for="(item, index) in documentLMS" :key="index" class="pa-1">
        <VRow class="d-flex align-center">
          <VCol cols="12" md="8">
            <div class="text-body-1 font-weight-medium">{{ item.name }}</div>
          </VCol>
          <VCol cols="12" md="4" class="squareBtnIcon">
                      :<VBtn icon variant="outlined" color="purple" class="ml-2" @click="downloadDokumenPersyaratan(item)">
                        <VIcon color="primary">mdi-download</VIcon>
                      </VBtn>
                    </VCol>
        </VRow>
      </VListItem>
    </VList>
  </VCardText>
</VCard>


        <VExpansionPanels v-model="panelDataRegistrasi" class="mb-4">
          <VExpansionPanel>
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
            Status Registrasi
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
                      <div class="text-body-1 font-weight-medium ">{{ item.name }}</div>
                    </VCol>
                  <VCol cols="12" md="4" class="squareBtnIcon">
                      :<VBtn icon variant="outlined" color="purple" class="ml-2" @click="downloadDokumenPersyaratan(item)">
                        <VIcon color="primary">mdi-download</VIcon>
                      </VBtn>
                    </VCol>
                  </VRow>
                </VListItem>
              </VList>
              <VRow>
                <!-- <VCol cols="2" >
                  <span style="color: red;">Info :</span>
                </VCol>
                <VCol cols="8">
                  <span>
                    File yang akan di upload dengan extension XLSX, PDF, dan JPG dan kapasitas maksimal 50 Mb untuk sekali Upload.
                  </span>
                </VCol> -->
              </VRow>
              <!-- <VDivider class="my-4"/>
              <VRow class="d-flex justify-end ma-3">
                <VBtn>
                  Simpan
                </VBtn>
              </VRow> -->
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
