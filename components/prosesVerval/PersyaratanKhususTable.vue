<script setup lang="ts">
const tableHeader = [
  { title: "No", value: "nomor" },
  { title: "Uraian", value: "uraian" },
  { title: "Bukti", value: "bukti" },
  { title: "Verval", value: "verval" },
  { title: "Sesuai / Tidak Sesuai", value: "memenuhi" },
];

const content = ref([]);

const props = defineProps({
  dataPersyaratan: {
    type: Object,
    required: true,
  },
});

const selected = ref([]);

watch(
  () => props.dataPersyaratan,
  async (newData) => {
    if (newData) {
      content.value = newData;
      content.value.forEach((val) => {
        selected.value.push(val?.id);
      });
      console.log("memenuhi = ", selected);
    }
  },
  { immediate: true }
);
</script>
<template>
  <VCard>
    <VCardTitle><h3>Persyaratan Umum</h3></VCardTitle>
    <VCardItem>
      <VDataTable
        :headers="tableHeader"
        :items="content"
        :hide-default-footer="true"
      >
        <template #item.nomor="{ index }">
          {{ index + 1 }}
        </template>
        <template #item.memenuhi="{ item }">
          <VCheckbox :v-model="selected"></VCheckbox>
        </template>
      </VDataTable>
    </VCardItem>
    <VCardActions style="display: flex; justify-content: end">
      <VBtn variant="flat">Simpan Pengecekan Persyaratan</VBtn>
    </VCardActions>
  </VCard>
</template>
