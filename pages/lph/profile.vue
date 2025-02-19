<script setup lang="ts">
const panelRegistration = ref([0, 1]);

const isLoading = ref<boolean>(false)
const profileData = reactive<any>({
  id: "",
  nama: "",
  jenis_lembaga: "",
  alamat: "",
  provinsi_id: "",
  provinsi: "",
  kota_id: "",
  kota: "",
  kecamatan_id: "",
  kecamatan: "",
  email: "",
  bangunan: "",
  jumlah_auditor: 0,
  jumlah_cabang: 0,
  lab: "",
  // Data PIC
  pic_nama_pimpinan: "",
  pic_nohp_pimpinan: "",
  pic_nama_kontak: "",
  pic_nohp_kontak: "",
  // Data Rekening & NPWP
  rekening: {
    bank: "",
    no_rekening: "",
    nama: "",
    npwp: ""
  },
  // Data Registrasi
  reg_status: "",
  reg_nomor: "",
  reg_tgl_berlaku: "",
  file_sertifikat: "",
})
// const trackingDetail = ref([]);

const loadProfile = async () => {
  isLoading.value = true
  try {
    const response: any = await $api('/reguler/lph/profile', {
      method: 'get',
    } as any)

    if (response?.code === 2000) {
      Object.assign(profileData, response?.data)
    }
    isLoading.value = false
    return response
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
    isLoading.value = false
  }
}

const handleDownload = async (filename: string) => {
  return await downloadDocument(filename, "FILES");
};

// const isOpenModal = ref(false);
// const handleOpenModal = () => {
//   isOpenModal.value = !isOpenModal.value;
// };
// const handleSentSubmission = async () => {
//   useSnackbar().sendSnackbar("Berhasil mengirim pengajuan data", "success");
//   return
// }

onMounted(() => {
  loadProfile()
})
</script>

