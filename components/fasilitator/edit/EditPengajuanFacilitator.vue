<script setup lang="ts">
import { ref } from 'vue'
import SaveChangeConfirmation from '@/components/fasilitator/edit/SaveChangeConfirmation.vue'

const form = ref({
  facilitatorName: 'Sir Crocodile',
  facilitationProgramName: 'Dummy Program Name',
  explanationOfFacilitation: 'Dummy Penjelasan Fasilitasi',
  year: 2008,
  regionalScope: 'Jakarta',
  startDate: '2024-10-01',
  endDate: '2024-12-12',
  type: 'Fasilitas 1',
  sourceOfFund: 'Pembiayaan 1',
  kuota: 100,
  picName: 'Mr. White',
  picPhoneNumber: '08999999999',
  facilityCode: "",
  status: "Draft"
})

const snakeBar = useSnackbar()

const saveForm = () => {
  console.log('INPUT APPROVE NYA DISINI YA : ')
  snakeBar.sendSnackbar('Submission Successfully Approved ', 'success')
}
</script>

<template>
  <VRow>
    <VCol cols="8">
      <ExpandCard
        title="Data Fasilitasi"
        class="mb-6 pa-8"
      >
        <VForm>
          <VRow>
            <VCol cols="12">
              <label
                class="text-h6"
                for="facilitatorName"
              >Nama Facilitator </label>
              <VTextField
                id="facilitatorName"
                v-model="form.facilitatorName"
                outlined
                disabled
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <label
                class="text-h6"
                for="facilitationProgramName"
              > Nama Program Fasilitasi </label>
              <VTextField
                id="facilitationProgramName"
                v-model="form.facilitationProgramName"
                placeholder="isi nama program fasilitasi"
                outlined
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <label
                class="text-h6"
                for="explanationOfFacilitation"
              > Penjelasan Fasilitasi </label>
              <VTextField
                id="explanationOfFacilitation"
                v-model="form.explanationOfFacilitation"
                placeholder="isi penjelasan fasilitasi"
                outlined
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <label
                class="text-h6"
                for="year"
              > Tahun </label>
              <VAutocomplete
                id="year"
                v-model="form.year"
                :items="Array.from({ length: 50 }, (_, i) => ({ year: new Date().getFullYear() - i }).year)"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <label
                class="text-h6"
                for="year"
              > Lingkup Wilayah Fasilitasi </label>
              <VAutocomplete
                id="year"
                v-model="form.regionalScope"
                :items="['Jakarta', 'Bandung', 'Medan', 'Surabaya']"
                placeholder="Pilih lingkup wilayah"
                solo
                clearable
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <label
                class="text-h6"
                for="startDate"
              > Tanggal Mulai </label>
              <VTextField
                id="startDate"
                v-model="form.startDate"
                type="date"
                placeholder="Pilih tanggal mulai"
                clearable
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <label
                class="text-h6"
                for="endDate"
              > Tanggal Selesai </label>
              <VTextField
                id="endDate"
                v-model="form.endDate"
                type="date"
                placeholder="Pilih tanggal mulai"
                clearable
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <label
                class="text-h6"
                for="type"
              > Jenis Fasilitasi </label>
              <VAutocomplete
                id="type"
                v-model="form.type"
                :items="['Fasilitas 1', 'Fasilitas 2', 'Fasilitas 3', 'Fasilitas 4']"
                placeholder="Pilih jenis fasilitasi"
                solo
                clearable
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <label
                class="text-h6"
                for="sourceOfFund"
              > Sumber Pembiayaan </label>
              <VAutocomplete
                id="sourceOfFund"
                v-model="form.sourceOfFund"
                :items="['Pembiayaan 1', 'Pembiayaan 2', 'Pembiayaan 3', 'Pembiayaan 4']"
                placeholder="Pilih sumber pembiayaan"
                solo
                clearable
              />
            </VCol>
          </VRow>

          <VRow>
            <VCol cols="12">
              <label
                class="text-h6"
                for="kuota"
              > Kuota </label>
              <VTextField
                id="kuota"
                v-model="form.kuota"
                placeholder="isi kuota"
                outlined
              />
            </VCol>
          </VRow>

          <VRow>
            <VCol cols="12">
              <label
                class="text-h6"
                for="picName"
              > Nama penanggungjawab program </label>
              <VTextField
                id="picName"
                v-model="form.picName"
                placeholder="isi nama penanggungjawab program"
                outlined
              />
            </VCol>
          </VRow>

          <VRow>
            <VCol cols="12">
              <label
                class="text-h6"
                for="picPhoneNumber"
              > Nomor Kontak Penanggungjawab program </label>
              <VTextField
                id="picPhoneNumber"
                v-model="form.picPhoneNumber"
                placeholder="isi nomor kontak penanggungjawab program"
                outlined
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol
              cols="12"
              class="text-right"
            >
              <SaveChangeConfirmation @confirm="saveForm" />
            </VCol>
          </VRow>
        </VForm>
      </ExpandCard>
    </VCol>

    <VCol cols="4">
      <ExpandCard title="Status Registrasi">
        <VRow no-gutters class="d-flex justify-center align-center">
          <VCol cols="6">
            <span class="text-h6">Status</span>
          </VCol>
          <VCol cols="6">
            <VChip label outlined color="primary" text-color="white">{{form.status}}</VChip>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="6">
            <span class="text-h6">Kode Fasilitas</span>
          </VCol>
        </VRow>
      </ExpandCard>
    </VCol>
  </VRow>
</template>

<style scoped lang="scss">
.custom-date-input .v-input__control {
  position: relative;
}

.custom-date-input input[type="date"] {
  padding-right: 40px;
}

.custom-date-input .v-input__icon--append {
  right: 0;
}
</style>
