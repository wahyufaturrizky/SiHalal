<template>
  <v-card-text>
    <p class="text-h5 font-weight-bold">Pendaftaran Pelaku Usaha</p>
    <v-form>
      <VRow>
        <VCol cols="12" class="mb-0 pb-0">
          <p class="text-h6 font-weight-bold">Informasi Pribadi</p>
        </VCol>
        <VCol cols="12" md="6">
          <VTextField
            label="Nama Pelaku Usaha (Sesuai KTP)"
            placeholder="Masukkan Nama Pelaku Usaha"
            :rules="[requiredValidator]"
            require
          />
        </VCol>
        <VCol cols="12" md="6">
          <VTextField
            label="Nomor KTP/NIK"
            placeholder="Masukkan Nomor KTP/NIK"
            :rules="[requiredValidator, integerValidator]"
            @input="onlyAcceptNumber"
            require
          />
        </VCol>
        <VCol cols="12" md="6">
          <VTextField
            label="Nomor Telepon"
            placeholder="Masukkan Nomor Telepon"
            :rules="[requiredValidator]"
            require
          />
        </VCol>
        <VCol cols="12" md="6">
          <VTextField
            label="Email"
            placeholder="Masukkan Email"
            :rules="[requiredValidator, emailValidator]"
            require
          />
        </VCol>
        <VCol cols="12">
          <VTextField
            label="Alamat (Sesuai KTP)"
            placeholder="Masukkan Alamat"
            :rules="[requiredValidator]"
            require
          />
        </VCol>
        <VCol cols="12">
          <VSelect
            :items="country"
            :rules="[requiredValidator]"
            require
            placeholder="Provinsi"
            label="Pilih Provinsi"
          />
        </VCol>
        <VCol cols="12">
          <VSelect
            :items="country"
            :rules="[requiredValidator]"
            require
            placeholder="Kabupaten/Kota"
            label="Pilih Kabupaten/Kota"
          />
        </VCol>
        <VCol cols="12">
          <VSelect
            :items="country"
            :rules="[requiredValidator]"
            require
            placeholder="Kecamatan"
            label="Pilih Kecamatan"
          />
        </VCol>
        <VCol cols="12">
          <VSelect
            :items="country"
            :rules="[requiredValidator]"
            require
            placeholder="Kelurahan/Desa"
            label="Pilih Kelurahan/Desa"
          />
        </VCol>
        <VCol cols="12">
          <VTextField
            label="Kode Pos"
            placeholder="Masukkan Kode Pos"
            :rules="[requiredValidator, integerValidator]"
            require
            @input="onlyAcceptNumber"
          />
        </VCol>
        <VCol cols="12" class="mb-0 pb-0">
          <p class="text-h6 font-weight-bold">Informasi Badan Usaha</p>
        </VCol>
        <VCol cols="12">
          <VSelect
            :items="country"
            :rules="[requiredValidator]"
            require
            placeholder="Jenis Badan Usaha"
            label="Pilih Jenis Badan Usaha"
          />
        </VCol>
        <VCol cols="12">
          <VSelect
            :items="country"
            :rules="[requiredValidator]"
            require
            placeholder="Jenis Skala Usaha"
            label="Pilih Jenis Skala Usaha"
          />
        </VCol>
        <VCol cols="12">
          <VTextField
            label="Modal Usaha"
            placeholder="Masukkan Modal Usaha"
            :rules="[requiredValidator, integerValidator]"
            require
            @input="onlyAcceptNumber"
          />
        </VCol>
        <VCol cols="12">
          <VSelect
            :items="country"
            :rules="[requiredValidator]"
            require
            placeholder="KBLI"
            label="Pilih KBLI"
          />
        </VCol>
      </VRow>
      <VRow class="flex-row-reverse">
        <VCol cols="12" md="auto">
          <VBtn block type="submit"> Kirim </VBtn>
        </VCol>
        <VCol cols="12" md="auto">
          <VBtn
            block
            variant="outlined"
            type="reset"
            @click="stepStore.goToStep(1)"
          >
            Kembali
          </VBtn>
        </VCol>
      </VRow>
    </v-form>
  </v-card-text>
</template>

<script lang="ts" setup>
import { emailValidator, integerValidator, requiredValidator } from "#imports";
import onlyAcceptNumber from "@/utils/onlyAcceptNumber";
const stepStore = useMyNewAccountStepStore();
const country = ["Indonesia", "Malaysia", "Singapore"];
</script>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>
