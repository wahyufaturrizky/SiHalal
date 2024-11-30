<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  dataform: {
    type: Object,
    required: true,
  },
  datadetailregistration: {
    type: Object,
    required: true,
  },
});

const { dataform } = props || {};

const form = ref({
  facilitatorName: "",
  facilitationProgramName: "",
  explanationOfFacilitation: "",
  year: "",
  regionalScope: "",
  startDate: "",
  endDate: "",
  type: "",
  sourceOfFund: "",
  kuota: "",
  picName: "",
  picPhoneNumber: "",
  facilityCode: "",
  status: "",
});

const openPanelRegisterData = ref(0);

const onInitData = () => {
  console.log("@onInitData");

  form.value = { ...dataform };
};

onMounted(() => {
  onInitData();
});
</script>

<template>
  <VRow>
    <VCol cols="8">
      <ExpandCard title="Data Fasilitasi" class="mb-6 pa-8">
        <VForm>
          <VRow>
            <VCol cols="12">
              <label class="text-h6" for="facilitatorName"
                >Nama Facilitator
              </label>
              <VTextField
                id="facilitatorName"
                v-model="form.facilitatorName"
                outlined
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <label class="text-h6" for="facilitationProgramName">
                Nama Program Fasilitasi
              </label>
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
              <label class="text-h6" for="explanationOfFacilitation">
                Penjelasan Fasilitasi
              </label>
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
              <label class="text-h6" for="year"> Tahun </label>
              <VAutocomplete
                id="year"
                v-model="form.year"
                :items="
                  Array.from(
                    { length: 50 },
                    (_, i) => ({ year: new Date().getFullYear() - i }.year)
                  )
                "
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <label class="text-h6" for="year">
                Lingkup Wilayah Fasilitasi
              </label>
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
              <label class="text-h6" for="startDate"> Tanggal Mulai </label>
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
              <label class="text-h6" for="endDate"> Tanggal Selesai </label>
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
              <label class="text-h6" for="type"> Jenis Fasilitasi </label>
              <VAutocomplete
                id="type"
                v-model="form.type"
                :items="[
                  'Fasilitas 1',
                  'Fasilitas 2',
                  'Fasilitas 3',
                  'Fasilitas 4',
                ]"
                placeholder="Pilih jenis fasilitasi"
                solo
                clearable
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <label class="text-h6" for="sourceOfFund">
                Sumber Pembiayaan
              </label>
              <VAutocomplete
                id="sourceOfFund"
                v-model="form.sourceOfFund"
                :items="[
                  'Pembiayaan 1',
                  'Pembiayaan 2',
                  'Pembiayaan 3',
                  'Pembiayaan 4',
                ]"
                placeholder="Pilih sumber pembiayaan"
                solo
                clearable
              />
            </VCol>
          </VRow>

          <VRow>
            <VCol cols="12">
              <label class="text-h6" for="kuota"> Kuota </label>
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
              <label class="text-h6" for="picName">
                Nama penanggungjawab program
              </label>
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
              <label class="text-h6" for="picPhoneNumber">
                Nomor Kontak Penanggungjawab program
              </label>
              <VTextField
                id="picPhoneNumber"
                v-model="form.picPhoneNumber"
                placeholder="isi nomor kontak penanggungjawab program"
                outlined
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12" class="text-right">
              <SaveChangeConfirmation :form="form" />
              />
            </VCol>
          </VRow>
        </VForm>
      </ExpandCard>
    </VCol>

    <VCol cols="4">
      <VExpansionPanels v-model="openPanelRegisterData">
        <VExpansionPanel>
          <VExpansionPanelTitle>
            <h2>Status Registration</h2>
          </VExpansionPanelTitle>
          <VExpansionPanelText>
            <RegisterDataFacilitate :data="datadetailregistration" />
          </VExpansionPanelText>
        </VExpansionPanel>
      </VExpansionPanels>
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
