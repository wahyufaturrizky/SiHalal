<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const form = ref({
  name: null,
  idNo: null,
  religion: null,
  cerificateDate: null,
  cerificateNumber: null,
  skNumber: null,
  phoneNumber: null,
  skDate: null,
  skph: null,
  spph: null,
  ktp: null
})

</script>

<template>
  <div class="ma-1">
    <VBtn @click="openDialog" variant="outlined" append-icon="ri-add-line">
      Tambah
    </VBtn>
    <VDialog
      v-model="isVisible"
      :max-width="dialogMaxWidth"
    >
      <VCard class="pa-2">
        <VCardTitle class="text-h5 font-weight-bold d-flex justify-space-between align-center">
          <span>Tambah Data Penyelia Halal</span>
          <VBtn
            icon
            color="transparent"
            style="border: none;"
            elevation="0"
            @click="closeDialog"
          >
            <VIcon color="black">ri-close-line</VIcon>
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
              <VLabel for="phoneNumber" >
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
              <VueDatePicker placeholder="Isi Tanggal Sertifikat" teleport-center id="tanggalDocument" v-model="form.certificateDate" :enable-time-picker="false" />

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
          <VFileInput
            v-model="form.skph"
            label="Unggah Sertifikat Kompetensi Penyelia Halal"
            outlined
            dense
            accept=".pdf,.jpg,.png"
            class="mb-2"
          />
          <VFileInput
            v-model="form.spph"
            label="Unggah Sertifikat Pelatihan Penyelia Halal"
            outlined
            dense
            accept=".pdf,.jpg,.png"
            class="mb-2"
          />
          <VFileInput
            v-model="form.ktp"
            label="Unggah KTP"
            outlined
            dense
            accept=".pdf,.jpg,.png"
            class="mb-2"
          />
        </VCardText>

        <div class="d-flex justify-end gap-2">
          <VBtn @click="cancel" variant="outlined">
            Batal
          </VBtn>
          <VBtn @click="confirm" color="primary">
            Tambah
          </VBtn>
        </div>
      </VCard>
    </VDialog>
  </div>
</template>

<style scoped lang="scss">

</style>
