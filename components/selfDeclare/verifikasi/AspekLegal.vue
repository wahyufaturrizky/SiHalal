<script lang="ts" setup>
interface AspekLegal {
  instansi_penerbit: string;
  jenis: string;
  masa_berlaku: any;
  no_dokumen: string;
  tanggal: string;
}
const props = defineProps<{ data: AspekLegal[] }>();
const dataHalal = ref(props.data);
watchEffect(() => {
  dataHalal.value = props.data;
});

const legalTableHeader = [
  { title: "No", key: "index" },
  { title: "Jenis", key: "jenis" },
  { title: "No. Dokumen", key: "no_dokumen" },
  { title: "Tanggal", key: "tanggal" },
  { title: "Masa Berlaku", key: "masa_berlaku" },
  { title: "Instansi Penerbit", key: "instansi_penerbit" },
];
</script>

<template>
  <div class="mx-auto" max-width="800">
    <VRow>
      <VCol cols="12">
        <VDataTable
          disable-sort
          :items-per-page-options="[10, 25, 50, 100]"
          :items="dataHalal"
        >
          <template #item.id="{ index }">
            {{ index + 1 }}
          </template>
          <template #item.tanggal="{ item }">
            {{ formatDateIntl(new Date(item.tanggal)) }}
          </template>
        </VDataTable>
      </VCol>
    </VRow>
  </div>
</template>

<style scoped>
.v-list-item-subtitle {
  white-space: nowrap; /* Prevents breaking into multiple lines */
}

.v-list-item-title {
  min-inline-size: 300px;
}
</style>
