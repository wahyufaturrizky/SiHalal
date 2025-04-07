<script setup lang="ts">
import { defineProps, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
});

const tableHeader = [
  { title: "No", key: "no" },
  {
    title: t("task-force.proses-sidang.detail.section-nama-produk.name"),
    key: "reg_prod_name",
  },
  {
    title: t("task-force.proses-sidang.detail.section-nama-produk.publication"),
    key: "reg_publish",
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
const totalItems = ref(props.data.length); // Assuming total count of items is the length of the array
const processedDataBahan = ref([]);

// Watch the `data` prop for changes and process it
watch(
  () => props.data,
  (newDataBahan) => {
    if (newDataBahan && Array.isArray(newDataBahan)) {
      processedDataBahan.value = newDataBahan;
      totalItems.value = newDataBahan.length;
    }
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
          {{ t("task-force.proses-sidang.detail.section-nama-produk.title") }}
        </h3></VExpansionPanelTitle
      >
      <br />
      <VExpansionPanelText>
        <VDataTableServer
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
          <template #item.tgl_surat="{ item }">
            <label v-if="item.tgl_surat">
              {{ formatDateIntl(new Date(item.tgl_surat)) }}
            </label>
          </template>
          <template #item.reg_publish="{ item }">
            <VCheckbox v-model="item.reg_publish" readonly />
          </template>
        </VDataTableServer>
        <!-- <VBtn
            color="primary"
            variant="outlined"
            append-icon="mdi-download"
            style="float: inline-end;"
            class="mt-5"
          >
            Downlaod
          </VBtn> -->
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>
