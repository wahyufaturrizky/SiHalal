<script setup lang="ts">
import { ref } from "vue";
import { useDisplay } from "vuetify";

const props = defineProps({
  dataform: {
    type: Object,
    required: true,
  },
  datadetailregistration: {
    type: Object,
    required: true,
  },
  datasof: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits<{
  (event: "refresh"): void;
}>();

const { dataform, datasof, datadetailregistration } = props || {};

const isVisible = ref(false);
const loadingUpdate = ref(false);
const route = useRoute();

const facilitateId = route.params.id;

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
});

const isFormValid = ref(false);

const { mdAndUp } = useDisplay();
const openPanelRegisterData = ref(0);

const onInitData = () => {
  form.value = { ...dataform };
};

onMounted(() => {
  onInitData();
});

const closeDialog = () => {
  isVisible.value = false;
};

const openDialog = () => {
  isVisible.value = true;
};

const dialogMaxWidth = computed(() => {
  return mdAndUp ? 700 : "90%";
});

const putFacilitate = async () => {
  try {
    loadingUpdate.value = true;

    const {
      facilitationProgramName,
      explanationOfFacilitation,
      year,
      regionalScope,
      startDate,
      endDate,
      type,
      sourceOfFund,
      kuota,
      picName,
      picPhoneNumber,
    } = form.value;

    const res = await $api(`/facilitate/update/${facilitateId}`, {
      method: "put",
      body: {
        fac_name: facilitationProgramName,
        fac_description: explanationOfFacilitation,
        tahun: year,
        lingkup_wilayah: regionalScope,
        tgl_aktif: startDate,
        tgl_selesai: endDate,
        jenis: type,
        sumber_biaya: sourceOfFund,
        kuota: Number(kuota),
        nama_pic_program: picName,
        no_hp_pic_program: picPhoneNumber,
      },
    });

    if (res?.code === 2000) {
      closeDialog();
      useSnackbar().sendSnackbar("Success update data", "success");
      emit("refresh");
      loadingUpdate.value = false;
    } else {
      useSnackbar().sendSnackbar("Gagal update data", "error");
      loadingUpdate.value = false;
    }
  } catch (error) {
    closeDialog();
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingUpdate.value = false;
  }
};

const confirm = () => {
  putFacilitate();
};

const cancel = () => {
  closeDialog();
};

const checkIsFieldEMpty = (data: any) => {
  return Object.keys(data)?.find((key: any) => {
    if (key !== "facilitatorName") return !data[key];
  });
};
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
                :rules="[requiredValidator]"
                disabled
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
                :rules="[requiredValidator]"
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
                :rules="[requiredValidator]"
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
                :rules="[requiredValidator]"
                :items="
                  Array.from(
                    { length: 6 },
                    (_, i) => new Date().getFullYear() + i
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
                id="regionalScope"
                v-model="form.regionalScope"
                :rules="[requiredValidator]"
                :items="['Nasional', 'Provinsi', 'Kota/Kab.']"
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
                :rules="[
                  requiredValidator,
                  (v) => {
                    const selectedDate = new Date(v);
                    const selectedYear = selectedDate.getFullYear();
                    return (
                      selectedYear === form.year ||
                      'Tahun harus sesuai dengan yang dipilih'
                    );
                  },
                  (v) => {
                    const today = new Date();
                    const selectedDate = new Date(v);
                    return (
                      selectedDate > today ||
                      'Tanggal harus lebih besar dari hari ini'
                    );
                  },
                ]"
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
                :rules="[
                  requiredValidator,
                  (v) => {
                    const startDate = new Date(form.startDate);
                    const endDate = new Date(v);
                    return (
                      endDate > startDate ||
                      'Tanggal selesai harus lebih besar dari tanggal mulai'
                    );
                  },
                ]"
                type="date"
                placeholder="Pilih tanggal selesai"
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
                :rules="[requiredValidator]"
                :items="['Self Declare', 'Reguler']"
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
                :rules="[requiredValidator]"
                :items="datasof"
                placeholder="Pilih sumber pembiayaan"
                solo
                clearable
                item-title="name"
                item-value="code"
              />
            </VCol>
          </VRow>

          <VRow>
            <VCol cols="12">
              <label class="text-h6" for="kuota"> Kuota </label>
              <VTextField
                id="kuota"
                v-model="form.kuota"
                :rules="[requiredValidator]"
                placeholder="isi kuota"
                outlined
                type="number"
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
                :rules="[requiredValidator]"
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
                :rules="[requiredValidator]"
                placeholder="isi nomor kontak penanggungjawab program"
                outlined
                type="number"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12" class="text-right">
              <div class="ma-1">
                <VBtn
                  variant="flat"
                  :disabled="
                    checkIsFieldEMpty(form) ||
                    form.startDate === '' ||
                    form.endDate === ''
                  "
                  color="primary"
                  @click="openDialog"
                >
                  Simpan Perubahan
                </VBtn>

                <VDialog v-model="isVisible" :max-width="dialogMaxWidth">
                  <VCard>
                    <VCardTitle
                      class="text-h5 font-weight-bold d-flex justify-space-between align-center"
                    >
                      <span>Simpan Perubahan </span>
                      <VBtn
                        icon
                        color="transparent"
                        style="border: none"
                        elevation="0"
                        @click="closeDialog"
                      >
                        <VIcon color="black"> ri-close-line </VIcon>
                      </VBtn>
                    </VCardTitle>
                    <VCardText>
                      <p class="mb-2">
                        Apakah kamu yakin ingin menyimpan perubahan data ?
                      </p>
                    </VCardText>
                    <VCardActions>
                      <VBtn variant="outlined" text @click="cancel">
                        Batal
                      </VBtn>
                      <VBtn
                        :disabled="loadingUpdate"
                        class="primaru"
                        variant="flat"
                        @click="confirm"
                      >
                        {{ loadingUpdate ? "Loading..." : "Simpan" }}
                      </VBtn>
                    </VCardActions>
                  </VCard>
                </VDialog>
              </div>
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
