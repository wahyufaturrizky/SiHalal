<script setup lang="ts">
import type { penanggungJawab } from "@/stores/interface/pelakuUsahaProfileIntf";

const panelOpen = ref(0);

const props = defineProps({
  responsiblePersonData: {
    type: Object as penanggungJawab | any,
    required: true,
  },
});

const profilData = [
  {
    id: 1,
    field: "Nama",
    value: props.responsiblePersonData?.name || "-",
  },
  {
    id: 2,
    field: "Nomor Kontak",
    value: props.responsiblePersonData?.phone || "-",
  },
  { id: 3, field: "Email", value: props.responsiblePersonData?.email || "-" },
];
</script>

<template>
  <VExpansionPanels v-model="panelOpen">
    <VExpansionPanel>
      <VExpansionPanelTitle>
        <div class="text-h4 font-weight-bold">Penanggung Jawab</div>
      </VExpansionPanelTitle>
      <VExpansionPanelText>
        <VRow v-for="data in profilData" :key="data.id">
          <VCol cols="4">
            <p>{{ data.field }}</p>
          </VCol>
          <VCol cols="1">
            <p>:</p>
          </VCol>
          <VCol cols="7">
            <p>{{ data.value }}</p>
          </VCol>
        </VRow>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>
