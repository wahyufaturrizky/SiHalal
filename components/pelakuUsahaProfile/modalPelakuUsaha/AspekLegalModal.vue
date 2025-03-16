<template>
  <div class="mb-2">
    <VBtn
      v-if="props.mode === 'add'"
      @click="openDialog"
      variant="outlined"
      append-icon="ri-add-line"
    >
     {{t('detail-pu.pu-edit-add')}}
    </VBtn>

    <VBtn
      v-else-if="props.mode === 'edit'"
      @click="openDialog"
      variant="text"
      prepend-icon="ri-edit-line"
    >
    {{t('detail-pu.pu-edit-edit')}}
    </VBtn>
    <VDialog v-model="isVisible" :max-width="dialogMaxWidth">
      <VCard class="pa-2">
        <VCardTitle
          class="text-h5 font-weight-bold d-flex justify-space-between align-center"
        >
          <span>{{
            props.mode === "add"
              ? t('pengajuan-reguler.reguler-form--pengajuan-legal-popup-title')
              : t('pengajuan-reguler.reguler-form--pengajuan-legal-popup-title-1')
          }}</span>
          <VBtn
            icon
            color="transparent"
            style="border: none"
            elevation="0"
            @click="closeDialog"
          >
            <VIcon color="black">ri-close-line</VIcon>
          </VBtn>
        </VCardTitle>

        <VCardText>
          <VForm ref="legalForm">
            <VRow class="mb-1">
              <VCol cols="12">
                <VLabel>{{ t('detail-pu.pu-legal-modal-1')}}</VLabel>
                <VAutocomplete
                  v-model="form.type"
                  :items="documentTypes"
                  item-title="name"
                  item-value="code"
                  placeholder="Pilih Jenis Document"
                  outlined
                  dense
                  required
                  auto-select-first
                  class="input-field"
                  :rules="[requiredValidator]"
                />
              </VCol>
            </VRow>

            <VRow class="mb-1">
              <VCol cols="12">
                <VLabel>{{ t('detail-pu.pu-legal-modal-2')}}</VLabel>
                <VTextField
                  v-model="form.doc_number"
                   :placeholder=" t('detail-pu.pu-legal-modal-placeholder-1')"
                  outlined
                  dense
                  required
                  class="input-field"
                  :rules="[requiredValidator]"
                />
              </VCol>
            </VRow>
            <VRow class="mb-1">
              <VCol cols="12">
                <VLabel>{{ t('detail-pu.pu-legal-modal-3')}}</VLabel>

                <Vuepicdatepicker
                  v-model:model-value="form.date"
                  auto-apply
                  model-type="dd/MM/yyyy"
                  :enable-time-picker="false"
                  clearable
                  position="auto"
                >
                  <template #trigger>
                    <VTextField
                      placeholder="Isi Tanggal Document"
                      readonly
                      append-inner-icon="fa-calendar"
                      :model-value="form.date"
                      :rules="[requiredValidator]"
                    />
                  </template>
                </Vuepicdatepicker>

<!--                <VTextField-->
<!--                  v-model="form.date"-->
<!--                  placeholder="Isi Tanggal Document"-->
<!--                  outlined-->
<!--                  dense-->
<!--                  required-->
<!--                  type="date"-->
<!--                  class="input-field"-->
<!--                  :rules="[requiredValidator]"-->
<!--                />-->
              </VCol>
            </VRow>

            <VRow class="mb-1">
              <VCol cols="12">
                <VLabel>{{ t('detail-pu.pu-legal-modal-4')}}</VLabel>
                <Vuepicdatepicker
                  v-model:model-value="form.expiration_date"
                  auto-apply
                  model-type="dd/MM/yyyy"
                  :enable-time-picker="false"
                  clearable
                  position="auto"
                >
                  <template #trigger>
                    <VTextField
                      placeholder="Isi Masa Berlaku"
                      readonly
                      append-inner-icon="fa-calendar"
                      :model-value="form.expiration_date"
                      :rules="[requiredValidator]"
                    />
                  </template>
                </Vuepicdatepicker>
<!--                <VTextField-->
<!--                  v-model="form.expiration_date"-->
<!--                  placeholder="Isi Masa Berlaku"-->
<!--                  outlined-->
<!--                  dense-->
<!--                  required-->
<!--                  type="date"-->
<!--                  class="input-field"-->
<!--                  :rules="[requiredValidator]"-->
<!--                />-->
              </VCol>
            </VRow>

            <VRow class="mb-1">
              <VCol cols="12">
                <VLabel>{{ t('detail-pu.pu-legal-modal-5')}}</VLabel>
                <VTextField
                  v-model="form.publishing_agency"
                  :placeholder=" t('detail-pu.pu-legal-modal-placeholder-2')"
                  outlined
                  dense
                  required
                  class="input-field"
                  :rules="[requiredValidator]"
                />
              </VCol>
            </VRow>
          </VForm>
          <!-- Jenis Document -->
        </VCardText>

        <div class="d-flex justify-end ga-2">
          <VBtn @click="cancel" variant="outlined"> {{ t('detail-pu.pu-legal-modal-batal')}} </VBtn>
          <VBtn @click="confirm" :color="props.confirmColor">
            {{ props.mode === "add" ?  t('detail-pu.pu-edit-add') : t('detail-pu.pu-edit-add') }}
          </VBtn>
        </div>
      </VCard>
    </VDialog>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
import { computed, defineEmits, defineProps, ref, watch } from "vue";
import { useDisplay } from "vuetify";
import { type VForm, VTextField } from "vuetify/components"

const props = defineProps({
  mode: { type: String, default: "add" },
  initialData: { type: Object, default: () => ({}) },
});

const emit = defineEmits(["confirmAdd", "confirmEdit", "cancel"]);

const isVisible = ref(false);

interface IDocsTypeMaster {
  code: String;
  name: String;
  name_eng: String;
}

const openDialog = async () => {
  const documentTypesTmp: Array<IDocsTypeMaster> = await getMasterDocsTypes();
  console.log("data document = ", documentTypesTmp);
  documentTypes.value = documentTypesTmp.filter((val) => val.name !== "NIB");
  isVisible.value = true;

  if (props.mode === "add") {
    form.value.doc_number = "";
    form.value.expiration_date = "";
    form.value.date = "";
    form.value.publishing_agency = "";
    form.value.type = "";
  }
};

const closeDialog = () => {
  isVisible.value = false;
};

const legalForm = ref<VForm>();

const confirm = () => {
  let whichEmit: any = null;
  if (props.mode === "add") {
    console.log("emitted add = ", form.value);
    whichEmit = "confirmAdd";
  } else {
    whichEmit = "confirmEdit";
  }

  legalForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) {
      emit(whichEmit, form.value);
      closeDialog();
    }
  });
};

const cancel = () => {
  emit("cancel");
  closeDialog();
};

const { mdAndUp } = useDisplay();
const dialogMaxWidth = computed(() => {
  return mdAndUp.value ? 700 : "90%";
});

const form = ref({
  doc_number: "",
  expiration_date: "",
  date: "",
  publishing_agency: "",
  type: "",
});

const documentTypes = ref([]);

watch(
  () => props.initialData,
  (newData) => {
    if (props.mode === "edit" && newData) {
      console.log("edited data", newData);
      form.value = { ...newData };
    }
  },
  { immediate: true }
);

const snackbar = useSnackbar();

async function getMasterDocsTypes() {
  const response = await $api(`master/common-code?type=legaldocs`, {
    method: "get",
  });

  return response;
}
</script>

<style scoped></style>
