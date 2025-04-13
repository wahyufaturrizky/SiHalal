<script setup lang="ts">
import { defineProps, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const props = defineProps({
  databahan: {
    type: Array,
    required: true,
  },
});
// console.log(props.databahan, "ini props databahan");
const tableHeader = [
  { title: "No", key: "no" },
  {
    title: t("task-force.proses-sidang.detail.section-auditor.name"),
    key: "nama_bahan",
  },
  {
    title: t("task-force.proses-sidang.detail.section-auditor.bod"),
    key: "nama_bahan",
  },
  {
    title: t("task-force.proses-sidang.detail.section-auditor.gender"),
    key: "nama_bahan",
  },
  {
    title: t("task-force.proses-sidang.detail.section-auditor.regis-no"),
    key: "nama_bahan",
  },
];

// Helper function to get value or return a dash
function getValueOrDash(value: any) {
  return value && value.trim() !== "" ? value : "-";
}

// Reactive variables for pagination and data
const itemPerPage = ref(10);
const page = ref(1);
const loading = ref(false);
const totalItems = ref(props.databahan.length); // Assuming total count of items is the length of the array
const processedDataBahan = ref([]);

// Watch the `databahan` prop for changes and process it
watch(
  () => props.databahan,
  (newDataBahan) => {
    // console.log(newDataBahan, "Updated databahan");

    if (newDataBahan && Array.isArray(newDataBahan)) {
      processedDataBahan.value = newDataBahan;
      totalItems.value = newDataBahan.length;
    }
    // console.log(processedDataBahan.value, "Processed Data Bahan");
  },
  { immediate: true }
);

const paneSwitcher = ref([0, 1]);
</script>
<template>
  <VExpansionPanels v-model="paneSwitcher">
    <VExpansionPanel>
      <VExpansionPanelTitle
        ><h3>
          {{ t("task-force.proses-sidang.detail.section-auditor.title") }}
        </h3></VExpansionPanelTitle
      >
      <br />
      <VExpansionPanelText>
        <VDataTableServer
          disable-sort
          :items-per-page-options="[10, 25, 50, 100]"
          :headers="tableHeader"
          :items="processedDataBahan"
          :items-per-page="itemPerPage"
          :page="page"
          :loading="loading"
          :items-length="totalItems"
          loading-text="Loading..."
          hide-default-footer
        >
          <template #item.no="{ index }">
            {{ index + 1 + (page - 1) * itemPerPage }}
          </template>
          <template #item.diragukan="{ item }">
            <VChip
              v-if="!item.diragukan"
              variant="outlined"
              style="
                color: #e1442e;
                border-radius: 10px;
                background-color: #fcecea;
              "
              color="danger"
              >Diragukan</VChip
            >
            <VChip
              v-if="item.diragukan"
              variant="outlined"
              style="
                color: #49a84c;
                border-radius: 10px;
                background-color: #edf6ed;
              "
              color="success"
              >Tidak Diragukan</VChip
            >
          </template>
        </VDataTableServer>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>
