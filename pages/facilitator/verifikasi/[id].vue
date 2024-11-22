<script setup lang="ts">

const route = useRoute()

import { ref } from 'vue';

const panelFasilitasi = ref([0, 1]);
const panelInstitution = ref([0, 1]);
const panelTracking = ref([0, 1]);
const panelStatus = ref([0, 1]);


const returnHandler = (message: string) => {
  console.log('RETURN ID ', route.params.id)
  console.log(message)
}

const rejectHandler = (message: string) => {
  console.log('REJECT ID ', route.params.id)
  console.log(message)
}

const approveHandler = (message: string) => {
  console.log('APPROVE ID ', route.params.id)
  console.log(message)
}

const fasilitation = ref({
  no: 1,
  registrationDate: '01-11-2024',
  facilitationCode: '',
  year: '2025',
  facilitationName: 'WAWAN BRO',
  programName: 'Dinas Koperasi Kab. Bogor',
  sourceOfFund: 'JSP01',
  type: 'Self Declare',
  startDate: '06-11-2024',
  endDate: '31-01-2025',
  kuota: 1000,
  status: 'PENGAJUAN',
  picName: 'Koko',
  picPhoneNumber: '089999999999',
  scope: 'National',

})


const institutionHeader = [
  {title : 'No', key:'no'},
  {title: 'Nama LPH / LP3H', key: 'lphlp3hName'},
  {title: 'Nama Penanggung Jawab', key: 'picName'},
  {title: 'Nomor Penanggung Jawab', key: 'picPhoneNumber'},

]


const institutionItems = ref([{
  no: 1,
  lphlp3hName: "Edukasi Indonesia",
  picName : "Fahmi",
  picPhoneNumber: "0899999999"
}])



</script>

<template>
  <VContainer>
    <KembaliButton />
    <VRow class="d-flex justify-end align-center">
      <VerifikatorFasilitatorReturnConfirm @confirm="returnHandler"/>
      <VerifikatorFasilitatorRejectConfirm @confirm="rejectHandler"/>
      <VerifikatorFasilitatorApproveConfirm @confirm="approveHandler"/>
    </VRow>
    <VRow>
      <VCol cols="8">
        <VExpansionPanels
          v-model="panelFasilitasi"
        >
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4">Fasilitasi</VExpansionPanelTitle>
            <VExpansionPanelText>
              <InfoRow name="Nama Fasilitator">{{fasilitation.facilitationName}}</InfoRow>
              <InfoRow name="Nama Program Fasilitasi">{{fasilitation.programName}}</InfoRow>
              <InfoRow name="Nama Penanggung Jawab Program">{{fasilitation.picName}}</InfoRow>
              <InfoRow name="Nama Penanggung Jawab Program">{{fasilitation.picPhoneNumber}}</InfoRow>
              <InfoRow name="Tahun">{{fasilitation.year}}</InfoRow>
              <InfoRow name="Lingkup Wilayah Fasilitasi">{{fasilitation.scope}}</InfoRow>
              <InfoRow name="Tgl. Mulai ">{{fasilitation.startDate}}</InfoRow>
              <InfoRow name="Tgl. Selesai">{{fasilitation.endDate}}</InfoRow>
              <InfoRow name="Jenis Fasilitasi">{{fasilitation.type}}</InfoRow>
              <InfoRow name="Sumber Pembiayaan">{{fasilitation.sourceOfFund}}</InfoRow>
              <InfoRow name="Kuota">{{fasilitation.kuota}}</InfoRow>
            </VExpansionPanelText>
          </VExpansionPanel>

        </VExpansionPanels>

        <br/>

        <VExpansionPanels
          v-model="panelInstitution"
        >
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4">Lembaga</VExpansionPanelTitle>
            <VExpansionPanelText>
              <VDataTable :headers="institutionHeader" :items="institutionItems"/>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
      </VCol>
      <VCol cols="4">
        <VExpansionPanels
          v-model="panelStatus"
        >
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4">Status Registrasi</VExpansionPanelTitle>
            <VExpansionPanelText>
              <InfoRow name="Status" separator="" class="d-flex align-center"><v-chip class="ma-2" label>{{fasilitation.status}}</v-chip></InfoRow>
              <InfoRow name="Kode Fasilitasi" separator="">{{fasilitation.facilitationCode}}</InfoRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br />
        <VExpansionPanels
          v-model="panelTracking"
        >
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4">Tracking</VExpansionPanelTitle>
            <VExpansionPanelText>
              <HalalTimeLine :timeline-data="[
        { title: 'DRAFT', date: '2024/10/05', description: 'Dummy User 1' },
        { title: 'PENGAJUAN', date: '2024/09/10', description: 'Dummy User 2' },
    ]"/>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

      </VCol>
    </VRow>
  </VContainer>
</template>

<style scoped lang="scss">

</style>
