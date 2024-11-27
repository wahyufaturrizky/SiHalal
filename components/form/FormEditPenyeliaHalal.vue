<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { useDisplay } from 'vuetify'


const props = defineProps({
  initialData: { type: Object, default: () => ({}) },
})

const emit = defineEmits(['confirm'])

const isVisible = ref(false)

const openDialog = () => {
  isVisible.value = true
}

const closeDialog = () => {
  isVisible.value = false
}

const form = ref(props.initialData)

const confirm = () => {
  emit('confirm', form.value)
  closeDialog()
}

const cancel = () => {
  closeDialog()
}

const { mdAndUp } = useDisplay()

const dialogMaxWidth = computed(() => {
  return mdAndUp.value ? 700 : '90%'
})
</script>

<template>
  <VBtn variant="text" prepend-icon="ri-edit-line"
        @click="openDialog" block >
    Ubah
  </VBtn>
  <VDialog
    v-model="isVisible"
    :max-width="dialogMaxWidth"
  >
    <VCard class="pa-2">
      <VCardTitle class="text-h5 font-weight-bold d-flex justify-space-between align-center">
        <span>Ubah Data Penyelia Halal</span>
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
      <VCardText>
        <VRow>
          <VCol cols="6">
            <VLabel for="idNo">
              No. KTP
            </VLabel>
            <VTextField
              id="idNo"
              v-model="form.idNo"
              placeholder="Isi Nomor KTP"
              outlined
              dense
              required
            />
          </VCol>
          <VCol cols="6">
            <VLabel for="phoneNumber">
              No. Kontak
            </VLabel>
            <VTextField
              id="phoneNumber"
              v-model="form.phoneNumber"
              placeholder="Isi Nomor Kontak"
              outlined
              dense
              required
            />
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="6">
            <VLabel for="">
              Nama Penyelia
            </VLabel>
            <VTextField
              v-model="form.name"
              placeholder="Isi Nama Penyelia"
              outlined
              dense
              required
            />
          </VCol>
          <VCol cols="6">
            <VLabel for="religion">
              Agama Penyelia
            </VLabel>
            <VSelect
              id="religion"
              v-model="form.religion"
              :items="['Islam', 'Kristen', 'Hindu', 'Buddha', 'Konghucu']"
              placeholder="Agama Penyelia"
              outlined
              dense
              required
            />
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="6">
            <VLabel for="cerificateNumber">
              Nomor Sertifikat
            </VLabel>
            <VTextField
              id="cerificateNumber"
              v-model="form.cerificateNumber"
              placeholder="Nomor Sertifikat"
              outlined
              dense
              required
            />
          </VCol>
          <VCol cols="6">
            <VLabel for="certificateDate">
              Tanggal Sertifikat
            </VLabel>
            <VueDatePicker
              id="tanggalDocument"
              v-model="form.certificateDate"
              placeholder="Isi Tanggal Sertifikat"
              teleport-center
              :enable-time-picker="false"
            />
          </VCol>
        </VRow>
        <VRow class="mb-2">
          <VCol cols="6">
            <VLabel for="skNumber">
              Nomor SK
            </VLabel>
            <VTextField
              id="skNumber"
              v-model="form.skNumber"
              placeholder="Isi Nomor SK"
              outlined
              dense
              required
            />
          </VCol>
          <VCol cols="6">
            <VLabel for="skDate">
              Tanggal SK
            </VLabel>
            <VTextField
              id="skDate"
              v-model="form.skDate"
              placeholder="Isi Tanggal SK"
              outlined
              dense
              required
              type="date"
            />
          </VCol>
        </VRow>
        <VRow class="d-flex justify-space-between align-center">
          <VCol cols="6">
            <VLabel for="skph">
              <strong>Unggah Sertifikat Kompetensi Penyelia Halal</strong>
            </VLabel>
          </VCol>
          <VCol cols="5">
            <VFileInput
              id="skph"
              v-model="form.skph"
              clearable
              :label="form.skph ? '' : 'Choose File'"
              outlined
              dense
              class="border rounded pa-0"
              clear-icon="ri-delete-bin-6-line"
              variant="plain"
              prepend-icon="none"
            />
          </VCol>
        </VRow>

        <VRow class="d-flex justify-space-between align-center">
          <VCol cols="6">
            <VLabel for="skph">
              <strong>Unggah Sertifikat Pelatihan Penyelia Halal</strong>
            </VLabel>
          </VCol>
          <VCol cols="5">
            <VFileInput
              id="skph"
              v-model="form.spph"
              clearable
              :label="form.spph ? '' : 'Choose File'"
              outlined
              dense
              class="border rounded pa-0"
              clear-icon="ri-delete-bin-6-line"
              variant="plain"
              prepend-icon="none"
            />
          </VCol>
        </VRow>
        <VRow class="d-flex justify-space-between align-center mb-4">
          <VCol cols="6">
            <VLabel for="ktp">
              <strong>Unggah KTP</strong>
            </VLabel>
          </VCol>
          <VCol cols="5">
            <VFileInput
              id="ktp"
              v-model="form.ktp"
              clearable
              :label="form.ktp ? '' : 'Choose File'"
              outlined
              dense
              class="border rounded pa-0"
              clear-icon="ri-delete-bin-6-line"
              variant="plain"
              prepend-icon="none"
            />
          </VCol>
        </VRow>
      </VCardText>

      <div class="d-flex justify-end gap-2">
        <VBtn
          variant="outlined"
          @click="cancel"
        >
          Batal
        </VBtn>
        <VBtn
          color="primary"
          @click="confirm"
        >
          Simpan
        </VBtn>
      </div>
    </VCard>
  </VDialog>
</template>

<style scoped lang="scss">

</style>
