<script setup lang="ts">
const props = defineProps<{
  data: any;
}>();
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VItemGroup>
        <VLabel class="text-h6 font-weight-bold">Nama</VLabel>
        <VTextField density="compact" v-model="props.data.nama_pj" />
      </VItemGroup>
      <br />
      <VItemGroup>
        <VLabel class="text-h6 font-weight-bold">Nomor Handphone</VLabel>
        <VTextField density="compact" v-model="props.data.nomor_kontak_pj" />
      </VItemGroup>
      <br />
      <VItemGroup>
        <VLabel class="text-h6 font-weight-bold">Email</VLabel>
        <VTextField density="compact" v-model="props.data.email_pj" />
      </VItemGroup>
    </VCol>
  </VRow>
</template>
