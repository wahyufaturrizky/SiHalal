<!-- eslint-disable @stylistic/js/spaced-comment -->
<!-- eslint-disable lines-around-comment -->
<script setup lang="ts">
//data
let formDataEmailSearch: string
let formDataRoleId: array
let formDataName: string
let formDataEmail: string
let formDataJabatan: string
let formDataPhone: string
let formDataNip: string
let formDataUnit: string

const submitForm = () => {
  console.log('submitted')
}
</script>

<template>
  <VForm @submit.prevent>
    <VRow>
      <VCol class="v-col-10">
        <VTextField
          v-model="formDataEmailSearch"
          label="Email / NIP"
        />
      </VCol>
      <VCol class="v-col-2">
        <VBtn>Cari</VBtn>
      </VCol>
    </VRow>
    <VRow>
      <VCol class="v-col-6">
        <VTextField
          v-model="formDataName"
          disabled
          label="Nama"
        />
      </VCol>
      <VCol class="v-col-6">
        <VTextField
          v-model="formDataEmail"
          type="email"
          label="Email"
          disabled
        />
      </VCol>
    </VRow>
    <VRow>
      <VCol class="v-col-6">
        <VTextField
          v-model="formDataJabatan"
          label="Jabatan"
          disabled
        />
      </VCol>
      <VCol class="v-col-6">
        <VTextField
          v-model="formDataPhone"
          label="Telepon"
          disabled
        />
      </VCol>
    </VRow>
    <VRow>
      <VCol class="v-col-6">
        <VTextField
          v-model="formDataNip"
          label="NIP"
          disabled
        />
      </VCol>
      <VCol class="v-col-6">
        <VTextField
          v-model="formDataUnit"
          label="Unit Kerja"
          disabled
        />
      </VCol>
    </VRow>
    <VRow>
      <VCol class="v-col-12">
        <VSelect
          v-model="formDataRoleId"
          multiple
          chips
          label="Pilih Peran"
        />
      </VCol>
    </VRow>
    <VRow>
      <VCol class="v-col-3">
        <VBtn @click="submitForm">
          Submit
        </VBtn>
      </VCol>
    </VRow>
    <br>
  </VForm>
</template>
