<script setup lang="ts">
const props = defineProps({
  detaildata: {
    type: Object,
  },
});

const { detaildata } = props || {};
const { auditor } = detaildata || {};

const headers = ref([
  { title: "No", key: "no", align: "start" },
  { title: "Nama", key: "nama", align: "start" },
  { title: "Jenis Kelamin", key: "jenis_kelamin", align: "start" },
  { title: "Tanggal Lahir", key: "tanggal_lahir", align: "start" },
]);

const expanded = [0];

const itemPerPage = ref(10);
const totalItems = ref(auditor.length);
const page = ref(1);
</script>
<template>
  <VExpansionPanels v-model="expanded">
    <VExpansionPanel>
      <VExpansionPanelTitle>
        <h3>Auditor</h3>
      </VExpansionPanelTitle>
      <br />
      <VExpansionPanelText>
        <VDataTableServer
          :items-per-page-options="[10, 25, 50, 100]"
          v-model:items-per-page="itemPerPage"
          v-model:page="page"
          :headers="headers"
          :items-length="totalItems"
          :items="auditor"
        >
          <template #item.no="{ index }">
            {{ index + 1 }}
          </template>
          <template #item.nama="{ item }">
            {{ (item as any).nama || "-" }}
          </template>
          <template #item.jenis_kelamin="{ item }">
            {{ (item as any).jenis_kelamin || "-" }}
          </template>
          <template #item.tanggal_lahir="{ item }">
            {{
              (item as any).tanggal_lahir
                ? formatDate((item as any).tanggal_lahir)
                : "-"
            }}
          </template>
        </VDataTableServer>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>
