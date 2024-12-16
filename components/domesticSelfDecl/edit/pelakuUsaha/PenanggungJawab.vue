<script setup lang="ts">
const props = defineProps<{
  data: any;
}>();
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VItemGroup>
        <VLabel>Nama</VLabel>
        <VTextField density="compact" :model-value="props.data.nama_pj" />
      </VItemGroup>
      <br />
      <VItemGroup>
        <VLabel>Nomor Handphone</VLabel>
        <VTextField
          density="compact"
          :model-value="props.data.nomor_kontak_pj"
        />
      </VItemGroup>
      <br />
      <VItemGroup>
        <VLabel>Email</VLabel>
        <VTextField density="compact" :model-value="props.data.email_pj" />
      </VItemGroup>
    </VCol>
  </VRow>
</template>
