<script setup lang="ts">
import ProfileFasilitatorPic from "@/components/fasilitator/profile-fasilitator-pic.vue";
import RegistrasiFasilitatorTable from "@/components/fasilitator/registrasi-fasilitator-table.vue";
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
      <VCard>
        <VCardTitle><h3>Data Profile</h3></VCardTitle>
        <VCardItem>
          <ProfileFasilitatorForm></ProfileFasilitatorForm>
          <br />
          <VDivider :vertical="false"></VDivider>
          <br />
          <ProfileFasilitatorPic></ProfileFasilitatorPic>
        </VCardItem>
      </VCard>
    </VCol>
  </VRow>
  <VRow>
    <VCol class="v-col-12">
      <VCard>
        <VCardTitle><h3>Data Registrasi</h3></VCardTitle>
        <VCardItem>
          <RegistrasiFasilitatorTable></RegistrasiFasilitatorTable>
        </VCardItem>
      </VCard>
    </VCol>
  </VRow>
</template>
