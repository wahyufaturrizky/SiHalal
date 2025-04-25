<script setup lang="ts">
import type { MasterDistrict } from "@/server/interface/master.iface";
import { useDisplay } from "vuetify";
const props = defineProps({
  initialData: { type: Object, default: () => ({}) },
  isEditable: { type: Boolean, default: true },
});

const emit = defineEmits(["confirm","close"]);

const isVisible = ref(false);

const openDialog = () => {
  isVisible.value = true;
};

const closeDialog = () => {
  isVisible.value = false;
};

const formPabrik = ref({
  location: null,
  name: "",
  address: "",
  regency: "",
  provinsi: "",
  country: "",
  zipCode: "",
  status: "",
});

const resetForm = () => {
  formPabrik.value = {
    location: null,
    name: "",
    address: "",
    regency: "",
    provinsi: "",
    country: "",
    zipCode: "",
    status: "",
  };
};

const provinsiOptions = ref();
const kabKotaOptions = ref();
const kodeposOptions = ref();
const statusOptions = ref([]);

// const status = [
//   { title: "Milik Sendiri", value: "1" },
//   { title: "Publik", value: "2" },
// ];
const location = [
  { title: "Dalam Negeri", value: "1" },
  { title: "Luar Negeri", value: "2" },
];

const confirm = () => {
  emit("confirm", formPabrik.value);
  resetForm();
  closeDialog();
};

const cancel = () => {
  emit("close");
};

const form = ref(props.initialData);

const { mdAndUp } = useDisplay();

const dialogMaxWidth = computed(() => {
  return mdAndUp.value ? 700 : "90%";
});

const isDalamNegeri = computed(() => formPabrik.value.location === "1");

async function getMasterStatusPabrik() {
  const response = await $api(`master/common-code?type=factorystatus`, {
    method: "get",
  });

  return response;
}

const getKodePos = async () => {
  const response: Array<{ code: string }> = await $api("/master/kode-pos", {
    method: "get",
    query: {
      kabupaten: formPabrik.value.regency,
      provinsi: formPabrik.value.provinsi,
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

const getProvince = async () => {
  const response = await $api("/master/province", {
    method: "get",
  });
  provinsiOptions.value = response;
};

const simpanPabrik = async () => {
try {        
  const payload = {
      address: formPabrik.value.address,
      city: formPabrik.value.regency,
      zip_code: formPabrik.value.zipCode,
      name: formPabrik.value.name,
      country: formPabrik.value.country,
      province: formPabrik.value.provinsi,
      id_reg: form.value.idReg,
      status: formPabrik.value.status,
    };

    console.log("Payload yang dikirim:", JSON.stringify(payload, null, 2));

    const response = await $api("/reguler/lph/update-fasilitas/add-pabrik-lph", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: {
      address: formPabrik.value.address,
      city: formPabrik.value.regency,
      zip_code: formPabrik.value.zipCode,
      name: formPabrik.value.name,
      country: formPabrik.value.country,
      province: formPabrik.value.provinsi,
      id_reg: form.value.idReg,
      status: formPabrik.value.status,
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

    if(formPabrik.value.provinsi){
      await getDistrict(formPabrik.value.provinsi);
    };

  statusOptions.value = await getMasterStatusPabrik();
    
})

watch(() => formPabrik.value.location, (newVal) => {
  if (newVal === "1") {
    formPabrik.value.country = "Indonesia";
  } else {
    formPabrik.value.country = "";
  }
});


</script>

<template>
  <div class="mb-2">
        <VCardTitle
          class="text-h5 font-weight-bold d-flex justify-space-between align-center"
        >
          <span>Tambah Data Pabrik</span>
        </VCardTitle>

        <VCardText>
          <!-- Lokasi Pabrik -->
          <VRow class="mb-1">
            <VCol cols="12">
              <VLabel>Lokasi Pabrik</VLabel>
              <VAutocomplete
                v-model="formPabrik.location"
                :items="location"
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
              v-model="formPabrik.name"
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
              v-model="formPabrik.address"
              placeholder="Isi Alamat Pabrik"
              outlined
              dense
              required
              class="input-field"
            />
          </VCol>
        </VRow>

        <VRow class="mb-1">
        <!-- Kab/Kota -->
        <VCol cols="6" class="pe-1">
          <VLabel>Kab/Kota</VLabel>

          <VAutocomplete
            v-if="isDalamNegeri"
            v-model="formPabrik.regency"
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

          <VTextField
            v-else
            v-model="formPabrik.regency"
            placeholder="Isi Kab/Kota"
            outlined
            dense
            required
            class="input-field"
          />
        </VCol>

        <!-- Provinsi -->
        <VCol cols="6" class="ps-1">
          <VLabel>Provinsi</VLabel>

          <VAutocomplete
            v-if="isDalamNegeri"
            v-model="formPabrik.provinsi"
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

          <VTextField
            v-else
            v-model="formPabrik.provinsi"
            placeholder="Isi Provinsi"
            outlined
            dense
            required
            class="input-field"
          />
        </VCol>
        </VRow>


        <!-- Negara and Kode Pos -->
        <VRow class="mb-1">
          <VCol cols="6" class="pe-1">
            <VLabel>Negara</VLabel>
            <VTextField
              v-model="formPabrik.country"
              placeholder="Isi Negara"
              outlined
              dense
              required
              class="input-field"
              :disabled="isDalamNegeri"
            />
            
          </VCol>
          <VCol cols="6" class="ps-1">
            <VLabel>Kode Pos</VLabel>
            <VAutocomplete
              v-if="isDalamNegeri"
              v-model="formPabrik.zipCode"
              :disabled="formPabrik.provinsi == '' || formPabrik.regency == ''"
              :items="kodeposOptions"
              item-value="code"
              item-title="code"
            />

            <VTextField
              v-else
              v-model="formPabrik.zipCode"
              placeholder="Kode Pos"
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
              v-model="formPabrik.status"
              :items="statusOptions"
              item-title="name"
              item-value="code"
              laceholder="Pilih Status Pabrik"
              outlined
              dense
              required
              class="input-field"
            />
          </VCol>
        </VRow>
        </VCardText>

        <div class="d-flex justify-end ga-2">
          <VBtn @click="cancel" variant="outlined"> Batal </VBtn>
          <VBtn @click="simpanPabrik"> Tambah </VBtn>
        </div>
  </div>
</template>

<style scoped></style>
