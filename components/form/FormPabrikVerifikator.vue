<script setup lang="ts">
const pabrikHeader = [
  { title: "No", key: "no" },
  { title: "Nama", key: "nama_pabrik" },
  { title: "Alamat", key: "alamat_pabrik" },
  { title: "Status", key: "status_milik" },
];
const store = useMyVerifikatorRegulerStore()
const { pabrik } = storeToRefs(store)

</script>

<template>
  <VCard class="pa-4 mb-8">
    <VCardTitle class="d-flex justify-space-between align-center">
      <span class="text-h3">Pabrik</span>
    </VCardTitle>
    <VCardItem>
      <VDataTable :headers="pabrikHeader" :items="pabrik">
        <template #item.no="{index}">
          {{index + 1}}
        </template>
      </VDataTable>
    </VCardItem>
  </VCard>
</template>

<style scoped lang="scss"></style>
