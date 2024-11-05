<template>
  <v-card-text>
    <p class="text-h5 font-weight-bold">Form Profil perusahaan</p>
    <v-form>
      <VRow>
        <VCol cols="12">
          <VTextField
            label="Nama Perusahaan"
            placeholder="Masukkan Nama Perusahaan"
            :rules="[requiredValidator]"
            require
          />
        </VCol>
        <VCol cols="12">
          <VTextField
            label="Alamat"
            placeholder="Masukkan Alamat"
            :rules="[requiredValidator]"
            require
          />
        </VCol>
        <VCol cols="12" md="6">
          <VTextField
            label="Kota"
            placeholder="Masukkan Kota"
            :rules="[requiredValidator]"
            require
          />
        </VCol>
        <VCol cols="12" md="6">
          <VTextField
            label="Provinsi"
            placeholder="Masukkan Provinsi"
            :rules="[requiredValidator]"
            require
          />
        </VCol>
        <VCol cols="12">
          <VSelect
            :items="country"
            :rules="[requiredValidator]"
            require
            placeholder="Negara"
            label="Pilih Negara"
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
        <VCol cols="12">
          <VTextField
            label="Nomor Handphone"
            placeholder="Masukkan Nomor Handphone"
            :rules="[requiredValidator, integerValidator]"
            require
            @input="onlyAcceptNumber"
          />
        </VCol>
        <VCol cols="12">
          <VTextField
            label="Email"
            placeholder="Masukkan Email"
            :rules="[requiredValidator, emailValidator]"
            require
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
