<script setup lang="ts">
import type { MasterDistrict } from "@/server/interface/master.iface";
import { useDisplay } from "vuetify";

const props = defineProps({
  initialData: { type: Object, default: () => ({}) },
  isEditable: { type: Boolean, default: true },
});

const statusOptions = ref([]);

const emit = defineEmits(["confirm", "close"]); 

const isVisible = ref(false);

const openDialog = () => {
  isVisible.value = true;
};

const closeDialog = () => {
  isVisible.value = false;
};

const convertstfas = async (code: string) => {
  const api = statusOptions.value.filter((val) => val.code == code)[0]?.code;

  return api;
};

const updatePabrik = async () => {
  try {
    console.log("Form data:", form.value);
    
    let kabKotaNama = form.value.regency;
    if (kabKotaOptions.value && kabKotaOptions.value.length) {
      const selectedKabKota = kabKotaOptions.value.find(
        item => item.code === form.value.regency
      );
      if (selectedKabKota) {
        kabKotaNama = selectedKabKota.name;
      }
    }
    
    let statusNama = form.value.status;
    if (statusOptions.value && statusOptions.value.length) {
      const selectedStatus = statusOptions.value.find(
        item => item.code === form.value.status
      );
    }
    
    
    const response = await $api("/reguler/lph/update-fasilitas/update-fasilitas", {
      method: "PUT",
      params: { id_reg: form.value.idReg, id_pabrik: form.value.idPabrik },
      headers: { "Content-Type": "application/json" },
      body: {
        alamat: form.value.address, 
        kab_kota: kabKotaNama, 
        kode_pos: form.value.zipCode,
        nama: form.value.name,
        negara: form.value.country,
        provinsi: form.value.provinsi,
        status_milik: form.value.status,
        fasil_id: form.value.fasilId,
        id_fas: form.value.idFas
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


const form = ref(props.initialData);

console.log("data:", form);

const status = [
  { title: "Milik Sendiri", value: "1" },
  { title: "Publik", value: "2" },
];
const location = [
  { title: "Lokasi 1", value: "1" },
  { title: "Lokasi 2", value: "2" },
];

// const confirm = () => {
//   emit("confirm", form.value);
//   closeDialog();
// };

const cancel = () => {
  emit("close"); 
};




const provinsiOptions = ref();
const kabKotaOptions = ref();
const kodeposOptions = ref();

const { mdAndUp } = useDisplay();

const dialogMaxWidth = computed(() => {
  return mdAndUp.value ? 700 : "90%";
});

const getKodePos = async () => {
  const response: Array<{ code: string }> = await $api("/master/kode-pos", {
    method: "get",
    query: {
      kabupaten: form.value.regency,
      provinsi: form.value.provinsi,
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

onMounted(async () => {
    getProvince();

    if(form.value.provinsi){
      await getDistrict(form.value.provinsi);
    };

  statusOptions.value = await getMasterStatusPabrik();
    
})

watch(
  () => form.value.provinsi, 
  async (newProvinsi) => {
    if (newProvinsi) {
      await getDistrict(newProvinsi); 
      form.value.regency = ""; 
      form.value.zipCode = ""; 
    }
  }
);

async function getMasterStatusPabrik() {
  const response = await $api(`master/common-code?type=factorystatus`, {
    method: "get",
  });

  return response;
}

</script>

<template>
 
      <VCardTitle
        class="text-h5 font-weight-bold d-flex justify-space-between align-center"
      >
        <span>Edit Data Pabrik</span>
        <VBtn
          icon
          color="transparent"
          style="border: none"
          elevation="0"
          @click="cancel"
        >
          <VIcon color="black">ri-close-line</VIcon>
        </VBtn>
      </VCardTitle>

      <VCardText>

        <VRow class="mb-1">
          <VCol cols="12">
            <VLabel>Nama Pabrik</VLabel>
            <VTextField
              v-model="form.name"
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
              v-model="form.address"
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
            v-if="form.country.toLowerCase() === 'indonesia'"
            v-model="form.regency"
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
            v-model="form.regency"
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
            v-if="form.country.toLowerCase() === 'indonesia'"
            v-model="form.provinsi"
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
            v-model="form.provinsi"
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
              v-model="form.country"
              placeholder="Isi Negara"
              outlined
              dense
              required
              class="input-field"
            />
          </VCol>
          <VCol cols="6" class="ps-1">
            <VLabel>Kode Pos</VLabel>
            <VAutocomplete
              v-model="form.zipCode"
              :disabled="form.provinsi== '' || form.regency == ''"
              :items="kodeposOptions"
              item-value="code"
              item-title="code"
            />
          </VCol>
        </VRow>

        <!-- Status Pabrik -->
        <VRow class="mb-1">
          <VCol cols="12">
            <VLabel>Status Pabrik</VLabel>
            <VAutocomplete
              v-model="form.status"
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
        <div class="d-flex justify-end ga-2">
          <VBtn @click="cancel" variant="outlined"> Batal </VBtn>
          <VBtn @click="updatePabrik"> Simpan </VBtn>
        </div>
      </VCardText>
</template>

