<script setup lang="ts">
import { useDisplay } from 'vuetify'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const props = defineProps({
  existingFile: { type: Object, default: () => ({}) },
})

const emit = defineEmits(['confirm'])


const tabs = ref(0)

onMounted(() => {
  tabs.value = 0
})

const formTambahPemeriksaanManual = ref({
  nama: null,
  lokasi: null,
  tanggal: null
})


const isVisible = ref(false)
const openDialog = () => isVisible.value = true
const closeDialog = () => isVisible.value = false

const uploadedFile = ref(props.existingFile)

const addFile = async () => {
  emit("confirm", uploadedFile)
  closeDialog()
}

const addData = () => {
  emit("confirm", formTambahPemeriksaanManual)
  closeDialog()
}


const { mdAndUp } = useDisplay()

const dialogMaxWidth = computed(() => {
  return mdAndUp.value ? 700 : '90%'
})

</script>

<template>
  <div
    class="mb-2"
    color="primary"
  >
    <VBtn
      variant="outlined"
      append-icon="ri-add-line"
      @click="openDialog"
    >
      Tambah
    </VBtn>
    <VDialog
      v-model="isVisible"
      :max-width="dialogMaxWidth"
    >
      <VCard class="pa-2">
        <VCardTitle class="text-h5 font-weight-bold d-flex justify-space-between align-center">
          <span> Tambah Formulir Pemeriksaan </span>
          <VBtn
            icon
            color="transparent"
            style="border: none;"
            elevation="0"
            @click="closeDialog"
          >
            <VIcon color="black">
              ri-close-line
            </VIcon>
          </VBtn>
        </VCardTitle>
        <VCardItem>
          <div class="d-flex justify-center align-center">
            <VTabs
              v-model="tabs"
              align-tabs="center"
              bg-color="#f0dcf5"
              class="border pa-2"
              style="border-radius: 40px"
              height="auto"
            >
              <VTab
                value="1"
                base-color="#f0dcf5"
                active-color="primary"
                style="border-radius: 40px;"
                hide-slider
                color="primary"
                variant="flat"
                height="40px"
              >
                <span>Unggah File </span>
              </VTab>
              <VTab
                value="2"
                active-color="primary"
                base-color="#f0dcf5"
                style="border-radius: 40px;"
                hide-slider
                variant="flat"
                height="40px"
              >
                <span> Tambah Manual  </span>
              </VTab>
            </VTabs>
          </div>
          <VTabsWindow v-model="tabs">
            <br>
            <VTabsWindowItem value="1">
              <VRow no-gutters>
                <VCol
                  cols="6"
                  class="d-flex align-center"
                >
                  <span>
                    Unggah Pemeriksaan
                  </span>
                </VCol>
                <VCol cols="6">
                  <VFileInput
                    v-model="uploadedFile"
                    label="Pilih File"
                  />
                </VCol>
              </VRow>
              <VCardActions class="d-flex justify-end ga-2 mt-4">
                <VBtn
                  variant="outlined"
                  color="error"
                  min-width="100px"
                  @click="closeDialog"
                >
                  Batal
                </VBtn>
                <VBtn
                  variant="flat"
                  min-width="120px"
                  @click="addFile"
                >
                  Unggah
                </VBtn>
              </VCardActions>
            </VTabsWindowItem>

            <VTabsWindowItem value="2">
              <VLabel for="nama">
                Isi Nama
              </VLabel>
              <VTextField
                id="nama"
                density="compact"
                placeholder="Isi Nama "
                class="mb-4"
                v-model="formTambahPemeriksaanManual.nama"
              />

              <VLabel for="lokasi">
                Isi lokasi
              </VLabel>
              <VTextField
                id="lokasi"
                density="compact"
                placeholder="Isi lokasi "
                class="mb-4"
                v-model="formTambahPemeriksaanManual.lokasi"
              />
              <VLabel for="tanggalPemeriksaan">
                Isi Tanggal Pemeriksaan
              </VLabel>
              <VueDatePicker class="mb-4" teleport-center id="tanggalPemeriksaan" v-model="formTambahPemeriksaanManual.tanggal" :enable-time-picker="false" />

              <VCardActions class="d-flex justify-end ga-2 mt-4">
                <VBtn
                  variant="outlined"
                  color="error"
                  min-width="100px"
                  @click="closeDialog"
                >
                  Batal
                </VBtn>
                <VBtn
                  variant="flat"
                  min-width="120px"
                  @click="addData"
                >
                  Tambah
                </VBtn>
              </VCardActions>
            </VTabsWindowItem>
          </VTabsWindow>
        </VCardItem>
      </VCard>
    </VDialog>
  </div>
</template>

<style scoped lang="scss">
</style>
