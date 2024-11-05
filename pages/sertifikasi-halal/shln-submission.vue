<script setup lang="ts">

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
          <VTable class="border rounded-lg">
            <thead>
            <tr>
              <th class="text-uppercase table-width-5">
                No
              </th>
              <th class="text-uppercase table-width-10">
                Submission Number
              </th>
              <th class="text-uppercase table-width-20">
                NIB/Business Id No
              </th>
              <th class="text-uppercase table-width-10">
                NPWP/Taxpayer id No.
              </th>
              <th class="text-uppercase table-width-10">
                Date
              </th>
              <th class="text-uppercase table-width-10">
                Action
              </th>
            </tr>
            </thead>
<!--            <tbody class="border">-->
<!--            <tr v-if="filteredSubmissions.length === 0">-->
<!--              <td colspan="9">-->
<!--                <DataKosong />-->
<!--              </td>-->
<!--            </tr>-->
<!--            <tr-->
<!--              v-for="item in filteredSubmissions"-->
<!--              :key="item.no"-->
<!--            >-->
<!--              <td class="table-width-5">-->
<!--                {{ item.no }}-->
<!--              </td>-->
<!--              <td class="table-width-10">-->
<!--                {{ item.idReg }}-->
<!--              </td>-->
<!--              <td class="table-width-20">-->
<!--                {{ item.regNo }}-->
<!--              </td>-->
<!--              <td class="table-width-10">-->
<!--                {{ item.date }}-->
<!--              </td>-->
<!--              <td class="table-width-10">-->
<!--                {{ item.name }}-->
<!--              </td>-->
<!--              <td class="table-width-10">-->
<!--                {{ item.productType }}-->
<!--              </td>-->
<!--              <td class="table-width-10">-->
<!--                {{ item.status }}-->
<!--              </td>-->
<!--              <td class="table-width-10">-->
<!--                {{ item.brand }}-->
<!--              </td>-->
<!--              <td class="table-width-10">-->
<!--                {{ item.action }}-->
<!--              </td>-->
<!--            </tr>-->
<!--            </tbody>-->
          </VTable>
        </VCol>
      </VRow>
    </VCard>
  </div>
</template>

<style scoped lang="scss">

</style>
