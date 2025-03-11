<script lang="ts" setup>
const props = defineProps({
  previewHeader: {
    type: Array,
  },
  listPreview: {
    type: Array,
  },
});

const trueValue = true;

const getChipColor = (status: boolean) => {
  if (status) return "success";

  return "warning";
};
const itemPerPage = ref(5);
</script>

<template>
  <VDataTable
  items-per-page="5"
    class="custom-table"
    :headers="props?.previewHeader"
    :items="props?.listPreview"
  >
    <template #item.no="{ index }">
      {{ index + 1 }}
    </template>
    <template #item.reg_nama_bahan="{ item }: any">
      <div style="width: auto; display: flex; min-width: 10rem">
        {{ item.HalalCertificateRegulerBahan?.reg_nama_bahan }}
      </div>
    </template>
    <template #item.no_sertifikat_halal="{ item }: any">
      <div style="width: auto; display: flex">
        {{ item.HalalCertificateRegulerBahan?.no_sertifikat_halal }}
      </div>
    </template>
    <template #item.reg_prod_name="{ item }: any">
      <div style="width: auto; display: flex">
        {{ item.HalalCertificateRegulerProduk?.reg_prod_name }}
      </div>
    </template>
    <template #item.kelompok="{ item }: any">
      <div style="display: flex; min-width: 10rem">
        {{ item.HalalCertificateRegulerBahan?.kelompok }}
      </div>
    </template>
    <template #item.status="{ item, index }">
      <div style="width: auto">
        <div class="d-flex flex-wrap">
          <VChip
            :key="index"
            :color="getChipColor(item.Passed)"
            label
            class="ma-1"
          >
            {{ item.Passed ? "Dapat diajukan" : "Tidak dapat diajukan" }}
          </VChip>
        </div>
      </div>
    </template>
    <template #item.action="{ item }: any">
      <VCheckbox v-model="item.Passed" readonly />
    </template>
    <template #item.actionProduct="{ item }: any">
      <VCheckbox v-model="item.Passed" readonly />
    </template>
  </VDataTable>
</template>

<style scoped lang="scss">
:deep(.v-data-table.custom-table > .v-table__wrapper) {
  table {
    thead > tr > th:last-of-type {
      position: sticky;
      border-inline-start: 1px solid rgba(#000, 0.12);
      inset-inline-end: 0;
    }

    tbody > tr > td:last-of-type {
      position: sticky;
      background: white;
      border-inline-start: 1px solid rgba(#000, 0.12);
      inset-inline-end: 0;
      justify-items: center;
    }
  }
}
</style>
