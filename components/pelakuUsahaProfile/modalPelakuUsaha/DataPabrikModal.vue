<template>
  <div class="mb-2">
    <VBtn
      v-if="props.mode === 'add'"
      @click="openDialog"
      variant="outlined"
      append-icon="ri-add-line"
    >
      Tambah
    </VBtn>
    <VBtn
      v-else-if="props.mode === 'edit'"
      @click="openDialog"
      variant="outlined"
      prepend-icon="ri-edit-line"
    >
      Edit
    </VBtn>
    <VDialog v-model="isVisible" :max-width="dialogMaxWidth">
      <VCard class="pa-2">
        <VCardTitle
          class="text-h5 font-weight-bold d-flex justify-space-between align-center"
        >
          <span>{{
            props.mode === "add" ? "Tambah Data Pabrik" : "Edit Data Pabrik"
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
          <!-- Lokasi Pabrik -->
          <VForm ref="pabrikFormRef">
            <VRow class="mb-1">
              <VCol cols="12">
                <VLabel>Lokasi Pabrik</VLabel>
                <VAutocomplete
                  :rules="[requiredValidator]"
                  v-model="form.lokasiPabrik"
                  :items="lokasiPabrikOptions"
                  placeholder="Pilih Lokasi Pabrik"
                  outlined
                  dense
                  required
                  class="input-field"
                />
              </VCol>
            </VRow>

            <VRow class="mb-1">
              <VCol cols="12">
                <VLabel>Nama Pabrik</VLabel>
                <VTextField
                  :rules="[requiredValidator]"
                  v-model="form.namaPabrik"
                  placeholder="Isi Nama Pabrik"
                  outlined
                  dense
                  required
                  class="input-field"
                />
              </VCol>
            </VRow>

            <VRow class="mb-1">
              <VCol cols="12">
                <VLabel>Alamat Pabrik</VLabel>
                <VTextField
                  :rules="[requiredValidator]"
                  v-model="form.alamatPabrik"
                  placeholder="Isi Alamat Pabrik"
                  outlined
                  dense
                  required
                  class="input-field"
                />
              </VCol>
            </VRow>

            <VRow class="mb-1">
              <VCol cols="6" class="pe-1">
                <VLabel>Kab/Kota</VLabel>
                <VTextField
                  v-model="form.kabKota"
                  placeholder="Isi Kab/Kota"
                  outlined
                  dense
                  required
                  class="input-field"
                  v-if="form.lokasiPabrik == 'Luar Negeri'"
                />
                <VAutocomplete
                  :rules="[requiredValidator]"
                  v-model="form.kabKota"
                  :items="kabKotaOptions"
                  item-title="name"
                  item-value="code"
                  placeholder="Pilih Kab/Kota"
                  outlined
                  dense
                  required
                  class="input-field"
                  v-if="form.lokasiPabrik == 'Dalam Negeri'"
                />
              </VCol>
              <VCol cols="6" class="ps-1">
                <VLabel>Provinsi</VLabel>
                <VTextField
                  :rules="[requiredValidator]"
                  v-model="form.provinsi"
                  placeholder="Isi Provinsi"
                  outlined
                  dense
                  required
                  class="input-field"
                  v-if="form.lokasiPabrik == 'Luar Negeri'"
                />
                <VAutocomplete
                  v-model="form.provinsi"
                  v-on:update:model-value="getDistrict"
                  :rules="[requiredValidator]"
                  :items="provinsiOptions"
                  item-title="name"
                  item-value="code"
                  placeholder="Pilih Provinsi"
                  outlined
                  dense
                  required
                  class="input-field"
                  v-if="form.lokasiPabrik == 'Dalam Negeri'"
                />
              </VCol>
            </VRow>

            <!-- Negara and Kode Pos -->
            <VRow class="mb-1">
              <VCol cols="6" class="pe-1">
                <VLabel>Negara</VLabel>
                <VTextField
                  :rules="[requiredValidator]"
                  v-model="form.negara"
                  placeholder="Isi Negara"
                  outlined
                  dense
                  class="input-field"
                />
              </VCol>
              <VCol cols="6" class="ps-1">
                <VLabel>Kode Pos</VLabel>
                <VTextField
                  :rules="[requiredValidator]"
                  v-model="form.kodePos"
                  placeholder="Isi Kode Pos"
                  outlined
                  dense
                  required
                  class="input-field"
                />
              </VCol>
            </VRow>

            <!-- Status Pabrik -->
            <VRow class="mb-1">
              <VCol cols="12">
                <VLabel>Status Pabrik</VLabel>
                <VAutocomplete
                  :rules="[requiredValidator]"
                  v-model="form.statusPabrik"
                  :items="statusOptions"
                  item-title="name"
                  item-value="name"
                  placeholder="Pilih Status Pabrik"
                  outlined
                  dense
                  required
                  class="input-field"
                />
              </VCol>
            </VRow>
          </VForm>
        </VCardText>

        <div class="d-flex justify-end ga-2">
          <VBtn @click="cancel" variant="outlined"> Batal </VBtn>
          <VBtn @click="confirm" color="primary">
            {{ props.mode === "add" ? "Tambah" : "Simpan" }}
          </VBtn>
        </div>
      </VCard>
    </VDialog>
  </div>
</template>

<script setup lang="ts">
import type { MasterDistrict } from "@/server/interface/master.iface";
import { computed, defineEmits, defineProps, ref, watch } from "vue";
import { useDisplay } from "vuetify";
import type { VForm } from "vuetify/components";

const props = defineProps({
  mode: { type: String, default: "add" },
  initialData: { type: Object, default: () => ({}) },
});

const emit = defineEmits(["confirmAdd", "confirmEdit", "cancel"]);

const isVisible = ref(false);

const openDialog = async () => {
  if (props.mode == "add") {
    resetForm();
  }

  await getProvince();
  statusOptions.value = await getMasterStatusPabrik();
  isVisible.value = true;
};

const closeDialog = () => {
  isVisible.value = false;
};

const pabrikFormRef = ref<VForm>();

const confirm = () => {
  let whichEmit: any = null;
  if (props.mode === "add") {
    console.log("emitted add = ", form.value);
    whichEmit = "confirmAdd";
  } else {
    whichEmit = "confirmEdit";
  }

  pabrikFormRef.value?.validate().then(({ valid: isValid }) => {
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
  lokasiPabrik: "",
  namaPabrik: "",
  alamatPabrik: "",
  kabKota: "",
  provinsi: "",
  negara: "Indonesia",
  kodePos: "",
  statusPabrik: "",
});

const statusOptions = ref([]);
const lokasiPabrikOptions = ["Dalam Negeri", "Luar Negeri"];

async function getMasterStatusPabrik() {
  const response = await $api(`master/common-code?type=factorystatus`, {
    method: "get",
  });

  return response;
}
const provinsiOptions = ref();
const kabKotaOptions = ref();

const getDistrict = async (kode: string) => {
  form.value.kabKota = "";
  const response: MasterDistrict[] = await $api("/master/district", {
    method: "post",
    body: {
      province: kode,
    },
  });
  kabKotaOptions.value = response;
};

const getProvince = async () => {
  const response = await $api("/master/province", {
    method: "get",
  });
  provinsiOptions.value = response;
};

const resetForm = () => {
  form.value = {
    lokasiPabrik: "",
    namaPabrik: "",
    alamatPabrik: "",
    kabKota: "",
    provinsi: "",
    negara: "Indonesia",
    kodePos: "",
    statusPabrik: "",
  };
};

watch(
  () => props.initialData,
  (newData) => {
    if (props.mode === "edit" && newData) {
      const submitApi = $api(
        `/pelaku-usaha-profile/${newData.idPerson}/${newData.id}/detail-factory`,
        {
          method: "GET",
        }
      ).then((val: any) => {
        if (val.code == 2000) {
          console.log("edited data", val.data);
          // form.value = { ...val.data };
          form.value.namaPabrik = val.data.name;
          form.value.alamatPabrik = val.data.address;
          form.value.kabKota = val.data.city;
          form.value.provinsi = val.data.province;
          form.value.negara = val.data.country;
          form.value.kodePos = val.data.zip_code;
        } else {
          // snackbar.sendSnackbar("Gagal mendapatkan Data ", "error");
          console.error("fetching data error");
        }
      });
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.input-field {
  height: 36px;
}
</style>
