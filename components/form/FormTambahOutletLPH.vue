<script setup lang="ts">
import { useDisplay } from "vuetify";
import type { MasterDistrict } from "@/server/interface/master.iface";

const props = defineProps({
  initialData: { type: Object, default: () => ({}) },
  isEditable: { type: Boolean, default: true },
});

const emit = defineEmits(["confirm", "close"]); 

const isVisible = ref(false);
const provinsiOptions = ref();
const kabKotaOptions = ref();
const kodeposOptions = ref();

const openDialog = () => {
  isVisible.value = true;
};

const closeDialog = () => {
  isVisible.value = false;
};

const formOutlet = ref({
  name: "",
  address: "",
  regency: "",
  provinsi: "",
  country: "Indonesia",
  zipCode: "",
});

const resetForm = () => {
  formOutlet.value = {
    name: "",
    address: "",
    regency: "",
    provinsi: "",
    country: "Indonesia",
    zipCode: "",
  };
};

const isFormValid = computed(() => {
  return (
    formOutlet.value.name.trim() !== '' &&
    formOutlet.value.address.trim() !== '' &&
    formOutlet.value.provinsi !== '' &&
    formOutlet.value.regency !== '' &&
    formOutlet.value.country.trim() !== '' &&
    formOutlet.value.zipCode !== ''
  );
});

const confirm = () => {
  emit("confirm", form.value);
  resetForm();
  closeDialog();
};

const cancel = () => {
  emit("close"); 
};

const { mdAndUp } = useDisplay();

const dialogMaxWidth = computed(() => {
  return mdAndUp.value ? 700 : "90%";
});

const form = ref(props.initialData);

const getProvince = async () => {
  const response = await $api("/master/province", {
    method: "get",
  });
  provinsiOptions.value = response;
};

const getKodePos = async () => {
  const response: Array<{ code: string }> = await $api("/master/kode-pos", {
    method: "get",
    query: {
      kabupaten: formOutlet.value.regency,
      provinsi: formOutlet.value.provinsi,
    },
  });
  kodeposOptions.value = response.map((kode) => kode.code);
};

const getDistrict = async (kode: string) => {
  const response: MasterDistrict[] = await $api("/master/district", {
    method: "post",
    body: {
      province: kode,
    },
  });
  kabKotaOptions.value = response;
};

const simpanOutlet = async () => {

  try {    
    let kabKotaNama = formOutlet.value.regency;
    if (kabKotaOptions.value && kabKotaOptions.value.length) {
      const selectedKabKota = kabKotaOptions.value.find(
        item => item.code === formOutlet.value.regency
      );
      if (selectedKabKota) {
        kabKotaNama = selectedKabKota.name;
      }
    }
      
      const response = await $api("/reguler/lph/update-fasilitas/add-outlet-lph", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: {
        address: formOutlet.value.address,
        city: formOutlet.value.regency,
        zip_code: formOutlet.value.zipCode,
        name: formOutlet.value.name,
        country: formOutlet.value.country,
        province: formOutlet.value.provinsi,
        id_reg: form.value.idReg,
      },
    });


    if (response.code === 2000) {
      useSnackbar().sendSnackbar("Sukses memperbarui data", "success");
      emit("close");
    } else {
      useSnackbar().sendSnackbar("Gagal memperbarui data", "error");
    }
  } catch (error) {
    console.error("Error detail:", error.response?.data || error);
  }
};

onMounted(async () => {
    getProvince();    
})

watch(
  () => formOutlet.value.provinsi, 
  async (newProvinsi) => {
    if (newProvinsi) {
      await getDistrict(newProvinsi); 
      formOutlet.value.regency = ""; 
      formOutlet.value.zipCode = ""; 
    }
  }
);

</script>

<template>
  <div class="mb-2">
        <VCardTitle
          class="text-h5 font-weight-bold d-flex justify-space-between align-center"
        >
          <span>Tambah Data Outlet</span>
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
          <VLabel for="name"> Nama Outlet </VLabel>
          <VTextField
            id="name"
            v-model="formOutlet.name"
            placeholder="Isi Nama Outlet"
            outlined
            dense
            required
            class="mb-2"
          />

          <VLabel for="address"> Alamat Outlet </VLabel>
          <VTextField
            id="address"
            v-model="formOutlet.address"
            placeholder="Isi Alamat Outlet"
            outlined
            dense
            required
            class="mb-2"
          />

          <VRow no-gutters class="mb-2">
            <VCol cols="5">
              <VLabel for="regency"> Provinsi </VLabel>
              <VAutocomplete
                v-model="formOutlet.provinsi"
                v-on:update:model-value="getDistrict"
                :items="provinsiOptions"
                item-title="name"
                item-value="code"
                placeholder="Pilih Provinsi"
                outlined
                dense
                required
                class="input-field"
              />
            </VCol>
            <VSpacer />
            <VCol cols="5" class="me-2">
              <VLabel for="regency"> Kab/Kota </VLabel>
                <VAutocomplete
                  v-model="formOutlet.regency"
                  v-on:update:model-value="getKodePos"
                  :items="kabKotaOptions"
                  item-title="name"
                  item-value="code"
                  placeholder="Pilih Kab/Kota"
                  outlined
                  dense
                  required
                  class="input-field"
                />
            </VCol>
          </VRow>

          <VRow no-gutters>
            <VCol cols="5" class="me-2">
              <VLabel for="country"> Negara </VLabel>
              <VTextField
                id="country"
                v-model="formOutlet.country"
                placeholder="Indonesia"
                outlined
                dense
                required
                disabled
              />
            </VCol>
            <VSpacer />
            <VCol cols="5">
              <VLabel for="zipCode"> Kode Pos </VLabel>
                <VAutocomplete
                  v-model="formOutlet.zipCode"
                  :disabled="formOutlet.provinsi== '' || formOutlet.regency == ''"
                  :items="kodeposOptions"
                  item-value="code"
                  item-title="code"
                />
            </VCol>
          </VRow>
        </VCardText>

        <div class="d-flex justify-end ga-2">
          <VBtn @click="cancel" variant="outlined"> Batal </VBtn>
          <VBtn @click="simpanOutlet" :disabled="!isFormValid"> Tambah </VBtn>
        </div>
  </div>
</template>

<style scoped></style>
