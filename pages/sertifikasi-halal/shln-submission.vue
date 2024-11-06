<script setup lang="ts">

const items = [{
  'No' : '1',
  'Submission Number' : 'xxxx',
  'NIB/Business Id No' : 'xxxxx',
  'NPWP/Taxpayer id No.' : 'xxxxx',
  'Date' : 'xxxxx',
  'Action' : 'xxxx'
},]



</script>

<template>
  <div>
    <p class="text-h4">Foreign Halal Certificate Registration Submission</p>
    <VCard class="pa-4">
      <p class="text-h5">Submission List</p>
      <VRow>
        <VCol class="d-flex justify-sm-space-between align-center">
          <VTextField
            v-model="searchQuery"
            density="compact"
            placeholder="Search Data"
            append-inner-icon="ri-search-line"
            style="max-width: 100%;"
          />
        </VCol>
        <VCol class="d-flex justify-end align-center">
          <VBtn
            color="primary"
            append-icon="ri-add-line"
            @click="openModalsQuestionare"
          >
            Add Submission
          </VBtn>
        </VCol>
      </VRow>
      <VRow>
        <VCol>
          <VDataTable :items-per-page-options="5" :items="items"/>
        </VCol>
      </VRow>
    </VCard>
  </div>
</template>

<style scoped lang="scss">

</style>
