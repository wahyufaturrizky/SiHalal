<script setup lang="ts">
const dataPelakuUsaha = ref([
  { id: 1, key: "Nama", value: "", api_key: "nama_pj" },
  { id: 2, key: "Nomor Kontak", value: "", api_key: "no_kontak_pj" },
  { id: 3, key: "Email", value: "", api_key: "email_pj" },
]);

const expanded = [0];

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

watch(
  () => props.data,
  async (newData) => {
    if (newData) {
      dataPelakuUsaha.value.forEach((val) => {
        val.value = newData[val.api_key] ? newData[val.api_key] : "-";
      });
    }
  },
  { immediate: true }
);
</script>
<template>
  <VExpansionPanels v-model="expanded">
    <VExpansionPanel>
      <VExpansionPanelTitle><h3>Penanggung Jawab</h3></VExpansionPanelTitle>
      <VExpansionPanelText>
        <VRow gutters="0.5svh" v-for="item in dataPelakuUsaha" :key="item.id">
          <VCol cols="3" v-if="item.key !== 'divider'">{{ item.key }}</VCol>
          <VCol cols="1" v-if="item.key !== 'divider'">:</VCol>
          <VCol cols="8" v-if="item.key !== 'divider'">{{ item.value }}</VCol>
          <VCol cols="12" v-else-if="item.key === 'divider' && item.value">
            <VDivider></VDivider>
          </VCol>
        </VRow>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>
