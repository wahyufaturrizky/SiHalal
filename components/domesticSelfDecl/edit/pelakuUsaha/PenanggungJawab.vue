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
        <VTextField
          density="compact"
          :model-value="props.data.nama_pj ? props.data.nama_pj : '-'"
          readonly
        />
      </VItemGroup>
      <br />
      <VItemGroup>
        <VLabel class="text-h6 font-weight-bold">Nomor Handphone</VLabel>
        <VTextField
          density="compact"
          :model-value="
            props.data.nomor_kontak_pj ? props.data.nomor_kontak_pj : '-'
          "
          readonly
        />
      </VItemGroup>
      <br />
      <VItemGroup>
        <VLabel class="text-h6 font-weight-bold">Email</VLabel>
        <VTextField
          density="compact"
          :model-value="props.data.email_pj ? props.data.email_pj : '-'"
          readonly
        />
      </VItemGroup>
    </VCol>
  </VRow>
</template>
