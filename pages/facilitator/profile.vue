<script setup lang="ts">
import ProfileFasilitatorPic from "@/components/fasilitator/profile-fasilitator-pic.vue";
import RegistrasiFasilitatorTable from "@/components/fasilitator/registrasi-fasilitator-table.vue";
import {
  VExpansionPanel,
  VExpansionPanels,
  VExpansionPanelText,
  VExpansionPanelTitle,
} from "vuetify/components";

const closeDefault = 0;
</script>

<template>
  <VRow>
    <VCol :cols="6"><h2>Profile Pendaftar</h2></VCol>
    <VCol :cols="6" style="display: flex; justify-content: flex-end"
      ><VBtn>Simpan Perubahan</VBtn></VCol
    >
  </VRow>
  <VRow>
    <VCol class="v-col-12">
      <VExpansionPanels v-model="closeDefault">
        <VExpansionPanel>
          <VExpansionPanelTitle><h3>Data Profile</h3></VExpansionPanelTitle>
          <VExpansionPanelText>
            <ProfileFasilitatorForm></ProfileFasilitatorForm>
            <br />
            <VDivider :vertical="false"></VDivider>
            <br />
            <ProfileFasilitatorPic></ProfileFasilitatorPic>
          </VExpansionPanelText>
        </VExpansionPanel>
      </VExpansionPanels>
    </VCol>
  </VRow>
  <VRow>
    <VCol class="v-col-12">
      <VExpansionPanels v-model="closeDefault">
        <VExpansionPanel>
          <VExpansionPanelTitle><h3>Data Registrasi</h3></VExpansionPanelTitle>
          <VExpansionPanelText>
            <RegistrasiFasilitatorTable></RegistrasiFasilitatorTable>
          </VExpansionPanelText>
        </VExpansionPanel>
      </VExpansionPanels>
    </VCol>
  </VRow>
</template>
