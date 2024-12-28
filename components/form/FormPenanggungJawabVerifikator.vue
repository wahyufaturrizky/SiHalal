<script setup lang="ts">
const store = useMyVerifikatorRegulerStore()
const { penanggung_jawab } = storeToRefs(store)

</script>

<template>
  <VCard class="pa-4 mb-8">
    <VCardTitle class="text-h3"> Penanggung Jawab </VCardTitle>
    <VForm
    >
      <VCardItem>
        <CustomTextField
          id="companyName"
          v-model="penanggung_jawab.nama_pj"
          label="Nama"
          class="mb-4"
          :readonly="true"
        />

        <CustomTextField
          id="phoneNumber"
          v-model="penanggung_jawab.nomor_kontak_pj"
          label="Nomor Kontak"
          class="mb-4"
          :readonly="true"
        />

        <CustomTextField
          id="email"
          v-model="penanggung_jawab.email_pj"
          label="Email"
          class="mb-4"
          :readonly="true"
        />
      </VCardItem>
    </VForm>
  </VCard>
</template>
