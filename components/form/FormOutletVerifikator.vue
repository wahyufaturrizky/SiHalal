<script setup lang="ts">
const pabrikHeader = [
  { title: "No", key: "no" },
  { title: "Nama", key: "nama_outlet" },
  { title: "Alamat", key: "alamat_outlet" },
  { title: "Status", key: "status_milik" },
];
const store = useMyVerifikatorRegulerStore();
const { outlet } = storeToRefs(store);
</script>

<template>
  <VCard class="pa-4 mb-8">
    <VCardTitle class="d-flex justify-space-between align-center">
      <span class="text-h3">Outlet</span>
    </VCardTitle>
    <VCardItem>
      <VDataTable
        disable-sort
        :items-per-page-options="[10, 25, 50, 100]"
        :headers="pabrikHeader"
        :items="outlet"
      >
        <template #item.no="{ index }">
          {{ index + 1 }}
        </template>
      </VDataTable>
    </VCardItem>
  </VCard>
</template>

<style scoped lang="scss"></style>
