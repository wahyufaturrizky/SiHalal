<script setup lang="ts">
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { useDisplay } from "vuetify";

const props = defineProps({
  invoiceInformation: { type: Object, default: () => ({}) },
});

const emit = defineEmits(["confirm"]);

const form = ref({
  tanggalPembayaran: null,
  jumlaPembayaran: null,
  bankTujuan: null,
  noRekeningTujuan: null,
  namaRekeningTujuan: null,
  bankPengirim: null,
  noRekeningPengirim: null,
  namaRekeningPengirim: null,
  file: null,
});

const reset = () => {
  form.value = {
    tanggalPembayaran: null,
    jumlaPembayaran: null,
    bankTujuan: null,
    NoRekeningTujuan: null,
    NamaRekeningTujuan: null,
    BankPengirim: null,
    NoRekeningPengirim: null,
    NamaRekeningPengirim: null,
    file: null,
  };
};

const isVisible = ref(false);

const openDialog = () => {
  isVisible.value = true;
};

const closeDialog = () => {
  isVisible.value = false;
};

const confirm = () => {
  emit("confirm", form.value);
  reset();
  closeDialog();
};

const cancel = () => {
  closeDialog();
};

const { mdAndUp } = useDisplay();

const dialogMaxWidth = computed(() => {
  return mdAndUp.value ? 900 : "90%";
});
</script>

<template>
  <VBtn
    variant="text"
    prepend-icon="mdi-check-all"
    block
    class="text-left"
    style="justify-content: flex-start; inline-size: 100%"
    @click="openDialog"
  >
    konfirmasi Pembayaran
  </VBtn>
  <VDialog v-model="isVisible" :max-width="dialogMaxWidth">
    <VCard class="pa-2">
      <VCardTitle
        class="text-h5 font-weight-bold d-flex justify-space-between align-center"
      >
        <span>Konfirmasi Pembayaran</span>
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
        <VRow class="border rounded pa-4" no-gutters>
          <VCol cols="12" md="4" class="d-flex flex-column">
            <span class="font-weight-bold">No. Invoice </span>
            <span>{{ props.invoiceInformation.noInvoice }}</span>
          </VCol>
          <VCol cols="12" md="4" class="d-flex flex-column">
            <span class="font-weight-bold">Tanggal Pembayaran </span>
            <span>{{ props.invoiceInformation.tanggalPembayaran }}</span>
          </VCol>
          <VCol cols="12" md="4" class="d-flex flex-column">
            <span class="font-weight-bold">Jumlah </span>
            <span>{{ props.invoiceInformation.jumlahPembayaran }}</span>
          </VCol>
        </VRow>
      </VCardText>

      <VCardText>
        <VRow>
          <VCol cols="12" md="6">
            <VLabel for="tanggalPembayaran"> Tanggal Pembayaran </VLabel>
            <VueDatePicker
              id="tanggalPembayaran"
              v-model="form.tanggalPembayaran"
              class="mb-4"
              teleport-center
              :enable-time-picker="false"
              format="dd/MM/yyyy"
            />
          </VCol>
          <VCol cols="12" md="6">
            <VLabel for="jumlah"> Jumlah Pembayaran </VLabel>
            <VTextField
              id="jumlah"
              v-model="form.jumlaPembayaran"
              placeholder="Isi Jumlah Pembayaran"
              outlined
              dense
              required
              class="mb-2"
            />
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12" md="4">
            <VLabel for="bankTujuan"> Bank Tujuan </VLabel>
            <VTextField
              id="bankTujuan"
              v-model="form.bankTujuan"
              placeholder="Isi Bank Tujuan"
              outlined
              dense
              required
              class="mb-2"
            />
          </VCol>
          <VCol cols="12" md="4">
            <VLabel for="noRekeningTujuan"> No. Rekening Tujuan </VLabel>
            <VTextField
              id="noRekeningTujuan"
              v-model="form.noRekeningTujuan"
              placeholder="Masukkan No. Rekening"
              outlined
              dense
              required
              class="mb-2"
            />
          </VCol>
          <VCol cols="12" md="4">
            <VLabel for="namaRekeningTujuan"> Nama Rekening Tujuan </VLabel>
            <VTextField
              id="namaRekeningTujuan"
              v-model="form.namaRekeningTujuan"
              placeholder="Masukkan Nama Rek Tujuan"
              outlined
              dense
              required
              class="mb-2"
            />
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12" md="4">
            <VLabel for="bankPengirim"> Bank Pengirim </VLabel>
            <VTextField
              id="bankPengirim"
              v-model="form.bankPengirim"
              placeholder="Isi Bank Tujuan"
              outlined
              dense
              required
              class="mb-2"
            />
          </VCol>
          <VCol cols="12" md="4">
            <VLabel for="noRekeningPengirim"> No. Rekening Pengirim </VLabel>
            <VTextField
              id="noRekeningPengirim"
              v-model="form.noRekeningPengirim"
              placeholder="Masukkan No. Rekening"
              outlined
              dense
              required
              class="mb-2"
            />
          </VCol>
          <VCol cols="12" md="4">
            <VLabel for="namaRekeningPengirim"> Nama Rekening Pengirim </VLabel>
            <VTextField
              id="namaRekeningPengirim"
              v-model="form.namaRekeningPengirim"
              placeholder="Masukkan Nama Rek Pengirim"
              outlined
              dense
              required
              class="mb-2"
            />
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="6" class="d-flex align-center">
            <span> Unggah Bukti Transaksi </span>
          </VCol>
          <VCol cols="6">
            <HalalFileInput v-model="form.file" label="Pilih File" />
          </VCol>
        </VRow>
      </VCardText>
      <VCardText>
        <VRow align="center" class="info-box pa-3" no-gutters>
          <VCol cols="1">
            <VIcon class="mr-2" color="primary"> mdi-information </VIcon>
          </VCol>
          <VCol>
            <span class="text-body-2">
              Apabila sebelumnya terjadi kurang bayar dan ingin mengupload bukti
              transfer kekurangannya maka harap mengupload kedua bukti bayar
              (bukti bayar sebelumnya + kekurangannya) dijadikan dalam 1 file
              upload.
            </span>
          </VCol>
        </VRow>
      </VCardText>

      <div class="d-flex justify-end ga-2">
        <VBtn variant="outlined" @click="cancel"> Batal </VBtn>
        <VBtn @click="confirm"> Konfirmasi </VBtn>
      </div>
    </VCard>
  </VDialog>
</template>

<style scoped></style>
