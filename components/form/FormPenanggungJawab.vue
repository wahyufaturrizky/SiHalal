<script setup lang="ts">

const rules = {
  required: value => !!value || 'Wajib Diisi',
  selectRequired: v => v.length > 0 || 'Wajib Diisi',
}

const formRef = ref(null)

const formSubmission = ref({
  businessType: '',
  phoneNumber: '',
  email: ''
})


// TODO -> INTEGRATE FORM SUBMIT
const submit = async () => {

  if(formRef.value.isValid){
    console.log('valid ', formSubmission.value)
  }else {
    console.log('belum valid ')
  }

};
</script>

<template>
  <VCard class="pa-4 mb-8">
    <VCardTitle class="text-h3">
      Penanggung Jawab
    </VCardTitle>
    <VForm ref="formRef" @submit.prevent="submit" :model-value="formSubmission">
      <VCardItem>
        <CustomTextField
          id="companyName"
          v-model="formSubmission.businessType"
          label="Jenis Badan Usaha"
          placeholder="Isi Jenis Badan Usaha"
          :rules="[rules.required]"
          class="mb-4"
        />

        <CustomTextField
          id="phoneNumber"
          v-model="formSubmission.phoneNumber"
          label="Nomor Kontak"
          placeholder="Isi Nomor Kontak"
          :rules="[rules.required]"
          class="mb-4"
        />

        <CustomTextField
          id="email"
          v-model="formSubmission.email"
          label="Email"
          placeholder="Isi email"
          :rules="[rules.required]"
          class="mb-4"
        />

      </VCardItem>
      <VCardActions class="d-flex justify-end">
        <VBtn variant="flat" min-width="120" @click="submit" type="submit">
          Simpan
        </VBtn>
      </VCardActions>
    </VForm>
  </VCard>
</template>
