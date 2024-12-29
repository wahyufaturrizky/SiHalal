<script setup lang="ts">
const props = defineProps({
  detaildata: {
    type: Object,
  },
});

const { detaildata } = props || {};
const { biaya } = detaildata || {};

const expanded = ref(0);

const headers = ref([
  { title: "No", key: "no", align: "start" },
  { title: "Keterangan", key: "keterangan", align: "start" },
  { title: "Qty", key: "qty", align: "start" },
  { title: "Harga", key: "harga", align: "start" },
  { title: "Total", key: "total", align: "start" },
]);

const itemPerPage = ref(10);
const totalItems = ref(biaya?.length || 0);
const page = ref(1);
</script>

<template>
  <VExpansionPanels v-model="expanded">
    <VExpansionPanel>
      <VExpansionPanelTitle>
        <h3>Biaya Pemeriksaan</h3>
      </VExpansionPanelTitle>
      <br />
      <VExpansionPanelText>
        <VDataTableServer
          v-model:items-per-page="itemPerPage"
          v-model:page="page"
          :headers="headers"
          :items-length="totalItems"
          :items="biaya"
        >
          <template #item.no="{ index }">
            {{ index + 1 }}
          </template>
        </VDataTableServer>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>
