<script setup lang="ts">
import DetailFacilitateModalSend from "@/components/fasilitator/detail-facilitate-modal-send.vue";

const dataFasilitasi = [
  { id: 1, key: "Nama Fasilitator", value: "Samsul" },
  {
    id: 2,
    key: "Nama Program Fasilitasi",
    value: "Sumbang, RT/RW -, Sumbang, Curio, xxx",
  },
  {
    id: 3,
    key: "Nama Penanggung Jawab Program",
    value: "Penanggung Jawab Usaha",
  },
  {
    id: 4,
    key: "Nomor Kontak Penanggung Jawab Program",
    value: "0812113900779",
  },
  { id: 5, key: "Tahun", value: "Samsul" },
  {
    id: 6,
    key: "Lingkup Wilayah Fasilitasi",
    value: "Sumbang, RT/RW -, Sumbang, Curio, xxx",
  },
  {
    id: 7,
    key: "Tanggal Mulai",
    value: "Sumbang, RT/RW -, Sumbang, Curio, xxx",
  },
  {
    id: 8,
    key: "Tanggal Selesai",
    value: "Sumbang, RT/RW -, Sumbang, Curio, xxx",
  },
  {
    id: 9,
    key: "Jenis Fasilitasi",
    value: "Sumbang, RT/RW -, Sumbang, Curio, xxx",
  },
  {
    id: 10,
    key: "Sumber Pembiayaan",
    value: "Sumbang, RT/RW -, Sumbang, Curio, xxx",
  },
  {
    id: 11,
    key: "Kuota",
    value: "Sumbang, RT/RW -, Sumbang, Curio, xxx",
  },
];

const timelineEvents = ref([
  {
    time: "5pm",
    title: "New Icon",
    description: "Mobile App",
    dotColor: "pink",
  },
  {
    time: "3-4pm",
    title: "Design Stand Up",
    description: "Hangouts",
    dotColor: "teal-lighten-3",
  },
  { time: "12pm", title: "Lunch break", dotColor: "pink" },
  {
    time: "9-11am",
    title: "Finish Home Screen",
    description: "Web App",
    dotColor: "teal-lighten-3",
  },
]);

const route = useRoute();
</script>
<template>
  <KembaliButton></KembaliButton>
  <VRow>
    <VCol cols="6" style="display: flex; align-items: center"
      ><h2>Detail Data Fasilitasi</h2></VCol
    >
    <VCol cols="6" style="display: flex; justify-content: end">
      <div>
        <DetailFacilitateModalDelete></DetailFacilitateModalDelete>
        <VBtn
          density="compact"
          style="margin: 0.5svw"
          variant="outlined"
          append-icon="fa-pencil"
          >Ubah</VBtn
        >
        <DetailFacilitateModalSend></DetailFacilitateModalSend>
      </div>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="8">
      <VExpansionPanels>
        <VExpansionPanel>
          <VExpansionPanelTitle>
            <h3>Informasi Data Fasilitasi</h3>
          </VExpansionPanelTitle>
          <VExpansionPanelText>
            <VRow gutter="1svh" v-for="item in dataFasilitasi" :key="item.id">
              <VCol cols="3">{{ item.key }}</VCol>
              <VCol cols="1">:</VCol>
              <VCol cols="8">{{ item.value }}</VCol>
            </VRow>
          </VExpansionPanelText>
        </VExpansionPanel>
      </VExpansionPanels>
    </VCol>
    <VCol cols="4">
      <VRow>
        <VCol>
          <VCard class="pa-4">
            <p class="text-h3">Tracking</p>
            <HalalTimeLine :events="timelineEvents" />
          </VCard>
        </VCol>
      </VRow>
      <VRow>
        <VCol>
          <VCard class="pa-4">
            <p class="text-h3">Tracking</p>
            <HalalTimeLine :events="timelineEvents" />
          </VCard>
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>
<style>
.v-btn--variant-outlined {
  color: red;
}
</style>
