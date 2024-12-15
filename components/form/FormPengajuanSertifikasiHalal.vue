<script setup lang="ts">
import { useDisplay } from "vuetify";

const props = defineProps({
  isEditable: {
    type: Boolean,
    default: true,
  },
});

const isVisible = ref(false);
const rules = {
  required: (value) => !!value || "Wajib Diisi",
  selectRequired: (v) => v.length > 0 || "Wajib Diisi",
};

const formRef = ref(null);

const formSubmission = ref({
  companyName: "",
  submissionNumber: "",
  submissionDate: "",
  type: null,
  productType: null,
  brand: "",
  marketingArea: null,
  lph: null,
  submissionType: "Baru",
  registrationType: null,
});

const openDialog = () => {
  if (formRef.value.isValid) {
    console.log("valid ", formSubmission.value);
    isVisible.value = true;
  } else {
    console.log("belum valid ");
  }
};

const closeDialog = () => {
  isVisible.value = false;
};

const types = [
  { title: "Makanan", value: "1" },
  { title: "Minuman", value: "2" },
  { title: "Obat", value: "3" },
  { title: "Kosmetik", value: "4" },
  { title: "Produk Kimia", value: "5" },
  { title: "Produk Biologi", value: "6" },
  { title: "Produk Rekayasa genetik", value: "7" },
  { title: "Barang gunaan", value: "8" },
  { title: "Jasa penyembelihan", value: "9" },
  { title: "Jasa pengolahan", value: "10" },
  { title: "Jasa penyimpanan", value: "11" },
  { title: "Jasa pengemasan", value: "12" },
  { title: "Jasa pendistribusian", value: "13" },
  { title: "Jasa penjualan", value: "14" },
  { title: "Jasa penyajian", value: "15" },
];

const productTypes = [
  { title: "Minuman dengan pengolahan", value: "1" },
  { title: "Kelompok bahan minuman", value: "2" },
];

const area = [
  { title: "Kabupaten/Kota", value: "1" },
  { title: "Provinsi", value: "2" },
  { title: "Nasional", value: "3" },
  { title: "Internasional", value: "4" },
];

// TODO -> base on area, value lph need to hit api
const lph = computed(() => {
  if (!formSubmission.value.marketingArea) {
    return [];
  }
  return [
    { title: "Area 1", value: "1" },
    { title: "Area 2", value: "2" },
  ];
});

const registrationType = [
  { title: "Pendaftaran Mandiri/Reguler ", value: "CH001" },
  { title: "Pendaftaran Melalui Fasilitasi", value: "CH002" },
];

const snackBar = useSnackbar();

// TODO -> INTEGRATE FORM SUBBMI
const submit = async () => {
  console.log("valid ", formSubmission.value);
  isVisible.value = false;
  snackBar.sendSnackbar("Sucess Save Data", "success");
};

const { mdAndUp } = useDisplay();

const dialogMaxWidth = computed(() => {
  return mdAndUp.value ? 700 : "90%";
});
</script>

<template>
  <VCard class="pa-4 mb-8">
    <VCardTitle class="text-h3"> Pengajuan Sertifikasi Halal </VCardTitle>
    <VForm
      ref="formRef"
      @submit.prevent="openDialog"
      :model-value="formSubmission"
    >
      <VCardItem>
        <CustomTextField
          id="companyName"
          v-model="formSubmission.companyName"
          label="Nama Perusahaan yang Tertera pada Sertifikat"
          placeholder="Isi Nama Perusahaan yang Tertera pada Sertifikat"
          :rules="[rules.required]"
          class="mb-4"
          :disable="!props.isEditable"
        />

        <CustomTextField
          id="submissionNumber"
          v-model="formSubmission.submissionNumber"
          label="Nomor Surat Permohonan"
          placeholder="isi Nomor Surat Permohonan"
          :rules="[rules.required]"
          class="mb-4"
          :disable="!props.isEditable"
        />

        <CustomTextField
          id="submissionDate"
          v-model="formSubmission.submissionDate"
          label="Tanggal Surat Permohonan"
          placeholder="isi Tanggal Surat Permohonan"
          :rules="[rules.required]"
          class="mb-4"
          :disable="!props.isEditable"
        />

        <CustomSelect
          id="type"
          v-model="formSubmission.type"
          label="Jenis Layanan"
          placeholder="Pilih Jenis Layanan"
          :rules="[rules.required]"
          class="mb-4"
          :items="types"
        />

        <CustomSelect
          id="productType"
          v-model="formSubmission.productType"
          label="Jenis Produk"
          placeholder="Pilih Jenis Produk"
          :rules="[rules.required]"
          class="mb-4"
          :items="productTypes"
          :disable="!props.isEditable"
        />

        <CustomTextarea
          id="brand"
          v-model="formSubmission.brand"
          label="Merek Dagang"
          placeholder="Isi Merek Dagang"
          :rules="[rules.required]"
          class="mb-4"
          :disable="!props.isEditable"
        />

        <CustomSelect
          id="marketingArea"
          v-model="formSubmission.marketingArea"
          label="Area Pemasaran"
          placeholder="Pilih Area Pemasaran"
          :rules="[rules.required]"
          class="mb-4"
          :items="area"
          :disable="!props.isEditable"
        />

        <CustomSelect
          id="lph"
          v-model="formSubmission.lph"
          label="LPH"
          placeholder="Pilih LPH"
          :rules="[rules.required]"
          class="mb-4"
          :items="lph"
          :disable="!props.isEditable"
        />

        <CustomSelect
          id="registrationType"
          v-model="formSubmission.registrationType"
          label="Jenis Pendaftaran"
          placeholder="Jenis Pendaftaran"
          :rules="[rules.required]"
          class="mb-4"
          :items="registrationType"
          :disable="!props.isEditable"
        />
      </VCardItem>
      <VCardActions v-if="props.isEditable" class="d-flex justify-end">
        <VBtn variant="flat" min-width="120" @click="openDialog" type="submit">
          Simpan
        </VBtn>
      </VCardActions>
    </VForm>
  </VCard>
  <VDialog v-model="isVisible" :max-width="dialogMaxWidth">
    <VCard class="pa-2">
      <VCardTitle
        class="text-h5 font-weight-bold d-flex justify-space-between align-center"
      >
        <span>Simpan Perubahan</span>
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
      <VCardText>Apakah yakin ingin menyimpan perubahan data ini</VCardText>
      <div class="d-flex justify-end ga-2">
        <VBtn @click="cancel" variant="outlined"> Batal </VBtn>
        <VBtn @click="submit" variant="flat"> Ya, Simpan </VBtn>
      </div>
    </VCard>
  </VDialog>
</template>
