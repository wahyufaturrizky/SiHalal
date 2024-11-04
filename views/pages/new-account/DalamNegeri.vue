<template>
  <VWindow v-model="domesticWindow">
    <VWindowItem :value="1" style="min-width: 30dvw">
      <v-card-text>
        <p class="text-h5 font-weight-bold">Form Profil perusahaan</p>
        <VRow>
          <VCol cols="12">
            <VTextField
              label="Nomor Induk Berusaha"
              placeholder="Nomor Induk Berusaha"
              :rules="[requiredValidator, integerValidator]"
              @input="onlyAcceptNumber"
              require
            />
          </VCol>
        </VRow>
        <VRow class="flex-row-reverse">
          <VCol cols="12" md="auto">
            <VBtn block type="submit" @click="domesticWindow = 2"> Kirim </VBtn>
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
      </v-card-text>
    </VWindowItem>
    <VWindowItem :value="2" style="min-width: 50dvw">
      <v-card-text>
        <p class="text-h5 font-weight-bold">Data Nomor Induk Berusaha</p>
        <VRow>
          <VCol cols="4"> Nomor Induk Bersama </VCol>
          <VCol cols="8"> : 274008432 </VCol>
        </VRow>
        <VRow>
          <VCol cols="4"> Nomor Induk Bersama </VCol>
          <VCol cols="8"> : 274008432 </VCol>
        </VRow>
        <VRow>
          <VCol cols="4"> Nomor Induk Bersama </VCol>
          <VCol cols="8"> : 274008432 </VCol>
        </VRow>
        <VRow>
          <VCol cols="4"> Nomor Induk Bersama </VCol>
          <VCol cols="8"> : 274008432 </VCol>
        </VRow>
        <VRow>
          <VCol cols="4"> Nomor Induk Bersama </VCol>
          <VCol cols="8"> : 274008432 </VCol>
        </VRow>
        <VRow>
          <VCol cols="4"> Nomor Induk Bersama </VCol>
          <VCol cols="8"> : 274008432 </VCol>
        </VRow>
        <VRow>
          <VCol cols="4"> Nomor Induk Bersama </VCol>
          <VCol cols="8"> : 274008432 </VCol>
        </VRow>
        <VDivider class="my-5" />
        <p class="text-h5 font-weight-bold">Daftar Usaha/Kegiatan</p>
        <VRow>
          <VDataTable
            :headers="headers"
            :items="data"
            :items-per-page="5"
            class="text-no-wrap"
          >
            <template #item.no="{ item }">
              <span class="text-h6">{{ idNumber++ }}</span>
            </template>
            <template #item.kbli="{ item }">
              <span class="text-h6">{{ item.kbli }}</span>
            </template>
            <template #item.namausaha="{ item }">
              <span class="text-h6">{{ item.namausaha }}</span>
            </template>
            <template #item.alamat="{ item }">
              <span class="text-h6">{{ item.address }}</span>
            </template>
            <template #item.modalusaha="{ item }">
              <span class="text-h6">{{ item.modalusaha }}</span>
            </template>
          </VDataTable>
        </VRow>
        <VRow class="flex-row-reverse">
          <VCol cols="12" md="auto">
            <VBtn block type="submit" @click="domesticWindow = 3"> Kirim </VBtn>
          </VCol>
          <VCol cols="12" md="auto">
            <VBtn
              block
              variant="outlined"
              type="reset"
              @click="domesticWindow = 1"
            >
              Kembali
            </VBtn>
          </VCol>
        </VRow>
      </v-card-text>
    </VWindowItem>
  </VWindow>
</template>

<script lang="ts" setup>
import { requiredValidator } from "#imports";
const stepStore = useMyNewAccountStepStore();
const domesticWindow = ref(1);
const headers = [
  { title: "No", key: "no" },
  { title: "KBLI", key: "kbli" },
  { title: "Nama Usaha", key: "namausaha" },
  { title: "Alamat", key: "address" },
  { title: "Modal Usaha", key: "modalusaha" },
];
const data = [
  {
    kbli: "11040 Industri Minuman Ringan",
    namausaha: "Industri Minuman Ringan",
    address: "ALAMAT KU",
    modalusaha: "5.000.000",
  },
];
const idNumber = 0;
</script>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>
