<script setup lang="ts">
const aspectLegalHeader = [
  { title: "No.", key: "no", nowrap: true },
  { title: "Jenis", key: "jenis_surat", nowrap: true },
  { title: "No. Document", key: "no_surat", nowrap: true },
  { title: "Tanggal", key: "tanggal_surat", nowrap: true },
  { title: "Masa Berlaku", key: "masa_berlaku", nowrap: true },
  { title: "Instansi Penerbit", key: "instansi_penerbit", nowrap: true },
];
const store = useMyVerifikatorRegulerStore()
const { aspek_legal } = storeToRefs(store)

</script>

<template>
  <VCard class="pa-4 mb-8">
    <VCardTitle class="d-flex justify-space-between align-center">
      <span class="text-h3">Aspek Legal</span>
    </VCardTitle>
    <VCardItem>
      <VDataTable :headers="aspectLegalHeader" :items="aspek_legal">
        <template #item.no="{index}">
          {{index + 1}}
        </template>
      </VDataTable>
    </VCardItem>
  </VCard>
</template>

<style scoped lang="scss"></style>