<template>
  <VRow no-gutters>
    <VCol class="d-flex align-center justify-space-between">
      <h1 style="font-size: 32px">
        Lembaga Pemeriksa Halal
      </h1>
      <!-- <VBtn variant="outlined" text="Ajukan" append-icon="fa-paper-plane"/> -->
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="8">
      <VCard class="mb-10 pt-3">
        <VCardTitle class="mb-5">
          <div class="font-weight-bold text-h4">
            Profil Lembaga Pemeriksa Halal
          </div>
        </VCardTitle>
        <VCardText>
          <div class="mb-3">
            <div class="font-weight-bold mb-1">Nama Lembaga</div>
            <VTextField
              :model-value="profileData.nama ? profileData.nama : '-'"
              bg-color="#F6F6F6"
              density="compact"
              rounded="xl"
              readonly
              disabled
            />
          </div>
          <div class="mb-3">
            <div class="font-weight-bold mb-1">Jenis Lembaga</div>
            <VSelect
              :model-value="profileData.jenis_lembaga ? profileData.jenis_lembaga : '-'"
              bg-color="#F6F6F6"
              density="compact"
              rounded="xl"
              readonly
              disabled
              menu-icon="fa-chevron-down"
            />
          </div>
          <div class="mb-3">
            <div class="font-weight-bold mb-1">Alamat</div>
            <VTextField
              :model-value="profileData.alamat ? profileData.alamat : '-'"
              bg-color="#F6F6F6"
              density="compact"
              rounded="xl"
              readonly
              disabled
            />
          </div>
          <div class="mb-3">
            <div class="font-weight-bold mb-1">Provinsi</div>
            <VSelect
              :model-value="profileData.provinsi ? profileData.provinsi : '-'"
              bg-color="#F6F6F6"
              density="compact"
              rounded="xl"
              readonly
              disabled
              menu-icon="fa-chevron-down"
            />
          </div>
          <div class="mb-3">
            <div class="font-weight-bold mb-1">Kab/Kota</div>
            <VSelect
              :model-value="profileData.kota ? profileData.kota : '-'"
              bg-color="#F6F6F6"
              density="compact"
              rounded="xl"
              readonly
              disabled
              menu-icon="fa-chevron-down"
            />
          </div>
          <div class="mb-3">
            <div class="font-weight-bold mb-1">Kecamatan</div>
            <VSelect
              :model-value="profileData.kecamatan ? profileData.kecamatan : '-'"
              bg-color="#F6F6F6"
              density="compact"
              rounded="xl"
              readonly
              disabled
              menu-icon="fa-chevron-down"
            />
          </div>
          <div class="mb-3">
            <div class="font-weight-bold mb-1">Email</div>
            <VTextField
              :model-value="profileData.email ? profileData.email : '-'"
              bg-color="#F6F6F6"
              density="compact"
              rounded="xl"
              readonly
              disabled
            />
          </div>
          <div class="mb-3">
            <div class="font-weight-bold mb-1">Bangunan LPH</div>
            <VSelect
              :model-value="profileData.bangunan ? profileData.bangunan : '-'"
              bg-color="#F6F6F6"
              density="compact"
              rounded="xl"
              readonly
              disabled
              menu-icon="fa-chevron-down"
            />
          </div>
          <div class="mb-3">
            <div class="font-weight-bold mb-1">Jumlah Auditor Halal</div>
            <VTextField
              :model-value="profileData.jumlah_auditor ? profileData.jumlah_auditor : '-'"
              bg-color="#F6F6F6"
              density="compact"
              rounded="xl"
              readonly
              disabled
            />
          </div>
          <div class="mb-3">
            <div class="font-weight-bold mb-1">Jumlah Kantor Cabang</div>
            <VTextField
              :model-value="profileData.jumlah_cabang ? profileData.jumlah_cabang : '-'"
              bg-color="#F6F6F6"
              density="compact"
              rounded="xl"
              readonly
              disabled
            />
          </div>
          <div>
            <div class="font-weight-bold mb-1">Memiliki Lab</div>
            <VSelect
              :model-value="profileData.lab ? profileData.lab : '-'"
              bg-color="#F6F6F6"
              density="compact"
              rounded="xl"
              readonly
              disabled
              menu-icon="fa-chevron-down"
            />
          </div>
        </VCardText>
      </VCard>
      <VCard class="mb-10 pt-3">
        <VCardTitle class="mb-5">
          <div class="font-weight-bold text-h4">
            Penanggung Jawab
          </div>
        </VCardTitle>
        <VCardText>
          <VRow>
            <VCol cols="6">
              <div class="font-weight-bold mb-1">Nama Pimpinan</div>
              <VTextField
                :model-value="profileData.pic_nama_pimpinan ? profileData.pic_nama_pimpinan : '-'"
                bg-color="#F6F6F6"
                density="compact"
                rounded="xl"
                readonly
                disabled
              />
            </VCol>
            <VCol cols="6">
              <div class="font-weight-bold mb-1">No. HP</div>
              <VTextField
                :model-value="profileData.pic_nohp_pimpinan ? profileData.pic_nohp_pimpinan : '-'"
                bg-color="#F6F6F6"
                density="compact"
                rounded="xl"
                readonly
                disabled
              />
            </VCol>
          </VRow>
          <VDivider class="mt-4 mb-3"/>
          <VRow>
            <VCol cols="6">
              <div class="font-weight-bold mb-1">Nama Kontak</div>
              <VTextField
                :model-value="profileData.pic_nama_kontak ? profileData.pic_nama_kontak : '-'"
                bg-color="#F6F6F6"
                density="compact"
                rounded="xl"
                readonly
                disabled
              />
            </VCol>
            <VCol cols="6">
              <div class="font-weight-bold mb-1">No. HP</div>
              <VTextField
                :model-value="profileData.pic_nohp_kontak ? profileData.pic_nohp_kontak : '-'"
                bg-color="#F6F6F6"
                density="compact"
                rounded="xl"
                readonly
                disabled
              />
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
      <VCard class="mb-10 pt-3">
        <VCardTitle class="mb-5">
          <div class="font-weight-bold text-h4">
            Data Rekening Bank & NPWP
          </div>
        </VCardTitle>
        <VCardText>
          <div class="mb-3">
            <div class="font-weight-bold mb-1">Nama Bank</div>
            <VTextField
              :model-value="profileData.rekening.bank ? profileData.rekening.bank : '-'"
              bg-color="#F6F6F6"
              density="compact"
              rounded="xl"
              readonly
              disabled
            />
          </div>
          <div class="mb-3">
            <div class="font-weight-bold mb-1">No. Rekening</div>
            <VTextField
              :model-value="profileData.rekening.no_rekening ? profileData.rekening.no_rekening : '-'"
              bg-color="#F6F6F6"
              density="compact"
              rounded="xl"
              readonly
              disabled
            />
          </div>
          <div class="mb-3">
            <div class="font-weight-bold mb-1">Atas Nama</div>
            <VTextField
              :model-value="profileData.rekening.nama ? profileData.rekening.nama  : '-'"
              bg-color="#F6F6F6"
              density="compact"
              rounded="xl"
              readonly
              disabled
            />
          </div>
          <div class="mb-3 w-50">
            <div class="font-weight-bold mb-1">Upload Foto Rekening</div>
            <VTextField
              class="custom-file-input"
              bg-color="#F6F6F6"
              density="compact"
              rounded="xl"
              disabled
              readonly
              placeholder="No file choosen"
            >
              <template #append-inner>
                <VBtn rounded="s-0 e-xl" color="#A09BA1" text="Choose File" />
              </template>
            </VTextField>
          </div>
          <div class="mb-3">
            <div class="font-weight-bold mb-1">NPWP</div>
            <VTextField
              :model-value="profileData.npwp ? profileData.npwp : '-'"
              bg-color="#F6F6F6"
              density="compact"
              rounded="xl"
              readonly
              disabled
            />
          </div>
          <div class="w-50">
            <div class="font-weight-bold mb-1">Upload Foto NPWP</div>
            <VTextField
              class="custom-file-input"
              bg-color="#F6F6F6"
              density="compact"
              rounded="xl"
              disabled
              readonly
              placeholder="No file choosen"
            >
              <template #append-inner>
                <VBtn rounded="s-0 e-xl" color="#A09BA1" text="Choose File" />
              </template>
            </VTextField>
          </div>
        </VCardText>
      </VCard>
    </VCol>
    <VCol cols="4">
      <VExpansionPanels
        v-model="panelRegistration"
        expand-icon="fa-chevron-down"
        collapse-icon="fa-chevron-up"
        class="mb-4"
      >
        <VExpansionPanel class="py-2">
          <VExpansionPanelTitle class="text-h4 font-weight-bold">
            Data Registrasi
          </VExpansionPanelTitle>
          <VExpansionPanelText class="d-flex align-center">
            <VRow no-gutters class="my-2 text-body-1 d-flex align-center" style="font-weight: 600;">
              <VCol cols="6" >
                Status
              </VCol>
              <VCol cols="1" class="text-right px-2">
                :
              </VCol>
              <VCol cols="5">
                <v-chip
                  v-if="profileData.reg_status"
                  style="background: #EDF6ED"
                  color="#49A84C"
                  variant="outlined"
                  rounded="xl"
                >
                  {{ profileData.reg_status }}
                </v-chip>
                <div v-else>
                  -
                </div>
              </VCol>
            </VRow>
            <VRow no-gutters class="my-2 text-body-1 d-flex align-center" style="font-weight: 600;">
              <VCol cols="6" >
                No. Registrasi
              </VCol>
              <VCol cols="1" class="text-right px-2">
                :
              </VCol>
              <VCol cols="5">
                {{ profileData.reg_nomor ? profileData.reg_nomor : "-" }}
              </VCol>
            </VRow>
            <VRow no-gutters class="my-2 text-body-1 d-flex align-center" style="font-weight: 600;">
              <VCol cols="6" >
                Tanggal Berlaku
              </VCol>
              <VCol cols="1" class="text-right px-2">
                :
              </VCol>
              <VCol cols="5">
                {{ profileData.reg_tgl_berlaku ? profileData.reg_tgl_berlaku : "-" }}
              </VCol>
            </VRow>
            <VRow no-gutters class="my-2 text-body-1 d-flex align-center" style="font-weight: 600;">
              <VCol cols="6" >
                Download Sertifikat
              </VCol>
              <VCol cols="1" class="text-right px-2">
                :
              </VCol>
              <VCol cols="5">
                <VBtn
                  @click="profileData.file_sertifikat ? handleDownload(profileData.file_sertifikat) : null"
                  :color="profileData.file_sertifikat ? 'primary' : '#A09BA1'"
                  density="compact"
                  class="px-2"
                >
                  <template #default>
                    <VIcon icon="fa-download" />
                  </template>
                </VBtn>
              </VCol>
            </VRow>
          </VExpansionPanelText>
        </VExpansionPanel>
      </VExpansionPanels>
      <!-- <br/>
      <VCard>
        <VCardTitle class="mb-5">
          <div class="font-weight-bold text-h4">
            Melacak
          </div>
        </VCardTitle>
        <VCardText>
          <Tracking :data="trackingDetail" />
        </VCardText>
      </VCard> -->
    </VCol>
  </VRow>
  <!-- <ConfirmModal
    dialog-title="Mengirim Pengajuan"
    :dialog-visible="isOpenModal"
    @update:dialog-visible="isOpenModal = $event"
  >
    <VCardText>
      Apakah yakin ingin mengirimkan pengajuan data ini?
    </VCardText>
    <VCardActions class="px-4">
      <VBtn variant="outlined" class="px-4 me-3" @click="handleOpenModal"
        >Batal</VBtn
      >
      <VBtn
        variant="flat"
        class="px-4"
        color="error"
        @click="[handleSentSubmission(), handleOpenModal()]"
      >
        Ya, Kirim
      </VBtn>
    </VCardActions>
  </ConfirmModal> -->
</template>

<style lang="scss">
.custom-file-input {
  .v-field--appended {
    padding-inline-end: 0 !important;
  }
}
</style>
